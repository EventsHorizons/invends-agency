import { SITE_URL, FALLBACK_SITE_URL, abs } from "./config.mjs";

const DEFAULT_TIMEOUT = 25_000;

export async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    opts.timeout ?? DEFAULT_TIMEOUT,
  );
  try {
    const res = await fetch(url, {
      ...opts,
      signal: controller.signal,
      headers: {
        "user-agent":
          "InvendsSeoEngine/1.0 (+https://invends.com; seo-health-check)",
        accept: opts.accept || "*/*",
        ...(opts.headers || {}),
      },
      redirect: opts.redirect || "manual",
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Try canonical site first; if DNS/network fails, try Vercel fallback.
 */
export async function resolveBaseUrl() {
  for (const base of [SITE_URL, FALLBACK_SITE_URL]) {
    if (!base) continue;
    try {
      const res = await fetchWithTimeout(abs(base, "/robots.txt"), {
        timeout: 12_000,
      });
      if (res.status > 0 && res.status < 500) {
        return { base, status: res.status, source: base === SITE_URL ? "canonical" : "fallback" };
      }
    } catch (err) {
      // continue
    }
  }
  return { base: SITE_URL, status: 0, source: "unreachable", error: true };
}

export async function checkUrl(base, path) {
  const url = abs(base, path);
  const started = Date.now();
  try {
    const res = await fetchWithTimeout(url);
    const ms = Date.now() - started;
    const location = res.headers.get("location") || null;
    let bodySnippet = "";
    if (path === "/robots.txt" || path === "/sitemap.xml" || res.status >= 400) {
      try {
        bodySnippet = (await res.text()).slice(0, 400);
      } catch {
        bodySnippet = "";
      }
    }
    return {
      path,
      url,
      status: res.status,
      ok: res.status >= 200 && res.status < 400,
      ms,
      location,
      bodySnippet,
    };
  } catch (err) {
    return {
      path,
      url,
      status: 0,
      ok: false,
      ms: Date.now() - started,
      error: err?.name === "AbortError" ? "timeout" : String(err?.message || err),
    };
  }
}

export async function extractInternalLinks(base, path) {
  const url = abs(base, path);
  try {
    const res = await fetchWithTimeout(url, { accept: "text/html" });
    if (!res.ok) return { path, url, status: res.status, links: [], error: "http" };
    const html = await res.text();
    const links = new Set();
    const re = /href=["']([^"'#]+)["']/gi;
    let m;
    while ((m = re.exec(html))) {
      let href = m[1].trim();
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (href.startsWith("http")) {
        try {
          const u = new URL(href);
          const b = new URL(base);
          if (u.origin !== b.origin && !u.hostname.includes("vercel.app")) continue;
          href = u.pathname;
        } catch {
          continue;
        }
      }
      if (!href.startsWith("/")) continue;
      // strip query
      href = href.split("?")[0];
      if (href.length > 1 && href.endsWith("/")) href = href.slice(0, -1);
      links.add(href || "/");
    }
    return { path, url, status: res.status, links: [...links] };
  } catch (err) {
    return { path, url, status: 0, links: [], error: String(err?.message || err) };
  }
}
