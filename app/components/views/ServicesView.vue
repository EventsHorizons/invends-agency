<script setup lang="ts">
import { serviceCategoriesFor } from "~/utils/serviceCategoriesI18n";

const { locale, isEn, localePath } = useLocale();
const categories = computed(() => serviceCategoriesFor(locale.value));

const copy = computed(() =>
  isEn.value
    ? {
        title: "Services | Invends",
        description:
          "Presence that decides. Web design, development, branding, marketing and more — Invends.",
        eyebrow: "Services",
        h1Before: "Design, technology and marketing with",
        h1Accent: "clear direction",
        lead: "Eleven service lines. Hire one or combine them: each one answers a concrete business problem.",
        tabsLabel: "Service categories",
        reelCta: "Request information",
        bandTitle: "Tell us what you need.",
        bandBody:
          "Company, artist or event. We reply with clear scope, without fluff.",
        bandCta: "Let's talk about your project",
      }
    : {
        title: "Servicios | Invends",
        description:
          "Presencia que decide. Servicios de diseño web, desarrollo, branding, marketing y más — Invends.",
        eyebrow: "Servicios",
        h1Before: "Diseño, tecnología y marketing con",
        h1Accent: "dirección clara",
        lead: "Once líneas de servicio. Contrata una o combínalas: cada una responde a un problema concreto del negocio.",
        tabsLabel: "Categorías de servicios",
        reelCta: "Solicitar información",
        bandTitle: "Cuéntanos qué necesitas.",
        bandBody:
          "Empresa, artista o evento. Respondemos con alcance claro, sin rodeos.",
        bandCta: "Hablemos de tu proyecto",
      },
);

useHead({
  title: () => copy.value.title,
  htmlAttrs: { lang: () => locale.value },
  meta: [{ name: "description", content: () => copy.value.description }],
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
      <a
        v-for="cat in categories"
        :key="cat.id"
        :href="`#${cat.anchor}`"
        class="tab"
        :data-reel-target="cat.anchor"
      >
        {{ cat.title }}
      </a>
    </nav>

    <ServiceReel
      :categories="categories"
      :cta-label="copy.reelCta"
      :cta-to="localePath('/contacto')"
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
