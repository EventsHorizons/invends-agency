<script setup lang="ts">
import {
  getServiceCategoryBySlug,
  relatedServiceSlugs,
  servicePageCopy,
} from "~/utils/servicePages";
import {
  absoluteUrl,
  organizationJsonLd,
  useSiteUrl,
} from "~/utils/seo";

definePageMeta({
  alias: ["/en/servicios/:slug"],
});

const route = useRoute();
const { locale, isEn, localePath } = useLocale();
const slug = computed(() => String(route.params.slug || ""));

const initialSlug = String(route.params.slug || "");
if (!getServiceCategoryBySlug(initialSlug, "es")) {
  throw createError({
    statusCode: 404,
    statusMessage: "Servicio no encontrado",
  });
}

const category = computed(() =>
  getServiceCategoryBySlug(slug.value, locale.value)!,
);
const copy = computed(() => servicePageCopy(slug.value, locale.value)!);

const related = computed(() =>
  relatedServiceSlugs(slug.value).map((id) => ({
    id,
    cat: getServiceCategoryBySlug(id, locale.value),
  })).filter((r) => r.cat),
);

const path = computed(() =>
  isEn.value ? `/en/servicios/${slug.value}` : `/servicios/${slug.value}`,
);

usePageSeo({
  title: () => copy.value.metaTitle,
  description: () => copy.value.metaDescription,
  path: () => path.value,
  image: () => category.value.image,
  locale: () => locale.value,
});

const siteUrl = useSiteUrl();
useHead(() => {
  const scripts: { type: string; children: string; key?: string }[] = [
    {
      key: "ld-service",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: category.value.title,
        description: copy.value.metaDescription,
        provider: organizationJsonLd(siteUrl),
        areaServed: ["Bogotá", "Colombia", "LATAM"],
        url: absoluteUrl(path.value, siteUrl),
        image: absoluteUrl(category.value.image, siteUrl),
      }),
    },
    {
      key: "ld-breadcrumb",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isEn.value ? "Home" : "Inicio",
            item: absoluteUrl(isEn.value ? "/en" : "/", siteUrl),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.value.breadcrumbServices,
            item: absoluteUrl(localePath("/servicios"), siteUrl),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.value.title,
            item: absoluteUrl(path.value, siteUrl),
          },
        ],
      }),
    },
  ];
  if (copy.value.faqs.length) {
    scripts.push({
      key: "ld-faq",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: copy.value.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    });
  }
  return { script: scripts };
});
</script>

