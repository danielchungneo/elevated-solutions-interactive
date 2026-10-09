/** Client-safe coffee copy — no astro:content imports. */

export const coffeeBrand = {
  name: "Cafe",
  homeTitle: "The Cafe",
  homeIntro:
    "Twelve drinks, one coaster each. Tap yours, or pick something cozy below.",
  searchPlaceholder: "Latte, iced, milk…",
  guidedModeName: "Brew mode",
  guidedModeDoneTitle: "Enjoy.",
  heroLabel: "The same art as on your coaster",
  footer: {
    title: "Slow down and enjoy the cup.",
    note: "Most of these drinks contain caffeine. Go easy if you're sensitive.",
  },
} as const;

export function titleCaseTag(tag: string): string {
  const lower = tag.toLowerCase();
  if (lower === "créma" || lower === "crema") return "Créma";
  return lower.replace(/\b\w/g, (c) => c.toUpperCase());
}
