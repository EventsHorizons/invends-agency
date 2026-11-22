import type { Locale } from "~/composables/useLocale";
import type { ServiceCategory } from "~/utils/siteData";
import {
  BRAND_HERO_SUPPORT,
  BRAND_HERO_SUPPORT_EN,
  BRAND_HERO_TITLE,
  BRAND_HERO_TITLE_EN,
  BRAND_TAGLINE,
  BRAND_TAGLINE_EN,
} from "~/utils/brand";

export const NAV = {
  es: [
    { to: "/", label: "Inicio" },
    { to: "/sobre-nosotros", label: "Estudio" },
    { to: "/servicios", label: "Servicios" },
    { to: "/portafolio", label: "Trabajos" },
    { to: "/blog", label: "Blog" },
    { to: "/contacto", label: "Contacto" },
  ],
  en: [
    { to: "/en", label: "Home" },
    { to: "/en/sobre-nosotros", label: "Studio" },
    { to: "/en/servicios", label: "Services" },
    { to: "/en/portafolio", label: "Work" },
    { to: "/en/blog", label: "Blog" },
    { to: "/en/contacto", label: "Contact" },
  ],
} as const;

export const UI = {
  es: {
    cookies: "Usamos cookies básicas para que el sitio funcione con rapidez y recuerde tus preferencias.",
    cookiesMore: "Más información.",
    cookiesAccept: "De acuerdo",
    footerCta: "Construyamos una web a la altura de tu empresa.",
    footerLocation: "Ubicación",
    footerPhone: "Teléfono",
    footerFollow: "Síguenos",
    footerPolicy: "Tratamiento de Datos Personales",
    footerTop: "Volver arriba ↑",
    skip: "Saltar al contenido",
  },
  en: {
    cookies: "We use essential cookies to ensure fast performance and remember your settings.",
    cookiesMore: "Learn more.",
    cookiesAccept: "Agreed",
    footerCta: "Let's build a digital presence worthy of your company.",
    footerLocation: "Location",
    footerPhone: "Phone",
    footerFollow: "Follow us",
    footerPolicy: "Personal Data Processing Policy",
    footerTop: "Back to top ↑",
    skip: "Skip to content",
  },
} as const;

export const HOME = {
  es: {
    metaTitle:
      "Invends — Estudio de Diseño Web y Tecnología",
    metaDescription: `${BRAND_HERO_TITLE} ${BRAND_TAGLINE} ${BRAND_HERO_SUPPORT}`,
    brandTagline: BRAND_TAGLINE,
    heroTitle: BRAND_HERO_TITLE,
    heroSupport: BRAND_HERO_SUPPORT,
    heroServices: ["Diseño Web & UI", "Desarrollo Nuxt", "Mensaje Comercial"] as const,
    ctaPrimary: "Hablemos de tu web",
    ctaSecondary: "Ver trabajos recientes",
    stripLabel: "Especialidades del estudio",
    reelIntroTitle: "Cómo encaramos cada proyecto:",
    reelIntroAccent: "Con orden y criterio de negocio",
    reelIntroBody:
      "Antes de diseñar la primera pantalla, entendemos cómo vende tu empresa y qué dudas frenan a tus clientes. Construimos sobre certezas, con plazos definidos y sin improvisación.",
    reelIntroCta: "Conocer el proceso de trabajo",
    reelCta: "Ver especialidades",
    methodTitle: "Tres compromisos",
    methodAccent: "en cada proyecto",
    readMore: "Leer más",
    readLess: "Ver menos",
    projectsTitle: "Trabajo seleccionado",
    projectsAccent: "del estudio",
    projectsBody:
      "Una muestra de nuestro estándar en dirección de arte, arquitectura web y redacción comercial aplicada a diferentes industrias.",
    projectsLink: "Ver todos los trabajos",
    formTitle: "Cuéntanos de tu proyecto.",
    formDescription:
      "Déjanos tus datos y te contactaremos en menos de 24 horas para coordinar una primera llamada.",
  },
  en: {
    metaTitle:
      "Invends — Web Design & Engineering Studio",
    metaDescription: `${BRAND_HERO_TITLE_EN} ${BRAND_TAGLINE_EN} ${BRAND_HERO_SUPPORT_EN}`,
    brandTagline: BRAND_TAGLINE_EN,
    heroTitle: BRAND_HERO_TITLE_EN,
    heroSupport: BRAND_HERO_SUPPORT_EN,
    heroServices: ["Web & UI Design", "Nuxt Engineering", "Commercial Messaging"] as const,
    ctaPrimary: "Let's talk about your site",
    ctaSecondary: "View recent work",
    stripLabel: "Studio disciplines",
    reelIntroTitle: "How we approach each build:",
    reelIntroAccent: "With commercial judgment and rigor",
    reelIntroBody:
      "Before designing the first screen, we understand how your business sells and what holds your clients back. We build with certainty, strict timelines, and zero guesswork.",
    reelIntroCta: "Explore our process",
    reelCta: "View disciplines",
    methodTitle: "Three commitments",
    methodAccent: "on every project",
    readMore: "Read more",
    readLess: "Show less",
    projectsTitle: "Selected work",
    projectsAccent: "from the studio",
    projectsBody:
      "A curation of our standard in art direction, web engineering, and commercial narrative across industries.",
    projectsLink: "View all work",
    formTitle: "Tell us about your project.",
    formDescription:
      "Share your details. We will reach out in under 24 hours to schedule an introductory call.",
  },
} as const;

