# 00. RESUMEN EJECUTIVO: ESTRATEGIA INTEGRAL DE CRECIMIENTO
## Invends — Estudio Digital | Bogotá, Colombia y Expansión LATAM

**Fecha:** Noviembre 2026  
**Responsable:** Agencia de Crecimiento Digital & Dirección Estratégica (Gemini 4 Neon)  
**Dominio Oficial:** [https://invends.com/](https://invends.com/)  
**Mercado Inicial:** Bogotá D.C., Colombia → Cobertura Nacional → Proyección LATAM  
**Posicionamiento:** Estudio digital que une dirección de arte contemporánea, ingeniería web de alto rendimiento (Nuxt / Vue) y redacción comercial con criterio de negocio.

---

### 1. Diagnóstico Inicial y Realidad del Proyecto

Al inicio de la intervención estratégica, Invends contaba con una base técnica de software destacada (Nuxt 4.6 en SSR híbrido prerenderizado, tipografía Roobert/Geist y una identidad cromática única basada en Deep Wave `#4B28B5` y Magenta `#FF2DAA`). Sin embargo, existían brechas comerciales, de indexación y de conversión que impedían materializar este potencial en captación sostenida de clientes:

1. **Brechas de SEO Semántico y Marcado Estructurado:**
   - La home y las páginas de servicios contaban con esquemas `Organization` y `Service`, pero los casos de portafolio carecían de marcado `CreativeWork`, y las vistas de portafolio, servicios y sobre nosotros no contaban con rutas semánticas `BreadcrumbList`.
   - Google interpretaba el sitio como páginas aisladas en lugar de una entidad corporativa con taxonomía jerarquizada.

2. **Fricción en Conversión y Ausencia de Lead Magnets:**
   - El sitio dependía casi exclusivamente de un formulario estático de contacto. El botón de WhatsApp carecía de telemetría de analítica (`trackWhatsAppClick`) para medir qué ubicaciones generaban mayores conversaciones.
   - No existía una herramienta interactiva o recurso descargable que capturara visitantes en fase de consideración (MoFu/ToFu) con consentimiento expreso de Habeas Data bajo la Ley 1581 de 2012 de Colombia.

3. **Contexto Competitivo en Bogotá y Colombia:**
   - La competencia en Bogotá (AMD, Bluecell, Tuatara, Contra Studio, Seonet, Macgráficas, NC Soluciones) está polarizada entre:
     - **Agencias tradicionales masivas:** Ofertan sitios en WordPress saturados de plugins, con Core Web Vitals deficientes (LCP > 3.5s, CLS recurrente) y promesas vacías ("llevamos tu negocio al siguiente nivel").
     - **Estudios de diseño boutique:** Poseen buena estética visual pero nula solidez en ingeniería web, código limpio o indexabilidad SEO.
   - **Oportunidad para Invends:** Posicionarse como el estudio de artesanía digital e ingeniería web contemporánea que entrega velocidad extrema (< 1.8s LCP), diseño editorial sofisticado y mensajes comerciales orientados a retorno de inversión para medianas y grandes empresas B2B.

---

### 2. Acciones Implementadas en Esta Fase

Durante esta intervención directa sobre el repositorio en la rama `feature/growth-strategy-integral`, se ejecutaron las siguientes mejoras técnicas y de producto:

1. **Infraestructura de Datos Estructurados (Schema.org):**
   - Incorporación de `breadcrumbJsonLd`, `creativeWorkJsonLd` y `serviceJsonLd` en `app/utils/seo.ts`.
   - Marcado de casos de estudio individuales (`app/pages/portafolio/[slug].vue`) y del índice de portafolio (`app/pages/portafolio/index.vue`).
   - Marcado breadcrumb enriquecido en `app/components/views/ServicesView.vue` y `app/components/views/AboutView.vue`.

2. **Telemetría y Analítica de Conversión:**
   - Expansión de `app/composables/useAnalytics.ts` con funciones especializadas: `trackWhatsAppClick(placement)`, `trackLeadMagnet(score, emailProvided)` y `trackResourceDownload(resourceName)`.
   - Vinculación del evento de WhatsApp en el botón flotante, en el footer y en la página de contacto.

3. **Desarrollo del Lead Magnet Interactivo (Test de Salud Digital):**
   - Creación del componente `app/components/LeadMagnetChecklist.vue`: herramienta interactiva basada en 7 criterios técnicos y comerciales (Velocidad Core Web Vitals, Claridad B2B, Dirección de Arte, SEO Semántico, Conversión/CRO, Experiencia Móvil y Autonomía).
   - Cálculo de puntaje dinámico (0-100), diagnóstico contextualizado, formulario de captura con cumplimiento de Ley 1581 de 2012 (Habeas Data) y enlace dinámico a WhatsApp preconfigurado con el resultado del usuario.
   - Publicación de la ruta estática prerenderizada `app/pages/diagnostico.vue` (y su contraparte internacional `/en/diagnostico`), registrada en `nuxt.config.ts` y en el catálogo del sitemap (`server/utils/seoCatalog.ts`).
   - Banner de promoción nativo en el índice del blog (`app/pages/blog/index.vue`).

---

### 3. Síntesis del Plan de Crecimiento a 90 Días

| Mes | Enfoque Principal | Hito Clave | Meta Verificable |
| :--- | :--- | :--- | :--- |
| **Mes 1: Cimientos y Tracción Local** | Indexación técnica, Google Search Console, Google Business Profile y difusión del Test de Salud Digital. | Lanzamiento público de `/diagnostico` y optimización de perfiles locales en Bogotá. | Primeras consultas orgánicas locales y > 25 diagnósticos completados. |
| **Mes 2: Autoridad Semántica B2B** | Despliegue de los primeros 6 artículos pilares del blog (enfoques en Nuxt vs WordPress, CRO y diseño web corporativo). | Publicación de artículos editoriales optimizados para intención transaccional e informativa. | Indexación del 100% de URLs y posición en top 20 para consultas transaccionales secundarias. |
| **Mes 3: Relaciones Públicas y Adquisición** | Activación de Link Building editorial (cámaras de comercio, directorios de alta reputación, prensa tech local) y prospección outbound personalizada en LinkedIn. | Alianzas con estudios de branding y presencia en directorios curados (Clutch, Behance, Dribbble). | 3 a 5 reuniones comerciales calificadas mensuales originadas por canales orgánicos y referidos. |

---

### 4. Estructura de Entregables del Proyecto

La presente carpeta `/docs/growth/` contiene el conjunto completo de análisis, matrices y especificaciones estratégicas:

- `00-resumen-ejecutivo.md`: Síntesis ejecutiva y balance de intervenciones.
- `01-auditoria-del-sitio.md`: Auditoría técnica, semántica, de rendimiento y contenido.
- `02-investigacion-de-competidores.md` (+ `competidores-matriz.csv`): Benchmark de 12 competidores en Bogotá y Colombia.
- `03-mapa-de-palabras-clave.md` (+ `palabras-clave-matriz.csv`): Arquitectura de keywords con intención, volumen estimado y páginas objetivo.
- `04-arquitectura-seo.md`: Mapeo de taxonomías, breadcrumbs, canonicals y enlazado interno.
- `05-plan-de-contenidos.md` (+ `calendario-editorial-90-dias.csv`): Estrategia editorial de 12 artículos con esquemas detallados.
- `06-estrategia-de-marca.md`: Posicionamiento, pilares verbales, directrices de tono y manual de identidad.
- `07-estrategia-de-redes-sociales.md`: Guía de publicación en LinkedIn e Instagram para captación B2B.
- `08-plan-de-link-building.md` (+ `link-building-oportunidades.csv`): Estrategia de PR digital y directorios legítimos.
- `09-estrategia-de-conversion.md`: Auditoría CRO, optimización de formularios y funnel de WhatsApp.
- `10-plan-de-medicion.md`: Arquitectura de analítica, eventos de GA4, Search Console y KPIs de negocio.
- `11-cambios-implementados.md`: Bitácora técnica pormenorizada de archivos modificados y código nuevo.
- `12-pruebas-y-resultados.md`: Validación de compilación Nuxt, prerenderizado y pruebas de sintaxis.
- `13-plan-de-crecimiento-90-dias.md`: Hoja de ruta semanal paso a paso.
- `14-bloqueos-y-accesos-pendientes.md`: Lista transparente de accesos requeridos del propietario para continuar.
