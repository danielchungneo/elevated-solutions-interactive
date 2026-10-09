/** Scale coffee ingredient amounts. Handles g / oz / ml / cups. */

const NUMERIC_AMOUNT =
  /^(\d+(?:\.\d+)?|\d+\/\d+|½|¼|¾)\s*(oz|g|ml|cups?|tbsp|tsp)?$/i;

function parseNumber(raw: string): number | null {
  const t = raw.trim();
  if (t === "½") return 0.5;
  if (t === "¼") return 0.25;
  if (t === "¾") return 0.75;
  if (t.includes("/")) {
    const [a, b] = t.split("/").map(Number);
    if (!a || !b) return null;
    return a / b;
  }
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

function formatQty(n: number): string {
  if (Math.abs(n - 0.5) < 1e-9) return "½";
  if (Math.abs(n - 0.25) < 1e-9) return "¼";
  if (Math.abs(n - 0.75) < 1e-9) return "¾";
  if (Number.isInteger(n)) return String(n);
  return String(Math.round(n * 100) / 100);
}

export type ScaledCoffeeAmount = {
  amount: string;
  metric: string | null;
  scalable: boolean;
};

export function scaleCoffeeAmount(
  amount: string,
  multiplier: number,
): ScaledCoffeeAmount {
  const trimmed = amount.trim();
  const match = trimmed.match(NUMERIC_AMOUNT);

  if (!match) {
    return {
      amount: trimmed,
      metric: multiplier > 1 ? `×${multiplier}` : "1 serving",
      scalable: false,
    };
  }

  const qty = parseNumber(match[1]!);
  const unit = (match[2] || "").toLowerCase();
  if (qty == null) {
    return { amount: trimmed, metric: null, scalable: false };
  }

  const scaled = qty * multiplier;
  let unitLabel = unit;
  if (unit.startsWith("cup")) {
    unitLabel = scaled === 1 ? "cup" : "cups";
  }

  const display = unitLabel
    ? `${formatQty(scaled)} ${unitLabel}`
    : formatQty(scaled);

  let metric: string | null = null;
  if (unit === "oz") {
    metric = `${Math.round(scaled * 30)} ml`;
  } else if (unit === "g") {
    metric = multiplier > 1 ? `${formatQty(scaled)} g total` : "dose";
  } else if (multiplier > 1) {
    metric = `×${multiplier}`;
  }

  return { amount: display, metric, scalable: true };
}
