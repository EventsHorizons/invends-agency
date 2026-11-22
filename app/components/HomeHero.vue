<script setup lang="ts">
import { BRAND_NAME } from "~/utils/brand";
import { HOME } from "~/utils/messages";

const { locale, localePath } = useLocale();
const copy = computed(() => HOME[locale.value]);

const root = ref<HTMLElement | null>(null);
const stage = ref<HTMLElement | null>(null);
const titleEl = ref<HTMLElement | null>(null);
const kickerEl = ref<HTMLElement | null>(null);
const bodyEl = ref<HTMLElement | null>(null);
const metaEl = ref<HTMLElement | null>(null);
const actionsEl = ref<HTMLElement | null>(null);

/** Two-line lockup for kinetic reveal */
const titleLines = computed(() => {
  const parts = copy.value.heroTitle.trim().split(/\s+/);
  if (parts.length <= 2) {
    return [{ words: parts, accentFrom: Math.max(0, parts.length - 1) }];
  }
  return [
    { words: parts.slice(0, 1), accentFrom: -1 },
    { words: parts.slice(1), accentFrom: parts.slice(1).length - 1 },
  ];
});

const services = computed(() => copy.value.heroServices);

type Gsap = typeof import("gsap").default;
let gsap: Gsap | null = null;
let ctx: { revert: () => void } | null = null;
let killScroll: (() => void) | null = null;
let killPointer: (() => void) | null = null;

function prefersReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function showFinal() {
  if (!root.value || !gsap) return;
  gsap.set(root.value.querySelectorAll("[data-hero-anim]"), {
    clearProps: "all",
    opacity: 1,
    y: 0,
    yPercent: 0,
  });
  root.value.dataset.ready = "true";
}

