# TESTING REPORT — Invends cleanup

**Fecha:** 2026-11-04

---

## Automatizado / build

| Prueba | Resultado |
|--------|-----------|
| `npm run build` (post-eliminación legacy) | ✅ OK (~40 s) |
| `npm run build` (post-301 redirects) | ✅ OK · 3.13 MB / 745 kB gzip |
| Chunk `useSiteContent` en `.output` | ✅ Ausente |
| Grep `useSiteContent` / `ProjectGrid` en `app/` | ✅ 0 refs |

## HTTP local (preview `.output/server`)

| Ruta | Resultado |
|------|-----------|
| `/` | 200 · `robots=index,follow` |
| `/servicios`, `/servicios/diseno-web` | 200 |
| `/contacto`, `/blog`, `/portafolio`, `/sobre-nosotros` | 200 |
| `/sitemap.xml`, `/robots.txt` | 200 |
| `/admin/seo` | 200 |
| `/work` → `/portafolio` | **301** |
| `/services` → `/servicios` | **301** |
| `/contact` → `/contacto` | **301** |
| `/press` → `/blog` | **301** |
| `/team` → `/about-us/equipo` | **301** |
| `/policy` → políticas | **301** |

## No ejecutado (bloqueos / fuera de alcance)

| Ítem | Motivo |
|------|--------|
| Suite unit/e2e dedicada | No existe en el repo |
| Envío real Resend del formulario | Requiere `RESEND_API_KEY` |
| Lighthouse CLI re-run | Opcional; delta principal = bundle size |
| Chatbot / WhatsApp | No implementados en código |
| Validación visual exhaustiva móvil en browser | No corrida MCP browser en esta pasada; rutas HTTP OK |

## Regresiones conocidas introducidas

Ninguna detectada en build ni en smoke HTTP de rutas canónicas y redirects.
