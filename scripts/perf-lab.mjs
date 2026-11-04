import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:3000/";
const mobile = process.argv.includes("--mobile");

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext(
  mobile
    ? {
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      }
    : { viewport: { width: 1365, height: 900 } },
);

const page = await context.newPage();

await page.addInitScript(() => {
  window.__perfLab = {
    lcp: null,
    cls: 0,
    inp: null,
  };

  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) window.__perfLab.lcp = last.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch (_) {}

  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__perfLab.cls += entry.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  } catch (_) {}

  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const delay =
          entry.processingStart != null
            ? entry.processingStart - entry.startTime
            : entry.duration;
        if (window.__perfLab.inp == null || delay > window.__perfLab.inp) {
          window.__perfLab.inp = delay;
        }
      }
    }).observe({ type: "event", buffered: true, durationThreshold: 16 });
  } catch (_) {}
});

await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
// Allow late above-the-fold LCP candidates (fonts / hydration) without scrolling —
// scroll would admit below-fold images and inflate LCP in lab.
await page.waitForTimeout(2000);

const metrics = await page.evaluate(() => {
  const nav = performance.getEntriesByType("navigation")[0];
  const paints = Object.fromEntries(
    performance.getEntriesByType("paint").map((p) => [p.name, p.startTime]),
  );
  const resources = performance.getEntriesByType("resource");
  const transfer = resources.reduce((s, r) => s + (r.transferSize || 0), 0);
  const jsBytes = resources
    .filter((r) => r.initiatorType === "script" || /\.js(\?|$)/.test(r.name))
    .reduce((s, r) => s + (r.transferSize || 0), 0);
  const cssBytes = resources
    .filter((r) => r.initiatorType === "link" || /\.css(\?|$)/.test(r.name))
    .reduce((s, r) => s + (r.transferSize || 0), 0);
  const imgBytes = resources
    .filter(
      (r) =>
        r.initiatorType === "img" ||
        /\.(webp|png|jpe?g|svg|avif)(\?|$)/i.test(r.name),
    )
    .reduce((s, r) => s + (r.transferSize || 0), 0);

  let lcp = window.__perfLab?.lcp ?? null;
  const lcpEntries = performance.getEntriesByType("largest-contentful-paint");
  if (lcpEntries.length) {
    lcp = lcpEntries[lcpEntries.length - 1].startTime;
  }

  return {
    url: location.href,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    fcp: paints["first-contentful-paint"] ?? null,
    lcp,
    cls: Number((window.__perfLab?.cls ?? 0).toFixed(4)),
    inpSampleMs: window.__perfLab?.inp ?? null,
    ttfb: nav?.responseStart ?? null,
    domContentLoaded: nav?.domContentLoadedEventEnd ?? null,
    loadEvent: nav?.loadEventEnd ?? null,
    resourceCount: resources.length,
    transferKB: Math.round(transfer / 1024),
    jsKB: Math.round(jsBytes / 1024),
    cssKB: Math.round(cssBytes / 1024),
    imgKB: Math.round(imgBytes / 1024),
  };
});

console.log(JSON.stringify(metrics, null, 2));
await browser.close();
