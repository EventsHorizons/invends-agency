/** Map service / pillar ids to calm UI demo variants. */
export type ServiceUiVariant =
  | "web"
  | "brand"
  | "dev"
  | "apps"
  | "commerce"
  | "seo"
  | "marketing"
  | "ai"
  | "auto"
  | "migrate"
  | "mvp"
  | "design"
  | "default";

const BY_ID: Record<string, ServiceUiVariant> = {
  "diseno-web": "web",
  branding: "brand",
  "desarrollo-web": "dev",
  "desarrollo-apps": "apps",
  ecommerce: "commerce",
  seo: "seo",
  "marketing-digital": "marketing",
  "inteligencia-artificial": "ai",
  automatizacion: "auto",
  "migracion-legacy": "migrate",
  "mvp-rapido": "mvp",
  "oficio-diseno": "design",
  "oficio-desarrollo": "dev",
  "oficio-marketing": "marketing",
};

export function serviceUiVariantFor(
  idOrAnchor: string,
  poster?: string,
): ServiceUiVariant {
  if (BY_ID[idOrAnchor]) return BY_ID[idOrAnchor];
  if (poster?.includes("principle-diseno")) return "design";
  if (poster?.includes("principle-desarrollo")) return "dev";
  if (poster?.includes("principle-marketing")) return "marketing";
  if (poster?.includes("svc-diseno")) return "web";
  if (poster?.includes("svc-branding")) return "brand";
  if (poster?.includes("svc-desarrollo")) return "dev";
  if (poster?.includes("svc-aplicaciones")) return "apps";
  if (poster?.includes("svc-ecommerce")) return "commerce";
  if (poster?.includes("svc-seo")) return "seo";
  if (poster?.includes("svc-marketing")) return "marketing";
  if (poster?.includes("svc-ia")) return "ai";
  if (poster?.includes("svc-automatizacion")) return "auto";
  if (poster?.includes("svc-migracion")) return "migrate";
  if (poster?.includes("svc-mvp")) return "mvp";
  return "default";
}
