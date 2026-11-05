export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/sobre-nosotros" },
  { label: "Soluciones", href: "/servicios" },
  { label: "Proyectos", href: "/portafolio" },
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
  { name: "Diseño web", years: "UI / UX" },
  { name: "Branding", years: "Identidad" },
  { name: "Desarrollo web", years: "Sitios" },
  { name: "Aplicaciones", years: "Producto" },
  { name: "E-commerce", years: "Tienda" },
  { name: "SEO", years: "Visibilidad" },
  { name: "Marketing", years: "Campañas" },
  { name: "IA", years: "Flujos asistidos" },
  { name: "Automatización", years: "Procesos" },
  { name: "Migración", years: "Legacy" },
  { name: "MVP", years: "MaaS" },
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
    headline: "Web que se entiende.",
    number: "01",
    intro:
      "Si sientes que tu sitio no explica bien lo que haces, o que en el móvil se pierde el mensaje, podemos ayudarte a ordenarlo. Diseñamos para que quien te visita sepa qué ofreces y cómo contactarte.",
    response:
      "Partimos de tu negocio y de a quién le hablas. Después damos forma a la estructura y a la interfaz, con calma y criterio —sin efectos de más.",
    image: "/images/services/svc-diseno-web.webp",
    imageAlt: "Layout web y arquitectura de interfaz en prototipo sobre dispositivo",
    items: [
      {
        title: "Estructura",
        description:
          "Mapa de páginas · Prioridad de mensajes · Recorrido hasta el contacto · Responsive real",
      },
      {
        title: "Interfaz",
        description:
          "Tipografía y composición · Estados claros · CTAs visibles · Lectura sin fricción",
      },
      {
        title: "Sistema",
        description:
          "Componentes reutilizables · Tokens de marca · Consistencia entre home, servicio y landing",
      },
      {
        title: "Entregables",
        description:
          "Sitio o landing listos para desarrollo · Sistema de UI · Prototipo navegable orientado a conversión",
      },
    ],
  },
  {
    id: "branding",
    anchor: "branding",
    title: "Branding",
    headline: "Identidad usable.",
    number: "02",
    intro:
      "Cuando la marca cambia según quién diseñe el último archivo, cuesta reconocerse. Te ayudamos a definir voz, símbolo y reglas simples para el día a día —en web, propuestas y redes.",
    response:
      "Trabajamos contigo para que la identidad se sienta tuya y se pueda aplicar sin reinventarla cada semana.",
    image: "/images/services/svc-branding.webp",
    imageAlt: "Sistema de papelería e identidad corporativa en composición editorial",
    items: [
      {
        title: "Posición",
        description:
          "Territorio y diferenciación · Tono de voz · Qué prometes (y qué no)",
      },
      {
        title: "Lenguaje",
        description:
          "Símbolo y tipografía · Color y ritmo · Relación entre piezas gráficas",
      },
      {
        title: "Sistema",
        description:
          "Manual usable · Dirección de arte · Aplicación en web y campañas",
      },
      {
        title: "Entregables",
        description:
          "Identidad visual · Sistema de marca · Criterios de uso para tu equipo",
      },
    ],
  },
  {
    id: "desarrollo-web",
    anchor: "desarrollo-web",
    title: "Desarrollo web",
    headline: "Base que se sostiene.",
    number: "03",
    intro:
      "Más allá de “que se vea bien”: nos importa que cargue bien, que los formularios lleguen y que puedas cambiar cosas sin empezar de cero. Desarrollamos con esa tranquilidad en mente.",
    response:
      "Traducimos el diseño a una base sólida, te explicamos las decisiones en lenguaje claro y dejamos el proyecto listo para crecer cuando tú lo estés.",
    image: "/images/services/svc-desarrollo-web.webp",
    imageAlt: "Concepto de sitio responsive: layouts web en dispositivo",
    items: [
      {
        title: "Arquitectura",
        description:
          "Frontend sólido · Contenido editable · Despliegue y entornos claros",
      },
      {
        title: "Rendimiento",
        description:
          "Peso controlado · Render eficiente · Accesibilidad básica medible",
      },
      {
        title: "Integración",
        description:
          "APIs · Formularios · CRM, correo y herramientas que ya usas",
      },
      {
        title: "Entregables",
        description:
          "Sitio en producción · Documentación técnica · Base lista para iterar",
      },
    ],
  },
  {
    id: "desarrollo-apps",
    anchor: "desarrollo-apps",
    title: "Aplicaciones",
    headline: "Producto usable.",
    number: "04",
    intro:
      "Si tienes una idea de herramienta, panel o flujo interno, te ayudamos a bajarla a algo usable. Empezamos por lo esencial —lo que la gente necesita abrir una y otra vez.",
    response:
      "Definimos qué entra en la primera versión y qué puede esperar. Así no cargas el proyecto de funciones que aún no necesitas.",
    image: "/images/services/svc-aplicaciones.webp",
    imageAlt: "Pantalla de producto móvil con interfaz de aplicación",
    items: [
      {
        title: "Producto",
        description:
          "Alcance por fases · Flujos críticos · Criterios de “listo para usar”",
      },
      {
        title: "Experiencia",
        description:
          "Interacción clara · Estados vacíos y de error · Continuidad entre sesiones",
      },
      {
        title: "Tecnología",
        description:
          "Modelo de datos · Roles y acceso · Integraciones necesarias",
      },
      {
        title: "Entregables",
        description:
          "Aplicación o panel usable · Prototipo funcional · Hoja de ruta de siguientes pasos",
      },
    ],
  },
  {
    id: "ecommerce",
    anchor: "ecommerce",
    title: "E-commerce",
    headline: "Compra sin fricción.",
    number: "05",
    intro:
      "Sabemos que cada paso del carrito puede hacer perder una venta. Te ayudamos a ordenar catálogo, fichas y pago para que la experiencia sea clara —también para quien administra la tienda.",
    response:
      "Revisamos cómo vendes hoy y qué te frena. Después diseñamos y conectamos el recorrido de compra con cuidado.",
    image: "/images/services/svc-ecommerce.webp",
    imageAlt: "Compra en tienda online desde la app móvil",
    items: [
      {
        title: "Catálogo",
        description:
          "Estructura de productos · Fichas claras · Variantes y búsqueda",
      },
      {
        title: "Compra",
        description:
          "Carrito estable · Pago confiable · Confirmación y seguimiento",
      },
      {
        title: "Operación",
        description:
          "Inventario · Envíos · Lectura del embudo de compra",
      },
      {
        title: "Entregables",
        description:
          "Tienda publicada · Checkout integrado · Conexión a pago y stock",
      },
    ],
  },
  {
    id: "seo",
    anchor: "seo",
    title: "SEO",
    headline: "Visibilidad con método.",
    number: "06",
    intro:
      "El posicionamiento no es magia ni promesas de “primera página”. Es orden técnico, contenido útil y paciencia. Te ayudamos a ver qué se puede mejorar y por dónde empezar.",
    response:
      "Revisamos cómo está tu sitio frente a las búsquedas reales de tu público y te proponemos pasos concretos —sin humo.",
    image: "/images/services/svc-seo.webp",
    imageAlt: "Panel de analítica orientado a visibilidad y búsqueda",
    items: [
      {
        title: "Técnica",
        description:
          "Indexación · Velocidad · Estructura rastreable · Datos estructurados cuando apliquen",
      },
      {
        title: "Contenido",
        description:
          "Arquitectura temática · Intención de búsqueda · Claridad de respuesta por página",
      },
      {
        title: "Lectura",
        description:
          "Search Console · Correspondencia consulta–página · Prioridades de mejora",
      },
      {
        title: "Entregables",
        description:
          "Auditoría técnica · Mapa de contenidos · Plan de implementación medible",
      },
    ],
  },
  {
    id: "marketing-digital",
    anchor: "marketing-digital",
    title: "Marketing",
    headline: "Mensaje con destino.",
    number: "07",
    intro:
      "Si sientes que publicas mucho y conversas poco, podemos ayudarte a alinear canal, mensaje y página. La idea es que quien llegue sepa qué hacer después —sin presión artificial.",
    response:
      "Empezamos por entender a quién quieres hablarle. Después diseñamos una secuencia amable: qué decir, dónde y cómo medir si está funcionando.",
    image: "/images/services/svc-marketing.webp",
    imageAlt: "Estudio creativo: edición fotográfica y dirección de campaña",
    items: [
      {
        title: "Estrategia",
        description:
          "Audiencia prioritaria · Promesa · Secuencia de contacto",
      },
      {
        title: "Canales",
        description:
          "Orgánico · Pago · Correo · Criterio de inversión por objetivo",
      },
      {
        title: "Lectura",
        description:
          "Analítica compartida · Continuidad anuncio–página · Decisiones con datos",
      },
      {
        title: "Entregables",
        description:
          "Sistema de campaña · Landing alineada · Medición de leads y contactos",
      },
    ],
  },
  {
    id: "inteligencia-artificial",
    anchor: "inteligencia-artificial",
    title: "Inteligencia artificial",
    headline: "IA con límites.",
    number: "08",
    intro:
      "No se trata de “meter IA porque sí”. Buscamos un caso concreto de tu día a día donde realmente ayude, con límites claros y revisión humana.",
    response:
      "Elegimos un flujo pequeño, lo conectamos con cuidado y dejamos la decisión final en tu equipo.",
    image: "/images/services/svc-ia.webp",
    imageAlt: "Concepto de sistemas de inteligencia artificial aplicados al trabajo",
    items: [
      {
        title: "Criterio",
        description:
          "Caso de uso prioritario · Límites · Puntos de revisión humana",
      },
      {
        title: "Sistema",
        description:
          "Contexto y datos · Integración al flujo · Seguridad básica",
      },
      {
        title: "Interfaz",
        description:
          "Cómo se pide · Cómo se corrige · Qué queda registrado",
      },
      {
        title: "Entregables",
        description:
          "Flujo asistido operativo · Integración · Prototipo con handoff al equipo",
      },
    ],
  },
  {
    id: "automatizacion",
    anchor: "automatizacion",
    title: "Automatización",
    headline: "Menos repetición.",
    number: "09",
    intro:
      "Si tu equipo pierde horas en lo mismo cada semana, podemos mapear el proceso y automatizar lo que tenga sentido —dejando visibles las excepciones.",
    response:
      "Primero entendemos cómo trabajan hoy. Después conectamos herramientas con calma, para que la automatización ayude y no complique.",
    image: "/images/services/svc-automatizacion.webp",
    imageAlt: "Optimización digital de procesos y flujos automatizados",
    items: [
      {
        title: "Mapa",
        description:
          "Qué se repite · Qué debe quedar manual · Dónde se rompe hoy",
      },
      {
        title: "Conexión",
        description:
          "APIs · Webhooks · Herramientas actuales sin cambiar todo el stack",
      },
      {
        title: "Control",
        description:
          "Registro · Alertas · Excepciones manejables por el equipo",
      },
      {
        title: "Entregables",
        description:
          "Flujos en producción · Integraciones · Documentación de operación",
      },
    ],
  },
  {
    id: "migracion-legacy",
    anchor: "migracion-legacy",
    title: "Migración y refactorización",
    headline: "Modernizar por fases.",
    number: "10",
    intro:
      "Un sistema antiguo no tiene que frenar tu negocio para siempre. Diagnosticamos qué modernizar y avanzamos por fases, sin dramas innecesarios.",
    response:
      "Hablamos claro sobre riesgos y prioridades. Migración por fases, a un ritmo que tu operación pueda sostener.",
    image: "/images/services/svc-migracion-art.webp",
    imageAlt: "Diagnóstico técnico de sistemas en proceso de migración",
    items: [
      {
        title: "Diagnóstico",
        description:
          "Mapa del sistema · Riesgos · Qué conservar y qué reemplazar",
      },
      {
        title: "Reescritura",
        description:
          "Lógica de negocio · Contratos claros · Datos ordenados",
      },
      {
        title: "Entrega",
        description:
          "Interfaz moderna · Cortes por fase · Continuidad operativa",
      },
      {
        title: "Entregables",
        description:
          "Código modernizado · Arquitectura documentada · Plan de corte y despliegue",
      },
    ],
  },
  {
    id: "mvp-rapido",
    anchor: "mvp-rapido",
    title: "MVP ultra-rápido (MaaS)",
    headline: "Primera versión usable.",
    number: "11",
    intro:
      "Si necesitas probar algo pronto —sin construir el producto entero—, te ayudamos a definir el mínimo que demuestra valor y a publicarlo con honestidad sobre el alcance.",
    response:
      "Aclaramos la idea, acordamos qué entra y qué no, y construimos esa primera versión para aprender de uso real.",
    image: "/images/services/svc-mvp-art.webp",
    imageAlt: "Planificación de prototipo con notas adhesivas en mesa de trabajo",
    items: [
      {
        title: "Alcance",
        description:
          "Flujo crítico · Qué entra en esta fase · Qué queda explícitamente fuera",
      },
      {
        title: "Construcción",
        description:
          "Interfaz usable · Lógica esencial · Datos listos para el siguiente ciclo",
      },
      {
        title: "Salida",
        description:
          "Deploy a producción · Accesos · Criterios para la siguiente iteración",
      },
      {
        title: "Entregables",
        description:
          "MVP publicado · Repositorio · Guía de siguientes pasos",
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
    name: "Sitio con sistema editorial",
    description:
      "Tipografía, módulos y ritmo de lectura organizados para que el contenido se entienda.",
    thumbnail: "/images/project-editorial.webp",
    categories: ["diseno", "tecnologia"],
    client: "Muestra conceptual",
    year: "2026",
    tags: ["Diseño web", "Desarrollo"],
    heroMetric: "Enfoque: claridad en contenido",
    challenge:
      "Muchos sitios de contenido se sienten desordenados: tipografía inconsistente y módulos sueltos.",
    solution:
      "Definimos una retícula tipográfica, componentes reutilizables y reglas de composición antes de abrir páginas sueltas.",
    results:
      "Muestra conceptual de método. No representa un caso de cliente publicado.",
  },
  {
    slug: "interfaz-de-producto",
    name: "Landing de producto digital",
    description:
      "Una página que explica la oferta y conduce a una sola acción clara.",
    thumbnail: "/images/project-landing-producto.webp",
    categories: ["tecnologia", "diseno", "marketing"],
    client: "Muestra conceptual",
    year: "2026",
    tags: ["Landing", "Conversión"],
    heroMetric: "Enfoque: una acción clara",
    challenge:
      "Las landings sobrecargadas diluyen el mensaje y esconden el llamado a la acción.",
    solution:
      "Reducimos secciones a lo necesario: problema, propuesta, beneficios y contacto.",
    results:
      "Muestra conceptual de método. No representa un caso de cliente publicado.",
  },
  {
    slug: "lanzamiento-de-marca",
    name: "Web de lanzamiento de marca",
    description:
      "Identidad, sitio y mensaje alineados para un go-live coherente.",
    thumbnail: "/images/project-lanzamiento-marca.webp",
    categories: ["diseno", "marketing", "contenido"],
    client: "Muestra conceptual",
    year: "2025",
    tags: ["Diseño", "Marketing"],
    heroMetric: "Enfoque: una sola dirección",
    challenge:
      "Los lanzamientos fallan cuando la identidad, la web y la campaña hablan idiomas distintos.",
    solution:
      "Trabajamos mensaje, piezas y sitio en paralelo, con un brief compartido.",
    results:
      "Muestra conceptual de método. No representa un caso de cliente publicado.",
  },
  {
    slug: "landing-de-servicio",
    name: "Landing de servicio",
    description:
      "Explica el servicio y facilita pedir información sin rodeos.",
    thumbnail: "/images/project-landing-servicio.webp",
    categories: ["marketing", "diseno"],
    client: "Muestra conceptual",
    year: "2025",
    tags: ["Marketing", "Copy"],
    heroMetric: "Enfoque: oferta + contacto",
    challenge:
      "Sin un mensaje claro, el visitante abandona antes de escribir.",
    solution:
      "Priorizamos beneficio, prueba de criterio y un formulario simple.",
    results:
      "Muestra conceptual de método. No representa un caso de cliente publicado.",
  },
  {
    slug: "sitio-institucional",
    name: "Sitio institucional",
    description:
      "Presencia digital clara, sin frases genéricas ni promesas vacías.",
    thumbnail: "/images/project-institucional.webp",
    categories: ["diseno", "contenido"],
    client: "Muestra conceptual",
    year: "2025",
    tags: ["Diseño web", "Contenido"],
    heroMetric: "Enfoque: presencia clara",
    challenge:
      "Los sitios institucionales suelen repetir clichés y esconder lo que realmente ofrecen.",
    solution:
      "Escribimos y diseñamos alrededor de servicios concretos y formas de contacto.",
    results:
      "Muestra conceptual de método. No representa un caso de cliente publicado.",
  },
  {
    slug: "sistema-de-contenido",
    name: "Base de contenido digital",
    description:
      "Formatos y tono para publicar con consistencia en web y redes.",
    thumbnail: "/images/project-contenido.webp",
    categories: ["contenido", "marketing"],
    client: "Muestra conceptual",
    year: "2025",
    tags: ["Contenido", "Marketing"],
    heroMetric: "Enfoque: publicar con método",
    challenge:
      "Sin sistema, el contenido depende del impulso y la marca pierde continuidad.",
    solution:
      "Definimos formatos, brief por pieza y criterios de calidad antes de escalar volumen.",
    results:
      "Muestra conceptual de método. No representa un caso de cliente publicado.",
  },
];

export const ABOUT_VALUES = [
  {
    number: "01",
    title: "Claridad",
    description:
      "Preferimos decir las cosas como son. Si algo no entra en esta fase, lo hablamos a tiempo.",
  },
  {
    number: "02",
    title: "Oficio",
    description:
      "Cuidamos el diseño, el código y el mensaje con la misma atención: detrás de cada pantalla hay una persona.",
  },
  {
    number: "03",
    title: "Criterio",
    description:
      "Cada decisión responde a lo que tu proyecto necesita —no a la moda de la semana.",
  },
  {
    number: "04",
    title: "Entrega útil",
    description:
      "Lo que publicamos debe poder usarse, entenderse y mejorarse con el tiempo.",
  },
];

export const ABOUT_CAPABILITIES = [
  {
    title: "Diseño web para que te entiendan con claridad.",
    cta: "Ver diseño web",
  },
  {
    title: "Sitios y landings que acompañan al negocio.",
    cta: "Ver desarrollo",
  },
  {
    title: "Mensaje y contenido para conectar con las personas correctas.",
    cta: "Ver marketing",
  },
  {
    title: "Identidad, web y comunicación en una misma conversación.",
    cta: "Ver proyectos",
  },
  {
    title: "Rendimiento, usabilidad y mantenimiento con cuidado.",
    cta: "Ver servicios",
  },
  {
    title: "Desde Bogotá, con equipos y proyectos en LATAM.",
    cta: "Cuéntanos tu idea",
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
