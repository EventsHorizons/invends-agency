<script setup lang="ts">
const { locale, isEn, localePath } = useLocale();

const copy = computed(() =>
  isEn.value
    ? {
        title: "About | Invends",
        description:
          "Invends is a web design, development and digital marketing agency. See how we work.",
        eyebrow: "About Invends",
        h1: "Design that attracts. Technology that drives.",
        lead: "We are a web design, development and digital marketing agency. We work with clarity: fewer loose pieces, more projects aligned to the business goal.",
        capabilities: [
          {
            title: "Digital experiences that make you easy to choose.",
            cta: "See web design",
            to: "/servicios#diseno-web",
          },
          {
            title: "Sites and landings that work for the business.",
            cta: "See development",
            to: "/servicios#desarrollo-web",
          },
          {
            title: "Message and content to reach the right people.",
            cta: "See marketing",
            to: "/servicios#marketing-digital",
          },
          {
            title: "Identity, web and communication in one brief.",
            cta: "See projects",
            to: "/portafolio",
          },
          {
            title: "Performance, usability and maintenance with judgment.",
            cta: "See services",
            to: "/servicios",
          },
          {
            title: "We work from Bogotá with clients across LATAM.",
            cta: "Contact",
            to: "/contacto",
          },
        ],
        principlesTitle: "What we don’t negotiate",
        values: [
          {
            number: "01",
            title: "Clarity",
            description:
              "We explain what we do and why. We prefer precision over empty phrases.",
          },
          {
            number: "02",
            title: "Craft",
            description:
              "Design, development and marketing get the same level of care.",
          },
          {
            number: "03",
            title: "Judgment",
            description:
              "Every decision answers the project goal, not the trend of the week.",
          },
          {
            number: "04",
            title: "Useful delivery",
            description:
              "What we publish must be usable, measurable and improvable over time.",
          },
        ],
        teamEyebrow: "Team",
        teamTitle: "How the studio is organized",
        teamBody:
          "We work by real crafts—design, development and marketing—not invented titles. Here you can see the areas and roles that structure each project.",
        areas: ["Design", "Development", "Marketing", "Creative", "Operations"],
        areasLabel: "Studio areas",
        teamCta: "See team roles",
        bandTitle: "Got a project in mind?",
        bandBody: "Write to us and we’ll reply with clear scope.",
        bandCta: "Go to contact",
      }
    : {
        title: "Nosotros | Invends",
        description:
          "Invends es una agencia de diseño web, desarrollo web y marketing digital. Conoce cómo trabajamos.",
        eyebrow: "Sobre Invends",
        h1: "Diseño que atrae. Tecnología que impulsa.",
        lead: "Somos una agencia de diseño web, desarrollo y marketing digital. Trabajamos con claridad: menos piezas sueltas, más proyectos alineados al objetivo del negocio.",
        capabilities: [
          {
            title: "Experiencias digitales que hacen fácil elegirte.",
            cta: "Ver diseño web",
            to: "/servicios#diseno-web",
          },
          {
            title: "Sitios y landings que funcionan para el negocio.",
            cta: "Ver desarrollo",
            to: "/servicios#desarrollo-web",
          },
          {
            title: "Mensaje y contenido para llegar a las personas correctas.",
            cta: "Ver marketing",
            to: "/servicios#marketing-digital",
          },
          {
            title: "Identidad, web y comunicación en un mismo brief.",
            cta: "Ver proyectos",
            to: "/portafolio",
          },
          {
            title: "Rendimiento, usabilidad y mantenimiento con criterio.",
            cta: "Ver servicios",
            to: "/servicios",
          },
          {
            title: "Trabajamos desde Bogotá con clientes en LATAM.",
            cta: "Contactar",
            to: "/contacto",
          },
        ],
        principlesTitle: "Lo que no negociamos",
        values: [
          {
            number: "01",
            title: "Claridad",
            description:
              "Explicamos qué hacemos y por qué. Preferimos precisión a frases vacías.",
          },
          {
            number: "02",
            title: "Oficio",
            description:
              "Diseño, desarrollo y marketing se tratan con el mismo nivel de cuidado.",
          },
          {
            number: "03",
            title: "Criterio",
            description:
              "Cada decisión responde al objetivo del proyecto, no a la moda de la semana.",
          },
          {
            number: "04",
            title: "Entrega útil",
            description:
              "Lo que publicamos debe poder usarse, medirse y mejorarse con el tiempo.",
          },
        ],
        teamEyebrow: "Equipo",
        teamTitle: "Cómo está organizado el estudio",
        teamBody:
          "Trabajamos por oficios reales —diseño, desarrollo y marketing— no por cargos inventados. Aquí puedes ver las áreas y roles con los que estructuramos cada proyecto.",
        areas: ["Diseño", "Desarrollo", "Marketing", "Creativo", "Administración"],
        areasLabel: "Áreas del estudio",
        teamCta: "Ver roles del equipo",
        bandTitle: "¿Tienes un proyecto en mente?",
        bandBody: "Escríbenos y te respondemos con alcance claro.",
        bandCta: "Ir a contacto",
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
