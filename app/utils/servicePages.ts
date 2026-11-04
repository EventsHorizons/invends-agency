/**
 * Landing content for /servicios/[slug].
 * Built from the real SERVICE_CATEGORIES catalog — no invented metrics or clients.
 */
import type { Locale } from "~/composables/useLocale";
import { SERVICE_CATEGORIES, type ServiceCategory } from "~/utils/siteData";
import { serviceCategoriesFor } from "~/utils/serviceCategoriesI18n";

export interface ServicePageCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  problemTitle: string;
  problem: string;
  audienceTitle: string;
  audience: string;
  methodTitle: string;
  method: string;
  includesTitle: string;
  differenceTitle: string;
  difference: string;
  considerTitle: string;
  consider: string[];
  nextTitle: string;
  next: string;
  cta: string;
  relatedTitle: string;
  breadcrumbServices: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

type SeoSeed = {
  keyword: string;
  secondary: string[];
  es: Omit<ServicePageCopy, "includesTitle" | "relatedTitle" | "breadcrumbServices" | "faqTitle" | "cta"> & {
    includesTitle?: string;
  };
  en: Omit<ServicePageCopy, "includesTitle" | "relatedTitle" | "breadcrumbServices" | "faqTitle" | "cta"> & {
    includesTitle?: string;
  };
};

