#!/usr/bin/env node
/**
 * Daily SEO health check — availability, critical pages, sitemap, robots, anomalies.
 */
import { resolve } from "node:path";
import { CRITICAL_PATHS, abs } from "./lib/config.mjs";
import {
  resolveBaseUrl,
  checkUrl,
  extractInternalLinks,
  fetchWithTimeout,
} from "./lib/fetch.mjs";
import { prioritize, planSafeActions, summarizeHealth } from "./lib/decision.mjs";
import {
  ensureDirs,
  stamp,
  writeJson,
  writeMarkdownReport,
  appendRunLog,
  updateState,
} from "./lib/io.mjs";
import { DATA_DIR, REPORTS_DIR } from "./lib/config.mjs";

async function parseSitemap(base) {
  const url = abs(base, "/sitemap.xml");
  try {
    const res = await fetchWithTimeout(url, { accept: "application/xml" });
    const text = await res.text();
    const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return { ok: res.ok, status: res.status, count: locs.length, locs };
  } catch (err) {
    return { ok: false, status: 0, count: 0, locs: [], error: String(err?.message || err) };
  }
}

async function parseRobots(base) {
  const url = abs(base, "/robots.txt");
  try {
    const res = await fetchWithTimeout(url, { accept: "text/plain" });
    const text = await res.text();
    const disallowAll = /^\s*Disallow:\s*\/\s*$/im.test(text);
    const hasSitemap = /Sitemap:\s*\S+/i.test(text);
    return {
      ok: res.ok,
      status: res.status,
      disallowAll,
      hasSitemap,
      text: text.slice(0, 2000),
    };
  } catch (err) {
    return { ok: false, status: 0, disallowAll: false, hasSitemap: false, error: String(err?.message || err) };
  }
}

