# PERFORMANCE_AUDIT — Invends

**Fecha:** 2026-11-03  
**Alcance:** sitio Nuxt 4 (SSR + prerender) en `invends` / workspace 3Drawers  
**Entorno de medición:** preview local `node .output/server/index.mjs` → `http://127.0.0.1:3000`  
**Field data:** no disponible en esta pasada (sin CrUX/RUM de producción)

---

## 1. Arquitectura observada

| Área | Estado |
|---|---|
| Framework | Nuxt `^4.6.3`, Vue `^3.5.44`, SSR + Nitro |
| Animación | GSAP (dynamic import), Lenis (dynamic + idle), WebGL2 propio (`createAgencyGradient`) |
| Fuentes | Roobert (WOFF2 local, preload Regular), Geist Variable + Italic (`non.geist`) |
| Contenido | `siteData` / `blogData` / `messages`; legacy `useSiteContent` + JSON en rutas redirect |
| Imágenes | WebP en `public/images`, lazy en grids/portafolio |
| Infra | `compressPublicAssets`, prerender de rutas clave, `Cache-Control` immutable en `/_nuxt`, `/fonts`, `/images` |

No se recomienda cambiar de framework: el cuello de botella era payload y work en el main thread, no el modelo SSR.

---

## 2. Problemas identificados (estado inicial / pre-cierre)

### P0 — Payload de contenido en el layout / hidratación

- Contenido de blog (~200KB+ fuente) llegaba a rutas que no lo necesitaban vía acoplamiento con datos de sitio.
- Impacto: JS parse/eval, TBT, TTI.

### P0 — Trabajo continuo fuera de viewport

- WebGL (`AgencyGradient`) y ticker del `ServiceReel` podían seguir en RAF aunque la sección no fuera visible.
- Impacto: CPU móvil, batería, INP bajo carga.

### P1 — LCP retrasado por intro GSAP

- `HomeHero` ponía `opacity: 0` en `.hero-body` (candidato LCP) hasta completar la timeline.
- En móvil, el LCP medido en probes detallados se alineaba con el final del reveal (~1.3s+), no con el HTML SSR.

### P1 — Fuentes y CSS globales

- Geist Italic (~73KB) cargado globalmente vía `css: ["non.geist/italic"]`.
- Roobert Regular precargado (correcto); variantes Bold/SemiBold bajo demanda.

### P1 — Imagen de principios

- `principle-diseno.webp` ~187KB; entraba en el peso total cuando el reel/hidratación la acercaba al viewport.

### P2 — Legacy `useSiteContent`

- Composable aún embebe `content/*.json` (chunk server ~1.39MB sin gzip) para páginas legacy (`/work`, `/press`, etc.) que redirigen.
- No está en el critical path de `/`, pero infla el artefacto Nitro.

### P2 — Personalidad visual costosa (aceptada)

- WebGL fullscreen + Lenis + GSAP son parte de la identidad. Objetivo: diferir y pausar, no eliminar.

---

## 3. Core Web Vitals — lectura de auditoría

### Laboratorio (Lighthouse, throttling simulado) — home post-optimización

Ver números exactos en `PERFORMANCE_METRICS.md` y `lab-results.json`.

| Métrica | Objetivo | Observación |
|---|---:|---|
| LCP | ≤ 2.5s | En LH home ≤ ~0.9s (lab throttled) tras no ocultar `.hero-body` |
| INP | ≤ 200ms | No medido con interacción real en campo; TBT es proxy de bloqueo |
| CLS | ≤ 0.1 | Home ~0; `/servicios` lab ~0.05 (aceptable) |

### Field data

No hay dataset CrUX/RUM en esta auditoría. Las métricas de localhost **no** representan usuarios reales (CDN, DNS, 4G, dispositivos mid-tier).

---

## 4. Cuellos de botella principales (ranking)

1. **Main-thread JS** — hidratación Vue + GSAP + Lenis + compile WebGL (TBT en Lighthouse).
2. **Ocultación animada del LCP** — opacity 0 en copy hero (corregido).
3. **Peso de imágenes de pilares / blog** — WebP grandes en listados.
4. **Fuentes display italic** — coste fijo en CSS entry.
5. **Legacy content chunks** — deuda de build, no de home.

---

## 5. Limitaciones de la auditoría

- Sin PageSpeed Insights remoto ni WebPageTest multi-ubicación.
- Sin trace de producción Vercel.
- INP de campo no instrumentado (`web-vitals` / analytics).
- Lighthouse desktop/móvil usan perfiles distintos; comparar solo con la misma configuración.
