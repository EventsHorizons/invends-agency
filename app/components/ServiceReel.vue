<script setup lang="ts">
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "~/utils/trespiData";

const props = withDefaults(
  defineProps<{
    /** Prefix slide ids when the reel appears alongside /servicios anchors. */
    idPrefix?: string;
    /** Slides after the optional intro. Defaults to the full service catalog. */
    categories?: ServiceCategory[];
    /** Optional first slide (home: objetivo → contacto). */
    introTitle?: string;
    introAccent?: string;
    introBody?: string;
    /** CTA on the intro slide. */
    introCtaLabel?: string;
    introCtaTo?: string;
    /** CTA on category slides. */
    ctaLabel?: string;
    ctaTo?: string;
  }>(),
  {
    idPrefix: "",
    categories: undefined,
    introTitle: "",
    introAccent: "",
    introBody: "",
    introCtaLabel: "Cuéntanos el objetivo",
    introCtaTo: "#contacto-form",
    ctaLabel: "Solicitar información",
    ctaTo: "/contacto",
  },
);

const slides = computed(() => props.categories ?? SERVICE_CATEGORIES);
const reelRoot = ref<HTMLElement | null>(null);
const hasIntro = computed(() => Boolean(props.introTitle));
const slideCount = computed(
  () => slides.value.length + (hasIntro.value ? 1 : 0),
);

function slideId(anchor: string) {
  return props.idPrefix ? `${props.idPrefix}${anchor}` : anchor;
}

function categoryCta(anchor: string) {
  const known = SERVICE_CATEGORIES.some((c) => c.anchor === anchor);
  if (props.ctaTo === "/servicios" && known) return `/servicios#${anchor}`;
  return props.ctaTo;
}

useServiceReel(reelRoot, slideCount);
</script>