const SEO: Record<string, SeoSeed> = {
  "diseno-web": {
    keyword: "diseño web Bogotá",
    secondary: ["diseño de páginas web", "diseño UX UI", "agencia diseño web"],
    es: {
      metaTitle: "Diseño web en Bogotá | Invends",
      metaDescription:
        "Diseño web y UX/UI para empresas: arquitectura clara, interfaz usable y sitios que explican el negocio. Agencia Invends · Bogotá / LATAM.",
      h1: "Diseño web que hace fácil elegirte",
      lead: "Diseñamos sitios y landings con jerarquía, ritmo de lectura y comportamiento responsive. El objetivo no es “verse bonito”: es que el visitante entienda qué ofreces y qué hacer después.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Muchas webs fallan porque la información está desordenada, el móvil se siente improvisado o el mensaje no guía a una decisión. El diseño web de Invends ordena arquitectura, interfaz y sistema visual para que la página trabaje por el negocio.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas, estudios y equipos en Bogotá y LATAM que necesitan una presencia web profesional, un rediseño con criterio o landings alineadas a campañas.",
      methodTitle: "Cómo trabajamos",
      method:
        "Partimos del objetivo y del público. Definimos estructura y recorrido, prototipamos la interfaz y dejamos un sistema de componentes coherente antes de pasar a desarrollo.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Diseño, desarrollo y marketing comparten el mismo criterio: la pantalla debe sostener el mensaje y el siguiente paso, no competir con él.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Qué debe lograr la web en los próximos 6–12 meses",
        "A quién le hablas y qué objeciones repiten",
        "Si hay marca lista o hay que definirla en paralelo",
        "Qué páginas son críticas (inicio, servicio, contacto, landing)",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos el objetivo del sitio. Respondemos con alcance de diseño (y desarrollo si aplica), sin plantilla genérica.",
      faqs: [
        {
          q: "¿Diseño web incluye UX/UI?",
          a: "Sí: arquitectura de información, jerarquía, estados de interfaz y comportamiento responsive forman parte del servicio de diseño web.",
        },
        {
          q: "¿Trabajan solo en Bogotá?",
          a: "Atendemos desde Bogotá / LATAM por agenda. El proceso se puede llevar por videollamada.",
        },
      ],
    },
    en: {
      metaTitle: "Web design | Invends",
      metaDescription:
        "Web design and UX/UI for businesses: clear information architecture, usable interfaces and sites that explain the offer. Invends · Bogotá / LATAM.",
      h1: "Web design that makes you easy to choose",
      lead: "We design sites and landings with hierarchy, reading rhythm and responsive behavior. The goal is not decoration: visitors should understand what you offer and what to do next.",
      problemTitle: "What problem it solves",
      problem:
        "Many sites fail because information is disordered, mobile feels improvised or the message never guides a decision. Invends web design aligns structure, interface and visual system so the page works for the business.",
      audienceTitle: "Who it is for",
      audience:
        "Companies and teams in Bogotá and LATAM that need a professional web presence, a deliberate redesign or campaign landings.",
      methodTitle: "How we work",
      method:
        "We start from the goal and audience. We define structure and journey, prototype the interface and leave a coherent component system before development.",
      differenceTitle: "What makes this approach different",
      difference:
        "Design, development and marketing share one criterion: the screen must carry the message and the next step—not compete with them.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "What the site should achieve in the next 6–12 months",
        "Who you speak to and which objections keep coming up",
        "Whether brand is ready or needs to be defined in parallel",
        "Which pages are critical (home, service, contact, landing)",
      ],
      nextTitle: "Next step",
      next: "Tell us the site goal. We reply with design scope (and development if needed), not a generic template.",
      faqs: [
        {
          q: "Does web design include UX/UI?",
          a: "Yes: information architecture, hierarchy, interface states and responsive behavior are part of the web design service.",
        },
        {
          q: "Do you only work in Bogotá?",
          a: "We work from Bogotá / LATAM by appointment. The process can run by video call.",
        },
      ],
    },
  },
  branding: {
    keyword: "branding agencia Bogotá",
    secondary: ["identidad visual", "sistema de marca", "diseño de marca"],
    es: {
      metaTitle: "Branding e identidad visual | Invends",
      metaDescription:
        "Branding e identidad visual aplicables: posición, lenguaje y sistema para usar la marca en digital y en el día a día. Invends · Bogotá / LATAM.",
      h1: "Branding que se reconoce sin explicaciones",
      lead: "Definimos territorio, voz y sistema visual para que la marca se sostenga en pantalla, papel y producto —con reglas que el equipo pueda aplicar.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Cuando la marca cambia según quién diseñe el último PDF, se pierde reconocimiento y coherencia. El branding de Invends deja un lenguaje usable, no solo un logo.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Negocios que lanzan marca, renuevan identidad o necesitan un sistema aplicable a web, redes y materiales comerciales.",
      methodTitle: "Cómo trabajamos",
      method:
        "Aclaramos posición y tono, diseñamos símbolo y tipografía, y documentamos reglas de uso orientadas a digital.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "La identidad se piensa para coexistir con el sitio y las campañas: menos piezas sueltas, más sistema.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Qué debe transmitir la marca (y qué no)",
        "Dónde se usa hoy: web, redes, propuesta, empaque",
        "Si hay restricciones legales o de sector",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos el contexto de marca. Proponemos alcance de identidad y entregables aplicables.",
      faqs: [
        {
          q: "¿Entregan manual de marca?",
          a: "Entregamos criterios y sistema de aplicación orientados al uso real (digital primero), no un PDF ornamental.",
        },
      ],
    },
    en: {
      metaTitle: "Branding & visual identity | Invends",
      metaDescription:
        "Usable branding and visual identity: positioning, language and a system for everyday brand use. Invends · Bogotá / LATAM.",
      h1: "Branding that is recognized without explanations",
      lead: "We define territory, voice and visual system so the brand holds up on screen, paper and product—with rules the team can apply.",
      problemTitle: "What problem it solves",
      problem:
        "When the brand changes with every PDF, recognition and coherence collapse. Invends branding leaves a usable language, not just a logo.",
      audienceTitle: "Who it is for",
      audience:
        "Businesses launching a brand, renewing identity or needing a system for web, social and commercial materials.",
      methodTitle: "How we work",
      method:
        "We clarify position and tone, design symbol and type, and document usage rules oriented to digital.",
      differenceTitle: "What makes this approach different",
      difference:
        "Identity is designed to coexist with the site and campaigns: fewer loose assets, more system.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "What the brand must convey (and what it must not)",
        "Where it is used today: web, social, proposals, packaging",
        "Legal or sector constraints",
      ],
      nextTitle: "Next step",
      next: "Tell us the brand context. We propose identity scope and usable deliverables.",
      faqs: [
        {
          q: "Do you deliver a brand manual?",
          a: "We deliver application criteria and a system oriented to real use (digital first), not an ornamental PDF.",
        },
      ],
    },
  },
  "desarrollo-web": {
    keyword: "desarrollo web profesional",
    secondary: ["agencia desarrollo web", "sitios web corporativos", "desarrollo web Bogotá"],
    es: {
      metaTitle: "Desarrollo web profesional | Invends",
      metaDescription:
        "Desarrollo web orientado a velocidad, accesibilidad y evolución: sitios en producción con arquitectura clara. Invends · Bogotá / LATAM.",
      h1: "Desarrollo web que funciona cuando llega el tráfico",
      lead: "Construimos sitios listos para producción: rendimiento, formularios, integraciones y una base que se pueda cambiar sin reescribirlo todo.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Un diseño sin implementación sólida se rompe en el móvil, carga lento o no se puede mantener. El desarrollo web de Invends prioriza arquitectura, peso y despliegue.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas que necesitan un sitio corporativo, landing o producto web con criterio técnico —no solo una plantilla.",
      methodTitle: "Cómo trabajamos",
      method:
        "Definimos arquitectura frontend y contenido, medimos rendimiento básico, integramos lo necesario y publicamos con un camino claro de evolución.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El desarrollo entra en el mismo hilo que el diseño y el mensaje: menos fricción entre “maqueta” y “sitio en vivo”.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Stack o restricciones del cliente (CMS, hosting, APIs)",
        "Contenidos listos o en producción paralela",
        "Integraciones críticas (CRM, analítica, pagos)",
      ],
      nextTitle: "Siguiente paso",
      next: "Describe el sitio y las restricciones técnicas. Respondemos con alcance de implementación.",
      faqs: [
        {
          q: "¿Desarrollan y diseñan juntos?",
          a: "Sí. En Invends diseño y desarrollo comparten el alcance para evitar entregas desconectadas.",
        },
      ],
    },
    en: {
      metaTitle: "Professional web development | Invends",
      metaDescription:
        "Web development focused on speed, accessibility and evolution: production sites with clear architecture. Invends · Bogotá / LATAM.",
      h1: "Web development that holds up when traffic arrives",
      lead: "We build production-ready sites: performance, forms, integrations and a base you can change without rewriting everything.",
      problemTitle: "What problem it solves",
      problem:
        "Design without solid implementation breaks on mobile, loads slowly or cannot be maintained. Invends web development prioritizes architecture, weight and deploy.",
      audienceTitle: "Who it is for",
      audience:
        "Companies that need a corporate site, landing or web product with technical judgment—not just a template.",
      methodTitle: "How we work",
      method:
        "We define frontend and content architecture, check basic performance, integrate what is needed and publish with a clear evolution path.",
      differenceTitle: "What makes this approach different",
      difference:
        "Development shares the same thread as design and messaging: less friction between mockup and live site.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Client stack or constraints (CMS, hosting, APIs)",
        "Content ready or produced in parallel",
        "Critical integrations (CRM, analytics, payments)",
      ],
      nextTitle: "Next step",
      next: "Describe the site and technical constraints. We reply with implementation scope.",
      faqs: [
        {
          q: "Do you design and develop together?",
          a: "Yes. At Invends design and development share scope so deliveries do not drift apart.",
        },
      ],
    },
  },
  "desarrollo-apps": {
    keyword: "desarrollo de aplicaciones",
    secondary: ["producto digital", "aplicaciones web", "MVP"],
    es: {
      metaTitle: "Desarrollo de aplicaciones y producto digital | Invends",
      metaDescription:
        "Aplicaciones y productos digitales con flujos críticos claros: alcance, experiencia y tecnología. Invends · Bogotá / LATAM.",
      h1: "Aplicaciones que la gente vuelve a abrir",
      lead: "Definimos los recorridos críticos y los construimos para que el producto sea un hábito usable, no solo una pantalla demo.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Muchos productos se estancan en pantallas sueltas sin flujo completo. Construimos el recorrido que demuestra valor y se puede iterar.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos que validan un producto, necesitan un panel o una aplicación web con alcance realista.",
      methodTitle: "Cómo trabajamos",
      method:
        "Priorizamos flujo crítico, estados vacíos/error y continuidad entre sesiones; luego tecnología e integraciones.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El alcance sale del uso real, no de una lista infinita de features.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Quién usa el producto y con qué frecuencia",
        "Qué debe funcionar en la primera versión",
        "Qué queda explícitamente fuera",
      ],
      nextTitle: "Siguiente paso",
      next: "Describe el flujo crítico. Proponemos un alcance de producto usable.",
      faqs: [],
    },
    en: {
      metaTitle: "App & digital product development | Invends",
      metaDescription:
        "Digital products with clear critical flows: scope, experience and technology. Invends · Bogotá / LATAM.",
      h1: "Applications people open again",
      lead: "We define critical journeys and build them so the product becomes a usable habit—not just a demo screen.",
      problemTitle: "What problem it solves",
      problem:
        "Many products stall as loose screens without a complete flow. We build the journey that proves value and can iterate.",
      audienceTitle: "Who it is for",
      audience:
        "Teams validating a product, needing a dashboard or a web app with realistic scope.",
      methodTitle: "How we work",
      method:
        "We prioritize critical flow, empty/error states and session continuity; then technology and integrations.",
      differenceTitle: "What makes this approach different",
      difference:
        "Scope comes from real use, not an endless feature list.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Who uses the product and how often",
        "What must work in the first version",
        "What is explicitly out of scope",
      ],
      nextTitle: "Next step",
      next: "Describe the critical flow. We propose a usable product scope.",
      faqs: [],
    },
  },
  ecommerce: {
    keyword: "ecommerce desarrollo web",
    secondary: ["tienda online", "checkout", "catálogo web"],
    es: {
      metaTitle: "E-commerce y tiendas online | Invends",
      metaDescription:
        "E-commerce con catálogo, ficha y checkout ordenados para que la compra no se rompa a mitad de camino. Invends · Bogotá / LATAM.",
      h1: "E-commerce con un recorrido de compra que se sostiene",
      lead: "Ordenamos catálogo, ficha y checkout para que cada paso conserve el hilo hasta la confirmación.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Las tiendas pierden ventas cuando la ficha confunde, el carrito fricciona o el pago no encaja con la operación real.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Marcas y comercios que venden online o necesitan mejorar el recorrido de compra existente.",
      methodTitle: "Cómo trabajamos",
      method:
        "Mapeamos el recorrido, diseñamos ficha y checkout, e integramos pago e inventario según la operación.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Tratamos la compra como un recorrido de producto, no como un tema visual aislado.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Pasarela de pago y logística",
        "Variantes y stock",
        "Si hay catálogo listo o hay que estructurarlo",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos cómo vendes hoy. Respondemos con alcance de tienda y checkout.",
      faqs: [],
    },
    en: {
      metaTitle: "E-commerce & online stores | Invends",
      metaDescription:
        "E-commerce with catalog, product page and checkout structured so purchase does not break mid-way. Invends · Bogotá / LATAM.",
      h1: "E-commerce with a purchase journey that holds",
      lead: "We structure catalog, product page and checkout so each step keeps the thread until confirmation.",
      problemTitle: "What problem it solves",
      problem:
        "Stores lose sales when the product page confuses, the cart frictions or payment does not match real operations.",
      audienceTitle: "Who it is for",
      audience:
        "Brands and merchants selling online or improving an existing purchase journey.",
      methodTitle: "How we work",
      method:
        "We map the journey, design product page and checkout, and integrate payment and inventory to fit operations.",
      differenceTitle: "What makes this approach different",
      difference:
        "We treat purchase as a product journey, not an isolated visual theme.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Payment gateway and logistics",
        "Variants and stock",
        "Whether the catalog is ready or needs structure",
      ],
      nextTitle: "Next step",
      next: "Tell us how you sell today. We reply with store and checkout scope.",
      faqs: [],
    },
  },
  seo: {
    keyword: "SEO agencia Bogotá",
    secondary: ["posicionamiento orgánico", "SEO técnico", "arquitectura de contenido"],
    es: {
      metaTitle: "SEO técnico y de contenidos | Invends",
      metaDescription:
        "SEO alineado a intención de búsqueda: técnica, estructura y contenido medible. Invends · Bogotá / LATAM.",
      h1: "SEO para estar cuando ya están buscando",
      lead: "Alineamos indexación, arquitectura y contenido con la forma real en que se busca —sin promesas de ranking inventadas.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Sitios invisibles, páginas que compiten entre sí o contenido que no responde a la intención. Ordenamos base técnica y mapa temático.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Negocios con sitio propio que necesitan visibilidad orgánica sostenible, no trucos de corto plazo.",
      methodTitle: "Cómo trabajamos",
      method:
        "Auditoría técnica, arquitectura de contenido por intención y base de medición. El alcance se acuerda con lo que el sitio realmente puede sostener.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El SEO se integra con diseño y desarrollo: las páginas se construyen para ser rastreadas y entendidas.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Acceso a Search Console / analítica (si existen)",
        "Servicios o temas prioritarios a posicionar",
        "Capacidad de producir o editar contenido",
      ],
      nextTitle: "Siguiente paso",
      next: "Comparte la URL y el objetivo de negocio. Proponemos un alcance de auditoría o arquitectura.",
      faqs: [
        {
          q: "¿Garantizan posiciones en Google?",
          a: "No. Trabajamos técnica, estructura y contenido; el ranking depende de competencia, calidad y tiempo. No vendemos promesas de puesto.",
        },
      ],
    },
    en: {
      metaTitle: "Technical & content SEO | Invends",
      metaDescription:
        "SEO aligned to search intent: technical foundation, structure and measurable content. Invends · Bogotá / LATAM.",
      h1: "SEO to be there when people are already searching",
      lead: "We align indexing, architecture and content with how people actually search—without invented ranking promises.",
      problemTitle: "What problem it solves",
      problem:
        "Invisible sites, pages competing with each other or content that misses intent. We order the technical base and topical map.",
      audienceTitle: "Who it is for",
      audience:
        "Businesses with their own site that need sustainable organic visibility—not short-term tricks.",
      methodTitle: "How we work",
      method:
        "Technical audit, intent-based content architecture and a measurement base. Scope matches what the site can sustain.",
      differenceTitle: "What makes this approach different",
      difference:
        "SEO integrates with design and development: pages are built to be crawled and understood.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Access to Search Console / analytics (if any)",
        "Priority services or topics to rank for",
        "Capacity to produce or edit content",
      ],
      nextTitle: "Next step",
      next: "Share the URL and business goal. We propose audit or architecture scope.",
      faqs: [
        {
          q: "Do you guarantee Google rankings?",
          a: "No. We work on technical quality, structure and content; rankings depend on competition, quality and time. We do not sell position promises.",
        },
      ],
    },
  },
  "marketing-digital": {
    keyword: "agencia marketing digital Bogotá",
    secondary: ["marketing digital", "campañas y landing", "estrategia digital"],
    es: {
      metaTitle: "Marketing digital | Invends",
      metaDescription:
        "Marketing digital con mensaje, canal y página alineados. Campañas que llegan a un destino capaz de convertir. Invends · Bogotá / LATAM.",
      h1: "Marketing digital con continuidad anuncio–página",
      lead: "Definimos el papel de cada canal y lo conectamos con una página capaz de recibir esa atención —sin romper el mensaje a mitad de camino.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Campañas que llevan a una home genérica, o sitios que no sostienen el anuncio. Unificamos prioridad, mensaje y destino.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Marcas que invierten en tráfico (orgánico o pago) y necesitan coherencia entre campaña y experiencia web.",
      methodTitle: "Cómo trabajamos",
      method:
        "Prioridad de mensaje, secuencia de canales y páginas de llegada con medición compartida.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El marketing no se separa del diseño del destino: el clic tiene continuidad.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Objetivo de la campaña (lead, venta, agenda)",
        "Canales activos hoy",
        "Capacidad de seguimiento post-contacto",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos el objetivo de la campaña. Respondemos con alcance de mensaje y destino.",
      faqs: [],
    },
    en: {
      metaTitle: "Digital marketing | Invends",
      metaDescription:
        "Digital marketing with message, channel and page aligned. Campaigns that land on a destination able to convert. Invends · Bogotá / LATAM.",
      h1: "Digital marketing with ad-to-page continuity",
      lead: "We define each channel’s role and connect it to a page that can receive that attention—without breaking the message mid-way.",
      problemTitle: "What problem it solves",
      problem:
        "Campaigns that dump traffic on a generic home, or sites that cannot hold the ad promise. We unify priority, message and destination.",
      audienceTitle: "Who it is for",
      audience:
        "Brands investing in traffic (organic or paid) that need coherence between campaign and web experience.",
      methodTitle: "How we work",
      method:
        "Message priority, channel sequence and landing pages with shared measurement.",
      differenceTitle: "What makes this approach different",
      difference:
        "Marketing is not separated from destination design: the click has continuity.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Campaign goal (lead, sale, booking)",
        "Channels active today",
        "Capacity to follow up after contact",
      ],
      nextTitle: "Next step",
      next: "Tell us the campaign goal. We reply with message and destination scope.",
      faqs: [],
    },
  },
  "inteligencia-artificial": {
    keyword: "automatización IA empresa",
    secondary: ["IA aplicada", "flujos asistidos", "integración IA"],
    es: {
      metaTitle: "Inteligencia artificial aplicada | Invends",
      metaDescription:
        "IA aplicada a flujos reales de trabajo: caso de uso, límites y revisión humana. Invends · Bogotá / LATAM.",
      h1: "IA que amplía el trabajo sin sustituir el criterio",
      lead: "Elegimos un caso concreto, lo conectamos al flujo existente y dejamos la decisión en el equipo.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Proyectos de IA genéricos que no encajan en la operación. Empezamos por un uso acotado con control humano.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos que quieren asistir tareas repetitivas o de análisis con límites claros.",
      methodTitle: "Cómo trabajamos",
      method:
        "Definimos caso, datos/contexto, interfaz de petición/corrección y registro de lo generado.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "La máquina amplía; el criterio sigue siendo humano y auditable.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Qué tarea se quiere asistir",
        "Qué datos se pueden usar",
        "Quién revisa la salida",
      ],
      nextTitle: "Siguiente paso",
      next: "Describe el caso de uso. Evaluamos si conviene un flujo asistido.",
      faqs: [],
    },
    en: {
      metaTitle: "Applied artificial intelligence | Invends",
      metaDescription:
        "AI applied to real workflows: use case, limits and human review. Invends · Bogotá / LATAM.",
      h1: "AI that expands work without replacing judgment",
      lead: "We pick a concrete case, connect it to the existing flow and keep decisions with the team.",
      problemTitle: "What problem it solves",
      problem:
        "Generic AI projects that do not fit operations. We start with a bounded use case and human control.",
      audienceTitle: "Who it is for",
      audience:
        "Teams that want to assist repetitive or analysis tasks with clear limits.",
      methodTitle: "How we work",
      method:
        "We define the case, data/context, request/correction interface and a record of outputs.",
      differenceTitle: "What makes this approach different",
      difference:
        "The machine expands; judgment stays human and auditable.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Which task should be assisted",
        "Which data can be used",
        "Who reviews the output",
      ],
      nextTitle: "Next step",
      next: "Describe the use case. We assess whether an assisted flow makes sense.",
      faqs: [],
    },
  },
  automatizacion: {
    keyword: "automatización de procesos empresariales",
    secondary: ["automatización digital", "integraciones", "flujos de trabajo"],
    es: {
      metaTitle: "Automatización de procesos digitales | Invends",
      metaDescription:
        "Automatización de tareas repetidas: mapa, conexiones y excepciones visibles. Invends · Bogotá / LATAM.",
      h1: "Automatización: menos repetición, más tiempo útil",
      lead: "Conectamos sistemas que ya existen para sacar del calendario lo que se repite, con excepciones visibles.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Horas perdidas en copiar datos entre herramientas. Mapeamos qué automatizar y qué debe seguir siendo manual.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos operativos y comerciales con procesos repetidos entre apps, hojas y correos.",
      methodTitle: "Cómo trabajamos",
      method:
        "Mapa del proceso, conexión por API/webhook y control con registro y alertas.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "No automatizamos el caos: primero ordenamos el flujo y las excepciones.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Herramientas actuales",
        "Frecuencia del proceso",
        "Quién atiende excepciones",
      ],
      nextTitle: "Siguiente paso",
      next: "Describe el proceso que se repite. Evaluamos si conviene automatizarlo.",
      faqs: [],
    },
    en: {
      metaTitle: "Digital process automation | Invends",
      metaDescription:
        "Automation of repeated tasks: map, connections and visible exceptions. Invends · Bogotá / LATAM.",
      h1: "Automation: less repetition, more useful time",
      lead: "We connect existing systems to remove repeated work from the calendar, with visible exceptions.",
      problemTitle: "What problem it solves",
      problem:
        "Hours lost copying data between tools. We map what to automate and what must stay manual.",
      audienceTitle: "Who it is for",
      audience:
        "Ops and commercial teams with repeated processes across apps, sheets and email.",
      methodTitle: "How we work",
      method:
        "Process map, API/webhook connection and control with logging and alerts.",
      differenceTitle: "What makes this approach different",
      difference:
        "We do not automate chaos: we order the flow and exceptions first.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Current tools",
        "Process frequency",
        "Who handles exceptions",
      ],
      nextTitle: "Next step",
      next: "Describe the repeated process. We assess whether automation fits.",
      faqs: [],
    },
  },
  "migracion-legacy": {
    keyword: "migración web legacy",
    secondary: ["refactorización", "modernización de sistemas", "migración sin downtime"],
    es: {
      metaTitle: "Migración y refactorización de sistemas | Invends",
      metaDescription:
        "Modernizar sistemas legacy por fases, sin apagar el negocio. Diagnóstico, reescritura y entrega. Invends · Bogotá / LATAM.",
      h1: "Migración legacy sin apagar el negocio",
      lead: "Modernizamos el sistema que ya no deja cambiar el producto. La lógica se reescribe por partes hasta una interfaz que se puede seguir.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Deuda técnica que frena el producto. Diagnosticamos riesgos y migrarmos por fases.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos con monolitos o stacks antiguos que necesitan evolucionar sin corte brusco.",
      methodTitle: "Cómo trabajamos",
      method:
        "Mapa del sistema, reescritura de lógica crítica y plan de corte/despliegue.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Priorizamos continuidad operativa frente a reescrituras heroicas de una sola vez.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Acceso al código y a staging",
        "Qué no puede fallar en producción",
        "Ventanas de despliegue",
      ],
      nextTitle: "Siguiente paso",
      next: "Comparte el contexto técnico. Proponemos un diagnóstico acotado.",
      faqs: [],
    },
    en: {
      metaTitle: "Legacy migration & refactoring | Invends",
      metaDescription:
        "Modernize legacy systems in phases without shutting the business down. Invends · Bogotá / LATAM.",
      h1: "Legacy migration without shutting the business down",
      lead: "We modernize the system that blocks product change. Business logic is rewritten in parts until the interface can keep evolving.",
      problemTitle: "What problem it solves",
      problem:
        "Technical debt that stalls the product. We diagnose risks and migrate in phases.",
      audienceTitle: "Who it is for",
      audience:
        "Teams with monoliths or old stacks that need to evolve without a hard cutover.",
      methodTitle: "How we work",
      method:
        "System map, rewrite of critical logic and a cutover/deploy plan.",
      differenceTitle: "What makes this approach different",
      difference:
        "We prioritize operational continuity over one-shot heroic rewrites.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Access to code and staging",
        "What must not fail in production",
        "Deploy windows",
      ],
      nextTitle: "Next step",
      next: "Share the technical context. We propose a bounded diagnosis.",
      faqs: [],
    },
  },
  "mvp-rapido": {
    keyword: "MVP desarrollo rápido",
    secondary: ["MVP usable", "prototipo en producción", "MaaS"],
    es: {
      metaTitle: "MVP ultra-rápido (MaaS) | Invends",
      metaDescription:
        "Primera versión usable en producción con alcance y plazo acordados. Invends · Bogotá / LATAM.",
      h1: "MVP usable, con el alcance acordado",
      lead: "Construimos el flujo que demuestra la idea y lo dejamos publicado. El plazo sale del alcance, no de una fecha mágica.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Ideas atrapadas en decks. Entregamos un flujo crítico en producción para aprender con uso real.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Fundadores y equipos que necesitan validar con algo publicado, no solo prototipo visual.",
      methodTitle: "Cómo trabajamos",
      method:
        "Alcance del flujo crítico, construcción usable y deploy con base para iterar.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El plazo se deriva del alcance explícito: qué entra y qué queda fuera.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Hipótesis a validar",
        "Usuario objetivo",
        "Qué es negociable en el alcance",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos la hipótesis. Definimos un MVP con límites claros.",
      faqs: [],
    },
    en: {
      metaTitle: "Ultra-fast MVP (MaaS) | Invends",
      metaDescription:
        "A usable first version in production with agreed scope and timeline. Invends · Bogotá / LATAM.",
      h1: "Usable MVP with agreed scope",
      lead: "We build the flow that proves the idea and ship it. Timeline comes from scope—not a magic date.",
      problemTitle: "What problem it solves",
      problem:
        "Ideas stuck in decks. We deliver a critical flow in production to learn from real use.",
      audienceTitle: "Who it is for",
      audience:
        "Founders and teams that need to validate with something published—not only a visual prototype.",
      methodTitle: "How we work",
      method:
        "Critical-flow scope, usable build and deploy with a base to iterate.",
      differenceTitle: "What makes this approach different",
      difference:
        "Timeline is derived from explicit scope: what is in and what is out.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Hypothesis to validate",
        "Target user",
        "What is negotiable in scope",
      ],
      nextTitle: "Next step",
      next: "Tell us the hypothesis. We define an MVP with clear limits.",
      faqs: [],
    },
  },
};

