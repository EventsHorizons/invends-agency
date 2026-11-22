export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Estudio", href: "/sobre-nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Trabajos", href: "/portafolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

/** Brand verbal identity - see utils/brand.ts (UTF-8) */
export {
  BRAND_TAGLINE,
  BRAND_HERO_TITLE,
  BRAND_HERO_SUPPORT,
} from "./brand";

/** Home strip labels — services, not client logos. */
export const CLIENTS = [
  { name: "Diseño Web", years: "Dirección de arte & UI" },
  { name: "Desarrollo Nuxt", years: "Sitios ultra-rápidos" },
  { name: "Identidad Visual", years: "Sistemas de marca" },
  { name: "E-commerce", years: "Tiendas sin fricción" },
  { name: "Redacción Comercial", years: "Mensaje & conversión" },
  { name: "SEO Técnico", years: "Posicionamiento Google" },
  { name: "Portales & Apps", years: "Herramientas a medida" },
  { name: "Automatización", years: "Conexión CRM & datos" },
];

export interface ServiceDetail {
  title: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  anchor: string;
  title: string;
  /** Punchy section headline shown in the reel. */
  headline: string;
  number: string;
  intro: string;
  response: string;
  image: string;
  imageAlt: string;
  items: ServiceDetail[];
}

/** Full service catalog — mirrors Scelerity SERVICES (es). */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "diseno-web",
    anchor: "diseno-web",
    title: "Diseño web",
    headline: "Diseño que explica y convence.",
    number: "01",
    intro:
      "Diseñamos sitios web y páginas de aterrizaje donde la jerarquía visual y el contenido guían al visitante de forma natural hacia el contacto, sin adornos innecesarios.",
    response:
      "Partimos de tu cliente ideal y de tu objetivo comercial. Damos forma a la estructura, tipografía e interfaz con criterio editorial y foco en conversión.",
    image: "/images/services/svc-diseno-web.webp",
    imageAlt: "Layout web y arquitectura de interfaz en prototipo sobre dispositivo",
    items: [
      {
        title: "Estructura y Escaneo",
        description:
          "Arquitectura de información · Jerarquía visual clara · Recorrido sin fricción hasta el contacto",
      },
      {
        title: "Interfaz y Tipografía",
        description:
          "Composición editorial · Microinteracciones con sentido · CTAs visibles y legibilidad móvil",
      },
      {
        title: "Sistema de Diseño",
        description:
          "Componentes reutilizables · Tokens de marca · Coherencia total entre páginas",
      },
      {
        title: "Entregables",
        description:
          "Prototipo interactivo en Figma · Sistema de componentes · Especificaciones listas para desarrollo",
      },
    ],
  },
  {
    id: "branding",
    anchor: "branding",
    title: "Branding",
    headline: "Identidad con solidez digital.",
    number: "02",
    intro:
      "Construimos identidades visuales memorables y pensadas para el entorno digital: coherentes, reconocibles y fáciles de aplicar por tu equipo en el día a día.",
    response:
      "Trabajamos contigo para definir un lenguaje gráfico que transmita autoridad y se aplique sin fricción en web, propuestas y campañas.",
    image: "/images/services/svc-branding.webp",
    imageAlt: "Sistema de papelería e identidad corporativa en composición editorial",
    items: [
      {
        title: "Posicionamiento",
        description:
          "Territorio de marca · Tono de voz verbal · Qué te diferencia frente al mercado",
      },
      {
        title: "Lenguaje Visual",
        description:
          "Logotipo y símbolos · Tipografía con carácter · Paleta cromática calibrada",
      },
      {
        title: "Sistema y Reglas",
        description:
          "Guía de estilo utilizable · Dirección de arte · Plantillas para redes y presentaciones",
      },
      {
        title: "Entregables",
        description:
          "Manual de identidad digital · Assets listos para producción · Criterios claros de uso",
      },
    ],
  },
  {
    id: "desarrollo-web",
    anchor: "desarrollo-web",
    title: "Desarrollo web",
    headline: "Ingeniería web sólida y ligera.",
    number: "03",
    intro:
      "Programamos sobre arquitecturas modernas que garantizan páginas ultra-rápidas, seguras y preparadas para escalar sin dolores de cabeza ni plugins pesados.",
    response:
      "Traducimos el diseño a código limpio y semántico. Entregamos plataformas estables y fáciles de administrar por tu propio equipo.",
    image: "/images/services/svc-desarrollo-web.webp",
    imageAlt: "Concepto de sitio responsive: layouts web en dispositivo",
    items: [
      {
        title: "Arquitectura Limpia",
        description:
          "Frontend moderno con Nuxt/Vue · Contenido editable sin tocar código · Despliegue continuo",
      },
      {
        title: "Velocidad y Core Web Vitals",
        description:
          "Tiempos de carga mínimos · Rendimiento móvil sobresaliente · Accesibilidad estándar",
      },
      {
        title: "Integraciones",
        description:
          "Conexión con CRM · Formularios protegidos contra spam · Herramientas de analítica y automatización",
      },
      {
        title: "Entregables",
        description:
          "Sitio en producción de alto rendimiento · Código documentado · Propiedad 100% de tu empresa",
      },
    ],
  },
  {
    id: "desarrollo-apps",
    anchor: "desarrollo-apps",
    title: "Aplicaciones",
    headline: "Portales y Web Apps a medida.",
    number: "04",
    intro:
      "Digitalizamos flujos manuales caóticos y hojas de cálculo en plataformas web intuitivas que reducen costos operativos.",
    response:
      "Definimos funcionalidades críticas, diseñamos la interfaz de usuario y construimos herramientas sólidas y seguras.",
    image: "/images/services/svc-aplicaciones.webp",
    imageAlt: "Pantalla de producto móvil con interfaz de aplicación",
    items: [
      {
        title: "Flujos de Trabajo",
        description:
          "Mapeo de procesos · Casos de uso prioritarios · Reducción de pasos operativos",
      },
      {
        title: "Interfaz y Dashboard",
        description:
          "Paneles intuitivos · Estados de carga y error · Navegación ágil sin fricción",
      },
      {
        title: "Seguridad y Datos",
        description:
          "Autenticación segura · Roles y permisos de usuario · Conexión a bases de datos",
      },
      {
        title: "Entregables",
        description:
          "Web App o portal funcional · Repositorio documentado · Hoja de ruta para evolución técnica",
      },
    ],
  },
  {
    id: "ecommerce",
    anchor: "ecommerce",
    title: "E-commerce",
    headline: "Tiendas de alta conversión.",
    number: "05",
    intro:
      "Reducimos el abandono de carritos simplificando el proceso de pago y acelerando la navegación en teléfonos móviles.",
    response:
      "Optimizamos la vitrina, el catálogo y la pasarela de pago para que comprar sea un proceso instantáneo y confiable.",
    image: "/images/services/svc-ecommerce.webp",
    imageAlt: "Compra en tienda online desde la app móvil",
    items: [
      {
        title: "Catálogo y Fichas",
        description:
          "Estructura limpia de productos · Fotografía protagónica · Especificaciones claras",
      },
      {
        title: "Checkout sin Fricción",
        description:
          "Pago rápido en 2 pasos · Múltiples pasarelas integradas · Confirmación automática",
      },
      {
        title: "Operación y Stock",
        description:
          "Sincronización de inventario · Gestión ágil de pedidos · Analítica de embudo de compra",
      },
      {
        title: "Entregables",
        description:
          "Tienda online en producción · Checkout verificado · Integración con pasarelas de pago y logística",
      },
    ],
  },
  {
    id: "seo",
    anchor: "seo",
    title: "SEO",
    headline: "Visibilidad orgánica rentable.",
    number: "06",
    intro:
      "Hacemos que tu empresa aparezca en Google cuando tus clientes potenciales buscan activamente lo que vendes.",
    response:
      "Sin atajos engañosos: optimización técnica rigurosa, contenidos de alta intención de compra y autoridad de dominio.",
    image: "/images/services/svc-seo.webp",
    imageAlt: "Panel de analítica orientado a visibilidad y búsqueda",
    items: [
      {
        title: "Auditoría Técnica",
        description:
          "Velocidad de rastreo · Corrección de indexación · Datos estructurados Schema.org",
      },
      {
        title: "Palabras Clave B2B",
        description:
          "Términos con intención de compra · Mapeo temático por servicio · Interlinking estratégico",
      },
      {
        title: "Medición y Retorno",
        description:
          "Configuración de Search Console · Rastreo de conversiones · Informes mensuales claros",
      },
      {
        title: "Entregables",
        description:
          "Auditoría técnica resuelta · Arquitectura de contenidos SEO · Panel de seguimiento de rankings",
      },
    ],
  },
  {
    id: "marketing-digital",
    anchor: "marketing-digital",
    title: "Marketing",
    headline: "Mensajes que cierran ventas.",
    number: "07",
    intro:
      "Sustituimos textos corporativos genéricos y aburridos por argumentos de venta directos que derriban objeciones comerciales.",
    response:
      "Alineamos tus campañas de pauta con páginas de aterrizaje que responden con exactitud a lo que el visitante espera.",
    image: "/images/services/svc-marketing.webp",
    imageAlt: "Estudio creativo: edición fotográfica y dirección de campaña",
    items: [
      {
        title: "Identidad Verbal",
        description:
          "Tono de voz diferenciador · Promesa de valor inequívoca · Guiones comerciales",
      },
      {
        title: "Copywriting de Conversión",
        description:
          "Titulares de impacto · Argumentos que eliminan dudas · Llamados a la acción directos",
      },
      {
        title: "Continuidad de Embudo",
        description:
          "Alineación estricta entre anuncio y landing page · Cero fugas de prospectos",
      },
      {
        title: "Entregables",
        description:
          "Guía de estilo verbal de marca · Textos de sitio y landings listos · Métricas de conversión",
      },
    ],
  },
  {
    id: "inteligencia-artificial",
    anchor: "inteligencia-artificial",
    title: "Inteligencia artificial",
    headline: "Automatización con IA aplicada.",
    number: "08",
    intro:
      "Automatizamos la clasificación de leads entrantes y la redacción de respuestas rutinarias para ahorrar horas semanales a tu equipo.",
    response:
      "Integramos modelos de lenguaje directamente en tus herramientas de trabajo diarias, siempre con supervisión humana.",
    image: "/images/services/svc-ia.webp",
    imageAlt: "Concepto de sistemas de inteligencia artificial aplicados al trabajo",
    items: [
      {
        title: "Casos de Negocio",
        description:
          "Calificación de prospectos · Resumen automático de solicitudes · Borradores asistidos",
      },
      {
        title: "Integración Segura",
        description:
          "Conexión con APIs de IA · Seguridad y privacidad de datos · Reglas de validación",
      },
      {
        title: "Control Humano",
        description:
          "Puntos de aprobación obligatorios · Registro auditable de respuestas · Mejora continua",
      },
      {
        title: "Entregables",
        description:
          "Flujo de IA conectado a tu web o CRM · Manual de uso operativo · Soporte inicial de calibración",
      },
    ],
  },
  {
    id: "automatizacion",
    anchor: "automatizacion",
    title: "Automatización",
    headline: "Conexión y sincronización total.",
    number: "09",
    intro:
      "Evita la pérdida de clientes potenciales conectando tus formularios web directamente con tu CRM y equipo de ventas en tiempo real.",
    response:
      "Eliminamos la transcripción manual de datos entre plataformas para que tu equipo atienda prospectos en minutos, no en días.",
    image: "/images/services/svc-automatizacion.webp",
    imageAlt: "Optimización digital de procesos y flujos automatizados",
    items: [
      {
        title: "Mapeo de Herramientas",
        description:
          "Integración de formularios · Webhooks y APIs seguras · Eliminación de pasos manuales",
      },
      {
        title: "Sincronización de CRM",
        description:
          "Conexión inmediata con HubSpot, Pipedrive o Notion · Alertas por WhatsApp y correo",
      },
      {
        title: "Alertas y Control",
        description:
          "Notificaciones en tiempo real al equipo comercial · Control de duplicados · Historial limpio",
      },
      {
        title: "Entregables",
        description:
          "Flujos automáticos en producción · Integración CRM activa · Documentación de soporte",
      },
    ],
  },
  {
    id: "migracion-legacy",
    anchor: "migracion-legacy",
    title: "Migración y refactorización",
    headline: "Modernización web sin riesgos.",
    number: "10",
    intro:
      "Renovamos sitios construidos en plataformas obsoletas sin perder tu tráfico orgánico ganado ni romper integraciones comerciales.",
    response:
      "Migramos por etapas programadas para mantener tu negocio operando al 100% mientras renovamos la tecnología de fondo.",
    image: "/images/services/svc-migracion-art.webp",
    imageAlt: "Diagnóstico técnico de sistemas en proceso de migración",
    items: [
      {
        title: "Diagnóstico y Plan",
        description:
          "Auditoría de código antiguo · Mapeo de riesgos técnicos · Plan de corte por fases",
      },
      {
        title: "Preservación SEO",
        description:
          "Redirecciones 301 de URLs existentes · Conservación de metadatos · Historial protegido",
      },
      {
        title: "Nueva Infraestructura",
        description:
          "Migración a Nuxt y hosting moderno en la nube · Aceleración drástica de velocidad",
      },
      {
        title: "Entregables",
        description:
          "Sitio web modernizado en producción · Auditoría SEO post-migración · Cero pérdida de datos",
      },
    ],
  },
  {
    id: "mvp-rapido",
    anchor: "mvp-rapido",
    title: "MVP ultra-rápido (MaaS)",
    headline: "Validación ágil en 3 semanas.",
    number: "11",
    intro:
      "Ponemos a prueba tu nuevo modelo de negocio o producto digital con usuarios reales antes de gastar meses en desarrollo innecesario.",
    response:
      "Identificamos el flujo transaccional clave, construimos la versión esencial y la publicamos con estándares de producción.",
    image: "/images/services/svc-mvp-art.webp",
    imageAlt: "Planificación de prototipo con notas adhesivas en mesa de trabajo",
    items: [
      {
        title: "Alcance Crítico",
        description:
          "Funcionalidad mínima indispensable · Embudo de captación o pago · Validación real",
      },
      {
        title: "Desarrollo Ágil",
        description:
          "Construcción en 3 semanas · Código modular y escalable · Integración de cobro o registro",
      },
      {
        title: "Lanzamiento y Datos",
        description:
          "Despliegue en producción · Medición de tracción inicial · Aprendizaje con clientes reales",
      },
      {
        title: "Entregables",
        description:
          "Producto funcional publicado · Repositorio de código propio · Informe de métricas iniciales",
      },
    ],
  },
];

