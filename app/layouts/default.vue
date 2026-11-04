<script setup lang="ts">
import "~/assets/css/layout.css";
import "~/assets/css/invends-layout.css";
import {
  organizationJsonLd,
  useSiteUrl,
  websiteJsonLd,
} from "~/utils/seo";

const siteUrl = useSiteUrl();
useHead({
  script: [
    {
      key: "ld-organization",
      type: "application/ld+json",
      children: JSON.stringify(organizationJsonLd(siteUrl)),
    },
    {
      key: "ld-website",
      type: "application/ld+json",
      children: JSON.stringify(websiteJsonLd(siteUrl)),
    },
  ],
});

let lenis: { destroy: () => void } | null = null;

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const boot = async () => {
    const Lenis = (await import("lenis")).default;
    lenis = new Lenis({ autoRaf: true });
    (window as Window & { __lenis?: unknown }).__lenis = lenis;
  };

  const ric = (
    window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }
  ).requestIdleCallback;
  // Smooth scroll is progressive enhancement — don't compete with LCP/INP.
  if (typeof ric === "function") ric(() => void boot(), { timeout: 1500 });
  else window.setTimeout(() => void boot(), 280);
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
