# SEO Audit — Invends

**Fecha:** 2026-11-03  
**Alcance:** código del sitio Nuxt (`3Drawers`), sin Search Console ni Analytics conectados aún.  
**Estado de métricas externas:** no medido (sin acceso a GSC/GA4/PSI de producción en esta sesión).

## Stack observado

| Ítem | Valor |
|------|--------|
| Framework | Nuxt 4.6 / Vue 3 / SSR |
| i18n | Custom ES + `/en/*` (sin `@nuxtjs/i18n`) |
| Dominio canónico previsto | `https://invends.com` |
| Contacto verificable | `hola@invends.com`, Bogotá / LATAM |
| Teléfono en código | Placeholder `+57 300 000 0000` (no usable para NAP) |

## Problemas encontrados (pre-implementación)

### 1. Críticos

| ID | Problema | Evidencia |
|----|----------|-----------|
| C1 | Meta `robots: noindex,nofollow` global | `nuxt.config.ts` — bloqueaba indexación |
| C2 | Sin `sitemap.xml` | No existía ruta ni archivo |
| C3 | Conflicto `robots.txt` (Allow) vs meta noindex | `public/robots.txt` permitía crawl pero meta prohibía index |

### 2. Altos

| ID | Problema | Evidencia |
|----|----------|-----------|
| A1 | Sin canonical / hreflang | Ningún uso en páginas |
| A2 | Sin JSON-LD | Organization / WebSite / Service / Article ausentes |
| A3 | OG incompleto (salvo blog post) | Solo `og:site_name` / `og:type` globales |
| A4 | 11 servicios solo como hashes `#` | Débil para intención transaccional |
| A5 | Teléfono placeholder en contacto/footer | Riesgo de NAP falso |
| A6 | Social URLs = raíces de red | Sin perfiles reales; no deben ir a `sameAs` |

### 3. Medios

| ID | Problema | Evidencia |
|----|----------|-----------|
| M1 | Portfolio/blog index sin meta description | `useHead` solo title |
| M2 | Enlaces hardcodeados ES en blog/portafolio detail | Rompe locale EN |
| M3 | Language switcher sin pares en slugs de servicio | `useLocale` incompleto |
| M4 | `/glosario` huérfano | Sin nav; valor SEO bajo |
| M5 | Residuos 3Drawers / Trespi / Scelerity | Comentarios, redirects, legacy pages |
| M6 | Portfolio declarado como muestras conceptuales | Correcto comercialmente; no inventar case studies |

### 4. Oportunidades

| ID | Oportunidad |
|----|-------------|
| O1 | Landings por servicio con contenido orientado a intención |
| O2 | Plan editorial blog → servicios |
| O3 | GA4 + Search Console + Bing Webmaster |
| O4 | Perfil de Empresa Google solo si hay NAP real |
| O5 | CWV medido en producción (Lighthouse/PSI) |
| O6 | Imagen OG dedicada 1200×630 |

## Servicios reales en el sitio (no inventados)

1. Diseño web  
2. Branding  
3. Desarrollo web  
4. Aplicaciones  
5. E-commerce  
6. SEO  
7. Marketing  
8. Inteligencia artificial  
9. Automatización  
10. Migración y refactorización  
11. MVP ultra-rápido (MaaS)

## Validación local post-fix (esta sesión)

| Check | Resultado |
|-------|-----------|
| `npm run build` | OK |
| `robots` meta home | `index,follow` (sin `noindex`) |
| Canonical home | `https://invends.com` |
| JSON-LD home | Organization + WebSite presentes |
| `/sitemap.xml` | 70 URLs |
| `/robots.txt` | Allow + Sitemap |
| `/servicios/diseno-web` | Corregido nesting Nuxt (`servicios/index.vue` + `[slug].vue`) |

## No verificado aún (externo)

- Indexación real en Google/Bing  
- Core Web Vitals de producción  
- Rich Results Test / Schema Validator en URL pública  
- Posiciones o impresiones (sin GSC)
