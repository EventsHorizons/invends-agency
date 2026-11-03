/**
 * Download CLEAN Magnific free assets via official /api/regular/download
 * (downloadscdn* URLs — no watermark). Replace all site WebPs.
 *
 * Resumable via scripts/magnific-clean-done.json.
 * Handles: 429 rate limits (~2–3 files), DNS/network blips, CDN retries.
 */
import { mkdir, writeFile, readdir, unlink } from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "images");
const donePath = join(root, "scripts", "magnific-clean-done.json");
const selection = JSON.parse(
  readFileSync(join(root, "scripts", "magnific-selection.json"), "utf8"),
);

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isTransient(err) {
  const code = err?.cause?.code || err?.code || "";
  const msg = String(err?.message || err);
  return (
    /ENOTFOUND|ECONNRESET|ETIMEDOUT|EAI_AGAIN|UND_ERR|fetch failed|network/i.test(
      `${code} ${msg}`,
    )
  );
}

async function resilientFetch(url, options = {}, attempt = 1) {
  try {
    return await fetch(url, options);
  } catch (err) {
    if (!isTransient(err) || attempt > 8) throw err;
    const wait = Math.min(120_000, 5_000 * attempt);
    console.warn(`network ${url.slice(0, 60)}… ${err.cause?.code || err.message}; wait ${wait}ms`);
    await sleep(wait);
    return resilientFetch(url, options, attempt + 1);
  }
}

async function getCleanDownloadUrl(resourceId, attempt = 1) {
  const qs = new URLSearchParams({
    resource: String(resourceId),
    locale: "en",
  });
  const res = await resilientFetch(
    `https://www.magnific.com/api/regular/download?${qs}`,
    {
      headers: {
        "User-Agent": UA,
        Accept: "application/json",
        Referer: "https://www.magnific.com/",
      },
    },
  );
  const text = await res.text();
  if (res.status === 429 || res.status === 403) {
    if (attempt > 15) {
      throw new Error(`download API ${resourceId}: HTTP ${res.status} after retries`);
    }
    const wait = 130_000;
    console.warn(`rate-limit ${resourceId}, wait ${wait}ms (try ${attempt})`);
    await sleep(wait);
    return getCleanDownloadUrl(resourceId, attempt + 1);
  }
  if (!res.ok) {
    throw new Error(`download API ${resourceId}: HTTP ${res.status} ${text.slice(0, 200)}`);
  }
  const data = JSON.parse(text);
  if (!data.url || !String(data.url).includes("downloadscdn")) {
    throw new Error(
      `download API ${resourceId}: missing downloadscdn url → ${text.slice(0, 240)}`,
    );
  }
  return data;
}

async function fetchBuffer(url, attempt = 1) {
  try {
    const res = await resilientFetch(url, {
      headers: {
        "User-Agent": UA,
        Referer: "https://www.magnific.com/",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      },
    });
    if (!res.ok) {
      const err = new Error(`CDN HTTP ${res.status}`);
      err.status = res.status;
      throw err;
    }
    return Buffer.from(await res.arrayBuffer());
  } catch (err) {
    if (attempt > 5) throw err;
    if (isTransient(err) || /CDN HTTP 5/.test(String(err.message))) {
      await sleep(8_000 * attempt);
      return fetchBuffer(url, attempt + 1);
    }
    throw err;
  }
}

async function toWebp(buf, dest) {
  await sharp(buf)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .modulate({ brightness: 0.98, saturation: 0.88, hue: -4 })
    .linear(0.98, -2)
    .webp({ quality: 84 })
    .toFile(dest);
}

async function processOne(entry) {
  const id = entry.pick.id;
  let meta;
  let buf;
  // Fresh signed URL immediately before CDN GET — tokens expire if we wait on 429.
  for (let attempt = 1; attempt <= 6; attempt++) {
    meta = await getCleanDownloadUrl(id);
    try {
      buf = await fetchBuffer(meta.url);
      break;
    } catch (err) {
      // 403 = expired/invalid token → mint a new signed URL
      if (err.status === 403 || /CDN HTTP 403/.test(String(err.message))) {
        console.warn(`CDN 403 ${entry.key}, refresh token (try ${attempt})`);
        await sleep(3_000 * attempt);
        continue;
      }
      throw err;
    }
  }
  if (!buf) throw new Error(`${entry.key}: CDN 403 persisted after token refresh`);
  if (buf.length < 80_000) {
    throw new Error(
      `${entry.key}: suspiciously small download (${buf.length} B) — likely preview`,
    );
  }
  const dest = join(outDir, entry.file);
  await mkdir(dirname(dest), { recursive: true });
  await toWebp(buf, dest);
  const info = await sharp(dest).metadata();
  console.log(
    "CLEAN",
    entry.file,
    `${info.width}x${info.height}`,
    `${Math.round(buf.length / 1024)}KB→webp`,
    entry.pick.author,
  );
  return {
    ...entry,
    download: {
      filename: meta.filename,
      cleanUrlHost: new URL(meta.url).host,
      bytes: buf.length,
    },
  };
}