async function checkMetaHome(base) {
  const url = abs(base, "/");
  try {
    const res = await fetchWithTimeout(url, { accept: "text/html" });
    const html = await res.text();
    const robots =
      html.match(/name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] ||
      html.match(/content=["']([^"']+)["'][^>]*name=["']robots["']/i)?.[1] ||
      null;
    const canonical =
      html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ||
      html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1] ||
      null;
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || null;
    const noindex = /noindex/i.test(robots || "");
    return { ok: res.ok, status: res.status, robots, canonical, title, noindex };
  } catch (err) {
    return { ok: false, error: String(err?.message || err) };
  }
}

async function main() {
  ensureDirs();
  const startedAt = new Date().toISOString();
  const id = `daily-${stamp()}`;
  const findings = [];

  const resolved = await resolveBaseUrl();
  const base = resolved.base;

  if (resolved.error || resolved.status === 0) {
    findings.push({
      code: "site.unreachable",
      message: `No se pudo alcanzar ${base} ni el fallback configurado`,
      path: "/",
    });
  }

  const pageChecks = [];
  for (const path of CRITICAL_PATHS) {
    const result = await checkUrl(base, path);
    pageChecks.push(result);
    if (!result.ok) {
      findings.push({
        code: "http.error",
        path,
        status: result.status,
        message: result.error || `HTTP ${result.status} en ${path}`,
        ms: result.ms,
      });
    } else if (result.ms > 4000) {
      findings.push({
        code: "perf.slow",
        path,
        status: result.status,
        message: `TTFB/respuesta lenta: ${result.ms}ms`,
        ms: result.ms,
      });
    }
  }

  const robots = await parseRobots(base);
  if (!robots.ok) {
    findings.push({
      code: "http.error",
      path: "/robots.txt",
      status: robots.status,
      message: "robots.txt no disponible",
    });
  } else if (robots.disallowAll) {
    findings.push({
      code: "robots.blocks_all",
      path: "/robots.txt",
      message: "robots.txt bloquea todo el sitio (Disallow: /)",
    });
  } else if (!robots.hasSitemap) {
    findings.push({
      code: "sitemap.missing_url",
      path: "/robots.txt",
      message: "robots.txt sin directiva Sitemap",
    });
  }

  const sitemap = await parseSitemap(base);
  if (!sitemap.ok) {
    findings.push({
      code: "http.error",
      path: "/sitemap.xml",
      status: sitemap.status,
      message: "sitemap.xml no disponible o inválido",
    });
  } else if (sitemap.count < 20) {
    findings.push({
      code: "sitemap.missing_url",
      path: "/sitemap.xml",
      message: `Sitemap con pocas URLs (${sitemap.count})`,
    });
  }

  const homeMeta = await checkMetaHome(base);
  if (homeMeta.noindex) {
    findings.push({
      code: "meta.noindex",
      path: "/",
      message: `Home con robots=${homeMeta.robots}`,
    });
  }

  // Sample internal links from home + servicios hub
  const linkSamples = [];
  for (const path of ["/", "/servicios", "/blog"]) {
    const sample = await extractInternalLinks(base, path);
    linkSamples.push(sample);
  }
  const uniqueHrefs = [
    ...new Set(linkSamples.flatMap((s) => s.links || [])),
  ].filter(
    (p) =>
      !p.startsWith("/_nuxt") &&
      !p.startsWith("/images") &&
      !p.startsWith("/fonts") &&
      !p.endsWith(".png") &&
      !p.endsWith(".webp") &&
      !p.endsWith(".svg") &&
      !p.endsWith(".ico"),
  );

  const broken = [];
  // Cap crawl to keep daily job bounded
  for (const path of uniqueHrefs.slice(0, 40)) {
    const r = await checkUrl(base, path);
    if (!r.ok || r.status === 404) {
      broken.push(r);
      findings.push({
        code: "http.error",
        path,
        status: r.status,
        message: `Enlace interno roto o error: ${path}`,
      });
    }
  }

  const ranked = prioritize(findings);
  const actions = planSafeActions(findings);
  const health = summarizeHealth(findings);

  const report = {
    id,
    type: "daily",
    startedAt,
    finishedAt: new Date().toISOString(),
    base,
    resolved,
    health,
    homeMeta,
    robots: {
      ok: robots.ok,
      status: robots.status,
      disallowAll: robots.disallowAll,
      hasSitemap: robots.hasSitemap,
    },
    sitemap: {
      ok: sitemap.ok,
      status: sitemap.status,
      count: sitemap.count,
    },
    pageChecks,
    brokenLinks: broken,
    findings: ranked,
    actions,
    dataSource: "live-http",
    note:
      "Sin GSC/GA4 en este informe salvo que existan credenciales (ver weekly).",
  };

  const jsonPath = writeJson(resolve(REPORTS_DIR, `${id}.json`), report);
  writeJson(resolve(DATA_DIR, "latest-daily.json"), report);

  const md = `# Daily SEO — ${startedAt}

**Base:** ${base} (${resolved.source || "n/a"})  
**Salud:** ${health.label} (score ${health.score}/100)  
**Findings:** ${ranked.length} · críticos ${health.critical} · altos ${health.high}

## Indexación

| Check | Estado |
|-------|--------|
| robots.txt | ${robots.ok ? "OK" : "FAIL"} ${robots.disallowAll ? "(BLOQUEA TODO)" : ""} |
| sitemap.xml | ${sitemap.ok ? `OK (${sitemap.count} URLs)` : "FAIL"} |
| Home robots | ${homeMeta.robots || "n/d"} |
| Canonical home | ${homeMeta.canonical || "n/d"} |

## Problemas

${
  ranked.length
    ? ranked
        .map(
          (f) =>
            `- **[${f.severity}]** \`${f.code}\` ${f.path || ""} — ${f.message || f.likelyCause || ""}`,
        )
        .join("\n")
    : "_Sin hallazgos críticos._"
}

## Acciones

${actions
  .slice(0, 20)
  .map(
    (a) =>
      `- ${a.auto ? "AUTO" : "MANUAL"} \`${a.type}\` ← ${a.finding}${a.note ? ` — ${a.note}` : ""}`,
  )
  .join("\n") || "_Ninguna_"}

---
Generado por \`scripts/seo-engine/daily.mjs\`. Datos medidos por HTTP; no inventa métricas de ranking.
`;

  writeMarkdownReport(`${id}.md`, md);
  appendRunLog({
    id,
    type: "daily",
    at: startedAt,
    health: health.label,
    score: health.score,
    findings: ranked.length,
  });
  updateState({
    lastDaily: id,
    lastDailyAt: startedAt,
    health,
    base,
  });

  console.log(JSON.stringify({ id, health, jsonPath, findings: ranked.length }, null, 2));
  if (health.critical > 0) process.exitCode = 2;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
