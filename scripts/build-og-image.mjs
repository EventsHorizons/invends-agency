/**
 * Builds a branded Open Graph / Twitter share image for Invends.
 * Output: public/images/og-invends.png (1200×630)
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "images", "og-invends.png");
const logoSvg = readFileSync(
  path.join(root, "public", "images", "logo.svg"),
  "utf8",
).replaceAll('fill="currentColor"', 'fill="#f7f5ff"');

const W = 1200;
const H = 630;

const logoPng = await sharp(Buffer.from(logoSvg))
  .resize({
    width: 420,
    height: 96,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

const svgBg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090711"/>
      <stop offset="45%" stop-color="#1a0f3a"/>
      <stop offset="78%" stop-color="#4b28b5"/>
      <stop offset="100%" stop-color="#ff2daa"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#b8a6ff" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#6d45ea" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#090711" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#090711"/>
  <rect width="${W}" height="${H}" fill="url(#g)" opacity="0.92"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="72" y="392" fill="#f7f5ff" font-family="Geist, Arial, sans-serif" font-size="54" font-weight="700" letter-spacing="-1.2">Presencia que decide.</text>
  <text x="72" y="448" fill="#b8a6ff" font-family="Geist, Arial, sans-serif" font-size="26" font-weight="600" letter-spacing="2.4">DISEÑO · CÓDIGO · MENSAJE</text>
  <text x="72" y="560" fill="#f7f5ff" fill-opacity="0.62" font-family="Geist, Arial, sans-serif" font-size="20" letter-spacing="0.4">Agencia de diseño web, desarrollo y marketing · Bogotá / LATAM</text>
</svg>`);

await sharp(svgBg)
  .composite([{ input: logoPng, left: 72, top: 72 }])
  .png({ quality: 92 })
  .toFile(out);

console.log("wrote", out);
