# Invends — Investigación y diagnóstico del negocio

**Fecha:** 2026-11-05  
**Método:** inspección del repositorio (rutas, `siteData`, `servicePages`, blog, brand, contacto, SEO docs).  
**Regla:** hechos vs inferencias vs hipótesis vs desconocido.

---

## 1. Qué es Invends (hechos del proyecto)

| Hecho | Evidencia | Fuente | Verificabilidad |
|-------|-----------|--------|-----------------|
| Marca: Invends | `BRAND_NAME` | `app/utils/brand.ts` | Verificado |
| Email comercial: hola@invends.com | `CONTACT_INFO` / brand | `contactInfo.ts`, `brand.ts` | Verificado |
| Base geográfica comunicada: Bogotá / LATAM | Contacto, metas, copy | `ContactView`, SEO docs | Verificado (claim de operación; dirección física no publicada) |
| Oferta publicada: diseño web, desarrollo, marketing digital (+ líneas extendidas) | Catálogo 11 servicios | `SERVICE_CATEGORIES`, landings | Verificado |
| Stack sitio: Nuxt 4 / Vue 3, SSR+prerender | `nuxt.config`, package | Repo | Verificado |
| Formulario de contacto funcional en código | `SiteContactForm`, API contact | `app/components`, `server` | Verificado en código; envío depende de deploy/env |
| Portafolio = muestras conceptuales de método | `client: "Muestra conceptual"`, disclaimer en results | `siteData.ts` PROJECTS | Verificado |
| Blog educativo (27 títulos) sobre brief, UX, conversión, SEO, migración, etc. | `blogData`, `blogPostsFromSocial` | Utils blog | Verificado |
| SEO operativo documentado | `docs/seo/*` | Docs | Verificado |

---

## 2. Inventario de servicios (catálogo real)

Títulos **protegidos** (no modificar):

1. Diseño web  
2. Branding  
3. Desarrollo web  
4. Aplicaciones  
5. E-commerce  
6. SEO  
7. Marketing  
8. Inteligencia artificial  
9. Automatización  
10. Migración y refactorización  
11. MVP ultra-rápido (MaaS)

**Hecho:** el sitio presenta estas 11 líneas con descripciones, items y landings SEO.  
**Inferencia:** el núcleo comercial comunicable con más evidencia de método es diseño + desarrollo + marketing (hero, pilares, blog).  
**Hipótesis:** IA, automatización, migración y MVP son capacidades ofrecidas; el grado de madurez comercial de cada una **no** está respaldado por casos de cliente publicados.  
**Decisión:** comunicarlas como servicios disponibles con alcance por conversación; no como especialización demostrada con resultados.

---

## 3. Portafolio y capacidades demostrables

| Proyecto (nombre) | Tipo | Qué demuestra | Qué NO demuestra |
|-------------------|------|---------------|------------------|
| Sitio con sistema editorial | Muestra método | Criterio tipográfico / componentes | Resultados de cliente |
| Landing de producto digital | Muestra método | Jerarquía y una acción | Conversión medida |
| Web de lanzamiento de marca | Muestra método | Alineación marca–web–mensaje | Go-live real de cliente |
| Landing de servicio | Muestra método | Oferta + contacto | Leads generados |
| Sitio institucional | Muestra método | Claridad de oferta | Credenciales institucionales |
| Base de contenido digital | Muestra método | Sistema editorial | Performance de redes |

**Decisión de marca:** el portafolio es evidencia de **enfoque**, no de **trayectoria de clientes**. El copy debe decirlo siempre.

---

## 4. Matriz de hallazgos → implicación → decisión

| Hallazgo | Evidencia | Implicación | Decisión |
|----------|-----------|-------------|---------|
| Comunicación previa (y copy “cálido”) centrada en “escuchamos” | `brand.ts`, `messages`, About | Empatía verbal repetida ≠ diferenciación comercial | Posicionar por **claridad de presencia + alcance**; empatía por utilidad, no por estribillo |
| Competencia local satura ROI / IA 24/7 / “transformamos” | `docs/seo/COMPETITOR_ANALYSIS.md` + web 2026 | Diferenciarse inventando claims es riesgoso | Diferenciarse por honestidad de alcance y oficios integrados |
| Teléfono placeholder `+57 300 000 0000` | `contactInfo.ts` | No es NAP real | No destacarlo; `hasRealPhone()` debe seguir ocultándolo |
| Redes apuntan a raíces genéricas (linkedin.com, etc.) | `contactInfo.ts` | No son perfiles verificables | No usar como prueba social |
| Blog alineado a dudas pre-contratación | Títulos/contenido blog | Activo de confianza educativo | Mantener valor útil; CTA suaves al final |
| Stripe/home lista 11 oficios | `HOME_STRIP` | Riesgo de “todo para todos” | Narrativa: núcleo diseño·dev·marketing; resto como líneas de apoyo |

---

## 5. Qué vende realmente Invends

**Hecho comunicable:**  
Servicios de diseño y desarrollo web, branding, e-commerce, SEO, marketing digital, y líneas técnicas (apps, IA aplicada, automatización, migración, MVP), desde Bogotá / LATAM, con contacto por email/formulario.

**Valor que puede argumentarse sin inventar resultados:**  
Ordenar la presencia digital para que la oferta se entienda, el sitio se sostenga técnicamente y el mensaje no se separe del canal —con un alcance explícito por fase.

---

## 6. Información desconocida / no verificable

- Años de operación, tamaño del equipo, facturación.  
- Clientes reales, logos, testimonios, métricas de conversión o ranking.  
- Tarifas estándar.  
- Dirección física.  
- Perfiles sociales oficiales.  
- Certificaciones.  
- Casos con “antes/después” medido.

**Regla:** si no está en el repo o en NAP verificable, **no se afirma**.

---

## 7. Problemas de la comunicación actual (diagnóstico)

1. **Confusión portafolio:** aunque el disclaimer existe, el hero de proyectos (“experiencias reales”) puede leerse como casos de cliente.  
2. **Empatía genérica:** exceso de marco “escuchamos / cuéntanos” sin anclar el beneficio comercial (claridad + alcance).  
3. **Catálogo ancho:** 11 servicios sin jerarquía percibida pueden diluir la oferta.  
4. **Confianza incompleta:** sin casos reales, la confianza debe venir de método, claridad y educación —no de “somos líderes”.  
5. **SEO/claims:** el sitio ya evita promesas de ranking; mantener esa disciplina.
