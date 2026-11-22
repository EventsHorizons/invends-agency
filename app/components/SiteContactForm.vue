<script setup lang="ts">
import { FORM_BUDGET, FORM_SERVICES, formCopy } from "~/utils/formI18n";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    /** Force locale; defaults to route-based locale. */
    locale?: "es" | "en";
  }>(),
  {
    title: "",
    description: "",
    locale: undefined,
  },
);

const { locale: routeLocale } = useLocale();
const activeLocale = computed(() => props.locale ?? routeLocale.value);
const t = computed(() => formCopy(activeLocale.value));
const servicesList = computed(() => [...FORM_SERVICES[activeLocale.value]]);
const budgetList = computed(() => [...FORM_BUDGET[activeLocale.value]]);

const displayTitle = computed(() => props.title || t.value.defaultTitle);
const displayBody = computed(() => props.description || t.value.defaultBody);

type ErrorKey =
  | "firstName"
  | "lastName"
  | "company"
  | "email"
  | "phone"
  | "services"
  | "budget"
  | "consent";
type Errors = Partial<Record<ErrorKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-()]{7,20}$/;

const services = ref<string[]>([]);
const budget = ref("");
const consent = ref(false);
const errors = ref<Errors>({});
const status = ref<"idle" | "ok" | "error">("idle");
const submitting = ref(false);

watch(activeLocale, () => {
  services.value = [];
  budget.value = "";
  errors.value = {};
  status.value = "idle";
});

function toggleService(value: string) {
  services.value = services.value.includes(value)
    ? services.value.filter((s) => s !== value)
    : [...services.value, value];
  if (errors.value.services) {
    const { services: _, ...rest } = errors.value;
    errors.value = rest;
  }
  if (status.value !== "idle") status.value = "idle";
}

function selectBudget(value: string) {
  budget.value = value;
  if (errors.value.budget) {
    const { budget: _, ...rest } = errors.value;
    errors.value = rest;
  }
  if (status.value !== "idle") status.value = "idle";
}

function validate(form: HTMLFormElement): Errors {
  const data = new FormData(form);
  const next: Errors = {};
  const copy = t.value.errors;
  const firstName = String(data.get("firstName") || "").trim();
  const lastName = String(data.get("lastName") || "").trim();
  const company = String(data.get("company") || "").trim();
  const email = String(data.get("email") || "").trim();
  const phone = String(data.get("phone") || "").trim();

  if (!firstName) next.firstName = copy.firstName;
  if (!lastName) next.lastName = copy.lastName;
  if (!company) next.company = copy.company;
  if (!email) next.email = copy.email;
  else if (!EMAIL_RE.test(email)) next.email = copy.emailInvalid;
  if (!phone) next.phone = copy.phone;
  else if (!PHONE_RE.test(phone)) next.phone = copy.phoneInvalid;
  if (services.value.length === 0) next.services = copy.services;
  if (!budget.value) next.budget = copy.budget;
  if (!consent.value) next.consent = copy.consent;
  return next;
}

