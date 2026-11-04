<script setup lang="ts">
definePageMeta({
  alias: ["/en/politicas-de-privacidad"],
});

const { locale, isEn, localePath } = useLocale();

const copy = computed(() =>
  isEn.value
    ? {
        title: "Personal Data Processing Policy | Invends",
        description:
          "How Invends processes personal data collected through contact forms and commercial inquiries.",
        h1: "Personal Data Processing Policy",
        p1: "Invends processes personal data in accordance with applicable Colombian law and the principles of legality, purpose, freedom, accuracy, transparency, restricted access and circulation, security and confidentiality.",
        p2: "Data collected through contact forms or commercial inquiries is used to answer questions, manage work relationships and improve our services. It is not sold to third parties.",
        p3Before:
          "Data subjects may exercise rights of access, update, rectification and deletion by writing to ",
        p3After: ".",
        note: "This is a short informative version. When a full legal document for the studio exists, it will be published at this same URL.",
        cta: "Back to contact",
      }
    : {
        title: "Política de Tratamiento de Datos | Invends",
        description:
          "Cómo Invends trata los datos personales recolectados mediante formularios de contacto y solicitudes comerciales.",
        h1: "Política de Tratamiento de Datos Personales",
        p1: "Invends trata datos personales de acuerdo con la normativa aplicable en Colombia y con los principios de legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad.",
        p2: "Los datos recolectados a través de formularios de contacto o solicitudes comerciales se utilizan para responder consultas, gestionar relaciones de trabajo y mejorar nuestros servicios. No se venden a terceros.",
        p3Before:
          "El titular puede ejercer derechos de acceso, actualización, rectificación y eliminación escribiendo a ",
        p3After: ".",
        note: "Esta es una versión informativa resumida. Cuando exista un documento legal íntegro del estudio, se publicará en esta misma ruta.",
        cta: "Volver a contacto",
      },
);

usePageSeo({
  title: () => copy.value.title,
  description: () => copy.value.description,
  path: () =>
    isEn.value ? "/en/politicas-de-privacidad" : "/politicas-de-privacidad",
  locale: () => locale.value,
});
</script>

<template>
  <main id="main" :lang="locale">
    <header class="td-page-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container-narrow">
        <h1>{{ copy.h1 }}</h1>
      </div>
    </header>
    <section class="td-section" style="padding-top: 0">
      <div class="td-container-narrow prose">
        <p>{{ copy.p1 }}</p>
        <p>{{ copy.p2 }}</p>
        <p>
          {{ copy.p3Before
          }}<a href="mailto:hola@invends.com">hola@invends.com</a
          >{{ copy.p3After }}
        </p>
        <p class="td-muted note">{{ copy.note }}</p>
        <NuxtLink class="td-btn" :to="localePath('/contacto')">
          {{ copy.cta }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: var(--tracking-display);
  max-width: 18ch;
  line-height: 1.08;
}
.prose p {
  margin: 0 0 1.15rem;
  line-height: 1.6;
  max-width: 62ch;
}
.prose a {
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
.note {
  margin-top: 0.35rem;
}
.td-btn {
  margin-top: 1.5rem;
}
</style>
