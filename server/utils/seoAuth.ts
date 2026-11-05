import type { H3Event } from "h3";

export function assertSeoDashboardAccess(event: H3Event) {
  const config = useRuntimeConfig();
  // Prefer runtime env so Vercel/local can rotate without rebuild.
  const expected = String(
    process.env.SEO_DASHBOARD_TOKEN ||
      process.env.NUXT_SEO_DASHBOARD_TOKEN ||
      config.seoDashboardToken ||
      "",
  ).trim();
  if (!expected) {
    throw createError({
      statusCode: 503,
      statusMessage:
        "SEO dashboard deshabilitado: configura SEO_DASHBOARD_TOKEN",
    });
  }
  const header = getHeader(event, "x-seo-token") || "";
  const query = getQuery(event);
  const q = typeof query.token === "string" ? query.token : "";
  const token = header || q;
  if (token !== expected) {
    throw createError({ statusCode: 401, statusMessage: "No autorizado" });
  }
}
