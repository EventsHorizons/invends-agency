import { DEFAULT_SITE_URL } from "~/utils/seo";
import { listSitemapPaths } from "../utils/seoCatalog";

function abs(site: string, path: string) {
  return `${site}${path.startsWith("/") ? path : `/${path}`}`;
}

function priorityFor(path: string): string {
  if (path === "/" || path === "/en") return "1.0";
  if (path.startsWith("/servicios/") || path.startsWith("/en/servicios/"))
    return "0.9";
  if (path === "/servicios" || path === "/en/servicios") return "0.85";
  if (path.startsWith("/blog/")) return "0.7";
  if (path === "/blog" || path === "/contacto" || path === "/en/contacto")
    return "0.8";
  return "0.6";
}

function changefreqFor(path: string): string {
  if (path === "/" || path.startsWith("/servicios")) return "weekly";
  if (path.startsWith("/blog")) return "weekly";
  return "monthly";
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const site = String(config.public.siteUrl || DEFAULT_SITE_URL).replace(
    /\/$/,
    "",
  );
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = listSitemapPaths();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${abs(site, path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreqFor(path)}</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setHeader(event, "Cache-Control", "public, max-age=3600");
  return body;
});
