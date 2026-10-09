import fs from "node:fs";
import path from "node:path";

const md = fs.readFileSync("assets/Coffee Designs/coffee-coaster-recipes.md", "utf8");
const blocks = [...md.matchAll(/```json\n([\s\S]*?)\n```/g)].map((m) =>
  JSON.parse(m[1]),
);

const ALTS = {
  espresso:
    "Engraved line illustration of an espresso in a demitasse cup on a saucer",
  americano: "Engraved line illustration of an Americano",
  cappuccino: "Engraved line illustration of a cappuccino with foam",
  latte: "Engraved line illustration of a latte in a wide cup",
  "flat-white": "Engraved line illustration of a flat white with microfoam",
  mocha: "Engraved line illustration of a mocha with chocolate and milk",
  "espresso-macchiato":
    "Engraved line illustration of an espresso macchiato with a dollop of foam",
  "iced-latte": "Engraved line illustration of an iced latte in a tall glass",
  "cold-brew": "Engraved line illustration of cold brew coffee",
  affogato:
    "Engraved line illustration of an affogato with espresso over ice cream",
  "irish-coffee": "Engraved line illustration of Irish coffee with cream",
  "vietnamese-iced-coffee":
    "Engraved line illustration of Vietnamese iced coffee with condensed milk",
};

const MILK_RE = /\b(milk|foam|microfoam|cream|half[- ]and[- ]half|condensed)\b/i;

function hasMilk(drink) {
  const blob = [
    ...drink.tags,
    ...drink.ingredients.map((i) => `${i.item} ${i.note || ""}`),
  ].join(" ");
  return MILK_RE.test(blob);
}

function findPullShotIndex(steps) {
  return steps.findIndex((s) => /pull the shot/i.test(s.title));
}

const outDir = "content/coffee";
fs.mkdirSync(outDir, { recursive: true });

for (const raw of blocks) {
  const milk = hasMilk(raw);
  const pullIdx = findPullShotIndex(raw.steps);
  const serveTemp = raw.serveTemp === "Cold" ? "Iced" : raw.serveTemp;
  const includeTimer =
    raw.slug === "espresso" ||
    (pullIdx >= 0 && raw.dialIn?.timeSeconds === "25-30");

  const ordered = {
    slug: raw.slug,
    name: raw.name,
    tags: raw.tags,
    tagline: raw.tagline,
    intro: raw.intro,
    heroImage: `/images/coffee/${raw.slug}-hero.webp`,
    heroAlt: ALTS[raw.slug] || `Engraved line illustration of ${raw.name}`,
    difficulty: raw.difficulty,
    prepTimeMinutes: raw.prepTimeMinutes,
    ...(raw.totalTimeMinutes ? { totalTimeMinutes: raw.totalTimeMinutes } : {}),
    servings: raw.servings,
    serveTemp,
    vessel: raw.vessel,
    ingredients: raw.ingredients,
    equipment: raw.equipment,
    dialIn: raw.dialIn,
    ...(includeTimer
      ? {
          timer: {
            stepIndex: pullIdx >= 0 ? pullIdx : 3,
            targetMinSeconds: 25,
            targetMaxSeconds: 30,
            scaleMaxSeconds: 40,
          },
        }
      : {}),
    steps: raw.steps,
    homeMethods: raw.homeMethods,
    tips: raw.tips,
    commonMistakes: raw.commonMistakes,
    variations: raw.variations,
    flavorProfile: raw.flavorProfile,
    ...(raw.history ? { history: raw.history } : {}),
    containsAlcohol: Boolean(raw.contains_alcohol),
    milk,
    relatedSlugs: raw.relatedSlugs,
    seo: raw.seo,
  };
  fs.writeFileSync(
    path.join(outDir, `${raw.slug}.json`),
    `${JSON.stringify(ordered, null, 2)}\n`,
  );
}
console.log(`Wrote ${blocks.length} coffee recipes`);

fs.mkdirSync("public/textures", { recursive: true });
fs.copyFileSync(
  "handoff-docs/coffee-coaster-handoff/public/textures/paper-grain.png",
  "public/textures/paper-grain.png",
);

// Heroes: run `node scripts/make-coffee-heroes.mjs`
await import("./make-coffee-heroes.mjs");
