import type { Locale } from "~/composables/useLocale";
import type { ServiceCategory } from "~/utils/trespiData";
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
    { to: "/sobre-nosotros", label: "Nosotros" },
    { to: "/servicios", label: "Soluciones" },
    { to: "/portafolio", label: "Proyectos" },
    { to: "/blog", label: "Blog" },
    { to: "/contacto", label: "Contacto" },
  ],
  en: [
    { to: "/en", label: "Home" },
    { to: "/en/sobre-nosotros", label: "About" },
    { to: "/en/servicios", label: "Solutions" },
    { to: "/en/portafolio", label: "Work" },
    { to: "/en/blog", label: "Blog" },
    { to: "/en/contacto", label: "Contact" },
  ],
} as const;

export const UI = {
  es: {
    cookies: "Este sitio usa cookies.",
    cookiesMore: "Más información.",
    cookiesAccept: "ACEPTAR",
    footerCta: "Hablemos de tu proyecto",
    footerLocation: "Ubicación",
    footerPhone: "Teléfono",
    footerFollow: "Follow us",
    footerPolicy: "Política de Tratamiento de Datos",
    footerTop: "top ↑",
    skip: "Saltar al contenido",
  },
  en: {
    cookies: "This site uses cookies.",
    cookiesMore: "Learn more.",
    cookiesAccept: "ACCEPT",
    footerCta: "Let's talk about your project",
    footerLocation: "Location",
    footerPhone: "Phone",
    footerFollow: "Follow us",
    footerPolicy: "Personal Data Policy",
    footerTop: "top ↑",
    skip: "Skip to content",
  },
} as const;

export const HOME = {
  es: {
    metaTitle: "Invends",
    metaDescription: `${BRAND_HERO_TITLE} ${BRAND_TAGLINE}. ${BRAND_HERO_SUPPORT}`,
    brandTagline: BRAND_TAGLINE,
    heroTitle: BRAND_HERO_TITLE,
    heroSupport: BRAND_HERO_SUPPORT,
    heroServices: ["Diseño web", "Desarrollo", "Marketing digital"] as const,
    ctaPrimary: "Hablar con Invends",
    ctaSecondary: "Ver nuestros servicios",
    stripLabel: "Servicios de Invends",
    reelIntroTitle: "Cuéntanos qué quieres lograr.",
    reelIntroAccent: "",
    reelIntroBody:
      "A quién te diriges, qué problema tienes y qué resultado buscas. Con eso armamos un alcance concreto en diseño, desarrollo y marketing.",
    reelIntroCta: "Cuéntanos el objetivo",
    reelCta: "Ver líneas de servicio",
    methodTitle: "Cómo trabajamos:",
    methodAccent: "claridad, oficio y entrega",
    readMore: "Leer completo",
    readLess: "Ver menos",
    projectsTitle: "Ideas que se convierten en",
    projectsAccent: "experiencias reales",
    projectsBody:
      "Muestras conceptuales de método: diseño, desarrollo y marketing alineados. No son casos de cliente publicados.",
    projectsLink: "Ver todas las muestras",
    formTitle: "Cuéntanos el objetivo. Te respondemos con alcance.",
    formDescription:
      "Si ya tienes claro el problema —o solo la intuición— este es el lugar para empezar. Respondemos con alcance, no con una plantilla.",
  },
  en: {
    metaTitle: "Invends",
    metaDescription: `${BRAND_HERO_TITLE_EN} ${BRAND_TAGLINE_EN}. ${BRAND_HERO_SUPPORT_EN}`,
    brandTagline: BRAND_TAGLINE_EN,
    heroTitle: BRAND_HERO_TITLE_EN,
    heroSupport: BRAND_HERO_SUPPORT_EN,
    heroServices: ["Web design", "Development", "Digital marketing"] as const,
    ctaPrimary: "Talk to Invends",
    ctaSecondary: "See our services",
    stripLabel: "Invends services",
    reelIntroTitle: "Tell us what you want to achieve.",
    reelIntroAccent: "",
    reelIntroBody:
      "Who you’re talking to, what problem you have, and what result you’re after. With that we put together a clear scope in design, development and marketing.",
    reelIntroCta: "Tell us the goal",
    reelCta: "See service lines",
    methodTitle: "How we work:",
    methodAccent: "clarity, craft and delivery",
    readMore: "Read more",
    readLess: "Show less",
    projectsTitle: "Ideas that become",
    projectsAccent: "real experiences",
    projectsBody:
      "Conceptual method samples: design, development and marketing aligned. These are not published client case studies.",
    projectsLink: "See all samples",
    formTitle: "Tell us the goal. We’ll reply with clear scope.",
    formDescription:
      "Whether the problem is clear—or only an intuition—this is where to start. We reply with scope, not a template.",
  },
} as const;

export const HOME_STRIP = {
  es: [
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
  ],
  en: [
    { name: "Web design", years: "UI / UX" },
    { name: "Branding", years: "Identity" },
    { name: "Web development", years: "Sites" },
    { name: "Applications", years: "Product" },
    { name: "E-commerce", years: "Store" },
    { name: "SEO", years: "Visibility" },
    { name: "Marketing", years: "Campaigns" },
    { name: "AI", years: "Assisted flows" },
    { name: "Automation", years: "Processes" },
    { name: "Migration", years: "Legacy" },
    { name: "MVP", years: "MaaS" },
  ],
} as const;

