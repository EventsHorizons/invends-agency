<script setup lang="ts">
definePageMeta({
  alias: ["/en/politicas-de-privacidad"],
});

useHead({ title: "Política de Tratamiento de Datos | Invends" });
</script>

<template>
  <main id="main">
    <header class="td-page-hero">
      <AgencyGradient class="hero-fx" :animate="true" :show-pause="false" />
      <div class="td-container-narrow">
        <h1>Política de Tratamiento de Datos Personales</h1>
      </div>
    </header>
    <section class="td-section" style="padding-top: 0">
      <div class="td-container-narrow">
        <p>
          Invends trata datos personales de acuerdo con la normativa aplicable en
          Colombia y con los principios de legalidad, finalidad, libertad,
          veracidad, transparencia, acceso y circulación restringida, seguridad y
          confidencialidad.
        </p>
        <p>
          Los datos recolectados a través de formularios de contacto o solicitudes
          comerciales se utilizan para responder consultas, gestionar relaciones
          de trabajo y mejorar nuestros servicios. No se venden a terceros.
        </p>
        <p>
          El titular puede ejercer derechos de acceso, actualización, rectificación
          y eliminación escribiendo a hola@invends.com.
        </p>
        <p class="td-muted">
          Esta es una versión informativa resumida. Cuando exista un documento
          legal íntegro del estudio, se publicará en esta misma ruta.
        </p>
        <NuxtLink class="td-btn" to="/contacto">Volver a contacto</NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  margin: 0 0 1.5rem;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: var(--tracking-display);
}
p {
  margin: 0 0 1rem;
  line-height: 1.55;
}
.td-btn {
  margin-top: 1.25rem;
}
</style>
