// https://nuxt.com/docs/api/configuration/nuxt-config
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const invendsDevLoadingHtml = readFileSync(
  fileURLToPath(new URL("./app/dev-loading-template.html", import.meta.url)),
  "utf8",
);

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
      ch
    ]!,
  );
}

export default defineNuxtConfig({
  compatibilityDate: "2025-10-29",
  // Floating Nuxt DevTools button off — keeps the chrome clean for brand review
  devtools: { enabled: false },
  // Replace Nuxt mint particle splash during `nuxt dev` cold compile
  devServer: {
    loadingTemplate: ({ loading } = {}) =>
      invendsDevLoadingHtml.replaceAll(
        "{{LOADING}}",
        escapeHtml(loading || "Cargando"),
      ),
  },
  css: [
    "non.geist",
    "non.geist/italic",
    "~/assets/css/main.css",
  ],
  nitro: {
    compressPublicAssets: true,
  },
  routeRules: {
    "/": { prerender: true },
    "/en": { prerender: true },
    "/servicios": { prerender: true },
    "/en/servicios": { prerender: true },
    "/sobre-nosotros": { prerender: true },
    "/en/sobre-nosotros": { prerender: true },
    "/contacto": { prerender: true },
    "/en/contacto": { prerender: true },
    "/portafolio": { prerender: true },
    "/en/portafolio": { prerender: true },
    "/blog": { prerender: true },
    "/en/blog": { prerender: true },
    "/diagnostico": { prerender: true },
    "/en/diagnostico": { prerender: true },
    "/fonts/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
    "/images/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
    "/_nuxt/**": {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
    // Permanent redirects for legacy Monopo/3Drawers/EN aliases (SEO-safe).
    "/services": { redirect: { to: "/servicios", statusCode: 301 } },
    "/work": { redirect: { to: "/portafolio", statusCode: 301 } },
    "/work/**": { redirect: { to: "/portafolio", statusCode: 301 } },
    "/contact": { redirect: { to: "/contacto", statusCode: 301 } },
    "/team": { redirect: { to: "/about-us/equipo", statusCode: 301 } },
    "/team/**": { redirect: { to: "/about-us/equipo", statusCode: 301 } },
    "/policy": { redirect: { to: "/politicas-de-privacidad", statusCode: 301 } },
    "/press": { redirect: { to: "/blog", statusCode: 301 } },
    "/press/**": { redirect: { to: "/blog", statusCode: 301 } },
    "/en/services": { redirect: { to: "/en/servicios", statusCode: 301 } },
    "/en/work": { redirect: { to: "/en/portafolio", statusCode: 301 } },
    "/en/work/**": { redirect: { to: "/en/portafolio", statusCode: 301 } },
    "/en/contact": { redirect: { to: "/en/contacto", statusCode: 301 } },
    "/en/about": { redirect: { to: "/en/sobre-nosotros", statusCode: 301 } },
    "/en/team": { redirect: { to: "/en/sobre-nosotros", statusCode: 301 } },
    "/en/team/**": { redirect: { to: "/en/sobre-nosotros", statusCode: 301 } },
    "/en/press": { redirect: { to: "/blog", statusCode: 301 } },
    "/blogs-trespi": { redirect: { to: "/blog", statusCode: 301 } },
    "/blogs-trespi/**": { redirect: { to: "/blog/**", statusCode: 301 } },
    "/glosario": { robots: "noindex,follow" },
    "/admin/**": { robots: "noindex,nofollow" },
  },
  app: {
    head: {
      titleTemplate: "%s",
      title: "Invends — Agencia de diseño web, desarrollo y marketing",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, viewport-fit=cover",
        },
        {
          name: "description",
          content:
            "Invends — agencia de diseño web, desarrollo y marketing digital. Presencia que decide. Bogotá / LATAM.",
        },
        { property: "og:site_name", content: "Invends" },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: "https://invends.com/images/og-invends.png",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
        {
          name: "twitter:image",
          content: "https://invends.com/images/og-invends.png",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "index,follow" },
        { name: "theme-color", content: "#090711" },
        { name: "author", content: "Invends" },
        { name: "geo.region", content: "CO-DC" },
        { name: "geo.placename", content: "Bogotá" },
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
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/Roobert-Regular.woff2",
          crossorigin: "",
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
    /** Protects /admin/seo and /api/seo/* — never expose publicly without token. */
    seoDashboardToken: process.env.SEO_DASHBOARD_TOKEN || "",
    public: {
      brandName: "Invends",
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://invends.com",
      gaId: process.env.NUXT_PUBLIC_GA_ID || "",
      gscVerification: process.env.NUXT_PUBLIC_GSC_VERIFICATION || "",
    },
  },
});

