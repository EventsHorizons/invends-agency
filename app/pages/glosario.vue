<script setup lang="ts">
usePageSeo({
  title: "Glosario | Invends",
  description:
    "Términos de diseño, desarrollo y marketing usados en el trabajo de Invends.",
  path: "/glosario",
  locale: "es",
  robots: "noindex,follow",
  noAlternates: true,
});

const terms = [
  {
    term: "Brief",
    def: "Documento o conversación que define objetivo, audiencia, restricciones y siguiente paso esperado antes de diseñar o desarrollar.",
  },
  {
    term: "Design system",
    def: "Conjunto de componentes, tokens y reglas que mantienen coherencia visual y funcional entre pantallas y equipos.",
  },
  {
    term: "UI / UX",
    def: "Interfaz y experiencia: cómo se ve, se entiende y se recorre un producto digital, incluyendo estados y fricciones.",
  },
  {
    term: "Performance",
    def: "Rendimiento percibido y medible de un sitio: carga, interactividad y estabilidad visual en dispositivos reales.",
  },
  {
    term: "CTA",
    def: "Call to action: la acción concreta que se pide al visitante (contacto, agenda, descarga) con un mensaje claro.",
  },
  {
    term: "SEO editorial",
    def: "Estructura de contenido, títulos y semántica que ayudan a que el sitio se encuentre y se entienda, sin sacrificar claridad.",
  },
  {
    term: "Landing",
    def: "Página con una sola tarea comercial: explicar una oferta y facilitar el siguiente paso sin distracciones.",
  },
  {
    term: "Señal",
    def: "En Invends: el mensaje, el contenido y la activación que dan presencia a la marca fuera y dentro del sitio.",
  },
];
</script>

<template>
  <main id="main">
    <header class="td-page-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container-narrow">
        <p class="td-eyebrow">Recursos</p>
        <h1>Palabras que usamos con precisión.</h1>
        <p class="lead td-muted">
          Un vocabulario corto para hablar de diseño, desarrollo y marketing
          sin humo.
        </p>
      </div>
    </header>
    <section class="td-section" style="padding-top: 0">
      <div class="td-container-narrow">
        <dl>
          <div v-for="t in terms" :key="t.term" class="term">
            <dt>{{ t.term }}</dt>
            <dd class="td-muted">{{ t.def }}</dd>
          </div>
        </dl>
        <NuxtLink class="td-btn" to="/blog">Ir al blog</NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  margin: 0 0 2rem;
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  letter-spacing: var(--tracking-display);
}
.term {
  border-top: 1px solid var(--line);
  padding: 1.25rem 0;
}
dt {
  font-weight: 800;
  margin-bottom: 0.35rem;
}
dd {
  margin: 0;
}
.td-btn {
  margin-top: 1.5rem;
}
</style>
