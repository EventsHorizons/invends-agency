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
    headline: "Web people get.",
    number: "01",
    intro:
      "If your site doesn’t clearly explain what you do, or the message gets lost on mobile, we can help. We design so visitors know what you offer and how to reach you.",
    response:
      "We start from your business and who you speak to. Then we shape structure and interface—calmly, with judgment, without extra noise.",
    image: "/images/services/svc-diseno-web.webp",
    imageAlt: "Web layout and interface architecture as a device prototype",
    items: [
      {
        title: "Structure",
        description:
          "Page map · Message priority · Path to contact · Real responsive behavior",
      },
      {
        title: "Interface",
        description:
          "Type and composition · Clear states · Visible CTAs · Frictionless reading",
      },
      {
        title: "System",
        description:
          "Reusable components · Brand tokens · Consistency across home, service and landing",
      },
      {
        title: "Deliverables",
        description:
          "Site or landing ready for build · UI system · Navigable prototype aimed at conversion",
      },
    ],
  },
  {
    id: "branding",
    anchor: "branding",
    title: "Branding",
    headline: "Usable identity.",
    number: "02",
    intro:
      "When the brand changes depending on who made the last file, it’s hard to feel recognized. We help you define voice, symbol and simple rules for everyday use—on web, proposals and social.",
    response:
      "We work with you so the identity feels yours and can be applied without reinventing it every week.",
    image: "/images/services/svc-branding.webp",
    imageAlt: "Stationery system and corporate identity in an editorial layout",
    items: [
      {
        title: "Position",
        description:
          "Territory and differentiation · Voice · What you promise (and what you don’t)",
      },
      {
        title: "Language",
        description:
          "Symbol and type · Color and rhythm · Relationship between graphic pieces",
      },
      {
        title: "System",
        description:
          "Usable guidelines · Art direction · Application on web and campaigns",
      },
      {
        title: "Deliverables",
        description:
          "Visual identity · Brand system · Usage criteria for your team",
      },
    ],
  },
  {
    id: "desarrollo-web",
    anchor: "desarrollo-web",
    title: "Web development",
    headline: "A base that holds.",
    number: "03",
    intro:
      "Beyond “looking good”: we care that it loads well, forms get delivered, and you can change things without starting over. We build with that peace of mind.",
    response:
      "We turn design into a solid base, explain decisions in plain language, and leave the project ready to grow when you are.",
    image: "/images/services/svc-desarrollo-web.webp",
    imageAlt: "Responsive site concept: web layouts on a device",
    items: [
      {
        title: "Architecture",
        description:
          "Solid frontend · Editable content · Clear environments and deploy",
      },
      {
        title: "Performance",
        description:
          "Controlled weight · Efficient render · Basic measurable accessibility",
      },
      {
        title: "Integration",
        description:
          "APIs · Forms · CRM, email and tools you already use",
      },
      {
        title: "Deliverables",
        description:
          "Production site · Technical docs · Base ready to iterate",
      },
    ],
  },
  {
    id: "desarrollo-apps",
    anchor: "desarrollo-apps",
    title: "Applications",
    headline: "Usable product.",
    number: "04",
    intro:
      "If you have an idea for a tool, dashboard or internal flow, we help bring it down to something usable. We start with what’s essential—what people need to open again and again.",
    response:
      "We define what’s in the first version and what can wait—so the project isn’t loaded with features you don’t need yet.",
    image: "/images/services/svc-aplicaciones.webp",
    imageAlt: "Mobile product screen with application interface",
    items: [
      {
        title: "Product",
        description:
          "Phased scope · Critical flows · “Ready to use” criteria",
      },
      {
        title: "Experience",
        description:
          "Clear interaction · Empty and error states · Continuity across sessions",
      },
      {
        title: "Technology",
        description:
          "Data model · Roles and access · Required integrations",
      },
      {
        title: "Deliverables",
        description:
          "Usable app or dashboard · Functional prototype · Next-steps roadmap",
      },
    ],
  },
  {
    id: "ecommerce",
    anchor: "ecommerce",
    title: "E-commerce",
    headline: "Frictionless purchase.",
    number: "05",
    intro:
      "We know every cart step can lose a sale. We help organize catalog, product pages and payment so the experience is clear—also for whoever runs the store.",
    response:
      "We review how you sell today and what gets in the way. Then we carefully design and connect the purchase journey.",
    image: "/images/services/svc-ecommerce.webp",
    imageAlt: "Online store purchase from a mobile app",
    items: [
      {
        title: "Catalog",
        description:
          "Product structure · Clear product pages · Variants and search",
      },
      {
        title: "Purchase",
        description:
          "Stable cart · Reliable payment · Confirmation and follow-up",
      },
      {
        title: "Operations",
        description:
          "Inventory · Shipping · Purchase-funnel reading",
      },
      {
        title: "Deliverables",
        description:
          "Live store · Integrated checkout · Payment and stock connection",
      },
    ],
  },
  {
    id: "seo",
    anchor: "seo",
    title: "SEO",
    headline: "Visibility with method.",
    number: "06",
    intro:
      "Ranking isn’t magic or “guaranteed #1” promises. It’s technical order, useful content and patience. We help you see what can improve—and where to start.",
    response:
      "We review your site against how your audience actually searches and propose concrete steps—without the smoke.",
    image: "/images/services/svc-seo.webp",
    imageAlt: "Analytics panel focused on visibility and search",
    items: [
      {
        title: "Technical",
        description:
          "Indexing · Speed · Crawlable structure · Structured data when appropriate",
      },
      {
        title: "Content",
        description:
          "Topic architecture · Search intent · Clear answer per page",
      },
      {
        title: "Reading",
        description:
          "Search Console · Query–page match · Improvement priorities",
      },
      {
        title: "Deliverables",
        description:
          "Technical audit · Content map · Measurable implementation plan",
      },
    ],
  },
  {
    id: "marketing-digital",
    anchor: "marketing-digital",
    title: "Marketing",
    headline: "Message with a destination.",
    number: "07",
    intro:
      "If you feel you post a lot and converse little, we can help align channel, message and page. The idea is that whoever arrives knows what to do next—without artificial pressure.",
    response:
      "We start by understanding who you want to speak to. Then we design a kind sequence: what to say, where, and how to see if it’s working.",
    image: "/images/services/svc-marketing.webp",
    imageAlt: "Creative studio: photo editing and campaign direction",
    items: [
      {
        title: "Strategy",
        description:
          "Priority audience · Promise · Contact sequence",
      },
      {
        title: "Channels",
        description:
          "Organic · Paid · Email · Investment criteria by goal",
      },
      {
        title: "Reading",
        description:
          "Shared analytics · Ad–page continuity · Decisions with data",
      },
      {
        title: "Deliverables",
        description:
          "Campaign system · Aligned landing · Lead and contact measurement",
      },
    ],
  },
  {
    id: "inteligencia-artificial",
    anchor: "inteligencia-artificial",
    title: "Artificial intelligence",
    headline: "AI with limits.",
    number: "08",
    intro:
      "This isn’t about “adding AI because everyone does.” We look for a concrete part of your day where it truly helps, with clear limits and human review.",
    response:
      "We pick a small flow, connect it carefully, and leave the final decision with your team.",
    image: "/images/services/svc-ia.webp",
    imageAlt: "Concept of AI systems applied to work",
    items: [
      {
        title: "Judgment",
        description:
          "Priority use case · Limits · Human review points",
      },
      {
        title: "System",
        description:
          "Context and data · Flow integration · Basic security",
      },
      {
        title: "Interface",
        description:
          "How it’s asked · How it’s corrected · What gets logged",
      },
      {
        title: "Deliverables",
        description:
          "Assisted operational flow · Integration · Prototype with team handoff",
      },
    ],
  },
  {
    id: "automatizacion",
    anchor: "automatizacion",
    title: "Automation",
    headline: "Less repetition.",
    number: "09",
    intro:
      "If your team loses hours on the same tasks every week, we can map the process and automate what makes sense—keeping exceptions visible.",
    response:
      "First we understand how you work today. Then we connect tools calmly, so automation helps instead of complicating things.",
    image: "/images/services/svc-automatizacion.webp",
    imageAlt: "Digital process optimization and automated flows",
    items: [
      {
        title: "Map",
        description:
          "What repeats · What must stay manual · Where it breaks today",
      },
      {
        title: "Connection",
        description:
          "APIs · Webhooks · Current tools without replacing the whole stack",
      },
      {
        title: "Control",
        description:
          "Logging · Alerts · Exceptions the team can handle",
      },
      {
        title: "Deliverables",
        description:
          "Flows in production · Integrations · Operations docs",
      },
    ],
  },
  {
    id: "migracion-legacy",
    anchor: "migracion-legacy",
    title: "Migration & refactoring",
    headline: "Modernize in phases.",
    number: "10",
    intro:
      "An old system doesn’t have to hold your business forever. We help diagnose what to modernize and move in phases—without unnecessary drama.",
    response:
      "We’re clear about risks and priorities. We migrate in phases, at a pace your operations can sustain.",
    image: "/images/services/svc-migracion-art.webp",
    imageAlt: "Technical diagnosis of systems in a migration process",
    items: [
      {
        title: "Diagnosis",
        description:
          "System map · Risks · What to keep and what to replace",
      },
      {
        title: "Rewrite",
        description:
          "Business logic · Clear contracts · Ordered data",
      },
      {
        title: "Delivery",
        description:
          "Modern interface · Phased cutovers · Operational continuity",
      },
      {
        title: "Deliverables",
        description:
          "Modernized code · Documented architecture · Cutover and deploy plan",
      },
    ],
  },
  {
    id: "mvp-rapido",
    anchor: "mvp-rapido",
    title: "Ultra-fast MVP (MaaS)",
    headline: "First usable version.",
    number: "11",
    intro:
      "If you need to try something soon—without building the whole product—we help define the minimum that proves value and publish it with honest scope.",
    response:
      "We clarify the idea, agree on what’s in and out, and build a first version you can learn from in real use.",
    image: "/images/services/svc-mvp-art.webp",
    imageAlt: "Prototype planning with sticky notes on a work table",
    items: [
      {
        title: "Scope",
        description:
          "Critical flow · What’s in this phase · What’s explicitly out",
      },
      {
        title: "Build",
        description:
          "Usable interface · Essential logic · Data ready for the next cycle",
      },
      {
        title: "Launch",
        description:
          "Production deploy · Access · Criteria for the next iteration",
      },
      {
        title: "Deliverables",
        description:
          "Published MVP · Repository · Next-steps guide",
      },
    ],
  },
];

export function serviceCategoriesFor(locale: Locale): ServiceCategory[] {
  return locale === "en" ? SERVICE_CATEGORIES_EN : SERVICE_CATEGORIES;
}
