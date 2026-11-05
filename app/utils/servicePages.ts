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
        "Diseño web y UX/UI en Bogotá / LATAM: páginas claras, pensadas para que quien te visite entienda qué haces y se sienta cómodo contactarte. Invends.",
      h1: "Web que se entiende",
      lead:
        "Diseñamos sitios y landings para que quien te visite entienda qué haces y se sienta cómodo dando el siguiente paso. Partimos de a quién le hablas y qué te gustaría lograr.",
      problemTitle: "Qué problema resuelve",
      problem:
        "A veces el sitio existe, pero cuesta entenderlo: la información se siente desordenada, el móvil improvisa o no queda claro qué hacer. Te ayudamos a ordenar estructura, interfaz y mensaje para que la página acompañe al negocio.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Personas y equipos en Bogotá y LATAM que quieren una presencia web más clara, un rediseño con sentido o landings alineadas a una campaña.",
      methodTitle: "Cómo trabajamos",
      method:
        "Partimos de lo que quieres lograr y de a quién le hablas. Definimos estructura y recorrido, prototipamos con calma y dejamos un sistema coherente antes de pasar a desarrollo.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Diseño, desarrollo y marketing conversan desde el principio: la pantalla sostiene el mensaje y el siguiente paso, sin pelearse entre sí.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Qué debe lograr la web en los próximos 6–12 meses",
        "A quién le hablas y qué objeciones repiten",
        "Si hay marca lista o hay que definirla en paralelo",
        "Qué páginas son críticas (inicio, servicio, contacto, landing)",
      ],
      nextTitle: "Siguiente paso",
      next:
        "Cuéntanos qué te gustaría lograr con tu sitio. Te respondemos con cercanía y un alcance claro de diseño —y desarrollo, si hace falta.",
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
        "Web design and UX/UI in Bogotá / LATAM: clear pages so visitors understand what you do and feel comfortable getting in touch. Invends.",
      h1: "Web people get",
      lead:
        "We design sites and landings so visitors understand what you do and feel comfortable taking the next step. We start from who you speak to and what you’d like to achieve.",
      problemTitle: "What problem it solves",
      problem:
        "Sometimes the site exists but it’s hard to follow: information feels messy, mobile feels improvised, or the next step isn’t clear. We help you order structure, interface and message so the page supports the business.",
      audienceTitle: "Who it is for",
      audience:
        "People and teams in Bogotá and LATAM who want a clearer web presence, a thoughtful redesign or landings aligned to a campaign.",
      methodTitle: "How we work",
      method:
        "We start from what you want to achieve and who you speak to. We define structure and journey, prototype calmly and leave a coherent system before development.",
      differenceTitle: "What makes this approach different",
      difference:
        "Design, development and marketing talk from day one: the screen carries the message and the next step—without fighting each other.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "What the site should achieve in the next 6–12 months",
        "Who you speak to and which objections keep coming up",
        "Whether brand is ready or needs to be defined in parallel",
        "Which pages are critical (home, service, contact, landing)",
      ],
      nextTitle: "Next step",
      next:
        "Tell us what you’d like your site to achieve. We’ll reply warmly with clear design scope—and development, if you need it.",
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
        "Branding e identidad visual para digital: voz, símbolo y reglas simples para que tu equipo use la marca sin reinventarla cada semana. Invends · Bogotá / LATAM.",
      h1: "Marca reconocible",
      lead:
        "Definimos voz, símbolo y reglas simples para que tu marca se reconozca en web, propuestas y redes —y tu equipo pueda usarla sin empezar de cero cada semana.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Si la marca cambia según quién diseñe el último PDF, cuesta reconocerla. Te ayudamos a dejar un lenguaje usable —no solo un logo aislado.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Personas y negocios que lanzan marca, la renuevan o necesitan un sistema claro para web, redes y materiales.",
      methodTitle: "Cómo trabajamos",
      method:
        "Conversamos sobre posición y tono, diseñamos símbolo y tipografía, y dejamos reglas de uso pensadas para el día a día digital.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "La identidad se piensa junto al sitio y las campañas: menos piezas sueltas, más coherencia.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Qué debe transmitir la marca (y qué no)",
        "Dónde se usa hoy: web, redes, propuesta, empaque",
        "Si hay restricciones legales o de sector",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos cómo se ve y se siente tu marca hoy. Te proponemos un alcance de identidad claro y usable.",
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
        "Branding and visual identity for digital: voice, symbol and simple rules so your team can use the brand without reinventing it every week. Invends · Bogotá / LATAM.",
      h1: "Recognizable brand",
      lead:
        "We help you define voice, symbol and simple rules so your brand holds on web, proposals and social—and your team can use it without starting over every week.",
      problemTitle: "What problem it solves",
      problem:
        "If the brand changes with every PDF, it’s hard to recognize. We help you leave a usable language—not just a standalone logo.",
      audienceTitle: "Who it is for",
      audience:
        "People and businesses launching a brand, renewing it, or needing a clear system for web, social and materials.",
      methodTitle: "How we work",
      method:
        "We talk through position and tone, design symbol and type, and leave usage rules made for everyday digital use.",
      differenceTitle: "What makes this approach different",
      difference:
        "Identity is designed alongside the site and campaigns: fewer loose assets, more coherence.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "What the brand must convey (and what it must not)",
        "Where it is used today: web, social, proposals, packaging",
        "Legal or sector constraints",
      ],
      nextTitle: "Next step",
      next: "Tell us how your brand looks and feels today. We’ll propose clear, usable identity scope.",
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
        "Desarrollo web con calma técnica: sitios rápidos, mantenibles e integrados. Formularios, rendimiento y una base que puedas seguir mejorando. Invends · Bogotá / LATAM.",
      h1: "Sitio que se sostiene",
      lead:
        "Implementamos el sitio para que se sienta confiable el día que llega gente: velocidad, formularios e integraciones —con una base que no haya que rehacer al primer cambio.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Un diseño bonito sin buena implementación se siente frágil: lento, difícil en móvil o imposible de mantener. Priorizamos arquitectura, peso y un despliegue claro.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos que necesitan un sitio, landing o producto web con cuidado técnico —sin depender de una plantilla que no encaja.",
      methodTitle: "Cómo trabajamos",
      method:
        "Definimos arquitectura y contenido, cuidamos el rendimiento básico, integramos lo necesario y publicamos con un camino claro para seguir mejorando.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El desarrollo conversa con el diseño y el mensaje desde el inicio: menos distancia entre la maqueta y el sitio en vivo.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Stack o restricciones del cliente (CMS, hosting, APIs)",
        "Contenidos listos o en producción paralela",
        "Integraciones críticas (CRM, analítica, pagos)",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos cómo imaginas el sitio y qué restricciones tienes. Te respondemos con un alcance de implementación claro.",
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
        "Web development with technical care: fast, maintainable, integrated sites. Forms, performance and a base you can keep improving. Invends · Bogotá / LATAM.",
      h1: "A site that holds",
      lead:
        "We implement the site so it feels reliable the day people arrive: speed, forms and integrations—with a base you don’t rewrite on the first change.",
      problemTitle: "What problem it solves",
      problem:
        "A nice design without solid implementation feels fragile: slow, awkward on mobile or hard to maintain. We prioritize architecture, weight and a clear deploy path.",
      audienceTitle: "Who it is for",
      audience:
        "Teams that need a site, landing or web product with technical care—without relying on a template that doesn’t fit.",
      methodTitle: "How we work",
      method:
        "We define architecture and content, care for basic performance, integrate what’s needed and publish with a clear path to keep improving.",
      differenceTitle: "What makes this approach different",
      difference:
        "Development talks with design and messaging from day one: less distance between mockup and live site.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Client stack or constraints (CMS, hosting, APIs)",
        "Content ready or produced in parallel",
        "Critical integrations (CRM, analytics, payments)",
      ],
      nextTitle: "Next step",
      next: "Tell us how you picture the site and what constraints you have. We’ll reply with clear implementation scope.",
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
        "Aplicaciones y producto digital: el flujo que importa primero, paneles y MVPs usables, con alcance por fases. Invends · Bogotá / LATAM.",
      h1: "Apps para el uso real",
      lead:
        "Construimos aplicaciones web y paneles pensando en cómo se usan de verdad. Priorizamos el flujo que demuestra valor; el resto queda fuera de fase a propósito —y lo hablamos contigo.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Muchos productos se quedan en pantallas sueltas sin un recorrido completo. Te ayudamos a construir el flujo que demuestra valor y se puede mejorar después.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Personas y equipos que validan un producto, necesitan un panel o una app web —con un alcance realista.",
      methodTitle: "Cómo trabajamos",
      method:
        "Empezamos por el flujo crítico, los estados vacíos o de error y la continuidad entre sesiones; después, tecnología e integraciones.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El alcance sale del uso real, no de una lista interminable de funciones.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Quién usa el producto y con qué frecuencia",
        "Qué debe funcionar en la primera versión",
        "Qué queda explícitamente fuera",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos qué debe poder hacer alguien en la primera versión. Te proponemos un alcance usable y honesto.",
      faqs: [],
    },
    en: {
      metaTitle: "App & digital product development | Invends",
      metaDescription:
        "Apps and digital products: the flow that matters first, dashboards and usable MVPs, with phased scope. Invends · Bogotá / LATAM.",
      h1: "Apps for real use",
      lead:
        "We build web apps and dashboards around how people actually use them. We prioritize the flow that proves value; everything else stays out of phase on purpose—and we talk it through with you.",
      problemTitle: "What problem it solves",
      problem:
        "Many products stall as loose screens without a complete journey. We help you build the flow that proves value and can improve later.",
      audienceTitle: "Who it is for",
      audience:
        "People and teams validating a product, needing a dashboard or a web app—with realistic scope.",
      methodTitle: "How we work",
      method:
        "We start with the critical flow, empty/error states and session continuity; then technology and integrations.",
      differenceTitle: "What makes this approach different",
      difference:
        "Scope comes from real use, not an endless feature wishlist.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Who uses the product and how often",
        "What must work in the first version",
        "What is explicitly out of scope",
      ],
      nextTitle: "Next step",
      next: "Tell us what someone should be able to do in the first version. We’ll propose honest, usable scope.",
      faqs: [],
    },
  },
  ecommerce: {
    keyword: "ecommerce desarrollo web",
    secondary: ["tienda online", "checkout", "catálogo web"],
    es: {
      metaTitle: "E-commerce y tiendas online | Invends",
      metaDescription:
        "Tiendas online pensadas para acompañar la compra: catálogo, checkout y operación alineados. Invends · Bogotá / LATAM.",
      h1: "Compra de punta a punta",
      lead:
        "Diseñamos y construimos el recorrido de compra completo —ficha, carrito, pago y confirmación— con inventario y pagos integrados para que puedas operar de verdad.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Las tiendas pierden compras cuando la ficha confunde, el carrito se siente difícil o el pago no encaja con cómo operas de verdad.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Marcas y comercios que venden online o quieren mejorar cómo se vive la compra hoy.",
      methodTitle: "Cómo trabajamos",
      method:
        "Mapeamos el recorrido juntos, diseñamos ficha y checkout, e integramos pago e inventario según cómo operas.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Tratamos la compra como un recorrido completo, no como un tema visual aislado.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Pasarela de pago y logística",
        "Variantes y stock",
        "Si hay catálogo listo o hay que estructurarlo",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos cómo vendes hoy. Te respondemos con un alcance claro de tienda y checkout.",
      faqs: [],
    },
    en: {
      metaTitle: "E-commerce & online stores | Invends",
      metaDescription:
        "Online stores built to support the purchase: catalog, checkout and operations aligned. Invends · Bogotá / LATAM.",
      h1: "Clear purchase journey",
      lead:
        "We design and build the full purchase journey—product page, cart, payment and confirmation—with inventory and payments integrated so you can really operate.",
      problemTitle: "What problem it solves",
      problem:
        "Stores lose purchases when the product page confuses, the cart feels hard or payment doesn’t match how you actually operate.",
      audienceTitle: "Who it is for",
      audience:
        "Brands and merchants selling online or wanting to improve how purchase feels today.",
      methodTitle: "How we work",
      method:
        "We map the journey together, design product page and checkout, and integrate payment and inventory to fit how you operate.",
      differenceTitle: "What makes this approach different",
      difference:
        "We treat purchase as a full journey, not an isolated visual theme.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Payment gateway and logistics",
        "Variants and stock",
        "Whether the catalog is ready or needs structure",
      ],
      nextTitle: "Next step",
      next: "Tell us how you sell today. We’ll reply with clear store and checkout scope.",
      faqs: [],
    },
  },
  seo: {
    keyword: "SEO agencia Bogotá",
    secondary: ["posicionamiento orgánico", "SEO técnico", "arquitectura de contenido"],
    es: {
      metaTitle: "SEO técnico y de contenidos | Invends",
      metaDescription:
        "SEO técnico y de contenidos para aparecer cuando alguien ya está buscando lo que ofreces. Sin promesas de ranking inventadas. Invends · Bogotá / LATAM.",
      h1: "Visible al buscarte",
      lead:
        "Trabajamos indexación, arquitectura y contenido útil alineados a búsquedas reales. Medimos con Search Console cuando está disponible —y no prometemos “primera página garantizada”.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Sitios difíciles de encontrar, páginas que se pisan entre sí o contenido que no responde a lo que la gente busca. Ordenamos la base técnica y el mapa temático contigo.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Negocios con sitio propio que quieren visibilidad orgánica sostenible —sin trucos de corto plazo.",
      methodTitle: "Cómo trabajamos",
      method:
        "Auditoría técnica, arquitectura de contenido por intención y una base de medición. El alcance se acuerda con lo que el sitio realmente puede sostener.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El SEO conversa con diseño y desarrollo: las páginas se construyen para ser encontradas y entendidas.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Acceso a Search Console / analítica (si existen)",
        "Servicios o temas prioritarios a posicionar",
        "Capacidad de producir o editar contenido",
      ],
      nextTitle: "Siguiente paso",
      next: "Comparte la URL y qué te gustaría lograr. Te proponemos un alcance de auditoría o arquitectura, con honestidad.",
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
        "Technical and content SEO to show up when someone is already looking for what you offer. No invented ranking promises. Invends · Bogotá / LATAM.",
      h1: "Visible when searched",
      lead:
        "We work on indexing, architecture and useful content aligned to real searches. We measure with Search Console when available—and we don’t promise “guaranteed #1.”",
      problemTitle: "What problem it solves",
      problem:
        "Hard-to-find sites, pages stepping on each other or content that misses what people search for. We order the technical base and topical map with you.",
      audienceTitle: "Who it is for",
      audience:
        "Businesses with their own site that want sustainable organic visibility—without short-term tricks.",
      methodTitle: "How we work",
      method:
        "Technical audit, intent-based content architecture and a measurement base. Scope matches what the site can honestly sustain.",
      differenceTitle: "What makes this approach different",
      difference:
        "SEO talks with design and development: pages are built to be found and understood.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Access to Search Console / analytics (if any)",
        "Priority services or topics to rank for",
        "Capacity to produce or edit content",
      ],
      nextTitle: "Next step",
      next: "Share the URL and what you’d like to achieve. We’ll propose audit or architecture scope—honestly.",
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
        "Marketing digital donde el anuncio y la página dicen lo mismo: mensaje, canal y destino alineados, con medición de contactos. Invends · Bogotá / LATAM.",
      h1: "Anuncio y página alineados",
      lead:
        "Definimos el papel de cada canal y lo conectamos a una página capaz de recibir esa atención. Preferimos conversaciones útiles a publicar por publicar.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Campañas que llevan a una home genérica, o sitios que no sostienen lo que promete el anuncio. Unificamos prioridad, mensaje y destino contigo.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Marcas que invierten en tráfico (orgánico o pago) y quieren coherencia entre la campaña y lo que pasa en la web.",
      methodTitle: "Cómo trabajamos",
      method:
        "Prioridad de mensaje, secuencia de canales y páginas de llegada —con medición compartida.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El marketing no se separa del diseño del destino: el clic tiene continuidad, no un salto al vacío.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Objetivo de la campaña (lead, venta, agenda)",
        "Canales activos hoy",
        "Capacidad de seguimiento post-contacto",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos qué te gustaría lograr con la campaña. Te respondemos con alcance de mensaje y destino.",
      faqs: [],
    },
    en: {
      metaTitle: "Digital marketing | Invends",
      metaDescription:
        "Digital marketing where the ad and the page say the same thing: message, channel and destination aligned, with contact measurement. Invends · Bogotá / LATAM.",
      h1: "Ad and page aligned",
      lead:
        "We define each channel’s role and connect it to a page ready to receive that attention. We prefer useful conversations over posting for posting’s sake.",
      problemTitle: "What problem it solves",
      problem:
        "Campaigns that dump traffic on a generic home, or sites that can’t hold what the ad promises. We unify priority, message and destination with you.",
      audienceTitle: "Who it is for",
      audience:
        "Brands investing in traffic (organic or paid) that want coherence between the campaign and what happens on the site.",
      methodTitle: "How we work",
      method:
        "Message priority, channel sequence and landing pages—with shared measurement.",
      differenceTitle: "What makes this approach different",
      difference:
        "Marketing isn’t separated from destination design: the click has continuity, not a leap into the void.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Campaign goal (lead, sale, booking)",
        "Channels active today",
        "Capacity to follow up after contact",
      ],
      nextTitle: "Next step",
      next: "Tell us what you’d like the campaign to achieve. We’ll reply with message and destination scope.",
      faqs: [],
    },
  },
  "inteligencia-artificial": {
    keyword: "automatización IA empresa",
    secondary: ["IA aplicada", "flujos asistidos", "integración IA"],
    es: {
      metaTitle: "Inteligencia artificial aplicada | Invends",
      metaDescription:
        "IA aplicada a un caso concreto de tu operación: asistir tareas con límites claros y revisión humana. Invends · Bogotá / LATAM.",
      h1: "IA con criterio",
      lead:
        "Elegimos un flujo real contigo, lo conectamos a tus herramientas y dejamos la decisión final en el equipo. Ampliar el trabajo, no sustituir el criterio.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Proyectos de IA genéricos que no encajan en el día a día. Empezamos por un uso acotado, con control humano.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos que quieren asistir tareas repetitivas o de análisis —con límites claros y honestos.",
      methodTitle: "Cómo trabajamos",
      method:
        "Definimos el caso, los datos o el contexto, cómo se pide y corrige, y un registro de lo generado.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "La máquina amplía; el criterio sigue siendo tuyo —y auditable.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Qué tarea se quiere asistir",
        "Qué datos se pueden usar",
        "Quién revisa la salida",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos qué tarea te gustaría asistir. Evaluamos juntos si conviene un flujo asistido.",
      faqs: [],
    },
    en: {
      metaTitle: "Applied artificial intelligence | Invends",
      metaDescription:
        "Applied AI for a concrete case in your operations: assist tasks with clear limits and human review. Invends · Bogotá / LATAM.",
      h1: "AI with judgment",
      lead:
        "We pick a real flow with you, connect it to your tools, and leave final decisions with the team. Expand the work—don’t replace judgment.",
      problemTitle: "What problem it solves",
      problem:
        "Generic AI projects that don’t fit day-to-day work. We start with a bounded use case and human control.",
      audienceTitle: "Who it is for",
      audience:
        "Teams that want to assist repetitive or analysis tasks—with clear, honest limits.",
      methodTitle: "How we work",
      method:
        "We define the case, data or context, how requests and corrections work, and a record of outputs.",
      differenceTitle: "What makes this approach different",
      difference:
        "The machine expands; judgment stays yours—and auditable.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Which task should be assisted",
        "Which data can be used",
        "Who reviews the output",
      ],
      nextTitle: "Next step",
      next: "Tell us which task you’d like to assist. We’ll assess together whether an assisted flow makes sense.",
      faqs: [],
    },
  },
  automatizacion: {
    keyword: "automatización de procesos empresariales",
    secondary: ["automatización digital", "integraciones", "flujos de trabajo"],
    es: {
      metaTitle: "Automatización de procesos digitales | Invends",
      metaDescription:
        "Automatización de procesos digitales: primero entendemos qué se repite; después conectamos con control. Invends · Bogotá / LATAM.",
      h1: "Menos repetición",
      lead:
        "Primero mapeamos juntos qué se repite y qué debe quedar manual. Después conectamos APIs y tus herramientas actuales, con alertas y excepciones visibles.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Horas perdidas copiando datos entre herramientas. Te ayudamos a ver qué conviene automatizar —y qué debe seguir siendo manual.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos operativos y comerciales con procesos que se repiten entre apps, hojas y correos.",
      methodTitle: "Cómo trabajamos",
      method:
        "Mapa del proceso, conexión por API o webhook, y control con registro y alertas.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "No automatizamos el caos: primero ordenamos el flujo y las excepciones contigo.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Herramientas actuales",
        "Frecuencia del proceso",
        "Quién atiende excepciones",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos qué proceso se te repite. Evaluamos juntos si conviene automatizarlo.",
      faqs: [],
    },
    en: {
      metaTitle: "Digital process automation | Invends",
      metaDescription:
        "Digital process automation: first we understand what repeats; then we connect with control. Invends · Bogotá / LATAM.",
      h1: "Less repetition",
      lead:
        "First we map together what repeats and what must stay manual. Then we connect APIs and your current tools, with visible alerts and exceptions.",
      problemTitle: "What problem it solves",
      problem:
        "Hours lost copying data between tools. We help you see what to automate—and what should stay manual.",
      audienceTitle: "Who it is for",
      audience:
        "Ops and commercial teams with processes that keep repeating across apps, sheets and email.",
      methodTitle: "How we work",
      method:
        "Process map, API or webhook connection, and control with logging and alerts.",
      differenceTitle: "What makes this approach different",
      difference:
        "We don’t automate chaos: we order the flow and exceptions with you first.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Current tools",
        "Process frequency",
        "Who handles exceptions",
      ],
      nextTitle: "Next step",
      next: "Tell us which process keeps repeating. We’ll assess together whether automation fits.",
      faqs: [],
    },
  },
  "migracion-legacy": {
    keyword: "migración web legacy",
    secondary: ["refactorización", "modernización de sistemas", "migración sin downtime"],
    es: {
      metaTitle: "Migración y refactorización de sistemas | Invends",
      metaDescription:
        "Migración y refactorización de sistemas legacy por fases —sin apagar lo que ya funciona. Invends · Bogotá / LATAM.",
      h1: "Modernizar por fases",
      lead:
        "Diagnosticamos la deuda técnica y modernizamos por cortes medidos: reescribimos lo crítico, conservamos lo útil y dejamos una base que tu equipo pueda seguir.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Deuda técnica que frena el producto. Diagnosticamos riesgos y migrarmos por fases —sin drama innecesario.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos con sistemas antiguos o monolitos que necesitan evolucionar sin un corte brusco.",
      methodTitle: "Cómo trabajamos",
      method:
        "Mapa del sistema, reescritura de lo crítico y un plan de corte y despliegue conversado contigo.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Priorizamos que el negocio siga funcionando frente a reescrituras heroicas de una sola vez.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Acceso al código y a staging",
        "Qué no puede fallar en producción",
        "Ventanas de despliegue",
      ],
      nextTitle: "Siguiente paso",
      next: "Comparte el contexto técnico. Te proponemos un diagnóstico acotado y honesto.",
      faqs: [],
    },
    en: {
      metaTitle: "Legacy migration & refactoring | Invends",
      metaDescription:
        "Legacy migration and refactoring in phases—without shutting down what already works. Invends · Bogotá / LATAM.",
      h1: "Modernize in phases",
      lead:
        "We diagnose technical debt and modernize with measured cutovers: rewrite what’s critical, keep what helps, and leave a base your team can continue.",
      problemTitle: "What problem it solves",
      problem:
        "Technical debt that stalls the product. We diagnose risks and migrate in phases—without unnecessary drama.",
      audienceTitle: "Who it is for",
      audience:
        "Teams with old systems or monoliths that need to evolve without a hard cutover.",
      methodTitle: "How we work",
      method:
        "System map, rewrite of what’s critical, and a cutover/deploy plan we talk through with you.",
      differenceTitle: "What makes this approach different",
      difference:
        "We prioritize keeping the business running over one-shot heroic rewrites.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Access to code and staging",
        "What must not fail in production",
        "Deploy windows",
      ],
      nextTitle: "Next step",
      next: "Share the technical context. We’ll propose a bounded, honest diagnosis.",
      faqs: [],
    },
  },
  "mvp-rapido": {
    keyword: "MVP desarrollo rápido",
    secondary: ["MVP usable", "prototipo en producción", "MaaS"],
    es: {
      metaTitle: "MVP ultra-rápido (MaaS) | Invends",
      metaDescription:
        "MVP ultra-rápido (MaaS): una primera versión usable en producción, con alcance y límites claros desde el inicio. Invends · Bogotá / LATAM.",
      h1: "MVP con límites",
      lead:
        "Construimos el flujo mínimo que demuestra la idea, lo publicamos y dejamos base para iterar. El plazo sale del alcance que acordamos juntos —no de una fecha mágica.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Ideas atrapadas en presentaciones. Te ayudamos a publicar un flujo crítico para aprender con uso real.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Fundadores y equipos que necesitan validar con algo publicado —no solo un prototipo visual.",
      methodTitle: "Cómo trabajamos",
      method:
        "Alcance del flujo crítico, construcción usable y publicación con base para seguir iterando.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "El plazo se deriva del alcance explícito: qué entra y qué queda fuera —hablado contigo.",
      considerTitle: "Qué conviene tener claro antes de contratar",
      consider: [
        "Hipótesis a validar",
        "Usuario objetivo",
        "Qué es negociable en el alcance",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos la hipótesis. Definimos juntos un MVP con límites claros.",
      faqs: [],
    },
    en: {
      metaTitle: "Ultra-fast MVP (MaaS) | Invends",
      metaDescription:
        "Ultra-fast MVP (MaaS): a first usable version in production, with clear scope and limits from day one. Invends · Bogotá / LATAM.",
      h1: "MVP with clear limits",
      lead:
        "We build the minimum flow that proves the idea, ship it, and leave a base to iterate. Timeline comes from the scope we agree together—not a magic date.",
      problemTitle: "What problem it solves",
      problem:
        "Ideas stuck in decks. We help you publish a critical flow to learn from real use.",
      audienceTitle: "Who it is for",
      audience:
        "Founders and teams that need to validate with something published—not just a visual prototype.",
      methodTitle: "How we work",
      method:
        "Critical-flow scope, usable build and publish with a base to keep iterating.",
      differenceTitle: "What makes this approach different",
      difference:
        "Timeline is derived from explicit scope: what’s in and what’s out—talked through with you.",
      considerTitle: "What to clarify before hiring",
      consider: [
        "Hypothesis to validate",
        "Target user",
        "What is negotiable in scope",
      ],
      nextTitle: "Next step",
      next: "Tell us the hypothesis. We’ll define an MVP with clear limits together.",
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
          cta: "Tell us about this need",
        }
      : {
          includesTitle: "Qué incluye el servicio",
          relatedTitle: "Servicios relacionados",
          breadcrumbServices: "Servicios",
          faqTitle: "Preguntas",
          cta: "Cuéntanos sobre esta necesidad",
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
