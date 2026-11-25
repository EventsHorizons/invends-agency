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

  function trackWhatsAppClick(placement: string = "floating") {
    trackEvent("whatsapp_click", {
      method: "whatsapp",
      placement,
    });
    trackEvent("generate_lead", {
      method: "whatsapp",
      placement,
    });
  }

  function trackLeadMagnet(score: number, emailProvided: boolean) {
    trackEvent("lead_magnet_diagnostic", {
      score,
      email_provided: emailProvided,
    });
    if (emailProvided) {
      trackEvent("generate_lead", {
        method: "diagnostic_checklist",
        score,
      });
    }
  }

  function trackResourceDownload(resourceName: string) {
    trackEvent("download_resource", {
      resource_name: resourceName,
    });
  }

  return {
    trackEvent,
    trackContactSubmit,
    trackMailto,
    trackWhatsAppClick,
    trackLeadMagnet,
    trackResourceDownload,
  };
}
