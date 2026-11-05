<script setup lang="ts">
import { serviceCategoriesFor } from "~/utils/serviceCategoriesI18n";

const { locale, isEn, localePath } = useLocale();
const categories = computed(() => serviceCategoriesFor(locale.value));

const copy = computed(() =>
  isEn.value
    ? {
        title: "Services | Invends",
        description:
          "Invends services: web design, development, branding, e-commerce, SEO, marketing and more. One path or a few—scoped clearly.",
        eyebrow: "Services",
        h1Before: "Eleven",
        h1Accent: "crafts",
        lead: "You don’t need all of them. Pick what fits this phase.",
        tabsLabel: "Categories",
        reelCta: "Details",
        bandTitle: "Not sure yet?",
        bandBody: "Tell us the situation. We’ll propose a scoped path.",
        bandCta: "Start a project",
      }
    : {
        title: "Servicios | Invends",
        description:
          "Servicios Invends: diseño web, desarrollo, branding, e-commerce, SEO, marketing y más. Un camino o varios —con alcance claro.",
        eyebrow: "Servicios",
        h1Before: "Once",
        h1Accent: "oficios",
        lead: "No hace falta contratarlos todos. Elige lo que cabe en esta fase.",
        tabsLabel: "Categorías",
        reelCta: "Detalle",
        bandTitle: "¿Sin certeza aún?",
        bandBody: "Cuéntanos la situación. Proponemos un camino con alcance.",
        bandCta: "Empezar proyecto",
      },
);

usePageSeo({
  title: () => copy.value.title,
  description: () => copy.value.description,
  path: () => (isEn.value ? "/en/servicios" : "/servicios"),
  locale: () => locale.value,
});
</script>

<template>
  <main id="main" class="services-page" :lang="locale">
    <header class="td-page-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container">
        <p class="td-eyebrow">{{ copy.eyebrow }}</p>
        <h1>
          {{ copy.h1Before }}
          <span class="td-accent">{{ copy.h1Accent }}</span>.
        </h1>
        <p class="lead td-muted">{{ copy.lead }}</p>
      </div>
    </header>

    <nav class="td-container tabs" :aria-label="copy.tabsLabel">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="localePath(`/servicios/${cat.anchor}`)"
        class="tab"
        :data-reel-target="cat.anchor"
      >
        {{ cat.title }}
      </NuxtLink>
    </nav>

    <ServiceReel
      :categories="categories"
      :cta-label="copy.reelCta"
      :cta-to="localePath('/servicios')"
    />

    <section class="td-section band">
      <div class="td-container">
        <h2>{{ copy.bandTitle }}</h2>
        <p class="td-muted">{{ copy.bandBody }}</p>
        <NuxtLink class="td-btn" :to="`${localePath('/contacto')}#contacto-form`">
          {{ copy.bandCta }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: clamp(2.1rem, 7vw, 4.2rem);
  letter-spacing: var(--tracking-display);
  max-width: 16ch;
  overflow-wrap: anywhere;
}
.lead {
  max-width: 40rem;
  margin-top: 1.25rem;
}
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.tab {
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0.45rem 0.85rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.78rem;
}
.band h2 {
  margin: 0 0 0.75rem;
  max-width: 18ch;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
}
.band .td-btn {
  margin-top: 1.25rem;
}
</style>
