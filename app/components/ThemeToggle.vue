<script setup lang="ts">
const { isDark, toggleTheme } = useTheme();
const { isEn } = useLocale();

const ready = ref(false);
onMounted(() => {
  ready.value = true;
});

const label = computed(() => {
  if (isEn.value) {
    return isDark.value ? "Switch to light mode" : "Switch to dark mode";
  }
  return isDark.value ? "Activar modo claro" : "Activar modo oscuro";
});

const fallbackLabel = computed(() =>
  isEn.value ? "Toggle theme" : "Cambiar tema",
);
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="ready ? label : fallbackLabel"
    :title="ready ? label : fallbackLabel"
    @click="toggleTheme"
  >
    <ClientOnly>
      <!-- Sun: visible in dark mode (switch to light) -->
      <svg
        v-if="isDark"
        class="icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
      <!-- Moon: visible in light mode (switch to dark) -->
      <svg
        v-else
        class="icon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
      </svg>
    </ClientOnly>
  </button>
</template>

<style scoped>
.theme-toggle {
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--color-surface-glass);
  color: var(--fg);
  display: grid;
  place-items: center;
  transition:
    background-color 0.4s var(--ease),
    border-color 0.4s var(--ease),
    box-shadow 0.4s var(--ease);
}
@media (max-width: 479px) {
  .theme-toggle {
    width: 2.5rem;
    height: 2.5rem;
  }
}
.theme-toggle:hover,
.theme-toggle:focus-visible {
  border-color: color-mix(in srgb, var(--fg) 22%, var(--line));
  background: color-mix(in srgb, var(--fg) 5%, transparent);
  outline: none;
}
.theme-toggle:focus-visible {
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--fg) 18%, transparent);
}
:global(html[data-theme="light"] .site-header .theme-toggle) {
  background: #ffffff;
  border-color: color-mix(in srgb, #201b2c 14%, transparent);
  color: #201b2c;
}
:global(html[data-theme="light"] .site-header .theme-toggle:hover),
:global(html[data-theme="light"] .site-header .theme-toggle:focus-visible) {
  background: color-mix(in srgb, #201b2c 4%, #ffffff);
  border-color: color-mix(in srgb, #201b2c 22%, transparent);
}
.icon {
  display: block;
}
</style>
