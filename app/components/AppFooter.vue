<script setup lang="ts">
import { BRAND_NAME } from "~/utils/brand";
import { CONTACT_INFO } from "~/utils/siteData";
import { NAV, UI } from "~/utils/messages";

const { locale, localePath } = useLocale();
const copy = computed(() => UI[locale.value]);
const links = computed(() => NAV[locale.value]);
const brandName = BRAND_NAME;

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <NuxtLink class="cta-title" :to="localePath('/contacto')">
          {{ copy.footerCta }}
        </NuxtLink>
        <a class="ghost-btn" :href="`mailto:${CONTACT_INFO.email}`">
          {{ CONTACT_INFO.email }}
        </a>
      </div>
      <div>
        <h3>{{ copy.footerLocation }}</h3>
        <template v-for="loc in CONTACT_INFO.locations" :key="loc.city">
          <p>{{ loc.city }}</p>
          <p v-for="(line, i) in loc.address.split('\n')" :key="i">{{ line }}</p>
        </template>
        <p style="margin-top: 0.75rem">{{ copy.footerPhone }}</p>
        <p>
          <a :href="`tel:${CONTACT_INFO.phoneTel}`">{{ CONTACT_INFO.phone }}</a>
        </p>
      </div>
      <div>
        <h3>{{ copy.footerFollow }}</h3>
        <ul>
          <li v-for="s in CONTACT_INFO.social" :key="s.name">
            <a :href="s.url" target="_blank" rel="noopener noreferrer">{{
              s.name
            }}</a>
          </li>
        </ul>
      </div>
      <nav :aria-label="locale === 'en' ? 'Footer' : 'Pie de página'">
        <ul>
          <li v-for="l in links" :key="l.to">
            <NuxtLink :to="l.to">{{ l.label }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/politicas-de-privacidad')">
              {{ copy.footerPolicy }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <p class="copy">© {{ new Date().getFullYear() }} {{ brandName }}.</p>
    <button class="top-btn" type="button" @click="toTop">
      {{ copy.footerTop }}
    </button>
  </footer>
</template>

<style scoped>
.cta-title {
  display: block;
  margin: 0 0 0.75rem;
  font-size: clamp(1.45rem, 4.2vw, 2.4rem);
  font-weight: 700;
  letter-spacing: var(--tracking-title);
  overflow-wrap: anywhere;
}
.copy {
  margin: 1.5rem 0 0;
  color: var(--muted);
  font-size: 0.85rem;
}
</style>
