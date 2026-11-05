# REFACTORING REPORT — Invends

**Fecha:** 2026-11-04  
**Alcance:** cambios mínimos con beneficio medible. Sin rediseño ni renombres públicos.

---

## Realizado

### 1. Desacoplar CMS legacy del runtime

- Eliminadas páginas/componentes/composable que cargaban payloads Prismic en el server bundle.
- El portafolio y servicios Invends siguen en `siteData` / `servicePages` / vistas actuales.
- **Beneficio:** Nitro server `4.63 MB → 3.13 MB` (gzip `971 KB → 745 KB`).

### 2. Redirects legacy → 301

- `nuxt.config.ts` `routeRules` actualizados de redirect corto (307) a `{ to, statusCode: 301 }`.
- Alineado con intención SEO documentada; no cambia destinos.

### 3. Documentación de `content/`

- Añadido `content/README.md` aclarando que los JSON no alimentan la app.

---

## No realizado (a propósito)

| Idea | Motivo de rechazo |
|------|-------------------|
| Reorganizar carpetas app/ | Estética sin beneficio runtime |
| Dynamic import de GSAP en `useServiceReel` | Riesgo de regresión visual del reel |
| Purga agresiva de CSS | Riesgo a identidad / FOUC |
| Actualizar major de Nuxt/Vue | Fuera de limpieza rutinaria |
| Eliminar `content/*.json` del disco | Aún referenciados por `research/` |
| Eliminar chatbot | **No existe** en el código |
| Renombrar rutas públicas | Rompería SEO/bookmarks |

---

## Contratos públicos preservados

- Rutas canónicas Invends intactas.
- API `POST /api/contact` intacta.
- Metadatos / schema / sitemap / SEO engine intactos (sesión previa).
- Tokens visuales y AgencyGradient intactos.
