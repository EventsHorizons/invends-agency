/** Append one Magnific search harvest from stdin JSON to magnific-picks.json */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)));
const path = join(root, "magnific-picks.json");
const key = process.argv[2];
const payload = JSON.parse(process.argv[3] || "{}");
const data = JSON.parse(readFileSync(path, "utf8"));
data[key] = payload;
writeFileSync(path, JSON.stringify(data, null, 2));
console.log("saved", key, Array.isArray(payload) ? payload.length : 0);