export function getServiceCategoryBySlug(
  slug: string,
  locale: Locale = "es",
): ServiceCategory | undefined {
  return serviceCategoriesFor(locale).find(
    (c) => c.id === slug || c.anchor === slug,
  );
}

export function servicePageCopy(
  slug: string,
  locale: Locale,
): ServicePageCopy | null {
  const seed = SEO[slug];
  const cat = getServiceCategoryBySlug(slug, locale);
  if (!seed || !cat) return null;
  const base = locale === "en" ? seed.en : seed.es;
  const shared =
    locale === "en"
      ? {
          includesTitle: "What the service includes",
          relatedTitle: "Related services",
          breadcrumbServices: "Services",
          faqTitle: "Questions",
          cta: "Talk about this service",
        }
      : {
          includesTitle: "Qué incluye el servicio",
          relatedTitle: "Servicios relacionados",
          breadcrumbServices: "Servicios",
          faqTitle: "Preguntas",
          cta: "Hablar de este servicio",
        };
  return { ...base, ...shared };
}

export function allServiceSlugs() {
  return SERVICE_CATEGORIES.map((c) => c.anchor);
}

export function relatedServiceSlugs(slug: string, limit = 3) {
  const ids = allServiceSlugs();
  const i = ids.indexOf(slug);
  if (i < 0) return ids.slice(0, limit);
  const out: string[] = [];
  for (let step = 1; out.length < limit && step < ids.length; step++) {
    out.push(ids[(i + step) % ids.length]);
  }
  return out;
}

export function serviceKeyword(slug: string) {
  return SEO[slug]?.keyword ?? slug;
}
