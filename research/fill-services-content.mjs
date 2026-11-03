/**
 * Restore missing Services CMS fields from Prismic payload into content/site.json.
 * Only fills empty title/items/awards/clients — does not invent copy.
 */
import fs from "node:fs";

const sitePath = "content/site.json";
const prismic = JSON.parse(
  fs.readFileSync("research/payloads/prismic-services.json", "utf8"),
);
const site = JSON.parse(fs.readFileSync(sitePath, "utf8"));
const d = prismic.results[0].data;

const richText = (blocks) =>
  (blocks || [])
    .map((b) => b.text || b.label || "")
    .filter(Boolean)
    .join("\n");

const listLabels = (rows) => (rows || []).map((r) => r.label).filter(Boolean);

const brandify = (s) =>
  String(s || "")
    .replaceAll("monopo.london", "3Drawers Agency")
    .replaceAll(/\bmonopo\b/gi, "3Drawers");

const titleObj = d.title?.[0];
const title = [richText(titleObj?.line_one), richText(titleObj?.line_two)]
  .filter(Boolean)
  .join(" ");

site.services.title = title || site.services.title || "We build expressive brands";
site.services.groups = [
  {
    title: richText(d.service_one_title) || "Branding",
    items: listLabels(d.service_one_list),
  },
  {
    title: richText(d.service_two_title) || "Communications",
    items: listLabels(d.service_two_list),
  },
  {
    title: richText(d.service_three_title) || "Digital",
    items: listLabels(d.service_three_list),
  },
];

site.services.clientsTitle =
  richText(d.clients_title) || site.services.clientsTitle || "Partnerships we value";
site.services.clients = (d.clients || [])
  .map((c) => ({
    url: c.logo?.url || "",
    alt: c.logo?.alt || "",
    width: c.logo?.dimensions?.width || undefined,
    height: c.logo?.dimensions?.height || undefined,
  }))
  .filter((c) => c.url);

const awardsByDateLink = new Map(
  (d.awards || []).map((a) => {
    const link = a.link?.url || "";
    const title = brandify([a.type, a.name].filter(Boolean).join(" — "));
    return [`${a.date}|${link}`, title];
  }),
);

site.services.awards = (site.services.awards || []).map((a) => {
  if (a.title) return a;
  const fromPrismic = (d.awards || []).find(
    (p) => p.date === a.date || (p.link?.url && a.link && p.link.url.includes(new URL(a.link).pathname.split("/").filter(Boolean).pop() || "___")),
  );
  let title = "";
  if (fromPrismic) {
    title = brandify([fromPrismic.type, fromPrismic.name].filter(Boolean).join(" — "));
  } else {
    title = awardsByDateLink.get(`${a.date}|${a.link}`) || "";
    if (!title) {
      const byDate = (d.awards || []).find((p) => p.date === a.date);
      if (byDate) {
        title = brandify([byDate.type, byDate.name].filter(Boolean).join(" — "));
      }
    }
  }
  return { ...a, title };
});

// Homepage title lines from Prismic (exact)
const home = JSON.parse(
  fs.readFileSync("research/payloads/prismic-homepage.json", "utf8"),
).results[0].data;
const ht = home.title?.[0];
if (ht) {
  site.homepage.titleLines = [ht.line_one, ht.line_two, ht.line_three].filter(
    Boolean,
  );
}
site.homepage.manifesto = (home.manifesto || []).map((m) => ({
  title: richText(m.manifesto_title),
  text: m.manifesto_text || "",
}));

fs.writeFileSync(sitePath, JSON.stringify(site, null, 2) + "\n");
console.log({
  servicesTitle: site.services.title,
  groupCounts: site.services.groups.map((g) => [g.title, g.items.length]),
  awardsFilled: site.services.awards.filter((a) => a.title).length,
  clients: site.services.clients.length,
  titleLines: site.homepage.titleLines,
  manifesto: site.homepage.manifesto,
});