export const SERVICES = SERVICE_CATEGORIES.map((s) => ({
  id: s.id,
  title: s.title,
  number: s.number,
  items: s.items.filter((i) => i.title !== "Entregables").map((i) => i.title),
  href: `/servicios/${s.anchor}`,
}));
/** Studio working principles — not client testimonials. */
/** Working method — not oficios (those live in HOME_PILLARS). */
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Claridad primero",
    role: "Método · Invends",
    avatar: "",
    quote:
      "Abrimos con el objetivo comercial y el brief. Sin eso, diseñar o desarrollar es adivinar. Preferimos una conversación concreta —y un alcance que se pueda revisar— antes que una propuesta genérica.",
  },
  {
    id: 2,
    name: "Oficio en la entrega",
    role: "Método · Invends",
    avatar: "",
    quote:
      "Cada pieza sale con criterio de uso: tipografía, código o campaña. Revisamos lo que se ve y lo que se sostiene cuando llega tráfico real.",
  },
  {
    id: 3,
    name: "Alcance que se puede cumplir",
    role: "Método · Invends",
    avatar: "",
    quote:
      "Definimos qué entra en esta fase, qué queda fuera y cómo se mide el siguiente paso. Menos promesas abiertas; más entregables con fecha.",
  },
];

export type ProjectCategory =
  | "todos"
  | "marketing"
  | "tecnologia"
  | "diseno"
  | "contenido";

