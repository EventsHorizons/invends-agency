# SEO Implementation — Invends

Cambios aplicados en código en esta iniciativa.

## Técnico

| Cambio | Archivos |
|--------|----------|
| Quitar `noindex,nofollow`; activar `index,follow` | `nuxt.config.ts` |
| `NUXT_PUBLIC_SITE_URL`, GA/GSC opcionales | `nuxt.config.ts`, `.env.example` |
| `robots.txt` + Sitemap URL | `public/robots.txt` |
| Sitemap dinámico (~70 URLs) | `server/routes/sitemap.xml.ts` |
| Composable meta + canonical + hreflang + OG/Twitter | `app/composables/usePageSeo.ts` |
| Helpers SEO + Organization JSON-LD | `app/utils/seo.ts` |
| Plugin GA4 / GSC verification (opt-in) | `app/plugins/seo-integrations.client.ts` |
| JSON-LD Organization + WebSite global | `app/layouts/default.vue` |

## Arquitectura de servicios

| Cambio | Archivos |
|--------|----------|
| Landings `/servicios/{slug}` (+ alias EN) | `app/pages/servicios/[slug].vue`, `servicios/index.vue`, `en/servicios/index.vue` |
| Contenido SEO por servicio (ES/EN) | `app/utils/servicePages.ts` |
| Schema Service + Breadcrumb + FAQ | landings de servicio |
| Enlaces hub/reel → landings | `ServicesView.vue`, `ServiceReel.vue`, `siteData.ts` SERVICES.href |
| Locale switch en servicios | `useLocale.ts` |

## Páginas optimizadas (meta)

- Home (`HomeView` + `messages.ts`)
- Servicios hub (`ServicesView`)
- Cada landing de servicio (11)
- Contacto, Nosotros, Blog index, Blog post, Portafolio index/detail
- Política de datos, Equipo, Glosario (`noindex`)

## Contenido / CRO / honestidad NAP

- Teléfono placeholder **oculto** hasta tener número real (`hasRealPhone`)
- Redes genéricas (linkedin.com/) no se enlazan como perfiles
- CTAs blog → contacto + servicios
- Breadcrumbs en servicios y blog

## Validación ejecutada

- `npm run build` — OK  
- Preview local: home `index,follow`, canonical, JSON-LD  
- `/sitemap.xml` — 70 locs  
- `/servicios/diseno-web` — H1 de landing + Service + FAQ schema  

## Pendiente de deploy

Los cambios **no se han desplegado** a GitHub/Vercel en esta tarea (requiere autorización explícita de push).
