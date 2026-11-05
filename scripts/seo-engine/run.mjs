#!/usr/bin/env node
/**
 * Invends Autonomous SEO Engine entrypoint.
 * Usage: node scripts/seo-engine/run.mjs [daily|weekly|monthly|all]
 */
import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const mode = (process.argv[2] || "daily").toLowerCase();

function run(script) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, [resolve(here, script)], {
      stdio: "inherit",
      env: process.env,
    });
    child.on("exit", (code) => {
      if (code && code !== 2) reject(new Error(`${script} exited ${code}`));
      else resolvePromise(code || 0);
    });
  });
}

async function main() {
  const map = {
    daily: ["daily.mjs"],
    weekly: ["weekly.mjs"],
    monthly: ["monthly.mjs"],
    all: ["daily.mjs", "weekly.mjs", "monthly.mjs"],
  };
  const scripts = map[mode];
  if (!scripts) {
    console.error("Usage: node scripts/seo-engine/run.mjs [daily|weekly|monthly|all]");
    process.exit(1);
  }
  let worst = 0;
  for (const s of scripts) {
    console.log(`\n=== SEO ENGINE · ${s} ===\n`);
    const code = await run(s);
    worst = Math.max(worst, code);
  }
  process.exit(worst);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
