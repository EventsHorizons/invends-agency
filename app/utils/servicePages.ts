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
    secondary: ["diseño de páginas web", "diseño UX UI", "estudio diseño web"],
    es: {
      metaTitle: "Diseño Web y UI/UX en Bogotá | Invends",
      metaDescription:
        "Diseñamos interfaces web intuitivas y elegantes que explican tu negocio con claridad y guían a tus visitas hacia la conversión. Invends.",
      h1: "Páginas web diseñadas para ser elegidas",
      lead:
        "Estructuramos sitios web institucionales y páginas de aterrizaje donde la jerarquía visual y el contenido guían al visitante de forma natural hacia el contacto.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Muchos sitios web sufren de exceso de adornos, textos confusos y experiencias móviles deficientes que ahuyentan a los clientes. Nosotros ponemos orden: arquitectura lógica, lectura cómoda y navegación sin obstáculos.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas y profesionales que buscan proyectar autoridad digital, renovar un sitio anticuado o lanzar landings de alta conversión para sus campañas.",
      methodTitle: "Cómo trabajamos",
      method:
        "Partimos de tu cliente ideal y de tus metas comerciales. Diseñamos la arquitectura de información, prototipamos en Figma y validamos cada interacción antes del desarrollo.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Criterio editorial y conversión de la mano: el diseño no es decoración, es la herramienta principal para construir confianza y facilitar la venta.",
      considerTitle: "Qué conviene tener claro antes de arrancar",
      consider: [
        "Qué objetivo comercial prioritario debe cumplir tu sitio web",
        "Quién es tu cliente ideal y qué preguntas u objeciones suele tener",
        "Si ya cuentas con identidad de marca o debemos estructurarla",
        "Qué secciones o funcionalidades son críticas para la primera fase",
      ],
      nextTitle: "Siguiente paso",
      next:
        "Cuéntanos sobre tu proyecto. Te responderemos en menos de 24 horas con un diagnóstico y una propuesta clara de alcance.",
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
      metaTitle: "Branding e Identidad Visual | Invends",
      metaDescription:
        "Diseñamos identidades visuales memorables y sistemas de marca para entornos digitales. Logotipos, tipografía y guías de estilo para empresas en crecimiento.",
      h1: "Identidad visual y sistemas de marca",
      lead:
        "Diseñamos marcas que proyectan solidez y coherencia en cada punto de contacto: desde la paleta tipográfica y el logotipo hasta el sistema de diseño para tus canales digitales.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Una imagen inconsistente o anticuada devalúa tus servicios y confunde a los clientes potenciales. Construimos un lenguaje visual reconocible que posiciona a tu empresa con autoridad.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas en expansión, nuevos proyectos o marcas consolidadas que necesitan unificar su comunicación gráfica y proyectar una imagen profesional y moderna.",
      methodTitle: "Cómo trabajamos",
      method:
        "Investigamos tu mercado y propuesta de valor, exploramos conceptos visuales y entregamos un sistema de diseño práctico y listo para aplicar en web, redes y presentaciones.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Diseño pensado para el mundo digital: no entregamos un PDF decorativo que nadie abre, sino activos editables y directrices claras para el uso cotidiano.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Qué posicionamiento y valores debe transmitir la marca",
        "Puntos de contacto prioritarios: web, presentaciones, producto o redes",
        "Público objetivo y referentes visuales del sector",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos sobre tu empresa y la etapa actual de tu marca. Te planteamos una propuesta de diseño e identidad adaptada a tus objetivos.",
      faqs: [
        {
          q: "¿Entregan manual de marca?",
          a: "Entregamos un sistema de diseño y directrices de aplicación digital claras: paletas de color, combinaciones tipográficas, retículas y componentes gráficos listos para producción.",
        },
      ],
    },
    en: {
      metaTitle: "Branding & Visual Identity | Invends",
      metaDescription:
        "We design memorable visual identities and design systems for digital brands. Logos, typography, and cohesive brand guidelines. Invends.",
      h1: "Visual identity and design systems",
      lead:
        "We design brands that project confidence and clarity across every touchpoint: from typography and logo craft to comprehensive digital design systems.",
      problemTitle: "What problem it solves",
      problem:
        "An inconsistent or dated look devalues your products and confuses prospects. We build a cohesive visual system that establishes instant market authority.",
      audienceTitle: "Who it is for",
      audience:
        "Growing companies, startups, and established businesses looking to elevate their brand presence and communicate with modern aesthetic precision.",
      methodTitle: "How we work",
      method:
        "We analyze your market positioning, craft distinct visual concepts, and deliver a practical design system ready for deployment across web, decks, and social media.",
      differenceTitle: "What makes this approach different",
      difference:
        "Digital-first brand architecture: instead of an ornamental PDF that gathers dust, we deliver practical Figma components and production assets.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Core brand values and positioning goals",
        "Primary brand touchpoints (website, proposals, packaging, UI)",
        "Target audience and market differentiators",
      ],
      nextTitle: "Next step",
      next: "Tell us about your brand vision and current materials. We will structure a straightforward visual identity proposal.",
      faqs: [
        {
          q: "Do you deliver a brand manual?",
          a: "We deliver actionable design guidelines and component libraries focused on real-world digital application.",
        },
      ],
    },
  },
  "desarrollo-web": {
    keyword: "desarrollo web profesional",
    secondary: ["agencia desarrollo web", "sitios web corporativos", "desarrollo web Bogotá"],
    es: {
      metaTitle: "Desarrollo Web Profesional y Nuxt | Invends",
      metaDescription:
        "Desarrollamos sitios web ultrarrápidos, seguros y escalables construidos sobre Nuxt y Vue. Código limpio, rendimiento impecable y autonomía para tu equipo.",
      h1: "Desarrollo web de alto rendimiento",
      lead:
        "Construimos plataformas web modernas, veloces y fáciles de gestionar. Sin plantillas pesadas ni dependencias frágiles: ingeniería frontend diseñada para impulsar tu negocio.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Las plataformas lentas, con errores de visualización o basadas en plugins sobrecargados pierden clientes y penalizan en Google. Desarrollamos con código limpio para garantizar velocidad y estabilidad continua.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas que necesitan renovar su sitio corporativo, lanzar portales interactivos o contar con una presencia digital sólida que cargue de inmediato.",
      methodTitle: "Cómo trabajamos",
      method:
        "Diseñamos una arquitectura modular, programamos componentes optimizados en Nuxt/Vue, integramos tus herramientas de gestión y desplegamos con altos estándares de seguridad y SEO técnico.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Ingeniería moderna y diseño de interfaces trabajando juntos: el resultado final es idéntico a lo aprobado en diseño y carga en fracciones de segundo.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Requisitos técnicos o herramientas de gestión actuales",
        "Contenido y estructura de páginas prioritarias",
        "Integraciones necesarias (CRM, analítica, formularios o pasarelas)",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos sobre tu sitio actual o el nuevo proyecto. Analizamos tu requerimiento y te presentamos una propuesta de desarrollo clara y detallada.",
      faqs: [
        {
          q: "¿Podrá mi equipo actualizar los contenidos?",
          a: "Totalmente. Entregamos el sitio conectado a paneles de administración intuitivos para que tu equipo publique artículos, fotos y textos sin tocar una línea de código.",
        },
      ],
    },
    en: {
      metaTitle: "Professional Web Development | Invends",
      metaDescription:
        "High-performance, secure, and accessible websites built with modern frameworks. Nuxt, Vue, and clean engineering for scaling businesses.",
      h1: "High-performance web development",
      lead:
        "We build fast, secure, and maintainable web platforms. Free of bloated templates and fragile plugins: clean frontend engineering built to scale.",
      problemTitle: "What problem it solves",
      problem:
        "Slow, fragile websites damage brand credibility and hurt conversion rates. We engineer clean web experiences that load instantly and perform reliably under traffic.",
      audienceTitle: "Who it is for",
      audience:
        "Businesses needing to overhaul outdated corporate websites or build custom web platforms with world-class frontend execution.",
      methodTitle: "How we work",
      method:
        "We build modular components, optimize core web vitals, integrate your operational tools, and deploy to modern global infrastructure.",
      differenceTitle: "What makes this approach different",
      difference:
        "Direct collaboration between engineering and design: zero disconnect between Figma mockups and production reality.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Existing tech stack or CMS preferences",
        "Key pages, features, and content readiness",
        "Third-party integrations (CRM, payment gateways, analytics)",
      ],
      nextTitle: "Next step",
      next: "Share your project goals and technical requirements. We will prepare a detailed engineering plan.",
      faqs: [
        {
          q: "Can our internal team update content?",
          a: "Yes. We configure user-friendly CMS solutions so your marketing team can publish and edit content effortlessly.",
        },
      ],
    },
  },
  "desarrollo-apps": {
    keyword: "desarrollo de aplicaciones",
    secondary: ["producto digital", "aplicaciones web", "MVP"],
    es: {
      metaTitle: "Aplicaciones Web y Producto Digital | Invends",
      metaDescription:
        "Desarrollo de aplicaciones web y portales interactivos a medida. Interfaces fluidas, lógica de negocio robusta y experiencia de usuario intuitiva.",
      h1: "Aplicaciones web y portales a medida",
      lead:
        "Diseñamos y programamos aplicaciones web, portales de clientes y paneles de gestión enfocados en simplificar procesos complejos y ofrecer una experiencia de usuario ágil.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Procesos manuales desorganizados o plataformas complejas que frustran a usuarios y clientes. Diseñamos herramientas interactivas que hacen el trabajo diario eficiente y agradable.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas y startups que necesitan digitalizar operaciones, crear plataformas de suscripción o construir portales de autogestión para sus clientes.",
      methodTitle: "Cómo trabajamos",
      method:
        "Mapeamos los flujos de usuario críticos, diseñamos prototipos interactivos y desarrollamos la solución con arquitecturas escalables y pruebas exhaustivas.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Diseño centrado en la usabilidad real: cada botón, formulario y vista está optimizado para ahorrar clics y evitar confusiones.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Roles de usuario y permisos necesarios",
        "Flujos de trabajo esenciales para la primera versión",
        "Sistemas internos o bases de datos a integrar",
      ],
      nextTitle: "Siguiente paso",
      next: "Conversemos sobre la herramienta o aplicación que necesitas construir. Evaluamos la arquitectura ideal y te presentamos un plan de entrega ordenado.",
      faqs: [],
    },
    en: {
      metaTitle: "Web Applications & Digital Products | Invends",
      metaDescription:
        "Custom web applications and user portals. Intuitive interfaces, robust business logic, and seamless user experiences for modern companies.",
      h1: "Custom web applications & portals",
      lead:
        "We design and build bespoke web applications, customer portals, and internal tools focused on simplifying complex workflows with effortless usability.",
      problemTitle: "What problem it solves",
      problem:
        "Clunky software and manual workarounds slow down operations. We create purpose-built digital tools that save time and empower users.",
      audienceTitle: "Who it is for",
      audience:
        "Companies looking to streamline customer-facing operations or build subscription software with intuitive UX.",
      methodTitle: "How we work",
      method:
        "We map essential user workflows, prototype interfaces, and engineer scalable architectures with automated test coverage.",
      differenceTitle: "What makes this approach different",
      difference:
        "Obsessive focus on real-world usability: every interaction is designed to eliminate friction and confusion.",
      considerTitle: "Key factors to clarify",
      consider: [
        "User roles and permission models",
        "Primary workflow requirements for launch",
        "Legacy databases or external APIs to connect",
      ],
      nextTitle: "Next step",
      next: "Tell us about the tool or product you want to build. We will outline the optimal technical roadmap.",
      faqs: [],
    },
  },
  ecommerce: {
    keyword: "ecommerce desarrollo web",
    secondary: ["tienda online", "checkout", "catálogo web"],
    es: {
      metaTitle: "Comercio Electrónico y Tiendas Online | Invends",
      metaDescription:
        "Desarrollo de tiendas online de alto rendimiento. Experiencia de compra sin fricción, pasarelas de pago locales e internacionales y control total de inventario.",
      h1: "Comercio electrónico y tiendas online",
      lead:
        "Diseñamos y programamos tiendas virtuales con un recorrido de compra ágil y seguro: catálogo claro, proceso de pago rápido y sincronización fluida con tu logística.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Carritos abandonados, fichas de producto confusas y plataformas que colapsan en días de alta demanda. Diseñamos experiencias de compra sin obstáculos para maximizar tus ventas.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Marcas, importadores y negocios minoristas que buscan abrir un nuevo canal digital o migrar de plataformas rígidas a una tienda a medida.",
      methodTitle: "Cómo trabajamos",
      method:
        "Estructuramos la arquitectura del catálogo, diseñamos fichas orientadas a la decisión de compra, integramos pasarelas de pago seguras y probamos cada paso del checkout.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Foco en la velocidad y la confianza: una tienda que carga rápido en el móvil y transmite seguridad genera significativamente más compras recurrentes.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Pasarelas de pago requeridas (Wompi, PayU, Stripe, etc.)",
        "Volumen inicial de catálogo y variantes de producto",
        "Políticas de envío e integraciones con operadores logísticos",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos sobre tus productos y cómo vendes actualmente. Te presentamos una propuesta de tienda virtual optimizada para tu operación.",
      faqs: [],
    },
    en: {
      metaTitle: "E-commerce & Online Stores | Invends",
      metaDescription:
        "High-converting e-commerce web development. Streamlined checkout, reliable payment gateways, and scalable inventory management. Invends.",
      h1: "E-commerce and online storefronts",
      lead:
        "We design and build online stores with frictionless checkout journeys: clean product displays, fast payments, and seamless operations.",
      problemTitle: "What problem it solves",
      problem:
        "High cart abandonment rates and clumsy checkout flows hurt revenue. We build fast, intuitive stores engineered to maximize purchase completion.",
      audienceTitle: "Who it is for",
      audience:
        "Brands and merchants wanting to scale direct-to-consumer sales or transition away from bloated generic store templates.",
      methodTitle: "How we work",
      method:
        "We optimize catalog navigation, design persuasive product pages, integrate secure payment gateways, and rigorously test mobile checkout flows.",
      differenceTitle: "What makes this approach different",
      difference:
        "Speed and mobile conversion prioritized: our e-commerce platforms load instantly, eliminating friction at every step.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Target payment gateways (Stripe, PayPal, local providers)",
        "Product catalog volume and variant complexity",
        "Shipping rules and logistics integrations",
      ],
      nextTitle: "Next step",
      next: "Tell us about your product range and commercial model. We will structure a tailored e-commerce proposal.",
      faqs: [],
    },
  },
  seo: {
    keyword: "SEO agencia Bogotá",
    secondary: ["posicionamiento orgánico", "SEO técnico", "arquitectura de contenido"],
    es: {
      metaTitle: "Posicionamiento Orgánico y SEO Técnico | Invends",
      metaDescription:
        "Estrategia de posicionamiento web en Google. Optimización técnica, arquitectura de contenido y velocidad de carga para atraer clientes con intención real.",
      h1: "Posicionamiento orgánico y SEO técnico",
      lead:
        "Estructuramos tu sitio web para que aparezca frente a clientes potenciales que ya están buscando activamente tus soluciones en Google.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Tener una web que nadie encuentra es una inversión desperdiciada. Corregimos errores de indexación, mejoramos la velocidad y organizamos el contenido para ganar visibilidad sostenible.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas de servicios, consultoras y negocios B2B que quieren captar clientes de forma constante sin depender exclusivamente de pauta publicitaria.",
      methodTitle: "Cómo trabajamos",
      method:
        "Auditamos el estado técnico de tu web, investigamos las intenciones de búsqueda de tu sector, estructuramos el contenido y optimizamos los factores de rastreo e indexación.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "SEO integrado desde el código: no usamos parches superficiales, sino una arquitectura web limpia que los motores de búsqueda entienden y premian de forma natural.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Servicios o líneas de negocio prioritarias para posicionar",
        "Ámbito geográfico de tu mercado (local, nacional o regional)",
        "Acceso a Google Search Console y analítica web actual",
      ],
      nextTitle: "Siguiente paso",
      next: "Indícanos la dirección de tu web y tus metas comerciales. Te compartimos un diagnóstico técnico preliminar y una ruta clara de optimización.",
      faqs: [
        {
          q: "¿Garantizan la primera posición en Google?",
          a: "Ningún profesional serio puede garantizar el puesto número uno debido a los constantes cambios de algoritmos y competencia. Lo que garantizamos es una arquitectura técnica impecable y contenidos de alta relevancia que maximizan tu visibilidad real.",
        },
      ],
    },
    en: {
      metaTitle: "Technical SEO & Organic Growth | Invends",
      metaDescription:
        "Technical SEO and content architecture designed to attract high-intent organic traffic from Google. Fast loading and clean semantic code.",
      h1: "Technical SEO and organic growth",
      lead:
        "We structure your website to rank reliably in front of high-intent searchers looking for exactly what your business provides.",
      problemTitle: "What problem it solves",
      problem:
        "A website invisible to search engines is a missed opportunity. We resolve crawl errors, optimize load performance, and structure semantic content to drive sustainable inbound leads.",
      audienceTitle: "Who it is for",
      audience:
        "B2B service firms, software platforms, and regional businesses looking to build a sustainable pipeline of qualified inbound inquiries.",
      methodTitle: "How we work",
      method:
        "We conduct technical audits, research buyer search intent, craft topical content hierarchies, and implement schema markup for maximum indexation.",
      differenceTitle: "What makes this approach different",
      difference:
        "Engineered into the source code: rather than treating SEO as an afterthought, every page is built with semantic HTML and top Core Web Vitals scores.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Priority service lines and target search terms",
        "Target geography (local, regional, or international)",
        "Access to Google Search Console and existing analytics",
      ],
      nextTitle: "Next step",
      next: "Share your current website URL and growth priorities. We will provide an honest technical review and an actionable roadmap.",
      faqs: [
        {
          q: "Do you guarantee #1 rankings on Google?",
          a: "No credible firm guarantees specific positions due to algorithmic variability. We guarantee clean code, perfect crawlability, and authoritative content structure that delivers measurable visibility growth.",
        },
      ],
    },
  },
  "marketing-digital": {
    keyword: "agencia marketing digital Bogotá",
    secondary: ["marketing digital", "campañas y landing", "estrategia digital"],
    es: {
      metaTitle: "Estrategia Digital y Páginas de Aterrizaje | Invends",
      metaDescription:
        "Conectamos tus campañas de anuncios con páginas de aterrizaje diseñadas para convertir visitas en prospectos calificados y llamadas de venta.",
      h1: "Estrategia digital y páginas de aterrizaje",
      lead:
        "Alineamos tu mensaje publicitario con páginas de llegada precisas. Menos clics desperdiciados y más prospectos interesados en conversar con tu equipo comercial.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Pagar pauta para enviar tráfico a una página de inicio desordenada es quemar presupuesto. Diseñamos puntos de contacto enfocados en una sola acción comercial clara.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas que invierten en Google Ads, Meta o LinkedIn y necesitan maximizar el retorno de su presupuesto con páginas de alta conversión.",
      methodTitle: "Cómo trabajamos",
      method:
        "Analizamos los argumentos de venta más persuasivos, redactamos el mensaje con precisión, construimos landings ultrarrápidas y medimos conversiones reales.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Coherencia total entre anuncio y página: el visitante encuentra exactamente la solución que se le prometió, sin distracciones ni fricción.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Objetivo concreto de la campaña (registro, llamada comercial o compra)",
        "Canales publicitarios previstos",
        "Capacidad de tu equipo para responder a los contactos recibidos",
      ],
      nextTitle: "Siguiente paso",
      next: "Conversemos sobre tus campañas actuales o próximas. Evaluamos cómo optimizar la experiencia para multiplicar tus conversiones.",
      faqs: [],
    },
    en: {
      metaTitle: "Digital Strategy & Landing Pages | Invends",
      metaDescription:
        "High-conversion landing pages and paid traffic alignment. Turn clicks into qualified sales conversations and measurable pipeline growth.",
      h1: "Digital strategy & landing pages",
      lead:
        "We align your ad messaging with focused landing pages designed to turn curious visitors into qualified business inquiries.",
      problemTitle: "What problem it solves",
      problem:
        "Driving paid traffic to a generic homepage burns budget. We engineer high-converting landing pages built around a single, compelling commercial action.",
      audienceTitle: "Who it is for",
      audience:
        "Companies investing in digital advertising that want to maximize return on ad spend through superior conversion rates.",
      methodTitle: "How we work",
      method:
        "We craft persuasive commercial copy, design clean interactive layouts, configure conversion tracking, and test key touchpoints.",
      differenceTitle: "What makes this approach different",
      difference:
        "Zero disconnect between the ad promise and the page delivery: prospects find instant answers to their questions and clear next steps.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Campaign conversion target (inbound lead, call booking, demo)",
        "Active or planned advertising channels",
        "Internal follow-up capacity for new inquiries",
      ],
      nextTitle: "Next step",
      next: "Tell us about your campaign goals. We will help you structure landing pages that convert traffic into conversations.",
      faqs: [],
    },
  },
  "inteligencia-artificial": {
    keyword: "automatización IA empresa",
    secondary: ["IA aplicada", "flujos asistidos", "integración IA"],
    es: {
      metaTitle: "Automatización e Inteligencia Artificial Aplicada | Invends",
      metaDescription:
        "Integramos modelos de inteligencia artificial y automatizaciones en tus operaciones cotidianas para agilizar tareas repetitivas con supervisión humana.",
      h1: "Automatización e inteligencia artificial aplicada",
      lead:
        "Implementamos soluciones prácticas de inteligencia artificial para acelerar procesos internos, clasificar información y asistir a tu equipo en tareas de alto volumen.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Tiempo valioso de tu equipo dedicado a copiar información, redactar respuestas rutinarias o procesar documentos a mano. Aplicamos IA donde genera eficiencia inmediata.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Equipos comerciales, operativos y de soporte que manejan grandes volúmenes de consultas, cotizaciones o datos y buscan elevar su productividad.",
      methodTitle: "Cómo trabajamos",
      method:
        "Identificamos el proceso con mayor potencial de ahorro, configuramos el modelo adecuado, establecemos filtros de calidad y entrenamos a tu equipo en su supervisión.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "IA con criterio práctico: no implementamos modas tecnológicas vacías, sino flujos de trabajo útiles que ahorran horas de trabajo cada semana.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Qué tarea repetitiva consume más tiempo en tu operación",
        "Herramientas y formatos de datos actuales",
        "Quién revisará y validará los resultados del sistema",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos qué proceso de tu empresa te gustaría agilizar. Analizamos la viabilidad técnica y te proponemos un piloto concreto.",
      faqs: [],
    },
    en: {
      metaTitle: "Applied AI & Workflow Automation | Invends",
      metaDescription:
        "Practical artificial intelligence integrations for modern businesses. Automate routine workflows, extract insights, and enhance team velocity.",
      h1: "Applied AI and workflow automation",
      lead:
        "We implement practical AI solutions to streamline business operations, summarize complex data, and empower your team to work faster.",
      problemTitle: "What problem it solves",
      problem:
        "Valuable team hours wasted on repetitive data entry, manual document processing, and routine communications. We automate high-friction workflows.",
      audienceTitle: "Who it is for",
      audience:
        "Operations, sales, and support teams handling repetitive tasks who need reliable automation with human oversight.",
      methodTitle: "How we work",
      method:
        "We pinpoint high-impact bottlenecks, integrate proven LLMs into your existing software ecosystem, and establish quality control safeguards.",
      differenceTitle: "What makes this approach different",
      difference:
        "Grounded in commercial utility: we skip generative gimmicks to deliver reliable, auditable automations that yield tangible time savings.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Repetitive tasks absorbing the most team hours",
        "Data privacy requirements and internal software stacks",
        "Review protocols for automated outputs",
      ],
      nextTitle: "Next step",
      next: "Describe the operational bottleneck you would like to solve. We will assess technical feasibility and propose a focused pilot.",
      faqs: [],
    },
  },
  automatizacion: {
    keyword: "automatización de procesos empresariales",
    secondary: ["automatización digital", "integraciones", "flujos de trabajo"],
    es: {
      metaTitle: "Automatización de Procesos y Flujos de Trabajo | Invends",
      metaDescription:
        "Conectamos tus sistemas y herramientas para sincronizar información en tiempo real, eliminar errores manuales y acelerar la atención a clientes.",
      h1: "Automatización de flujos y procesos de negocio",
      lead:
        "Conectamos tus aplicaciones comerciales, CRM y bases de datos para que los datos fluyan de forma automática y tu equipo se concentre en lo importante.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Datos duplicados en hojas de cálculo, demoras en el envío de cotizaciones y pérdida de prospectos por falta de seguimiento ágil. Conectamos tus herramientas para que trabajen en sincronía.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas en crecimiento cuya operación depende de múltiples plataformas desconectadas y necesitan ordenar sus flujos de trabajo.",
      methodTitle: "Cómo trabajamos",
      method:
        "Mapeamos cada paso del proceso, diseñamos las automatizaciones mediante webhooks y APIs, configuramos alertas de control y realizamos pruebas de extremo a extremo.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Arquitectura confiable: diseñamos flujos con registro de errores y notificaciones transparentes para que nunca pierdas el control de tu operación.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Plataformas activas (HubSpot, Notion, Slack, ERPs, correo)",
        "Frecuencia y volumen diario del proceso a automatizar",
        "Responsable interno de validar la información",
      ],
      nextTitle: "Siguiente paso",
      next: "Indícanos qué plataformas usas y qué proceso quieres conectar. Te presentamos una propuesta de integración técnica directa.",
      faqs: [],
    },
    en: {
      metaTitle: "Business Process Automation & Integrations | Invends",
      metaDescription:
        "Connect your software ecosystem with robust API integrations. Eliminate manual errors, sync real-time data, and accelerate operational speed.",
      h1: "Business process automation & integrations",
      lead:
        "We connect your software tools, CRM, and databases to synchronize data automatically and eliminate manual operational bottlenecks.",
      problemTitle: "What problem it solves",
      problem:
        "Time lost copying data across disconnected spreadsheets and platforms. We build seamless integrations that keep your systems synchronized.",
      audienceTitle: "Who it is for",
      audience:
        "Growing companies managing multi-tool operations that need clean, automated workflows without manual re-entry.",
      methodTitle: "How we work",
      method:
        "We map process touchpoints, engineer API/webhook pipelines, implement error logging, and test edge cases thoroughly.",
      differenceTitle: "What makes this approach different",
      difference:
        "Reliability and transparency: our workflows include built-in monitoring and fallback alerts so your team remains in complete control.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Active platforms to connect (CRM, ERP, payment, email)",
        "Daily volume and triggering conditions",
        "Internal owner responsible for workflow validation",
      ],
      nextTitle: "Next step",
      next: "Tell us which tools you want to integrate. We will prepare an actionable architecture roadmap.",
      faqs: [],
    },
  },
  "migracion-legacy": {
    keyword: "migración web legacy",
    secondary: ["refactorización", "modernización de sistemas", "migración sin downtime"],
    es: {
      metaTitle: "Modernización y Migración Tecnológica | Invends",
      metaDescription:
        "Actualizamos sistemas y páginas web obsoletas hacia tecnologías modernas y seguras, sin interrumpir tu operación comercial ni perder posicionamiento SEO.",
      h1: "Modernización y migración tecnológica",
      lead:
        "Renovamos plataformas antiguas hacia arquitecturas modernas y rápidas. Cero caídas de servicio, preservación de datos y continuidad comercial garantizada.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Sistemas antiguos difíciles de mantener, vulnerables a fallas de seguridad y lentos para adaptarse a nuevos requerimientos del negocio. Modernizamos tu base técnica con orden.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Empresas con plataformas existentes que han alcanzado su límite técnico y necesitan actualizarse sin arriesgar su operación diaria.",
      methodTitle: "Cómo trabajamos",
      method:
        "Auditamos el sistema actual, planificamos la migración por fases controladas, reescribimos el código crítico y realizamos el despliegue con respaldo total.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Cero tiempo de inactividad y protección de tu SEO: migramos manteniendo tus enlaces, tu historial y la confianza de tus usuarios.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Acceso al código fuente, bases de datos y servidores actuales",
        "Procesos críticos que no pueden detenerse",
        "Plazos y ventanas de mantenimiento programadas",
      ],
      nextTitle: "Siguiente paso",
      next: "Conversemos sobre el estado técnico de tu plataforma actual. Analizamos los riesgos y te presentamos un plan de modernización seguro.",
      faqs: [],
    },
    en: {
      metaTitle: "Legacy Modernization & Web Migration | Invends",
      metaDescription:
        "Seamless migration of legacy websites and software to modern, secure frameworks with zero downtime and preserved SEO authority.",
      h1: "Legacy modernization & web migration",
      lead:
        "We upgrade outdated web systems into modern, high-speed architectures with zero downtime and complete data integrity.",
      problemTitle: "What problem it solves",
      problem:
        "Fragile legacy systems that are slow, insecure, and expensive to maintain. We modernize your digital infrastructure step by step.",
      audienceTitle: "Who it is for",
      audience:
        "Established organizations whose existing digital platforms have hit performance limits and need a secure evolutionary path.",
      methodTitle: "How we work",
      method:
        "We audit dependencies, plan phased incremental cutovers, modernize codebases, and test migrations in isolated staging environments.",
      differenceTitle: "What makes this approach different",
      difference:
        "Business continuity first: we safeguard existing SEO rankings, customer data, and operational uptime during every transition.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Access to current source repositories and server hosting",
        "Mission-critical workflows that must not be disrupted",
        "Preferred deployment and cutover windows",
      ],
      nextTitle: "Next step",
      next: "Share your current platform challenges. We will prepare an incremental modernization strategy.",
      faqs: [],
    },
  },
  "mvp-rapido": {
    keyword: "MVP desarrollo rápido",
    secondary: ["MVP usable", "prototipo en producción", "MaaS"],
    es: {
      metaTitle: "Desarrollo Ágil de MVPs y Nuevos Productos | Invends",
      metaDescription:
        "Construimos productos mínimos viables funcionales en semanas. Valida tu modelo de negocio con usuarios reales y tecnología lista para escalar.",
      h1: "Desarrollo ágil de MVPs y nuevos productos",
      lead:
        "Convertimos tu idea en un producto digital funcional listo para probar con clientes reales en semanas, no en meses. Alcance enfocado en validar valor comercial.",
      problemTitle: "Qué problema resuelve",
      problem:
        "Pasar meses desarrollando funcionalidades que el mercado quizás no necesita. Te ayudamos a lanzar la versión esencial que genera aprendizaje y tracción inmediata.",
      audienceTitle: "A quién está dirigido",
      audience:
        "Emprendedores, startups y empresas innovadoras que necesitan validar una nueva línea de producto digital con rapidez y rigor.",
      methodTitle: "Cómo trabajamos",
      method:
        "Priorizamos el flujo principal que demuestra la propuesta de valor, programamos con componentes reutilizables y publicamos en infraestructura lista para recibir usuarios.",
      differenceTitle: "Qué diferencia este enfoque",
      difference:
        "Calidad técnica desde el día uno: un MVP no es un prototipo desechable, sino una base sólida sobre la cual seguir construyendo.",
      considerTitle: "Puntos clave al iniciar",
      consider: [
        "Hipótesis principal que quieres validar con el mercado",
        "Perfil del primer grupo de usuarios o clientes de prueba",
        "Funcionalidad única imprescindible para el lanzamiento",
      ],
      nextTitle: "Siguiente paso",
      next: "Cuéntanos sobre tu idea o proyecto. Te ayudamos a definir el alcance más eficiente para salir al mercado rápidamente.",
      faqs: [],
    },
    en: {
      metaTitle: "Agile MVP Development & Fast Product Launches | Invends",
      metaDescription:
        "Ship functional minimum viable products in weeks. Validate your market hypothesis with real users and production-ready code.",
      h1: "Agile MVP development & fast launches",
      lead:
        "We turn your vision into a production-ready digital product in weeks. Focused scope engineered to validate real market demand quickly.",
      problemTitle: "What problem it solves",
      problem:
        "Spending months building speculative features before knowing if customers will buy. We help you launch the critical core experience to validate demand fast.",
      audienceTitle: "Who it is for",
      audience:
        "Founders, innovation teams, and companies launching new digital initiatives that require rapid market validation.",
      methodTitle: "How we work",
      method:
        "We isolate the core value flow, build with modern modular frameworks, and launch with reliable monitoring and analytics.",
      differenceTitle: "What makes this approach different",
      difference:
        "Built to scale, not throw away: clean architecture that lets you iterate and expand without having to rewrite from scratch.",
      considerTitle: "Key factors to clarify",
      consider: [
        "Core value hypothesis to validate with initial users",
        "Target early-adopter user segment",
        "The single non-negotiable feature for version one",
      ],
      nextTitle: "Next step",
      next: "Tell us about your product concept. We will help define the leanest path to production.",
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
          includesTitle: "Deliverables & Scope",
          relatedTitle: "Related Capabilities",
          breadcrumbServices: "Services",
          faqTitle: "Frequently Asked Questions",
          cta: "Discuss this service with us",
        }
      : {
          includesTitle: "Entregables concretos",
          relatedTitle: "Capacidades relacionadas",
          breadcrumbServices: "Servicios",
          faqTitle: "Preguntas frecuentes",
          cta: "Hablemos de este servicio",
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