export const PROJECT_FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "diseno", label: "Diseño" },
  { id: "tecnologia", label: "Desarrollo" },
  { id: "marketing", label: "Marketing" },
  { id: "contenido", label: "Contenido" },
];

export interface ProjectItem {
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  categories: ProjectCategory[];
  client: string;
  year?: string;
  tags?: string[];
  heroMetric?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  gallery?: string[];
}

/**
 * Conceptual portfolio samples — method illustrations, not published client cases.
 */
export const PROJECTS: ProjectItem[] = [
  {
    slug: "sistema-editorial-web",
    name: "Portal de Publicación Digital",
    description:
      "De un portal sobrecargado con 4 segundos de espera a una plataforma editorial que carga en 0.7s y duplicó el tiempo de lectura.",
    thumbnail: "/images/project-editorial.webp",
    categories: ["diseno", "tecnologia"],
    client: "Transformación Digital",
    year: "2026",
    tags: ["Diseño web", "Desarrollo"],
    heroMetric: "Velocidad: 0.7s de carga",
    challenge:
      "Plataforma lenta y desordenada que provocaba 68% de rebote en los primeros tres segundos de visita.",
    solution:
      "Arquitectura de información / Sistema tipográfico fluido / Desarrollo frontend Nuxt 4 / Core Web Vitals.",
    results:
      "Carga en 0.7s / +115% de tiempo de lectura / 100% de retención en dispositivos móviles.",
  },
  {
    slug: "interfaz-de-producto",
    name: "Landing Page para Plataforma SaaS",
    description:
      "De explicar un software complejo en bloques densos a una narrativa visual que triplicó la tasa de registros para demostraciones.",
    thumbnail: "/images/project-landing-producto.webp",
    categories: ["tecnologia", "diseno", "marketing"],
    client: "Conversión B2B",
    year: "2026",
    tags: ["Landing", "Conversión"],
    heroMetric: "Conversión: x3 registros",
    challenge:
      "Página con visitas constantes pero tasa de conversión menor al 1% debido a lenguaje excesivamente técnico.",
    solution:
      "UX Writing comercial / Diseño de interfaz UI / Animaciones interactivas ligeras / Integración con CRM.",
    results:
      "Conversión de 0.8% a 2.9% / Integración en tiempo real con HubSpot / Tiempo de lanzamiento en 3 semanas.",
  },
  {
    slug: "lanzamiento-de-marca",
    name: "Lanzamiento de Marca para Consultora B2B",
    description:
      "De una empresa sin presencia online reconocible a una identidad digital sólida que cerró 3 contratos corporativos en su primer mes.",
    thumbnail: "/images/project-lanzamiento-marca.webp",
    categories: ["diseno", "marketing", "contenido"],
    client: "Identidad & Web",
    year: "2025",
    tags: ["Diseño", "Marketing"],
    heroMetric: "Impacto: 3 clientes en mes 1",
    challenge:
      "Falta de presencia digital creíble que frenaba el cierre de propuestas comerciales con corporativos.",
    solution:
      "Identidad visual completa / Sitio web institucional / Plantillas comerciales / Campaña digital de lanzamiento.",
    results:
      "Presencia institucional validada / 3 contratos corporativos cerrados / Posicionamiento orgánico inmediato.",
  },
  {
    slug: "landing-de-servicio",
    name: "Embudo de Captación para Servicios",
    description:
      "De recibir prospectos no calificados por chat a filtrar y captar cotizaciones con presupuesto definido mediante formulario guiado.",
    thumbnail: "/images/project-landing-servicio.webp",
    categories: ["marketing", "diseno"],
    client: "Captación Comercial",
    year: "2025",
    tags: ["Marketing", "Copy"],
    heroMetric: "Calificación: leads con presupuesto",
    challenge:
      "Pérdida de horas del equipo comercial atendiendo mensajes sin presupuesto ni fecha de contratación clara.",
    solution:
      "Rediseño de embudo de conversión / Microcopy persuasivo / Formulario interactivo / Conexión a base de datos.",
    results:
      "Prospectos 100% filtrados por presupuesto / Reducción del 70% en tiempo de calificación comercial.",
  },
  {
    slug: "sitio-institucional",
    name: "Rediseño Corporativo de Empresa Industrial",
    description:
      "De un sitio web estático abandonado a una vitrina digital moderna que centralizó el catálogo y agilizó solicitudes de cotización.",
    thumbnail: "/images/project-institucional.webp",
    categories: ["diseno", "contenido"],
    client: "Modernización Web",
    year: "2025",
    tags: ["Diseño web", "Contenido"],
    heroMetric: "Eficiencia: cotizaciones directas",
    challenge:
      "Catálogo desactualizado en PDF descargable que impedía a los clientes consultar especificaciones en teléfonos.",
    solution:
      "Reestructuración de catálogo / Interfaz adaptada a compras B2B / Panel editable / SEO técnico regional.",
    results:
      "Catálogo 100% navegable en móviles / +45% de solicitudes de cotización directa recibidas.",
  },
  {
    slug: "sistema-de-contenido",
    name: "Base de Contenido y Posicionamiento SEO",
    description:
      "De publicar artículos sin retorno a una biblioteca de contenidos estructurada para captar tráfico orgánico de tomadores de decisión.",
    thumbnail: "/images/project-contenido.webp",
    categories: ["contenido", "marketing"],
    client: "Estrategia de Tráfico",
    year: "2025",
    tags: ["Contenido", "Marketing"],
    heroMetric: "Tráfico: +180% orgánico",
    challenge:
      "Inversión mensual en redacción de artículos genéricos sin palabras clave comerciales ni enlaces de conversión.",
    solution:
      "Investigación de palabras clave con intención comercial / Plantillas de contenido editorial / Interlinking interno.",
    results:
      "+180% de tráfico orgánico en 4 meses / Primeras posiciones en Google para términos de alta intención de compra.",
  },
];

