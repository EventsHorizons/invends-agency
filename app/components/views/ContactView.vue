<script setup lang="ts">
import { CONTACT_INFO } from "~/utils/contactInfo";
import { hasRealPhone } from "~/utils/seo";

const { locale, isEn } = useLocale();
const showPhone = hasRealPhone();

const copy = computed(() =>
  isEn.value
    ? {
        title: "Contact Invends",
        description:
          "Contact Invends for web design, development or digital marketing. hola@invends.com",
        eyebrow: "Contact",
        h1Before: "Tell us",
        h1Accent: "the need",
        sub: "Idea, doubt or project. We reply with scope: what’s in and what waits.",
        formTitle: "Your project",
        formDescription:
          "Pick the closest service, leave a contact, add a few lines if you want.",
        phone: "Phone",
      }
    : {
        title: "Contacto Invends",
        description:
          "Contacto Invends para diseño web, desarrollo o marketing digital. hola@invends.com",
        eyebrow: "Contacto",
        h1Before: "Cuéntanos",
        h1Accent: "la necesidad",
        sub: "Idea, duda o proyecto. Respondemos con alcance: qué entra y qué espera.",
        formTitle: "Tu proyecto",
        formDescription:
          "Elige el servicio más cercano, deja un contacto y, si quieres, unas líneas.",
        phone: "Teléfono",
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
