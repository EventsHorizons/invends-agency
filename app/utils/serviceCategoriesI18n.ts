import type { Locale } from "~/composables/useLocale";
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "~/utils/siteData";

/** English copy for the services scroll / reel (same anchors & images as ES). */
export const SERVICE_CATEGORIES_EN: ServiceCategory[] = [
  {
    id: "diseno-web",
    anchor: "diseno-web",
    title: "Web design",
    headline: "Experiences that make choosing you easy.",
    number: "01",
    intro: "Sites that explain the business and work on a phone.",
    response:
      "We shape hierarchy, rhythm and reading so the page explains the project without asking for effort.",
    image: "/images/services/svc-diseno-web.webp",
    imageAlt: "Web layout and interface architecture as a device prototype",
    items: [
      {
        title: "Structure",
        description:
          "Information architecture · Hierarchy and path · Responsive behavior",
      },
      {
        title: "Interface",
        description: "Composition and type · States and focus · Reading rhythm",
      },
      {
        title: "System",
        description: "Components · Visual tokens · Consistency across pages",
      },
      {
        title: "Deliverables",
        description: "Sites and landing pages · Interface systems · Reading prototypes",
      },
    ],
  },
  {
    id: "branding",
    anchor: "branding",
    title: "Branding",
    headline: "An identity recognized without explanations.",
    number: "02",
    intro: "Name, tone and visual system for day-to-day brand use.",
    response:
      "We define a visual and verbal language that holds on screen, paper and product.",
    image: "/images/services/svc-branding.webp",
    imageAlt: "Stationery system and corporate identity in an editorial layout",
    items: [
      {
        title: "Position",
        description: "Brand territory · Voice and judgment · What stays unsaid",
      },
      {
        title: "Language",
        description: "Symbol and type · Color and rhythm · Relationship between pieces",
      },
      {
        title: "System",
        description: "Applicable rules · Art direction · Digital use",
      },
      {
        title: "Deliverables",
        description: "Visual identity · Brand system · Application criteria",
      },
    ],
  },
  {
    id: "desarrollo-web",
    anchor: "desarrollo-web",
    title: "Web development",
    headline: "A site that doesn’t just look good: it works for your business.",
    number: "03",
    intro: "The site has to still stand the day people arrive.",
    response:
      "We build an architecture that prioritizes speed, access and the ability to change without rewriting everything.",
    image: "/images/services/svc-desarrollo-web.webp",
    imageAlt: "Responsive site concept: web layouts on a device",
    items: [
      {
        title: "Architecture",
        description: "Frontend and structure · Content and data · Deploy",
      },
      {
        title: "Performance",
        description: "Weight and render · Accessibility · Measurable base",
      },
      {
        title: "Integration",
        description: "APIs · Forms · Existing services",
      },
      {
        title: "Deliverables",
        description: "Production sites · Evolving technical base · Integrations",
      },
    ],
  },
  {
    id: "desarrollo-apps",
    anchor: "desarrollo-apps",
    title: "Applications",
    headline: "Products people open again.",
    number: "04",
    intro: "An application is a habit, not a screen.",
    response:
      "We define the critical paths and build them so someone can come back and open them again.",
    image: "/images/services/svc-aplicaciones.webp",
    imageAlt: "Mobile product screen with application interface",
    items: [
      {
        title: "Product",
        description: "Scope · Critical flows · Delivery priority",
      },
      {
        title: "Experience",
        description: "Interaction · Empty and error states · Continuity across sessions",
      },
      {
        title: "Technology",
        description: "Data · Access · Integrations",
      },
      {
        title: "Deliverables",
        description: "Usable MVPs · Web apps · Dashboards and functional prototypes",
      },
    ],
  },
  {
    id: "ecommerce",
    anchor: "ecommerce",
    title: "E-commerce",
    headline: "A purchase path that doesn’t break halfway.",
    number: "05",
    intro: "Buying is a journey. Every step can lose it.",
    response:
      "We organize product page, catalog and checkout so the purchase keeps its thread to the end.",
    image: "/images/services/svc-ecommerce.webp",
    imageAlt: "Online store purchase from a mobile app",
    items: [
      {
        title: "Catalog",
        description: "Structure · Product page · Variants",
      },
      {
        title: "Purchase",
        description: "Cart · Payment · Confirmation",
      },
      {
        title: "Operations",
        description: "Inventory · Shipping · Journey reading",
      },
      {
        title: "Deliverables",
        description: "Stores · Checkout · Payment and stock integrations",
      },
    ],
  },
  {
    id: "seo",
    anchor: "seo",
    title: "SEO",
    headline: "Be there when someone is already searching.",
    number: "06",
    intro: "Be there when the search already has intent.",
    response:
      "We align technique, structure and content with how people actually search.",
    image: "/images/services/svc-seo.webp",
    imageAlt: "Analytics panel focused on visibility and search",
    items: [
      {
        title: "Technical",
        description: "Indexing · Speed · Crawlable structure",
      },
      {
        title: "Content",
        description: "Topic architecture · Intent pages · Clear answers",
      },
      {
        title: "Reading",
        description: "Rankings · Search–page match · What can be measured",
      },
      {
        title: "Deliverables",
        description: "Technical audit · Content architecture · Indexing base",
      },
    ],
  },
  {
    id: "marketing-digital",
    anchor: "marketing-digital",
    title: "Marketing",
    headline: "Connect with the right people.",
    number: "07",
    intro: "Campaign, site and message have to say the same thing.",
    response:
      "We define each channel’s role and connect it to a page ready to receive that attention.",
    image: "/images/services/svc-marketing.webp",
    imageAlt: "Creative studio: photo editing and campaign direction",
    items: [
      {
        title: "Strategy",
        description: "Priority · Message · Sequence",
      },
      {
        title: "Channels",
        description: "Organic · Paid · Email",
      },
      {
        title: "Reading",
        description: "Shared analytics · Ad–page continuity · What data decides",
      },
      {
        title: "Deliverables",
        description: "Campaign system · Landing pages · Shared measurement",
      },
    ],
  },
  {
    id: "inteligencia-artificial",
    anchor: "inteligencia-artificial",
    title: "Artificial intelligence",
    headline: "Expand the work without losing judgment.",
    number: "08",
    intro: "The machine expands the work. The decision stays human.",
    response:
      "We pick a concrete case, connect it to the existing flow, and leave judgment with the team.",
    image: "/images/services/svc-ia.webp",
    imageAlt: "Concept of AI systems applied to work",
    items: [
      {
        title: "Judgment",
        description: "Use case · Limits · Human review",
      },
      {
        title: "System",
        description: "Context · Data · Flow integration",
      },
      {
        title: "Interface",
        description: "How it’s asked · How it’s corrected · What gets logged",
      },
      {
        title: "Deliverables",
        description: "Assisted flows · Integrations · Operational prototypes",
      },
    ],
  },
  {
    id: "automatizacion",
    anchor: "automatizacion",
    title: "Automation",
    headline: "Less repetition. More time for what matters.",
    number: "09",
    intro: "What repeats shouldn’t fill the day.",
    response:
      "We connect systems that already exist so the repeated task leaves the calendar, with visible exceptions.",
    image: "/images/services/svc-automatizacion.webp",
    imageAlt: "Digital process optimization and automated flows",
    items: [
      {
        title: "Map",
        description: "What repeats · What must stay manual · Where it breaks",
      },
      {
        title: "Connection",
        description: "APIs · Webhooks · Current tools",
      },
      {
        title: "Control",
        description: "Logging · Alerts · Exceptions",
      },
      {
        title: "Deliverables",
        description: "Automated flows · Integrations · Alerts and logging",
      },
    ],
  },
  {
    id: "migracion-legacy",
    anchor: "migracion-legacy",
    title: "Migration & refactoring",
    headline: "Modernize without shutting the business down.",
    number: "10",
    intro: "Old code shouldn’t set the product’s pace.",
    response:
      "We modernize the system that no longer lets the product change. Logic is rewritten in parts, without shutting the business down, until the interface can keep moving.",
    image: "/images/services/svc-migracion-art.webp",
    imageAlt: "Technical diagnosis of systems in a migration process",
    items: [
      {
        title: "Diagnosis",
        description: "Monolith map · Debt and risks · What to keep",
      },
      {
        title: "Rewrite",
        description: "Business logic · Clear contracts · Data in one place",
      },
      {
        title: "Delivery",
        description: "Modern interface · Phased migration · Business stays online",
      },
      {
        title: "Deliverables",
        description: "Modernized code · Documented architecture · Cutover and deploy plan",
      },
    ],
  },
  {
    id: "mvp-rapido",
    anchor: "mvp-rapido",
    title: "Ultra-fast MVP (MaaS)",
    headline: "A first usable version, with agreed scope.",
    number: "11",
    intro: "A first usable version, with agreed scope and timeline.",
    response:
      "We build the flow that proves the idea and ship it. Timeline comes from scope, not a fixed date.",
    image: "/images/services/svc-mvp-art.webp",
    imageAlt: "Prototype planning with sticky notes on a work table",
    items: [
      {
        title: "Scope",
        description: "Critical flow · What’s in this phase · What’s out",
      },
      {
        title: "Build",
        description: "Usable interface · Written logic · Ordered data",
      },
      {
        title: "Launch",
        description: "Production deploy · Access and roles · Base to iterate",
      },
      {
        title: "Deliverables",
        description: "MVP in production · Code and repo · Next-steps guide",
      },
    ],
  },
];

export function serviceCategoriesFor(locale: Locale): ServiceCategory[] {
  return locale === "en" ? SERVICE_CATEGORIES_EN : SERVICE_CATEGORIES;
}
