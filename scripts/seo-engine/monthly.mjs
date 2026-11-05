#!/usr/bin/env node
/**
 * Monthly SEO audit — architecture, content inventory, authority notes, strategic plan refresh.
 */
import { resolve } from "node:path";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { SERVICE_SLUGS } from "./lib/config.mjs";
import { resolveBaseUrl, checkUrl } from "./lib/fetch.mjs";
import { integrationStatus, fetchGscSearchAnalytics, fetchGa4Summary } from "./lib/integrations.mjs";
import { prioritize, summarizeHealth } from "./lib/decision.mjs";
import {
  ensureDirs,
  stamp,
  writeJson,
  writeMarkdownReport,
  appendRunLog,
  updateState,
  latestReport,
} from "./lib/io.mjs";
import { DATA_DIR, REPORTS_DIR, DRAFTS_DIR } from "./lib/config.mjs";

function inventoryContent() {
  const published = [];
  for (const file of [
    "app/utils/blogData.ts",
    "app/utils/blogPostsFromSocial.ts",
  ]) {
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(/slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g)) {
      published.push({ slug: m[1], title: m[2], source: file });
    }
  }
  const drafts = existsSync(DRAFTS_DIR)
    ? readdirSync(DRAFTS_DIR).filter((f) => f.endsWith(".md"))
    : [];
  return { published, drafts };
}

function architectureMap() {
  return {
    brand: "/",
    servicesHub: "/servicios",
    services: SERVICE_SLUGS.map((s) => `/servicios/${s}`),
    about: "/sobre-nosotros",
    portfolio: "/portafolio",
    blog: "/blog",
    contact: "/contacto",
    en: ["/en", "/en/servicios", "/en/contacto"],
    noindex: ["/glosario"],
    rules: [
      "Una landing de servicio = un cluster transaccional",
      "Blog = intención informativa; enlaza a servicio, no canibaliza title",
      "Sin páginas de ciudad inventadas",
      "NAP: no publicar teléfono placeholder",
    ],
  };
}

async function main() {
  ensureDirs();
  const startedAt = new Date().toISOString();
  const id = `monthly-${stamp()}`;
  const findings = [];

  const resolved = await resolveBaseUrl();
  const base = resolved.base;
  const integrations = integrationStatus();
  const content = inventoryContent();
  const architecture = architectureMap();

  const spotChecks = [];
  for (const path of ["/", "/sitemap.xml", "/robots.txt", "/servicios", "/blog", "/contacto"]) {
    spotChecks.push(await checkUrl(base, path));
  }
  for (const r of spotChecks) {
    if (!r.ok) {
      findings.push({
        code: "http.error",
        path: r.path,
        status: r.status,
        message: `Fallo en auditoría mensual: ${r.path}`,
      });
    }
  }

  const end = new Date();
  const start = new Date(end.getTime() - 90 * 24 * 3600 * 1000);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const gsc = await fetchGscSearchAnalytics({
    startDate: fmt(start),
    endDate: fmt(end),
    rowLimit: 50,
  });
  const ga4 = await fetchGa4Summary();

  const daily = latestReport("daily-");
  const weekly = latestReport("weekly-");

  // Content freshness heuristic: drafts pending vs published count
  if (content.drafts.length > content.published.length) {
    findings.push({
      code: "content.opportunity",
      message: `Hay ${content.drafts.length} borradores vs ${content.published.length} publicados — priorizar calidad sobre volumen`,
      path: "/blog",
    });
  }

  if (!integrations.gsc) {
    findings.push({
      code: "ctr.opportunity",
      message: "Sin Search Console: el plan mensual no puede medir impresiones reales",
      path: "/docs/seo/INTEGRATIONS_SETUP.md",
    });
  }

  const strategicPlan = {
    northStar:
      "Ser hallazgo orgánico relevante para quien busca diseño/desarrollo/marketing digital con criterio en Bogotá/LATAM.",
    next30Days: [
      "Conectar DNS canónico invends.com → Vercel y verificar GSC",
      "Activar GA4 + eventos de contacto/WhatsApp",
      "Publicar 1–2 borradores del backlog tras revisión humana",
      "Completar perfiles sociales reales (sameAs)",
    ],
    next90Days: [
      "Iterar titles con CTR real de GSC",
      "Ampliar cluster ecommerce + branding con contenido diferenciado",
      "Medir CWV de campo (CrUX) cuando haya tráfico suficiente",
      "Autoridad: 2–3 menciones/directorios legítimos, cero spam",
    ],
    antiPatterns: [
      "No generar decenas de artículos cortos",
      "No páginas de ciudad sin oferta real",
      "No reseñas ni métricas inventadas",
      "No cambiar URLs indexadas sin redirecciones",
    ],
  };

  const ranked = prioritize(findings);
  const health = summarizeHealth(findings);

  const report = {
    id,
    type: "monthly",
    startedAt,
    finishedAt: new Date().toISOString(),
    base,
    integrations,
    architecture,
    contentInventory: {
      publishedCount: content.published.length,
      published: content.published,
      draftFiles: content.drafts,
    },
    spotChecks,
    gsc,
    ga4,
    previous: {
      daily: daily ? { id: daily.id, health: daily.health } : null,
      weekly: weekly ? { id: weekly.id, health: weekly.health } : null,
    },
    strategicPlan,
    findings: ranked,
    health,
  };

  const jsonPath = writeJson(resolve(REPORTS_DIR, `${id}.json`), report);
  writeJson(resolve(DATA_DIR, "latest-monthly.json"), report);

  const md = `# Monthly SEO Audit — ${startedAt}

## Resumen

- Base medida: ${base}
- Salud: **${health.label}** (${health.score}/100)
- Artículos publicados (código): ${content.published.length}
- Borradores en cola: ${content.drafts.length}
- GSC: ${gsc.available ? "activo" : "no disponible — " + (gsc.reason || "")}
- GA4 API: ${ga4.available ? "activo" : "no disponible — " + (ga4.reason || "")}

## Arquitectura

Hub servicios + ${SERVICE_SLUGS.length} landings. Blog informativo. Contacto como conversión. ES primario / EN paralelo.

## Plan estratégico (actualizado por el motor)

### 30 días
${strategicPlan.next30Days.map((x) => `- ${x}`).join("\n")}

### 90 días
${strategicPlan.next90Days.map((x) => `- ${x}`).join("\n")}

### Prohibido
${strategicPlan.antiPatterns.map((x) => `- ${x}`).join("\n")}

## Findings
${ranked.map((f) => `- **[${f.severity}]** ${f.code}: ${f.message}`).join("\n") || "_Ninguno_"}
`;

  writeMarkdownReport(`${id}.md`, md);
  appendRunLog({ id, type: "monthly", at: startedAt, health: health.label });
  updateState({ lastMonthly: id, lastMonthlyAt: startedAt, strategicPlan });

  console.log(JSON.stringify({ id, health, jsonPath }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
