# PERFORMANCE_METRICS — Invends

## Metodología

| Método | Condiciones | Uso |
|---|---|---|
| **Lighthouse CLI** | Chrome headless, categorías `performance`, mobile + desktop presets (throttling simulado de LH) | Lab comparable / CWV proxy |
| **Playwright `scripts/perf-lab.mjs`** | Chromium headless, localhost, **sin** CPU/network throttle | Timing de transfer + paint optimista |
| **Field (CrUX / RUM)** | No ejecutado | Pendiente post-deploy |

**Importante:** no comparar Playwright unthrottled con Lighthouse throttled como si fueran la misma prueba. No presentar localhost como field data.

Artefactos:

- `docs/performance/lighthouse-home-mobile.json`
- `docs/performance/lighthouse-home-desktop.json`
- `docs/performance/lab-results.json`

---

## Resultados de laboratorio — Lighthouse (home `/`)

Medición sobre build de producción servida en local tras las optimizaciones de cierre (defer Lenis/WebGL, LCP-safe hero, imagen principio).

| Perfil | Score | FCP (ms) | LCP (ms) | TBT (ms) | CLS | Speed Index (ms) |
|---|---:|---:|---:|---:|---:|---:|
| Mobile | **0.85** | 841 | 841 | 553 | 0 | 3225 |
| Desktop | **0.81** | 858 | 858 | 318 | 0 | 2141 |

### Lectura

- **LCP / FCP** alineados: el LCP es texto (`.hero-body`), no una imagen hero.
- **CLS** en objetivo (≤ 0.1).
- **TBT** sigue siendo el principal lastre del score (JS de hidratación + GSAP/WebGL diferidos pero aún presentes).
- Desktop score histórico en la misma pasada de trabajo: ~0.66 → **0.81** (TBT ~884 → ~318) tras diferir Lenis/WebGL y no ocultar el LCP.

---

## Resultados de laboratorio — Playwright unthrottled

| Ruta | Viewport | FCP | LCP | CLS | Transfer (KB) | JS (KB) | Img (KB) |
|---|---|---:|---:|---:|---:|---:|---:|
| `/` | 1365×900 | 404 | 404 | 0 | 494 | 130 | 153 |
| `/` | 390×844 | 236 | 236 | 0 | 494 | 130 | 153 |
| `/servicios` | 1365×900 | 328 | 328 | 0.0544 | 423 | 135 | 145 |
| `/blog` | 1365×900 | 392 | 392 | 0 | 679 | 125 | 384 |

TTFB local típico: **7–30 ms** (no representativo de edge/CDN).

---

## Core Web Vitals vs objetivos

| Indicador | Objetivo | Lab (LH home) | Field |
|---|---:|---|---|
| LCP | ≤ 2500 ms | ✅ ~841–858 ms | No medido |
| INP | ≤ 200 ms | Proxy: TBT 318–553 ms (no es INP) | No medido |
| CLS | ≤ 0.1 | ✅ 0 | No medido |

---

## Peso y solicitudes (home, Playwright)

- ~38 recursos en carga inicial sin scroll.
- Transfer total ~494 KB (localhost; compresión Nitro activa en estáticos).
- Imágenes above-the-fold reducidas tras recomprimir `principle-diseno.webp` (~187 → ~82 KB en disco).

---

## Cómo re-ejecutar

```bash
npm run build
node .output/server/index.mjs
# otra terminal:
node scripts/perf-lab.mjs http://127.0.0.1:3000/
node scripts/perf-lab.mjs http://127.0.0.1:3000/ --mobile
npx lighthouse http://127.0.0.1:3000/ --only-categories=performance --form-factor=mobile --output=json --output-path=docs/performance/lighthouse-home-mobile.json --chrome-flags="--headless --no-sandbox"
```
