<script setup lang="ts">
import { useAnalytics } from "~/composables/useAnalytics";
import { CONTACT_INFO } from "~/utils/contactInfo";

interface Criterion {
  id: string;
  category: string;
  title: string;
  description: string;
  hint: string;
  weight: number;
}

const { isEn } = useLocale();
const { trackLeadMagnet, trackWhatsAppClick } = useAnalytics();

const CRITERIA: Criterion[] = [
  {
    id: "speed",
    category: "Rendimiento y Velocidad",
    title: "¿Tu sitio web carga en menos de 2 segundos en móviles y escritorio?",
    description: "La velocidad influye directamente en el rebote de usuarios y en la calificación de Core Web Vitals en Google.",
    hint: "Evita plantillas saturadas de plugins o constructores pesados que aumentan el tiempo de bloqueo (TBT).",
    weight: 15,
  },
  {
    id: "clarity",
    category: "Propuesta de Valor",
    title: "¿En los primeros 5 segundos queda claro qué vendes y para quién es?",
    description: "Los tomadores de decisión no leen textos extensos; escanean para comprobar si resuelves su problema exacto.",
    hint: "Un titular concreto y sin clichés genéricos genera mayor retención que frases vacías de marketing.",
    weight: 15,
  },
  {
    id: "design",
    category: "Dirección de Arte y Marca",
    title: "¿El diseño visual transmite el estándar de calidad y precio de tu empresa?",
    description: "Una estética descuidada o anticuada hace que los clientes cuestionen el valor de tus cotizaciones.",
    hint: "Tipografía con carácter, jerarquía visual limpia y contrastes controlados proyectan confianza inmediata.",
    weight: 15,
  },
  {
    id: "seo",
    category: "SEO Técnico y Semántico",
    title: "¿Cuentas con metadatos únicos, datos estructurados (Schema.org) y sitemap?",
    description: "Google premia a sitios que entregan contexto semántico explícito sobre servicios, autor y ubicación.",
    hint: "La ausencia de Schema.org o canibalización de palabras clave frena el tráfico orgánico calificado.",
    weight: 15,
  },
  {
    id: "cro",
    category: "Conversión y Fricción",
    title: "¿Es fácil y rápido contactar a tu equipo (WhatsApp o formulario directo)?",
    description: "Cada campo innecesario en un formulario o enlace roto reduce la tasa de conversión hasta un 25%.",
    hint: "Botones visibles en puntos clave de decisión facilitan la transición de visitante a prospecto.",
    weight: 15,
  },
  {
    id: "mobile",
    category: "Experiencia Móvil (UX)",
    title: "¿La experiencia en celular es fluida, legible y sin elementos desbordados?",
    description: "Más del 65% del tráfico en Colombia navega desde dispositivos móviles.",
    hint: "Zonas táctiles cómodas, fuentes legibles y carga rápida sin pop-ups invasivos protegen la reputación.",
    weight: 15,
  },
  {
    id: "autonomy",
    category: "Arquitectura y Mantenibilidad",
    title: "¿Tu equipo puede actualizar contenido sin depender de un programador?",
    description: "Un sistema digital debe evolucionar con tu negocio sin requerir soporte constante para cambios sencillos.",
    hint: "Sistemas desacoplados o con arquitectura limpia reducen costos de mantenimiento a largo plazo.",
    weight: 10,
  },
];

// User answers: 'yes' = full weight, 'partial' = 50% weight, 'no' = 0 weight
const answers = ref<Record<string, "yes" | "partial" | "no">>({});
const clientName = ref("");
const companyName = ref("");
const email = ref("");
const websiteUrl = ref("");
const consentHabeasData = ref(false);
const formSubmitted = ref(false);
const formError = ref("");

// Initialize defaults as partial to make review interactive
for (const c of CRITERIA) {
  answers.value[c.id] = "partial";
}

