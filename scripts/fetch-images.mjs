/**
 * Image pipeline entrypoint for Invends.
 * Source of truth: Magnific (https://www.magnific.com/) — formerly Freepik.
 * Run: node scripts/fetch-magnific-images.mjs
 * Harvest candidates first (optional): node scripts/harvest-magnific.mjs
 */
import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const script = join(dirname(fileURLToPath(import.meta.url)), "fetch-magnific-images.mjs");
const child = spawn(process.execPath, [script], { stdio: "inherit" });
child.on("exit", (code) => process.exit(code ?? 1));
