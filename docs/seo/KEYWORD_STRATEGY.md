# KEYWORD STRATEGY — Invends

**Fecha:** 2026-11-04  
**Nota metodológica:** sin tool de volumen (Ahrefs/Semrush/GSC) **no se inventan** search volumes, KD ni CPC. La clasificación usa intención, relevancia comercial del catálogo Invends y observación de SERPs públicas de agencias en Bogotá.

Cuando GSC esté activo, el informe weekly reemplazará hipótesis por consultas reales.

---

## Principios

1. Posicionar **servicios**, no solo la marca.
2. Una URL primaria por cluster (anti-canibalización).
3. Blog = informativo; landings = comercial/transaccional.
4. Geo: Colombia / Bogotá / LATAM **donde sea cierto** — sin micrositios de ciudad inventados.
5. Prioridad = intención de contratación × fit con oferta real.

---

## Mapa de clusters → página

### A. Diseño y desarrollo web

| Keyword / tema | Intención | Relevancia | Competencia (cualitativa) | Página | Prioridad |
|----------------|-----------|------------|---------------------------|--------|-----------|
| diseño web Bogotá | Transaccional local | Alta | Alta (muchas agencias) | `/servicios/diseno-web` | P0 |
| diseño de páginas web | Transaccional | Alta | Alta | `/servicios/diseno-web` | P0 |
| agencia de diseño web | Comercial | Alta | Alta | `/` + servicio | P0 |
| crear página web / para empresas | Transaccional | Alta | Alta | `/servicios/diseno-web` | P1 |
| diseño UX/UI | Comercial | Alta | Media-Alta | `/servicios/diseno-web` | P1 |
| rediseño de páginas web | Transaccional | Alta | Media | `/servicios/diseno-web` | P1 |
| desarrollo web / a medida | Transaccional | Alta | Alta | `/servicios/desarrollo-web` | P0 |
| empresa / agencia desarrollo web | Comercial | Alta | Alta | `/servicios/desarrollo-web` | P0 |
| desarrollo de sitios web | Transaccional | Alta | Alta | `/servicios/desarrollo-web` | P1 |
| desarrollo aplicaciones web | Comercial | Media | Media | `/servicios/desarrollo-apps` | P2 |

### B. Comercio electrónico

| Keyword / tema | Intención | Página | Prioridad |
|----------------|-----------|--------|-----------|
| crear tienda online | Transaccional | `/servicios/ecommerce` | P0 |
| desarrollo ecommerce / a medida | Transaccional | `/servicios/ecommerce` | P0 |
| diseño de tiendas virtuales | Comercial | `/servicios/ecommerce` | P1 |
| página web para vender productos | Transaccional | `/servicios/ecommerce` | P1 |

### C. Branding e identidad

| Keyword / tema | Intención | Página | Prioridad |
|----------------|-----------|--------|-----------|
| branding / agencia de branding | Comercial | `/servicios/branding` | P1 |
| identidad visual / corporativa | Comercial | `/servicios/branding` | P1 |
| diseño de marca | Comercial | `/servicios/branding` | P1 |

### D. Marketing digital y SEO

| Keyword / tema | Intención | Página | Prioridad |
|----------------|-----------|--------|-----------|
| agencia marketing digital Bogotá | Comercial local | `/servicios/marketing-digital` | P0 |
| marketing digital para empresas | Comercial | `/servicios/marketing-digital` | P1 |
| posicionamiento web / SEO | Comercial | `/servicios/seo` | P1 |
| estrategia digital / adquisición | Informativa→comercial | Blog → marketing | P2 |

### E. Especializados (catálogo Invends)

| Keyword / tema | Página | Prioridad |
|----------------|--------|-----------|
| automatización procesos empresariales | `/servicios/automatizacion` | P2 |
| IA aplicada a empresa | `/servicios/inteligencia-artificial` | P2 |
| MVP desarrollo rápido | `/servicios/mvp-rapido` | P2 |
| migrar / modernizar web legacy | `/servicios/migracion-legacy` | P2 |

### F. Local y audiencia

Combinaciones naturales (sin landings de ciudad):

- `… Bogotá`, `… Colombia`, `… para empresas`, `… pymes`, `… emprendedores`
- Cubiertas en copy de home, servicios y contacto — **no** `/medellin`, `/cali`, etc.

### G. Cola larga / preguntas (blog)

| Consulta | Intención | Destino |
|----------|-----------|---------|
| cómo elegir agencia diseño web | Comercial | Draft / futuro artículo → `/servicios/diseno-web` |
| por qué mi sitio no convierte | Informativa | `/blog/por-que-tu-sitio-no-convierte` |
| brief proyecto web | Informativa | `/blog/brief-antes-que-pixeles` (+ guía social) |
| continuidad anuncio landing | Informativa | `/blog/continuidad-anuncio-pagina` |
| modernizar web sin apagar | Comercial | `/blog/modernizar-sin-apagar` |

---

## Anti-canibalización

| Página | Rankea por | No debe rankear por |
|--------|------------|---------------------|
| `/` | Invends, agencia diseño/desarrollo Bogotá (marca+hub) | “tienda online a medida” |
| `/servicios` | servicios Invends / catálogo | keyword exacta de un solo oficio |
| `/servicios/diseno-web` | diseño web / UX | ecommerce, SEO servicio |
| `/blog/*` | preguntas / guías | title idéntico a landing |

---

## Prioridad de implementación (motor)

1. **P0:** diseño web, desarrollo web, ecommerce, marketing digital (+ DNS/GSC).  
2. **P1:** branding, SEO servicio, rediseño, UX, tiendas virtuales.  
3. **P2:** apps, IA, automatización, MVP, migración + contenidos de soporte.

El weekly engine propone borradores alineados a este mapa en `content/seo/drafts/`.