<template>
  <main id="main" class="service-page" :lang="locale">
    <header class="td-page-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container">
        <nav class="crumb" :aria-label="isEn ? 'Breadcrumb' : 'Miga de pan'">
          <NuxtLink :to="localePath('/')">{{ isEn ? "Home" : "Inicio" }}</NuxtLink>
          <span aria-hidden="true">/</span>
          <NuxtLink :to="localePath('/servicios')">{{ copy.breadcrumbServices }}</NuxtLink>
          <span aria-hidden="true">/</span>
          <span>{{ category.title }}</span>
        </nav>
        <p class="td-eyebrow">{{ category.number }} · {{ category.title }}</p>
        <h1>{{ copy.h1 }}</h1>
        <p class="lead td-muted">{{ copy.lead }}</p>
        <NuxtLink class="td-btn" :to="`${localePath('/contacto')}#contacto-form`">
          {{ copy.cta }}
        </NuxtLink>
      </div>
    </header>

    <section class="td-section visual-band">
      <div class="td-container visual-grid">
        <figure>
          <img
            :src="category.image"
            :alt="category.imageAlt"
            width="960"
            height="720"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </figure>
        <div>
          <h2>{{ category.headline }}</h2>
          <p class="td-muted">{{ category.response }}</p>
        </div>
      </div>
    </section>

    <section class="td-section">
      <div class="td-container prose-grid">
        <article>
          <h2>{{ copy.problemTitle }}</h2>
          <p>{{ copy.problem }}</p>
        </article>
        <article>
          <h2>{{ copy.audienceTitle }}</h2>
          <p>{{ copy.audience }}</p>
        </article>
        <article>
          <h2>{{ copy.methodTitle }}</h2>
          <p>{{ copy.method }}</p>
        </article>
        <article>
          <h2>{{ copy.differenceTitle }}</h2>
          <p>{{ copy.difference }}</p>
        </article>
      </div>
    </section>

    <section class="td-section includes">
      <div class="td-container">
        <h2>{{ copy.includesTitle }}</h2>
        <ul class="rows">
          <li v-for="item in category.items" :key="item.title">
            <span class="row-label">{{ item.title }}</span>
            <span class="row-value td-muted">{{ item.description }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="td-section">
      <div class="td-container">
        <h2>{{ copy.considerTitle }}</h2>
        <ul class="consider">
          <li v-for="(line, i) in copy.consider" :key="i">{{ line }}</li>
        </ul>
      </div>
    </section>

    <section v-if="copy.faqs.length" class="td-section faq">
      <div class="td-container">
        <h2>{{ copy.faqTitle }}</h2>
        <details v-for="(f, i) in copy.faqs" :key="i" class="faq-item">
          <summary>{{ f.q }}</summary>
          <p class="td-muted">{{ f.a }}</p>
        </details>
      </div>
    </section>

    <section class="td-section related">
      <div class="td-container">
        <h2>{{ copy.relatedTitle }}</h2>
        <ul class="related-list">
          <li v-for="r in related" :key="r.id">
            <NuxtLink :to="localePath(`/servicios/${r.id}`)">
              {{ r.cat!.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="td-section band">
      <div class="td-container">
        <h2>{{ copy.nextTitle }}</h2>
        <p class="td-muted">{{ copy.next }}</p>
        <NuxtLink class="td-btn" :to="`${localePath('/contacto')}#contacto-form`">
          {{ copy.cta }}
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.crumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  margin: 0 0 1.25rem;
  font-size: 0.85rem;
  color: var(--muted);
}
.crumb a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
h1 {
  margin: 0 0 0.75rem;
  font-size: clamp(2rem, 6vw, 3.6rem);
  letter-spacing: var(--tracking-display);
  max-width: 18ch;
}
.lead {
  max-width: 42rem;
  margin: 0 0 1.5rem;
  font-size: 1.1rem;
  line-height: 1.55;
}
.visual-grid {
  display: grid;
  gap: 2rem;
  align-items: center;
}
@media (min-width: 900px) {
  .visual-grid {
    grid-template-columns: 1.1fr 1fr;
  }
}
.visual-grid img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0;
}
.visual-grid h2 {
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  max-width: 20ch;
}
.prose-grid {
  display: grid;
  gap: 2rem;
}
@media (min-width: 800px) {
  .prose-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.prose-grid h2 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}
.prose-grid p {
  margin: 0;
  line-height: 1.6;
  color: var(--muted);
}
.rows {
  list-style: none;
  margin: 1.5rem 0 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}
.rows li {
  display: grid;
  gap: 0.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
}
.row-label {
  font-weight: 600;
}
.consider {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  line-height: 1.6;
  color: var(--muted);
  max-width: 40rem;
}
.faq-item {
  border-bottom: 1px solid color-mix(in srgb, var(--fg) 12%, transparent);
  padding: 1rem 0;
}
.faq-item summary {
  cursor: pointer;
  font-weight: 600;
}
.faq-item p {
  margin: 0.75rem 0 0;
  max-width: 40rem;
}
.related-list {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
}
.related-list a {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}
.band h2 {
  margin: 0 0 0.5rem;
}
.band .td-btn {
  margin-top: 1rem;
}
.hero-fx {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.td-page-hero {
  position: relative;
}
</style>
