<script setup lang="ts">
import { getProject } from "~/utils/trespiData";
import {
  HOME,
  HOME_METHODS,
  HOME_PILLARS_I18N,
  HOME_STRIP,
} from "~/utils/messages";

const { locale, localePath } = useLocale();
const copy = computed(() => HOME[locale.value]);
const strip = computed(() => HOME_STRIP[locale.value]);
const methods = computed(() => HOME_METHODS[locale.value]);
const pillars = computed(() => HOME_PILLARS_I18N[locale.value]);

useHead({
  title: () => copy.value.metaTitle,
  htmlAttrs: { lang: () => locale.value },
  meta: [
    {
      name: "description",
      content: () => copy.value.metaDescription,
    },
  ],
});

const featured = ["sistema-editorial-web", "lanzamiento-de-marca"]
  .map((slug) => getProject(slug)!)
  .filter(Boolean);

const expanded = ref<number | null>(null);
</script>

<template>
  <main id="main" class="home" :lang="locale">
    <HomeHero />

    <div
      id="home-after-hero"
      class="logos-wrap"
      :aria-label="copy.stripLabel"
    >
      <div class="logos-track">
        <div
          v-for="(c, i) in [...strip, ...strip]"
          :key="`${c.name}-${i}`"
          class="logo-item"
        >
          <span class="name">{{ c.name }}</span>
          <span class="years">{{ c.years }}</span>
        </div>
      </div>
    </div>

    <ServiceReel
      id-prefix="home-"
      :categories="pillars"
      :intro-title="copy.reelIntroTitle"
      :intro-accent="copy.reelIntroAccent"
      :intro-body="copy.reelIntroBody"
      :intro-cta-label="copy.reelIntroCta"
      :intro-cta-to="`${localePath('/')}#contacto-form`"
      :cta-label="copy.reelCta"
      :cta-to="localePath('/servicios')"
    />

    <section class="td-section testimonials">
      <div class="td-container">
        <h2>
          {{ copy.methodTitle }}
          <span class="td-accent">{{ copy.methodAccent }}</span>.
        </h2>
        <div class="td-card-grid cols-3">
          <article
            v-for="item in methods"
            :key="item.id"
            class="testimonial-card"
          >
            <div class="author">
              <span class="initial" aria-hidden="true">{{
                item.name.charAt(0)
              }}</span>
              <div>
                <p class="name">{{ item.name }}</p>
                <p class="role td-muted">{{ item.role }}</p>
              </div>
            </div>
            <p>
              {{
                expanded === item.id || item.quote.length <= 160
                  ? item.quote
                  : `${item.quote.slice(0, 160)}?`
              }}
            </p>
            <button
              v-if="item.quote.length > 160"
              type="button"
              class="toggle"
              @click="expanded = expanded === item.id ? null : item.id"
            >
              {{
                expanded === item.id ? copy.readLess : copy.readMore
              }}
            </button>
          </article>
        </div>
      </div>
    </section>

    <section class="td-section">
      <div class="td-container">
        <h2>
          {{ copy.projectsTitle }}
          <span class="td-accent">{{ copy.projectsAccent }}</span>.
        </h2>
        <p class="td-muted" style="max-width: 640px; margin: -0.5rem 0 2rem">
          {{ copy.projectsBody }}
        </p>
        <div class="td-card-grid cols-2">
          <article
            v-for="project in featured"
            :key="project.slug"
            class="project-card"
          >
            <NuxtLink :to="localePath(`/portafolio/${project.slug}`)">
              <img
                :src="project.thumbnail"
                :alt="project.name"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
              />
            </NuxtLink>
            <div class="project-info">
              <NuxtLink :to="localePath(`/portafolio/${project.slug}`)">
                <span class="project-name">{{ project.name }}</span>
              </NuxtLink>
              <p class="td-muted">{{ project.description }}</p>
            </div>
          </article>
        </div>
        <p style="margin-top: 2.5rem">
          <NuxtLink class="td-link" :to="localePath('/portafolio')">
            {{ copy.projectsLink }}
          </NuxtLink>
        </p>
      </div>
    </section>

    <SiteContactForm
      :locale="locale"
      :title="copy.formTitle"
      :description="copy.formDescription"
    />
  </main>
</template>

<style scoped>
.logos-wrap {
  overflow: hidden;
  max-width: 100%;
  border-block: 1px solid var(--line);
  padding: 1.25rem 0;
  contain: paint;
}
.logos-track {
  display: flex;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  width: max-content;
  animation: marquee 36s linear infinite;
}
.logo-item {
  display: grid;
  gap: 0.15rem;
  min-width: 8rem;
}
.logo-item .name {
  font-weight: 700;
  font-size: 0.95rem;
}
.logo-item .years {
  color: var(--muted);
  font-size: 0.75rem;
}
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.testimonials h2 {
  margin: 0 0 2rem;
  font-size: clamp(1.8rem, 4.5vw, 3rem);
  max-width: 22ch;
}
.testimonial-card {
  border-top: 1px solid var(--line);
  padding-top: 1.25rem;
}
.author {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}
.author .initial {
  flex: 0 0 2.75rem;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  font-weight: 700;
  color: var(--color-lavender);
  background: var(--color-surface);
}
.author .name {
  margin: 0;
  font-weight: 700;
}
.author .role {
  margin: 0;
  font-size: 0.8rem;
}
.toggle {
  margin-top: 0.75rem;
  border: 0;
  background: transparent;
  color: var(--color-lavender);
  padding: 0;
  font: inherit;
  text-decoration: underline;
}

.project-card img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  background: var(--color-surface);
  border-radius: 20px;
}
.project-info {
  padding-top: 1rem;
}
.project-name {
  font-weight: 700;
  font-size: 1.15rem;
}

@media (prefers-reduced-motion: reduce) {
  .logos-track {
    animation: none;
  }
}
</style>
