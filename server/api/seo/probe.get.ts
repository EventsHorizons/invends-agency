import { assertSeoDashboardAccess } from "../../utils/seoAuth";
import { DEFAULT_SITE_URL } from "~/utils/seo";

/**
 * Live probe of critical URLs (on-demand). Does not invent ranking metrics.
 */
export default defineEventHandler(async (event) => {
  assertSeoDashboardAccess(event);
  const config = useRuntimeConfig();
  const site = String(config.public.siteUrl || DEFAULT_SITE_URL).replace(
    /\/$/,
    "",
  );
  const paths = [
    "/",
    "/robots.txt",
    "/sitemap.xml",
    "/servicios",
    "/servicios/diseno-web",
    "/blog",
    "/contacto",
  ];

  const results = [];
  for (const path of paths) {
    const url = path === "/" ? site : `${site}${path}`;
    const started = Date.now();
    try {
      const res = await fetch(url, {
        headers: {
          "user-agent": "InvendsSeoDashboard/1.0",
        },
        redirect: "manual",
      });
      results.push({
        path,
        url,
        status: res.status,
        ok: res.status >= 200 && res.status < 400,
        ms: Date.now() - started,
      });
    } catch (err) {
      results.push({
        path,
        url,
        status: 0,
        ok: false,
        ms: Date.now() - started,
        error: String((err as Error)?.message || err),
      });
    }
  }

  return {
    probedAt: new Date().toISOString(),
    site,
    results,
    source: "live-http",
  };
});
