import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  "node_modules",
  ".nuxt",
  ".output",
  ".data",
  "research",
  ".git",
]);

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(vue|ts|js|mjs|css|md|json|txt|html)$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

function rebrandText(input) {
  const urls = [];
  let s = input.replace(/https?:\/\/[^\s"'<>)\]]+/g, (m) => {
    const i = urls.length;
    urls.push(m);
    return `__URL_${i}__`;
  });

  s = s
    .replace(/Invends/g, "Invends")
    .replace(/INVENDS/g, "INVENDS")
    .replace(/Invends/g, "Invends")
    .replace(/Invends/g, "Invends")
    .replace(/invends-agency/g, "invends-agency")
    .replace(/invends-theme/g, "invends-theme")
    .replace(/invends-agency-cookies/g, "invends-cookies")
    .replace(/hola@invends\.com/g, "hola@invends.com")
    .replace(/contact@invends\.agency/g, "hola@invends.com")
    .replace(/jobs@invends\.agency/g, "jobs@invends.com")
    .replace(/freelance@invends\.agency/g, "freelance@invends.com")
    .replace(/press@invends\.agency/g, "press@invends.com")
    .replace(/@invends\.agency/g, "@invends.com")
    .replace(/@invends\.com/g, "@invends.com")
    .replace(/invends\.agency/g, "invends.com")
    .replace(/invends\.com/g, "invends.com")
    .replace(/\b3drawers\b/g, "invends");

  s = s.replace(/__URL_(\d+)__/g, (_, i) => urls[Number(i)]);
  return s;
}

const files = walk(ROOT);
let changed = 0;
for (const f of files) {
  const before = fs.readFileSync(f, "utf8");
  const after = rebrandText(before);
  if (after !== before) {
    fs.writeFileSync(f, after);
    changed += 1;
    console.log("updated", path.relative(ROOT, f));
  }
}
console.log("CHANGED", changed);
