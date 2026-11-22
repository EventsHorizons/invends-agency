import type { Locale } from "~/composables/useLocale";

export const FORM_SERVICES = {
  es: [
    "Diseño y desarrollo web",
    "Rediseño de sitio actual",
    "Tienda online (E-commerce)",
    "Identidad visual y branding",
    "Aplicaciones y plataformas web",
    "Posicionamiento SEO y contenido",
    "Automatización de procesos",
    "Proyecto integral (360°)",
  ],
  en: [
    "Web design & engineering",
    "Website redesign",
    "E-commerce & online store",
    "Visual identity & branding",
    "Web apps & digital platforms",
    "Technical SEO & content",
    "Process automation",
    "Full digital project (360°)",
  ],
} as const;

export const FORM_BUDGET = {
  es: [
    "Definiendo alcance y presupuesto",
    "Evaluando propuestas y cotizaciones",
    "Listo para arrancar de inmediato",
    "Buscando equipo continuo",
  ],
  en: [
    "Defining scope and budget",
    "Evaluating proposals & quotes",
    "Ready to kick off immediately",
    "Seeking dedicated team",
  ],
} as const;

export function formCopy(locale: Locale) {
  if (locale === "en") {
    return {
      defaultTitle: "Tell us about your project",
      defaultBody:
        "Share your details and we will reach out in under 24 hours to schedule an introductory call.",
      servicesLabel: "What services do you need?",
      servicesHint: "Select one or more disciplines",
      servicesAria: "Services",
      budgetLabel: "Where is the project at?",
      budgetHint: "Choose the stage that best fits your timing",
      budgetAria: "Project stage",
      firstName: "First name*",
      lastName: "Last name*",
      company: "Company or brand*",
      email: "Business email*",
      phone: "Phone or WhatsApp*",
      phonePlaceholder: "+1 555 000 0000",
      source: "How did you find us?",
      message: "Project details*",
      messageHint: "Briefly describe your company, goals, or questions you would like to address on our call...",
      consentBefore: "I accept the",
      consentLink: "Personal Data Policy",
      consentAfter: ".",
      privacyTo: "/en/politicas-de-privacidad",
      submit: "Send message",
      submitting: "Sending message…",
      ok: "Message received. We will get back to you within 24 business hours.",
      sendFailed: "There was a connection issue. Please email hola@invends.com directly.",
      errorSummary: "Please complete the highlighted fields to continue.",
      errors: {
        firstName: "Please enter your name.",
        lastName: "Please enter your last name.",
        company: "Please enter your company or brand name.",
        email: "Please enter a valid email address.",
        emailInvalid: "Invalid email address.",
        phone: "Please enter a contact phone or WhatsApp.",
        phoneInvalid: "Invalid phone number.",
        services: "Please select at least one service.",
        budget: "Please select your project stage.",
        consent: "You must accept the data processing policy.",
      },
    };
  }

  return {
    defaultTitle: "Cuéntanos de tu proyecto",
    defaultBody:
      "Déjanos tus datos y te contactaremos en menos de 24 horas para coordinar una primera llamada.",
    servicesLabel: "¿Qué servicios necesitas?",
    servicesHint: "Puedes seleccionar una o más disciplinas",
    servicesAria: "Servicios",
    budgetLabel: "¿En qué etapa se encuentra el proyecto?",
    budgetHint: "Elige la opción que mejor describa tu momento",
    budgetAria: "Momento del proyecto",
    firstName: "Nombre*",
    lastName: "Apellidos*",
    company: "Empresa o marca*",
    email: "Correo corporativo*",
    phone: "Teléfono o WhatsApp*",
    phonePlaceholder: "+57 300 123 4567",
    source: "¿Cómo nos encontraste?",
    message: "Detalles del proyecto*",
    messageHint: "Cuéntanos sobre tu empresa, objetivos del sitio web o cualquier duda que quieras revisar en la primera llamada...",
    consentBefore: "Acepto la",
    consentLink: "Política de Tratamiento de Datos Personales",
    consentAfter: ".",
    privacyTo: "/politicas-de-privacidad",
    submit: "Enviar mensaje",
    submitting: "Enviando mensaje…",
    ok: "¡Mensaje recibido! Te responderemos en menos de 24 horas hábiles para coordinar los siguientes pasos.",
    sendFailed: "Hubo un problema de conexión. Puedes escribirnos directamente a hola@invends.com y te atenderemos de inmediato.",
    errorSummary: "Por favor completa los campos destacados para continuar.",
    errors: {
      firstName: "Escribe tu nombre para saber con quién hablamos.",
      lastName: "Ingresa tus apellidos.",
      company: "Indica el nombre de tu empresa o marca.",
      email: "Ingresa un correo electrónico válido para poder responderte.",
      emailInvalid: "Correo electrónico inválido.",
      phone: "Ingresa un número telefónico o WhatsApp de contacto.",
      phoneInvalid: "Teléfono inválido.",
      services: "Selecciona al menos un servicio.",
      budget: "Selecciona el punto en que se encuentra el proyecto.",
      consent: "Debes aceptar la política de tratamiento de datos.",
    },
  };
}
