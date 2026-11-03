<script setup lang="ts">
import { BLOG_POSTS, getBlogPost } from "~/utils/trespiData";

const route = useRoute();
const slug = String(route.params.slug);
const post = getBlogPost(slug);
if (!post) {
  throw createError({ statusCode: 404, statusMessage: "Artículo no encontrado" });
}
const related = BLOG_POSTS.filter(
  (p) => p.slug !== slug && p.category === post.category,
).slice(0, 3);
const relatedFallback =
  related.length > 0
    ? related
    : BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

useHead({ title: `${post.title} | Invends` });
</script>

<template>
  <main id="main" class="article-page">
    <article class="td-section article">
      <div class="td-container article-shell">
        <nav class="crumb" aria-label="Miga de pan">
          <NuxtLink to="/blog">Blog</NuxtLink>
          <span aria-hidden="true">/</span>
          <span>{{ post.category }}</span>
        </nav>

        <header class="article-head">
          <p class="meta">
            <span class="cat">{{ post.category }}</span>
            <span aria-hidden="true">·</span>
            <time>{{ post.date }}</time>
            <span aria-hidden="true">·</span>
            <span>{{ post.readTime }} de lectura</span>
          </p>
          <h1>{{ post.title }}</h1>
          <p class="excerpt">{{ post.excerpt }}</p>
        </header>

        <img
          class="cover"
          :src="post.image"
          :alt="post.title"
          width="1200"
          height="675"
          decoding="async"
          fetchpriority="high"
        />

        <div class="prose">
          <p v-for="(para, i) in post.content" :key="i">{{ para }}</p>
        </div>

        <aside class="article-cta">
          <h2>¿Quieres llevar esto a tu proyecto?</h2>
          <p class="td-muted">
            Si este criterio encaja con lo que estás construyendo, cuéntanos el
            objetivo y te respondemos con alcance.
          </p>
          <div class="cta-row">
            <NuxtLink class="td-btn" to="/contacto#contacto-form">
              Hablar con Invends
            </NuxtLink>
            <NuxtLink class="td-link" to="/blog">Volver al blog</NuxtLink>
          </div>
        </aside>
      </div>
    </article>

    <section class="td-section related">
      <div class="td-container">
        <h2>Artículos relacionados</h2>
        <div class="related-grid">
          <NuxtLink
            v-for="r in relatedFallback"
            :key="r.slug"
            :to="`/blogs-trespi/${r.slug}`"
            class="rel"
          >
            <img
              :src="r.image"
              :alt="r.title"
              width="640"
              height="400"
              loading="lazy"
              decoding="async"
            />
            <p class="td-muted">{{ r.category }} · {{ r.date }}</p>
            <p class="title">{{ r.title }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.article-shell {
  max-width: 42rem;
}
.crumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--muted);
  margin-bottom: 1.25rem;
}
.crumb a {
  color: var(--color-lavender);
  font-weight: 600;
}
.article-head h1 {
  margin: 0.45rem 0 0.85rem;
  font-size: clamp(2rem, 5vw, 3.15rem);
  letter-spacing: var(--tracking-display);
  line-height: 1.08;
}
.meta {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.cat {
  color: var(--color-lavender);
  font-weight: 600;
}
.excerpt {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.45;
  color: var(--muted);
  max-width: 38ch;
}
.cover {
  width: 100%;
  margin: 1.75rem 0 2rem;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 20px;
}
.prose {
  font-size: 1.05rem;
  line-height: 1.7;
}
.prose p {
  margin: 0 0 1.25rem;
  max-width: 65ch;
}
.article-cta {
  margin-top: 2.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--line);
}
.article-cta h2 {
  margin: 0 0 0.55rem;
  font-size: clamp(1.25rem, 2.4vw, 1.65rem);
}
.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 1.1rem;
}
.related h2 {
  margin: 0 0 1.5rem;
  font-size: clamp(1.4rem, 3vw, 2rem);
}
.related-grid {
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 720px) {
  .related-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.rel {
  display: grid;
  gap: 0.55rem;
}
.rel img {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  border-radius: 20px;
  background: var(--color-surface);
}
.rel .title {
  margin: 0;
  font-weight: 700;
  letter-spacing: var(--tracking-title);
  line-height: 1.25;
}
</style>
