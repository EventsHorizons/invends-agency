import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync("app/utils/siteData.ts", "utf8");
const start = src.indexOf("export const BLOG_POSTS");
const end = src.indexOf("export const ABOUT_VALUES");
if (start < 0 || end < 0) throw new Error("markers not found");
const blogBlock = src.slice(start, end);
const getMatch = src.match(/export function getBlogPost\([\s\S]*?\n\}/);
if (!getMatch) throw new Error("getBlogPost not found");

const out = `import { BLOG_POSTS_FROM_SOCIAL } from "./blogPostsFromSocial";
import type { BlogPost } from "./blogTypes";

${blogBlock}${getMatch[0]}
`;
writeFileSync("app/utils/blogData.ts", out);

const cleaned = src
  .replace(/import \{ BLOG_POSTS_FROM_SOCIAL \} from "\.\/blogPostsFromSocial";\r?\n/, "")
  .replace(/export type \{ BlogBlock, BlogPost \} from "\.\/blogTypes";\r?\nimport type \{ BlogPost \} from "\.\/blogTypes";\r?\n/, "")
  .replace(blogBlock, "")
  .replace(/\nexport function getBlogPost\([\s\S]*?\n\}\r?\n/, "\n");

writeFileSync("app/utils/siteData.ts", cleaned);
console.log("split ok", { blogData: out.length, siteData: cleaned.length });
