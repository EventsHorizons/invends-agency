<script setup lang="ts">
import { getAdjacentProjects, getProject } from "~/utils/siteData";

const route = useRoute();
const slug = String(route.params.slug);
const project = getProject(slug);
if (!project) {
  throw createError({ statusCode: 404, statusMessage: "Proyecto no encontrado" });
}
const { prev, next } = getAdjacentProjects(slug);

useHead({ title: `${project.name} | Invends` });
</script>

<template>
  <main id="main" class="case">
    <header class="td-section">
      <div class="td-container">
        <p class="td-eyebrow">{{ project.client }} · {{ project.year }}</p>
        <h1>{{ project.name }}</h1>
        <p v-if="project.heroMetric" class="metric td-accent">{{ project.heroMetric }}</p>
        <img
          class="hero-img"
          :src="project.thumbnail"
          :alt="project.name"
          width="1200"
          height="800"
          decoding="async"
          fetchpriority="high"
        />
      </div>
    </header>

    <section class="td-section">
      <div class="td-container-narrow">
        <h2>El reto</h2>
        <p>{{ project.challenge }}</p>
        <h2>La solución</h2>
        <p>
          {{
            project.solution ||
            "Definimos brief, forma y pantalla en paralelo para responder al reto con criterio compartido."
          }}
        </p>
        <template v-if="project.results">
          <h2>Nota</h2>
          <p>{{ project.results }}</p>
        </template>
        <p v-if="project.tags?.length" class="tags">
          <span v-for="t in project.tags" :key="t">{{ t }}</span>
        </p>
      </div>
    </section>

    <nav class="td-container adj" aria-label="Proyectos adyacentes">
      <NuxtLink v-if="prev" :to="`/portafolio/${prev.slug}`">Anterior: {{ prev.name }}</NuxtLink>
      <NuxtLink to="/portafolio">Volver al portafolio</NuxtLink>
      <NuxtLink v-if="next" :to="`/portafolio/${next.slug}`">Siguiente: {{ next.name }}</NuxtLink>
    </nav>

    <section class="td-section band">
      <div class="td-container">
        <h2>¿Quieres aplicar este enfoque a tu marca?</h2>
        <NuxtLink class="td-btn" to="/contacto#contacto-form">
          Solicitar conversación
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  letter-spacing: var(--tracking-display);
}
.metric {
  margin-top: 0.75rem;
  font-weight: 600;
}
.hero-img {
  width: 100%;
  margin-top: 2rem;
  aspect-ratio: 3/2;
  object-fit: cover;
  border-radius: 20px;
}
h2 {
  margin: 2rem 0 0.75rem;
  font-size: 1.4rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
.tags span {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  font-size: 0.75rem;
}
.adj {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  padding-bottom: 2rem;
  font-size: 0.9rem;
}
.band h2 {
  margin: 0 0 0.85rem;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}
</style>
