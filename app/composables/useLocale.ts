export type Locale = "es" | "en";

/**
 * Spanish path (no trailing slash) → English path.
 * English home is /en; nested pages live under /en/...
 */
const ES_TO_EN: Record<string, string> = {
  "/": "/en",
  "/sobre-nosotros": "/en/sobre-nosotros",
  "/about-us/equipo": "/en/about-us/equipo",
  "/servicios": "/en/servicios",
  "/portafolio": "/en/portafolio",
  "/blog": "/en/blog",
  "/contacto": "/en/contacto",
  "/contact": "/en/contacto",
  "/politicas-de-privacidad": "/en/politicas-de-privacidad",
  "/policy": "/en/politicas-de-privacidad",
};

const EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(ES_TO_EN).map(([es, en]) => [en, es]),
);

function stripTrailingSlash(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

export function useLocale() {
  const route = useRoute();

  const locale = computed<Locale>(() =>
    route.path === "/en" || route.path.startsWith("/en/") ? "en" : "es",
  );

  const isEn = computed(() => locale.value === "en");

  const normalizedPath = computed(() => stripTrailingSlash(route.path));

  /** Prefix-aware path helper for links inside the current locale. */
  function localePath(path: string) {
    const clean = stripTrailingSlash(path.split("#")[0] || "/");
    const hash = path.includes("#") ? `#${path.split("#").slice(1).join("#")}` : "";
    if (!isEn.value) return `${clean === "/" ? "/" : clean}${hash}`;
    if (clean === "/" || clean === "/en") return `/en${hash}`;
    if (clean.startsWith("/en/") || clean === "/en") return `${clean}${hash}`;
    return `/en${clean}${hash}`;
  }

  const switchTo = computed(() => {
    if (isEn.value) {
      const to = EN_TO_ES[normalizedPath.value] ?? "/";
      return { to, label: "ES", aria: "Cambiar a español" };
    }
    const to = ES_TO_EN[normalizedPath.value] ?? "/en";
    return { to, label: "EN", aria: "Switch to English" };
  });

  async function setLocale(next: Locale) {
    if (next === locale.value) return;
    if (next === "en") {
      await navigateTo(ES_TO_EN[normalizedPath.value] ?? "/en");
      return;
    }
    await navigateTo(EN_TO_ES[normalizedPath.value] ?? "/");
  }

  return { locale, isEn, switchTo, setLocale, localePath };
}
