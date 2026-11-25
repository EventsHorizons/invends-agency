import { BRAND_EMAIL, BRAND_NAME } from "~/utils/brand";
import { CONTACT_INFO } from "~/utils/contactInfo";

/** Canonical production origin. Override with NUXT_PUBLIC_SITE_URL. */
export const DEFAULT_SITE_URL = "https://invends.com";

/** Branded share card — never reuse social/post or third-party art. */
export const DEFAULT_OG_IMAGE = "/images/og-invends.png";

export function useSiteUrl() {
  const config = useRuntimeConfig();
  const raw =
    (config.public.siteUrl as string | undefined)?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string, siteUrl?: string) {
  const base = siteUrl ?? useSiteUrl();
  if (!path || path === "/") return base;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function stripLocalePrefix(path: string) {
  if (path === "/en") return "/";
  if (path.startsWith("/en/")) return path.slice(3) || "/";
  return path || "/";
}

/** ES ↔ EN pairs for static routes (hreflang). */
export function alternatePaths(path: string): { es: string; en: string } | null {
  const clean =
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path || "/";
  const esPath = stripLocalePrefix(clean);

  const staticPairs: Record<string, string> = {
    "/": "/en",
    "/sobre-nosotros": "/en/sobre-nosotros",
    "/about-us/equipo": "/en/about-us/equipo",
    "/servicios": "/en/servicios",
    "/portafolio": "/en/portafolio",
    "/blog": "/en/blog",
    "/diagnostico": "/en/diagnostico",
    "/contacto": "/en/contacto",
    "/politicas-de-privacidad": "/en/politicas-de-privacidad",
  };

  if (esPath.startsWith("/servicios/") && esPath !== "/servicios/") {
    const slug = esPath.slice("/servicios/".length);
    if (slug && !slug.includes("/")) {
      return { es: `/servicios/${slug}`, en: `/en/servicios/${slug}` };
    }
  }

  if (esPath in staticPairs) {
    return { es: esPath, en: staticPairs[esPath] };
  }

  // Blog / portafolio detail: Spanish canonical; EN alias only on indexes
  if (esPath.startsWith("/blog/") || esPath.startsWith("/portafolio/")) {
    return { es: esPath, en: esPath };
  }

  return null;
}

/** Placeholder phone must not enter schema or NAP claims. */
export function hasRealPhone() {
  const tel = CONTACT_INFO.phoneTel.replace(/\D/g, "");
  return Boolean(tel) && !/^573000000000$/.test(tel) && !/^570{6,}$/.test(tel);
}

export function organizationSameAs() {
  return CONTACT_INFO.social
    .map((s) => s.url)
    .filter((url) => {
      try {
        const u = new URL(url);
        return u.pathname !== "/" && u.pathname !== "";
      } catch {
        return false;
      }
    });
}

export function organizationJsonLd(siteUrl: string) {
  const sameAs = organizationSameAs();
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: BRAND_NAME,
    url: siteUrl,
    email: BRAND_EMAIL,
    logo: absoluteUrl("/favicon.svg", siteUrl),
    image: absoluteUrl(DEFAULT_OG_IMAGE, siteUrl),
    description:
      "Agencia de diseño web, desarrollo y marketing digital. Atención desde Bogotá / LATAM.",
    areaServed: [
      { "@type": "City", name: "Bogotá" },
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: "LATAM" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: BRAND_EMAIL,
      availableLanguage: ["Spanish", "English"],
      areaServed: ["CO", "LATAM"],
    },
  };
  if (hasRealPhone()) {
    data.telephone = CONTACT_INFO.phoneTel;
  }
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

export function websiteJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: siteUrl,
    inLanguage: ["es", "en"],
    publisher: { "@type": "Organization", name: BRAND_NAME, url: siteUrl },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function creativeWorkJsonLd(
  item: {
    name: string;
    description: string;
    url: string;
    image?: string;
    client?: string;
    dateCreated?: string;
  },
  siteUrl: string,
) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.name,
    headline: item.name,
    description: item.description,
    url: absoluteUrl(item.url, siteUrl),
    creator: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: siteUrl,
    },
  };
  if (item.image) data.image = absoluteUrl(item.image, siteUrl);
  if (item.client) data.sponsor = { "@type": "Organization", name: item.client };
  if (item.dateCreated) data.dateCreated = item.dateCreated;
  return data;
}

export function serviceJsonLd(
  item: {
    name: string;
    description: string;
    url: string;
    image?: string;
    areaServed?: string[];
  },
  siteUrl: string,
) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.name,
    description: item.description,
    url: absoluteUrl(item.url, siteUrl),
    provider: organizationJsonLd(siteUrl),
    areaServed: item.areaServed || ["Bogotá", "Colombia", "LATAM"],
  };
  if (item.image) data.image = absoluteUrl(item.image, siteUrl);
  return data;
}
