/**
 * Optional API integrations. Never invents data when credentials are missing.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT_DIR } from "./config.mjs";

export function integrationStatus() {
  const has = (key) => Boolean(String(process.env[key] || "").trim());
  return {
    pagespeed: has("PAGESPEED_API_KEY") || has("PSI_API_KEY"),
    gsc: has("GSC_SERVICE_ACCOUNT_JSON") || has("GOOGLE_APPLICATION_CREDENTIALS"),
    ga4: has("GA4_PROPERTY_ID") && (has("GA4_SERVICE_ACCOUNT_JSON") || has("GOOGLE_APPLICATION_CREDENTIALS")),
    bing: has("BING_WEBMASTER_API_KEY"),
    siteUrl: process.env.SEO_SITE_URL || process.env.NUXT_PUBLIC_SITE_URL || null,
  };
}

function loadServiceAccount(envKey) {
  const raw = process.env[envKey];
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      if (existsSync(raw)) return JSON.parse(readFileSync(raw, "utf8"));
    }
  }
  const gac = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (gac && existsSync(resolve(ROOT_DIR, gac))) {
    return JSON.parse(readFileSync(resolve(ROOT_DIR, gac), "utf8"));
  }
  if (gac && existsSync(gac)) return JSON.parse(readFileSync(gac, "utf8"));
  return null;
}

export async function fetchPageSpeed(url, strategy = "mobile") {
  const key = process.env.PAGESPEED_API_KEY || process.env.PSI_API_KEY || "";
  const endpoint = new URL(
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
  );
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.set("category", "performance");
  if (key) endpoint.searchParams.set("key", key);

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      return {
        available: false,
        status: res.status,
        error: `PSI HTTP ${res.status}`,
        strategy,
        url,
      };
    }
    const data = await res.json();
    const lhr = data.lighthouseResult;
    const audits = lhr?.audits || {};
    const categories = lhr?.categories || {};
    return {
      available: true,
      strategy,
      url,
      performanceScore: categories.performance?.score ?? null,
      lcp: audits["largest-contentful-paint"]?.numericValue ?? null,
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      inp:
        audits["interaction-to-next-paint"]?.numericValue ??
        audits["experimental-interaction-to-next-paint"]?.numericValue ??
        null,
      ttfb: audits["server-response-time"]?.numericValue ?? null,
      fetchedAt: new Date().toISOString(),
      source: "pagespeedinsights.v5",
    };
  } catch (err) {
    return {
      available: false,
      error: String(err?.message || err),
      strategy,
      url,
    };
  }
}

/**
 * GSC search analytics — requires service account with site access.
 * Returns { available:false } when not configured (never fake rows).
 */
export async function fetchGscSearchAnalytics({ startDate, endDate, rowLimit = 25 } = {}) {
  const status = integrationStatus();
  if (!status.gsc) {
    return {
      available: false,
      reason: "missing_credentials",
      setup: "docs/seo/INTEGRATIONS_SETUP.md#google-search-console",
    };
  }

  // Full OAuth/JWT flow is documented; placeholder keeps engine honest.
  // When credentials exist, a follow-up can wire googleapis without shipping secrets.
  const sa = loadServiceAccount("GSC_SERVICE_ACCOUNT_JSON");
  if (!sa) {
    return {
      available: false,
      reason: "unreadable_service_account",
      setup: "docs/seo/INTEGRATIONS_SETUP.md#google-search-console",
    };
  }

  return {
    available: false,
    reason: "client_not_wired_pending_secret_install",
    note:
      "Service account detectada. Instalar `googleapis` y conceder acceso a la propiedad en GSC para activar filas reales. No se inventan consultas.",
    siteUrl: process.env.GSC_SITE_URL || process.env.NUXT_PUBLIC_SITE_URL,
    window: { startDate, endDate, rowLimit },
  };
}

export async function fetchGa4Summary() {
  const status = integrationStatus();
  if (!status.ga4) {
    return {
      available: false,
      reason: "missing_credentials",
      setup: "docs/seo/INTEGRATIONS_SETUP.md#google-analytics-4",
    };
  }
  return {
    available: false,
    reason: "client_not_wired_pending_secret_install",
    note: "Credenciales detectadas parcialmente. Conectar Analytics Data API para sesiones orgánicas reales.",
  };
}
