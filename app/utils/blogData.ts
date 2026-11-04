import { BLOG_POSTS_FROM_SOCIAL } from "./blogPostsFromSocial";
import type { BlogPost } from "./blogTypes";

export const BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS_FROM_SOCIAL,
  {
    slug: "por-que-tu-sitio-no-convierte",
    title: "Por qué tu sitio no convierte (aunque se vea bien)",
    excerpt:
      "La estética no basta. Revisamos fricciones de mensaje, jerarquía y llamado a la acción.",
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
      "Abrir el diseño sin decisiones de negocio es la forma más cara de avanzar.",
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
      "Cómo escribir para marcas de servicios cuando el tono corporativo no convence.",
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
      "Rendimiento, estados y semántica no son detalles técnicos: el usuario los percibe.",
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
      "Tres servicios distintos. Un mismo brief. Así evitamos piezas sueltas que no se hablan entre sí.",
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
