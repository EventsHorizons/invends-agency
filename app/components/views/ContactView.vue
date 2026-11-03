<script setup lang="ts">
import { CONTACT_INFO } from "~/utils/trespiData";

const { locale, isEn } = useLocale();

const copy = computed(() =>
  isEn.value
    ? {
        title: "Contact | Invends",
        description:
          "Tell us about your web design, development or digital marketing project. Invends replies with clarity.",
        eyebrow: "Contact · Bogotá / LATAM",
        h1Before: "Let's talk about what your brand",
        h1Accent: "needs",
        sub: "Design, development or marketing: tell us the goal and we’ll reply with clear scope.",
        formTitle: "Fill in the form and we’ll get back to you.",
        formDescription:
          "Share the service, the engagement type and a valid contact. That lets us reply with real scope—without unnecessary back-and-forth.",
        phone: "Phone",
      }
    : {
        title: "Contacto | Invends",
        description:
          "Cuéntanos tu proyecto de diseño web, desarrollo o marketing digital. Invends responde con claridad.",
        eyebrow: "Contacto · Bogotá / LATAM",
        h1Before: "Hablemos de lo que tu marca",
        h1Accent: "necesita",
        sub: "Diseño, desarrollo o marketing: cuéntanos el objetivo y te respondemos con alcance claro.",
        formTitle: "Completa el formulario y te contactamos.",
        formDescription:
          "Indica el servicio, la modalidad y un contacto válido. Con eso podemos responder con alcance real —sin rondas de ida y vuelta innecesarias.",
        phone: "Teléfono",
      },
);

useHead({
  title: () => copy.value.title,
  htmlAttrs: { lang: () => locale.value },
  meta: [{ name: "description", content: () => copy.value.description }],
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
          <p class="medium" style="margin-top: 1rem">{{ copy.phone }}</p>
          <a :href="`tel:${CONTACT_INFO.phoneTel}`">{{ CONTACT_INFO.phone }}</a>
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