export const HOME_METHODS = {
  es: [
    {
      id: 1,
      name: "Claridad primero",
      role: "Método · Invends",
      quote:
        "Abrimos con el objetivo comercial y el brief. Sin eso, diseñar o desarrollar es adivinar. Preferimos una conversación concreta antes que una propuesta genérica.",
    },
    {
      id: 2,
      name: "Oficio en la entrega",
      role: "Método · Invends",
      quote:
        "Cada pieza sale con criterio de uso: tipografía, código o campaña. Revisamos lo que se ve y lo que se sostiene cuando llega tráfico real.",
    },
    {
      id: 3,
      name: "Alcance que se puede cumplir",
      role: "Método · Invends",
      quote:
        "Definimos qué entra en esta fase, qué queda fuera y cómo se mide el siguiente paso. Menos promesas abiertas; más entregables con fecha.",
    },
  ],
  en: [
    {
      id: 1,
      name: "Clarity first",
      role: "Method · Invends",
      quote:
        "We open with the commercial goal and the brief. Without that, design or development is guessing. We prefer a concrete conversation over a generic proposal.",
    },
    {
      id: 2,
      name: "Craft in delivery",
      role: "Method · Invends",
      quote:
        "Every piece ships with a use criterion: type, code or campaign. We review what is seen and what holds when real traffic arrives.",
    },
    {
      id: 3,
      name: "Scope you can keep",
      role: "Method · Invends",
      quote:
        "We define what is in this phase, what is out, and how the next step is measured. Fewer open promises; more dated deliverables.",
    },
  ],
} as const;

export const HOME_PILLARS_I18N: Record<Locale, ServiceCategory[]> = {
  es: [
    {
      id: "oficio-diseno",
      anchor: "oficio-diseno",
      title: "Diseño",
      headline: "Cada pantalla responde a una decisión.",
      number: "01",
      intro: "Diseño con criterio de negocio.",
      response:
        "Antes de abrir Figma: a quién hablas, qué debe entender y qué acción esperas. Si no acerca al objetivo, sobra.",
      image: "/images/principle-diseno.webp",
      imageAlt: "Estudio de diseño gráfico con materiales de dirección de arte",
      items: [
        {
          title: "Jerarquía",
          description: "Qué se lee primero · Qué se ignora · Ritmo de la página",
        },
        {
          title: "Sistema",
          description: "Componentes · Tipografía · Consistencia entre vistas",
        },
        {
          title: "Prueba",
          description: "Prototipo usable · Revisión con el brief · Ajustes medibles",
        },
      ],
    },
    {
      id: "oficio-desarrollo",
      anchor: "oficio-desarrollo",
      title: "Desarrollo",
      headline: "Que se sostenga el día en que llega gente.",
      number: "02",
      intro: "Desarrollo para uso real.",
      response:
        "Velocidad, acceso y una base que se pueda cambiar sin reescribirlo todo. La experiencia también es código.",
      image: "/images/principle-desarrollo.webp",
      imageAlt:
        "Escritorio editorial de producto digital: portátil, teléfono y cuaderno sobre superficie oscura",
      items: [
        { title: "Base", description: "Arquitectura · Contenido · Despliegue" },
        { title: "Rendimiento", description: "Peso · Render · Accesibilidad" },
        {
          title: "Evolución",
          description: "Integraciones · Mantenimiento · Cambios sin drama",
        },
      ],
    },
    {
      id: "oficio-marketing",
      anchor: "oficio-marketing",
      title: "Marketing",
      headline: "Llegar a quien importa, con un siguiente paso claro.",
      number: "03",
      intro: "Marketing con mensaje concreto.",
      response:
        "Canal, mensaje y página alineados. Preferimos contenidos útiles y una acción evidente antes que ruido.",
      image: "/images/principle-marketing.webp",
      imageAlt:
        "Flat lay de planificación de campaña: notas, portátil y materiales creativos",
      items: [
        {
          title: "Mensaje",
          description: "Promesa · Objeciones · Tono de marca",
        },
        {
          title: "Canal",
          description: "Dónde aparece · Con qué ritmo · Qué mide el éxito",
        },
        {
          title: "Continuidad",
          description: "Del anuncio a la página y al contacto, sin fricción",
        },
      ],
    },
  ],
  en: [
    {
      id: "oficio-diseno",
      anchor: "oficio-diseno",
      title: "Design",
      headline: "Every screen answers a decision.",
      number: "01",
      intro: "Design with business judgment.",
      response:
        "Before opening Figma: who you speak to, what they must understand, and which action you expect. If it doesn’t move the goal, it goes.",
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
      headline: "Built to hold the day traffic arrives.",
      number: "02",
      intro: "Development for real use.",
      response:
        "Speed, access and a base you can change without rewriting everything. Experience is also code.",
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
      headline: "Reach who matters, with a clear next step.",
      number: "03",
      intro: "Marketing with a concrete message.",
      response:
        "Channel, message and page aligned. We prefer useful content and an obvious action over noise.",
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
