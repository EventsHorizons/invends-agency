<script setup lang="ts">
import { CONTACT_INFO } from "~/utils/contactInfo";
import { hasRealPhone } from "~/utils/seo";

const { locale, isEn } = useLocale();
const { trackWhatsAppClick } = useAnalytics();
const showPhone = hasRealPhone();

const copy = computed(() =>
  isEn.value
    ? {
        title: "Contact the Studio | Invends Web Design & Technology",
        description:
          "Tell us about your company and what you need to solve. We reply in under 24 hours with an honest view on how to approach your site.",
        eyebrow: "Direct contact",
        h1Before: "Let's talk about your",
        h1Accent: "next website",
        sub: "Tell us about your company and what you need to solve. We reply in under 24 hours with an honest view on the best way forward.",
        formTitle: "Tell us about your project",
        formDescription:
          "Share your details and we will reach out to schedule an introductory call.",
        phone: "Phone",
        whatsapp: "WhatsApp",
        whatsappAction: "Chat on WhatsApp",
      }
    : {
        title: "Contacto | Hablemos sobre tu próximo sitio web — Invends",
        description:
          "Cuéntanos sobre tu empresa y qué buscas resolver. Te responderemos en menos de 24 horas con una opinión honesta sobre la mejor forma de abordarlo.",
        eyebrow: "Contacto directo",
        h1Before: "Hablemos sobre tu",
        h1Accent: "próximo sitio web",
        sub: "Cuéntanos sobre tu empresa y qué buscas resolver. Te responderemos en menos de 24 horas con una opinión honesta sobre la mejor forma de abordarlo.",
        formTitle: "Cuéntanos de tu proyecto",
        formDescription:
          "Déjanos tus datos y te contactaremos para coordinar una primera llamada.",
        phone: "Teléfono",
        whatsapp: "WhatsApp",
        whatsappAction: "Hablar por WhatsApp",
      },
);

usePageSeo({
  title: () => copy.value.title,
  description: () => copy.value.description,
  path: () => (isEn.value ? "/en/contacto" : "/contacto"),
  locale: () => locale.value,
});
</script>

<template>
  <main id="main" :lang="locale">
    <header class="td-page-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container">
        <p class="td-eyebrow">{{ copy.eyebrow }}</p>
        <h1>
          {{ copy.h1Before }}
          <span class="td-accent">{{ copy.h1Accent }}</span>.
        </h1>
        <p class="sub">{{ copy.sub }}</p>
      </div>
    </header>

    <section class="td-section" style="padding-top: 0">
      <div class="td-container info">
        <a
          v-for="loc in CONTACT_INFO.locations"
          :key="loc.city"
          :href="loc.mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="block"
        >
          <p class="medium">{{ loc.city }}</p>
          <p class="td-muted">
            <template v-for="(line, i) in loc.address.split('\n')" :key="i">
              {{ line }}<br />
            </template>
          </p>
        </a>
        <div class="block">
          <p class="medium">Email</p>
          <a class="under" :href="`mailto:${CONTACT_INFO.email}`">{{
            CONTACT_INFO.email
          }}</a>
          <p class="medium" style="margin-top: 1rem">{{ copy.whatsapp }}</p>
          <a
            class="under"
            :href="isEn ? CONTACT_INFO.whatsappUrlEn : CONTACT_INFO.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackWhatsAppClick('contact_page')"
          >
            {{ copy.whatsappAction }} ({{ CONTACT_INFO.whatsapp }})
          </a>
          <template v-if="showPhone">
            <p class="medium" style="margin-top: 1rem">{{ copy.phone }}</p>
            <a :href="`tel:${CONTACT_INFO.phoneTel}`">{{ CONTACT_INFO.phone }}</a>
          </template>
        </div>
      </div>
    </section>

    <SiteContactForm
      :locale="locale"
      :title="copy.formTitle"
      :description="copy.formDescription"
    />
  </main>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  letter-spacing: var(--tracking-display);
}
.sub {
  margin-top: 1.25rem;
  font-size: 1.25rem;
}
.info {
  display: grid;
  gap: 2rem;
}
@media (min-width: 720px) {
  .info {
    grid-template-columns: repeat(2, 1fr);
  }
}
.block {
  border-top: 1px solid var(--line);
  padding-top: 1.25rem;
}
.medium {
  margin: 0 0 0.35rem;
  font-weight: 700;
}
.under {
  text-decoration: underline;
}
</style>
