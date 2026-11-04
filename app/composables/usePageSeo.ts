import {
  absoluteUrl,
  alternatePaths,
  DEFAULT_OG_IMAGE,
  useSiteUrl,
} from "~/utils/seo";
import type { Locale } from "~/composables/useLocale";

export interface PageSeoInput {
  title: string | (() => string);
  description: string | (() => string);
  /** Path without origin, e.g. /servicios or /en/servicios */
  path?: string | (() => string);
  image?: string | (() => string | undefined);
  locale?: Locale | (() => Locale);
  /** Override robots; default index,follow */
  robots?: string;
  type?: "website" | "article";
  noAlternates?: boolean;
}

function resolve<T>(value: T | (() => T)): T {
  return typeof value === "function" ? (value as () => T)() : value;
}

/**
 * Unified title, description, canonical, hreflang, Open Graph and Twitter.
 */
export function usePageSeo(input: PageSeoInput) {
  const route = useRoute();
  const siteUrl = useSiteUrl();

  const title = computed(() => resolve(input.title));
  const description = computed(() => resolve(input.description));
  const locale = computed<Locale>(
    () => resolve(input.locale ?? (() => (route.path.startsWith("/en") ? "en" : "es"))),
  );
  const path = computed(() => {
    const p = resolve(input.path ?? (() => route.path));
    if (!p || p === "/") return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  });
  const image = computed(() => {
    const img = resolve(input.image ?? (() => DEFAULT_OG_IMAGE));
    return absoluteUrl(img || DEFAULT_OG_IMAGE, siteUrl);
  });
  const canonical = computed(() => absoluteUrl(path.value, siteUrl));
  const ogType = input.type ?? "website";
  const robots = input.robots ?? "index,follow";

  const alternateLink = computed(() => {
    if (input.noAlternates) return [] as { rel: string; hreflang: string; href: string }[];
    const pair = alternatePaths(path.value);
    if (!pair) {
      return [
        { rel: "alternate", hreflang: locale.value, href: canonical.value },
        { rel: "alternate", hreflang: "x-default", href: canonical.value },
      ];
    }
    const es = absoluteUrl(pair.es, siteUrl);
    const en = absoluteUrl(pair.en, siteUrl);
    return [
      { rel: "alternate", hreflang: "es", href: es },
      { rel: "alternate", hreflang: "en", href: en },
      { rel: "alternate", hreflang: "x-default", href: es },
    ];
  });

  useHead({
    title: () => title.value,
    htmlAttrs: { lang: () => locale.value },
    link: () => [
      { rel: "canonical", href: canonical.value },
      ...alternateLink.value,
    ],
  });

  useSeoMeta({
    description: () => description.value,
    robots,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogUrl: () => canonical.value,
    ogType,
    ogImage: () => image.value,
    ogLocale: () => (locale.value === "en" ? "en_US" : "es_CO"),
    twitterCard: "summary_large_image",
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
    twitterImage: () => image.value,
  });

  return { canonical, siteUrl, title, description };
}
