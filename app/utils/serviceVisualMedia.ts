/** Poster still → looping MP4 for service / pillar reel visuals. */
const MOTION_BY_POSTER: Record<string, string> = {
  "/images/services/svc-diseno-web.webp":
    "/images/services/motion/svc-diseno-web.mp4",
  "/images/services/svc-branding.webp":
    "/images/services/motion/svc-branding.mp4",
  "/images/services/svc-desarrollo-web.webp":
    "/images/services/motion/svc-desarrollo-web.mp4",
  "/images/services/svc-aplicaciones.webp":
    "/images/services/motion/svc-aplicaciones.mp4",
  "/images/services/svc-ecommerce.webp":
    "/images/services/motion/svc-ecommerce.mp4",
  "/images/services/svc-seo.webp": "/images/services/motion/svc-seo.mp4",
  "/images/services/svc-marketing.webp":
    "/images/services/motion/svc-marketing.mp4",
  "/images/services/svc-ia.webp": "/images/services/motion/svc-ia.mp4",
  "/images/services/svc-automatizacion.webp":
    "/images/services/motion/svc-automatizacion.mp4",
  "/images/services/svc-migracion-art.webp":
    "/images/services/motion/svc-migracion-art.mp4",
  "/images/services/svc-mvp-art.webp":
    "/images/services/motion/svc-mvp-art.mp4",
  "/images/principle-diseno.webp": "/images/motion/principle-diseno.mp4",
  "/images/principle-desarrollo.webp":
    "/images/motion/principle-desarrollo.mp4",
  "/images/principle-marketing.webp":
    "/images/motion/principle-marketing.mp4",
};

export function motionSrcForPoster(poster: string): string | undefined {
  return MOTION_BY_POSTER[poster];
}
