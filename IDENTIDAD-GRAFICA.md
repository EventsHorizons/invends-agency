# Invends — Identidad gráfica

Documento de referencia de la identidad visual y verbal de **Invends**, alineado con la implementación actual del sitio (tokens CSS, componentes y copy de marca).

**Fuentes de verdad en código**

| Área | Archivo |
|------|---------|
| Nombre, tagline, hero | `app/utils/brand.ts` |
| Tokens de color, tipografía, temas | `app/assets/css/main.css` |
| Header, footer, chrome | `app/assets/css/layout.css` |
| Layout editorial / CTAs | `app/assets/css/trespi-layout.css` |
| Onda WebGL (hero) | `app/utils/agencyGradientShader.ts` → `BRAND_WAVE_HEX` |

---

## 1. Posicionamiento

| | |
|---|---|
| **Nombre** | Invends |
| **Tipo** | Estudio creativo design-driven |
| **Oficios** | Diseño web · Desarrollo · Marketing digital |
| **Promesa** | Presencia que decide |
| **Criterio** | Que la marca se entienda, se sostenga y se elija |
| **Territorio** | Bogotá / LATAM |
| **Contacto** | hola@invends.com |

Invends no se presenta como “agencia genérica”: habla de **claridad, oficio y alcance concreto**. Menos ruido visual y verbal; más jerarquía, método y decisión.

---

## 2. Identidad verbal

### ES

| Pieza | Texto |
|-------|--------|
| Tagline | Diseño · Código · Mensaje |
| Hero | Presencia que decide. |
| Soporte | Diseño web, desarrollo y marketing con un solo criterio: que tu marca se entienda, se sostenga y se elija. |
| Meta | Invends — design-driven creative studio for branding, digital and communications. |
| CTA primario típico | Hablar con Invends |

### EN

| Pieza | Texto |
|-------|--------|
| Tagline | Design · Code · Message |
| Hero | Presence that decides. |
| Soporte | Web design, development and marketing with one criterion: a brand that is understood, holds up, and gets chosen. |
| CTA primario típico | Talk to Invends |

### Tono

- Experto, directo, concreto.
- Preferir alcance y criterio frente a frases vacías o “promesas abiertas”.
- Mayúsculas en labels/eyebrows (tracking amplio); display en sentence case con acentos tipográficos (itálica en palabras clave).

---

## 3. Logo / wordmark

### Forma actual en producto

- **Wordmark tipográfico**: la palabra `Invends` en el header (`font-display`, peso 800).
- Color del logo vía token `--logo-fg`:
  - Dark: `#ffffff`
  - Light: `#201b2c`
- No hay isotipo obligatorio en chrome; el nombre es el señal de marca dominante.

### Assets disponibles

| Archivo | Uso |
|---------|-----|
| `public/images/logo-mark.svg` | Marca / mark |
| `public/images/logo-white.jpg` | Versión clara sobre fondo oscuro |
| `public/images/logo-black.jpg` | Versión oscura sobre fondo claro |

### Reglas de uso

- El nombre de marca debe leerse como señal heroica en superficies branded (no solo como texto de nav).
- No deformar, no outline decorativo, no sombras neon.
- Mantener aire alrededor; en header: tamaño fluido ~`clamp(1.05rem, 2.8vw, 1.15rem)`.
- Sobre la onda WebGL / héroes: forzar copy claro (`#fff`) con velo oscuro bajo el texto — no depender del gradiente para legibilidad.

---

## 4. Color

### Núcleo de marca (siempre)

| Token | Hex | Rol |
|-------|-----|-----|
| `--color-brand` | `#8A68FF` | Violeta principal / acento |
| `--color-brand-deep` | `#25134F` | Violeta profundo / ancla |
| `--color-lavender` | `#B8A6FF` | Lavanda / highlights (en light se reasigna a brand) |
| `--color-magenta` | `#FF2DAA` | Magenta energía |
| `--color-magenta-soft` | `#FF5FBF` | Magenta suave |

### Gradiente de acento

```css
--color-accent-gradient: linear-gradient(
  125deg,
  #25134f 0%,
  #8a68ff 48%,
  #b8a6ff 100%
);
```

**Uso correcto del gradiente**

- Texto accent con `background-clip: text` (nunca como wash de sección completa).
- CTAs: fondo sólido en reposo; **gradiente solo en hover / focus / active**.
- No usar purple-on-white genérico ni glows multilayers como look por defecto.

### Onda WebGL (AgencyGradient)

Stops de la atmósfera de marca (`BRAND_WAVE_HEX`):

