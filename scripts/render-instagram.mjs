import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const templatesDir = path.join(root, "social", "instagram", "templates");
const outDir = path.join(root, "social", "instagram", "week-01");

const IDS = Array.from({ length: 14 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 1,
});

const report = [];

for (const id of IDS) {
  const htmlPath = path.join(templatesDir, `${id}.html`);
  const url = pathToFileURL(htmlPath).href;
  await page.goto(url, { waitUntil: "networkidle" });
  // Allow fonts to settle
  await page.waitForTimeout(250);
  const outPath = path.join(outDir, `invends-ig-${id}.png`);
  await page.screenshot({
    path: outPath,
    type: "png",
    clip: { x: 0, y: 0, width: 1080, height: 1350 },
  });
  const meta = await sharp(outPath).metadata();
  report.push({
    id,
    file: path.basename(outPath),
    width: meta.width,
    height: meta.height,
    ok: meta.width === 1080 && meta.height === 1350,
  });
  console.log(
    `${id} → ${path.basename(outPath)} (${meta.width}×${meta.height})`,
  );
}

await browser.close();

await writeFile(
  path.join(outDir, "qa-dimensions.json"),
  JSON.stringify(report, null, 2),
  "utf8",
);

const failed = report.filter((r) => !r.ok);
if (failed.length) {
  console.error("Dimension QA failed:", failed);
  process.exit(1);
}
console.log(`Done: ${report.length} PNGs in ${outDir}`);
