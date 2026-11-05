#!/usr/bin/env node
/**
 * Weekly SEO — keyword/content opportunities, PSI sample, CTR gaps (when GSC live),
 * competitor notes, conversion checks.
 */
import { resolve } from "node:path";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { SERVICE_SLUGS, abs, OPPORTUNITIES_DIR, DRAFTS_DIR, LINK_OPS_DIR } from "./lib/config.mjs";
import { resolveBaseUrl, checkUrl } from "./lib/fetch.mjs";
import {
  fetchPageSpeed,
  fetchGscSearchAnalytics,
  fetchGa4Summary,
  integrationStatus,
} from "./lib/integrations.mjs";
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
import { DATA_DIR, REPORTS_DIR } from "./lib/config.mjs";

const CONTENT_BACKLOG = [
  {
    id: "elegir-agencia-diseno-web",
    title: "Cómo elegir una agencia de diseño web sin pagar dos veces",
    keyword: "cómo elegir agencia diseño web",
    intent: "comercial",
    service: "diseno-web",
    priority: 1,
  },
  {
    id: "errores-ux-movil-empresas",
    title: "Errores de UX que hacen perder clientes en móvil",
    keyword: "errores UX web empresas",
    intent: "informativa",
    service: "diseno-web",
    priority: 2,
  },
  {
    id: "plantilla-vs-desarrollo",
    title: "Cuándo basta una plantilla y cuándo necesitas desarrollo a medida",
    keyword: "desarrollo web vs plantilla",
    intent: "comercial",
    service: "desarrollo-web",
    priority: 3,
  },
  {
    id: "diseno-web-empresas-bogota",
    title: "Diseño web para empresas en Bogotá: qué exigir",
    keyword: "diseño web empresas Bogotá",
    intent: "local",
    service: "diseno-web",
    priority: 4,
  },
  {
    id: "continuidad-anuncio-landing",
    title: "Por qué tu anuncio y tu landing deben decir lo mismo",
    keyword: "continuidad anuncio landing",
    intent: "informativa",
    service: "marketing-digital",
    priority: 5,
  },
  {
    id: "identidad-visual-aplicable",
    title: "Identidad visual que el equipo puede usar de verdad",
    keyword: "identidad visual aplicable",
    intent: "comercial",
    service: "branding",
    priority: 6,
  },
  {
    id: "modernizar-legacy",
    title: "Cómo modernizar un sitio legacy sin detener el negocio",
    keyword: "modernizar web sin apagar",
    intent: "comercial",
    service: "migracion-legacy",
    priority: 7,
  },
  {
    id: "rendimiento-web-negocio",
    title: "Rendimiento web que el negocio sí nota",
    keyword: "rendimiento web negocio",
    intent: "informativa",
    service: "desarrollo-web",
    priority: 8,
  },
];

const LINK_OPPORTUNITIES = [
  {
    type: "directory",
    name: "Clutch (agencia Colombia)",
    url: "https://clutch.co/",
    note: "Perfil solo con datos verificables; sin reseñas inventadas.",
    status: "manual",
  },
  {
    type: "directory",
    name: "Sortlist / similar B2B",
    url: "https://www.sortlist.com/",
    note: "Alta solo si Invends puede sostener el perfil con servicios reales.",
    status: "manual",
  },
  {
    type: "publisher",
    name: "Medios / blogs de negocio Colombia",
    note: "Pitch de artículo experto (UX, conversión, arquitectura) — no guest-post spam.",
    status: "research",
  },
  {
    type: "entity",
    name: "Perfiles sociales reales",
    note: "Sustituir URLs raíz en CONTACT_INFO por perfiles verificados → schema sameAs.",
    status: "blocked_missing_urls",
  },
];

function loadPublishedSlugs() {
  const path = resolve(
    process.cwd(),
    "app/utils/blogData.ts",
  );
  const social = resolve(process.cwd(), "app/utils/blogPostsFromSocial.ts");
  const slugs = new Set();
  for (const file of [path, social]) {
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(/slug:\s*"([^"]+)"/g)) slugs.add(m[1]);
  }
  return slugs;
}

function proposeDrafts(published) {
  mkdirSync(DRAFTS_DIR, { recursive: true });
  mkdirSync(OPPORTUNITIES_DIR, { recursive: true });
  const proposed = [];
  for (const item of CONTENT_BACKLOG) {
    if (published.has(item.id)) continue;
    const draftPath = resolve(DRAFTS_DIR, `${item.id}.md`);
    const already = existsSync(draftPath);
    if (!already) {
      const body = `---
status: draft
id: ${item.id}
title: "${item.title}"
keyword: "${item.keyword}"
intent: ${item.intent}
service: /servicios/${item.service}
locale: es
createdBy: seo-engine/weekly
createdAt: ${new Date().toISOString()}
qualityGate: pending
publish: false
---

# ${item.title}

> Borrador generado por el motor SEO. **No publicar** hasta superar revisión humana de exactitud, originalidad y ausencia de afirmaciones no verificadas.

## Intención y keyword

- Keyword primaria: ${item.keyword}
- Intención: ${item.intent}
- Servicio relacionado: [/servicios/${item.service}](/servicios/${item.service})

## Estructura sugerida

1. Problema del lector (sin dramatizar)
2. Criterios / marco de decisión
3. Errores frecuentes
4. Qué hace Invends (alcance real, sin métricas inventadas)
5. Preguntas útiles antes de contratar
6. CTA a /contacto

## Enlaces internos obligatorios

- /servicios/${item.service}
- /contacto
- 1 artículo relacionado del blog si existe

## Checklist de calidad (antes de publish)

- [ ] Sin clientes, reseñas o números inventados
- [ ] Sin duplicar el title transaccional de la landing de servicio
- [ ] Fuentes externas solo si son citables
- [ ] Meta title/description únicos
- [ ] Revisión humana firmada
`;
      writeFileSync(draftPath, body, "utf8");
    }
    proposed.push({ ...item, draftPath, created: !already });
  }

  writeJson(resolve(OPPORTUNITIES_DIR, `content-${stamp()}.json`), {
    generatedAt: new Date().toISOString(),
    proposed,
  });
  return proposed;
}

