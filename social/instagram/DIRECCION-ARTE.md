# Invends Social Engine — Dirección de arte

Campaña Instagram · Feed **1080×1350** (4:5) · sRGB PNG  
Referencia de marca: [`IDENTIDAD-GRAFICA.md`](../../IDENTIDAD-GRAFICA.md)

---

## 1. Concepto semanal

**“Presencia que decide”**

Una semana editorial que traduce el posicionamiento de Invends — claridad, oficio, alcance concreto — a piezas hechas para el feed móvil. No es un catálogo de servicios: es una secuencia de *criterio* que se reconoce al scrollear.

| Eje | Traducción visual |
|-----|-------------------|
| Claridad | Tipografía dominante, poca ornamentación, un mensaje por pieza |
| Oficio | Stills de trabajo real, diagramas calm, sistemas (no stock genérico) |
| Alcance | CTAs concretos, contacto visible, promesas cerradas |

**Principio rector:** consistencia de identidad ≠ repetición de plantilla. Misma voz, catorce estructuras.

---

## 2. Lenguaje gráfico

- **Atmósfera:** campo oscuro `#090711` como lienzo dominante; lavanda/violeta como *señal*, no como wash.
- **Acento tipográfico:** itálica Roobert + color brand `#8A68FF` en la palabra que carga el sentido (*decide*, *lee*, *criterio*).
- **Línea:** hairlines `#332A49` / brand a 1–2 px — reglas editoriales, no decoración.
- **Superficie:** paneles `#130D25` solo cuando contienen interacción o contraste (comparación, swatches).
- **Magenta `#FF2DAA`:** máximo un acento por pieza (punto, barra, nodo activo). Nunca glow.
- **Light boards:** 08 (sistema) y 12 (CTA) — respiración cromática en la semana.

Referencias de *estándar* (no de estilo): rigor tipográfico tipo estudio (Pentagram / Collins / Instrument) — densidad controlada, márgenes generosos, una idea clara.

---

## 3. Tipografía

Familia única de producto: **Roobert** (Regular, SemiBold, Bold, itálicas).

| Rol | Peso | Tamaño (px) | Tracking | Line-height |
|-----|------|-------------|----------|-------------|
| Hero display | 800 | 96–128 | −0.045em | 0.90–0.94 |
| Section display | 800 | 64–84 | −0.04em | 0.94 |
| Lead / quote | 400 italic | 44–56 | −0.02em | 1.15 |
| Body en pieza | 400 | 28–32 | 0 | 1.35 |
| Eyebrow / label | 600 | 20–24 | 0.14em | 1 | uppercase |
| Meta / num | 600 | 22–26 | 0.10em | 1 | brand o muted |
| Wordmark | 800 | 26–30 | −0.03em | 1 |

**Reglas**

- Un titular dominante por pieza; soporte ≤ 2 líneas.
- Nunca texto de mensaje principal &lt; 28 px.
- Alineación óptica a la retícula (izquierda o asimetría intencional — no centrado por defecto).
- Caption del feed amplía; la pieza no es un párrafo.

---

## 4. Retícula y espacio

| Parámetro | Valor |
|-----------|--------|
| Lienzo | 1080 × 1350 |
| Margen seguro | **80 px** (logo / texto crítico) |
| Columnas | 12 · gutter 24 px · módulo ~72 px |
| Aire logo | ≥ 64 px desde bordes |
| Separación bloque | múltiplos de 24 / 40 / 64 |

Espacio negativo es contenido: en tipográficos, el vacío superior o lateral debe ser tan deliberado como el tipo.

---

## 5. Imagen

Usar stills de `public/images/services/` y `principle-*` **solo** cuando aportan oficio (UI, producto, atmósfera de trabajo).

| Tratamiento | Uso |
|-------------|-----|
| Full-bleed + velo | 03, 13 — imagen como plano dominante |
| Crop editorial | 08 — fragmento + sistema |
| Sin foto | 01, 02, 04–07, 09–12, 14 — tipo / diagrama |

Prohibido: fotos empresariales genéricas, collages, stickers, mockups flotantes con sombra multilayers.

---

## 6. Secuencia de 14 (ritmo)

| # | Tipo | Mensaje | Estructura | Fondo |
|---|------|---------|------------|-------|
| 01 | Tipográfico hero | Presencia que *decide* | Display anclado abajo · campo atmosférico | Dark |
| 02 | Posicionamiento | Claridad antes que ruido | Asimetría: eyebrow + display enorme + regla | Dark |
| 03 | Servicio | Diseño web | Full-bleed still + type over | Dark |
| 04 | Servicio | Desarrollo | Diagrama 3 pasos vertical | Dark |
| 05 | Servicio | Marketing | Stack canales + mensaje | Dark |
| 06 | Método | Cómo trabajamos | 01 / 02 / 03 a altura completa | Dark |
| 07 | Comparación | Genérico vs criterio | Dos columnas contraste | Dark |
| 08 | Sistema | Branding | Swatches + wordmark + reglas | Light |
| 09 | Conceptual | UX que sostiene | Minimal + UI abstracta | Dark |
| 10 | Proof | Alcance concreto | Quote tipográfico oversized | Dark |
| 11 | Diagrama | Automatización / IA | Nodos + wires calm | Dark |
| 12 | CTA light | hola@invends.com | Board claro, wordmark dark | Light |
| 13 | Portfolio | Ideas → experiencias | Still principle + caption bar | Dark |
| 14 | Cierre | Hablemos | Display + contacto | Dark |

Al ver el grid de 14: oscuro dominante, dos lights (08, 12), imagen en 03/13, diagramas en 04/06/11, tipográficos fuertes en 01/02/10/14.

---

## 7. Criterios UX (pieza estática)

Cada PNG debe pasar:

1. **Atención** — un ancla visual en &lt;1 s (tipo, contraste o imagen).
2. **Comprensión** — mensaje en una frase corta.
3. **Jerarquía** — un primario, un secundario, meta opcional.
4. **Legibilidad** — legible a ~180 px de ancho de feed.
5. **Acción** — CTA o siguiente paso en caption; pieza no satura.

---

## 8. Prohibido

- Plantilla fija: título arriba / foto centro / logo abajo en ≥3 piezas seguidas  
- Tipografía diminuta en el mensaje  
- Glow neon, bordes glow, purple-on-white genérico  
- Centrado automático sin intención  
- Más de una idea primaria por pieza  
- Logo con outline o sombra  

---

## 9. Export

- `npm run social:ig` → `social/instagram/week-01/invends-ig-XX.png`  
- 1080×1350 · PNG · sRGB  
- Captions: `week-01/captions.md`  
- QA: dimensiones + revisión visual de grid
