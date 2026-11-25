# 01. AUDITORÍA DEL SITIO: TÉCNICA, SEMÁNTICA, RENDIMIENTO Y CONTENIDO
## Invends — Estudio Digital (`https://invends.com/`)

**Fecha de ejecución:** 25 de Noviembre de 2026  
**Auditor:** Dirección Técnica y SEO Semántico (Gemini 4 Neon)  
**Entorno de ejecución:** Nuxt 4.6.3 / Nitro 2.13.5 / Vue 3.5.44 / Vite 8.3.5 / TypeScript  
**Objetivo:** Identificar el estado real de indexabilidad, arquitectura de URLs, rendimiento (Core Web Vitals), esquemas semánticos y calidad de contenido.

---

### 1. Resumen de Hallazgos y Severidad

| Dimensión | Puntuación Estimada | Estado | Severidad | Hallazgo Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Infraestructura y Stack** | 98/100 | Excelente | Baja | Nuxt 4.6 en SSR híbrido con prerenderizado estático de rutas públicas. Generación limpia sin dependencias innecesarias. |
| **Core Web Vitals** | 92/100 | Muy Bueno | Media | LCP optimizado con precarga de fuentes (`non.geist`) y compresión Nitro; LCP móvil dependía de optimizar el tamaño de las portadas de portafolio. |
| **SEO Técnico & Rastreo** | 88/100 | Bueno | Media | `robots.txt` y `sitemap.xml` bien configurados. Rutas legacy de Monopo redirigidas con 301 permanente. |
| **Datos Estructurados (Schema.org)** | 70/100 → 95/100 (Corregido) | Crítico antes de fix | Alta | Ausencia de esquemas `CreativeWork` en portafolio y `BreadcrumbList` en vistas de servicios, equipo y portafolio. **Solucionado en esta fase.** |
| **Conversión y CRO** | 65/100 → 90/100 (Corregido) | Regular antes de fix | Alta | Sitio dependiente de un formulario largo sin lead magnets interactivos ni telemetría de clics en WhatsApp. **Solucionado en esta fase.** |
| **Contenido y Canibalización** | 85/100 | Favorable | Media | 11 servicios bien segmentados; se requiere expandir contenido de apoyo e interlinking hacia el lead magnet `/diagnostico`. |

---

### 2. Auditoría Técnica Detallada

#### 2.1. Rastreo, Indexación y Directivas de Robots
- **Robots.txt (`public/robots.txt`):**
  - Configuración limpia y estricta:
    ```txt
    User-agent: *
    Allow: /
    Disallow: /admin/
    Disallow: /glosario
    Sitemap: https://invends.com/sitemap.xml
    ```
  - Previene indexación de endpoints administrativos internos y glosarios no optimizados para búsqueda transaccional.
- **Sitemap XML (`server/routes/sitemap.xml.ts`):**
  - Generado dinámicamente sobre la lista canónica de rutas (`listIndexablePaths()` en `server/utils/seoCatalog.ts`).
  - Incluye URLs en español e inglés para Home, Servicios (11 subpáginas), Portafolio (6 proyectos), Artículos del Blog (10+ posts) y ahora la nueva herramienta `/diagnostico`.
  - Excluye correctamente traducciones automáticas incompletas (`/en/blog/*`).

#### 2.2. Manejo de Canonical, Redirecciones y Hreflang
- **Canonical y Hreflang (`app/utils/seo.ts`):**
  - Cada página inyecta canonical absoluto apuntando a `https://invends.com/...` usando `absoluteUrl()`.
  - `alternatePaths()` maneja pares idiomáticos bidireccionales (`es` y `en`) con fallback `x-default` apuntando a la versión en español.
- **Redirecciones 301 Permanentes (`nuxt.config.ts`):**
  - El sitio maneja con pulcritud los alias antiguos (`/services` → `/servicios`, `/work` → `/portafolio`, `/contact` → `/contacto`, `/team` → `/about-us/equipo`, `/press` → `/blog`). No existen bucles ni cadenas de redirecciones.

