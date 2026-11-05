<script setup lang="ts">
definePageMeta({
  layout: false,
});

usePageSeo({
  title: "SEO Control — Invends",
  description: "Panel interno de salud SEO. No indexable.",
  path: "/admin/seo",
  robots: "noindex,nofollow",
  noAlternates: true,
});

const route = useRoute();
const token = ref(String(route.query.token || ""));
const loading = ref(false);
const probing = ref(false);
const error = ref("");
const status = ref<Record<string, unknown> | null>(null);
const probe = ref<Record<string, unknown> | null>(null);

async function loadStatus() {
  if (!token.value.trim()) {
    error.value = "Introduce el token (SEO_DASHBOARD_TOKEN).";
    return;
  }
  loading.value = true;
  error.value = "";
  try {
    status.value = await $fetch("/api/seo/status", {
      query: { token: token.value.trim() },
    });
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string }; statusCode?: number };
    error.value =
      err?.data?.statusMessage ||
      (err?.statusCode === 401
        ? "Token inválido"
        : "No se pudo cargar el estado SEO");
    status.value = null;
  } finally {
    loading.value = false;
  }
}

async function runProbe() {
  if (!token.value.trim()) return;
  probing.value = true;
  error.value = "";
  try {
    probe.value = await $fetch("/api/seo/probe", {
      query: { token: token.value.trim() },
    });
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string } };
    error.value = err?.data?.statusMessage || "Probe falló";
  } finally {
    probing.value = false;
  }
}

onMounted(() => {
  if (token.value) void loadStatus();
});

const daily = computed(
  () => (status.value as { daily?: Record<string, unknown> } | null)?.daily,
);
const weekly = computed(
  () => (status.value as { weekly?: Record<string, unknown> } | null)?.weekly,
);
const monthly = computed(
  () => (status.value as { monthly?: Record<string, unknown> } | null)?.monthly,
);
const availability = computed(
  () =>
    (status.value as { dataAvailability?: Record<string, unknown> } | null)
      ?.dataAvailability,
);

function severityClass(s: string) {
  if (s === "critical" || s === "healthy") return s;
  if (s === "degraded" || s === "high") return "high";
  if (s === "watch" || s === "medium") return "medium";
  return "info";
}
</script>