async function main() {
  ensureDirs();
  const startedAt = new Date().toISOString();
  const id = `weekly-${stamp()}`;
  const findings = [];
  const integrations = integrationStatus();

  const resolved = await resolveBaseUrl();
  const base = resolved.base;

  // Service landing health
  const serviceChecks = [];
  for (const slug of SERVICE_SLUGS) {
    const path = `/servicios/${slug}`;
    const r = await checkUrl(base, path);
    serviceChecks.push(r);
    if (!r.ok) {
      findings.push({
        code: "http.error",
        path,
        status: r.status,
        message: `Landing de servicio caída: ${slug}`,
      });
    }
  }

  // PSI sample (home + 1 service) — works without key with quota limits
  const psiTargets = [
    abs(base, "/"),
    abs(base, "/servicios/diseno-web"),
  ];
  const psi = [];
  for (const url of psiTargets) {
    for (const strategy of ["mobile", "desktop"]) {
      const row = await fetchPageSpeed(url, strategy);
      psi.push(row);
      if (row.available && row.lcp != null && row.lcp > 2500) {
        findings.push({
          code: "perf.slow",
          path: new URL(url).pathname,
          message: `LCP lab ${Math.round(row.lcp)}ms (${strategy}) > 2500ms`,
        });
      }
    }
  }

  const end = new Date();
  const start = new Date(end.getTime() - 28 * 24 * 3600 * 1000);
  const fmt = (d) => d.toISOString().slice(0, 10);
  const gsc = await fetchGscSearchAnalytics({
    startDate: fmt(start),
    endDate: fmt(end),
  });
  const ga4 = await fetchGa4Summary();

  if (!gsc.available) {
    findings.push({
      code: "ctr.opportunity",
      message: "GSC no conectado — sin datos reales de impresiones/CTR esta semana",
      path: "/docs/seo/INTEGRATIONS_SETUP.md",
    });
  }

  const published = loadPublishedSlugs();
  const drafts = proposeDrafts(published);

  mkdirSync(LINK_OPS_DIR, { recursive: true });
  writeJson(resolve(LINK_OPS_DIR, `links-${stamp()}.json`), {
    generatedAt: new Date().toISOString(),
    policy: "Solo oportunidades legítimas. Prohibido PBN, spam, reseñas falsas.",
    items: LINK_OPPORTUNITIES,
  });

  const previous = latestReport("daily-");
  if (previous?.health?.score != null && previous.health.score < 70) {
    findings.push({
      code: "http.error",
      message: `Salud diaria previa baja (${previous.health.score}) — ${previous.id}`,
      path: "/",
      severity: "high",
    });
  }

  const ranked = prioritize(findings);
  const health = summarizeHealth(findings);

  const report = {
    id,
    type: "weekly",
    startedAt,
    finishedAt: new Date().toISOString(),
    base,
    integrations,
    serviceChecks,
    psi,
    gsc,
    ga4,
    contentDrafts: drafts,
    linkOpportunities: LINK_OPPORTUNITIES,
    findings: ranked,
    health,
    dataHonesty: {
      rankingPositions: gsc.available ? "from_gsc" : "unavailable",
      organicSessions: ga4.available ? "from_ga4" : "unavailable",
      psi: psi.some((p) => p.available) ? "lab_psi" : "unavailable",
    },
  };

  const jsonPath = writeJson(resolve(REPORTS_DIR, `${id}.json`), report);
  writeJson(resolve(DATA_DIR, "latest-weekly.json"), report);

  const md = `# Weekly SEO — ${startedAt}

**Base:** ${base}  
**Salud semanal (hallazgos de esta corrida):** ${health.label} (${health.score})

## Integraciones

| API | Estado |
|-----|--------|
| PageSpeed | ${integrations.pagespeed ? "key presente" : "sin key (cuota pública limitada)"} |
| Search Console | ${integrations.gsc ? "credencial detectada" : "no configurada"} |
| GA4 Data API | ${integrations.ga4 ? "credencial detectada" : "no configurada"} |
| Bing Webmaster | ${integrations.bing ? "key presente" : "no configurada"} |

## Core Web Vitals (laboratorio PSI)

${psi
  .map((p) =>
    p.available
      ? `- ${p.strategy} ${p.url} — perf ${p.performanceScore ?? "n/d"}, LCP ${p.lcp != null ? Math.round(p.lcp) + "ms" : "n/d"}, CLS ${p.cls ?? "n/d"}`
      : `- ${p.strategy} ${p.url} — no disponible (${p.error || p.reason || "error"})`,
  )
  .join("\n")}

## Contenido

Borradores propuestos/actualizados: **${drafts.length}** (en \`content/seo/drafts/\`, publish=false).

## GSC / GA4

- GSC: ${gsc.available ? "datos reales" : gsc.reason}
- GA4: ${ga4.available ? "datos reales" : ga4.reason}

## Findings

${ranked.map((f) => `- **[${f.severity}]** ${f.code}: ${f.message}`).join("\n") || "_Ninguno_"}
`;

  writeMarkdownReport(`${id}.md`, md);
  appendRunLog({ id, type: "weekly", at: startedAt, drafts: drafts.length, health: health.label });
  updateState({ lastWeekly: id, lastWeeklyAt: startedAt });

  console.log(JSON.stringify({ id, health, drafts: drafts.length, jsonPath }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
