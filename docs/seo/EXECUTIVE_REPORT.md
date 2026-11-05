# Informe ejecutivo — Invends Autonomous SEO Engine

**Fecha:** 2026-11-04  
**Estado del código:** build OK · engine daily/weekly/monthly ejecutados · dashboard verificado en local

---

## 1. Qué encontraste

- Sitio Nuxt 4 en Vercel con base SEO técnica ya sólida (indexable, landings de servicio, schema, sitemap).
- Dominio canónico previsto `https://invends.com`: **DNS no resolvía** en el entorno de auditoría; el deployment Vercel sí respondía (usado como fallback del engine).
- Sin resultados `site:invends.com` relevantes aún (indexación pública pendiente del dominio).
- GSC / GA4 / Bing **sin credenciales** → sin impresiones, clics ni sesiones orgánicas medibles.
- Mercado Bogotá competitivo (AMD, Tuatara, Contra, Bluecell, Branch, Seonet, etc.).
- Teléfono y redes sociales aún placeholder (correctamente excluidos de NAP/schema).

## 2. Problemas corregidos / mitigados

- Sitemap enriquecido (`lastmod`, prioridad, catálogo dedicado).
- `robots.txt` bloquea `/admin`.
- Token del dashboard leído en **runtime** (no solo bake de build).
- Eventos de conversión GA4 en formulario (`generate_lead` / `contact_form_submit`) cuando exista `NUXT_PUBLIC_GA_ID`.
- Hueco editorial: artículo publicado `como-elegir-agencia-diseno-web`.

## 3. Mejoras implementadas

- Arquitectura documental completa bajo `/docs/seo/` (nombres pedidos + índice).
- Motor autónomo `scripts/seo-engine/` con decision engine (auto solo en reportes/drafts/alertas).
- GitHub Actions daily / weekly / monthly.
- Dashboard `/admin/seo` + APIs status/probe.
- 8 borradores de contenido en `content/seo/drafts/` (publish=false).
- Log de oportunidades de enlaces legítimos (sin outreach spam).

## 4. Automatizaciones funcionando

| Job | Comando / workflow | Verificado |
|-----|--------------------|------------|
| Daily | `npm run seo:daily` / `seo-daily.yml` | Sí — health 100 (fallback Vercel), 0 findings |
| Weekly | `npm run seo:weekly` / `seo-weekly.yml` | Sí — 8 drafts; GSC pendiente; PSI 429 sin API key |
| Monthly | `npm run seo:monthly` / `seo-monthly.yml` | Sí — plan 30/90 generado |

## 5. Integraciones activas

- HTTP live checks del engine (sí).
- Schema / meta / sitemap / robots en código (sí).
- GA4 gtag + eventos (código listo; **ID no configurado**).
- Plugin verificación GSC (código listo; **token no configurado**).

## 6. Integraciones que necesitan credenciales

Ver `INTEGRATIONS_SETUP.md`:

1. DNS `invends.com` → Vercel  
2. `NUXT_PUBLIC_GSC_VERIFICATION` + propiedad GSC + sitemap  
3. `NUXT_PUBLIC_GA_ID`  
4. `SEO_DASHBOARD_TOKEN`  
5. Opcional: `PAGESPEED_API_KEY`, service accounts GSC/GA4, Bing API  
6. Teléfono / perfiles sociales reales en `contactInfo.ts`

## 7. Resultados medidos (esta sesión)

| Métrica | Valor | Fuente |
|---------|-------|--------|
| Health daily | 100 / healthy | engine HTTP |
| Home robots | index,follow | HTML live |
| Canonical home | https://invends.com | HTML live |
| Sitemap URLs (prod) | 70 | live |
| Sitemap URLs (build local post-artículo) | 71 | preview local |
| Admin robots | noindex,nofollow | preview local |
| PSI lab | 429 (sin key) | weekly |
| Impresiones/clics/posición | no disponible | sin GSC |
| Tráfico orgánico | no disponible | sin GA4 |

## 8. Oportunidades pendientes

1. Activar DNS canónico y GSC (bloqueante).  
2. Publicar 1–2 drafts tras revisión humana.  
3. Sustituir NAP/social placeholders.  
4. API key PSI para CWV lab recurrentes.  
5. Wiring completo `googleapis` cuando exista service account.  
6. Reducir peso legacy `useSiteContent` (performance).  
7. Autoridad: directorios B2B legítimos — manual.

## 9. Qué hará el sistema cada día

Comprobar uptime, HTTP de páginas críticas, robots, sitemap, noindex en home, muestra de enlaces rotos, calcular health score, escribir informe en `docs/seo/reports/` y actualizar `data/seo/state.json`. Si hay críticos, exit code 2 + artifact en Actions.

## 10. Estrategia para primeras posiciones

Competir por **intención de contratación** (diseño web, desarrollo, ecommerce, marketing digital Bogotá/LATAM) con landings honestas + contenido de método, no por volumen spam. Medir con GSC real, iterar titles/CTR, sostener CWV, construir menciones legítimas. El engine vigila y propone; las decisiones comerciales y el publish siguen siendo humanos.
