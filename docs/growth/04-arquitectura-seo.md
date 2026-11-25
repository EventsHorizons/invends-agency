# 04. ARQUITECTURA SEO: TAXONOMÍAS, ENLAZADO INTERNO Y SEMÁNTICA
## Estructura Jerárquica del Dominio `invends.com`

**Fecha:** Noviembre 2026  
**Arquitecto:** SEO Técnico y Semántico (Gemini 4 Neon)  
**Marco de Trabajo:** Modelo Silo Semántico con Nivel Máximo de Profundidad 3

---

### 1. Diagrama de la Arquitectura de Información

```
                                [ HOME ]
                         https://invends.com/
                                  │
      ┌────────────────┬──────────┴──────────┬────────────────┐
      ▼                ▼                     ▼                ▼
 [ SERVICIOS ]   [ PORTAFOLIO ]         [ DIAGNÓSTICO ]    [ BLOG ]
  /servicios      /portafolio            /diagnostico       /blog
      │                │                     │                │
      ├─ diseno-web    ├─ caso-1             └─ Test Salud    ├─ post-1 (CWV)
      ├─ branding      ├─ caso-2                Digital       ├─ post-2 (Costos)
      ├─ desarrollo    ├─ caso-3                              ├─ post-3 (Nuxt vs WP)
      ├─ apps          ├─ caso-4                              └─ post-N...
      ├─ ecommerce     └─ ...
      ├─ seo
      ├─ marketing
      ├─ ia
      ├─ automatizacion
      ├─ migracion
      └─ mvp
```

---

### 2. Niveles de Profundidad (Crawl Depth)

1. **Nivel 0 (Página Raíz):**
   - `https://invends.com/` (Versión ES) y `https://invends.com/en` (Versión EN).
   - Comunica la entidad de negocio (`Organization`, `ProfessionalService`), enlaces directos a las 4 áreas principales y el botón de contacto / WhatsApp.
2. **Nivel 1 (Páginas Pilar e Índices):**
   - `/servicios`: Catálogo integral con pestañas por disciplina (`ServiceReel`).
   - `/portafolio`: Galería filtrable de proyectos de estudio.
   - `/diagnostico`: Herramienta de captación y evaluación de salud digital.
   - `/blog`: Índice editorial con filtros temáticos.
   - `/sobre-nosotros`: Manifiesto, equipo y principios de trabajo.
   - `/contacto`: Formulario con opciones de presupuesto y enlace a WhatsApp.
3. **Nivel 2 (Páginas Transaccionales Específicas y Casos):**
   - `/servicios/[slug]`: 11 servicios dedicados con estructura H1/H2, entregables tangibles, casos relacionados y llamado a la acción.
   - `/portafolio/[slug]`: Desglose metodológico (Reto, Solución, Métricas).
   - `/blog/[slug]`: Artículos editoriales especializados con enlazado cruzado hacia servicios y hacia `/diagnostico`.

---

### 3. Matriz de Enlazado Interno (Internal Linking Strategy)

Para maximizar el traspaso de autoridad (PageRank interno) y guiar a los prospectos hacia la conversión:

1. **Desde Artículos de Blog hacia Servicios:**
   - Todo artículo que trate sobre rendimiento técnico debe enlazar anclado a `/servicios/desarrollo-web` o `/servicios/migracion-legacy`.
   - Todo artículo sobre identidad o diseño debe enlazar a `/servicios/branding` o `/servicios/diseno-web`.
2. **Desde Artículos de Blog hacia el Lead Magnet:**
   - Cada artículo del blog incluye al pie un llamado contextual hacia `/diagnostico` ("¿Quieres comprobar el estado de este factor en tu web actual? Realiza el Test de Salud Digital gratuito").
3. **Desde Casos de Portafolio hacia Servicios:**
   - Las etiquetas de los proyectos (`tags`) y la navegación de pie conducen a los servicios involucrados y a la página de contacto.
4. **Breadcrumbs Jerárquicos en Todo el Sitio:**
   - La implementación de `breadcrumbJsonLd()` en `portafolio/[slug]`, `servicios`, `sobre-nosotros` y `diagnostico` asegura que Google trace el árbol de navegación completo en sus resultados de búsqueda.

---

### 4. Directivas de Canibalización y Noindex

- **Canibalización prevenida:**
  - El servicio `/servicios/desarrollo-web` apunta a empresas que requieren software web desde cero.
  - El servicio `/servicios/migracion-legacy` se enfoca exclusivamente en empresas que ya tienen una web lenta o monolítica (WordPress, Joomla, Drupal) y buscan modernizarla a Nuxt.
  - Las intenciones están desglosadas para evitar que dos URLs compitan por la misma búsqueda exacta.
- **Rutas con Noindex:**
  - `/glosario`: Bloqueado con directiva `noindex,follow` para no diluir el rastreo en términos de glosario superficiales.
  - `/admin/**`: Bloqueado con `noindex,nofollow` por seguridad y eficiencia de rastreo.
