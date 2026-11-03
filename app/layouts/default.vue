<script setup lang="ts">
import "~/assets/css/layout.css";
import "~/assets/css/invends-layout.css";

let lenis: { destroy: () => void } | null = null;

onMounted(async () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const Lenis = (await import("lenis")).default;
  lenis = new Lenis({ autoRaf: true });
  (window as Window & { __lenis?: unknown }).__lenis = lenis;
});

onBeforeUnmount(() => {
  if (!lenis) return;
  delete (window as Window & { __lenis?: unknown }).__lenis;
  lenis.destroy();
  lenis = null;
});
</script>

<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
    <AppCookies />
  </div>
</template>
