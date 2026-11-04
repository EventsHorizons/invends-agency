# SEO Roadmap — Invends

## Hecho en código (esta iniciativa)

- [x] Diagnóstico técnico  
- [x] Indexación habilitada (quitar noindex)  
- [x] Sitemap + robots  
- [x] Canonical, hreflang, OG  
- [x] JSON-LD Organization / WebSite / Service / BlogPosting / FAQ  
- [x] 11 landings de servicio  
- [x] Meta en páginas clave  
- [x] NAP honesto (ocultar teléfono placeholder)  
- [x] Documentación en `/docs/seo/`  
- [x] Build local validado  

## Próximas acciones prioritarias

### Semana 1 — externo (requiere el equipo Invends)

1. **Deploy** a producción (push GitHub → Vercel) cuando se autorice.  
2. Verificar `NUXT_PUBLIC_SITE_URL=https://invends.com` en Vercel.  
3. Crear propiedad **Google Search Console** → verificar (meta `NUXT_PUBLIC_GSC_VERIFICATION` o DNS).  
4. Enviar `https://invends.com/sitemap.xml`.  
5. Crear **GA4** → poner `NUXT_PUBLIC_GA_ID`.  
6. Bing Webmaster → importar desde GSC o sitemap.  
7. Sustituir teléfono real y URLs de redes reales en `CONTACT_INFO` cuando existan.  

### Semana 2–4

8. Rich Results Test + Schema Markup Validator en home, 1 servicio, 1 artículo.  
9. PageSpeed Insights móvil/desktop en URLs clave; anotar LCP/INP/CLS.  
10. Publicar o reescribir **2–3** artículos del `CONTENT_PLAN` (#1–#3).  
11. Revisar cobertura de indexación en GSC (errores 404, soft 404, excluidas).  

### 30–90 días

12. Ajustar titles según CTR real en GSC.  
13. Completar artículos #4–#8 del plan.  
14. Evaluar Google Business Profile **solo** con NAP verificable.  
15. Limpieza residual legacy (Trespi/3Drawers content dumps) si aún pesan el bundle.  
16. OG image dedicada 1200×630.  

## Checklist producción

- [ ] `robots` = index,follow en HTML live  
- [ ] `/robots.txt` accesible y apunta al sitemap correcto  
- [ ] `/sitemap.xml` 200 y URLs https del dominio final  
- [ ] Canonical home = dominio de producción  
- [ ] hreflang es/en/x-default en home y servicios  
- [ ] JSON-LD sin teléfono inventado  
- [ ] Landings `/servicios/*` 200  
- [ ] Formulario contacto operativo  
- [ ] GSC: sitemap enviado  
- [ ] GA4: eventos de página + (opcional) submit contacto  

## Dependencias externas (no resolubles solo en código)

| Ítem | Bloqueo |
|------|---------|
| Deploy / DNS | Autorización de push y DNS |
| GSC / GA4 / Bing | Cuentas Google/Microsoft del negocio |
| Teléfono / dirección física / GBP | Datos reales del negocio |
| Volúmenes de keyword | Search Console / herramienta de keywords |
| CWV producción | PSI sobre URL pública |
