import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

function loadDotEnv() {
  for (const name of [".env.local", ".env"]) {
    const path = resolve(ROOT, name);
    if (!existsSync(path)) continue;
    const text = readFileSync(path, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  }
}

loadDotEnv();

export const ROOT_DIR = ROOT;
export const DATA_DIR = resolve(ROOT, "data/seo");
export const REPORTS_DIR = resolve(ROOT, "docs/seo/reports");
export const DRAFTS_DIR = resolve(ROOT, "content/seo/drafts");
export const OPPORTUNITIES_DIR = resolve(ROOT, "content/seo/opportunities");
export const LINK_OPS_DIR = resolve(ROOT, "content/seo/link-opportunities");

export const SITE_URL = (
  process.env.SEO_SITE_URL ||
  process.env.NUXT_PUBLIC_SITE_URL ||
  "https://invends.com"
).replace(/\/$/, "");

/** Fallback when custom domain DNS is not ready. */
export const FALLBACK_SITE_URL = (
  process.env.SEO_FALLBACK_SITE_URL ||
  "https://invends-ks882m8yg-andres-gomezs-projects-10dae035.vercel.app"
).replace(/\/$/, "");

export const CRITICAL_PATHS = [
  "/",
  "/servicios",
  "/servicios/diseno-web",
  "/servicios/desarrollo-web",
  "/servicios/ecommerce",
  "/servicios/branding",
  "/servicios/marketing-digital",
  "/servicios/seo",
  "/sobre-nosotros",
  "/portafolio",
  "/blog",
  "/contacto",
  "/robots.txt",
  "/sitemap.xml",
];

export const SERVICE_SLUGS = [
  "diseno-web",
  "branding",
  "desarrollo-web",
  "desarrollo-apps",
  "ecommerce",
  "seo",
  "marketing-digital",
  "inteligencia-artificial",
  "automatizacion",
  "migracion-legacy",
  "mvp-rapido",
];

export function abs(base, path) {
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
