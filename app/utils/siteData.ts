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
    headline: "Experiencias que hacen fácil elegirte.",
    number: "01",
    intro: "Sitios que explican el negocio y se pueden usar en el teléfono.",
    response:
      "Ordenamos jerarquía, ritmo y lectura para que la página explique el proyecto sin pedir esfuerzo.",
    image: "/images/services/svc-diseno-web.webp",
    imageAlt: "Layout web y arquitectura de interfaz en prototipo sobre dispositivo",
    items: [
      {
        title: "Estructura",
        description: "Arquitectura de información · Jerarquía y recorrido · Comportamiento responsive",
      },
      {
        title: "Interfaz",
        description: "Composición y tipo · Estados y foco · Ritmo de lectura",
      },
      {
        title: "Sistema",
        description: "Componentes · Tokens visuales · Consistencia entre páginas",
      },
      {
        title: "Entregables",
        description: "Sitios y landing pages · Sistemas de interfaz · Prototipos de lectura",
      },
    ],
  },
  {
    id: "branding",
    anchor: "branding",
    title: "Branding",
    headline: "Una identidad que se reconoce sin explicaciones.",
    number: "02",
    intro: "Nombre, tono y sistema visual para usar la marca en el día a día.",
    response:
      "Definimos un lenguaje visual y verbal que se sostiene en pantalla, papel y producto.",
    image: "/images/services/svc-branding.webp",
    imageAlt: "Sistema de papelería e identidad corporativa en composición editorial",
    items: [
      {
        title: "Posición",
        description: "Territorio de marca · Voz y criterio · Lo que no se dice",
      },
      {
        title: "Lenguaje",
        description: "Símbolo y tipo · Color y ritmo · Relación entre piezas",
      },
      {
        title: "Sistema",
        description: "Reglas aplicables · Dirección de arte · Uso en digital",
      },
      {
        title: "Entregables",
        description: "Identidad visual · Sistema de marca · Criterios de aplicación",
      },
    ],
  },
  {
    id: "desarrollo-web",
    anchor: "desarrollo-web",
    title: "Desarrollo web",
    headline: "Una web que no solo se ve bien: funciona para tu negocio.",
    number: "03",
    intro: "El sitio tiene que seguir en pie el día en que llega gente.",
    response:
      "Construimos una arquitectura que prioriza velocidad, acceso y la posibilidad de cambiar sin reescribirlo todo.",
    image: "/images/services/svc-desarrollo-web.webp",
    imageAlt: "Concepto de sitio responsive: layouts web en dispositivo",
    items: [
      {
        title: "Arquitectura",
        description: "Frontend y estructura · Contenido y datos · Despliegue",
      },
      {
        title: "Rendimiento",
        description: "Peso y render · Accesibilidad · Base medible",
      },
      {
        title: "Integración",
        description: "APIs · Formularios · Servicios existentes",
      },
      {
        title: "Entregables",
        description: "Sitios en producción · Base técnica evolutiva · Integraciones",
      },
    ],
  },
  {
    id: "desarrollo-apps",
    anchor: "desarrollo-apps",
    title: "Aplicaciones",
    headline: "Productos que la gente vuelve a abrir.",
    number: "04",
    intro: "Una aplicación es un hábito, no una pantalla.",
    response:
      "Definimos los recorridos críticos y los construimos para que alguien pueda volver a abrirlos.",
    image: "/images/services/svc-aplicaciones.webp",
    imageAlt: "Pantalla de producto móvil con interfaz de aplicación",
    items: [
      {
        title: "Producto",
        description: "Alcance · Flujos críticos · Prioridad de entrega",
      },
      {
        title: "Experiencia",
        description: "Interacción · Estados vacíos y de error · Continuidad entre sesiones",
      },
      {
        title: "Tecnología",
        description: "Datos · Acceso · Integraciones",
      },
      {
        title: "Entregables",
        description: "Productos mínimos usables · Aplicaciones web · Paneles y prototipos funcionales",
      },
    ],
  },
  {
    id: "ecommerce",
    anchor: "ecommerce",
    title: "E-commerce",
    headline: "Un recorrido de compra que no se rompe a mitad de camino.",
    number: "05",
    intro: "Comprar es un recorrido. Cada paso puede perderlo.",
    response:
      "Ordenamos ficha, catálogo y checkout para que la compra conserve su hilo hasta el final.",
    image: "/images/services/svc-ecommerce.webp",
    imageAlt: "Compra en tienda online desde la app móvil",
    items: [
      {
        title: "Catálogo",
        description: "Estructura · Ficha · Variantes",
      },
      {
        title: "Compra",
        description: "Carrito · Pago · Confirmación",
      },
      {
        title: "Operación",
        description: "Inventario · Envíos · Lectura del recorrido",
      },
      {
        title: "Entregables",
        description: "Tiendas · Checkout · Integraciones de pago y stock",
      },
    ],
  },
  {
    id: "seo",
    anchor: "seo",
    title: "SEO",
    headline: "Estar cuando alguien ya está buscando.",
    number: "06",
    intro: "Estar cuando la búsqueda ya tiene una intención.",
    response:
      "Alineamos técnica, estructura y contenido con la forma real en que se busca.",
    image: "/images/services/svc-seo.webp",
    imageAlt: "Panel de analítica orientado a visibilidad y búsqueda",
    items: [
      {
        title: "Técnica",
        description: "Indexación · Velocidad · Estructura rastreable",
      },
      {
        title: "Contenido",
        description: "Arquitectura temática · Páginas con intención · Claridad de respuesta",
      },
      {
        title: "Lectura",
        description: "Posiciones · Correspondencia búsqueda–página · Qué se puede medir",
      },
      {
        title: "Entregables",
        description: "Auditoría técnica · Arquitectura de contenido · Base de indexación",
      },
    ],
  },
  {
    id: "marketing-digital",
    anchor: "marketing-digital",
    title: "Marketing",
    headline: "Conecta con las personas correctas.",
    number: "07",
    intro: "Campaña, sitio y mensaje tienen que decir lo mismo.",
    response:
      "Definimos el papel de cada canal y lo conectamos con una página capaz de recibir esa atención.",
    image: "/images/services/svc-marketing.webp",
    imageAlt: "Estudio creativo: edición fotográfica y dirección de campaña",
    items: [
      {
        title: "Estrategia",
        description: "Prioridad · Mensaje · Secuencia",
      },
      {
        title: "Canales",
        description: "Orgánico · Pago · Correo",
      },
      {
        title: "Lectura",
        description: "Analítica compartida · Continuidad anuncio–página · Qué se decide con datos",
      },
      {
        title: "Entregables",
        description: "Sistema de campaña · Páginas de llegada · Medición compartida",
      },
    ],
  },
  {
    id: "inteligencia-artificial",
    anchor: "inteligencia-artificial",
    title: "Inteligencia artificial",
    headline: "Ampliar el trabajo sin perder el criterio.",
    number: "08",
    intro: "La máquina amplía el trabajo. La decisión sigue siendo humana.",
    response:
      "Elegimos un caso concreto, lo conectamos al flujo existente y dejamos el criterio en el equipo.",
    image: "/images/services/svc-ia.webp",
    imageAlt: "Concepto de sistemas de inteligencia artificial aplicados al trabajo",
    items: [
      {
        title: "Criterio",
        description: "Caso de uso · Límites · Revisión humana",
      },
      {
        title: "Sistema",
        description: "Contexto · Datos · Integración al flujo",
      },
      {
        title: "Interfaz",
        description: "Cómo se pide · Cómo se corrige · Qué queda registrado",
      },
      {
        title: "Entregables",
        description: "Flujos asistidos · Integraciones · Prototipos operativos",
      },
    ],
  },
  {
    id: "automatizacion",
    anchor: "automatizacion",
    title: "Automatización",
    headline: "Menos repetición. Más tiempo para lo que importa.",
    number: "09",
    intro: "Lo que se repite no debería ocupar el día.",
    response:
      "Conectamos los sistemas que ya existen para que la tarea repetida salga del calendario, con excepción visible.",
    image: "/images/services/svc-automatizacion.webp",
    imageAlt: "Optimización digital de procesos y flujos automatizados",
    items: [
      {
        title: "Mapa",
        description: "Qué se repite · Qué debe quedar manual · Dónde se rompe",
      },
      {
        title: "Conexión",
        description: "APIs · Webhooks · Herramientas actuales",
      },
      {
        title: "Control",
        description: "Registro · Avisos · Excepciones",
      },
      {
        title: "Entregables",
        description: "Flujos automatizados · Integraciones · Alertas y registro",
      },
    ],
  },
  {
    id: "migracion-legacy",
    anchor: "migracion-legacy",
    title: "Migración y refactorización",
    headline: "Modernizar sin apagar el negocio.",
    number: "10",
    intro: "El código viejo no tiene que decidir el ritmo del producto.",
    response:
      "Modernizamos el sistema que ya no deja cambiar el producto. La lógica se reescribe por partes, sin apagar el negocio, hasta dejar una interfaz que se puede seguir.",
    image: "/images/services/svc-migracion-art.webp",
    imageAlt: "Diagnóstico técnico de sistemas en proceso de migración",
    items: [
      {
        title: "Diagnóstico",
        description: "Mapa del monolito · Deuda y riesgos · Qué conservar",
      },
      {
        title: "Reescritura",
        description: "La lógica del negocio · Contratos claros · Datos en un solo lugar",
      },
      {
        title: "Entrega",
        description: "Interfaz moderna · Migración por fases · Sin parar el negocio",
      },
      {
        title: "Entregables",
        description: "Código modernizado · Arquitectura documentada · Plan de corte y despliegue",
      },
    ],
  },
  {
    id: "mvp-rapido",
    anchor: "mvp-rapido",
    title: "MVP ultra-rápido (MaaS)",
    headline: "Una primera versión usable, con el alcance acordado.",
    number: "11",
    intro: "Una primera versión usable, con el alcance y el plazo acordados.",
    response:
      "Construimos el flujo que demuestra la idea y lo dejamos publicado. El plazo sale del alcance, no de una fecha fija.",
    image: "/images/services/svc-mvp-art.webp",
    imageAlt: "Planificación de prototipo con notas adhesivas en mesa de trabajo",
    items: [
      {
        title: "Alcance",
        description: "Flujo crítico · Qué entra en esta fase · Qué queda fuera",
      },
      {
        title: "Construcción",
        description: "Interfaz usable · Lógica escrita · Datos ordenados",
      },
      {
        title: "Salida",
        description: "Deploy a producción · Accesos y roles · Base para iterar",
      },
      {
        title: "Entregables",
        description: "MVP en producción · Código y repositorio · Guía de siguientes pasos",
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
      "Abrimos con el objetivo comercial y el brief. Sin eso, diseñar o desarrollar es adivinar. Preferimos una conversación concreta antes que una propuesta genérica.",
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
      "Explicamos qué hacemos y por qué. Preferimos precisión a frases vacías.",
  },
  {
    number: "02",
    title: "Oficio",
    description:
      "Diseño, desarrollo y marketing se tratan con el mismo nivel de cuidado.",
  },
  {
    number: "03",
    title: "Criterio",
    description:
      "Cada decisión responde al objetivo del proyecto, no a la moda de la semana.",
  },
  {
    number: "04",
    title: "Entrega útil",
    description:
      "Lo que publicamos debe poder usarse, medirse y mejorarse con el tiempo.",
  },
];

export const ABOUT_CAPABILITIES = [
  {
    title: "Experiencias digitales que hacen fácil elegirte.",
    cta: "Ver diseño web",
  },
  {
    title: "Sitios y landings que funcionan para el negocio.",
    cta: "Ver desarrollo",
  },
  {
    title: "Mensaje y contenido para llegar a las personas correctas.",
    cta: "Ver marketing",
  },
  {
    title: "Identidad, web y comunicación en un mismo brief.",
    cta: "Ver proyectos",
  },
  {
    title: "Rendimiento, usabilidad y mantenimiento con criterio.",
    cta: "Ver servicios",
  },
  {
    title: "Trabajamos desde Bogotá con clientes en LATAM.",
    cta: "Contactar",
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
