import { z } from "astro/zod";
import platformData from "../../content/platform.json";
import { site } from "./site";

const platformSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["live", "coming-soon"]),
  href: z.string().optional(),
  countLabel: z.string().optional(),
  swatch: z.enum(["cocktail", "coffee"]).optional(),
  icon: z.enum(["glass", "bean", "book", "puzzle"]),
});

const platformSchema = z.object({
  theme: z.literal("platform"),
  brandName: z.string(),
  eyebrow: z.string(),
  tagline: z.object({
    lead: z.string(),
    accent: z.string(),
  }),
  intro: z.string(),
  heroImage: z.string(),
  heroAlt: z.string(),
  shopUrl: z.string(),
  contactUrl: z.string(),
  sections: z.array(platformSectionSchema),
  howItWorks: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
    }),
  ),
  footer: z.object({
    tagline: z.string(),
    copyright: z.string(),
  }),
});

export type PlatformSection = z.infer<typeof platformSectionSchema>;
export type Platform = z.infer<typeof platformSchema>;

export const platform: Platform = platformSchema.parse(platformData);

/** Resolve placeholder URLs from site config when content still has [PLACEHOLDER]. */
export function resolvePlatformUrl(value: string): string | undefined {
  if (!value || value.startsWith("[")) return undefined;
  return value;
}

export function platformShopUrl(): string {
  return resolvePlatformUrl(platform.shopUrl) ?? site.shopUrl;
}

export function platformContactUrl(): string | undefined {
  return resolvePlatformUrl(platform.contactUrl);
}

export function platformCopyright(): string {
  return platform.footer.copyright.replace("[YEAR]", String(site.year));
}

export function sectionCountLabel(
  index: number,
  count: number,
  countLabel = "drinks",
): string {
  const n = String(index + 1).padStart(2, "0");
  return `${n} · ${count} ${countLabel}`.toUpperCase();
}

export function sectionsStatusLabel(sections: PlatformSection[]): string {
  const live = sections.filter((s) => s.status === "live").length;
  const coming = sections.filter((s) => s.status === "coming-soon").length;
  return `${live} LIVE · ${coming} COMING`;
}
