/**
 * GA4 helpers — no-ops when NUXT_PUBLIC_GA_ID is unset.
 */
type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | null {
  if (!import.meta.client) return null;
  const w = window as Window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : null;
}

export function useAnalytics() {
  function trackEvent(
    name: string,
    params: Record<string, string | number | boolean | undefined> = {},
  ) {
    const fn = gtag();
    if (!fn) return;
    fn("event", name, params);
  }

  function trackContactSubmit(locale: string) {
    trackEvent("generate_lead", {
      method: "contact_form",
      locale,
    });
    trackEvent("contact_form_submit", { locale });
  }

  function trackMailto() {
    trackEvent("contact_mailto_click", { method: "email" });
  }

  return { trackEvent, trackContactSubmit, trackMailto };
}
