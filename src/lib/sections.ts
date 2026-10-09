export type SectionIcon = "cocktail" | "coffee" | "monogram";

export type SiteSection = {
  id: string;
  name: string;
  blurb: string;
  href?: string;
  status: "live" | "coming-soon";
  icon: SectionIcon;
  /** Fallback letter when icon is "monogram" */
  initial: string;
};

export const sections: SiteSection[] = [
  {
    id: "cocktails",
    name: "Cocktails",
    blurb: "NFC coaster recipes for classic drinks",
    href: "/cocktails",
    status: "live",
    icon: "cocktail",
    initial: "C",
  },
  {
    id: "coffee",
    name: "Coffee",
    blurb: "Brew guides and NFC coffee coasters",
    href: "/coffee",
    status: "live",
    icon: "coffee",
    initial: "C",
  },
  {
    id: "prayer",
    name: "Prayer",
    blurb: "Devotional cards and daily prompts",
    status: "coming-soon",
    icon: "monogram",
    initial: "P",
  },
  {
    id: "puzzles",
    name: "Puzzles",
    blurb: "Interactive puzzles linked from physical pieces",
    status: "coming-soon",
    icon: "monogram",
    initial: "P",
  },
];