function playIntro() {
  if (!root.value || !titleEl.value || !gsap) return;

  const words = titleEl.value.querySelectorAll<HTMLElement>(".word");
  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      if (root.value) root.value.dataset.ready = "true";
    },
  });

  // Keep hero-body painted from SSR — zeroing it delayed LCP on mobile.
  gsap.set(words, { yPercent: 115 });
  gsap.set([kickerEl.value, metaEl.value, actionsEl.value], {
    opacity: 0,
    y: 22,
  });
  gsap.set(bodyEl.value, { opacity: 1, y: 0 });

  tl.to(kickerEl.value, { opacity: 1, y: 0, duration: 0.65 }, 0.12)
    .to(
      words,
      {
        yPercent: 0,
        duration: 1.0,
        stagger: 0.07,
        ease: "power4.out",
      },
      0.22,
    )
    .to(metaEl.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
    .to(actionsEl.value, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
}

function bindPointer() {
  if (!stage.value || !titleEl.value || !gsap || prefersReduced()) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const title = titleEl.value;
  const api = gsap;
  const onMove = (e: PointerEvent) => {
    if (root.value?.dataset.ready !== "true") return;
    const rect = stage.value!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    api.to(title, {
      x: x * 18,
      y: y * 12,
      rotateX: -y * 4,
      rotateY: x * 5,
      duration: 0.7,
      ease: "power2.out",
      overwrite: "auto",
    });
  };
  const onLeave = () => {
    api.to(title, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  };

  stage.value.addEventListener("pointermove", onMove);
  stage.value.addEventListener("pointerleave", onLeave);
  killPointer = () => {
    stage.value?.removeEventListener("pointermove", onMove);
    stage.value?.removeEventListener("pointerleave", onLeave);
  };
}

function bindScrollExit() {
  if (!root.value || !gsap || prefersReduced()) return;
  const el = root.value;
  const copyEl = el.querySelector<HTMLElement>(".hero-copy");
  if (!copyEl) return;
  const api = gsap;

  // transform + opacity only — avoid scroll-tied filter:blur paint cost
  const onScroll = () => {
    const rect = el.getBoundingClientRect();
    const h = Math.max(rect.height, 1);
    const progress = Math.min(1, Math.max(0, -rect.top / (h * 0.55)));
    api.set(copyEl, {
      opacity: 1 - progress * 0.85,
      y: progress * 48,
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  killScroll = () => window.removeEventListener("scroll", onScroll);
}

onMounted(async () => {
  const mod = await import("gsap");
  gsap = mod.default;
  if (!root.value) return;
  ctx = gsap.context(() => {
    if (prefersReduced()) {
      showFinal();
      return;
    }
    playIntro();
    bindPointer();
    bindScrollExit();
  }, root.value);
});

onBeforeUnmount(() => {
  killScroll?.();
  killPointer?.();
  ctx?.revert();
  ctx = null;
});
</script>

<template>
  <section
    ref="root"
    class="hero-split home-hero"
    :aria-label="locale === 'en' ? 'Home' : 'Inicio'"
    data-ready="false"
  >
    <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />

    <div class="hero-split-inner td-container">
      <div ref="stage" class="hero-stage">
        <div class="hero-copy">
          <p ref="kickerEl" class="hero-kicker" data-hero-anim>
            <span class="kicker-mark">{{ BRAND_NAME }}</span>
            <span class="kicker-sep" aria-hidden="true">/</span>
            <span>{{ copy.brandTagline }}</span>
          </p>

          <div class="title-frame">
            <h1 ref="titleEl" class="hero-title" :key="copy.heroTitle">
              <span
                v-for="(line, li) in titleLines"
                :key="li"
                class="title-line"
              >
                <span
                  v-for="(word, wi) in line.words"
                  :key="`${li}-${wi}`"
                  class="word-clip"
                >
                  <span
                    class="word"
                    :class="{ accent: wi >= line.accentFrom && line.accentFrom >= 0 }"
                  >
                    {{ word }}
                  </span>
                </span>
              </span>
            </h1>
          </div>

          <p ref="bodyEl" class="hero-body" data-hero-anim>
            {{ copy.heroSupport }}
          </p>

          <ul
            ref="metaEl"
            class="hero-meta"
            data-hero-anim
            :aria-label="locale === 'en' ? 'Crafts' : 'Oficios'"
          >
            <li v-for="s in services" :key="s">{{ s }}</li>
          </ul>

          <div ref="actionsEl" class="hero-actions" data-hero-anim>
            <NuxtLink class="td-btn hero-cta" :to="localePath('/contacto')">
              {{ copy.ctaPrimary }}
            </NuxtLink>
            <NuxtLink class="td-link hero-secondary" :to="localePath('/servicios')">
              {{ copy.ctaSecondary }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  align-items: stretch;
  overflow: hidden;
}
.hero-fx {
  position: absolute !important;
  inset: 0;
}
.hero-split-inner {
  position: relative;
  z-index: 1;
  display: grid;
  align-items: center;
  padding: calc(var(--header-h) + env(safe-area-inset-top, 0px) + 1.25rem) 0
    max(2rem, env(safe-area-inset-bottom, 0px));
  min-height: inherit;
}
.hero-stage {
  position: relative;
  perspective: 900px;
  width: 100%;
  min-width: 0;
}
.hero-copy {
  max-width: min(54rem, 100%);
  min-width: 0;
}
.hero-kicker {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.45rem 0.65rem;
  margin: 0 0 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.72rem;
  opacity: 0.88;
}
.kicker-mark {
  font-weight: 700;
  letter-spacing: 0.16em;
}
.kicker-sep {
  opacity: 0.45;
}
.title-frame {
  overflow: visible;
}
.hero-title {
  margin: 0;
  font-size: clamp(2.35rem, 9.5vw, 5.85rem);
  line-height: 0.96;
  letter-spacing: var(--tracking-display);
  font-weight: 800;
  transform-style: preserve-3d;
  max-width: 16ch;
  overflow-wrap: normal;
  word-break: normal;
}
.title-line {
  display: block;
}
.word-clip {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  margin-right: 0.22em;
  padding-bottom: 0.08em;
}
.word-clip:last-child {
  margin-right: 0;
}
.word {
  display: inline-block;
  will-change: transform;
}
.word.accent {
  background-image: none;
  color: #fff;
  -webkit-text-fill-color: #fff;
  font-style: italic;
  font-family: var(--font-display-italic);
  font-weight: 700;
}
.hero-body {
  margin: 1.15rem 0 0;
  max-width: 34rem;
  font-size: clamp(0.98rem, 1.35vw, 1.1rem);
  line-height: 1.55;
}
.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 1.25rem;
  list-style: none;
  margin: 1.15rem 0 0;
  padding: 0;
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.78;
}
.hero-meta li {
  position: relative;
}
.hero-meta li + li::before {
  content: "";
  position: absolute;
  left: -0.75rem;
  top: 50%;
  width: 0.28rem;
  height: 0.28rem;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.45;
  transform: translateY(-50%);
}
@media (max-width: 379px) {
  .hero-meta {
    gap: 0.35rem 0.85rem;
    font-size: 0.68rem;
  }
  .hero-meta li + li::before {
    left: -0.55rem;
  }
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem 1.25rem;
  align-items: center;
  margin-top: 1.5rem;
}
.hero-actions .td-btn,
.hero-actions .td-link {
  min-height: 2.75rem;
}
.hero-cta {
  transition:
    background-color 0.45s var(--ease),
    border-color 0.45s var(--ease),
    opacity 0.45s var(--ease);
}
.hero-cta:hover,
.hero-cta:focus-visible {
  background-color: color-mix(in srgb, #ffffff 10%, transparent);
  border-color: rgba(255, 255, 255, 0.72);
  outline: none;
}
.hero-cta:active {
  opacity: 0.88;
}
.hero-secondary {
  opacity: 0.82;
  transition: opacity 0.45s var(--ease);
}
.hero-secondary:hover,
.hero-secondary:focus-visible {
  opacity: 1;
  outline: none;
}
@media (min-width: 900px) {
  .hero-split-inner {
    padding: calc(var(--header-h) + 1.5rem) 0 3rem;
  }
  .hero-title {
    max-width: 12ch;
  }
}

@media (max-height: 740px) {
  .hero-title {
    font-size: clamp(2.35rem, 7vw, 4.4rem);
  }
  .hero-body {
    margin-top: 0.85rem;
  }
  .hero-meta,
  .hero-actions {
    margin-top: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-kicker,
  .hero-body,
  .hero-meta,
  .hero-actions,
  .word {
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>
