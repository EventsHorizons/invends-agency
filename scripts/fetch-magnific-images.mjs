/**
 * Download curated Magnific (formerly Freepik) free photos and convert to WebP.
 * License: Magnific Free License — commercial use with attribution.
 * https://www.magnific.com/
 */
import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");
const picks = JSON.parse(
  readFileSync(join(root, "scripts", "magnific-picks.json"), "utf8"),
);

/**
 * Curated pick index (or id) per slot — chosen for conceptual fit + variety.
 * Prefer photographic, non-duplicate assets aligned to each service/section.
 */
const SELECTION = {
  "svc-diseno-web": 0, // wireframe layout sketch
  "svc-branding": 0, // stationery + laptop
  "svc-desarrollo-web": 0, // developer coding
  "svc-aplicaciones": 1, // smartphones sharing apps
  "svc-ecommerce": 5, // online shopping phone bill
  "svc-seo": 1, // analytics dashboard
  "svc-marketing": 2, // photography design studio editing (from original; better than ukraine cookies)
  "svc-ia": 0, // AI brain concept
  "svc-automatizacion": 0, // digital transformation
  "svc-migracion": 0, // cloud storage network
  "svc-mvp": 0, // team whiteboard
  "principle-diseno": 0, // design studio still life
  "principle-desarrollo": 2, // IT specialist night code
  "principle-marketing": 1, // online strategy marketing icons
  "project-editorial": 0, // academic knowledge book study
  "project-landing-producto": 4, // laptop mock-up
  "project-lanzamiento-marca": 5, // stationery brand arrangement
  "project-landing-servicio": 2, // people working office
  "project-institucional": 1, // modern business buildings
  "project-contenido": 5, // photo studio equipment
  "blog-conversion": 1, // analytics dashboard
  "blog-brief": 1, // notebook writing flat lay
  "blog-contenido-vende": 1, // person writing office
  "blog-desarrollo-ux": 1, // designer working floor
  "blog-tres-oficios": 0, // collaborative brainstorming
};

const FILE_MAP = {
  "svc-diseno-web": "services/svc-diseno-web.webp",
  "svc-branding": "services/svc-branding.webp",
  "svc-desarrollo-web": "services/svc-desarrollo-web.webp",
  "svc-aplicaciones": "services/svc-aplicaciones.webp",
  "svc-ecommerce": "services/svc-ecommerce.webp",
  "svc-seo": "services/svc-seo.webp",
  "svc-marketing": "services/svc-marketing.webp",
  "svc-ia": "services/svc-ia.webp",
  "svc-automatizacion": "services/svc-automatizacion.webp",
  "svc-migracion": "services/svc-migracion.webp",
  "svc-mvp": "services/svc-mvp.webp",
  "principle-diseno": "principle-diseno.webp",
  "principle-desarrollo": "principle-desarrollo.webp",
  "principle-marketing": "principle-marketing.webp",
  "project-editorial": "project-editorial.webp",
  "project-landing-producto": "project-landing-producto.webp",
  "project-lanzamiento-marca": "project-lanzamiento-marca.webp",
  "project-landing-servicio": "project-landing-servicio.webp",
  "project-institucional": "project-institucional.webp",
  "project-contenido": "project-contenido.webp",
  "blog-conversion": "blog-conversion.webp",
  "blog-brief": "blog-brief.webp",
  "blog-contenido-vende": "blog-contenido-vende.webp",
  "blog-desarrollo-ux": "blog-desarrollo-ux.webp",
  "blog-tres-oficios": "blog-tres-oficios.webp",
};

const ALTS = {
  "svc-diseno-web":
    "Boceto de layout web y arquitectura de interfaz sobre mesa de trabajo",
  "svc-branding":
    "Papelería y tarjetas de marca junto a un portátil en escritorio",
  "svc-desarrollo-web":
    "Desarrollador escribiendo código en la pantalla de un portátil",
  "svc-aplicaciones":
    "Smartphones compartiendo información entre aplicaciones",
  "svc-ecommerce":
    "Compra online y pago desde el móvil en un recorrido de e-commerce",
  "svc-seo": "Panel de analítica y datos orientados a búsqueda y SEO",
  "svc-marketing":
    "Estudio creativo con edición fotográfica y dirección de campaña",
  "svc-ia":
    "Concepto visual de inteligencia artificial y aprendizaje automático",
  "svc-automatizacion":
    "Transformación digital y optimización de procesos automatizados",
  "svc-migracion":
    "Infraestructura en la nube y red para migración de sistemas",
  "svc-mvp":
    "Equipo planificando un prototipo sobre una pizarra compartida",
  "principle-diseno":
    "Estudio de diseño gráfico con materiales de dirección de arte",
  "principle-desarrollo":
    "Especialista de software revisando código en entorno de trabajo",
  "principle-marketing":
    "Iconografía de estrategia, medios y marketing digital",
  "project-editorial":
    "Estudio y lectura editorial: conocimiento, tipografía y contenido",
  "project-landing-producto":
    "Mockup de portátil para una landing de producto digital",
  "project-lanzamiento-marca":
    "Composición de papelería para el lanzamiento de una identidad",
  "project-landing-servicio":
    "Equipo profesional trabajando en un entorno de servicios digitales",
  "project-institucional":
    "Arquitectura corporativa moderna: presencia institucional",
  "project-contenido":
    "Estudio fotográfico con equipo profesional de creación de contenido",
  "blog-conversion":
    "Dashboard de analítica para medir conversión en sitios web",
  "blog-brief":
    "Cuaderno y mesa de trabajo para redactar un brief creativo",
  "blog-contenido-vende":
    "Escritura y producción de contenido comercial en oficina",
  "blog-desarrollo-ux":
    "Diseñador UX trabajando prototipos y layout en el suelo",
  "blog-tres-oficios":
    "Equipo creativo colaborando en una sesión de brainstorming",
};

