# FULL PROJECT AUDIT — Invends

**Fecha:** 2026-11-04  
**Alcance:** repositorio completo (app, server, public, scripts, content, research, social, docs)  
**Protocolo:** inspeccionar → clasificar → eliminar solo con evidencia → validar build  
**Git al inicio:** branch `main` con cambios SEO previos sin commit (preservados; no se revirtieron)

---

## 1. Stack

| Pieza | Valor |
|-------|--------|
| Framework | Nuxt 4.6 / Vue 3 / Nitro SSR |
| Hosting | Vercel |
| Animación | GSAP (hero + service reel), Lenis (layout), WebGL AgencyGradient |
| Tipografía | Roobert local + Geist (`non.geist`) |
| Dependencias runtime | `nuxt`, `vue`, `vue-router`, `gsap`, `lenis`, `non.geist` |
| DevDeps | `playwright`, `sharp` |

---

## 2. Mapa de aplicación activa (A)

### Rutas canónicas Invends

| Ruta | Fuente |
|------|--------|
| `/`, `/en` | `HomeView` |
| `/servicios`, `/en/servicios`, `/servicios/[slug]` | ServicesView + landings |
| `/portafolio`, `/portafolio/[slug]` | siteData PROJECTS |
| `/blog`, `/blog/[slug]` | blogData |
| `/contacto`, `/en/contacto` | ContactView + SiteContactForm + `/api/contact` |
| `/sobre-nosotros`, equipo, políticas, glosario | páginas propias |
| `/admin/seo` | dashboard SEO (noindex) |

### Infra

- Layout + JSON-LD, plugins SEO/scroll, sitemap, robots, SEO engine, contact API, media CDN proxy.

### Identidad

- Tokens CSS, AgencyGradient, tipografía — **no tocar** salvo evidencia de peso muerto seguro.

---

## 3. Clasificación

### A — Activos (conservar)

Componentes de marca, landings, blog, contacto, SEO engine, social/instagram pipeline, fonts Roobert (incl. itálicas usadas en templates IG), GSAP/Lenis/Geist, scripts `perf-lab`, `build-og-image`, `render-instagram`, `seo-engine`.

### B — Sin uso en runtime de producción (candidatos)

| Elemento | Evidencia |
|----------|-----------|
| `app/pages/services.vue` | Superseded por `/servicios` + `routeRules` redirect `/services` |
| `app/pages/contact.vue` | Redirect `/contact` → `/contacto`; form demo sin API |
| `app/pages/work/*` | Redirect → `/portafolio`; CMS Monopo |
| `app/pages/team/*` | Redirect → `/about-us/equipo` |
| `app/pages/press.vue` | Redirect → `/blog` |
| `app/pages/policy.vue` | Redirect → `/politicas-de-privacidad` |
| `ProjectGrid`, `ProjectFilters`, `ProjectSlices` | Solo referenciados por `work/*` |
| `useSiteContent.ts` | Solo legacy pages; importa ~1.6 MB JSON |
| Import de `content/*.json` en app | Única vía: `useSiteContent` |

### C — Duplicados / solapamiento

- Portafolio Invends (`siteData.PROJECTS`) vs CMS legacy (`content/projects.json`) — el activo es siteData.
- Contacto real (`ContactView`) vs `contact.vue` legacy.
- Docs SEO antiguos (`SEO_AUDIT.md`…) coexisten con docs nuevos — **conservar** (históricos, no afectan runtime).

### D — Obsoletos (tooling / investigación)

- `research/*` — scripts one-shot de rebrand/Prismic (no en build).
- `scripts/fetch-magnific*.mjs`, harvest, rebrand — tooling offline.
- `public/images/_magnific_tmp` — vacío.
- Carpeta `blog/` raíz — residual (no es `app/pages/blog`).

### E — Defectuosos / deuda

| Ítem | Notas |
|------|-------|
| Chunk `useSiteContent` ~1.39 MB gzip 228 KB | Infla Nitro aunque las rutas redirijan |
| PSI/CWV field | Sin CrUX; lab documentado en `docs/performance/` |
| Chatbot / WhatsApp | **No existen** en el código — no eliminar; documentar como ausentes |
| DNS `invends.com` | Externo; no es cleanup de código |

### F — Riesgo (conservar)

- `content/*.json` en disco (payload histórico) — no cargar en app, pero conservar archivos o archivar bajo `research/`.
- `glosario` noindex — bajo valor SEO, inofensivo.
- Itálicas Roobert — usadas por `social/instagram`.
- Animaciones WebGL/GSAP/Lenis — identidad de marca.
- `server/routes/media/cdn` — puede servir assets legacy de proyectos.

---

## 4. Dependencias (resumen)

Todas las deps de `package.json` tienen uso comprobado. No hay candidatos claros a `npm uninstall` sin romper scripts (playwright/sharp = perf + OG/favicon).

Detalle: `DEPENDENCIES_AUDIT.md`.

---

## 5. Priorización de limpieza

| Prioridad | Acción | Riesgo | Beneficio |
|-----------|--------|--------|-----------|
| P0 | Eliminar páginas legacy + Project* + `useSiteContent` | Bajo (redirects ya cubren URLs) | −~1.4 MB chunk server |
| P1 | Dejar de importar `content/*.json` en app; archivar nota | Bajo | Bundle limpio |
| P2 | Quitar dir vacío `_magnific_tmp` / residual `blog/` raíz si vacío | Nulo | Higiene |
| P3 | No touch research/social/scripts tooling | — | — |

---

## 6. Protocolo de validación post-cambio

1. `npm run build`  
2. Preview: `/`, `/servicios`, `/contacto`, `/blog`, `/portafolio`, `/sitemap.xml`  
3. Confirmar redirects `/work`, `/services`, `/contact`  
4. Confirmar ausencia de chunk `useSiteContent` en `.output`  
5. Formulario contacto: código intacto (sin E2E Resend si no hay key)
