import { BLOG_POSTS_FROM_SOCIAL } from "./blogPostsFromSocial";
import type { BlogPost } from "./blogTypes";

export const BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS_FROM_SOCIAL,
  {
    slug: "como-elegir-agencia-diseno-web",
    title: "Cómo elegir una agencia de diseño web sin pagar dos veces",
    excerpt:
      "Antes de firmar: qué pedir en el brief, cómo leer una propuesta y señales de que podrías terminar pagando el mismo sitio dos veces.",
    category: "Diseño web",
    date: "4 Nov 2026",
    image: "/images/blog/cinco-preguntas-antes-de-disenar-web.webp",
    readTime: "9 min",
    content: [
      "Elegir agencia no es comparar moodboards. Es decidir quién va a sostener el mensaje, el código y el siguiente paso del negocio.",
    ],
    blocks: [
      {
        type: "p",
        text: "La mayoría de proyectos web caros no fallan por “falta de creatividad”. Fallan porque el alcance nunca se escribió, porque nadie definió qué decisión debe tomar el visitante, o porque diseño y desarrollo se contrataron como piezas sueltas que no se hablan.",
      },
      {
        type: "p",
        text: "Esta guía resume criterios que usamos en Invends —y que puedes exigir a cualquier estudio— antes de firmar. Sin rankings inventados ni promesas de primera página.",
      },
      { type: "h2", text: "1. Empieza por el problema, no por la plantilla" },
      {
        type: "p",
        text: "Si la primera reunión es un tour de tipografías y no una conversación sobre a quién le hablas, qué objeciones repiten y qué contacto esperas, estás comprando decoración. Un brief mínimo evita pagar el mismo sitio dos veces.",
      },
      {
        type: "ul",
        items: [
          "Qué debe lograr el sitio en 6–12 meses",
          "Quién decide y quién usa la web día a día",
          "Qué páginas son críticas (inicio, servicio, contacto, landing)",
          "Qué queda fuera de esta fase",
        ],
      },
      { type: "h2", text: "2. Señales de que vas a pagar dos veces" },
      {
        type: "ol",
        items: [
          "El presupuesto es un paquete cerrado sin lista de entregables",
          "No hay responsable de contenido ni de formularios/medición",
          "El diseño se aprueba en PDF y el desarrollo “se ve después”",
          "Prometen posiciones en Google sin auditoría ni acceso a Search Console",
          "El contrato no contempla mantenimiento ni handoff",
        ],
      },
      { type: "h2", text: "3. Qué pedir en la propuesta" },
      {
        type: "p",
        text: "Alcance por fases, supuestos, exclusiones, criterios de aceptación y un recorrido de aprobación. Si solo recibes un moodboard y una fecha, no tienes propuesta: tienes un deseo.",
      },
      {
        type: "p",
        text: "En diseño web, exige arquitectura de información, comportamiento responsive y un sistema de componentes. En desarrollo, pregunta por rendimiento, accesibilidad básica y cómo se publican cambios. Si también necesitas campañas, pide continuidad entre mensaje, landing y medición —no “posts sueltos”.",
      },
      { type: "h2", text: "4. Cómo encaja Invends" },
      {
        type: "p",
        text: "Trabajamos diseño web, desarrollo y marketing con un solo criterio: que la marca se entienda, se sostenga y se elija. No inventamos clientes ni métricas para cerrar. Si hay fit, respondemos con alcance; si no, lo decimos.",
      },
      {
        type: "p",
        text: "Puedes revisar el servicio de diseño web, el hub de soluciones o escribir a hola@invends.com con el objetivo del proyecto.",
      },
      { type: "h2", text: "5. Preguntas útiles antes de contratar" },
      {
        type: "ul",
        items: [
          "¿Quién escribe y aprueba los textos?",
          "¿El formulario llega a un inbox real y se mide?",
          "¿Qué pasa el mes después del lanzamiento?",
          "¿Cómo se documenta el handoff (accesos, componentes, estilos)?",
        ],
      },
      {
        type: "quote",
        text: "Si no puedes explicar en una frase qué debe lograr la web, todavía no estás listo para comparar agencias: estás listo para un brief.",
      },
    ],
  },
  {
    slug: "por-que-tu-sitio-no-convierte",
    title: "Por qué tu sitio no convierte (aunque se vea bien)",
    excerpt:
      "Si la web se ve bien pero no genera contactos, suele fallar el mensaje, la jerarquía o el llamado a la acción —no la “falta de efectos”.",
    category: "Diseño web",
    date: "12 Mar 2026",
    image: "/images/blog/por-que-tu-sitio-no-convierte.webp",
    readTime: "6 min",
    content: [
      "Un sitio puede verse correcto y aun así no generar contactos. Suele fallar en tres puntos: no dice con claridad qué ofreces, no prioriza una acción y pide demasiado esfuerzo al visitante.",
      "En Invends empezamos por el objetivo comercial: a quién hablas, qué decisión esperas y qué objeciones aparecen antes del contacto. Después revisamos la interfaz.",
      "Si el titular no nombra el servicio, si el botón es genérico o si la navegación compite consigo misma, el diseño está trabajando en contra. La solución es más criterio, no más efectos.",
    ],
  },
  {
    slug: "brief-antes-que-pixeles",
    title: "Brief antes que píxeles: el orden que evita rehacer todo",
    excerpt:
      "Abrir Figma sin decisiones de negocio suele salir caro. El brief define qué se diseña —y qué se deja fuera, con tranquilidad.",
    category: "Método",
    date: "28 Feb 2026",
    image: "/images/blog/brief-antes-que-pixeles.webp",
    readTime: "5 min",
    content: [
      "Empezar por el moodboard es tentador. También retrasa las preguntas difíciles: ¿qué problema resolvemos?, ¿qué debe pasar después de la visita?, ¿qué no vamos a hacer?",
      "Nuestro método empieza por entender el objetivo. Solo entonces diseñamos y desarrollamos.",
      "Un brief sólido reduce vueltas y permite juzgar cada pantalla con una pregunta simple: ¿esto acerca al objetivo o solo se ve interesante?",
    ],
  },
  {
    slug: "contenido-que-vende-sin-gritar",
    title: "Contenido que vende sin gritar",
    excerpt:
      "Cómo escribir textos de servicios que nombren la oferta, muestren criterio e indiquen el siguiente paso —sin frases vacías ni promesas infladas.",
    category: "Marketing digital",
    date: "10 Feb 2026",
    image: "/images/blog/contenido-que-vende-sin-gritar.webp",
    readTime: "7 min",
    content: [
      "El copy de agencia suele caer en dos extremos: frases intercambiables o metáforas forzadas. Ninguno explica el trabajo real.",
      "Preferimos textos que nombren el servicio, muestren criterio e indiquen el siguiente paso. Sin promesas infladas.",
      "Si tu contenido no puede responder “qué hacemos” y “cómo empezamos” en menos de un minuto de lectura, todavía no está listo.",
    ],
  },
  {
    slug: "desarrollo-como-parte-del-diseno",
    title: "El desarrollo también es parte de la experiencia",
    excerpt:
      "Rendimiento, estados y semántica no son “detalles técnicos”: quien visita los siente como confianza o como fricción.",
    category: "Desarrollo web",
    date: "22 Ene 2026",
    image: "/images/blog/desarrollo-como-parte-del-diseno.webp",
    readTime: "6 min",
    content: [
      "Cuando diseño y desarrollo se tratan como etapas aisladas, el resultado se siente cosido: inconsistencias, carga lenta y componentes que no escalan.",
      "En Invends trabajamos la implementación como continuidad del diseño: componentes, tokens y decisiones compartidas.",
      "Un sitio rápido y mantenible no es un extra. Es lo mínimo para que el mensaje se sostenga.",
    ],
  },
  {
    slug: "tres-oficios-una-direccion",
    title: "Diseño, desarrollo y marketing en un solo proyecto",
    excerpt:
      "Cuando diseño, desarrollo y marketing comparten un mismo brief, el logo, la web y la campaña dejan de pelearse entre sí.",
    category: "Agencia",
    date: "5 Ene 2026",
    image: "/images/blog/tres-oficios-una-direccion.webp",
    readTime: "4 min",
    content: [
      "Muchas marcas reciben un logo por un lado, una web por otro y una campaña sin relación con ninguna de las dos.",
      "En Invends alineamos diseño web, desarrollo y marketing digital bajo el mismo objetivo. No siempre hacemos todo; sí cuidamos que lo que se haga sea coherente.",
      "Si buscas una agencia que entregue archivos sin dirección, hay muchas. Si buscas claridad para tu presencia digital, empecemos por una conversación concreta.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
