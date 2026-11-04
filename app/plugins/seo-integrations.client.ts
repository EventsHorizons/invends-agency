/**
 * Loads GA4 only when NUXT_PUBLIC_GA_ID is configured.
 * Search Console verification meta is injected when NUXT_PUBLIC_GSC_VERIFICATION is set.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const gaId = String(config.public.gaId || "").trim();
  const gsc = String(config.public.gscVerification || "").trim();

  if (gsc) {
    useHead({
      meta: [{ name: "google-site-verification", content: gsc }],
    });
  }

  if (!gaId || !import.meta.client) return;

  useHead({
    script: [
      {
        key: "ga4-src",
        src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
        async: true,
      },
      {
        key: "ga4-boot",
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`,
      },
    ],
  });
});
