# Invends — Research & auditoría

**Fecha:** 2026-11-05 (actualizado con auditoría UI ampliada)  
**Método:** repositorio + local `http://127.0.0.1:3472/` (browser snapshots).  
**Clasificación:** Verificado | Inferido | Desconocido

---

## 1. Inventario de páginas + auditoría UI

| Ruta | Tipo | UI auditada | Notas editoriales |
|------|------|-------------|-------------------|
| `/` | Home | Sí | Hero Forma clara / Ideas en forma; CTAs cortos |
| `/servicios` | Hub | Sí | Once oficios; headlines cortos; títulos protegidos OK |
| `/servicios/[slug]` | ×11 | Código | Landings con problem/method; títulos intactos |
| `/portafolio` | Index | Sí | Muestras de método; CTA duplicado eliminado |
| `/portafolio/[slug]` | ×6 | Código | challenge/solution; results = disclaimer |
| `/sobre-nosotros` | About | Sí | H1 → Oficio y alcance (no repetir tagline) |
| `/contacto` | Contact | Sí | Cuéntanos la necesidad; form completo |
| `/blog` | Index | Sí | Notas sobre digital; filtros; extractos; CTA final suave (alcance, no pitch) |
| `/blog/[slug]` | ×27 | Código | Títulos protegidos |
| `/en/*` | EN | Parcial | Mirrors de tono |
| `/glosario`, `/politicas-*` | Recursos | Código | Fuera del núcleo comercial |
| `/admin/seo` | Interno | No | Excluido |

---

## 2. Home — secciones (verificado)

Hero → Reel intro → Pilares D/D/M → Método → Muestras → Form → Footer → Cookies

---

## 3. Diagnóstico editorial

| Hallazgo | Estado |
|----------|--------|
| Concepto Forma clara / Ideas en forma | Establecido |
| Titulares-párrafo | Corregidos a jerarquía corta |
| Repetición About = tagline | Corregido → Oficio y alcance |
| CTA doble en portafolio | Corregido (un band al final) |
| “Alcance” como concepto estratégico | Conservado con funciones distintas por sección |
| Redes genéricas | Pendiente de URLs reales |
| Form denso (11 servicios) | Mitigado con “Proyecto completo” |

---

## 4. Experiencia por recorrido

| Recorrido | Hallazgo | Mejora aplicada |
|-----------|----------|-----------------|
| Exploración | Oferta clara en 5 s | Hero concepto + support oficios |
| Evaluación | Sin cases reales | Disclaimer muestras |
| Necesidad | 11 líneas | Headlines + entregables por servicio |
| Confianza | Blog + método | Mantener; sin fake proof |
| Contacto | Form largo | Microcopy corto; opción Proyecto completo |

---

## 5. Verificado / Inferido / Desconocido

**Verificado:** 11 servicios; 6 muestras conceptuales; 27 posts; email; Nuxt 4; UI rutas listadas.  
**Inferido:** núcleo diseño+dev+marketing; líneas técnicas = oferta listada.  
**Desconocido:** clientes, métricas, redes oficiales, teléfono real, tarifas, SLA.
