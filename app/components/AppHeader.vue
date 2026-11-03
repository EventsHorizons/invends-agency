<script setup lang="ts">
import { BRAND_NAME } from "~/utils/brand";
import { NAV } from "~/utils/messages";

const open = ref(false);
const scrolled = ref(false);
const route = useRoute();
const { switchTo, isEn, setLocale, locale } = useLocale();
useTheme();

const links = computed(() =>
  NAV[locale.value].map((l) => ({ to: l.to, label: l.label })),
);

function syncScroll() {
  scrolled.value = window.scrollY > 24;
}

watch(
  () => route.fullPath,
  () => {
    open.value = false;
    if (import.meta.client) {
      requestAnimationFrame(syncScroll);
    }
  },
);

watch(open, (v) => {
  if (!import.meta.client) return;
  document.body.classList.toggle("lenis-stopped", v);
  document.documentElement.classList.toggle("nav-open", v);
});

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && open.value) open.value = false;
}

onMounted(() => {
  window.addEventListener("keydown", onKey);
  window.addEventListener("scroll", syncScroll, { passive: true });
  syncScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKey);
  window.removeEventListener("scroll", syncScroll);
  document.body.classList.remove("lenis-stopped");
  document.documentElement.classList.remove("nav-open");
});

function closeMenu() {
  open.value = false;
}

async function go(to: string) {
  closeMenu();
  if (to === route.fullPath || to === route.path) return;
  await navigateTo(to);
}

async function toggleLocale() {
  closeMenu();
  await setLocale(isEn.value ? "es" : "en");
}

function isActive(to: string) {
  const path = route.path.replace(/\/$/, "") || "/";
  const target = to.replace(/\/$/, "") || "/";
  if (target === "/" || target === "/en") return path === target;
  return path === target || path.startsWith(`${target}/`);
}
</script>

<template>
  <header class="site-header" :class="{ overlay: open, 'is-scrolled': scrolled }">
    <NuxtLink
      class="logo"
      :to="isEn ? '/en' : '/'"
      :aria-label="`${BRAND_NAME} home`"
    >
      <span class="logo-img" aria-hidden="true" />
    </NuxtLink>

    <div class="header-actions">
      <nav class="desk-nav" aria-label="Primary">
        <ul class="desk-col">
          <li v-for="l in links" :key="l.to">
            <NuxtLink :to="l.to">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="lang"
        :aria-label="switchTo.aria"
        :title="switchTo.aria"
        @click="toggleLocale"
      >
        {{ switchTo.label }}
      </button>

      <ThemeToggle />

      <button
        class="menu-btn"
        type="button"
        :aria-expanded="open"
        aria-controls="site-menu"
        @click="open = !open"
      >
        <span class="sr-only">{{
          open
            ? isEn
              ? "Close menu"
              : "Cerrar menú"
            : isEn
              ? "Open menu"
              : "Abrir menú"
        }}</span>
        <span class="menu-icon" aria-hidden="true">
          <span /><span /><span />
        </span>
      </button>
    </div>
  </header>

  <Teleport to="body">
    <div
      v-if="open"
      id="site-menu"
      class="nav-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="isEn ? 'Main menu' : 'Menú principal'"
    >
      <div class="nav-overlay-inner">
        <nav class="nav-overlay-nav" aria-label="Primary">
          <button
            v-for="(l, i) in links"
            :key="l.to"
            type="button"
            class="nav-link"
            :class="{ active: isActive(l.to) }"
            @click="go(l.to)"
          >
            <span class="nav-index">{{ String(i + 1).padStart(2, "0") }}</span>
            <span class="nav-label">{{ l.label }}</span>
          </button>
        </nav>

        <div class="nav-overlay-meta">
          <p class="nav-meta-label">
            {{ isEn ? "Language" : "Idioma" }}
          </p>
          <button
            type="button"
            class="nav-lang"
            :aria-label="switchTo.aria"
            @click="toggleLocale"
          >
            {{ switchTo.label }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.desk-nav {
  display: none;
}
.desk-col {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.35rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.desk-col a {
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0.35rem 0.55rem;
  opacity: 0.78;
  border-radius: 0.35rem;
  color: inherit;
  transition:
    opacity 0.4s var(--ease),
    background-color 0.4s var(--ease);
}
.desk-col a:hover,
.desk-col a:focus-visible {
  opacity: 1;
  outline: none;
  background: color-mix(in srgb, var(--fg) 5%, transparent);
}
.desk-col a.router-link-active {
  opacity: 1;
}
:global(html[data-theme="light"] .site-header .desk-col a) {
  color: #201b2c;
  opacity: 0.72;
}
:global(html[data-theme="light"] .site-header .desk-col a:hover),
:global(html[data-theme="light"] .site-header .desk-col a:focus-visible),
:global(html[data-theme="light"] .site-header .desk-col a.router-link-active) {
  opacity: 1;
  background: color-mix(in srgb, #201b2c 6%, transparent);
}
.lang {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  min-height: 2.5rem;
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--fg);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.4s var(--ease),
    border-color 0.4s var(--ease);
}
.lang:hover,
.lang:focus-visible {
  outline: none;
  background: color-mix(in srgb, var(--fg) 5%, transparent);
  border-color: color-mix(in srgb, var(--fg) 22%, var(--line));
}
@media (min-width: 880px) {
  .desk-nav {
    display: block;
  }
  .menu-btn {
    display: none;
  }
}

.nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 120;
  background: var(--color-bg);
  color: var(--fg);
  padding: calc(var(--header-h) + env(safe-area-inset-top, 0px) + 1.25rem)
    var(--gutter) calc(1.75rem + env(safe-area-inset-bottom, 0px));
  pointer-events: auto;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.nav-overlay-inner {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 2.5rem;
  min-height: calc(
    100dvh - var(--header-h) - env(safe-area-inset-top, 0px) - 3rem -
      env(safe-area-inset-bottom, 0px)
  );
  width: min(36rem, 100%);
}
.nav-overlay-nav {
  display: grid;
  gap: 0.15rem;
  align-content: start;
  padding-top: 0.5rem;
}
.nav-link {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  align-items: baseline;
  gap: 0.85rem;
  width: 100%;
  margin: 0;
  padding: 0.7rem 0;
  border: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--line) 70%, transparent);
  background: transparent;
  color: inherit;
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 6.5vw, 2.75rem);
  font-weight: 600;
  letter-spacing: var(--tracking-title);
  line-height: 1.1;
  text-align: left;
  cursor: pointer;
  transition: opacity 0.4s var(--ease);
}
.nav-link:last-child {
  border-bottom: 0;
}
.nav-link:hover,
.nav-link:focus-visible {
  outline: none;
  opacity: 0.7;
}
.nav-link.active {
  opacity: 0.4;
}
.nav-index {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  font-family: var(--font);
}
.nav-label {
  min-width: 0;
}
.nav-overlay-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
}
.nav-meta-label {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.nav-lang {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0.4rem 0.95rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--fg);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.4s var(--ease),
    border-color 0.4s var(--ease);
}
.nav-lang:hover,
.nav-lang:focus-visible {
  outline: none;
  background: color-mix(in srgb, var(--fg) 5%, transparent);
  border-color: color-mix(in srgb, var(--fg) 22%, var(--line));
}
</style>
