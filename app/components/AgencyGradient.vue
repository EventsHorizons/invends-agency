<script setup lang="ts">
import type { AgencyGradientHandle } from "~/utils/createAgencyGradient";
import type { GradientParams } from "~/utils/agencyGradientShader";
import {
  HOME_GRADIENT,
  parseAgencyGradientMarkup,
} from "~/utils/agencyGradientShader";

const props = withDefaults(
  defineProps<{
    markup?: string | null;
    params?: Partial<GradientParams>;
    /** Original intro gradient is mostly static; enable soft seed drift for life. */
    animate?: boolean;
    interactive?: boolean;
    noRetina?: boolean;
    showPause?: boolean;
  }>(),
  {
    markup: null,
    animate: true,
    interactive: false,
    noRetina: true,
    showPause: true,
  },
);

const canvas = ref<HTMLCanvasElement | null>(null);
const paused = ref(false);
const failed = ref(false);
const root = ref<HTMLElement | null>(null);
let handle: AgencyGradientHandle | null = null;

const resolved = computed<GradientParams>(() => ({
  ...parseAgencyGradientMarkup(props.markup, HOME_GRADIENT),
  ...props.params,
}));

function syncParams() {
  if (!handle) return;
  const next = { ...resolved.value };
  // Keep RAF-driven wave motion + brand color cycle; don't reset those each sync
  if (handle.isRunning()) {
    const {
      seed: _s,
      position: _p,
      colorRotation: _r,
      displacement: _d,
      color1: _c1,
      color2: _c2,
      color3: _c3,
      color4: _c4,
      ...rest
    } = next;
    handle.setParams(rest);
    return;
  }
  handle.setParams(next);
}

function onPointer(e: PointerEvent) {
  if (!props.interactive || !handle || !root.value || paused.value) return;
  const rect = root.value.getBoundingClientRect();
  const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  const base = resolved.value.position;
  handle.setParams({
    position: [base[0] + nx * 0.08, base[1] + ny * 0.08],
  });
  if (!props.animate) handle.draw();
}

onMounted(() => {
  const el = canvas.value;
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let inView = true;
  let disposed = false;
  let idleId: number | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const shouldRun = () =>
    props.animate &&
    !reduce &&
    !paused.value &&
    !document.hidden &&
    inView &&
    !failed.value;

  const syncPlayback = () => {
    if (!handle || failed.value) return;
    if (shouldRun()) handle.start();
    else {
      handle.stop();
      if (!document.hidden && inView) handle.draw();
    }
  };

  // Avoid fighting the RAF loop; only resize/redraw when size actually changes
  let lastW = 0;
  let lastH = 0;
  const ro = new ResizeObserver(() => {
    if (!handle || !root.value) return;
    const w = root.value.clientWidth;
    const h = root.value.clientHeight;
    if (w === lastW && h === lastH) return;
    lastW = w;
    lastH = h;
    handle.draw();
  });

  const io =
    typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(
          ([entry]) => {
            inView = Boolean(entry?.isIntersecting);
            syncPlayback();
          },
          { root: null, threshold: 0.05, rootMargin: "48px 0px" },
        )
      : null;

  const boot = async () => {
    if (disposed) return;
    try {
      // Code-split WebGL runtime out of the critical path
      const { createAgencyGradient } = await import(
        "~/utils/createAgencyGradient"
      );
      if (disposed || !canvas.value) return;
      handle = createAgencyGradient(canvas.value, resolved.value, {
        animateSeed: props.animate && !reduce,
        noRetina: props.noRetina,
        seedSpeed: 0.055,
      });
      syncPlayback();
      if (!shouldRun()) handle.draw();
      if (import.meta.dev) {
        (
          window as Window & { __agencyGradient?: AgencyGradientHandle }
        ).__agencyGradient = handle;
      }
    } catch (err) {
      console.warn("[AgencyGradient] WebGL2 failed, CSS fallback", err);
      failed.value = true;
    }
  };

  // Yield to first paint / hydration before shader compile + RAF
  const w = window as Window & {
    requestIdleCallback?: (
      cb: () => void,
      opts?: { timeout: number },
    ) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    idleId = w.requestIdleCallback(() => void boot(), { timeout: 900 });
  } else {
    timeoutId = window.setTimeout(() => void boot(), 120);
  }

  document.addEventListener("visibilitychange", syncPlayback);
  if (root.value) {
    ro.observe(root.value);
    io?.observe(root.value);
  }

  onBeforeUnmount(() => {
    disposed = true;
    if (idleId != null && typeof w.cancelIdleCallback === "function") {
      w.cancelIdleCallback(idleId);
    }
    if (timeoutId != null) clearTimeout(timeoutId);
    document.removeEventListener("visibilitychange", syncPlayback);
    ro.disconnect();
    io?.disconnect();
    handle?.dispose();
    handle = null;
  });
});

watch(
  () => [props.markup, props.params] as const,
  () => syncParams(),
  { deep: true },
);

watch(paused, () => {
  if (!handle) return;
  if (paused.value) handle.stop();
  else if (props.animate && !document.hidden) handle.start();
  else handle.draw();
});

function togglePause() {
  paused.value = !paused.value;
  if (!handle) return;
  if (paused.value) {
    // Dim overlay feel: stop redraws / pointer
    handle.stop();
  } else {
    handle.draw();
    if (props.animate) handle.start();
  }
}
</script>

<template>
  <div
    ref="root"
    class="agency-gradient"
    :class="{ fallback: failed }"
    :style="
      failed
        ? {
            background: `radial-gradient(ellipse at 30% 40%, ${resolved.color2}aa, transparent 55%), radial-gradient(ellipse at 70% 30%, ${resolved.color4}99, transparent 50%), radial-gradient(ellipse at 50% 80%, ${resolved.color3}66, transparent 45%), ${resolved.color1}`,
          }
        : undefined
    "
    @pointermove="onPointer"
  >
    <canvas v-show="!failed" ref="canvas" aria-hidden="true" />
    <button
      v-if="showPause && !failed"
      type="button"
      class="pause"
      :aria-pressed="paused"
      :aria-label="paused ? 'Play background' : 'Pause background'"
      @click="togglePause"
    >
      <span v-if="!paused">❚❚</span>
      <span v-else>▶</span>
    </button>
  </div>
</template>

<style scoped>
.agency-gradient {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: var(--color-bg);
}
.agency-gradient::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: var(--wave-veil);
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
  opacity: var(--wave-opacity, 1);
}
.pause {
  position: absolute;
  /* Sit below the fixed header and clear theme toggle (+ menu on mobile) */
  top: calc(var(--header-h, 3.5rem) + 0.75rem);
  right: var(--gutter, 1.25rem);
  z-index: 2;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
}
:global([data-theme="light"]) .pause {
  border-color: rgba(18, 18, 20, 0.2);
  background: rgba(255, 255, 255, 0.55);
  color: #121214;
}
</style>
