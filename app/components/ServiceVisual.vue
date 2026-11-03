<script setup lang="ts">
import {
  serviceUiVariantFor,
  type ServiceUiVariant,
} from "~/utils/serviceUiVariant";

const props = withDefaults(
  defineProps<{
    poster: string;
    alt: string;
    /** Service / pillar id for UI demo variant. */
    variantId?: string;
    eager?: boolean;
  }>(),
  { eager: false, variantId: "" },
);

const root = ref<HTMLElement | null>(null);
const inView = ref(false);
const reduceMotion = ref(false);

const variant = computed<ServiceUiVariant>(() =>
  serviceUiVariantFor(props.variantId || "", props.poster),
);

let io: IntersectionObserver | null = null;
let mq: MediaQueryList | null = null;
let onMq: (() => void) | null = null;

onMounted(() => {
  reduceMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const el = root.value;
  if (!el) return;

  io = new IntersectionObserver(
    (entries) => {
      inView.value = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0.2, rootMargin: "24px 0px" },
  );
  io.observe(el);

  mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  onMq = () => {
    reduceMotion.value = mq!.matches;
  };
  mq.addEventListener("change", onMq);
});

onUnmounted(() => {
  io?.disconnect();
  if (mq && onMq) mq.removeEventListener("change", onMq);
});
</script>

<template>
  <div ref="root" class="svc-visual">
    <img
      class="svc-poster"
      :src="poster"
      :alt="alt"
      width="1600"
      height="1200"
      decoding="async"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
    />
    <div class="svc-veil" aria-hidden="true" />
    <ServiceUiStage
      :variant="variant"
      :active="inView && !reduceMotion"
    />
  </div>
</template>

<style scoped>
.svc-visual {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--color-surface);
  border-radius: 0;
}
.svc-poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  display: block;
  border-radius: 0;
  opacity: 0.28;
  filter: saturate(0.7) brightness(0.85);
}
.svc-veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      115deg,
      color-mix(in srgb, var(--bg) 72%, transparent) 0%,
      color-mix(in srgb, var(--bg) 35%, transparent) 55%,
      color-mix(in srgb, var(--bg) 55%, transparent) 100%
    );
  pointer-events: none;
}
.svc-visual :deep(.ui-stage) {
  z-index: 2;
}
</style>