async function onSubmit(e: Event) {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const next = validate(form);
  errors.value = next;
  if (Object.keys(next).length > 0) {
    status.value = "error";
    const first = form.querySelector('[aria-invalid="true"], .err') as HTMLElement | null;
    first?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    return;
  }

  const data = new FormData(form);
  submitting.value = true;
  status.value = "idle";
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: {
        firstName: String(data.get("firstName") || "").trim(),
        lastName: String(data.get("lastName") || "").trim(),
        company: String(data.get("company") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        source: String(data.get("source") || "").trim(),
        message: String(data.get("message") || "").trim(),
        website: String(data.get("website") || "").trim(),
        budget: budget.value,
        services: services.value,
        consent: consent.value,
        locale: activeLocale.value,
      },
    });
    status.value = "ok";
    try {
      useAnalytics().trackContactSubmit(activeLocale.value);
    } catch {
      /* analytics optional */
    }
    form.reset();
    services.value = [];
    budget.value = "";
    consent.value = false;
  } catch {
    status.value = "error";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <section class="td-section contact-block" id="contacto-form" :lang="activeLocale">
    <div class="td-container contact-shell">
      <aside class="contact-intro">
        <h2 class="form-title">{{ displayTitle }}</h2>
        <p class="form-body td-muted">{{ displayBody }}</p>
      </aside>

      <form class="contact-form" novalidate @submit="onSubmit">
        <!-- Honeypot: leave empty -->
        <div class="hp" aria-hidden="true">
          <label>
            Website
            <input
              name="website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            />
          </label>
        </div>

        <!-- Section: Servicios requeridos -->
        <fieldset class="form-fieldset">
          <legend class="form-section-header">
            <span class="form-section-title">
              {{ t.servicesLabel }} <span class="req" aria-hidden="true">*</span>
            </span>
            <span class="form-section-hint">{{ t.servicesHint }}</span>
          </legend>
          <div class="service-grid" role="group" :aria-label="t.servicesAria">
            <button
              v-for="service in servicesList"
              :key="service"
              type="button"
              class="service-card"
              :class="{ 'is-selected': services.includes(service) }"
              :aria-pressed="services.includes(service)"
              @click="toggleService(service)"
            >
              <span class="card-label">{{ service }}</span>
              <span class="card-indicator" aria-hidden="true">
                <svg v-if="services.includes(service)" class="check-icon" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span v-else class="plus-icon">+</span>
              </span>
            </button>
          </div>
          <p v-if="errors.services" class="err" role="alert">{{ errors.services }}</p>
        </fieldset>

        <!-- Section: Etapa del proyecto -->
        <fieldset class="form-fieldset">
          <legend class="form-section-header">
            <span class="form-section-title">
              {{ t.budgetLabel }} <span class="req" aria-hidden="true">*</span>
            </span>
            <span class="form-section-hint">{{ t.budgetHint }}</span>
          </legend>
          <div class="stage-grid" role="radiogroup" :aria-label="t.budgetAria">
            <button
              v-for="option in budgetList"
              :key="option"
              type="button"
              class="stage-card"
              :class="{ 'is-selected': budget === option }"
              :aria-checked="budget === option"
              role="radio"
              @click="selectBudget(option)"
            >
              <span class="radio-dot" aria-hidden="true">
                <span v-if="budget === option" class="radio-dot-inner" />
              </span>
              <span class="card-label">{{ option }}</span>
            </button>
          </div>
          <p v-if="errors.budget" class="err" role="alert">{{ errors.budget }}</p>
        </fieldset>

        <div class="form-row contact-data-start">
          <label>
            {{ t.firstName }}
            <input
              name="firstName"
              autocomplete="given-name"
              :aria-invalid="Boolean(errors.firstName)"
            />
            <span v-if="errors.firstName" class="err" role="alert">{{
              errors.firstName
            }}</span>
          </label>
          <label>
            {{ t.lastName }}
            <input
              name="lastName"
              autocomplete="family-name"
              :aria-invalid="Boolean(errors.lastName)"
            />
            <span v-if="errors.lastName" class="err" role="alert">{{
              errors.lastName
            }}</span>
          </label>
        </div>

        <div class="form-row">
          <label>
            {{ t.company }}
            <input
              name="company"
              autocomplete="organization"
              :aria-invalid="Boolean(errors.company)"
            />
            <span v-if="errors.company" class="err" role="alert">{{
              errors.company
            }}</span>
          </label>
          <label>
            {{ t.email }}
            <input
              name="email"
              type="email"
              autocomplete="email"
              :aria-invalid="Boolean(errors.email)"
            />
            <span v-if="errors.email" class="err" role="alert">{{ errors.email }}</span>
          </label>
        </div>

        <div class="form-row">
          <label>
            {{ t.phone }}
            <input
              name="phone"
              type="tel"
              :placeholder="t.phonePlaceholder"
              autocomplete="tel"
              :aria-invalid="Boolean(errors.phone)"
            />
            <span v-if="errors.phone" class="err" role="alert">{{ errors.phone }}</span>
          </label>
          <label>
            {{ t.source }}
            <input name="source" />
          </label>
        </div>

        <label class="full">
          {{ t.message }}
          <span class="hint td-muted">{{ t.messageHint }}</span>
          <textarea name="message" rows="3" />
        </label>

        <label class="consent">
          <input v-model="consent" type="checkbox" :aria-invalid="Boolean(errors.consent)" />
          <span>
            {{ t.consentBefore }}
            <NuxtLink :to="t.privacyTo">{{ t.consentLink }}</NuxtLink>{{ t.consentAfter }}
          </span>
        </label>
        <p v-if="errors.consent" class="err" role="alert">{{ errors.consent }}</p>

        <button class="td-btn" type="submit" :disabled="submitting" :aria-busy="submitting">
          {{ submitting ? t.submitting : t.submit }}
        </button>

        <p v-if="status === 'ok'" role="status" class="ok">{{ t.ok }}</p>
        <p v-if="status === 'error'" role="alert" class="err summary">
          {{
            Object.keys(errors).length > 0 ? t.errorSummary : t.sendFailed
          }}
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.contact-shell {
  display: grid;
  gap: clamp(2rem, 5vw, 3.5rem);
  align-items: start;
}
@media (min-width: 900px) {
  .contact-shell {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
    gap: clamp(2.5rem, 6vw, 4.5rem);
  }
}
.contact-intro {
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
}
.form-title {
  margin: 0;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  letter-spacing: var(--tracking-display);
  line-height: 1.08;
  max-width: 16ch;
}
.form-body {
  margin: 1.1rem 0 0;
  max-width: 34ch;
  font-size: 1.05rem;
  line-height: 1.5;
}
.contact-form {
  min-width: 0;
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid var(--line);
  border-radius: 0.85rem;
  background: var(--color-surface);
}
.hp {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

/* Fieldsets and Headers */
.form-fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
.form-fieldset + .form-fieldset {
  margin-top: 1.6rem;
}
.contact-data-start {
  margin-top: 1.85rem;
  padding-top: 1.6rem;
  border-top: 1px solid color-mix(in srgb, var(--line) 70%, transparent);
}
.form-section-header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
  padding: 0;
  border: 0;
  width: 100%;
}
@media (min-width: 600px) {
  .form-section-header {
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }
}
.form-section-title {
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--color-fg);
  display: inline-flex;
  align-items: center;
}
.form-section-hint {
  font-size: 0.76rem;
  color: var(--muted);
}
.req {
  color: var(--color-brand);
  margin-left: 0.25rem;
  font-weight: 700;
}

