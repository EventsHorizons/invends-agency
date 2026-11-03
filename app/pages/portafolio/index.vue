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
        title: "Work | Invends",
        eyebrow: "Work · Method samples",
        h1Before: "Ideas that become",
        h1Accent: "real experiences",
        lead: "Conceptual method pieces: they show how we approach design, development and marketing. These are not published client case studies.",
        bandTitle: "Method visible on screen.",
        bandBody:
          "Each sample is best read as a digital product: hierarchy, journey and real use.",
        bandCta: "Talk about a project",
        empty: "No samples in this category.",
        filters: [
          { id: "todos", label: "All" },
          { id: "diseno", label: "Design" },
          { id: "tecnologia", label: "Development" },
          { id: "marketing", label: "Marketing" },
          { id: "contenido", label: "Content" },
        ] as const,
      }
    : {
        title: "Proyectos | Invends",
        eyebrow: "Proyectos · Muestras de enfoque",
        h1Before: "Ideas que se convierten en",
        h1Accent: "experiencias reales",
        lead: "Piezas conceptuales de método: ilustran cómo abordamos diseño, desarrollo y marketing. No son casos de cliente publicados.",
        bandTitle: "Método visible en pantalla.",
        bandBody:
          "Cada muestra se entiende mejor como producto digital: jerarquía, recorrido y uso real.",
        bandCta: "Hablar de un proyecto",
        empty: "No hay muestras en esta categoría.",
        filters: PROJECT_FILTERS,
      },
);

useHead({
  title: () => copy.value.title,
  htmlAttrs: { lang: () => locale.value },
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

    <section class="td-section band">
      <div class="td-container">
        <h2>{{ copy.bandTitle }}</h2>
        <p class="td-muted">{{ copy.bandBody }}</p>
        <NuxtLink class="td-btn" :to="localePath('/contacto')">
          {{ copy.bandCta }}
        </NuxtLink>
      </div>
    </section>

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
        <h2>{{ isEn ? "Got a project in mind?" : "¿Tienes un proyecto en mente?" }}</h2>
        <NuxtLink class="td-btn" :to="`${localePath('/contacto')}#contacto-form`">
          {{ isEn ? "Talk to Invends" : "Hablar con Invends" }}
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
  max-width: 18ch;
}
.band .td-btn {
  margin-top: 1.25rem;
}
</style>
