/* Component IDs: every story under Components/ and Patterns/ gets one, as <component>-<variant>-<4 digits>
   (e.g. accordion-expand-4821), kept in src/component-ids.json. An ID never changes once given; new stories get
   one the next time this runs. Run with Storybook up: node scripts/component-ids.mjs [http://localhost:6009] */
import fs from "node:fs";
const SB = process.argv[2] || "http://localhost:6009";
const FILE = new URL("../src/component-ids.json", import.meta.url);
const kebab = (s) => s.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const index = await (await fetch(SB + "/index.json")).json();
const ids = fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : {};
const taken = new Set(Object.values(ids).map((x) => x.split("-").pop()));
const num = () => { let n; do n = String(1000 + Math.floor(Math.random() * 9000)); while (taken.has(n)); taken.add(n); return n; };
let added = 0;
const stories = Object.values(index.entries).filter((e) => e.type === "story" && /^(Components|Patterns)\//.test(e.title));
for (const e of stories) {
  if (ids[e.id]) continue;
  const component = kebab(e.title.split("/").pop());
  let variant = kebab(e.name);
  if (!variant || variant === component) variant = "default";
  else if (variant.startsWith(component + "-")) variant = variant.slice(component.length + 1);
  ids[e.id] = `${component}-${variant}-${num()}`;
  added++;
}
const gone = Object.keys(ids).filter((k) => !stories.some((e) => e.id === k));
const sorted = Object.fromEntries(Object.entries(ids).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(FILE, JSON.stringify(sorted, null, 2) + "\n");
console.log(`${stories.length} stories · ${added} new IDs` + (gone.length ? ` · no longer in Storybook (kept): ${gone.join(", ")}` : ""));
