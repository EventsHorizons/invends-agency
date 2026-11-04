# PERFORMANCE_ROADMAP — Invends

Prioridades futuras sin romper identidad visual.

---

## P0 — Alto impacto / bajo riesgo de marca

1. **RUM / field CWV**  
   Instrumentar `web-vitals` (LCP, INP, CLS) hacia analytics o endpoint propio tras deploy. Validar hipótesis de lab contra usuarios reales en Colombia / LATAM.

2. **Eliminar o vaciar legacy `useSiteContent` payload**  
   Páginas `/work`, `/press`, `/team`, etc. ya redirigen; el composable aún genera chunk server ~1.39 MB. Migrar tipos a `siteData` y borrar JSON legacy del grafo de build.

3. **Subset / carga condicional de Geist Italic**  
   ~73 KB en el critical CSS path. Valorar `@font-face` local subset solo con glifos usados en acentos, o cargar italic tras idle si el FOIT residual es aceptable.

4. **Imágenes de blog**  
   Listado `/blog` ~384 KB img en lab. Generar variantes 640/960/1280 + `srcset` por cover.

---

## P1 — Main thread / INP

5. **Particionar más el entry de layout**  
   Header/footer cookies ya son ligeros; auditar imports estáticos restantes hacia el entry.

6. **GSAP ScrollTrigger**  
   Confirmar que no se importa en home si no se usa; mantener solo el core en hero.

7. **Service worker / stale-while-revalidate** (opcional)  
   Solo para estáticos versionados; no cachear `POST /api/contact`.

8. **Reduce motion + `save-data` / coarse pointer**  
   Además de `prefers-reduced-motion`, degradar WebGL a CSS gradient estático en `navigator.connection.saveData` o hardware débil detectado.

---

## P2 — Infra / edge

9. **Headers en Vercel**  
   Verificar que `Cache-Control` de Nitro se respetan en producción; añadir `Link` preload solo para LCP font en HTML edge.

10. **Brotli en CDN**  
    Confirmar compresión edge para HTML prerenderizado y `/_nuxt/*.js`.

11. **PageSpeed Insights + WebPageTest**  
    Correr desde Virginia / São Paulo tras el próximo deploy; guardar HAR en `docs/performance/archives/`.

12. **Prerender de posts de blog top-N**  
    Balancear TTFB vs tamaño de build; hoy el índice está prerenderizado.

---

## P3 — Calidad continua

13. **CI budget**  
    Fallar PR si Lighthouse mobile performance &lt; 0.80 o transfer home &gt; 700 KB (lab script).

14. **Visual regression smoke**  
    Screenshots home/servicios desktop+mobile post-build para asegurar que diferir WebGL no deja hero “vacío” demasiado tiempo (CSS fallback ya existe).

15. **Accesibilidad + performance**  
    Asegurar que el defer de Lenis no rompe anclas `#` ni focus scroll.

---

## Fuera de alcance deliberado

- Reescribir en otro framework.
- Quitar WebGL / GSAP / Lenis para “subir 10 puntos”.
- Deploy automático a producción sin aprobación.
