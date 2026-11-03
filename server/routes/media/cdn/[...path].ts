/**
 * Proxies legacy Prismic assets without exposing the upstream repo name in page URLs.
 * Public paths use a neutral token that maps back to the real filename segment.
 */
const UPSTREAM = "https://images.prismic.io/monopolondon/";
const PUBLIC_TOKEN = /xagency/gi;

export default defineEventHandler(async (event) => {
  const pathParam = event.context.params?.path;
  const parts = Array.isArray(pathParam)
    ? pathParam
    : String(pathParam || "")
        .split("/")
        .filter(Boolean);

  if (!parts.length) {
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  }

  const rawPath = parts.join("/");
  const upstreamPath = rawPath.replace(PUBLIC_TOKEN, "monopo");
  const query = getRequestURL(event).search || "";
  const target = `${UPSTREAM}${upstreamPath}${query}`;

  try {
    const res = await fetch(target, {
      headers: { Accept: "*/*" },
      redirect: "follow",
    });
    if (!res.ok) {
      throw createError({
        statusCode: res.status,
        statusMessage: "Upstream media error",
      });
    }

    const contentType = res.headers.get("content-type") || "application/octet-stream";
    const cacheControl =
      res.headers.get("cache-control") || "public, max-age=86400, immutable";
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", cacheControl);

    return Buffer.from(await res.arrayBuffer());
  } catch (err: unknown) {
    if (err && typeof err === "object" && "statusCode" in err) throw err;
    throw createError({ statusCode: 502, statusMessage: "Media proxy failed" });
  }
});
