import { useState } from "react";
import { scaleCoffeeAmount } from "../../lib/coffeeAmounts";

type Ingredient = {
  amount: string;
  item: string;
  note?: string;
};

type Props = {
  ingredients: Ingredient[];
  baseServings?: number;
};

const SERVING_OPTS = [1, 2, 4] as const;

export default function CoffeeIngredients({
  ingredients,
  baseServings = 1,
}: Props) {
  const [servings, setServings] = useState(1);
  const multiplier = servings / baseServings;

  return (
    <section
      aria-labelledby="ing-h"
      style={{
        padding: "36px 16px 0",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <h2
          id="ing-h"
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.875rem",
            lineHeight: 1.15,
            fontVariationSettings: '"SOFT" 100',
          }}
        >
          Ingredients
        </h2>
        <div
          role="group"
          aria-label="Servings"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "var(--color-ink-muted)",
            }}
          >
            Serves
          </span>
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              background: "var(--color-surface-2)",
              borderRadius: 999,
            }}
          >
            {SERVING_OPTS.map((n) => {
              const on = n === servings;
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setServings(n)}
                  style={{
                    minWidth: 44,
                    height: 40,
                    border: 0,
                    borderRadius: 999,
                    cursor: "pointer",
                    font: "800 15px var(--font-body)",
                    background: on ? "var(--color-ink)" : "transparent",
                    color: on ? "var(--color-surface)" : "var(--color-ink)",
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: "4px 16px",
          background: "var(--color-surface)",
          borderRadius: 20,
          boxShadow: "var(--shadow-card)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {ingredients.map((ing, i) => {
          const scaled = scaleCoffeeAmount(ing.amount, multiplier);
          return (
            <li
              key={`${ing.item}-${ing.amount}`}
              style={{
                display: "grid",
                gridTemplateColumns: "88px minmax(0, 1fr)",
                columnGap: 14,
                padding: "14px 0",
                borderBottom:
                  i < ingredients.length - 1
                    ? "1px solid var(--color-rule)"
                    : undefined,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    lineHeight: 1.15,
                    color: "var(--color-accent-ink)",
                    fontVariationSettings: '"SOFT" 100',
                  }}
                >
                  {scaled.amount}
                </span>
                {scaled.metric && (
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    {scaled.metric}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: "1.125rem",
                    lineHeight: 1.35,
                  }}
                >
                  {ing.item}
                </span>
                {ing.note && (
                  <span
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.5,
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    {ing.note}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {servings > 1 && (
        <p
          style={{
            margin: 0,
            padding: "12px 16px",
            background: "var(--color-secondary-soft)",
            color: "var(--color-ink)",
            borderRadius: 16,
            fontSize: "0.9375rem",
            lineHeight: 1.5,
          }}
        >
          Pull {servings} separate double shots. One basket holds one 18 g dose.
        </p>
      )}
    </section>
  );
}
