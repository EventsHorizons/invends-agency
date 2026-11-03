/**
 * Harvest Magnific free photos for Invends art direction.
 * Queries are service-specific + editorial/cool tone; not generic "tech".
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const chrome =
  process.env.CHROME_PATH ||
  "C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe";

/** Brand-aligned search briefs — subject + lighting + material language */
const QUERIES = {
  "svc-diseno-web":
    "ui ux interface wireframe tablet dark desk editorial cool lighting",
  "svc-branding":
    "brand identity stationery typography system mockup dark purple soft light",
  "svc-desarrollo-web":
    "website product mockup laptop clean interface dark studio editorial",
  "svc-aplicaciones":
    "mobile app interface smartphone closeup dark background product shot",
  "svc-ecommerce":
    "ecommerce product page checkout phone elegant dark creative studio",
  "svc-seo":
    "search analytics dashboard laptop dark desk cool blue violet light",
  "svc-marketing":
    "creative advertising campaign moodboard desk editorial photography",
  "svc-ia":
    "ai workflow interface abstract neural soft violet dark editorial",
  "svc-automatizacion":
    "digital workflow automation dashboard nodes dark desk soft light",
  "svc-migracion":
    "legacy to modern software migration code screen dark office editorial",
  "svc-mvp":
    "product prototype whiteboard sticky notes dark creative studio",
  "principle-diseno":
    "graphic design tools desk typography rulers dark editorial",
  "principle-desarrollo":
    "developer coding laptop dark room cool ambient light",
  "principle-marketing":
    "content strategy sticky notes campaign board dark creative desk",
  "project-editorial":
    "editorial magazine layout typography desk dark soft light",
  "project-landing-producto":
    "saas product landing page mockup laptop dark studio",
  "project-lanzamiento-marca":
    "brand launch packaging identity kit dark violet soft light",
  "project-landing-servicio":
    "professional service website mockup laptop dark desk",
  "project-institucional":
    "modern glass architecture facade cool evening violet sky",
  "project-contenido":
    "content studio camera lighting softbox dark creative set",
  "blog-conversion":
    "conversion funnel analytics screen dark desk editorial",
  "blog-brief":
    "creative brief notebook pen desk dark soft ambient light",
  "blog-contenido-vende":
    "copywriting desk laptop notes dark editorial photography",
  "blog-desarrollo-ux":
    "ux prototype paper wireframe tablet dark desk cool light",
  "blog-tres-oficios":
    "creative team collaboration desk dark studio editorial",
};

function searchUrl(term) {
  return `https://www.magnific.com/search?format=search&last_filter=selection&last_value=1&query=${encodeURIComponent(term)}&selection=1&type=photo`;
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--lang=en-US"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900 });
await page.goto("https://www.magnific.com/photos", {
  waitUntil: "domcontentloaded",
  timeout: 60000,
});
try {
  await page.evaluate(() => {
    [...document.querySelectorAll("button")]
      .find((b) => /Accept All Cookies/i.test(b.textContent || ""))
      ?.click();
  });
} catch {
  /* ignore */
}

const harvest = {};
for (const [key, term] of Object.entries(QUERIES)) {
  process.stdout.write(`search ${key}… `);
  try {
    await page.goto(searchUrl(term), {
      waitUntil: "networkidle2",
      timeout: 90000,
    });
    await page.waitForFunction(
      () => {
        try {
          const j = JSON.parse(
            document.getElementById("__NEXT_DATA__").textContent,
          );
          return (j.props?.pageProps?.regularList?.items?.length || 0) > 0;
        } catch {
          return false;
        }
      },
      { timeout: 45000 },
    );
    harvest[key] = await page.evaluate(() => {
      const j = JSON.parse(
        document.getElementById("__NEXT_DATA__").textContent,
      );
      return (j.props.pageProps.regularList.items || [])
        .filter((i) => !i.premium && i.preview?.url)
        .slice(0, 14)
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
    console.log(harvest[key].length);
  } catch (e) {
    console.log("FAIL", e.message);
    harvest[key] = { error: e.message };
  }
}

const out = join(root, "scripts", "magnific-brand-picks.json");
writeFileSync(out, JSON.stringify(harvest, null, 2));
await browser.close();
console.log("wrote", out);