export const HOME_STRIP = {
  es: [
    { name: "Diseño Web", years: "Dirección de arte & UI" },
    { name: "Desarrollo Nuxt", years: "Sitios ultra-rápidos" },
    { name: "Identidad Visual", years: "Sistemas de marca" },
    { name: "E-commerce", years: "Tiendas sin fricción" },
    { name: "Redacción Comercial", years: "Mensaje & conversión" },
    { name: "SEO Técnico", years: "Posicionamiento Google" },
    { name: "Portales & Apps", years: "Herramientas a medida" },
    { name: "Automatización", years: "Conexión CRM & datos" },
  ],
  en: [
    { name: "Web Design", years: "Art Direction & UI" },
    { name: "Nuxt Development", years: "Sub-second speed" },
    { name: "Visual Identity", years: "Brand Systems" },
    { name: "E-commerce", years: "Frictionless checkout" },
    { name: "Commercial Copy", years: "Messaging & conversion" },
    { name: "Technical SEO", years: "Search visibility" },
    { name: "Web Apps & Portals", years: "Custom digital tools" },
    { name: "Automation", years: "CRM & data workflows" },
  ],
} as const;

export const HOME_METHODS = {
  es: [
    {
      id: 1,
      name: "01 · Estrategia comercial previa",
      role: "Diagnóstico",
      quote:
        "No abrimos Figma sin entender cómo gana dinero tu empresa y qué busca la persona que te contrata. El diseño debe servir a tus metas, no a nuestro ego visual.",
    },
    {
      id: 2,
      name: "02 · Oficio técnico sin atajos",
      role: "Ejecución",
      quote:
        "Cuidamos los detalles que no se ven pero se sienten: la velocidad de carga, la nitidez tipográfica y la adaptabilidad perfecta en pantallas móviles.",
    },
    {
      id: 3,
      name: "03 · Claridad en tiempos y costos",
      role: "Entrega",
      quote:
        "Trabajamos con cronogramas cerrados y entregas periódicas. Al terminar, la plataforma y todos sus archivos te pertenecen al 100%.",
    },
  ],
  en: [
    {
      id: 1,
      name: "01 · Business clarity upfront",
      role: "Diagnosis",
      quote:
        "We never open Figma until we understand how your company sells and what your buyer needs. Design serves your business goals, not our visual ego.",
    },
    {
      id: 2,
      name: "02 · Uncompromising craft",
      role: "Execution",
      quote:
        "We obsess over invisible details: instantaneous load times, typographic precision, and seamless mobile ergonomics.",
    },
    {
      id: 3,
      name: "03 · Transparent timelines & fees",
      role: "Delivery",
      quote:
        "Fixed milestones and clear deliverables. Once shipped, the platform and source code belong 100% to your company.",
    },
  ],
} as const;

