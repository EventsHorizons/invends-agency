import fs from "fs";
import path from "path";

const SKIP = new Set([
  "node_modules",
  ".nuxt",
  ".output",
  ".git",
  ".data",
  "research",
]);

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(vue|ts|js|mjs|css|md|json|txt)$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

const visible = [];
const urlOnly = [];
for (const f of walk(".")) {
  const s = fs.readFileSync(f, "utf8");
  if (!/3Drawers|3drawers|3Dreawers|3DRAWERS/.test(s)) continue;
  const without = s.replace(/https?:\/\/[^\s"']+/g, "");
  if (/3Drawers|3drawers|3Dreawers|3DRAWERS/.test(without)) visible.push(f);
  else urlOnly.push(f);
}

console.log("VISIBLE_RESIDUALS", visible.length);
for (const f of visible) console.log(" -", f);
console.log("URL_ONLY", urlOnly.length);