const totalScore = computed(() => {
  let score = 0;
  for (const c of CRITERIA) {
    const val = answers.value[c.id];
    if (val === "yes") score += c.weight;
    else if (val === "partial") score += Math.round(c.weight * 0.5);
  }
  return Math.min(100, Math.max(0, score));
});

const scoreLevel = computed(() => {
  const s = totalScore.value;
  if (s < 45) {
    return {
      title: "Nivel Crítico de Rendimiento y Conversión",
      class: "level-critical",
      summary: "Tu plataforma digital presenta vulnerabilidades técnicas y comerciales que dificultan la captación de prospectos y penalizan tu visibilidad en buscadores.",
      action: "Se recomienda una intervención prioritaria en velocidad, claridad de mensaje y canales directos de contacto.",
    };
  }
  if (s < 75) {
    return {
      title: "Nivel Operativo con Puntos de Fuga",
      class: "level-medium",
      summary: "Tienes una base funcional, pero existen fricciones en SEO semántico, optimización de conversión y jerarquía visual que limitan tus resultados comerciales.",
      action: "Es momento de refinar la arquitectura técnica, acelerar la velocidad de carga y consolidar autoridad en tu sector.",
    };
  }
  return {
    title: "Nivel Competitivo y Sólido",
    class: "level-high",
    summary: "Tu sitio cumple con estándares contemporáneos destacados. Cuenta con buena base técnica y de comunicación.",
    action: "El enfoque estratégico debe orientarse a marketing de contenidos B2B, micronichos de búsqueda y optimización CRO continua.",
  };
});

function handleAnswer(id: string, value: "yes" | "partial" | "no") {
  answers.value[id] = value;
}

function submitDiagnosticReport() {
  if (!consentHabeasData.value) {
    formError.value = "Debes autorizar el tratamiento de datos para generar tu informe conforme a la Ley 1581 de 2012.";
    return;
  }
  if (!email.value || !email.value.includes("@")) {
    formError.value = "Por favor ingresa un correo electrónico corporativo válido.";
    return;
  }

  formError.value = "";
  formSubmitted.value = true;
  trackLeadMagnet(totalScore.value, true);
}

