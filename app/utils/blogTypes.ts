export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "table"; rows: string[][] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  /** Párrafos legacy (artículos cortos). */
  content: string[];
  /** Cuerpo enriquecido (H2/H3/listas/tablas). Si existe, tiene prioridad en la vista. */
  blocks?: BlogBlock[];
}
