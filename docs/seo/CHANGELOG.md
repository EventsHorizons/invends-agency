# SEO CHANGELOG — Invends

## 2026-11-04 — Autonomous SEO Engine

### Añadido

- Motor `scripts/seo-engine/` (daily / weekly / monthly + decision engine)
- GitHub Actions: `seo-daily.yml`, `seo-weekly.yml`, `seo-monthly.yml`
- Dashboard `/admin/seo` + API `/api/seo/status`, `/api/seo/probe`
- Docs: INITIAL_AUDIT, KEYWORD_STRATEGY, TECHNICAL_SEO, CONTENT_STRATEGY, AUTOMATION_ARCHITECTURE, INTEGRATIONS_SETUP, COMPETITOR_ANALYSIS, SEO_OPERATIONS
- `useAnalytics` + evento lead en formulario de contacto
- Sitemap con `lastmod` / `changefreq` / `priority` + catálogo `server/utils/seoCatalog.ts`
- `robots.txt` Disallow `/admin`
- npm scripts `seo:daily|weekly|monthly|all`
- Variables SEO en `.env.example`

### Observado

- Deployment Vercel OK; DNS `invends.com` no resolvía en el entorno de auditoría
- GSC/GA4/Bing sin credenciales → integraciones marcadas no disponibles

## 2026-11-03 — Fundación SEO técnica (sesión previa)

- Eliminado `noindex` global
- Sitemap + robots
- `usePageSeo`, JSON-LD, 11 landings de servicio
- NAP honesto (ocultar teléfono placeholder)
- Docs iniciales SEO_AUDIT / STRATEGY / KEYWORD_RESEARCH / etc.
