<script setup lang="ts">
import { serviceCategoriesFor } from "~/utils/serviceCategoriesI18n";
import { absoluteUrl, breadcrumbJsonLd, useSiteUrl } from "~/utils/seo";

const { locale, isEn, localePath } = useLocale();
const categories = computed(() => serviceCategoriesFor(locale.value));

const copy = computed(() =>
  isEn.value
    ? {
        title: "Services | Web Design & Development Capabilities — Invends",
        description:
          "UI/UX design, custom frontend development, branding, e-commerce, and technical SEO with fixed scope and business focus. Invends.",
        eyebrow: "Services & Capabilities",
        h1Before: "Disciplines focused on",
        h1Accent: "real impact",
        lead: "You don't need to rebuild everything at once. We tackle focused upgrades or complete digital ecosystems.",
        tabsLabel: "Categories",
        reelCta: "Explore craft",
        bandTitle: "Wondering where to begin?",
        bandBody: "Tell us about your business goals. We will analyze your current site and suggest the most effective roadmap.",
        bandCta: "Request free diagnosis",
      }
    : {
        title: "Capacidades y Servicios | Invends",
        description:
          "Diseño de interfaces, ingeniería web moderna y redacción comercial para marcas que buscan diferenciarse por calidad técnica y criterio estético.",
        eyebrow: "Capacidades del estudio",
        h1Before: "Tecnología y diseño orientados a",
        h1Accent: "negocio",
        lead: "Construimos sitios web de alto rendimiento, identidades visuales claras y contenido con propósito para empresas que quieren liderar su sector.",
        tabsLabel: "Disciplinas",
        reelCta: "Conocer entregables",
        bandTitle: "Hablemos de tu próximo sitio web.",
        bandBody: "Revisamos tu plataforma actual o tu nueva idea y te planteamos una propuesta directa, sin rodeos técnicos ni presupuestos inflados.",
        bandCta: "Conversar con el estudio",
      },
);

usePageSeo({
  title: () => copy.value.title,
  description: () => copy.value.description,
  path: () => (isEn.value ? "/en/servicios" : "/servicios"),
  locale: () => locale.value,
});

const siteUrl = useSiteUrl();
useHead(() => {
  const pPath = isEn.value ? "/en/servicios" : "/servicios";
  return {
    script: [
      {
        key: "ld-breadcrumb-services",
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            {
              name: isEn.value ? "Home" : "Inicio",
              url: absoluteUrl(isEn.value ? "/en" : "/", siteUrl),
            },
            {
              name: isEn.value ? "Services" : "Servicios",
              url: absoluteUrl(pPath, siteUrl),
            },
          ]),
        ),
      },
    ],
  };
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
