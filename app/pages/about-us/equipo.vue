<script setup lang="ts">
import { TEAM, TEAM_FILTERS } from "~/utils/siteData";

definePageMeta({
  alias: ["/en/about-us/equipo"],
});

const { locale, isEn } = useLocale();

usePageSeo({
  title: () => (isEn.value ? "Team | Invends" : "Equipo | Invends"),
  description: () =>
    isEn.value
      ? "Roles and areas Invends uses to organize design, development and marketing on every project."
      : "Roles y áreas con las que Invends organiza diseño, desarrollo y marketing en cada proyecto.",
  path: () =>
    isEn.value ? "/en/about-us/equipo" : "/about-us/equipo",
  locale: () => locale.value,
});

const active = ref("Todos");
const filtered = computed(() =>
  active.value === "Todos" ? TEAM : TEAM.filter((t) => t.area === active.value),
);
</script>

<template>
  <main id="main">
    <header class="td-page-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container">
        <p class="td-eyebrow">Equipo</p>
        <h1>Roles del estudio</h1>
        <p class="lead td-muted">
          Filtra por área para ver cómo repartimos el trabajo en diseño,
          desarrollo, marketing y producción. Publicamos roles verificables,
          no perfiles inventados.
        </p>
      </div>
    </header>

    <section class="td-section" style="padding-top: 0">
      <div class="td-container">
        <div class="filters">
          <button
            v-for="f in TEAM_FILTERS"
            :key="f"
            type="button"
            class="tab"
            :class="{ on: active === f }"
            @click="active = f"
          >
            {{ f }}
          </button>
        </div>
        <p v-if="!filtered.length" class="td-muted">
          No hay roles publicados en esta área por ahora.
        </p>
        <div class="td-card-grid cols-3">
          <article v-for="m in filtered" :key="m.name" class="role">
            <h2>{{ m.name }}</h2>
            <p class="td-muted">{{ m.role }}</p>
            <p class="area">{{ m.area }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="td-section band">
      <div class="td-container">
        <h2>¿Quieres colaborar con el estudio?</h2>
        <NuxtLink class="td-btn" to="/contacto#contacto-form">
          Escríbenos
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  letter-spacing: var(--tracking-display);
  max-width: 14ch;
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
  padding: 0.45rem 0.85rem;
  font: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}
.tab.on {
  border-color: var(--color-brand);
  background: color-mix(in srgb, var(--color-brand) 22%, transparent);
}
.role {
  border-top: 1px solid var(--line);
  padding-top: 1rem;
}
.role h2 {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
}
.area {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-lavender);
}
.band h2 {
  margin: 0 0 0.85rem;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}
</style>