| Orden | Hex | Nota |
|-------|-----|------|
| 1 | `#4B28B5` | Deep wave |
| 2 | `#6D45EA` | Mid violet |
| 3 | `#B8A6FF` | Lavender |
| 4 | `#FF2DAA` | Magenta |
| 5 | `#FF5FBF` | Magenta soft |

La onda es el **ancla visual** de héroes y páginas clave. El copy encima va en blanco sólido + velo oscuro.

### Tema oscuro (default)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#090711` | Fondo |
| `--color-fg` | `#F7F5FF` | Texto |
| `--color-muted` | `#AAA3BF` | Secundario |
| `--color-surface` | `#130D25` | Superficies / cards |
| `--color-surface-2` | `#1B1429` | Elevación |
| `--color-input-bg` | `#100A1C` | Inputs |
| `--color-btn-bg` | `#1B1429` | Botón idle |
| `--color-btn-fg` | `#FFFFFF` | Texto botón |
| `--color-footer-bg` | `#07050E` | Footer |
| `--line` | `#332A49` | Bordes / divisores |
| `--color-error` | `#FF6B9A` | Error |
| `--color-ok` | `#B8A6FF` | Éxito / OK |
| `--shadow-soft` | `0 12px 40px rgba(0,0,0,.4)` | Sombra |

Header scrolled (dark): cristal — `color-mix(#090711 58%, transparent)` + `blur(18px) saturate(1.35)`.

### Tema claro

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#FFFFFF` | Fondo |
| `--color-fg` | `#201B2C` | Texto |
| `--color-muted` | `#625B70` | Secundario |
| `--color-surface` | `#F7F6FB` | Superficies |
| `--color-surface-2` | `#EFEEF6` | Elevación |
| `--color-btn-bg` | `#201B2C` | Botón idle |
| `--color-footer-bg` | `#F7F6FB` | Footer |
| `--line` | mix de `#332A49` ~28% | Bordes suaves |
| `--color-error` | `#C9184A` | Error |
| `--color-ok` | `#25134F` | OK |
| `--color-lavender` | `#8A68FF` | Ajuste light |

Header light: blanco sólido + borde sutil, sin glass.

---

## 5. Tipografía

### Familias

| Rol | Familia | Token |
|-----|---------|--------|
| Cuerpo / UI | **Roobert** (+ system-ui) | `--font` |
| Display / títulos | **Geist Variable** → Geist → Roobert | `--font-display` |
| Display itálica | **Geist Variable Italic** | `--font-display-italic` |

Archivos Roobert: `/public/fonts/Roobert-*.woff2` (400, 600, 800 + itálicas).  
Geist vía paquete `non.geist` / `non.geist/italic`.

### Pesos y tracking

| Uso | Peso | Tracking |
|-----|------|----------|
| Display / H1 | 800 | `--tracking-display: -0.04em` |
| Títulos H2/H3 | 700 | `--tracking-title: -0.03em` |
| SemiBold UI | 600 | — |
| Cuerpo | 400 | — |
| Eyebrows / labels | 400–700 | ~`0.10em`–`0.14em`, uppercase |

### Escalas fluidas (referencia sitio)

| Elemento | Escala típica |
|----------|----------------|
| Hero H1 | `clamp(2.35rem, 9.5vw, 5.85rem)` · lh ~0.96 |
| Page H1 | `clamp(2.1rem, 7vw, 4.2rem)` |
| Section H2 | `clamp(1.5rem–1.8rem, …vw, 2.8rem–3rem)` |
| Cuerpo | ~1rem · lh 1.45–1.55 |
| Eyebrow | ~0.72–0.75rem uppercase |
| CTA label | ~0.78rem uppercase · tracking `0.06em` |

### Recursos tipográficos de marca

- Palabra accent en hero: **itálica** (Geist italic), no solo color.
- Evitar stacks genéricos (Inter, Roboto, Arial) en piezas branded.
- OpenType display: `font-feature-settings: "ss01" on, "ss02" on` en títulos.

---

## 6. Forma, ritmo y UI

### Radios

| Elemento | Radio |
|----------|--------|
| Botones / chips / toggles | `999px` (pill) |
| Formularios / cards suaves | `~0.35rem`–`0.75rem` |
| Media / featured | `~0.45rem`–`0.5rem` |

### Espaciado

- Gutter: `max(clamp(1rem, 3.2vw, 2.5rem), safe-area)`.
- Secciones: `clamp(2.5rem, 7vw, 6rem)` vertical.
- Contenedor: `min(1120px, 100% − 2×gutter)`; narrow `720px`.
- Header height: `4.25rem` (&lt;480px) → `4.5rem`.

### Motion

