<script setup lang="ts">
import { UI } from "~/utils/messages";

const { accepted, accept } = useCookiesConsent();
const { locale, localePath } = useLocale();
const copy = computed(() => UI[locale.value]);
</script>

<template>
  <aside
    v-if="accepted === null"
    class="cookies"
    role="dialog"
    :aria-label="locale === 'en' ? 'Cookie notice' : 'Aviso de cookies'"
  >
    <p>
      {{ copy.cookies }}
      <NuxtLink :to="localePath('/politicas-de-privacidad')">
        {{ copy.cookiesMore }}
      </NuxtLink>
    </p>
    <button type="button" @click="accept">{{ copy.cookiesAccept }}</button>
  </aside>
</template>
