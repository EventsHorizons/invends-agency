import gsap from "gsap";

type LenisLike = {
  scrollTo: (y: number, opts?: { duration?: number }) => void;
};

/**
 * Scelerity-style services reel: tall scroll region + sticky viewport;
 * damped horizontal pan on desktop, vertical stack on mobile / reduced motion.
 */
export function useServiceReel(
  rootRef: Ref<HTMLElement | null>,
  count: ComputedRef<number> | Ref<number> | number,
) {
  let cleanup: (() => void) | null = null;

  onMounted(() => {
    const getCount = () => (typeof count === "number" ? count : unref(count));
    const root = rootRef.value;
    const n = getCount();
    if (!root || n < 1) return;

    const track = root.querySelector<HTMLElement>("[data-reel='track']");
    if (!track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stop = () => {};

    const slides = () =>
      Array.from(track.querySelectorAll<HTMLElement>("[data-reel-slide]"));

    const paint = (eased: number) => {
      const total = getCount();
      const last = Math.max(total - 1, 1);
      const cursor = eased * last;
      const index = Math.min(total - 1, Math.max(0, Math.round(cursor)));
      slides().forEach((slide, i) => {
        const reveal = Math.max(0, 1 - Math.abs(cursor - i));
        slide.style.setProperty("--reveal", reveal.toFixed(4));
        slide.classList.toggle("is-current", i === index);
      });
    };

    const scrollToIndex = (index: number) => {
      const total = getCount();
      const last = Math.max(total - 1, 1);
      if (root.dataset.mode !== "pan") {
        slides()[index]?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
          inline: "nearest",
        });
        return;
      }
      const start = root.getBoundingClientRect().top + window.scrollY;
      const span = Math.max(root.offsetHeight - window.innerHeight, 0);
      const y = start + (index / last) * span;
      const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
      if (lenis?.scrollTo) lenis.scrollTo(y, { duration: 1.6 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    };

    const onJump = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "a[data-reel-target]",
      );
      if (!link || root.dataset.mode !== "pan") return;
      const index = slides().findIndex((slide) => slide.id === link.dataset.reelTarget);
      if (index < 0) return;
      event.preventDefault();
      scrollToIndex(index);
    };

    document.addEventListener("click", onJump);

    const startStack = () => {
      root.dataset.mode = "stack";
      root.style.height = "";
      gsap.set(track, { clearProps: "transform" });
      const last = Math.max(getCount() - 1, 1);
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          const index = slides().indexOf(visible.target as HTMLElement);
          if (index < 0) return;
          paint(index / last);
        },
        { threshold: [0.35, 0.55] },
      );
      slides().forEach((slide) => observer.observe(slide));
      paint(0);
      return () => observer.disconnect();
    };

    const startPan = () => {
      root.dataset.mode = "pan";
      let target = 0;
      let eased = 0;
      let still = 0;
      let active = true;
      paint(0);

      const read = () => {
        const span = Math.max(root.offsetHeight - window.innerHeight, 1);
        const scrolled = Math.min(
          Math.max(-root.getBoundingClientRect().top, 0),
          span,
        );
        target = scrolled / span;
      };

      const tick = () => {
        if (!active) return;
        const before = target;
        read();
        if (Math.abs(target - before) < 0.0004) still += 1;
        else still = 0;
        const last = Math.max(getCount() - 1, 1);
        const resting = still > 12;
        const dest = resting ? Math.round(target * last) / last : target;
        const delta = dest - eased;
        eased = Math.abs(delta) < 0.0008 ? dest : eased + delta * 0.07;
        gsap.set(track, { x: -eased * last * root.clientWidth, force3D: true });
        paint(eased);
      };

      gsap.ticker.add(tick);

      const viewIo = new IntersectionObserver(
        ([entry]) => {
          active = Boolean(entry?.isIntersecting);
        },
        { threshold: 0.01, rootMargin: "64px 0px" },
      );
      viewIo.observe(root);

      const hash = window.location.hash.replace("#", "");
      const hashed = slides().findIndex((slide) => slide.id === hash);
      if (hashed > 0) requestAnimationFrame(() => scrollToIndex(hashed));

      return () => {
        viewIo.disconnect();
        gsap.ticker.remove(tick);
        gsap.set(track, { clearProps: "transform" });
      };
    };

    const apply = () => {
      stop();
      const wide = window.matchMedia("(min-width: 64rem)").matches;
      stop = reduced || !wide ? startStack() : startPan();
    };

    apply();
    const media = window.matchMedia("(min-width: 64rem)");
    media.addEventListener("change", apply);

    cleanup = () => {
      media.removeEventListener("change", apply);
      document.removeEventListener("click", onJump);
      stop();
      root.style.height = "";
      delete root.dataset.mode;
    };
  });

  onBeforeUnmount(() => {
    cleanup?.();
    cleanup = null;
  });
}
