// Production content guard (homepage.md §25): sample data and TODO-REAL values must never ship.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = "content/data";
const strict = process.env.CONTENT_GUARD === "strict" || process.env.VERCEL_ENV === "production";
const problems = [];

const index = readFileSync(join(dir, "index.ts"), "utf8");
for (const m of index.matchAll(/from "\.\/([\w-]+\.sample)"/g)) problems.push(`index.ts still imports ${m[1]}`);

for (const f of readdirSync(dir).filter((f) => f.endsWith(".ts") && !f.endsWith(".sample.ts"))) {
  const text = readFileSync(join(dir, f), "utf8");
  text.split("\n").forEach((line, i) => {
    if (/["']TODO-REAL["']/.test(line)) problems.push(`${f}:${i + 1} contains a TODO-REAL value`);
  });
}

if (problems.length) {
  const msg = `Content guard: ${problems.length} placeholder(s) found:\n - ${problems.join("\n - ")}`;
  if (strict) {
    console.error(`\n${msg}\n\nReplace sample data with real, approved content before a production build.`);
    process.exit(1);
  }
  console.warn(`\n[warn] ${msg}\n(Not blocking: set CONTENT_GUARD=strict or deploy with VERCEL_ENV=production to enforce.)\n`);
}
