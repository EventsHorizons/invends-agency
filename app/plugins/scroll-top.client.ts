/**
 * Ensures Lenis + window scroll reset on route changes.
 * Complements router.options.ts for cases where Lenis owns the scroll.
 */
export default defineNuxtPlugin(() => {
  const router = useRouter();

  router.afterEach((to, from) => {
    if (to.path === from.path) return;

    const run = () => {
      const lenis = (
        window as Window & {
          __lenis?: {
            scrollTo: (
              y: number | string,
              opts?: { immediate?: boolean; duration?: number },
            ) => void;
          };
        }
      ).__lenis;

      if (to.hash) {
        const el = document.querySelector(to.hash);
        if (el && lenis?.scrollTo) {
          lenis.scrollTo(to.hash, { immediate: true });
          return;
        }
        if (el) {
          el.scrollIntoView({ block: "start" });
          return;
        }
      }

      if (lenis?.scrollTo) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };

    // Wait one frame so the new page has mounted.
    requestAnimationFrame(() => requestAnimationFrame(run));
  });
});
