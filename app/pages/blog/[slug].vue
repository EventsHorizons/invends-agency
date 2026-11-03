<script setup lang="ts">
import { BLOG_POSTS, getBlogPost } from "~/utils/siteData";

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
useSeoMeta({
  description: post.excerpt,
  ogTitle: post.title,
  ogDescription: post.excerpt,
  ogImage: post.image,
});

function formatInline(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(.+?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(
      /\[(.+?)\]\((\/[^)]+|https?:\/\/[^)]+)\)/g,
      '<a href="$2">$1</a>',
    );
}
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

        <div v-if="post.blocks?.length" class="prose prose-rich">
          <template v-for="(block, i) in post.blocks" :key="i">
            <h2 v-if="block.type === 'h2'">{{ block.text }}</h2>
            <h3 v-else-if="block.type === 'h3'">{{ block.text }}</h3>
            <blockquote
              v-else-if="block.type === 'quote'"
              v-html="formatInline(block.text)"
            />
            <ul v-else-if="block.type === 'ul'">
              <li
                v-for="(item, j) in block.items"
                :key="j"
                v-html="formatInline(item)"
              />
            </ul>
            <ol v-else-if="block.type === 'ol'">
              <li
                v-for="(item, j) in block.items"
                :key="j"
                v-html="formatInline(item)"
              />
            </ol>
            <div v-else-if="block.type === 'table'" class="table-wrap">
              <table>
                <thead v-if="block.rows[0]">
                  <tr>
                    <th
                      v-for="(cell, c) in block.rows[0]"
                      :key="c"
                      v-html="formatInline(cell)"
                    />
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, r) in block.rows.slice(1)" :key="r">
                    <td
                      v-for="(cell, c) in row"
                      :key="c"
                      v-html="formatInline(cell)"
                    />
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else-if="block.type === 'p'" v-html="formatInline(block.text)" />
          </template>
        </div>
        <div v-else class="prose">
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
            :to="`/blog/${r.slug}`"
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
.prose-rich :deep(h2) {
  margin: 2.25rem 0 0.85rem;
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  letter-spacing: -0.03em;
  line-height: 1.2;
}
.prose-rich :deep(h3) {
  margin: 1.75rem 0 0.65rem;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}
.prose-rich :deep(ul),
.prose-rich :deep(ol) {
  margin: 0 0 1.25rem;
  padding-left: 1.25rem;
}
.prose-rich :deep(li) {
  margin: 0.35rem 0;
}
.prose-rich :deep(blockquote) {
  margin: 0 0 1.25rem;
  padding: 0.85rem 1rem;
  border-left: 3px solid var(--color-brand);
  background: color-mix(in srgb, var(--color-brand) 8%, transparent);
  color: var(--fg);
}
.prose-rich :deep(a) {
  color: var(--color-lavender);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
.prose-rich :deep(strong) {
  font-weight: 700;
}
.table-wrap {
  overflow-x: auto;
  margin: 0 0 1.5rem;
  border: 1px solid var(--line);
  border-radius: 12px;
}
.prose-rich :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
.prose-rich :deep(th),
.prose-rich :deep(td) {
  padding: 0.65rem 0.85rem;
  text-align: left;
  border-bottom: 1px solid var(--line);
  vertical-align: top;
}
.prose-rich :deep(th) {
  font-weight: 700;
  background: color-mix(in srgb, var(--color-brand) 10%, transparent);
}
.prose-rich :deep(tr:last-child td) {
  border-bottom: none;
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