export const HOME_PILLARS_I18N: Record<Locale, ServiceCategory[]> = {
  es: [
    {
      id: "oficio-diseno",
      anchor: "oficio-diseno",
      title: "Diseño Web",
      headline: "Diseño de interfaz que guía al visitante.",
      number: "01",
      intro: "La estética importa, pero la claridad define si una visita se convierte en cliente.",
      response:
        "Diseñamos pensando en la persona que navega desde el teléfono: tipografía con excelente lectura, información jerarquizada y llamados a la acción visibles en el momento oportuno.",
      image: "/images/principle-diseno.webp",
      imageAlt: "Estudio de diseño gráfico con materiales de dirección de arte",
      items: [
        {
          title: "Jerarquía visual",
          description: "El usuario entiende en segundos qué ofrece tu empresa y cómo dar el siguiente paso.",
        },
        {
          title: "Sistemas en Figma",
          description: "Componentes organizados y reutilizables para que la marca se mantenga consistente.",
        },
        {
          title: "Prototipos interactivos",
          description: "Navegamos la web completa antes de programar para validar la experiencia real.",
        },
      ],
    },
    {
      id: "oficio-desarrollo",
      anchor: "oficio-desarrollo",
      title: "Desarrollo",
      headline: "Ingeniería limpia que carga en menos de un segundo.",
      number: "02",
      intro: "Una página lenta o inestable le cuesta dinero a tu empresa todos los días.",
      response:
        "Construimos sitios sobre tecnologías modernas como Nuxt y Vue. Prescindimos de constructores pesados y plugins obsoletos para garantizar estabilidad, seguridad y el mejor puntaje en Google.",
      image: "/images/principle-desarrollo.webp",
      imageAlt:
        "Escritorio editorial de producto digital: portátil, teléfono y cuaderno sobre superficie oscura",
      items: [
        { title: "Velocidad real", description: "Tiempos de respuesta inmediatos que retienen a los visitantes en móvil y escritorio." },
        { title: "Autonomía total", description: "Paneles de administración amables para que tu equipo actualice textos y productos sin depender de nosotros." },
        {
          title: "Código limpio",
          description: "Arquitectura sólida que permite integrar tu CRM, pasarelas de pago y analítica sin complicaciones.",
        },
      ],
    },
    {
      id: "oficio-marketing",
      anchor: "oficio-marketing",
      title: "Mensaje Comercial",
      headline: "Textos que explican tu propuesta sin rodeos.",
      number: "03",
      intro: "El mejor diseño no compensa una redacción confusa o genérica.",
      response:
        "Redactamos los textos de tu sitio web con un tono seguro, empático y directo. Respondemos las dudas de tu cliente antes de que las pregunte y construimos credibilidad en cada párrafo.",
      image: "/images/principle-marketing.webp",
      imageAlt:
        "Flat lay de planificación de campaña: notas, portátil y materiales creativos",
      items: [
        {
          title: "Voz propia",
          description: "Una identidad verbal coherente que te distingue de competidores que suenan todos igual.",
        },
        {
          title: "Argumentos de valor",
          description: "Foco en resolver problemas reales del cliente, no en alardear de características técnicas.",
        },
        {
          title: "Continuidad comercial",
          description: "Coherencia absoluta entre lo que prometes en un anuncio o propuesta y lo que el cliente lee en la web.",
        },
      ],
    },
  ],
  en: [
    {
      id: "oficio-diseno",
      anchor: "oficio-diseno",
      title: "Design",
      headline: "Screen with intent.",
      number: "01",
      intro: "Design for the visitor.",
      response:
        "Who you speak to and what they should understand. If it doesn’t serve the goal, it’s out.",
      image: "/images/principle-diseno.webp",
      imageAlt: "Graphic design studio with art-direction materials",
      items: [
        {
          title: "Hierarchy",
          description: "What is read first · What is ignored · Page rhythm",
        },
        {
          title: "System",
          description: "Components · Typography · Consistency across views",
        },
        {
          title: "Proof",
          description: "Usable prototype · Brief review · Measurable adjustments",
        },
      ],
    },
    {
      id: "oficio-desarrollo",
      anchor: "oficio-desarrollo",
      title: "Development",
      headline: "A base that holds.",
      number: "02",
      intro: "Development for real use.",
      response:
        "Quick and trustworthy when people arrive. Code is part of the experience.",
      image: "/images/principle-desarrollo.webp",
      imageAlt:
        "Digital product desk: laptop, phone and notebook on a dark surface",
      items: [
        { title: "Foundation", description: "Architecture · Content · Deploy" },
        { title: "Performance", description: "Weight · Render · Accessibility" },
        {
          title: "Evolution",
          description: "Integrations · Maintenance · Change without drama",
        },
      ],
    },
    {
      id: "oficio-marketing",
      anchor: "oficio-marketing",
      title: "Marketing",
      headline: "Message with a destination.",
      number: "03",
      intro: "Marketing with continuity.",
      response:
        "Ad and page aligned. Useful conversation over posting for its own sake.",
      image: "/images/principle-marketing.webp",
      imageAlt: "Campaign planning flat lay: notes, laptop and creative materials",
      items: [
        {
          title: "Message",
          description: "Promise · Objections · Brand tone",
        },
        {
          title: "Channel",
          description: "Where it appears · At what pace · What success measures",
        },
        {
          title: "Continuity",
          description: "From ad to page to contact, without friction",
        },
      ],
    },
  ],
};

export function t<T extends Record<Locale, unknown>>(table: T, locale: Locale): T[Locale] {
  return table[locale];
}
