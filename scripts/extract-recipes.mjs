import fs from "node:fs";
import path from "node:path";

const md = fs.readFileSync("artifacts/cocktail-recipes.md", "utf8");
const blocks = [...md.matchAll(/```json\n([\s\S]*?)\n```/g)].map((m) => m[1]);
console.log("Found", blocks.length, "JSON blocks");

const outDir = "content/cocktails";
fs.mkdirSync(outDir, { recursive: true });

const heroMap = {
  margarita: {
    heroImage: "/images/margarita-hero.webp",
    heroAlt:
      "Engraved line illustration of a Margarita in a rocks glass with a salted rim and a lime wheel",
  },
};

for (const block of blocks) {
  const data = JSON.parse(block);
  const extra = heroMap[data.slug] || {};
  const merged = { ...data, ...extra };
  const ordered = {
    slug: merged.slug,
    name: merged.name,
    tags: merged.tags,
    tagline: merged.tagline,
    intro: merged.intro,
    ...(merged.heroImage
      ? { heroImage: merged.heroImage, heroAlt: merged.heroAlt }
      : {}),
    difficulty: merged.difficulty,
    prepTimeMinutes: merged.prepTimeMinutes,
    servings: merged.servings,
    glassware: merged.glassware,
    garnish: merged.garnish,
    ingredients: merged.ingredients,
    equipment: merged.equipment,
    steps: merged.steps,
    tips: merged.tips,
    variations: merged.variations,
    substitutions: merged.substitutions,
    flavorProfile: merged.flavorProfile,
    history: merged.history,
    relatedSlugs: merged.relatedSlugs,
    seo: merged.seo,
  };
  const file = path.join(outDir, `${data.slug}.json`);
  fs.writeFileSync(file, `${JSON.stringify(ordered, null, 2)}\n`);
  console.log("Wrote", file);
}