function loadDone() {
  if (!existsSync(donePath)) return new Set();
  return new Set(JSON.parse(readFileSync(donePath, "utf8")));
}

async function saveDone(done) {
  await writeFile(donePath, JSON.stringify([...done], null, 2), "utf8");
}

const DONE = loadDone();
const results = [];
const errors = [];
let sincePause = 0;

for (const entry of selection) {
  const dest = join(outDir, entry.file);
  if (DONE.has(entry.key) && existsSync(dest)) {
    console.log("SKIP", entry.file);
    results.push({ ...entry, skipped: true });
    continue;
  }
  try {
    const r = await processOne(entry);
    results.push(r);
    DONE.add(entry.key);
    await saveDone(DONE);
    sincePause += 1;
    // Anonymous free limit: ~2–3 downloads then throttle
    if (sincePause >= 2) {
      console.log("cooling 130s…");
      await sleep(130_000);
      sincePause = 0;
    } else {
      await sleep(4_000);
    }
  } catch (err) {
    console.error("FAIL", entry.key, err.message || err);
    errors.push({ key: entry.key, error: String(err.message || err) });
    // Don't abort the whole run — cool down and continue
    await sleep(60_000);
    sincePause = 0;
  }
}

const attr = [
  "# Image attributions — Invends",
  "",
  "All images below are **clean free downloads from [Magnific](https://www.magnific.com/)** (formerly Freepik),",
  "obtained via the official download endpoint (`/api/regular/download` → `downloadscdn*.magnific.com`).",
  "**No watermarked CDN previews** (`img.magnific.com` preview URLs) are used in production.",
  "Free license requires attribution (e.g. designed by the author / Magnific).",
  "",
];

const reportEntries = selection.map((entry) => {
  const found = results.find((r) => r.key === entry.key && r.download);
  return found || entry;
});

for (const r of reportEntries) {
  const a = r.pick;
  attr.push(`## \`${r.file}\``);
  attr.push(`- Use: ${r.note}`);
  if (r.reason) attr.push(`- Art direction: ${r.reason}`);
  attr.push(`- Alt: ${r.alt}`);
  attr.push(
    `- Author: [${a.author}](https://www.magnific.com/author/${a.authorSlug})`,
  );
  attr.push(`- Page: ${a.url}`);
  attr.push(`- Resource id: ${a.id}`);
  if (r.download) {
    attr.push(`- Clean CDN host: ${r.download.cleanUrlHost}`);
    attr.push(`- Source bytes: ${r.download.bytes}`);
  } else if (DONE.has(r.key)) {
    attr.push(`- Clean download: yes (resumed prior run)`);
  } else {
    attr.push(`- Clean download: PENDING`);
  }
  attr.push(`- License: Magnific Free (attribution required)`);
  attr.push("");
}

await writeFile(join(outDir, "ATTRIBUTIONS.md"), attr.join("\n"), "utf8");
await writeFile(
  join(root, "scripts", "magnific-clean-selection.json"),
  JSON.stringify({ results, errors, done: [...DONE] }, null, 2),
  "utf8",
);

const KEEP = new Set([
  "logo-mark.svg",
  "logo-white.jpg",
  "logo-black.jpg",
  "ATTRIBUTIONS.md",
]);
const orphans = [];
async function walk(dir, rel = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const name = e.name;
    const full = join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    if (e.isDirectory()) {
      if (name === "_magnific_tmp") {
        const kids = await readdir(full);
        for (const k of kids) await unlink(join(full, k)).catch(() => {});
        continue;
      }
      await walk(full, r);
      continue;
    }
    if (KEEP.has(name)) continue;
    if (/\.(jpg|jpeg|png)$/i.test(name)) {
      orphans.push(r);
      await unlink(full);
    }
  }
}
await walk(outDir);

console.log("---");
console.log("clean done:", DONE.size, "/", selection.length);
console.log("errors:", errors.length, errors);
console.log("removed orphan stock files:", orphans.length);
if (DONE.size < selection.length || errors.length) {
  process.exitCode = 2;
}
