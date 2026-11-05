import {
  mkdirSync,
  writeFileSync,
  readFileSync,
  existsSync,
  readdirSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { DATA_DIR, REPORTS_DIR } from "./config.mjs";

export function ensureDirs() {
  for (const dir of [DATA_DIR, REPORTS_DIR, resolve(DATA_DIR, "runs")]) {
    mkdirSync(dir, { recursive: true });
  }
}

export function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

export function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return path;
}

export function readJson(path, fallback = null) {
  if (!existsSync(path)) return fallback;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return fallback;
  }
}

export function appendRunLog(entry) {
  ensureDirs();
  const logPath = resolve(DATA_DIR, "run-log.jsonl");
  writeFileSync(logPath, `${JSON.stringify(entry)}\n`, {
    flag: "a",
    encoding: "utf8",
  });
  return logPath;
}

export function latestReport(prefix) {
  ensureDirs();
  const files = readdirSync(REPORTS_DIR)
    .filter((f) => f.startsWith(prefix) && f.endsWith(".json"))
    .sort()
    .reverse();
  if (!files.length) return null;
  return readJson(resolve(REPORTS_DIR, files[0]));
}

export function writeMarkdownReport(name, markdown) {
  ensureDirs();
  const path = resolve(REPORTS_DIR, name);
  writeFileSync(path, markdown, "utf8");
  return path;
}

export function updateState(patch) {
  ensureDirs();
  const path = resolve(DATA_DIR, "state.json");
  const prev = readJson(path, {});
  const next = {
    ...prev,
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  writeJson(path, next);
  return next;
}
