import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type CoffeeEntry = CollectionEntry<"coffee">;
export { coffeeBrand, titleCaseTag } from "./coffeeBrand";

export async function getAllCoffee(): Promise<CoffeeEntry[]> {
  const all = await getCollection("coffee");
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export async function getCoffee(
  slug: string,
): Promise<CoffeeEntry | undefined> {
  return getEntry("coffee", slug);
}

export async function getRelatedCoffee(
  slugs: string[],
): Promise<CoffeeEntry[]> {
  const results: CoffeeEntry[] = [];
  for (const slug of slugs) {
    const entry = await getEntry("coffee", slug);
    if (entry) results.push(entry);
  }
  return results;
}

export function fToC(f: number): number {
  return Math.round(((f - 32) * 5) / 9);
}

export function coffeeRecipeJsonLd(data: CoffeeEntry["data"], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: data.name,
    description: data.seo.description,
    recipeCategory: "Coffee",
    recipeCuisine: "Café",
    prepTime: `PT${data.prepTimeMinutes}M`,
    recipeYield: `${data.servings} serving${data.servings === 1 ? "" : "s"}`,
    recipeIngredient: data.ingredients.map((i) => `${i.amount} ${i.item}`),
    recipeInstructions: data.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
    url,
    ...(data.heroImage
      ? { image: [new URL(data.heroImage, url).href] }
      : {}),
  };
}
