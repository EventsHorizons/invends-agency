/**
 * Verifies service + blog titles match protected registry.
 * Exit 0 = identical; exit 1 = drift.
 */
import { readFileSync } from "node:fs";

function categoryTitles(src, exportName) {
  const start = src.indexOf(`export const ${exportName}`);
  if (start < 0) throw new Error(`export ${exportName} not found`);
  // Find matching array end roughly: next export or EOF
  const after = src.slice(start);
  const endMatch = after.slice(1).search(/\nexport /);
  const block = endMatch >= 0 ? after.slice(0, endMatch + 1) : after;
  const titles = [];
  // Category objects always have id then (optional fields) title at service level
  const re = /id:\s*"[^"]+",\s*\n\s*anchor:\s*"[^"]+",\s*\n\s*title:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(block))) titles.push(m[1]);
  if (!titles.length) {
    // Fallback: id then title nearby
    const re2 = /id:\s*"[^"]+"[\s\S]{0,120}?title:\s*"([^"]+)"/g;
    while ((m = re2.exec(block))) {
      // skip item titles that look generic short - keep only if not already nested deep
      titles.push(m[1]);
    }
  }
  return titles;
}

function blogTitles(src) {
  const titles = [];
  const re = /^\s*title:\s*"([^"]+)"/gm;
  let t;
  while ((t = re.exec(src))) titles.push(t[1]);
  return titles;
}

const expectedEs = [
  "Diseño web",
  "Branding",
  "Desarrollo web",
  "Aplicaciones",
  "E-commerce",
  "SEO",
  "Marketing",
  "Inteligencia artificial",
  "Automatización",
  "Migración y refactorización",
  "MVP ultra-rápido (MaaS)",
];
const expectedEn = [
  "Web design",
  "Branding",
  "Web development",
  "Applications",
  "E-commerce",
  "SEO",
  "Marketing",
  "Artificial intelligence",
  "Automation",
  "Migration & refactoring",
  "Ultra-fast MVP (MaaS)",
];

const expectedBlog = [
  "Cómo elegir una agencia de diseño web sin pagar dos veces",
  "Por qué tu sitio no convierte (aunque se vea bien)",
  "Brief antes que píxeles: el orden que evita rehacer todo",
  "Contenido que vende sin gritar",
  "El desarrollo también es parte de la experiencia",
  "Diseño, desarrollo y marketing en un solo proyecto",
  "Auditoría digital en siete puntos (y cómo empezar con Invends)",
  "Por qué publicar todos los días no es una estrategia de contenidos",
  "Arquitectura de información y conversión: más allá de los mitos del diseño web",
  "Más visitas no son más clientes: tráfico frente a conversión",
  "Cinco preguntas de negocio antes de diseñar (o rediseñar) tu web",
  "Cinco señales de UX que hacen perder clientes en una página web",
  "Presencia digital vs estrategia: cuándo tu web deja de ser un adorno",
  "Auditoría digital para empresas: cómo identificar oportunidades de mejora en tu presencia online",
  "Cómo pasar de publicar en redes sociales a construir una estrategia de contenidos",
  "Arquitectura de información: cómo organizar una página web para mejorar la experiencia de usuario",
  "Del tráfico a la conversión: cómo construir un recorrido digital coherente",
  "Cómo planificar una página web empresarial antes de comenzar su desarrollo",
  "Los errores de experiencia de usuario que pueden afectar el rendimiento de una página web",
  "¿Qué debe hacer realmente una página web para aportar valor a un negocio?",
  "El plazo sale del alcance: cómo definir una fase (y un MVP)",
  "Modernizar sin apagar el negocio: migración por fases",
  "Antes de automatizar: mapa, conexión y control",
  "Que se sostenga el día que llega gente: desarrollo como experiencia",
  "Cuando el anuncio y la página no dicen lo mismo",
  "Si no acerca al objetivo, sobra: cómo auditar una pantalla",
  "Brief antes que píxeles: qué decidir antes de diseñar",
];

const siteData = readFileSync("app/utils/siteData.ts", "utf8");
const i18n = readFileSync("app/utils/serviceCategoriesI18n.ts", "utf8");
const blogData = readFileSync("app/utils/blogData.ts", "utf8");
const blogSocial = readFileSync("app/utils/blogPostsFromSocial.ts", "utf8");
const protectedDoc = readFileSync("docs/maintenance/PROTECTED_TITLES.md", "utf8");

const esTitles = categoryTitles(siteData, "SERVICE_CATEGORIES");
const enTitles = categoryTitles(i18n, "SERVICE_CATEGORIES_EN");

const blogRaw = [...blogTitles(blogSocial), ...blogTitles(blogData)];
const seen = new Set();
const blogUnique = [];
for (const t of blogRaw) {
  if (!seen.has(t)) {
    seen.add(t);
    blogUnique.push(t);
  }
}

function eq(a, b, label) {
  const miss = b.filter((t) => !a.includes(t));
  const extra = a.filter((t) => !b.includes(t));
  const setOk = miss.length === 0 && extra.length === 0 && a.length === b.length;
  const sameOrder = setOk && a.every((t, i) => t === b[i]);
  console.log(
    `\n[${label}] found=${a.length} expected=${b.length} ${sameOrder ? "identical order" : setOk ? "same set" : "DRIFT"}`,
  );
  if (!setOk) {
    if (miss.length) console.log("  MISSING:", miss);
    if (extra.length) console.log("  EXTRA:", extra);
  } else {
    console.log("  OK");
  }
  return setOk;
}

for (const t of [...expectedEs, ...expectedEn, ...expectedBlog]) {
  if (!protectedDoc.includes(t)) {
    console.error("PROTECTED doc missing:", t);
    process.exit(1);
  }
}

const okEs = eq(esTitles, expectedEs, "SERVICE_CATEGORIES ES");
const okEn = eq(enTitles, expectedEn, "SERVICE_CATEGORIES EN");
const okBlog = eq(
  [...blogUnique].filter((t) => expectedBlog.includes(t)).sort(),
  [...expectedBlog].sort(),
  "BLOG TITLES",
);

if (okEs && okEn && okBlog) {
  console.log("\nALL PROTECTED TITLES IDENTICAL");
  process.exit(0);
}
console.error("\nPROTECTED TITLE DRIFT DETECTED");
process.exit(1);
