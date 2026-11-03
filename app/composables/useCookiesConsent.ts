const STORAGE_KEY = "invends-cookies";
const LEGACY_KEYS = ["invends-agency-cookies", "3drawers-agency-cookies"] as const;

export function useCookiesConsent() {
  const accepted = useState<boolean | null>("cookies-accepted", () => null);

  onMounted(() => {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== "1" && raw !== "0") {
      for (const key of LEGACY_KEYS) {
        const legacy = localStorage.getItem(key);
        if (legacy === "1" || legacy === "0") {
          raw = legacy;
          localStorage.setItem(STORAGE_KEY, legacy);
          break;
        }
      }
    }
    if (raw === "1") accepted.value = true;
    if (raw === "0") accepted.value = false;
  });

  function accept() {
    accepted.value = true;
    localStorage.setItem(STORAGE_KEY, "1");
  }

  function dismiss() {
    accepted.value = false;
    localStorage.setItem(STORAGE_KEY, "0");
  }

  return { accepted, accept, dismiss };
}
