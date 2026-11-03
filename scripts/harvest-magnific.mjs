/**
 * Harvest Magnific free-photo search results via Chrome + puppeteer-core.
 * Source: https://www.magnific.com/ (formerly Freepik)
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const chrome =
  process.env.CHROME_PATH ||
  "C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe";

const QUERIES = {
  "svc-diseno-web": "website wireframe ux ui design desk laptop",
  "svc-branding": "branding stationery business cards logo mockup desk",
  "svc-desarrollo-web": "software developer coding laptop screen code",
  "svc-aplicaciones": "mobile app ui smartphone interface hands",
  "svc-ecommerce": "ecommerce online shopping checkout smartphone",
  "svc-seo": "seo analytics search ranking dashboard laptop",
  "svc-marketing": "digital marketing creative campaign moodboard",
  "svc-ia": "artificial intelligence technology neural network",
  "svc-automatizacion": "automation workflow digital process technology",
  "svc-migracion": "cloud server data center technology migration",
  "svc-mvp": "startup team prototype whiteboard product planning",
  "principle-diseno": "graphic design desk creative tools studio",
  "principle-desarrollo": "programming developer dark code screen",
  "principle-marketing": "brand strategy marketing content planning",
  "project-editorial": "editorial magazine website laptop reading typography",
  "project-landing-producto": "product landing page website mockup laptop",
  "project-lanzamiento-marca": "brand launch identity packaging design",
  "project-landing-servicio": "professional services website laptop office",
  "project-institucional": "corporate architecture modern building facade",
  "project-contenido": "content creation photography studio camera lighting",
  "blog-conversion": "website analytics conversion metrics laptop",
  "blog-brief": "creative brief notebook planning desk meeting",
  "blog-contenido-vende": "copywriting content marketing writing desk",
  "blog-desarrollo-ux": "ux design prototype mobile wireframe tablet",
  "blog-tres-oficios": "creative team collaboration design office meeting",
};

function searchUrl(term) {
  const q = encodeURIComponent(term);
  return `https://www.magnific.com/search?format=search&last_filter=selection&last_value=1&query=${q}&selection=1&type=photo`;
}

async function harvestPage(page, term) {
  await page.goto(searchUrl(term), { waitUntil: "networkidle2", timeout: 90000 });
  await page.waitForFunction(
    () => {
      const el = document.getElementById("__NEXT_DATA__");
      if (!el) return false;
      try {
        const j = JSON.parse(el.textContent);
        return (j.props?.pageProps?.regularList?.items?.length || 0) > 0;
      } catch {
        return false;
      }
    },
    { timeout: 45000 },
  );
  return page.evaluate(() => {
    const j = JSON.parse(document.getElementById("__NEXT_DATA__").textContent);
    const items = j.props.pageProps.regularList.items || [];
    return items
      .filter((i) => !i.premium && i.preview?.url)
      .slice(0, 12)
      .map((i) => ({
        id: i.id,
        name: i.name,
        author: i.author?.name || "magnific",
        authorSlug: i.author?.slug || "magnific",
        url: i.url,
        cdn: i.preview.url,
        isAIGenerated: !!i.isAIGenerated,
      }));
  });
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--lang=en-US"],
});

const page = await browser.newPage();
await page.setUserAgent(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
);
await page.setViewport({ width: 1400, height: 900 });

// Accept cookies once on landing
await page.goto("https://www.magnific.com/photos", { waitUntil: "domcontentloaded", timeout: 60000 });
try {
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) =>
      /Accept All Cookies/i.test(b.textContent || ""),
    );
    btn?.click();
  });
} catch {
  /* ignore */
}

const harvest = {};
for (const [key, term] of Object.entries(QUERIES)) {
  process.stdout.write(`search ${key}… `);
  try {
    harvest[key] = await harvestPage(page, term);
    console.log(harvest[key].length);
  } catch (e) {
    console.log("FAIL", e.message);
    harvest[key] = { error: e.message };
  }
}

const out = join(root, "scripts", "magnific-picks.json");
writeFileSync(out, JSON.stringify(harvest, null, 2));
await browser.close();
console.log("wrote", out);
