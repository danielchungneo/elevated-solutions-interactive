import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type CocktailEntry = CollectionEntry<"cocktails">;

/** First tag is treated as the spirit filter chip on the home page. */
export function spiritFromTags(tags: [string, string, string]): string {
  return tags[0];
}

export async function getAllCocktails(): Promise<CocktailEntry[]> {
  const all = await getCollection("cocktails");
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export async function getCocktail(slug: string): Promise<CocktailEntry | undefined> {
  return getEntry("cocktails", slug);
}

export async function getRelated(
  slugs: string[],
): Promise<CocktailEntry[]> {
  const results: CocktailEntry[] = [];
  for (const slug of slugs) {
    const entry = await getEntry("cocktails", slug);
    if (entry) results.push(entry);
  }
  return results;
}

export function recipeJsonLd(data: CocktailEntry["data"], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: data.name,
    description: data.seo.description,
    recipeCategory: "Cocktail",
    recipeCuisine: "Mixed drink",
    prepTime: `PT${data.prepTimeMinutes}M`,
    recipeYield: `${data.servings} serving${data.servings === 1 ? "" : "s"}`,
    recipeIngredient: data.ingredients.map(
      (i) => `${i.amount} ${i.item}`,
    ),
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
