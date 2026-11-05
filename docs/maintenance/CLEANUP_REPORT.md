# CLEANUP REPORT — Invends

**Fecha:** 2026-11-04  
**Regla aplicada:** eliminar solo con evidencia de no uso en runtime activo.

---

## Eliminado

### Páginas legacy (redirigidas por `routeRules`)

| Archivo | Motivo | Evidencia | Prueba |
|---------|--------|-----------|--------|
| `app/pages/services.vue` | CMS Monopo; canónico `/servicios` | Redirect `/services` + ServicesView | 301 → `/servicios` |
| `app/pages/contact.vue` | Form demo sin API; canónico `/contacto` | Redirect + ContactView | 301 → `/contacto` |
| `app/pages/work/index.vue` | Portafolio CMS; canónico `/portafolio` | Redirect `/work` | 301 → `/portafolio` |
| `app/pages/work/[uid].vue` | Case studies CMS | Redirect `/work/**` | 301 → `/portafolio` |
| `app/pages/team/index.vue` | Equipo CMS | Redirect `/team` | 301 → `/about-us/equipo` |
| `app/pages/team/[uid].vue` | Ficha miembro CMS | Redirect `/team/**` | 301 |
| `app/pages/press.vue` | Press CMS | Redirect `/press` | 301 → `/blog` |
| `app/pages/policy.vue` | Cookie policy CMS | Redirect `/policy` | 301 → políticas |

### Componentes solo usados por legacy

| Archivo | Motivo | Evidencia |
|---------|--------|-----------|
| `app/components/ProjectGrid.vue` | Solo `work/index` | Grep post-borrado: 0 refs en app |
| `app/components/ProjectFilters.vue` | Solo `work/index` | idem |
| `app/components/ProjectSlices.vue` | Solo `work/[uid]` | idem |

### Composable + acoplamiento bundle

| Archivo | Motivo | Evidencia |
|---------|--------|-----------|
| `app/composables/useSiteContent.ts` | Importaba `content/*.json` (~1.6 MB) solo para páginas legacy | Chunk `useSiteContent-*.mjs` (1.39 MB) desapareció del build |

### Residuos vacíos

| Elemento | Motivo |
|----------|--------|
| `blog/` (raíz, `semana-2` vacío) | No es `app/pages/blog`; 0 archivos |
| `public/images/_magnific_tmp/` | Directorio vacío de harvest |

---

## Conservado a propósito

| Elemento | Razón |
|----------|-------|
| `content/*.json` | Histórico + `research/*`; **ya no se importan en app** (`content/README.md`) |
| `research/`, scripts magnific/rebrand | Tooling offline |
| `social/instagram`, fuentes itálicas Roobert | Pipeline creativo |
| `glosario` | Página noindex inofensiva |
| GSAP / Lenis / WebGL / animaciones | Identidad visual |
| SEO engine / admin / docs SEO | Sistema activo (sesión previa) |

---

## No eliminado (sin evidencia suficiente)

- Imágenes blog/hero/services: 26/26 blog referenciadas.
- Dependencias npm: todas con uso.
- CSS global: sin purga agresiva (riesgo visual).
- `server/routes/media/cdn`: posible servicio de assets.
