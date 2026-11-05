# TECHNICAL SEO — Invends

## Canonicalización

- Origen canónico: `NUXT_PUBLIC_SITE_URL` (default `https://invends.com`).
- Cada página usa `rel=canonical` vía `usePageSeo`.
- hreflang `es` / `en` / `x-default` (x-default → ES) en rutas con par.
- Blog detail y portafolio detail: canonical ES (contenido solo ES).

## Metadatos

Composable: `app/composables/usePageSeo.ts`

- Title, description, robots, OG, Twitter, canonical, alternates.
- Landings: `app/utils/servicePages.ts` (meta únicos por servicio ES/EN).
- Home/copy: `app/utils/messages.ts` + vistas.

## Robots

- Meta default: `index,follow` (`nuxt.config.ts`).
- `/glosario`, `/admin/**`: noindex.
- `public/robots.txt`: Allow `/`, Disallow admin + legacy, Sitemap.

## Sitemap

- Ruta Nitro: `/sitemap.xml`
- Catálogo: `server/utils/seoCatalog.ts`
- Incluye: estáticas ES/EN, 11 servicios ×2 locales, proyectos, posts.
- Campos: `loc`, `lastmod`, `changefreq`, `priority`.

## Datos estructurados (JSON-LD)

| Tipo | Dónde | Notas |
|------|-------|-------|
| Organization + ProfessionalService | `layouts/default.vue` | Sin teléfono inventado; `sameAs` solo perfiles reales |
| WebSite | layout | |
| Service | landings | |
| BreadcrumbList | servicios, blog | |
| FAQPage | landings con FAQ reales | |
| BlogPosting | `/blog/[slug]` | |

Validar en Rich Results Test tras DNS público.

## Redirects

Definidos en `nuxt.config.ts` `routeRules` (301 legacy EN/ES: `/work`→`/portafolio`, `/services`→`/servicios`, etc.).

## JS / renderizado

- SSR + prerender selectivo — contenidos críticos en HTML.
- No se requiere prerender SPA-only.
- Lenis/GSAP/WebGL diferidos (performance).

## Rendimiento (referencia lab)

Ver `docs/performance/*`. Objetivos CWV: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.  
Field CrUX: pendiente de tráfico + dominio estable. El weekly engine registra PSI lab cuando la URL es alcanzable.

## Checklist de verificación

```bash
npm run build
npm run seo:daily
# Abrir /sitemap.xml /robots.txt en preview o producción
# Confirmar home sin noindex
```
