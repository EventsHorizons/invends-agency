import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const inv = JSON.parse(
  readFileSync(join(root, "scripts", "art-direction-inventory.json"), "utf8"),
);
const sel = JSON.parse(
  readFileSync(join(root, "scripts", "magnific-selection.json"), "utf8"),
);
const byKey = Object.fromEntries(sel.map((s) => [s.key, s]));

const lines = [
  "# Image attributions — Invends",
  "",
  "Mixed sources under one art direction (cool editorial / digital craft / brand tokens `#090711` · `#8A68FF` · `#B8A6FF`).",
  "",
  "## Magnific free downloads (clean)",
  "Obtained via official `/api/regular/download` → `downloadscdn*.magnific.com` (not watermarked CDN previews).",
  "License: Magnific Free — attribution required.",
  "",
  "## Generated originals",
  "Created with Cursor GenerateImage for slots blocked by Magnific anonymous rate limits (HTTP 429).",
  "Original compositions; no third-party watermark.",
  "",
];

for (const slot of inv.slots) {
  lines.push(`## \`${slot.file}\``);
  lines.push(`- Use: ${slot.service}`);
  lines.push(`- Concept: ${slot.concept}`);
  lines.push(`- Source: ${slot.source}`);
  if (slot.source === "magnific-clean") {
    const p = byKey[slot.key]?.pick;
    if (p) {
      lines.push(
        `- Author: [${p.author}](https://www.magnific.com/author/${p.authorSlug})`,
      );
      lines.push(`- Page: ${p.url}`);
      lines.push(`- Resource id: ${p.id}`);
      lines.push("- License: Magnific Free (attribution required)");
      if (byKey[slot.key]?.alt) lines.push(`- Alt: ${byKey[slot.key].alt}`);
    }
  } else {
    lines.push(`- Prompt: ${slot.prompt}`);
    lines.push("- License: original generation for Invends");
  }
  lines.push("");
}

writeFileSync(join(root, "public", "images", "ATTRIBUTIONS.md"), lines.join("\n"));
writeFileSync(
  join(root, "scripts", "magnific-clean-done.json"),
  JSON.stringify(
    inv.slots.map((s) => s.key),
    null,
    2,
  ),
);
console.log("ATTRIBUTIONS slots", inv.slots.length);

const keep = new Set([
  "logo-mark.svg",
  "logo-white.jpg",
  "logo-black.jpg",
  "ATTRIBUTIONS.md",
]);
const outDir = join(root, "public", "images");

function walk(dir, rel = "") {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    if (statSync(full).isDirectory()) {
      if (name === "_magnific_tmp") {
        for (const k of readdirSync(full)) unlinkSync(join(full, k));
        continue;
      }
      walk(full, r);
      continue;
    }
    if (keep.has(name)) continue;
    if (/\.(jpg|jpeg|png)$/i.test(name)) {
      unlinkSync(full);
      console.log("rm", r);
    }
  }
}
walk(outDir);

// verify all webp paths exist
let missing = 0;
for (const slot of inv.slots) {
  const p = join(outDir, slot.file);
  if (!existsSync(p)) {
    console.log("MISSING FILE", slot.file);
    missing++;
  }
}
console.log("missing files", missing);