/* Service Grid: 2 columns, perfectly aligned */
.service-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
}
@media (min-width: 580px) {
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.65rem;
  }
}
.service-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0.95rem;
  min-height: 2.9rem;
  text-align: left;
  background: color-mix(in srgb, var(--color-surface) 65%, transparent);
  border: 1px solid var(--line);
  border-radius: 0.5rem;
  color: var(--color-fg);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 0.2s var(--ease),
    background-color 0.2s var(--ease),
    transform 0.2s var(--ease),
    box-shadow 0.2s var(--ease);
}
.service-card:hover {
  border-color: color-mix(in srgb, var(--color-brand) 40%, var(--line));
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  transform: translateY(-1px);
}
.service-card.is-selected {
  border-color: var(--color-brand);
  background: color-mix(in srgb, var(--color-brand) 12%, var(--color-surface));
  color: var(--color-fg);
  box-shadow: 0 0 0 1px var(--color-brand);
}
.card-label {
  line-height: 1.3;
}
.card-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.service-card:hover .card-indicator {
  border-color: var(--color-brand);
}
.service-card.is-selected .card-indicator {
  border-color: var(--color-brand);
  background: var(--color-brand);
  color: #fff;
}
.check-icon {
  width: 0.8rem;
  height: 0.8rem;
}
.plus-icon {
  font-size: 0.8rem;
  line-height: 1;
  color: var(--muted);
}

/* Stage Grid: 2 columns / 2x2 */
.stage-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
}
@media (min-width: 580px) {
  .stage-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.65rem;
  }
}
.stage-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.95rem;
  min-height: 2.9rem;
  text-align: left;
  background: color-mix(in srgb, var(--color-surface) 65%, transparent);
  border: 1px solid var(--line);
  border-radius: 0.5rem;
  color: var(--color-fg);
  font: inherit;
  font-size: 0.84rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 0.2s var(--ease),
    background-color 0.2s var(--ease),
    transform 0.2s var(--ease),
    box-shadow 0.2s var(--ease);
}
.stage-card:hover {
  border-color: color-mix(in srgb, var(--color-brand) 40%, var(--line));
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  transform: translateY(-1px);
}
.stage-card.is-selected {
  border-color: var(--color-brand);
  background: color-mix(in srgb, var(--color-brand) 12%, var(--color-surface));
  box-shadow: 0 0 0 1px var(--color-brand);
}
.radio-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  flex-shrink: 0;
  transition: all 0.2s ease;
}
.stage-card:hover .radio-dot {
  border-color: var(--color-brand);
}
.stage-card.is-selected .radio-dot {
  border-color: var(--color-brand);
}
.radio-dot-inner {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: var(--color-brand);
}

/* Contact standard inputs */
.form-row {
  display: grid;
  gap: 1rem;
}
.form-row + .form-row {
  margin-top: 1.1rem;
}
@media (min-width: 640px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}
label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 500;
}
.hint {
  font-size: 0.75rem;
  font-weight: 400;
}
input,
textarea {
  width: 100%;
  max-width: 100%;
  border: 1px solid var(--line);
  background: var(--color-input-bg);
  color: var(--color-input-fg);
  padding: 0.8rem 0.95rem;
  font: inherit;
  font-size: 1rem;
  line-height: 1.4;
  border-radius: 0.45rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
input:focus-visible,
textarea:focus-visible {
  outline: none;
  border-color: var(--color-brand);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand) 20%, transparent);
}
input[aria-invalid="true"],
textarea[aria-invalid="true"] {
  border-color: var(--color-error);
}
.full {
  margin-top: 1.25rem;
}
.consent {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin: 1.35rem 0 0.35rem;
  font-size: 0.84rem;
  font-weight: 400;
  cursor: pointer;
}
.consent input {
  width: auto;
  margin-top: 0.2rem;
  flex-shrink: 0;
}
.err {
  color: var(--color-error);
  font-size: 0.8rem;
  margin: 0.4rem 0 0;
}
.err.summary {
  margin-top: 0.85rem;
}
.ok {
  margin-top: 1rem;
  color: var(--color-ok);
}
.td-btn {
  margin-top: 1rem;
  min-height: 2.85rem;
  width: 100%;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.td-btn:disabled {
  opacity: 0.65;
  cursor: wait;
}
@media (min-width: 640px) {
  .td-btn {
    width: auto;
    min-width: 12rem;
  }
}
@media (max-width: 899px) {
  .contact-intro {
    position: static;
  }
  .form-title {
    max-width: none;
  }
  .form-body {
    max-width: none;
  }
}
</style>
