# AUTOMATION ARCHITECTURE — Invends SEO Engine

## Propósito

Vigilar indexabilidad, detectar anomalías, proponer contenido/enlaces legítimos y registrar decisiones — **sin** spam, cloaking ni cambios masivos de URL.

## Componentes

| Pieza | Ruta |
|-------|------|
| Entrypoint | `scripts/seo-engine/run.mjs` |
| Daily | `scripts/seo-engine/daily.mjs` |
| Weekly | `scripts/seo-engine/weekly.mjs` |
| Monthly | `scripts/seo-engine/monthly.mjs` |
| Fetch / resolve base | `lib/fetch.mjs` |
| Decision engine | `lib/decision.mjs` |
| Integraciones API | `lib/integrations.mjs` |
| Estado / reports | `data/seo/*`, `docs/seo/reports/*` |
| Drafts | `content/seo/drafts/` |
| GitHub Actions | `.github/workflows/seo-{daily,weekly,monthly}.yml` |
| Dashboard | `/admin/seo` + `/api/seo/status` + `/api/seo/probe` |

## Calendario

| Frecuencia | Cron (UTC) | Acciones |
|------------|------------|----------|
| Diaria | `0 12 * * *` | Uptime, HTTP críticos, robots, sitemap, meta home, sample enlaces rotos, health score |
| Semanal | `0 13 * * 1` | Landings servicio, PSI lab, propuestas de draft, link ops log, GSC/GA4 si hay credenciales |
| Mensual | `0 14 1 * *` | Auditoría, inventario contenido, plan 30/90 días, arquitectura |

También: `workflow_dispatch` y scripts npm locales.

```bash
npm run seo:daily
npm run seo:weekly
npm run seo:monthly
npm run seo:all
```

## Motor de decisiones

1. Detectar finding (`code`)  
2. Clasificar severidad (`classifyFinding`)  
3. Planificar acciones  
4. **AUTO solo si** tipo ∈ {`report.write`, `state.update`, `draft.propose`, `opportunity.log`, `alert.emit`}  
5. Todo lo demás → MANUAL (DNS, redirects, publish, GBP…)  
6. Registrar en `data/seo/run-log.jsonl` + report JSON/MD  

No aplica autocorrección destructiva (no reescribe URLs de producción sola).

## Variables

Ver `.env.example` y `INTEGRATIONS_SETUP.md`.

- `SEO_SITE_URL` / `NUXT_PUBLIC_SITE_URL`
- `SEO_FALLBACK_SITE_URL` (Vercel) cuando DNS canónico falla
- `SEO_DASHBOARD_TOKEN`
- Secrets de GSC / GA4 / PSI / Bing

## Artefactos

Tras una corrida:

- `docs/seo/reports/{daily|weekly|monthly}-*.{json,md}`
- `data/seo/latest-*.json`
- `data/seo/state.json`

El dashboard lee `latest-*` del filesystem del deploy. Para ver informes de Actions en producción, subir artefactos o commitear reports (opcional, política del equipo).

## Fallos y recuperación

- Exit code `2` en daily si hay findings críticos (Actions usa `continue-on-error` + artifact).
- Si el dominio canónico no resuelve, el engine intenta `SEO_FALLBACK_SITE_URL`.
- Credenciales ausentes ⇒ `available: false` explícito, nunca filas inventadas.
