<script setup lang="ts">
import { CONTACT_INFO } from "~/utils/contactInfo";

const { locale } = useLocale();

const label = computed(() =>
  locale.value === "en" ? "Chat on WhatsApp" : "Hablar por WhatsApp",
);

const whatsappUrl = computed(() =>
  locale.value === "en"
    ? CONTACT_INFO.whatsappUrlEn
    : CONTACT_INFO.whatsappUrl,
);
</script>

<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-floating-btn"
    :aria-label="label"
    :title="label"
  >
    <svg
      class="whatsapp-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M12.031 2C6.505 2 2 6.502 2 12.027c0 1.996.586 3.86 1.602 5.43L2 22l4.71-1.543A9.97 9.97 0 0 0 12.031 22c5.525 0 10.03-4.502 10.03-10.027A10.032 10.032 0 0 0 12.03 2Zm-.003 18.257a8.21 8.21 0 0 1-4.223-1.164l-.303-.18-2.793.915.932-2.723-.198-.314A8.2 8.2 0 0 1 3.77 12.03c0-4.55 3.702-8.254 8.258-8.254 4.55 0 8.254 3.704 8.254 8.254 0 4.553-3.704 8.227-8.254 8.227Zm4.52-6.166c-.248-.124-1.464-.723-1.691-.806-.228-.083-.394-.124-.56.124-.166.248-.642.806-.787.972-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.231-.738-.658-1.236-1.47-1.38-1.719-.145-.248-.016-.382.108-.506.112-.111.248-.29.373-.435.124-.145.166-.248.248-.414.083-.166.042-.311-.02-.435-.063-.124-.56-1.35-.768-1.85-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.311-.228.248-.87 0.85-.87 2.074s.891 2.404 1.015 2.57c.124.166 1.753 2.677 4.247 3.754.593.256 1.057.41 1.418.524.596.19 1.138.163 1.567.099.478-.071 1.464-.599 1.672-1.178.207-.58.207-1.077.145-1.178-.063-.101-.228-.166-.476-.29Z"
      />
    </svg>
    <span class="whatsapp-label">{{ label }}</span>
  </a>
</template>

<style scoped>
.whatsapp-floating-btn {
  position: fixed;
  bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
  right: calc(1.5rem + env(safe-area-inset-right, 0px));
  z-index: 85;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background-color: #25d366;
  color: #ffffff;
  padding: 0.75rem 1.15rem 0.75rem 0.95rem;
  border-radius: 9999px;
  font-size: 0.925rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  box-shadow: 0 4px 18px rgba(37, 211, 102, 0.35), 0 2px 6px rgba(0, 0, 0, 0.18);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.2s ease;
  user-select: none;
  -webkit-font-smoothing: antialiased;
}

.whatsapp-floating-btn:hover {
  transform: translateY(-3px) scale(1.02);
  background-color: #22bf5b;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.45), 0 3px 8px rgba(0, 0, 0, 0.22);
}

.whatsapp-floating-btn:focus-visible {
  outline: 3px solid #25d366;
  outline-offset: 3px;
}

.whatsapp-floating-btn:active {
  transform: translateY(0) scale(0.98);
}

.whatsapp-icon {
  width: 1.45rem;
  height: 1.45rem;
  flex-shrink: 0;
}

.whatsapp-label {
  display: inline-block;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .whatsapp-floating-btn {
    bottom: calc(1.1rem + env(safe-area-inset-bottom, 0px));
    right: calc(1.1rem + env(safe-area-inset-right, 0px));
    padding: 0.75rem;
    border-radius: 50%;
  }
  .whatsapp-label {
    display: none;
  }
  .whatsapp-icon {
    width: 1.6rem;
    height: 1.6rem;
  }
}
</style>
