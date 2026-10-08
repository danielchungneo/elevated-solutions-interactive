export type SiteSection = {
  id: string;
  name: string;
  blurb: string;
  href?: string;
  status: "live" | "coming-soon";
  /** Monogram shown when there is no section art yet */
  initial: string;
};

export const sections: SiteSection[] = [
  {
    id: "cocktails",
    name: "Cocktails",
    blurb: "NFC coaster recipes for classic drinks",
    href: "/cocktails",
    status: "live",
    initial: "C",
  },
  {
    id: "coffee",
    name: "Coffee",
    blurb: "Brew guides and NFC coffee sets",
    status: "coming-soon",
    initial: "C",
  },
  {
    id: "prayer",
    name: "Prayer",
    blurb: "Devotional cards and daily prompts",
    status: "coming-soon",
    initial: "P",
  },
  {
    id: "puzzles",
    name: "Puzzles",
    blurb: "Interactive puzzles linked from physical pieces",
    status: "coming-soon",
    initial: "P",
  },
];
