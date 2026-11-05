# PERFORMANCE REPORT — Invends (cleanup session)

**Fecha:** 2026-11-04  
**Método:** comparación de artefacto Nitro build local antes/después de eliminar `useSiteContent` + páginas legacy.

---

## Antes (build previo a limpieza, misma máquina)

| Métrica | Valor |
|---------|-------|
| Nitro Σ Total size | **4.63 MB** (971 kB gzip) |
| Chunk `useSiteContent-*.mjs` | **1.39 MB** (228 kB gzip) |
| Lab Lighthouse home (histórico docs) | Mobile perf ~0.85; Desktop ~0.81 |

Fuente histórica: `docs/performance/PERFORMANCE_METRICS.md` + log de build SEO sesión anterior.

---

## Después (build post-limpieza)

| Métrica | Valor |
|---------|-------|
| Nitro Σ Total size | **3.13 MB** (745 kB gzip) |
| Chunk `useSiteContent` | **Ausente** |
| Δ size | **−1.50 MB** raw (−226 kB gzip) |
| Build time | ~39–40 s (comparable) |

---

## Interpretación

- La ganancia es **real y medible** en el artefacto de servidor: se deja de empaquetar el CMS JSON legacy en cada deploy.
- No se re-ejecutó Lighthouse completo en esta pasada (tiempo); el impacto esperado en TBT/parse de rutas que no usaban el chunk es limitado en home (el home ya no dependía de ese JSON en el cliente crítico), pero **sí** reduce peso de función serverless / cold start en Vercel.
- Animaciones de marca (WebGL/GSAP/Lenis) **conservadas**.
- Field CWV / PSI producción: pendiente de dominio + API key (ver docs SEO).

---

## Qué no se midió como “mejora inventada”

- No se afirman puntos Lighthouse sin nueva corrida.
- Playwright unthrottled no se re-corrió; el delta primario documentado es tamaño de build.
