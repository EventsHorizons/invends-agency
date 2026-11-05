# INITIAL AUDIT — Invends Autonomous SEO Engine

**Fecha:** 2026-11-04  
**Alcance:** código Nuxt 4 del repo + deployment Vercel medido por HTTP  
**Método:** inspección de código, fetch a deployment, sin inventar métricas de ranking

---

## 1. Stack e infraestructura

| Ítem | Hallazgo |
|------|----------|
| Framework | Nuxt `^4.6.3` + Vue 3 + Nitro SSR |
| Renderizado | SSR + `routeRules` prerender en home, servicios hub, blog index, contacto, etc. |
| Hosting | Vercel (`projectName: invends`) |
| Repo | `github.com/EventsHorizons/invends-agency` · branch `main` |
| Dominio canónico previsto | `https://invends.com` (`NUXT_PUBLIC_SITE_URL`) |
| DNS `invends.com` (esta sesión) | **No resolvía** desde el entorno local; el sitio sí responde en URL Vercel de producción |
| i18n | Custom ES + `/en/*` (sin `@nuxtjs/i18n`) |
| Contacto verificable | `hola@invends.com` · Bogotá / LATAM |
| Teléfono | Placeholder en código — **excluido** de schema/UI vía `hasRealPhone()` |
| Redes | URLs raíz (linkedin.com/, etc.) — **excluidas** de `sameAs` |

### Interpretación por rastreadores

Googlebot/Bing reciben HTML SSR/prerender de las rutas clave. Contenido principal de landings, hub y blog está en el HTML inicial (no depende solo de JS cliente). Animaciones (GSAP/Lenis/WebGL) se cargan diferidas y no son requisito para el contenido SEO.

---

## 2. Arquitectura de rutas (indexables)

| Ruta | Rol SEO |
|------|---------|
| `/` | Marca + agencia Bogotá / LATAM |
| `/servicios` | Hub de oferta |
| `/servicios/{slug}` × 11 | Intención transaccional por servicio |
| `/en` + `/en/servicios…` | Alternates EN |
| `/blog`, `/blog/{slug}` | TOFU / informativo |
| `/portafolio` | Credibilidad (muestras conceptuales — no inventar case studies) |
| `/sobre-nosotros`, `/contacto` | Confianza + conversión |
| `/glosario`, `/admin/**` | noindex |
| Legacy `/work`, `/services`, etc. | 301 → rutas ES |

Sitemap dinámico: `server/routes/sitemap.xml.ts` (+ prioridades/lastmod).  
Robots: `public/robots.txt` Allow + Sitemap + Disallow admin/legacy.

---

## 3. Estado SEO técnico (código)

### Corregido en iniciativa previa (2026-11-03)

- Meta global `noindex` eliminado → `index,follow`
- Canonical, hreflang, OG/Twitter vía `usePageSeo`
- JSON-LD Organization/ProfessionalService + WebSite (layout)
- Service + Breadcrumb + FAQ en landings
- BlogPosting en artículos
- 11 landings de servicio con copy real

### Verificado en esta sesión (Vercel production URL)

| Check | Resultado |
|-------|-----------|
| Home HTTP | 200 |
| `robots` meta home | `index,follow` |
| Canonical home | `https://invends.com` |
| `/robots.txt` | 200, Allow, Sitemap declarado |
| `/sitemap.xml` | 200 (medido vía PowerShell) |
| `site:invends.com` | Sin resultados públicos relevantes aún (dominio/DNS/indexación pendiente) |

### Riesgos abiertos

| ID | Severidad | Problema |
|----|-----------|----------|
| P0 | Crítico | DNS/custom domain `invends.com` no resolvía aquí → sin dominio canónico estable no hay SEO real |
| P1 | Alto | GSC / GA4 / Bing no conectados (sin credenciales) |
| P1 | Alto | Teléfono y perfiles sociales aún placeholder → NAP incompleto / sin GBP |
| P2 | Medio | Chunk legacy `useSiteContent` (~1.39MB) sigue en artefacto Nitro |
| P2 | Medio | Portafolio = muestras conceptuales (correcto comercialmente; no forzar “casos cliente”) |

---

## 4. Posicionamiento actual

**No hay datos de Search Console ni rankings medidos.**  
No se afirman posiciones, impresiones ni tráfico orgánico.

Señales cualitativas:

- Marca “Invends” aún no aparece como entidad consolidada en SERPs frente a homónimos ajenos (p. ej. Invend**e**s India — dominio distinto).
- Competencia Bogotá (listados públicos 2025–2026): AMD, Tuatara, Contra Studio, Bluecell, Branch, Seonet, Macgráficas, NC Soluciones Web, entre otras. Ver `COMPETITOR_ANALYSIS.md`.

---

## 5. Servicios reales a posicionar

1. Diseño web  
2. Branding  
3. Desarrollo web  
4. Aplicaciones  
5. E-commerce  
6. SEO  
7. Marketing digital  
8. Inteligencia artificial  
9. Automatización  
10. Migración / refactorización  
11. MVP ultra-rápido (MaaS)

---

## 6. Conclusión del discovery

El **código** ya es indexable y tiene arquitectura comercial por servicio. El cuello de botella actual es **operacional/externo**: DNS del dominio, verificación en GSC, analytics y autoridad de marca. El Autonomous SEO Engine queda instalado para vigilar disponibilidad, generar oportunidades y alimentar el dashboard sin inventar métricas.
