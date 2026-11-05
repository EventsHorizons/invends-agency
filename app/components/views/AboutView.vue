<script setup lang="ts">
const { locale, isEn, localePath } = useLocale();

const copy = computed(() =>
  isEn.value
    ? {
        title: "About Invends | Design, development & marketing",
        description:
          "Invends: web design, development and digital marketing. Clear form, scoped phases. Bogotá / LATAM.",
        eyebrow: "About",
        h1: "Craft and scope.",
        lead: "We shape sites, products and messages people understand. Precise questions. Scope you can review.",
        capabilities: [
          {
            title: "Web design",
            cta: "See design",
            to: "/servicios/diseno-web",
          },
          {
            title: "Development",
            cta: "See development",
            to: "/servicios/desarrollo-web",
          },
          {
            title: "Marketing",
            cta: "See marketing",
            to: "/servicios/marketing-digital",
          },
          {
            title: "Method samples",
            cta: "See work",
            to: "/portafolio",
          },
          {
            title: "All services",
            cta: "See services",
            to: "/servicios",
          },
          {
            title: "Bogotá / LATAM",
            cta: "Contact",
            to: "/contacto",
          },
        ],
        principlesTitle: "Principles",
        values: [
          {
            number: "01",
            title: "Clarity",
            description: "We say what fits this phase—and what doesn’t.",
          },
          {
            number: "02",
            title: "Craft",
            description: "Design, code and message get the same care.",
          },
          {
            number: "03",
            title: "Judgment",
            description: "Decisions follow the project, not the trend.",
          },
          {
            number: "04",
            title: "Use",
            description: "What we ship should be usable and improvable.",
          },
        ],
        teamEyebrow: "Team",
        teamTitle: "Studio structure",
        teamBody:
          "Real crafts—design, development, marketing—not invented titles.",
        areas: ["Design", "Development", "Marketing", "Creative", "Operations"],
        areasLabel: "Studio areas",
        teamCta: "See roles",
        bandTitle: "Have an idea?",
        bandBody: "Even a rough one works. We reply with scope.",
        bandCta: "Let’s talk",
      }
    : {
        title: "Nosotros | Diseño web y marketing — Invends",
        description:
          "Invends: diseño web, desarrollo y marketing digital. Forma clara y alcance por fase. Bogotá / LATAM.",
        eyebrow: "Nosotros",
        h1: "Oficio y alcance.",
        lead: "Damos forma a sitios, productos y mensajes que se entienden. Preguntas precisas. Alcance revisable.",
        capabilities: [
          {
            title: "Diseño web",
            cta: "Ver diseño",
            to: "/servicios/diseno-web",
          },
          {
            title: "Desarrollo",
            cta: "Ver desarrollo",
            to: "/servicios/desarrollo-web",
          },
          {
            title: "Marketing",
            cta: "Ver marketing",
            to: "/servicios/marketing-digital",
          },
          {
            title: "Muestras",
            cta: "Ver proyectos",
            to: "/portafolio",
          },
          {
            title: "Servicios",
            cta: "Ver servicios",
            to: "/servicios",
          },
          {
            title: "Bogotá / LATAM",
            cta: "Contacto",
            to: "/contacto",
          },
        ],
        principlesTitle: "Principios",
        values: [
          {
            number: "01",
            title: "Claridad",
            description: "Decimos qué entra en esta fase —y qué no.",
          },
          {
            number: "02",
            title: "Oficio",
            description: "Diseño, código y mensaje con el mismo cuidado.",
          },
          {
            number: "03",
            title: "Criterio",
            description: "La decisión sigue al proyecto, no a la moda.",
          },
          {
            number: "04",
            title: "Uso",
            description: "Lo publicado debe poder usarse y mejorarse.",
          },
        ],
        teamEyebrow: "Equipo",
        teamTitle: "Estructura",
        teamBody:
          "Oficios reales —diseño, desarrollo, marketing— no cargos inventados.",
        areas: ["Diseño", "Desarrollo", "Marketing", "Creativo", "Administración"],
        areasLabel: "Áreas",
        teamCta: "Ver roles",
        bandTitle: "¿Tienes una idea?",
        bandBody: "Aunque esté a medias. Respondemos con alcance.",
        bandCta: "Hablemos",
      },
);