const whatsappConsultLink = computed(() => {
  const phone = CONTACT_INFO.phoneTel.replace(/\D/g, "") || "573106224236";
  const web = websiteUrl.value ? ` de ${websiteUrl.value}` : "";
  const name = clientName.value ? ` Soy ${clientName.value}.` : "";
  const text = `Hola Invends.${name} Realicé el Test de Salud Digital${web} y obtuve un puntaje de ${totalScore.value}/100 (${scoreLevel.value.title}). Me gustaría revisar cómo mejorar estos aspectos.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
});
</script>

<template>
  <div class="diagnostic-tool">
    <div class="diagnostic-intro">
      <span class="diagnostic-badge">Diagnóstico Interactivo Gratuito</span>
      <h2 class="diagnostic-title">
        Test de Salud Digital para Sitios Web
      </h2>
      <p class="diagnostic-desc td-muted">
        Evalúa 7 criterios esenciales de ingeniería web, claridad comercial y SEO semántico para conocer si tu página web actual está construyendo reputación o perdiendo clientes.
      </p>
    </div>

    <!-- Live Score Meter -->
    <div class="score-card" :class="scoreLevel.class">
      <div class="score-header">
        <div>
          <span class="score-label">Puntaje Estimado de Salud Digital</span>
          <h3 class="score-name">{{ scoreLevel.title }}</h3>
        </div>
        <div class="score-circle">
          <span class="score-number">{{ totalScore }}</span>
          <span class="score-max">/100</span>
        </div>
      </div>
      <p class="score-summary">{{ scoreLevel.summary }}</p>
      <p class="score-action td-accent">{{ scoreLevel.action }}</p>
    </div>

    <!-- Checklist criteria -->
    <div class="criteria-list">
      <div
        v-for="(c, idx) in CRITERIA"
        :key="c.id"
        class="criterion-item"
      >
        <div class="criterion-header">
          <span class="criterion-number">0{{ idx + 1 }} · {{ c.category }}</span>
          <h4 class="criterion-question">{{ c.title }}</h4>
          <p class="criterion-desc td-muted">{{ c.description }}</p>
          <p class="criterion-hint">💡 <em>{{ c.hint }}</em></p>
        </div>

        <div class="options-group" role="radiogroup" :aria-label="c.title">
          <button
            type="button"
            class="opt-btn"
            :class="{ active: answers[c.id] === 'yes' }"
            @click="handleAnswer(c.id, 'yes')"
          >
            ✓ Sí, totalmente
          </button>
          <button
            type="button"
            class="opt-btn"
            :class="{ active: answers[c.id] === 'partial' }"
            @click="handleAnswer(c.id, 'partial')"
          >
            ~ A medias / Regular
          </button>
          <button
            type="button"
            class="opt-btn"
            :class="{ active: answers[c.id] === 'no' }"
            @click="handleAnswer(c.id, 'no')"
          >
            ✕ No resuelto
          </button>
        </div>
      </div>
    </div>

    <!-- Conversion & Action Form -->
    <div class="action-box">
      <h3 class="action-title">¿Deseas una auditoría profunda de tu sitio?</h3>
      <p class="td-muted action-subtitle">
        Podemos revisar tu código, Core Web Vitals reales y estructura SEO de forma personalizada y sin costo inicial.
      </p>

      <div v-if="!formSubmitted" class="lead-form">
        <div class="form-row">
          <div class="form-field">
            <label for="diag-name">Tu nombre</label>
            <input
              id="diag-name"
              v-model="clientName"
              type="text"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div class="form-field">
            <label for="diag-company">Empresa u Organización</label>
            <input
              id="diag-company"
              v-model="companyName"
              type="text"
              placeholder="Ej. Acero & Diseño SAS"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label for="diag-email">Correo corporativo *</label>
            <input
              id="diag-email"
              v-model="email"
              type="email"
              placeholder="juan@empresa.com"
              required
            />
          </div>
          <div class="form-field">
            <label for="diag-url">URL de tu sitio web actual</label>
            <input
              id="diag-url"
              v-model="websiteUrl"
              type="url"
              placeholder="https://tuempresa.com"
            />
          </div>
        </div>

        <div class="habeas-data-box">
          <label class="checkbox-label">
            <input
              v-model="consentHabeasData"
              type="checkbox"
              required
            />
            <span>
              Autorizo el tratamiento de mis datos personales según la 
              <NuxtLink to="/politicas-de-privacidad" target="_blank" class="td-accent">
                Política de Privacidad
              </NuxtLink> 
              de Invends y la Ley 1581 de 2012 (Habeas Data Colombia), para recibir el análisis del diagnóstico y comunicación sobre servicios.
            </span>
          </label>
        </div>

        <p v-if="formError" class="form-error">{{ formError }}</p>

        <div class="form-ctas">
          <button
            type="button"
            class="td-btn"
            @click="submitDiagnosticReport"
          >
            Solicitar Auditoría Detallada
          </button>

          <a
            :href="whatsappConsultLink"
            target="_blank"
            rel="noopener noreferrer"
            class="wa-btn-secondary"
            @click="trackWhatsAppClick('diagnostic_tool')"
          >
            <span>💬 Conversar por WhatsApp</span>
          </a>
        </div>
      </div>

      <div v-else class="form-success">
        <div class="success-icon">✓</div>
        <h4>Solicitud recibida correctamente</h4>
        <p class="td-muted">
          Hemos registrado tu evaluación (Puntaje: {{ totalScore }}/100). Un consultor del equipo de Invends revisará tu sitio y te responderá en menos de 24 horas hábiles.
        </p>
        <a
          :href="whatsappConsultLink"
          target="_blank"
          rel="noopener noreferrer"
          class="td-btn"
          @click="trackWhatsAppClick('diagnostic_success')"
        >
          Agilizar respuesta por WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diagnostic-tool {
  display: grid;
  gap: 2.5rem;
  margin: 2rem 0;
}

.diagnostic-intro {
  text-align: left;
}

.diagnostic-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-lavender);
  margin-bottom: 0.75rem;
}

.diagnostic-title {
  margin: 0 0 1rem;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: var(--tracking-title);
  line-height: 1.15;
}

.diagnostic-desc {
  max-width: 48ch;
  font-size: 1.05rem;
  line-height: 1.5;
}

/* Score Card */
.score-card {
  padding: 2rem;
  border-radius: 20px;
  background: var(--color-surface, #14131b);
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
  display: grid;
  gap: 1.25rem;
  transition: border-color 0.3s ease;
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.score-label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted, #9a98a6);
}

.score-name {
  margin: 0.35rem 0 0;
  font-size: clamp(1.3rem, 2.5vw, 1.75rem);
}

.score-circle {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  padding: 0.75rem 1.25rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.score-number {
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
}

.score-max {
  font-size: 1rem;
  color: var(--muted, #9a98a6);
}

.level-critical {
  border-color: rgba(255, 45, 170, 0.4);
}

.level-critical .score-circle {
  background: rgba(255, 45, 170, 0.15);
  border-color: var(--color-magenta, #ff2daa);
}

.level-medium {
  border-color: rgba(184, 166, 255, 0.4);
}

.level-medium .score-circle {
  background: rgba(109, 69, 234, 0.2);
  border-color: var(--color-lavender, #b8a6ff);
}

.level-high {
  border-color: rgba(75, 220, 150, 0.4);
}

.level-high .score-circle {
  background: rgba(75, 220, 150, 0.15);
  border-color: #4bdc96;
}

.score-summary {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-text, #f0eef5);
}

.score-action {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Criteria List */
.criteria-list {
  display: grid;
  gap: 1.5rem;
}

.criterion-item {
  padding: 1.75rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
  display: grid;
  gap: 1.25rem;
}

.criterion-number {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-lavender, #b8a6ff);
  margin-bottom: 0.35rem;
}

.criterion-question {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  line-height: 1.35;
}

.criterion-desc {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.45;
}

.criterion-hint {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: var(--muted, #9a98a6);
}

.options-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.opt-btn {
  padding: 0.65rem 1.15rem;
  border-radius: 999px;
  background: transparent;
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.15));
  color: var(--muted, #9a98a6);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.opt-btn:hover {
  border-color: var(--color-lavender, #b8a6ff);
  color: #fff;
}

.opt-btn.active {
  background: var(--color-deep, #4b28b5);
  border-color: var(--color-lavender, #b8a6ff);
  color: #fff;
}

/* Action Box */
.action-box {
  padding: 2.25rem;
  border-radius: 20px;
  background: var(--color-surface, #14131b);
  border: 1px solid var(--color-border, rgba(255, 255, 255, 0.12));
}

.action-title {
  margin: 0 0 0.5rem;
  font-size: 1.45rem;
}

.action-subtitle {
  margin: 0 0 1.75rem;
  font-size: 0.95rem;
}

.lead-form {
  display: grid;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 680px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-field {
  display: grid;
  gap: 0.4rem;
}

.form-field label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--muted, #9a98a6);
}

.form-field input {
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 0.9rem;
}

.form-field input:focus {
  outline: none;
  border-color: var(--color-lavender, #b8a6ff);
}

.habeas-data-box {
  padding: 1rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--muted, #9a98a6);
  cursor: pointer;
}

.checkbox-label input {
  margin-top: 0.2rem;
}

.form-error {
  color: #ff5fbf;
  font-size: 0.85rem;
  margin: 0;
}

.form-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
}

.wa-btn-secondary {
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.wa-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--color-lavender, #b8a6ff);
}

.form-success {
  text-align: center;
  padding: 2rem 1rem;
  display: grid;
  gap: 1rem;
  justify-items: center;
}

.success-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(75, 220, 150, 0.2);
  color: #4bdc96;
  font-size: 1.5rem;
  font-weight: bold;
  display: grid;
  place-items: center;
}
</style>
