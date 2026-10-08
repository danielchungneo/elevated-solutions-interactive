import { useState } from "react";
import { scaleAmount } from "../../lib/amounts";

type Ingredient = {
  amount: string;
  item: string;
  note?: string;
};

type Props = {
  ingredients: Ingredient[];
  garnish: string[];
  equipment: string[];
  baseServings?: number;
};

const SERVING_OPTS = [1, 2, 4] as const;

export default function Ingredients({
  ingredients,
  garnish,
  equipment,
  baseServings = 1,
}: Props) {
  const [servings, setServings] = useState(1);
  const multiplier = servings / baseServings;

  return (
    <section
      aria-labelledby="ing-h"
      className="ingredients"
      style={{
        padding: "36px 16px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
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
            fontWeight: 800,
            fontSize: "1.875rem",
            lineHeight: 1.1,
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
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-muted)",
            }}
          >
            Serves
          </span>
          <div
            style={{
              display: "flex",
              border: "1.5px solid var(--slate-900)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            {SERVING_OPTS.map((n, i) => {
              const on = n === servings;
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setServings(n)}
                  style={{
                    width: 48,
                    height: 44,
                    border: 0,
                    margin: 0,
                    cursor: "pointer",
                    font: "700 17px var(--font-body)",
                    background: on ? "var(--slate-900)" : "transparent",
                    color: on ? "var(--paper-50)" : "var(--slate-900)",
                    borderRight:
                      i !== SERVING_OPTS.length - 1
                        ? "1.5px solid var(--slate-900)"
                        : undefined,
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
          padding: 0,
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid var(--paper-300)",
        }}
      >
        {ingredients.map((ing) => {
          const scaled = scaleAmount(ing.amount, multiplier);
          return (
            <li
              key={`${ing.item}-${ing.amount}`}
              style={{
                display: "grid",
                gridTemplateColumns: "88px minmax(0, 1fr)",
                columnGap: 14,
                padding: "14px 0",
                borderBottom: "1px solid var(--paper-300)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.375rem",
                    lineHeight: 1.15,
                  }}
                >
                  {scaled.amount}
                </span>
                {scaled.metric && (
                  <span style={{ fontSize: "0.8125rem", color: "var(--ink-muted)" }}>
                    {scaled.metric}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    lineHeight: 1.3,
                  }}
                >
                  {ing.item}
                </span>
                {ing.note && (
                  <span
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.45,
                      color: "var(--ink-muted)",
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "88px minmax(0, 1fr)",
          columnGap: 14,
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}
        >
          Garnish
        </span>
        <span style={{ fontSize: "1.0625rem" }}>
          {garnish
            .map((g, i) => (i === 0 ? g : g.charAt(0).toLowerCase() + g.slice(1)))
            .join(", ")}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingTop: 4,
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}
        >
          Equipment
        </span>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {equipment.map((item) => (
            <li
              key={item}
              style={{
                padding: "6px 12px",
                border: "1px solid var(--paper-400)",
                borderRadius: 4,
                fontSize: "0.9375rem",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