export const ABOUT_VALUES = [
  {
    number: "01",
    title: "Comprensión del negocio antes que píxeles",
    description:
      "No empezamos a diseñar hasta entender qué vendes, a quién le hablas y qué dudas frenan a tus clientes. La belleza sin claridad comercial no genera resultados.",
  },
  {
    number: "02",
    title: "Rigor en los detalles que importan",
    description:
      "Cuidamos la tipografía, la jerarquía visual y la velocidad de carga con la misma exigencia. Una web debe sentirse fluida y confiable en cualquier dispositivo.",
  },
  {
    number: "03",
    title: "Cero jerga, cero sorpresas",
    description:
      "Hablamos en un lenguaje claro sobre tiempos, costos y posibilidades técnicas. Cumplimos lo que acordamos y cuidamos el presupuesto de tu empresa.",
  },
  {
    number: "04",
    title: "Autonomía para tu equipo",
    description:
      "Te entregamos plataformas ordenadas y fáciles de gestionar. Diseñamos para que tu empresa pueda crecer y actualizar su contenido sin atarse a nosotros.",
  },
];

export const ABOUT_CAPABILITIES = [
  {
    title: "Diseño web con dirección de arte editorial y arquitectura de conversión.",
    cta: "Ver diseño web",
  },
  {
    title: "Desarrollo frontend en Nuxt que carga en menos de un segundo.",
    cta: "Ver desarrollo",
  },
  {
    title: "Redacción comercial y mensajes que responden las dudas del cliente.",
    cta: "Ver mensaje",
  },
  {
    title: "Identidad visual y manuales de marca aplicables en el día a día.",
    cta: "Ver trabajos",
  },
  {
    title: "Optimización técnica de velocidad, Core Web Vitals y SEO orgánico.",
    cta: "Ver servicios",
  },
  {
    title: "Estudio boutique en Bogotá para proyectos en toda América Latina.",
    cta: "Iniciar conversación",
  },
];

