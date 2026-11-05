# SEO OPERATIONS — Invends

Runbook para operar el Autonomous SEO Engine.

---

## Instalación local

```bash
npm install
cp .env.example .env.local
# Editar NUXT_PUBLIC_SITE_URL, SEO_FALLBACK_SITE_URL, SEO_DASHBOARD_TOKEN
npm run seo:daily
```

Informes → `docs/seo/reports/` y `data/seo/`.

Dashboard local:

```bash
# En .env.local
SEO_DASHBOARD_TOKEN=dev-secret
npm run dev
# Abrir http://localhost:3000/admin/seo?token=dev-secret
```

---

## Producción

1. DNS canónico → Vercel (`INTEGRATIONS_SETUP.md`)
2. Env vars en Vercel (site URL, GA, GSC verification, dashboard token)
3. Secrets/vars en GitHub para Actions
4. Confirmar workflows habilitados (Actions tab)
5. Primera corrida: Actions → SEO Engine — Daily → Run workflow

---

## Monitoreo diario (automático)

El job comprueba:

- Disponibilidad del origen (canónico o fallback)
- HTTP de rutas críticas
- robots.txt / sitemap.xml
- noindex accidental en home
- Muestra de enlaces internos rotos
- Health score + findings

**Si health = critical:** revisar artifact del workflow + DNS/deploy.

---

## Semanal

- Revisar borradores nuevos en `content/seo/drafts/`
- Publicar solo tras QA humana
- Revisar PSI lab (no confundir con field)
- Cuando GSC exista: titles con impresiones altas y CTR bajo

---

## Mensual

- Leer `docs/seo/reports/monthly-*.md`
- Actualizar plan 30/90 días con datos reales
- Revisar arquitectura vs canibalización
- Autoridad: solo oportunidades legítimas del log de links

---

## Dashboard

| Dato | Fuente |
|------|--------|
| Salud / findings | latest-daily |
| PSI | latest-weekly (lab) |
| GSC/GA4 | latest-weekly (o “no disponible”) |
| Probe live | `/api/seo/probe` |

Si el panel dice “no disponible”, **no** hay estimación oculta.

---

## Incidentes frecuentes

| Síntoma | Acción |
|---------|--------|
| Dominio no resuelve | DNS + Vercel domain |
| Sitemap 5xx | Logs Nitro; rebuild; revisar imports del sitemap |
| Home noindex | Verificar `nuxt.config` / `usePageSeo` / deploy env |
| Actions sin reports | Permisos repo; revisar logs; artifact |
| Dashboard 503 | Falta `SEO_DASHBOARD_TOKEN` |
| Dashboard 401 | Token incorrecto |

---

## Seguridad

- Nunca commit de `.env`, JSON de service accounts, ni tokens
- `/admin` noindex + disallow robots
- Auto-acciones limitadas a reportes/drafts (ver decision engine)

---

## Comandos útiles

```bash
npm run seo:all
npm run build
# Tras deploy: probe desde el dashboard
```
