/**
 * Decision engine: classify findings, propose safe actions, never mutate prod blindly.
 */

const SAFE_AUTO = new Set([
  "report.write",
  "state.update",
  "draft.propose",
  "opportunity.log",
  "alert.emit",
]);

export function classifyFinding(finding) {
  const f = { ...finding };
  const { code, status, path } = f;

  if (code === "site.unreachable") {
    f.severity = "critical";
    f.priority = 1;
    f.likelyCause =
      "DNS del dominio canónico o despliegue caído. Sin sitio público no hay SEO.";
    f.actions = [
      { type: "alert.emit", risk: "none", note: "Avisar: dominio/deploy inalcanzable" },
      { type: "manual.dns", risk: "high", note: "Verificar DNS A/CNAME de invends.com → Vercel" },
    ];
    return f;
  }

  if (code === "http.error" && (path === "/sitemap.xml" || path === "/robots.txt")) {
    f.severity = "critical";
    f.priority = 1;
    f.likelyCause = "Ruta de indexación rota; bloquea descubrimiento.";
    f.actions = [
      { type: "alert.emit", risk: "none" },
      { type: "manual.fix-route", risk: "medium", note: "Revisar server/routes/sitemap.xml.ts" },
    ];
    return f;
  }

  if (code === "http.error" && status === 404) {
    f.severity = "high";
    f.priority = 2;
    f.likelyCause = "Enlace o URL en sitemap sin página.";
    f.actions = [
      { type: "opportunity.log", risk: "none" },
      { type: "manual.redirect-or-restore", risk: "medium" },
    ];
    return f;
  }

  if (code === "http.error" && status >= 500) {
    f.severity = "critical";
    f.priority = 1;
    f.likelyCause = "Error de servidor / función serverless.";
    f.actions = [{ type: "alert.emit", risk: "none" }];
    return f;
  }

  if (code === "robots.blocks_all") {
    f.severity = "critical";
    f.priority = 1;
    f.likelyCause = "robots.txt Disallow: /";
    f.actions = [{ type: "alert.emit", risk: "none" }, { type: "manual.fix-robots", risk: "high" }];
    return f;
  }

  if (code === "sitemap.missing_url") {
    f.severity = "medium";
    f.priority = 3;
    f.actions = [{ type: "opportunity.log", risk: "none" }];
    return f;
  }

  if (code === "meta.noindex") {
    f.severity = path === "/" ? "critical" : "high";
    f.priority = path === "/" ? 1 : 2;
    f.actions = [{ type: "alert.emit", risk: "none" }];
    return f;
  }

  if (code === "perf.slow") {
    f.severity = "medium";
    f.priority = 4;
    f.actions = [{ type: "opportunity.log", risk: "none" }];
    return f;
  }

  if (code === "content.opportunity") {
    f.severity = "low";
    f.priority = 5;
    f.actions = [{ type: "draft.propose", risk: "none" }];
    return f;
  }

  if (code === "ctr.opportunity") {
    f.severity = "medium";
    f.priority = 3;
    f.actions = [{ type: "opportunity.log", risk: "none" }];
    return f;
  }

  f.severity = f.severity || "info";
  f.priority = f.priority || 6;
  f.actions = f.actions || [{ type: "report.write", risk: "none" }];
  return f;
}

export function prioritize(findings) {
  return findings
    .map(classifyFinding)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));
}

export function planSafeActions(findings) {
  const planned = [];
  for (const f of prioritize(findings)) {
    for (const action of f.actions || []) {
      if (!SAFE_AUTO.has(action.type)) {
        planned.push({
          ...action,
          finding: f.code,
          path: f.path,
          auto: false,
          reason: "Requiere intervención humana o credencial",
        });
        continue;
      }
      planned.push({
        ...action,
        finding: f.code,
        path: f.path,
        auto: true,
      });
    }
  }
  return planned;
}

export function summarizeHealth(findings) {
  const ranked = prioritize(findings);
  const critical = ranked.filter((f) => f.severity === "critical").length;
  const high = ranked.filter((f) => f.severity === "high").length;
  const medium = ranked.filter((f) => f.severity === "medium").length;
  let score = 100;
  score -= critical * 25;
  score -= high * 12;
  score -= medium * 5;
  score = Math.max(0, Math.min(100, score));
  let label = "healthy";
  if (critical) label = "critical";
  else if (high) label = "degraded";
  else if (medium) label = "watch";
  return { score, label, critical, high, medium, total: ranked.length };
}