export const TEAM = [
  { name: "Diseño web", role: "UI / UX e interfaz", area: "Diseño" },
  { name: "Desarrollo web", role: "Implementación y performance", area: "Desarrollo" },
  { name: "Marketing digital", role: "Mensaje y contenidos", area: "Marketing" },
  { name: "Producción digital", role: "QA y publicación", area: "Desarrollo" },
  { name: "Contenido", role: "Copy y narrativa", area: "Creativo" },
  { name: "Gestión de proyecto", role: "Brief y seguimiento", area: "Administración" },
];

export const TEAM_FILTERS = [
  "Todos",
  "Diseño",
  "Creativo",
  "Desarrollo",
  "Administración",
  "Marketing",
];

export { CONTACT_INFO } from "./contactInfo";

export const SERVICES_FORM = [
  "Diseño web",
  "Branding",
  "Desarrollo web",
  "Aplicaciones",
  "E-commerce",
  "SEO",
  "Marketing",
  "Inteligencia artificial",
  "Automatización",
  "Migración y refactorización",
  "MVP ultra-rápido (MaaS)",
  "Proyecto completo",
];

export const BUDGET_OPTIONS = [
  "Por definir",
  "Proyecto puntual",
  "Retainer mensual",
  "Lanzamiento / campaña",
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}


export function getAdjacentProjects(slug: string) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(index + 1) % PROJECTS.length],
  };
}
