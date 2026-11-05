# Maintenance CHANGELOG — Invends

## 2026-11-04 — Deep cleanup & bundle trim

### Removed
- Legacy Monopo/3Drawers pages: `services`, `contact`, `work/*`, `team/*`, `press`, `policy`
- Components: `ProjectGrid`, `ProjectFilters`, `ProjectSlices`
- Composable: `useSiteContent` (JSON CMS import path)
- Empty dirs: root `blog/`, `public/images/_magnific_tmp/`

### Changed
- Legacy `routeRules` redirects → HTTP **301**
- Added `content/README.md` (payloads históricos, no runtime)

### Measured
- Nitro build **4.63 MB → 3.13 MB** (gzip **971 → 745 kB**)

### Docs
- `FULL_PROJECT_AUDIT.md`, `CLEANUP_REPORT.md`, `REFACTORING_REPORT.md`, `DEPENDENCIES_AUDIT.md`, `PERFORMANCE_REPORT.md`, `TESTING_REPORT.md`

### Preserved
- Identidad visual, animaciones, rutas Invends, SEO engine, formulario de contacto, dependencias npm
