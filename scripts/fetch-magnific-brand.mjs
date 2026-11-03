/**
 * Download curated Magnific free photos, apply a cool editorial grade aligned
 * to Invends tokens (#090711 / #8A68FF family), write WebP + ATTRIBUTIONS.
 *
 * Source: https://www.magnific.com/ (free CDN; login required for watermark-free).
 */
import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");

const brandPicks = JSON.parse(
  readFileSync(join(root, "scripts", "magnific-brand-picks.json"), "utf8"),
);
const legacyPicks = JSON.parse(
  readFileSync(join(root, "scripts", "magnific-picks.json"), "utf8"),
);
const selection = JSON.parse(
  readFileSync(join(root, "scripts", "magnific-brand-selection.json"), "utf8"),
);

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
    "Layout web y arquitectura de interfaz en prototipo sobre dispositivo",
  "svc-branding":
    "Sistema de papelería e identidad corporativa en composición editorial",
  "svc-desarrollo-web":
    "Concepto de sitio responsive: layouts web en dispositivo",
  "svc-aplicaciones":
    "Pantalla de producto móvil con interfaz de aplicación",
  "svc-ecommerce":
    "Compra en tienda online desde la app móvil",
  "svc-seo":
    "Panel de analítica orientado a visibilidad y búsqueda",
  "svc-marketing":
    "Estudio creativo: edición fotográfica y dirección de campaña",
  "svc-ia":
    "Concepto de sistemas de inteligencia artificial aplicados al trabajo",
  "svc-automatizacion":
    "Optimización digital de procesos y flujos automatizados",
  "svc-migracion":
    "Diagnóstico técnico de sistemas en proceso de migración",
  "svc-mvp":
    "Planificación de prototipo con notas adhesivas en mesa de trabajo",
  "principle-diseno":
    "Estudio de diseño gráfico con materiales de dirección de arte",
  "principle-desarrollo":
    "Escritorio de producto digital con portátil, teléfono y cuaderno",
  "principle-marketing":
    "Mesa y notas en pared para planificar mensaje y canal",
  "project-editorial":
    "Estudio editorial: tipografía, lectura y sistema de contenido",
  "project-landing-producto":
    "Concepto de interfaz web para landing de producto",
  "project-lanzamiento-marca":
    "Mockup de papelería para lanzamiento de identidad",
  "project-landing-servicio":
    "Mesa de diseño con muestras de color y materiales de servicio",
  "project-institucional":
    "Fachada de vidrio y acero: presencia institucional contemporánea",
  "project-contenido":
    "Equipo de estudio para creación de contenido digital",
  "blog-conversion":
    "Gráficos de marketing en portátil para leer conversión",
  "blog-brief":
    "Cuaderno en flat lay para redactar el brief creativo",
  "blog-contenido-vende":
    "Escritura de contenido comercial en escritorio de trabajo",
  "blog-desarrollo-ux":
    "Revisión de proyectos de diseño sobre mesa compartida",
  "blog-tres-oficios":
    "Equipo creativo colaborando en un proyecto de diseño",
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
  "principle-diseno": "Oficio / principio: Diseño",
  "principle-desarrollo": "Oficio / principio: Desarrollo",
  "principle-marketing": "Oficio / principio: Marketing",
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

function poolFor(key) {
  const map = new Map();
  for (const src of [legacyPicks[key], brandPicks[key]]) {
    if (!Array.isArray(src)) continue;
    for (const item of src) map.set(item.id, item);
  }
  // Allow cross-slot lookup for curated IDs found elsewhere
  for (const list of Object.values(legacyPicks)) {
    if (!Array.isArray(list)) continue;
    for (const item of list) map.set(item.id, item);
  }
  for (const list of Object.values(brandPicks)) {
    if (!Array.isArray(list)) continue;
    for (const item of list) map.set(item.id, item);
  }
  return map;
}

const used = new Set();

function resolvePick(key) {
  const wanted = selection[key]?.id;
  const pool = poolFor(key);
  let pick = pool.get(wanted);
  if (!pick) throw new Error(`Missing pick id ${wanted} for ${key}`);
  if (used.has(pick.id)) {
    const alt = [...pool.values()].find((i) => !used.has(i.id));
    if (!alt) throw new Error(`Duplicate exhausted for ${key}`);
    console.warn("dup fallback", key, pick.id, "→", alt.id);
    pick = alt;
  }
  used.add(pick.id);
  return pick;
}

/** Cool editorial grade toward Invends dark/lavender world — not a purple wash. */
async function gradeToWebp(buf, dest) {
  const resized = await sharp(buf)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .modulate({
      brightness: 0.97,
      saturation: 0.82,
      hue: -6,
    })
    .linear(0.96, -4)
    .ensureAlpha()
    .png()
    .toBuffer({ resolveWithObject: true });

  const w = resized.info.width;
  const h = resized.info.height;

  const overlay = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs>
        <radialGradient id="g" cx="50%" cy="40%" r="75%">
          <stop offset="0%" stop-color="#B8A6FF" stop-opacity="0"/>
          <stop offset="55%" stop-color="#25134F" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="#090711" stop-opacity="0.22"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`,
  );

  await sharp(resized.data)
    .composite([{ input: overlay, blend: "multiply" }])
    .webp({ quality: 82 })
    .toFile(dest);
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
  await gradeToWebp(buf, dest);
  const meta = await sharp(dest).metadata();
  console.log("ok", file, meta.width + "x" + meta.height, pick.author, pick.name.slice(0, 48));
  return {
    file,
    key,
    alt: ALTS[key],
    note: NOTES[key],
    pick,
    reason: selection[key]?.reason || "",
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
  "> **Note:** Without a Magnific login session, CDN free previews include a tiled watermark.",
  "> Clean downloads require authenticated Download on magnific.com. AI generation also requires Log in.",
  "",
];

for (const r of results) {
  const a = r.pick;
  attrLines.push(`## \`${r.file}\``);
  attrLines.push(`- Use: ${r.note}`);
  attrLines.push(`- Art direction: ${r.reason}`);
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
if (!existsSync(join(outDir, "ATTRIBUTIONS.md"))) {
  throw new Error("ATTRIBUTIONS missing");
}
