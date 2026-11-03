# QA — Week 01 · Presencia que decide

## Checklist de campaña

| Criterio | Estándar | Estado |
|----------|----------|--------|
| Identidad | Tokens Invends (dark `#090711`, brand `#8A68FF`, Roobert) | OK |
| Dirección de arte | Concepto semanal documentado en `DIRECCION-ARTE.md` | OK |
| Formato | 14 × 1080×1350 PNG sRGB | Ver `qa-dimensions.json` |
| Márgenes | ≥ 80 px seguro; logo ≥ 64 px | Revisar visual |
| Variedad | Tipográfico / imagen / diagrama / comparación / light / CTA | Secuencia 01–14 |
| Sin plantilla única | No título+foto+logo idéntico ≥3 seguidas | OK por diseño |
| Legibilidad feed | Display ≥ 56 px; body ≥ 28 px | OK |
| Captions | Una idea en pieza; ampliación en `captions.md` | OK |

## Estructura por pieza

| # | Composición | Fondo |
|---|-------------|-------|
| 01 | Hero tipográfico + atmósfera | Dark |
| 02 | Asimetría + rail brand | Dark |
| 03 | Full-bleed servicio diseño | Dark |
| 04 | Diagrama 3 pasos | Dark |
| 05 | Canales + mensaje split | Dark |
| 06 | Método 01/02/03 | Dark |
| 07 | Comparación dos columnas | Dark |
| 08 | Swatches + reglas | Light |
| 09 | UI abstracta + UX | Dark |
| 10 | Quote oversized | Dark |
| 11 | Nodos automatización | Dark |
| 12 | CTA contacto | Light |
| 13 | Still + caption bar | Dark |
| 14 | Cierre tipográfico + CTA | Dark |

## Revisión visual (post-render)

1. Abrir grid de 14 en explorador de archivos / Figma.
2. Simular ~180 px de ancho: ¿se lee el titular?
3. Corregir plantillas que fallen y re-ejecutar `npm run social:ig`.