<template>
  <section
    ref="reelRoot"
    class="services-reel"
    :style="{ '--slides': slideCount }"
    aria-label="Servicios"
  >
    <div class="reel-viewport">
      <div data-reel="track" class="reel-track">
        <article
          v-if="hasIntro"
          :id="slideId('intro')"
          data-reel-slide
          data-index="0"
          class="reel-slide reel-intro"
          aria-labelledby="home-services-intro-title"
        >
          <div class="intro-copy">
            <h2 id="home-services-intro-title" class="intro-title">
              {{ introTitle }}
              <template v-if="introAccent">
                <span class="td-accent">{{ introAccent }}</span>.
              </template>
            </h2>
            <p v-if="introBody" class="intro-body td-muted">{{ introBody }}</p>
            <NuxtLink class="td-btn" :to="introCtaTo">{{ introCtaLabel }}</NuxtLink>
          </div>
        </article>

        <article
          v-for="(category, index) in slides"
          :id="slideId(category.anchor)"
          :key="category.id"
          data-reel-slide
          :data-index="hasIntro ? index + 1 : index"
          class="reel-slide"
          :aria-labelledby="`${slideId(category.anchor)}-title`"
        >
          <figure class="reel-visual">
            <img
              class="reel-img"
              :src="category.image"
              :alt="category.imageAlt"
              width="1600"
              height="1200"
              decoding="async"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
            />
            <div class="reel-shade" aria-hidden="true" />
          </figure>

          <div class="reel-copy">
            <p class="num">{{ category.number }}</p>
            <h3 :id="`${slideId(category.anchor)}-title`" class="svc-title">
              {{ category.title }}
            </h3>
            <p class="svc-headline">{{ category.headline }}</p>
            <p class="response td-muted">{{ category.response }}</p>
            <ul class="rows">
              <li v-for="item in category.items" :key="item.title">
                <span class="row-label">{{ item.title }}</span>
                <span class="row-value td-muted">{{ item.description }}</span>
              </li>
            </ul>
            <NuxtLink class="td-btn enter" :to="categoryCta(category.anchor)">
              {{ ctaLabel }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-reel {
  position: relative;
  padding: 0;
  overflow-x: clip;
  background: var(--bg);
  color: var(--fg);
}
.reel-viewport {
  position: relative;
}
.reel-track {
  display: flex;
  flex-direction: column;
}
.reel-slide {
  display: grid;
  grid-template-rows: minmax(14rem, 42vh) auto;
  min-height: auto;
  background: var(--bg);
}
.reel-intro {
  grid-template-rows: none;
  display: flex;
  align-items: flex-end;
}

.services-reel[data-mode="pan"] {
  height: calc(var(--slides, 3) * 100svh);
}
.services-reel[data-mode="pan"] .reel-viewport {
  position: sticky;
  top: 0;
  height: 100svh;
  overflow: hidden;
}
.services-reel[data-mode="pan"] .reel-track {
  flex-direction: row;
  flex-wrap: nowrap;
  width: calc(var(--slides, 3) * 100%);
  height: 100%;
  will-change: transform;
}
.services-reel[data-mode="pan"] .reel-slide {
  flex: 0 0 calc(100% / var(--slides, 3));
  width: calc(100% / var(--slides, 3));
  height: 100svh;
  min-height: 0;
  grid-template-rows: none;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.services-reel[data-mode="pan"] .reel-intro {
  grid-template-columns: none;
  display: flex;
}

.intro-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding: clamp(1.25rem, 4vw, 3rem);
  padding-bottom: clamp(2.5rem, 6vw, 4rem);
  max-width: 40rem;
  min-width: 0;
}
.services-reel[data-mode="pan"] .intro-copy {
  height: 100%;
  justify-content: flex-end;
  padding-top: calc(var(--header-h) + 1.25rem);
}
.intro-title {
  margin: 0;
  font-size: clamp(2rem, 5.5vw, 3.6rem);
  letter-spacing: var(--tracking-title);
  line-height: 1.02;
  max-width: 18ch;
}
.intro-body {
  margin: 0;
  max-width: 36rem;
  font-size: 1.05rem;
}

.reel-visual {
  position: relative;
  min-height: 0;
  overflow: hidden;
  background: var(--color-surface);
  margin: 0;
}
.reel-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  opacity: calc(0.55 + var(--reveal, 0) * 0.45);
  transform: scale(calc(1.04 - var(--reveal, 0) * 0.04));
  transition: opacity 0.2s linear;
}
.reel-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 40%,
    color-mix(in srgb, var(--bg) 55%, transparent)
  );
  pointer-events: none;
}
.reel-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  min-width: 0;
  padding: clamp(1.25rem, 4vw, 3rem);
  padding-bottom: clamp(2.5rem, 6vw, 4rem);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.services-reel[data-mode="pan"] .reel-copy {
  height: 100%;
  padding-top: calc(var(--header-h) + 1.25rem);
}
.num {
  margin: 0;
  color: var(--muted);
  letter-spacing: 0.14em;
  font-size: 0.75rem;
}
.svc-title {
  margin: 0;
  font-size: clamp(1.85rem, 4.2vw, 2.85rem);
  letter-spacing: var(--tracking-title);
  line-height: 1.08;
  max-width: 16ch;
  font-weight: 800;
  color: var(--fg);
}
.svc-headline {
  margin: 0;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  line-height: 1.35;
  max-width: 34ch;
  color: var(--color-lavender);
  font-weight: 500;
}
.response {
  margin: 0;
  max-width: 42rem;
}
.rows {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  width: 100%;
  display: grid;
  gap: 0.65rem;
}
.rows li {
  display: grid;
  gap: 0.2rem;
  border-top: 1px solid var(--line);
  padding-top: 0.65rem;
}
.row-label {
  font-weight: 700;
  font-size: 0.95rem;
}
.row-value {
  font-size: 0.85rem;
}
.enter {
  margin-top: 0.75rem;
}

@media (max-width: 63.99rem) {
  .reel-shade {
    background: linear-gradient(transparent 35%, var(--bg));
  }
  .reel-visual {
    min-height: min(42vh, 18rem);
  }
  .svc-title {
    max-width: none;
  }
  .svc-headline,
  .response {
    max-width: none;
  }
  .enter {
    min-height: 2.75rem;
  }
}

@media (min-width: 64rem) {
  .reel-slide {
    min-height: 100svh;
  }
}
</style>