usePageSeo({
  title: () => copy.value.title,
  description: () => copy.value.description,
  path: () => (isEn.value ? "/en/sobre-nosotros" : "/sobre-nosotros"),
  locale: () => locale.value,
});
</script>

<template>
  <main id="main" :lang="locale">
    <section class="about-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container copy">
        <p class="td-eyebrow">{{ copy.eyebrow }}</p>
        <h1>{{ copy.h1 }}</h1>
        <p class="lead">{{ copy.lead }}</p>
      </div>
    </section>

    <section class="td-section">
      <div class="td-container td-card-grid cols-2">
        <article
          v-for="item in copy.capabilities"
          :key="item.title"
          class="cap"
        >
          <h2>{{ item.title }}</h2>
          <NuxtLink class="td-link" :to="localePath(item.to)">
            {{ item.cta }}
          </NuxtLink>
        </article>
      </div>
    </section>

    <section class="td-section principles">
      <div class="td-container">
        <h2 class="block-title">{{ copy.principlesTitle }}</h2>
        <div class="td-card-grid cols-2">
          <article v-for="value in copy.values" :key="value.number" class="stat">
            <p class="td-muted">{{ value.number }}.</p>
            <p class="stat-title">{{ value.title }}</p>
            <p class="td-muted">{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="td-section team-preview">
      <div class="td-container">
        <p class="td-eyebrow">{{ copy.teamEyebrow }}</p>
        <h2 class="block-title">{{ copy.teamTitle }}</h2>
        <p class="td-muted lead-team">{{ copy.teamBody }}</p>
        <ul class="area-list" :aria-label="copy.areasLabel">
          <li v-for="a in copy.areas" :key="a">{{ a }}</li>
        </ul>
        <NuxtLink class="td-btn" :to="localePath('/about-us/equipo')">
          {{ copy.teamCta }}
        </NuxtLink>
      </div>
    </section>

    <section class="td-section band">
      <div class="td-container">
        <h2>{{ copy.bandTitle }}</h2>
        <p class="td-muted">{{ copy.bandBody }}</p>
        <NuxtLink class="td-btn" :to="`${localePath('/contacto')}#contacto-form`">
          {{ copy.bandCta }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-hero {
  position: relative;
  min-height: clamp(22rem, 70vh, 40rem);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-fx {
  position: absolute !important;
  inset: 0;
}
.copy {
  position: relative;
  z-index: 1;
  padding: calc(var(--header-h) + env(safe-area-inset-top, 0px) + 1.5rem) 0
    clamp(2.5rem, 6vw, 4rem);
  min-width: 0;
}
h1 {
  margin: 0;
  max-width: 18ch;
  font-size: clamp(2.1rem, 7vw, 4.2rem);
  letter-spacing: var(--tracking-display);
  overflow-wrap: anywhere;
}
.lead {
  max-width: 40rem;
  margin-top: 1.5rem;
}
.cap {
  border-top: 1px solid var(--line);
  padding-top: 1.5rem;
  min-height: 180px;
}
.cap h2 {
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
}
.block-title {
  margin: 0 0 1.5rem;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  max-width: 18ch;
}
.stat {
  border-top: 1px solid var(--line);
  padding-top: 1rem;
}
.stat-title {
  margin: 0.35rem 0 0.75rem;
  font-size: 2rem;
  font-weight: 800;
}
.band h2 {
  margin: 0 0 0.65rem;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}
.band .td-btn {
  margin-top: 1.1rem;
}
.team-preview .td-eyebrow {
  margin-bottom: 0.75rem;
}
.lead-team {
  max-width: 36rem;
  margin: 0 0 1.5rem;
}
.area-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.72;
}
.area-list li {
  border-bottom: 1px solid var(--line);
  padding-bottom: 0.15rem;
}
</style>