<template>
  <div class="seo-dash">
    <header class="seo-dash__top">
      <div>
        <p class="seo-dash__eyebrow">Invends · interno</p>
        <h1>SEO Control</h1>
        <p class="seo-dash__lead">
          Salud de indexación, automatizaciones y mediciones. Distingue datos
          reales de no disponibles — nunca inventa rankings.
        </p>
      </div>
      <form class="seo-dash__auth" @submit.prevent="loadStatus">
        <label>
          Token
          <input
            v-model="token"
            type="password"
            autocomplete="off"
            placeholder="SEO_DASHBOARD_TOKEN"
          />
        </label>
        <button type="submit" :disabled="loading">
          {{ loading ? "Cargando…" : "Abrir" }}
        </button>
        <button type="button" class="ghost" :disabled="probing || !token" @click="runProbe">
          {{ probing ? "Probe…" : "Probe live" }}
        </button>
      </form>
    </header>

    <p v-if="error" class="seo-dash__error">{{ error }}</p>

    <section v-if="availability" class="seo-dash__banner">
      <p>
        Informes en disco:
        daily {{ availability.daily ? "sí" : "no" }} · weekly
        {{ availability.weekly ? "sí" : "no" }} · monthly
        {{ availability.monthly ? "sí" : "no" }}.
        {{ availability.note }}
      </p>
    </section>

    <section class="seo-dash__grid">
      <article class="seo-card">
        <h2>Resumen ejecutivo</h2>
        <template v-if="daily">
          <p class="seo-metric">
            <span>Salud SEO</span>
            <strong :class="severityClass(String((daily as any).health?.label))">
              {{ (daily as any).health?.label }} ·
              {{ (daily as any).health?.score }}/100
            </strong>
          </p>
          <p class="seo-metric">
            <span>Base medida</span>
            <strong>{{ (daily as any).base }}</strong>
          </p>
          <p class="seo-metric">
            <span>Última corrida diaria</span>
            <strong>{{ (daily as any).startedAt }}</strong>
          </p>
          <p class="seo-metric">
            <span>Sitemap</span>
            <strong>
              {{
                (daily as any).sitemap?.ok
                  ? `${(daily as any).sitemap.count} URLs`
                  : "no disponible / error"
              }}
            </strong>
          </p>
          <p class="seo-metric">
            <span>Home robots</span>
            <strong>{{ (daily as any).homeMeta?.robots || "n/d" }}</strong>
          </p>
        </template>
        <p v-else class="seo-empty">
          Datos diarios no disponibles. Ejecuta
          <code>npm run seo:daily</code>.
        </p>
        <p class="seo-note">
          Impresiones / clics / CTR / posición media: solo cuando GSC esté
          conectado (ver weekly).
        </p>
      </article>

      <article class="seo-card">
        <h2>Palabras clave &amp; GSC</h2>
        <template v-if="weekly">
          <p class="seo-metric">
            <span>Estado GSC</span>
            <strong>
              {{
                (weekly as any).gsc?.available
                  ? "datos reales"
                  : (weekly as any).gsc?.reason || "no disponible"
              }}
            </strong>
          </p>
          <p class="seo-metric">
            <span>GA4 API</span>
            <strong>
              {{
                (weekly as any).ga4?.available
                  ? "datos reales"
                  : (weekly as any).ga4?.reason || "no disponible"
              }}
            </strong>
          </p>
          <p class="seo-note">
            Honestidad:
            {{ JSON.stringify((weekly as any).dataHonesty || {}) }}
          </p>
        </template>
        <p v-else class="seo-empty">Sin informe weekly todavía.</p>
      </article>

      <article class="seo-card">
        <h2>Contenidos</h2>
        <template v-if="weekly || monthly">
          <p class="seo-metric">
            <span>Borradores propuestos (weekly)</span>
            <strong>{{ (weekly as any)?.contentDrafts?.length ?? "n/d" }}</strong>
          </p>
          <p class="seo-metric">
            <span>Publicados en código (monthly)</span>
            <strong>
              {{ (monthly as any)?.contentInventory?.publishedCount ?? "n/d" }}
            </strong>
          </p>
          <ul v-if="(weekly as any)?.contentDrafts?.length" class="seo-list">
            <li
              v-for="d in (weekly as any).contentDrafts.slice(0, 8)"
              :key="d.id"
            >
              {{ d.title }}
              <em>({{ d.created ? "nuevo" : "existente" }})</em>
            </li>
          </ul>
        </template>
        <p v-else class="seo-empty">Sin datos de contenido.</p>
      </article>

      <article class="seo-card">
        <h2>Rendimiento técnico</h2>
        <template v-if="(weekly as any)?.psi?.length">
          <ul class="seo-list">
            <li v-for="(p, i) in (weekly as any).psi" :key="i">
              <template v-if="p.available">
                {{ p.strategy }} · LCP
                {{ p.lcp != null ? Math.round(p.lcp) + "ms" : "n/d" }} · CLS
                {{ p.cls ?? "n/d" }} · score
                {{ p.performanceScore ?? "n/d" }}
                <small>{{ p.url }}</small>
              </template>
              <template v-else>
                PSI no disponible ({{ p.error || "error" }})
              </template>
            </li>
          </ul>
          <p class="seo-note">Valores de laboratorio PSI — no son field CrUX.</p>
        </template>
        <template v-if="daily">
          <h3>Findings diarios</h3>
          <ul class="seo-list">
            <li
              v-for="(f, i) in ((daily as any).findings || []).slice(0, 12)"
              :key="i"
              :class="severityClass(f.severity)"
            >
              [{{ f.severity }}] {{ f.code }} — {{ f.message || f.path }}
            </li>
          </ul>
          <p v-if="!(daily as any).findings?.length" class="seo-empty">
            Sin hallazgos en la última corrida diaria.
          </p>
        </template>
        <p v-if="!daily && !(weekly as any)?.psi" class="seo-empty">
          Sin mediciones técnicas.
        </p>
      </article>

      <article class="seo-card">
        <h2>Automatizaciones</h2>
        <p class="seo-metric">
          <span>Daily</span>
          <strong>{{ (daily as any)?.id || "nunca" }}</strong>
        </p>
        <p class="seo-metric">
          <span>Weekly</span>
          <strong>{{ (weekly as any)?.id || "nunca" }}</strong>
        </p>
        <p class="seo-metric">
          <span>Monthly</span>
          <strong>{{ (monthly as any)?.id || "nunca" }}</strong>
        </p>
        <p class="seo-note">
          Programación: GitHub Actions
          <code>seo-daily.yml</code> / <code>seo-weekly.yml</code> /
          <code>seo-monthly.yml</code>.
        </p>
        <template v-if="(monthly as any)?.strategicPlan">
          <h3>Plan 30 días</h3>
          <ul class="seo-list">
            <li
              v-for="(x, i) in (monthly as any).strategicPlan.next30Days"
              :key="i"
            >
              {{ x }}
            </li>
          </ul>
        </template>
      </article>

      <article v-if="probe" class="seo-card">
        <h2>Probe live</h2>
        <p class="seo-note">
          {{ (probe as any).probedAt }} · {{ (probe as any).site }} · fuente
          {{ (probe as any).source }}
        </p>
        <ul class="seo-list">
          <li
            v-for="r in (probe as any).results"
            :key="r.path"
            :class="r.ok ? 'healthy' : 'critical'"
          >
            {{ r.status || "ERR" }} {{ r.path }} · {{ r.ms }}ms
            <span v-if="r.error">— {{ r.error }}</span>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>

