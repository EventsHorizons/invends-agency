import fs from "node:fs";
import path from "node:path";

function badUtf8(buf) {
  let i = 0;
  const bad = [];
  while (i < buf.length) {
    const c = buf[i];
    if (c <= 0x7f) {
      i++;
      continue;
    }
    if ((c & 0xe0) === 0xc0 && i + 1 < buf.length && (buf[i + 1] & 0xc0) === 0x80) {
      i += 2;
      continue;
    }
    if (
      (c & 0xf0) === 0xe0 &&
      i + 2 < buf.length &&
      (buf[i + 1] & 0xc0) === 0x80 &&
      (buf[i + 2] & 0xc0) === 0x80
    ) {
      i += 3;
      continue;
    }
    if (
      (c & 0xf8) === 0xf0 &&
      i + 3 < buf.length &&
      (buf[i + 1] & 0xc0) === 0x80 &&
      (buf[i + 2] & 0xc0) === 0x80 &&
      (buf[i + 3] & 0xc0) === 0x80
    ) {
      i += 4;
      continue;
    }
    bad.push(i);
    i++;
  }
  return bad;
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(vue|ts|css|mjs)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

for (const f of walk("app")) {
  const b = fs.readFileSync(f);
  const bad = badUtf8(b);
  if (!bad.length) continue;
  const t = new TextDecoder("windows-1252").decode(b);
  fs.writeFileSync(f, t, "utf8");
  console.log("fixed", f, bad.length);
}

// Always re-emit index.vue as UTF-8 via TextEncoder to kill BOM/oddness
const index = "app/pages/index.vue";
const raw = fs.readFileSync(index);
let text;
try {
  text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
} catch {
  text = new TextDecoder("windows-1252").decode(raw);
}
fs.writeFileSync(index, text, { encoding: "utf8" });
console.log("rewrote", index, "bogota?", /Bogot/.test(text));