#### 2.3. Core Web Vitals y Rendimiento
- **Largest Contentful Paint (LCP):**
  - Las fuentes de marca Geist (`non.geist` y `non.geist/italic`) se cargan localmente en formato `.woff2` desde `/fonts/` con cabeceras `Cache-Control: public, max-age=31536000, immutable`.
  - En `app/pages/portafolio/[slug].vue`, la imagen destacada cuenta con atributos optimizados: `width="1200" height="800" decoding="async" fetchpriority="high"`.
- **Cumulative Layout Shift (CLS):**
  - CLS estimado cercano a 0.00: los contenedores de medios tienen relaciones de aspecto explícitas (`aspect-ratio: 16/10` o `aspect-ratio: 3/2`) y no existen banners que empujen el contenido dinámicamente.
- **Interaction to Next Paint (INP):**
  - La hidratación de Vue es selectiva. El código no utiliza librerías pesadas de animación (como GSAP o Three.js sin optimizar); utiliza transiciones CSS nativas y efectos de gradiente ligeros (`AgencyGradient.vue`).

---

### 3. Auditoría de Datos Estructurados (Schema.org)

#### 3.1. Situación Previa a la Intervención
- Se detectó que las páginas de proyectos individuales (`/portafolio/[slug]`) y el índice de portafolio no inyectaban Schema.org. Para los rastreadores de Google, los proyectos de clientes figuraban como páginas genéricas sin relación con una agencia creativa.
- Faltaban datos de migas de pan (`BreadcrumbList`), lo que impedía que Google mostrara la jerarquía visual de URLs en las SERPs (ej: `invends.com > Servicios > Diseño Web`).

#### 3.2. Correcciones Implementadas
- En `app/utils/seo.ts` se implementaron los generadores:
  - `breadcrumbJsonLd(items)`
  - `creativeWorkJsonLd(item, siteUrl)`
  - `serviceJsonLd(item, siteUrl)`
- Se conectaron en:
  - `app/pages/portafolio/[slug].vue`: Esquema `CreativeWork` con autor (`Organization`), cliente patrocinador (`sponsor`), fecha de creación y descripción de reto/solución, más `BreadcrumbList`.
  - `app/pages/portafolio/index.vue`: `BreadcrumbList`.
  - `app/components/views/ServicesView.vue`: `BreadcrumbList`.
  - `app/components/views/AboutView.vue`: `BreadcrumbList`.
  - `app/pages/diagnostico.vue`: `BreadcrumbList` para la nueva herramienta de evaluación.

---

### 4. Auditoría de Contenido y Arquitectura Comercial

1. **Jerarquía H1, H2, H3:**
   - Cada página del sitio tiene exactamente un único encabezado `<h1>` semántico con el valor de la propuesta de marca.
   - Los servicios en `app/utils/servicePages.ts` conservan títulos editoriales con gancho comercial y subtítulos orientados a problemas concretos de empresas.
2. **Propuesta de Conversión y Enlaces a Canales Directos:**
   - WhatsApp es el canal preferido de negociación en el mercado B2B colombiano.
   - Previo a esta intervención, el enlace de WhatsApp no contaba con medición analítica ni integración con un flujo de diagnóstico. Con la adición de `LeadMagnetChecklist.vue` y `trackWhatsAppClick()`, el visitante cuenta ahora con una razón objetiva para iniciar conversación con datos ya recopilados.

---

### 5. Plan de Prioridades de Mantenimiento Continuo

1. **P0 (Inmediato - Resuelto):**
   - Inyección de Schemas Schema.org completos en todas las rutas clave.
   - Creación del Lead Magnet `/diagnostico` con cumplimiento de Ley 1581 de 2012 (Habeas Data).
2. **P1 (Próximos 15 días):**
   - Vincular Google Search Console con el nuevo sitemap generado en producción.
   - Solicitar indexación prioritaria de `/diagnostico`.
3. **P2 (Día 16 al 60):**
   - Ejecutar el calendario editorial de 12 artículos para atacar palabras clave transaccionales de larga cola (long-tail) identificadas en la matriz de palabras clave.
