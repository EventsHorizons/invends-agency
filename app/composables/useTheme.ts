export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "invends-theme";
const LEGACY_STORAGE_KEY = "3drawers-theme";

function systemTheme(): ThemeMode {
  if (import.meta.client && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return "dark";
}

function readStored(): ThemeMode | null {
  if (!import.meta.client) return null;
  try {
    const v =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(LEGACY_STORAGE_KEY);
    if (v === "light" || v === "dark") {
      if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, v);
      }
      return v;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function applyTheme(mode: ThemeMode) {
  if (!import.meta.client) return;
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.style.colorScheme = mode;
}

const theme = ref<ThemeMode>("dark");
let booted = false;

export function useTheme() {
  if (import.meta.client && !booted) {
    booted = true;
    const fromDom = document.documentElement.getAttribute("data-theme");
    const stored = readStored();
    const initial =
      stored ??
      (fromDom === "light" || fromDom === "dark" ? fromDom : null) ??
      systemTheme();
    theme.value = initial;
    applyTheme(theme.value);

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystem = (e: MediaQueryListEvent) => {
      if (readStored()) return;
      theme.value = e.matches ? "light" : "dark";
      applyTheme(theme.value);
    };
    mq.addEventListener("change", onSystem);
  } else if (import.meta.client) {
    const fromDom = document.documentElement.getAttribute("data-theme");
    if (
      (fromDom === "light" || fromDom === "dark") &&
      fromDom !== theme.value
    ) {
      theme.value = fromDom;
    }
  }

  const isDark = computed(() => theme.value === "dark");
  const isLight = computed(() => theme.value === "light");

  function setTheme(mode: ThemeMode) {
    theme.value = mode;
    applyTheme(mode);
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        /* ignore */
      }
    }
  }

  function toggleTheme() {
    setTheme(theme.value === "dark" ? "light" : "dark");
  }

  return {
    theme: readonly(theme),
    isDark,
    isLight,
    setTheme,
    toggleTheme,
  };
}
