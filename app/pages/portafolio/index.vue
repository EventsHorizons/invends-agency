<script setup lang="ts">
import {
  PROJECT_FILTERS,
  PROJECTS,
  type ProjectCategory,
} from "~/utils/siteData";

definePageMeta({
  alias: ["/en/portafolio"],
});

const { locale, isEn, localePath } = useLocale();

const copy = computed(() =>
  isEn.value
    ? {
        title: "Selected Work | Invends Web Design & Technology",
        description:
          "A curation of our standard in art direction, web engineering, and commercial narrative across industries.",
        eyebrow: "Selected work",
        h1Before: "Selected work",
        h1Accent: "from the studio",
        lead: "A curation of our standard in art direction, web engineering, and commercial narrative across industries.",
        bandTitle: "Let's build a website worthy of your company.",
        bandBody: "Tell us about your business goals. We will reply in under 24 hours.",
        bandCta: "Let's talk about your project",
        empty: "No projects in this category right now.",
        filters: [
          { id: "todos", label: "All" },
          { id: "diseno", label: "Web & UI Design" },
          { id: "tecnologia", label: "Nuxt Development" },
          { id: "marketing", label: "Commercial Copy" },
          { id: "contenido", label: "Content Systems" },
        ] as const,
      }
    : {
        title: "Trabajos Seleccionados | Invends Estudio Digital",
        description:
          "Una muestra de nuestro estándar en dirección de arte, arquitectura web y redacción comercial aplicada a diferentes industrias.",
        eyebrow: "Trabajo seleccionado",
        h1Before: "Trabajo seleccionado",
        h1Accent: "del estudio",
        lead: "Una muestra de nuestro estándar en dirección de arte, arquitectura web y redacción comercial aplicada a diferentes industrias.",
        bandTitle: "Construyamos una web a la altura de tu empresa.",
        bandBody: "Cuéntanos sobre tu negocio y qué buscas resolver. Te responderemos en menos de 24 horas.",
        bandCta: "Hablemos de tu proyecto",
        empty: "No hay proyectos en esta categoría por ahora.",
        filters: [
          { id: "todos", label: "Todos" },
          { id: "diseno", label: "Diseño Web & UI" },
          { id: "tecnologia", label: "Desarrollo Nuxt" },
          { id: "marketing", label: "Redacción Comercial" },
          { id: "contenido", label: "Sistemas de Contenido" },
        ] as const,
      },
);

usePageSeo({
  title: () => copy.value.title,
  description: () => copy.value.description,
  path: () => (isEn.value ? "/en/portafolio" : "/portafolio"),
  locale: () => locale.value,
});

const active = ref<ProjectCategory>("todos");
const filters = computed(() => copy.value.filters);
const filtered = computed(() =>
  active.value === "todos"
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(active.value)),
);
</script>

<template>
  <main id="main" :lang="locale">
    <header class="td-page-hero page-header">
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
      <div class="td-container">
        <div
          class="filters"
          role="tablist"
          :aria-label="isEn ? 'Filters' : 'Filtros'"
        >
          <button
            v-for="f in filters"
            :key="f.id"
            type="button"
            class="tab"
            :class="{ on: active === f.id }"
            @click="active = f.id as ProjectCategory"
          >
            {{ f.label }}
          </button>
        </div>
        <p v-if="!filtered.length" class="td-muted">{{ copy.empty }}</p>
        <div class="td-card-grid cols-2">
          <article v-for="p in filtered" :key="p.slug" class="card">
            <NuxtLink :to="localePath(`/portafolio/${p.slug}`)">
              <img :src="p.thumbnail" :alt="p.name" width="800" height="600" loading="lazy" />
            </NuxtLink>
            <NuxtLink :to="localePath(`/portafolio/${p.slug}`)" class="name">{{ p.name }}</NuxtLink>
            <p class="td-muted">{{ p.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="td-section band">
      <div class="td-container">
        <h2>{{ copy.bandTitle }}</h2>
        <p class="td-muted band-body">{{ copy.bandBody }}</p>
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
  font-size: clamp(2.1rem, 7vw, 4rem);
  letter-spacing: var(--tracking-display);
  max-width: 16ch;
  overflow-wrap: anywhere;
}
.lead {
  max-width: 40rem;
  margin-top: 1.25rem;
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.tab {
  border: 1px solid var(--line);
  background: transparent;
  color: inherit;
  border-radius: 999px;
  min-height: 2.5rem;
  padding: 0.45rem 0.85rem;
  font: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}
.tab.on {
  border-color: var(--color-brand);
  background: color-mix(in srgb, var(--color-brand) 22%, transparent);
}
.card img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 20px;
}
.name {
  display: inline-block;
  margin-top: 0.85rem;
  font-weight: 700;
  font-size: 1.15rem;
}
.band h2 {
  max-width: 22ch;
}
.band-body {
  max-width: 36rem;
  margin-top: 0.75rem;
}
.band .td-btn {
  margin-top: 1.25rem;
}
</style>