const NOTES = {
  "svc-diseno-web": "Servicio: Diseño web",
  "svc-branding": "Servicio: Branding",
  "svc-desarrollo-web": "Servicio: Desarrollo web",
  "svc-aplicaciones": "Servicio: Aplicaciones",
  "svc-ecommerce": "Servicio: E-commerce",
  "svc-seo": "Servicio: SEO",
  "svc-marketing": "Servicio: Marketing",
  "svc-ia": "Servicio: Inteligencia artificial",
  "svc-automatizacion": "Servicio: Automatización",
  "svc-migracion": "Servicio: Migración y refactorización",
  "svc-mvp": "Servicio: MVP ultra-rápido",
  "principle-diseno": "Principio: Diseño",
  "principle-desarrollo": "Principio: Desarrollo",
  "principle-marketing": "Principio: Marketing",
  "project-editorial": "Proyecto: Sitio con sistema editorial",
  "project-landing-producto": "Proyecto: Landing de producto digital",
  "project-lanzamiento-marca": "Proyecto: Lanzamiento de marca",
  "project-landing-servicio": "Proyecto: Landing de servicio",
  "project-institucional": "Proyecto: Sitio institucional",
  "project-contenido": "Proyecto: Sistema de contenidos",
  "blog-conversion": "Blog: Conversión",
  "blog-brief": "Blog: Brief",
  "blog-contenido-vende": "Blog: Contenido que vende",
  "blog-desarrollo-ux": "Blog: Desarrollo y UX",
  "blog-tres-oficios": "Blog: Tres oficios",
};

function resolvePick(key) {
  const list = picks[key];
  if (!Array.isArray(list) || !list.length) throw new Error(`No picks for ${key}`);
  const used = resolvePick._used || (resolvePick._used = new Set());
  let idx = SELECTION[key] ?? 0;
  let candidate = list[idx];
  // Skip duplicates across slots
  if (used.has(candidate.id)) {
    candidate = list.find((i) => !used.has(i.id)) || candidate;
  }
  used.add(candidate.id);
  return candidate;
}

async function downloadOne(key) {
  const pick = resolvePick(key);
  const file = FILE_MAP[key];
  const url = `${pick.cdn}?w=2000&q=90`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://www.magnific.com/",
      Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`${key}: HTTP ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = join(outDir, file);
  await mkdir(dirname(dest), { recursive: true });
  await sharp(buf)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log("ok", file, meta.width + "x" + meta.height, pick.author);
  return {
    file,
    key,
    alt: ALTS[key],
    note: NOTES[key],
    pick,
  };
}

const results = [];
for (const key of Object.keys(FILE_MAP)) {
  results.push(await downloadOne(key));
}

const attrLines = [
  "# Image attributions — Invends",
  "",
  "All images below are **free stock photos from [Magnific](https://www.magnific.com/)** (formerly Freepik).",
  "Free assets require attribution under Magnific/Freepik terms (e.g. designed by the author / Freepik).",
  "Commercial use is permitted when attribution rules are followed.",
  "",
];

for (const r of results) {
  const a = r.pick;
  attrLines.push(`## \`${r.file}\``);
  attrLines.push(`- Use: ${r.note}`);
  attrLines.push(`- Alt: ${r.alt}`);
  attrLines.push(
    `- Author: [${a.author}](https://www.magnific.com/author/${a.authorSlug})`,
  );
  attrLines.push(`- Page: ${a.url}`);
  attrLines.push(`- CDN: ${a.cdn}`);
  attrLines.push(`- License: Magnific Free (attribution required)`);
  attrLines.push("");
}

await writeFile(join(outDir, "ATTRIBUTIONS.md"), attrLines.join("\n"), "utf8");
await writeFile(
  join(root, "scripts", "magnific-selection.json"),
  JSON.stringify(results, null, 2),
  "utf8",
);
console.log("ATTRIBUTIONS.md updated,", results.length, "images");
