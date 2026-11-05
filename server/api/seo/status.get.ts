import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertSeoDashboardAccess } from "../../utils/seoAuth";

function readJsonSafe(path: string) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

export default defineEventHandler((event) => {
  assertSeoDashboardAccess(event);

  const root = process.cwd();
  const state = readJsonSafe(resolve(root, "data/seo/state.json"));
  const daily = readJsonSafe(resolve(root, "data/seo/latest-daily.json"));
  const weekly = readJsonSafe(resolve(root, "data/seo/latest-weekly.json"));
  const monthly = readJsonSafe(resolve(root, "data/seo/latest-monthly.json"));

  return {
    generatedAt: new Date().toISOString(),
    dataAvailability: {
      state: Boolean(state),
      daily: Boolean(daily),
      weekly: Boolean(weekly),
      monthly: Boolean(monthly),
      note: "Los informes existen tras ejecutar el SEO engine (local o GitHub Actions). Sin corridas = datos no disponibles, no estimados.",
    },
    state,
    daily: daily
      ? {
          id: daily.id,
          health: daily.health,
          startedAt: daily.startedAt,
          base: daily.base,
          sitemap: daily.sitemap,
          robots: daily.robots,
          homeMeta: daily.homeMeta,
          findings: daily.findings,
          brokenLinks: daily.brokenLinks,
          pageChecks: daily.pageChecks,
        }
      : null,
    weekly: weekly
      ? {
          id: weekly.id,
          health: weekly.health,
          startedAt: weekly.startedAt,
          integrations: weekly.integrations,
          psi: weekly.psi,
          gsc: weekly.gsc,
          ga4: weekly.ga4,
          contentDrafts: weekly.contentDrafts,
          linkOpportunities: weekly.linkOpportunities,
          findings: weekly.findings,
          dataHonesty: weekly.dataHonesty,
        }
      : null,
    monthly: monthly
      ? {
          id: monthly.id,
          health: monthly.health,
          startedAt: monthly.startedAt,
          strategicPlan: monthly.strategicPlan,
          contentInventory: monthly.contentInventory,
          architecture: monthly.architecture,
          findings: monthly.findings,
        }
      : null,
  };
});
