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
        p1: "At Invends, we respect your privacy and protect your personal information in accordance with Colombian Statutory Law 1581 of 2012 (Habeas Data).",
        p2: "When you write to us through our contact form or direct email, we only use your data to answer your inquiry, coordinate meetings, and deliver requested proposals. Under no circumstances do we sell, transfer, or share your data with third parties.",
        p3Before:
          "You may exercise your rights to access, update, rectify, or permanently delete your information at any time by writing to ",
        p3After: " with the subject 'Habeas Data'.",
        note: "Transparent, honest, and user-first data governance.",
        cta: "Back to contact",
      }
    : {
        title: "Política de Tratamiento de Datos | Invends",
        description:
          "Cómo Invends trata los datos personales recolectados mediante formularios de contacto y solicitudes comerciales.",
        h1: "Política de Tratamiento de Datos Personales",
        p1: "En Invends respetamos tu privacidad y cuidamos tu información personal conforme a la Ley Estatutaria 1581 de 2012 de Colombia (Habeas Data).",
        p2: "Cuando nos escribes a través de nuestro formulario o correo electrónico, utilizamos tus datos únicamente para atender tu consulta, coordinar reuniones de trabajo y enviarte propuestas comerciales solicitadas por ti. Bajo ninguna circunstancia vendemos, cedemos ni compartimos tus datos con terceros.",
        p3Before:
          "En cualquier momento puedes solicitar la consulta, actualización o eliminación definitiva de tu información escribiendo a ",
        p3After: " con el asunto 'Habeas Data'.",
        note: "Compromiso de transparencia, seguridad y respeto por tu privacidad.",
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