<style scoped>
.seo-dash {
  min-height: 100vh;
  padding: clamp(1.5rem, 4vw, 3rem);
  background:
    radial-gradient(ellipse 80% 50% at 10% -10%, rgba(138, 104, 255, 0.22), transparent),
    radial-gradient(ellipse 60% 40% at 90% 0%, rgba(255, 45, 170, 0.12), transparent),
    #090711;
  color: #f7f5ff;
  font-family: Roobert, system-ui, sans-serif;
}
.seo-dash__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.72rem;
  color: #aaa3bf;
  margin: 0 0 0.5rem;
}
.seo-dash h1 {
  font-family: "Geist-Variable", Geist, Roobert, sans-serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: -0.04em;
  margin: 0;
}
.seo-dash__lead {
  max-width: 42rem;
  color: #aaa3bf;
  line-height: 1.5;
}
.seo-dash__top {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}
.seo-dash__auth {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: flex-end;
}
.seo-dash__auth label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: #aaa3bf;
}
.seo-dash__auth input {
  background: #100a1c;
  border: 1px solid rgba(247, 245, 255, 0.12);
  color: #f7f5ff;
  padding: 0.65rem 0.8rem;
  min-width: 16rem;
  border-radius: 0;
}
.seo-dash__auth button {
  background: #8a68ff;
  color: #fff;
  border: 0;
  padding: 0.7rem 1rem;
  cursor: pointer;
  font: inherit;
}
.seo-dash__auth button.ghost {
  background: transparent;
  border: 1px solid rgba(247, 245, 255, 0.2);
}
.seo-dash__error {
  color: #ff6b9a;
}
.seo-dash__banner {
  border: 1px solid rgba(247, 245, 255, 0.1);
  background: rgba(247, 245, 255, 0.04);
  padding: 0.9rem 1rem;
  margin-bottom: 1.25rem;
  color: #aaa3bf;
  font-size: 0.9rem;
}
.seo-dash__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
.seo-card {
  background: #130d25;
  border: 1px solid rgba(247, 245, 255, 0.08);
  padding: 1.25rem;
}
.seo-card h2 {
  font-size: 1rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #b8a6ff;
  margin: 0 0 1rem;
}
.seo-card h3 {
  font-size: 0.85rem;
  margin: 1rem 0 0.5rem;
  color: #aaa3bf;
}
.seo-metric {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.45rem 0;
  font-size: 0.92rem;
}
.seo-metric span {
  color: #aaa3bf;
}
.seo-metric strong {
  text-align: right;
}
.seo-empty,
.seo-note {
  color: #aaa3bf;
  font-size: 0.85rem;
  line-height: 1.45;
}
.seo-list {
  margin: 0;
  padding-left: 1.1rem;
  color: #f7f5ff;
  font-size: 0.88rem;
}
.seo-list li {
  margin: 0.35rem 0;
}
.seo-list small {
  display: block;
  color: #aaa3bf;
  word-break: break-all;
}
.critical {
  color: #ff6b9a;
}
.high {
  color: #ff5fbf;
}
.medium {
  color: #b8a6ff;
}
.healthy {
  color: #9d8cff;
}
.info {
  color: #aaa3bf;
}
code {
  font-size: 0.85em;
  color: #b8a6ff;
}
</style>
