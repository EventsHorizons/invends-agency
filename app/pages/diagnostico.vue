<script setup lang="ts">
import { absoluteUrl, breadcrumbJsonLd, useSiteUrl } from "~/utils/seo";

definePageMeta({
  alias: ["/en/diagnostico"],
});

const { locale, isEn, localePath } = useLocale();

const copy = computed(() =>
  isEn.value
    ? {
        title: "Free Digital Health Diagnostic for Websites | Invends",
        description:
          "Evaluate your website across 7 essential criteria: Core Web Vitals speed, B2B message clarity, technical SEO, art direction, and conversion.",
        eyebrow: "Interactive Tool",
        h1Before: "Digital Health Check for",
        h1Accent: "High-Performance Websites",
        lead: "A practical 7-point evaluation framework to find performance bottlenecks, commercial leaks, and SEO opportunities on your current site.",
      }
    : {
        title: "Test de Salud Digital de tu Sitio Web | Diagnóstico Gratuito — Invends",
        description:
          "Evalúa tu página web en 7 criterios clave: velocidad real (Core Web Vitals), claridad de mensaje comercial B2B, SEO técnico, diseño y conversión.",
        eyebrow: "Herramienta de Diagnóstico",
        h1Before: "Test de Salud Digital para",
        h1Accent: "Páginas Web y Marcas",
        lead: "Evalúa en menos de 3 minutos si tu sitio web actual está diseñado para cerrar clientes o si está perdiendo oportunidades por lentitud, mensajes difusos o fallas técnicas.",
      },
);

usePageSeo({
  title: () => copy.value.title,
  description: () => copy.value.description,
  path: () => (isEn.value ? "/en/diagnostico" : "/diagnostico"),
  locale: () => locale.value,
});

const siteUrl = useSiteUrl();
useHead(() => {
  const pPath = isEn.value ? "/en/diagnostico" : "/diagnostico";
  return {
    script: [
      {
        key: "ld-breadcrumb-diagnostico",
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            {
              name: isEn.value ? "Home" : "Inicio",
              url: absoluteUrl(isEn.value ? "/en" : "/", siteUrl),
            },
            {
              name: isEn.value ? "Website Health Test" : "Test de Salud Digital",
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
  <main id="main" :lang="locale" class="diagnostico-page">
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

    <section class="td-section">
      <div class="td-container-narrow">
        <LeadMagnetChecklist />
      </div>
    </section>

    <section class="td-section band">
      <div class="td-container">
        <h2>{{ isEn ? "Need custom technical consulting?" : "¿Prefieres que lo revisemos juntos?" }}</h2>
        <p class="td-muted">
          {{
            isEn
              ? "We can run an in-depth audit covering Lighthouse scores, database queries, and content architecture."
              : "Analizamos tu plataforma actual, revisamos tus Core Web Vitals en tiempo real y te entregamos un plan de trabajo claro sin rodeos."
          }}
        </p>
        <NuxtLink class="td-btn" :to="`${localePath('/contacto')}#contacto-form`">
          {{ isEn ? "Talk to the studio" : "Hablar con el estudio" }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: clamp(2.1rem, 6vw, 3.8rem);
  letter-spacing: var(--tracking-display);
  line-height: 1.1;
  max-width: 20ch;
}
.lead {
  max-width: 44rem;
  margin-top: 1.25rem;
  font-size: 1.15rem;
  line-height: 1.5;
}
.band {
  border-top: 1px solid var(--color-border);
  text-align: center;
}
.band h2 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  margin-bottom: 0.75rem;
}
.band p {
  max-width: 42rem;
  margin: 0 auto 1.75rem;
}
</style>
