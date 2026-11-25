<script setup lang="ts">
import { BLOG_POSTS } from "~/utils/blogData";

definePageMeta({
  alias: ["/en/blog"],
});

const { locale, isEn, localePath } = useLocale();

usePageSeo({
  title: () =>
    isEn.value
      ? "Blog | Web design, UX & digital strategy — Invends"
      : "Blog | Diseño web, UX y estrategia digital — Invends",
  description: () =>
    isEn.value
      ? "Ideas on web design, UX and digital strategy—written to help you decide with more calm and clarity."
      : "Ideas sobre diseño web, UX y estrategia digital —escritas para ayudarte a decidir con más calma y claridad.",
  path: () => (isEn.value ? "/en/blog" : "/blog"),
  locale: () => locale.value,
});

const [featured, ...rest] = BLOG_POSTS;
const categories = computed(() =>
  [...new Set(BLOG_POSTS.map((p) => p.category))],
);
const active = ref<string | null>(null);
const filtered = computed(() =>
  active.value ? rest.filter((p) => p.category === active.value) : rest,
);

function setCategory(cat: string | null) {
  active.value = cat;
}
</script>

<template>
  <main id="main" class="blog-index">
    <header class="td-page-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container">
        <p class="td-eyebrow">Blog</p>
        <h1>
          {{ isEn ? "Notes on" : "Notas sobre" }}
          <span class="td-accent">{{ isEn ? "digital" : "digital" }}</span>.
        </h1>
        <p class="lead td-muted">
          {{
            isEn
              ? "Design, development and marketing—written to help you decide."
              : "Diseño, desarrollo y marketing —para decidir con más criterio."
          }}
        </p>
      </div>
    </header>

    <section v-if="featured" class="td-section featured-section">
      <div class="td-container">
        <p class="section-label td-muted">{{ isEn ? "Featured" : "Destacado" }}</p>
        <NuxtLink :to="`/blog/${featured.slug}`" class="featured">
          <div class="featured-media">
            <img
              :src="featured.image"
              :alt="featured.title"
              width="1200"
              height="675"
              decoding="async"
              fetchpriority="high"
            />
          </div>
          <div class="featured-copy">
            <p class="meta">
              <span class="cat">{{ featured.category }}</span>
              <span aria-hidden="true">·</span>
              <time>{{ featured.date }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ featured.readTime }}</span>
            </p>
            <h2>{{ featured.title }}</h2>
            <p class="td-muted excerpt">{{ featured.excerpt }}</p>
            <span class="read-cta">{{ isEn ? "Read article" : "Leer artículo" }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="td-section list-section">
      <div class="td-container">
        <div class="list-head">
          <h2 class="block">{{ isEn ? "All articles" : "Todos los artículos" }}</h2>
          <div
            class="filters"
            role="group"
            :aria-label="isEn ? 'Filter by category' : 'Filtrar por categoría'"
          >
            <button
              type="button"
              class="chip"
              :aria-pressed="active === null"
              @click="setCategory(null)"
            >
              {{ isEn ? "All" : "Todos" }}
            </button>
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              class="chip"
              :aria-pressed="active === cat"
              @click="setCategory(cat)"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="post-grid">
          <article v-for="post in filtered" :key="post.slug" class="card">
            <NuxtLink :to="`/blog/${post.slug}`" class="card-link">
              <div class="card-media">
                <img
                  :src="post.image"
                  :alt="post.title"
                  width="800"
                  height="500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p class="meta">
                <span class="cat">{{ post.category }}</span>
                <span aria-hidden="true">·</span>
                <time>{{ post.date }}</time>
              </p>
              <h3>{{ post.title }}</h3>
              <p class="td-muted">{{ post.excerpt }}</p>
            </NuxtLink>
          </article>
        </div>

        <p v-if="!filtered.length" class="td-muted empty">
          No hay artículos en esta categoría por ahora.
        </p>

        <div class="diagnostic-banner">
          <div class="diag-banner-content">
            <span class="diag-tag">{{ isEn ? "Free Interactive Tool" : "Herramienta Gratuita" }}</span>
            <h3>{{ isEn ? "Evaluate your website's digital health" : "¿Tu sitio web actual construye reputación o pierde ventas?" }}</h3>
            <p class="td-muted">
              {{
                isEn
                  ? "Test speed, B2B clarity, mobile experience, and SEO with our 7-point interactive assessment."
                  : "Mide velocidad, claridad comercial, experiencia móvil y SEO técnico en menos de 3 minutos con nuestro test interactivo."
              }}
            </p>
          </div>
          <NuxtLink class="td-btn diag-btn" :to="localePath('/diagnostico')">
            {{ isEn ? "Take the Test" : "Hacer Test de Salud Digital" }}
          </NuxtLink>
        </div>

        <aside class="blog-cta">
          <h2>{{ isEn ? "A project in mind?" : "¿Un proyecto en mente?" }}</h2>
          <p class="td-muted">
            {{
              isEn
                ? "We reply with clear scope—design, development or marketing."
                : "Respondemos con alcance claro —diseño, desarrollo o marketing."
            }}
          </p>
          <NuxtLink class="td-btn" :to="`${localePath('/contacto')}#contacto-form`">
            {{ isEn ? "Contact" : "Contacto" }}
          </NuxtLink>
        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
.featured-section {
  padding-top: 0;
}
h1 {
  margin: 0;
  font-size: clamp(2.2rem, 5vw, 3.8rem);
  letter-spacing: var(--tracking-display);
  max-width: 16ch;
}
.lead {
  max-width: 40rem;
  margin-top: 1.25rem;
}
.section-label {
  margin: 0 0 0.85rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.featured {
  display: grid;
  gap: 1.5rem;
  align-items: center;
}
@media (min-width: 900px) {
  .featured {
    grid-template-columns: 1.15fr 0.95fr;
    gap: 2.5rem;
  }
}
.featured-media {
  overflow: hidden;
  border-radius: 20px;
  background: var(--color-surface);
}
.featured-media img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
}
.featured-copy h2 {
  margin: 0.5rem 0 0.75rem;
  font-size: clamp(1.55rem, 3vw, 2.35rem);
  letter-spacing: var(--tracking-title);
  line-height: 1.12;
}
.excerpt {
  margin: 0;
  max-width: 38ch;
}
.read-cta {
  display: inline-block;
  margin-top: 1.25rem;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-lavender);
}
.meta {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.cat {
  color: var(--color-lavender);
  font-weight: 600;
}
.list-head {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
@media (min-width: 800px) {
  .list-head {
    grid-template-columns: 1fr auto;
    align-items: end;
  }
}
.block {
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.chip {
  border: 1px solid var(--line);
  background: transparent;
  color: var(--fg);
  border-radius: 999px;
  min-height: 2.5rem;
  padding: 0.4rem 0.75rem;
  font-size: 0.78rem;
}
.chip[aria-pressed="true"] {
  border-color: var(--color-brand);
  background: color-mix(in srgb, var(--color-brand) 16%, transparent);
}
.post-grid {
  display: grid;
  gap: 1.75rem;
}
@media (min-width: 720px) {
  .post-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem 1.5rem;
  }
}
.card-link {
  display: grid;
  gap: 0.75rem;
  height: 100%;
}
.card-media {
  overflow: hidden;
  border-radius: 20px;
  background: var(--color-surface);
}
.card-media img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  transition: transform 0.55s var(--ease);
}
.card-link:hover .card-media img {
  transform: scale(1.015);
}
.card h3 {
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: var(--tracking-title);
  line-height: 1.25;
}
.card .td-muted {
  margin: 0;
  font-size: 0.95rem;
}
.empty {
  margin-top: 1rem;
}
.diagnostic-banner {
  margin-top: 4rem;
  padding: 2.25rem;
  border-radius: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
}
@media (min-width: 800px) {
  .diagnostic-banner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.diag-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-lavender);
  margin-bottom: 0.4rem;
}
.diag-banner-content h3 {
  margin: 0 0 0.5rem;
  font-size: clamp(1.3rem, 2.5vw, 1.75rem);
}
.diag-banner-content p {
  margin: 0;
  max-width: 42ch;
  font-size: 0.95rem;
}
.diag-btn {
  white-space: nowrap;
}
.blog-cta {
  margin-top: 3.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line);
  max-width: 36rem;
}
.blog-cta h2 {
  margin: 0 0 0.65rem;
  font-size: clamp(1.35rem, 2.5vw, 1.85rem);
}
.blog-cta .td-btn {
  margin-top: 1.1rem;
}
</style>
