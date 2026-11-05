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

        <fieldset class="fieldset">
          <legend class="form-section-title">{{ t.servicesLabel }}</legend>
          <div class="tag-group" role="group" :aria-label="t.servicesAria">
            <label v-for="service in servicesList" :key="service" class="tag">
              <input
                type="checkbox"
                :checked="services.includes(service)"
                @change="toggleService(service)"
              />
              <span>{{ service }}</span>
            </label>
          </div>
          <p v-if="errors.services" class="err" role="alert">{{ errors.services }}</p>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="form-section-title">{{ t.budgetLabel }}</legend>
          <div class="tag-group" role="radiogroup" :aria-label="t.budgetAria">
            <label v-for="option in budgetList" :key="option" class="tag">
              <input
                type="radio"
                name="budget"
                :checked="budget === option"
                @change="budget = option"
              />
              <span>{{ option }}</span>
            </label>
          </div>
          <p v-if="errors.budget" class="err" role="alert">{{ errors.budget }}</p>
        </fieldset>

        <div class="form-row">
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
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px solid var(--line);
  border-radius: 0.75rem;
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
.fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
.form-section-title {
  margin: 0 0 0.75rem;
  padding: 0;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.fieldset + .fieldset {
  margin-top: 1.35rem;
}
.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
.tag {
  display: inline-flex;
  cursor: pointer;
}
.tag input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.tag span {
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0.45rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.78rem;
  transition:
    border-color 0.4s var(--ease),
    background-color 0.4s var(--ease);
}
.tag:hover span {
  border-color: color-mix(in srgb, var(--color-brand) 32%, var(--line));
}
.tag input:focus-visible + span {
  outline: 2px solid color-mix(in srgb, var(--color-brand) 55%, transparent);
  outline-offset: 2px;
}
.tag input:checked + span {
  border-color: var(--color-brand);
  background: color-mix(in srgb, var(--color-brand) 18%, transparent);
}
.form-row {
  display: grid;
  gap: 1rem;
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
}
.hint {
  font-size: 0.75rem;
}
input,
textarea {
  width: 100%;
  max-width: 100%;
  border: 1px solid var(--line);
  background: var(--color-input-bg);
  color: var(--color-input-fg);
  padding: 0.75rem 0.85rem;
  font: inherit;
  /* 16px prevents iOS focus zoom */
  font-size: 1rem;
  line-height: 1.4;
  border-radius: 0.35rem;
}
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--color-brand) 55%, transparent);
  outline-offset: 1px;
}
input[aria-invalid="true"],
textarea[aria-invalid="true"] {
  border-color: var(--color-error);
}
.full {
  margin-top: 1.1rem;
}
.consent {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin: 1.25rem 0 0.35rem;
  font-size: 0.85rem;
}
.consent input {
  width: auto;
  margin-top: 0.2rem;
  flex-shrink: 0;
}
.err {
  color: var(--color-error);
  font-size: 0.8rem;
  margin: 0.35rem 0 0;
}
.err.summary {
  margin-top: 0.85rem;
}
.ok {
  margin-top: 1rem;
  color: var(--color-ok);
}
.td-btn {
  margin-top: 0.85rem;
  min-height: 2.75rem;
  width: 100%;
}
.td-btn:disabled {
  opacity: 0.65;
  cursor: wait;
}
@media (min-width: 640px) {
  .td-btn {
    width: auto;
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
