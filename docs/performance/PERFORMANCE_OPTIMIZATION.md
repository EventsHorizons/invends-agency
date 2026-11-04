# PERFORMANCE_OPTIMIZATION — Invends

Registro de cambios implementados en el repositorio (sin despliegue a producción).

---

## 1. JavaScript / TypeScript

| Cambio | Justificación |
|---|---|
| Split `blogData` vs `siteData` (`scripts/split-blog-data.mjs`) | Evita arrastrar posts al layout/home |
| `LazyServiceReel` + `hydrate-on-visible` en home | Hidrata el reel solo al aproximarse al viewport |
| `LazySiteContactForm` + `hydrate-on-visible` | Formulario fuera del critical path |
| `LazyServiceUiStage` en servicios | Escenario UI pesado bajo demanda |
| GSAP en `HomeHero` vía `import("gsap")` | No empaqueta GSAP en el entry síncrono |
| Lenis en `default.vue` con `requestIdleCallback` | Smooth scroll como progressive enhancement |
| WebGL `createAgencyGradient` dynamic import + idle boot | Shader compile / RAF tras first paint |
| `IntersectionObserver` pause en `AgencyGradient` y `useServiceReel` | Corta trabajo fuera de vista / `document.hidden` |
| Intro hero sin `opacity: 0` en `.hero-body` | Conserva LCP del HTML SSR |
| Scroll exit del hero solo `opacity` + `transform` (sin `filter: blur`) | Menos paint cost en scroll |

### No hechos (a propósito)

- No se eliminó GSAP, Lenis ni WebGL (identidad).
- No se memoizó de forma indiscriminada.
- No se añadió bundle analyzer como dependencia de runtime.

---

## 2. Imágenes

| Cambio | Justificación |
|---|---|
| `principle-diseno.webp` re-encode (~187KB → ~82KB, max width 1400, q78) | Mismo aspecto visual, menos transfer |
| `loading="lazy"` / `sizes` en grids y featured home | Evita competir con LCP |
| `ServiceVisual`: `eager` solo cuando el reel no usa `idPrefix` (página servicios) | Home reel no pelea el LCP del hero |
| OG `og-invends.png` de marca | Social preview estable, sin asset off-brand |

---

## 3. Fuentes y CSS

| Cambio | Justificación |
|---|---|
| Preload solo `Roobert-Regular.woff2` | Face crítica de UI body |
| Italics Roobert retiradas del preload / @font-face innecesario | Menos requests |
| `font-display` vía stacks existentes + Geist package | Evita FOIT prolongado |
| Conservación de breakpoints e identidad en CSS de layout | Sin rediseño |

---

## 4. Infra Nitro / headers

En `nuxt.config.ts`:

- `nitro.compressPublicAssets: true`
- Prerender de rutas ES/EN principales
- `Cache-Control: public, max-age=31536000, immutable` en `/fonts/**`, `/images/**`, `/_nuxt/**`
- Redirects legacy (`/work` → `/portafolio`, etc.)

No se tocaron secretos ni caches de respuestas privadas (contacto API).

---

## 5. Animaciones / UX

Reglas aplicadas:

1. Preferir `transform` / `opacity`.
2. Pausar WebGL y tickers fuera de viewport.
3. Respetar `prefers-reduced-motion` (hero, Lenis, gradient, reel).
4. Limpiar listeners / timelines en `onBeforeUnmount`.
5. Diferir Lenis y WebGL para no competir con hidratación temprana.

La personalidad visual (olas WebGL, reveal tipográfico, reel) se mantiene.

---

## 6. Archivos tocados (principales)

- `nuxt.config.ts`
- `app/layouts/default.vue`
- `app/components/HomeHero.vue`
- `app/components/HomeView.vue`
- `app/components/AgencyGradient.vue`
- `app/components/ServiceVisual.vue`
- `app/composables/useServiceReel.ts`
- `app/utils/blogData.ts` / `siteData.ts` / `contactInfo.ts`
- `scripts/split-blog-data.mjs`, `scripts/perf-lab.mjs`
- `public/images/principle-diseno.webp`
- `docs/performance/*`

---

## 7. Dependencias

- **Eliminadas:** ninguna de producción.
- **Añadidas:** ninguna de runtime. `playwright` / `sharp` ya eran devDependencies para labs/assets.
