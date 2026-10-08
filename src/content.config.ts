import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const cocktailSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tags: z.tuple([z.string(), z.string(), z.string()]),
  tagline: z.string(),
  intro: z.string(),
  heroImage: z.string().optional(),
  heroAlt: z.string().optional(),
  difficulty: z.enum(["Easy", "Medium", "Advanced"]),
  prepTimeMinutes: z.number().int().positive(),
  servings: z.number().int().positive(),
  glassware: z.object({
    name: z.string(),
    note: z.string().optional(),
  }),
  garnish: z.array(z.string()),
  ingredients: z.array(
    z.object({
      amount: z.string(),
      item: z.string(),
      note: z.string().optional(),
    }),
  ),
  equipment: z.array(z.string()),
  steps: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
      tip: z.string().optional(),
    }),
  ),
  tips: z.array(z.string()),
  variations: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
  substitutions: z.array(z.string()).optional(),
  flavorProfile: z.object({
    sweet: z.number().min(1).max(5),
    sour: z.number().min(1).max(5),
    bitter: z.number().min(1).max(5),
    strong: z.number().min(1).max(5),
  }),
  history: z.string().optional(),
  relatedSlugs: z.array(z.string()),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type Cocktail = z.infer<typeof cocktailSchema>;

const cocktails = defineCollection({
  loader: glob({ pattern: "*.json", base: "./content/cocktails" }),
  schema: cocktailSchema,
});

export const collections = { cocktails };
