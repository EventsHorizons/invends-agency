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
    { to: "/sobre-nosotros", label: "Nosotros" },
    { to: "/servicios", label: "Servicios" },
    { to: "/portafolio", label: "Proyectos" },
    { to: "/blog", label: "Blog" },
    { to: "/contacto", label: "Contacto" },
  ],
  en: [
    { to: "/en", label: "Home" },
    { to: "/en/sobre-nosotros", label: "About" },
    { to: "/en/servicios", label: "Services" },
    { to: "/en/portafolio", label: "Work" },
    { to: "/en/blog", label: "Blog" },
    { to: "/en/contacto", label: "Contact" },
  ],
} as const;

export const UI = {
  es: {
    cookies: "Este sitio usa cookies para funcionar bien.",
    cookiesMore: "Más información.",
    cookiesAccept: "ACEPTAR",
    footerCta: "Empezar proyecto",
    footerLocation: "Ubicación",
    footerPhone: "Teléfono",
    footerFollow: "Síguenos",
    footerPolicy: "Política de Tratamiento de Datos",
    footerTop: "arriba ↑",
    skip: "Saltar al contenido",
  },
  en: {
    cookies: "This site uses cookies to work properly.",
    cookiesMore: "Learn more.",
    cookiesAccept: "ACCEPT",
    footerCta: "Start a project",
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
    metaTitle:
      "Invends — Agencia de diseño web, desarrollo y marketing en Bogotá",
    metaDescription: `${BRAND_HERO_TITLE} ${BRAND_TAGLINE} ${BRAND_HERO_SUPPORT}`,
    brandTagline: BRAND_TAGLINE,
    heroTitle: BRAND_HERO_TITLE,
    heroSupport: BRAND_HERO_SUPPORT,
    heroServices: ["Diseño web", "Desarrollo", "Marketing digital"] as const,
    ctaPrimary: "Empezar proyecto",
    ctaSecondary: "Ver servicios",
    stripLabel: "Oficios",
    reelIntroTitle: "Alcance primero.",
    reelIntroAccent: "Después, el trabajo",
    reelIntroBody:
      "Nos cuentas el objetivo. Respondemos con fases, oficios y límites claros —para construir con criterio.",
    reelIntroCta: "Hablar del proyecto",
    reelCta: "Ver servicios",
    methodTitle: "Método",
    methodAccent: "Aclarar. Construir. Entregar",
    readMore: "Leer más",
    readLess: "Ver menos",
    projectsTitle: "Muestras de",
    projectsAccent: "método",
    projectsBody:
      "Piezas conceptuales de diseño, desarrollo y marketing. No son casos de cliente.",
    projectsLink: "Ver muestras",
    formTitle: "Cuéntanos tu idea.",
    formDescription:
      "Respondemos con alcance: qué entra, en qué orden y qué espera cada fase.",
  },
  en: {
    metaTitle:
      "Invends — Web design, development & marketing agency in Bogotá",
    metaDescription: `${BRAND_HERO_TITLE_EN} ${BRAND_TAGLINE_EN} ${BRAND_HERO_SUPPORT_EN}`,
    brandTagline: BRAND_TAGLINE_EN,
    heroTitle: BRAND_HERO_TITLE_EN,
    heroSupport: BRAND_HERO_SUPPORT_EN,
    heroServices: ["Web design", "Development", "Digital marketing"] as const,
    ctaPrimary: "Start a project",
    ctaSecondary: "See services",
    stripLabel: "Crafts",
    reelIntroTitle: "Scope first.",
    reelIntroAccent: "Then the work",
    reelIntroBody:
      "You share the goal. We reply with phases, crafts and clear limits—so we build with judgment.",
    reelIntroCta: "Talk project",
    reelCta: "See services",
    methodTitle: "Method",
    methodAccent: "Clarify. Build. Deliver",
    readMore: "Read more",
    readLess: "Show less",
    projectsTitle: "Method",
    projectsAccent: "samples",
    projectsBody:
      "Conceptual pieces in design, development and marketing. Not client case studies.",
    projectsLink: "See samples",
    formTitle: "Tell us your idea.",
    formDescription:
      "We reply with scope: what’s in, in what order, and what waits in each phase.",
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
      name: "Claridad",
      role: "Método",
      quote:
        "Antes de herramientas: a quién le hablas y qué debe pasar tras la visita. Sin eso, se adivina.",
    },
    {
      id: 2,
      name: "Oficio",
      role: "Método",
      quote:
        "Tipografía, código y mensaje. Si confunde o carga lento, aún no está listo.",
    },
    {
      id: 3,
      name: "Alcance",
      role: "Método",
      quote:
        "Qué entra en esta fase y qué espera. Preferimos un avance honesto a una promesa vacía.",
    },
  ],
  en: [
    {
      id: 1,
      name: "Clarity",
      role: "Method",
      quote:
        "Before tools: who you speak to and what should happen after the visit. Without that, we guess.",
    },
    {
      id: 2,
      name: "Craft",
      role: "Method",
      quote:
        "Type, code and message. If it confuses or loads slowly, it isn’t ready.",
    },
    {
      id: 3,
      name: "Scope",
      role: "Method",
      quote:
        "What’s in this phase and what waits. An honest step beats an empty promise.",
    },
  ],
} as const;

export const HOME_PILLARS_I18N: Record<Locale, ServiceCategory[]> = {
  es: [
    {
      id: "oficio-diseno",
      anchor: "oficio-diseno",
      title: "Diseño",
      headline: "Pantalla con decisión.",
      number: "01",
      intro: "Diseño para quien te visita.",
      response:
        "A quién te diriges y qué deben entender. Si no acerca al objetivo, queda fuera.",
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
      headline: "Base que se sostiene.",
      number: "02",
      intro: "Desarrollo para el uso real.",
      response:
        "Ágil y confiable cuando llega gente. El código es parte de la experiencia.",
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
      headline: "Mensaje con destino.",
      number: "03",
      intro: "Marketing con continuidad.",
      response:
        "Anuncio y página alineados. Preferimos conversación útil a publicar por publicar.",
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
