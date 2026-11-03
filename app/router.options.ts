import type { RouterConfig } from "@nuxt/schema";

function scrollWithLenis(top: number, immediate = true) {
  if (!import.meta.client) return;
  const lenis = (
    window as Window & {
      __lenis?: { scrollTo: (y: number, opts?: { immediate?: boolean }) => void };
    }
  ).__lenis;
  if (lenis?.scrollTo) {
    lenis.scrollTo(top, { immediate });
    return;
  }
  window.scrollTo({ top, left: 0, behavior: immediate ? "auto" : "smooth" });
}

export default {
  scrollBehavior(to, from, savedPosition) {
    // Browser back/forward
    if (savedPosition) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          scrollWithLenis(savedPosition.top ?? 0);
          resolve(savedPosition);
        });
      });
    }

    // Same page + hash (e.g. in-page anchors)
    if (to.path === from.path && to.hash) {
      return { el: to.hash, top: 0, behavior: "smooth" };
    }

    // New page with hash → land on section after paint
    if (to.hash) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve({ el: to.hash, top: 0 });
        });
      });
    }

    // New page → always start at the top
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        scrollWithLenis(0, true);
        resolve({ top: 0, left: 0 });
      });
    });
  },
} satisfies RouterConfig;
