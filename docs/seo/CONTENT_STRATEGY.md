# CONTENT STRATEGY — Invends

## Objetivo

Atraer búsquedas informativas y comerciales tempranas, demostrar criterio, y convertir una fracción a `/contacto` — sin granjas de contenido.

## Pilares editoriales

1. Diseño & UX  
2. Desarrollo & rendimiento  
3. Estrategia & conversión  
4. Marketing & contenido  
5. Operación digital (automatización / IA / migración)

## Inventario

- Posts en código: `app/utils/blogData.ts` + `blogPostsFromSocial.ts` (export social engine).
- Plan editorial histórico: `CONTENT_PLAN.md` (12 temas prioritarios).
- Varios temas del plan **ya tienen** piezas publicadas (conversión, brief, UX, modernizar, continuidad anuncio–página, etc.).

## Flujo autónomo (calidad primero)

```
weekly engine
  → detecta huecos vs backlog
  → escribe borrador en content/seo/drafts/*.md (publish: false)
  → humano revisa exactitud / originalidad
  → solo entonces se incorpora a blogData (o social export)
```

**Nunca** se publica automáticamente copy no verificado.

## Reglas de calidad

- 1 keyword primaria, 2–4 secundarias, 1 servicio, 1 CTA.
- No duplicar titles transaccionales de landings.
- Sin clientes, reseñas, métricas o sedes inventadas.
- Enlaces internos: artículo → servicio → contacto.
- Preferir profundidad a volumen.

## Medición

Cuando GSC/GA4 existan: impresiones, CTR, entrada orgánica, scroll/engagement, `generate_lead` / `contact_form_submit`.

## Próximas piezas recomendadas (si faltan en published)

1. Cómo elegir agencia de diseño web (comercial)  
2. Plantilla vs desarrollo a medida  
3. Diseño web para empresas en Bogotá (local ético)  
4. Identidad visual aplicable  

El weekly genera borradores para estos IDs en `content/seo/drafts/`.
