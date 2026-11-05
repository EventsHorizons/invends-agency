# INTEGRATIONS SETUP — Invends SEO

Ninguna integración se marca como “activa” sin credencial real. El sitio y el engine funcionan en modo degradado (HTTP + informes locales).

---

## 1. Dominio y Vercel (bloqueante SEO)

1. En el registrador DNS de `invends.com`, apunta a Vercel (A/CNAME según docs Vercel).
2. Añade el dominio en el proyecto Vercel `invends`.
3. Env var producción: `NUXT_PUBLIC_SITE_URL=https://invends.com`.
4. Verifica HTTPS y que `/` , `/robots.txt`, `/sitemap.xml` respondan 200 en el dominio canónico.
5. Opcional engine: `SEO_FALLBACK_SITE_URL=<url-vercel>` para auditorías si DNS falla.

**Estado esta sesión:** DNS canónico no resolvía desde el entorno de trabajo; deployment Vercel sí respondía.

---

## 2. Google Search Console

### Verificación

Opción A — meta tag:

1. GSC → Añadir propiedad URL prefix `https://invends.com`
2. Copiar token HTML
3. Vercel env: `NUXT_PUBLIC_GSC_VERIFICATION=<token>`
4. Redeploy
5. Verificar en GSC

Opción B — DNS TXT (preferible a largo plazo).

### Sitemap

Enviar `https://invends.com/sitemap.xml`.

### API (engine weekly/monthly)

1. Google Cloud: proyecto + habilitar **Search Console API**
2. Service account → JSON key
3. En GSC: Settings → Users → añadir `client_email` como usuario
4. GitHub Secret / Vercel / `.env.local`:

```
GSC_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
GSC_SITE_URL=https://invends.com
```

5. Instalar cliente cuando se active el wiring completo (`googleapis`) — hasta entonces el engine reporta `available: false` aunque detecte el JSON (no inventa queries).

**Límite real:** la API no garantiza indexación ni ranking; `URL Inspection` / publish tiene cuotas estrictas. No automatizar solicitudes masivas de indexación.

---

## 3. Google Analytics 4

1. Crear propiedad GA4
2. Measurement ID → `NUXT_PUBLIC_GA_ID=G-XXXXXXXX`
3. Redeploy — plugin `seo-integrations.client.ts` carga gtag
4. Eventos ya preparados en código:
   - `generate_lead` / `contact_form_submit` (formulario)
5. Marcar conversiones en GA4 Admin

### Data API (informes del engine)

```
GA4_PROPERTY_ID=properties/XXXXXXXX
GA4_SERVICE_ACCOUNT_JSON=...
```

Conceder al service account acceso Viewer en la propiedad GA4.

---

## 4. PageSpeed Insights API

```
PAGESPEED_API_KEY=...
```

Sin key el weekly puede intentar la API pública (cuota baja). Resultados = **lab**, no CrUX.

---

## 5. Bing Webmaster Tools

1. Bing Webmaster → importar desde GSC o verificar sitemap/meta
2. API key → `BING_WEBMASTER_API_KEY` (cuando se use en el engine)

---

## 6. Dashboard SEO

```
SEO_DASHBOARD_TOKEN=<secreto-largo>
```

Abrir: `https://<dominio>/admin/seo?token=...`  
Rutas API: `/api/seo/status`, `/api/seo/probe`  
`robots`: noindex en `/admin/**`.

---

## 7. GitHub Actions secrets / vars

| Name | Tipo |
|------|------|
| `SEO_SITE_URL` | Variable |
| `SEO_FALLBACK_SITE_URL` | Variable |
| `GSC_SITE_URL` | Variable |
| `PAGESPEED_API_KEY` | Secret |
| `GSC_SERVICE_ACCOUNT_JSON` | Secret |
| `GA4_PROPERTY_ID` | Secret |
| `GA4_SERVICE_ACCOUNT_JSON` | Secret |
| `BING_WEBMASTER_API_KEY` | Secret |

Habilitar Actions en el repo. Los workflows ya están en `.github/workflows/`.

---

## 8. Contacto / NAP (manual de negocio)

Cuando existan datos reales:

1. Actualizar `app/utils/contactInfo.ts` (teléfono, perfiles sociales, dirección si aplica).
2. Solo entonces evaluar Google Business Profile.
3. Nunca publicar placeholders.
