export type TipKind = "pro" | "mistake";

export type SplitTip = {
  kind: TipKind;
  text: string;
};

/** Split tips[] on "Pro tip:" / "Common mistake:" prefixes and strip them. */
export function splitTips(tips: string[]): {
  proTips: string[];
  mistakes: string[];
} {
  const proTips: string[] = [];
  const mistakes: string[] = [];

  for (const tip of tips) {
    const pro = tip.match(/^Pro tip:\s*(.*)$/i);
    if (pro) {
      proTips.push(pro[1]!);
      continue;
    }
    const mistake = tip.match(/^Common mistake:\s*(.*)$/i);
    if (mistake) {
      mistakes.push(mistake[1]!);
      continue;
    }
    proTips.push(tip);
  }

  return { proTips, mistakes };
}

/** Bold the first sentence of a common-mistake string when it ends with a period. */
export function mistakeLead(text: string): { lead: string; rest: string } {
  const idx = text.indexOf(". ");
  if (idx === -1) return { lead: text, rest: "" };
  return { lead: text.slice(0, idx + 1), rest: text.slice(idx + 2) };
}
