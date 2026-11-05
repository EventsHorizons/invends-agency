/**
 * Lightweight URL catalog for sitemap — avoids pulling full blog bodies.
 */
import { SERVICE_CATEGORIES, PROJECTS } from "~/utils/siteData";
import { BLOG_POSTS } from "~/utils/blogData";

export function listSitemapPaths() {
  const staticEs = [
    "/",
    "/sobre-nosotros",
    "/servicios",
    "/portafolio",
    "/blog",
    "/contacto",
    "/politicas-de-privacidad",
    "/about-us/equipo",
  ];
  const staticEn = [
    "/en",
    "/en/sobre-nosotros",
    "/en/servicios",
    "/en/portafolio",
    "/en/blog",
    "/en/contacto",
    "/en/politicas-de-privacidad",
    "/en/about-us/equipo",
  ];
  const serviceEs = SERVICE_CATEGORIES.map((s) => `/servicios/${s.anchor}`);
  const serviceEn = SERVICE_CATEGORIES.map((s) => `/en/servicios/${s.anchor}`);
  const projects = PROJECTS.map((p) => `/portafolio/${p.slug}`);
  const posts = BLOG_POSTS.map((p) => `/blog/${p.slug}`);

  return [
    ...staticEs,
    ...staticEn,
    ...serviceEs,
    ...serviceEn,
    ...projects,
    ...posts,
  ];
}

export function listIndexablePaths() {
  return listSitemapPaths().filter(
    (p) => !p.startsWith("/en/blog/") && !p.startsWith("/glosario"),
  );
}