| Token / patrón | Valor / regla |
|----------------|----------------|
| Ease marca | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Theme / glass | ~0.25s |
| Hover CTA | gradiente + leve lift (`translateY(-2px)`) en hero |
| Reduced motion | respetar `prefers-reduced-motion` (Lenis off, animaciones cortadas) |

### Textura

- Noise overlay global (`.noise::before`): opacity `0.08` dark / `0.035` light.
- No sustituir la atmósfera real (onda / foto de producto) por solo gradiente abstracto.

### Controles chrome

- Icon buttons (lang, theme, menu): círculo ~`2.5rem`–`2.75rem`, borde `--line`.
- Áreas táctiles mínimas ~44px en móvil.

---

## 7. Componentes de marca (comportamiento)

### Botón primario (`.td-btn` / brand)

1. Idle: fondo `--color-btn-bg`, texto `--color-btn-fg`, sin gradiente.
2. Hover / focus / active: fondo transparente + `--color-accent-gradient`.
3. Uppercase, tracking `0.06em`, pill, min-height ~`2.75rem`.
4. Sobre héroes con onda: borde blanco semitransparente + sombra suave.

### Texto accent (`.td-accent`, `.text-accent`)

- Gradiente clippeado al texto.
- En héroes con onda: **override a blanco sólido** (legibilidad > efecto).

### Chips / tags / filtros

- Pill outline `--line`.
- Selected: borde brand + wash `color-mix(brand 16–22%, transparent)`.

### Formularios

- Inputs 16px (evitar zoom iOS).
- Superficie input dark: `#100A1C`.
- Focus ring: brand mix ~55%.

---

## 8. Imagen y atmósfera

### Principios

1. **Ancla real**: producto, lugar, atmósfera o contexto — no solo gradient decorativo.
2. Héroes full-bleed / edge-to-edge cuando son superficie promocional.
3. Fotografía con grano/atmosfera compatible con el noise de UI.
4. Object-fit cover; recortes conscientes por breakpoint (no deformar).

### Capas típicas de un hero Invends

1. AgencyGradient (onda brand) o foto full-bleed.
2. Velo oscuro direccional (legibilidad del copy).
3. Copy blanco + eyebrow uppercase + CTA.
4. Noise global encima (no interactivo).

### Evitar

- Cards en el hero.
- Badges flotantes / stickers / chips sobre la imagen hero.
- Collages inset o paneles laterales como default de landing.
- Purple-indigo genérico “AI default”, cream+terracotta, o look broadsheet.

---

## 9. Temas y accesibilidad

- Default: **dark** (`color-scheme: dark`).
- Toggle claro/oscuro persistente (`invends-theme` en `localStorage`).
- Contraste: copy sobre onda siempre forzado a claro + velo.
- Focus visible en controles interactivos.
- Respeto a `prefers-reduced-motion`.

---

## 10. Do / Don’t (rápido)

### Do

- Marca primero en el primer viewport.
- Gradiente como acento puntual (texto / hover), no como fondo de sección.
- Display Geist + cuerpo Roobert.
- Onda brand + copy blanco en héroes.
- CTAs oscuros en reposo; gradiente al interactuar.
- Un trabajo por sección; menos clutter.

### Don’t

- Rediseñar con paletas ajenas (cream/terracotta, purple-white genérico).
- Usar el gradiente como wash de página completa.
- Ocultar el nombre Invends o degradarlo a solo nav.
- Deformar el wordmark.
- Introducir tipografías de sistema por defecto en piezas branded.
- Animaciones que generen overflow o bloqueen touch.

---

## 11. Snippet de tokens (referencia rápida)

```css
:root {
  --color-brand: #8a68ff;
  --color-brand-deep: #25134f;
  --color-lavender: #b8a6ff;
  --color-magenta: #ff2daa;
  --color-magenta-soft: #ff5fbf;
  --color-accent-gradient: linear-gradient(
    125deg,
    #25134f 0%,
    #8a68ff 48%,
    #b8a6ff 100%
  );

  --font: Roobert, system-ui, sans-serif;
  --font-display: "Geist-Variable", Geist, Roobert, system-ui, sans-serif;
  --font-display-italic: "Geist-VariableItalic", "Geist-Variable", Geist, Roobert, sans-serif;
  --tracking-display: -0.04em;
  --tracking-title: -0.03em;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
}

/* Dark default */
--color-bg: #090711;
--color-fg: #f7f5ff;
--color-muted: #aaa3bf;
--color-surface: #130d25;
--line: #332a49;
```

---

*Documento generado a partir del sistema implementado en el sitio Invends. Cualquier cambio de marca debe actualizar primero `brand.ts` y los tokens de `main.css`, y luego este archivo.*
