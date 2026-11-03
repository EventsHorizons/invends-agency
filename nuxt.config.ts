// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-10-29",
  // Floating Nuxt DevTools button off — keeps the chrome clean for brand review
  devtools: { enabled: false },
  css: [
    "non.geist",
    "non.geist/italic",
    "~/assets/css/main.css",
  ],
  app: {
    head: {
      titleTemplate: "%s",
      title: "Invends",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          name: "description",
          content:
            "Invends — design-driven creative studio for branding, digital and communications.",
        },
        { property: "og:site_name", content: "Invends" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex,nofollow" },
        { name: "theme-color", content: "#090711" },
      ],
      htmlAttrs: { lang: "es" },
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
      // Apply theme before first paint to avoid FOUC
      script: [
        {
          key: "theme-boot",
          children: `(function(){try{var k='invends-theme';var s=localStorage.getItem(k)||localStorage.getItem('3drawers-theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;if(s==='light'||s==='dark')localStorage.setItem(k,s);}catch(e){}})();`,
          tagPosition: "head",
        },
      ],
    },
  },
  runtimeConfig: {
    // Prefer plain names on Vercel; NUXT_* also works via Nitro overrides.
    resendApiKey: process.env.RESEND_API_KEY || "",
    contactTo: process.env.CONTACT_TO || "hola@invends.com",
    contactFrom:
      process.env.CONTACT_FROM || "Invends <onboarding@resend.dev>",
    public: {
      brandName: "Invends",
    },
  },
  routeRules: {
    "/services": { redirect: "/servicios" },
    "/work": { redirect: "/portafolio" },
    "/contact": { redirect: "/contacto" },
    "/team": { redirect: "/about-us/equipo" },
    "/policy": { redirect: "/politicas-de-privacidad" },
    "/press": { redirect: "/blog" },
    "/en/services": { redirect: "/en/servicios" },
    "/en/work": { redirect: "/en/portafolio" },
    "/en/contact": { redirect: "/en/contacto" },
    "/en/about": { redirect: "/en/sobre-nosotros" },
  },
});
