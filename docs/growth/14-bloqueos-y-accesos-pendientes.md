# 14. BLOQUEOS, ACCESOS PENDIENTES Y REQUERIMIENTOS DEL PROPIETARIO
## Registro Transparente de Dependencias Externas (Regla 3.5)

**Fecha:** 25 de Noviembre de 2026  
**Criterio:** No confundir trabajo preparado con trabajo ejecutado. La arquitectura de código y la suite estratégica están 100% completadas. Las siguientes acciones requieren credenciales o autorizaciones directas del propietario:

---

### 1. Lista de Accesos y Acciones Requeridas

| Servicio / Plataforma | Acción Requerida del Propietario | Justificación / Impacto | Prioridad |
| :--- | :--- | :--- | :--- |
| **Google Search Console** | Acceso a la propiedad de `invends.com` o confirmación de verificación DNS. | Permite monitorear indexación real, inspeccionar URLs y detectar errores de rastreo directamente en Google. | **Alta** |
| **Google Analytics 4 (GA4)** | Proveer el ID de medición (`G-XXXXXXXXXX`) y configurarlo en las variables de entorno de producción (`NUXT_PUBLIC_GA_ID`). | Permite almacenar y visualizar los eventos de telemetría de WhatsApp y del Test de Salud Digital ya programados en el código. | **Alta** |
| **Google Business Profile (Mi Negocio)** | Crear o dar acceso de administrador a la ficha de "Invends — Estudio Digital" con dirección o área de servicio en Bogotá. | Crítico para aparecer en el "Local Pack" (mapa de Google) cuando los usuarios buscan "diseño web Bogotá". | **Alta** |
| **Perfil en Clutch.co y Sortlist** | Validar la creación de perfiles y verificar dominio con correo `@invends.com`. | Exige verificación oficial por correo corporativo para otorgar la insignia de agencia verificada. | **Media** |
| **Cuentas de Redes Sociales (LinkedIn / Instagram)** | Publicar los carruseles y guías redactadas en los documentos estratégicos `05` y `07`. | Requiere acceso a los canales oficiales o delegación de publicación en el equipo de marketing. | **Media** |
| **Hosting y Despliegue (Git / Vercel / Netlify / VPS)** | Fusionar la rama `feature/growth-strategy-integral` en `main` y verificar que el build en producción sea exitoso. | Poner al aire todas las mejoras de código, schemas y la nueva ruta `/diagnostico`. | **Inmediata** |

---

### 2. Estado de Seguridad y Privacidad

- Durante toda la ejecución se respetaron las pautas de seguridad del proyecto:
  - Ninguna credencial, clave API ni información privada fue expuesta en el código ni en los documentos.
  - No se modificaron configuraciones de DNS ni zonas de servidor externas sin autorización.
  - Todos los cambios de código fueron probados localmente y se conservan de forma reversible y trazable mediante Git.
