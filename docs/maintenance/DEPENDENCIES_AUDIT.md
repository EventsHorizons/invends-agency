# DEPENDENCIES AUDIT — Invends

**Fecha:** 2026-11-04  
**Fuente:** `package.json` + grep de imports/scripts

---

## dependencies

| Paquete | Uso comprobado | Acción |
|---------|----------------|--------|
| `nuxt` | Framework | Conservar |
| `vue` | UI | Conservar |
| `vue-router` | Routing (vía Nuxt) | Conservar |
| `gsap` | `HomeHero`, `useServiceReel` | Conservar |
| `lenis` | `layouts/default.vue` (dynamic) | Conservar |
| `non.geist` | `nuxt.config.ts` CSS + display italic | Conservar |

## devDependencies

| Paquete | Uso comprobado | Acción |
|---------|----------------|--------|
| `playwright` | `scripts/perf-lab.mjs` | Conservar |
| `sharp` | `scripts/build-og-image.mjs`, favicon, etc. | Conservar |

---

## Conclusión

- **0 paquetes eliminados:** todos tienen uso directo verificable.
- No se detectaron duplicados semánticos instalados a propósito.
- No se hizo bump de majors.
- `node_modules` / lockfile no se regeneraron innecesariamente.

## Notas

- Playwright/sharp no van al bundle de cliente de producción (devDependencies + scripts).
- Futuras integraciones SEO (`googleapis`) se añadirían solo al cablear GSC/GA4 Data API.
