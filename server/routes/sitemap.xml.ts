import { BLOG_POSTS } from "~/utils/blogData";
import { PROJECTS, SERVICE_CATEGORIES } from "~/utils/siteData";
import { DEFAULT_SITE_URL } from "~/utils/seo";

function abs(site: string, path: string) {
  return `${site}${path.startsWith("/") ? path : `/${path}`}`;
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const site = String(config.public.siteUrl || DEFAULT_SITE_URL).replace(
    /\/$/,
    "",
  );

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

  const urls = [
    ...staticEs,
    ...staticEn,
    ...serviceEs,
    ...serviceEn,
    ...projects,
    ...posts,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${abs(site, path)}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=3600");
  return body;
});
