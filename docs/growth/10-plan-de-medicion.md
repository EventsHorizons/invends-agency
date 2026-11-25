# 10. PLAN DE MEDICIÓN Y ANALÍTICA DIGITAL
## Arquitectura de Eventos, Google Analytics 4, Search Console y KPIs

**Fecha:** Noviembre 2026  
**Responsable:** Analítica Web y Medición de Resultados  
**Entorno:** Nuxt 4 / `useAnalytics.ts` / Google Tag Manager / Google Search Console

---

### 1. Definición de Objetivos y KPIs de Negocio

La medición no se centra en "visitas superficiales" sino en acciones de valor comercial verificable:

| KPI | Métrica | Fuente | Meta a 90 Días |
| :--- | :--- | :--- | :--- |
| **Conversión Directa** | Chats comerciales calificados iniciados por WhatsApp | GA4 Event (`whatsapp_click`) | > 20 mensuales |
| **Formularios de Contacto** | Formularios enviados con presupuesto definido | GA4 Event (`contact_form_submit`) | > 10 mensuales |
| **Interacción con Diagnóstico** | Tests de Salud Digital completados | GA4 Event (`lead_magnet_completed`) | > 50 mensuales |
| **Leads con Habeas Data** | Solicitudes de informe con email corporativo | GA4 Event (`lead_magnet_captured`) | > 15 mensuales |
| **Tráfico Orgánico Semántico** | Clics en búsquedas transaccionales en Bogotá | Google Search Console | Crecimiento sostenido |
| **Rendimiento Real (CWV)** | Puntuación móvil LCP < 2.0s y CLS < 0.05 | PageSpeed Insights / CrUX | 100% de páginas en rango verde |

---

### 2. Matriz de Eventos Implementados en Código

En el archivo `app/composables/useAnalytics.ts`, se dejaron preparadas y conectadas las siguientes funciones de telemetría:

```typescript
// 1. Telemetría de WhatsApp
trackWhatsAppClick(placement: string)
// Emite evento 'whatsapp_click' con parámetro 'placement' ('floating', 'footer', 'contact_page', 'diagnostic_tool', 'diagnostic_success').

// 2. Telemetría de Lead Magnet
trackLeadMagnet(score: number, emailProvided: boolean)
// Emite evento 'lead_magnet_completed' con score y 'lead_magnet_captured' si proporcionó email y consentimiento.

// 3. Telemetría de Descarga de Recursos
trackResourceDownload(resourceName: string)
// Emite evento 'resource_download' con el nombre del activo.
```

---

### 3. Configuración Pendiente para el Propietario (GA4 / GSC)

Para que estos eventos se registren de forma permanente en los tableros de analítica de la empresa:

1. **Google Analytics 4 (Measurement ID):**
   - Configurar la variable de entorno `NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX` en el hosting de producción (Vercel / Netlify / VPS).
2. **Google Search Console:**
   - Verificar la propiedad de dominio mediante registro TXT en DNS para `invends.com`.
   - Enviar la URL del sitemap oficial: `https://invends.com/sitemap.xml`.
3. **Conversiones en GA4:**
   - Marcar en la consola de GA4 los eventos `whatsapp_click`, `contact_form_submit` y `lead_magnet_captured` como "Eventos clave / Conversiones".
