import { useMemo, useState } from "react";
import { coffeeBrand } from "../../lib/coffeeBrand";

export type CoffeeLibraryDrink = {
  slug: string;
  name: string;
  meta: string;
  serveTemp: "Hot" | "Iced";
  milk: boolean;
  heroImage?: string;
};

type Props = {
  drinks: CoffeeLibraryDrink[];
};

const FILTERS = ["All", "Hot", "Iced", "With milk"] as const;

export default function CoffeeLibrary({ drinks }: Props) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return drinks
      .filter((d) => {
        if (filter === "All") return true;
        if (filter === "With milk") return d.milk;
        return d.serveTemp === filter;
      })
      .filter(
        (d) =>
          !q ||
          `${d.name} ${d.meta} ${d.serveTemp}`.toLowerCase().includes(q),
      );
  }, [drinks, filter, query]);

  return (
    <>
      <section
        aria-labelledby="home-h"
        style={{
          padding: "16px 16px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg
            width="40"
            height="28"
            viewBox="0 0 40 28"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <path d="M12 26c-4-4 4-7 0-11s4-7 0-11" />
            <path d="M20 26c-4-4 4-7 0-11s4-7 0-11" />
            <path d="M28 26c-4-4 4-7 0-11s4-7 0-11" />
          </svg>
          <h1
            id="home-h"
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "2.75rem",
              lineHeight: 1.05,
              fontVariationSettings: '"SOFT" 100',
            }}
          >
            {coffeeBrand.homeTitle}
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: "1.125rem", color: "#4A382C" }}>
          {coffeeBrand.homeIntro}
        </p>
        <label
          htmlFor="q"
          style={{ marginTop: 4, fontSize: "0.875rem", fontWeight: 800 }}
        >
          Search drinks
        </label>
        <div style={{ position: "relative" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-ink-muted)"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ position: "absolute", left: 16, top: 16 }}
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
          <input
            id="q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={coffeeBrand.searchPlaceholder}
            style={{
              width: "100%",
              boxSizing: "border-box",
              height: 52,
              padding: "0 16px 0 46px",
              border: "1.5px solid var(--color-rule)",
              borderRadius: 999,
              background: "var(--color-surface)",
              color: "var(--color-ink)",
              font: "500 17px var(--font-body)",
              boxShadow: "0 1px 2px rgba(43,29,20,0.06)",
            }}
          />
        </div>
        <div
          role="group"
          aria-label="Filter"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            paddingTop: 4,
          }}
        >
          {FILTERS.map((label) => {
            const on = label === filter;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(label)}
                style={{
                  minHeight: 44,
                  padding: "0 18px",
                  borderRadius: 999,
                  cursor: "pointer",
                  font: "800 15px var(--font-body)",
                  border: on ? 0 : "1.5px solid var(--color-rule)",
                  background: on ? "var(--color-ink)" : "var(--color-surface)",
                  color: on ? "var(--color-surface)" : "var(--color-ink)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <main
        style={{
          padding: "8px 16px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            fontWeight: 800,
            color: "var(--color-ink-muted)",
          }}
          aria-live="polite"
        >
          {filtered.length} drink{filtered.length === 1 ? "" : "s"}
        </p>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
          }}
        >
          {filtered.map((d) => (
            <li key={d.slug}>
              <a
                href={`/coffee/${d.slug}`}
                style={{
                  height: "100%",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  padding: 10,
                  background: "var(--color-surface)",
                  borderRadius: 20,
                  boxShadow: "var(--shadow-card)",
                  color: "var(--color-ink)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    aspectRatio: "1 / 1",
                    borderRadius: 14,
                    /* Match hero WebP cream so the tile doesn't frame the art. */
                    background: "#fbf6ec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {d.heroImage ? (
                    <img
                      src={d.heroImage}
                      alt=""
                      width={148}
                      height={132}
                      loading="lazy"
                      style={{
                        width: "90%",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: 10,
                        mixBlendMode: "multiply",
                      }}
                    />
                  ) : (
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <ellipse
                        cx="12"
                        cy="12"
                        rx="6.5"
                        ry="9"
                        transform="rotate(35 12 12)"
                      />
                      <path d="M8.2 17.5c1.5-2.5 1.2-4.6 2.9-6.3 1.6-1.6 3.3-2.3 4.7-5" />
                    </svg>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    padding: "0 4px 4px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.1875rem",
                      lineHeight: 1.2,
                      fontVariationSettings: '"SOFT" 100',
                    }}
                  >
                    {d.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--color-ink-muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {d.meta}
                  </span>
                  <span
                    style={{
                      alignSelf: "flex-start",
                      marginTop: 2,
                      padding: "2px 10px",
                      borderRadius: 999,
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      background:
                        d.serveTemp === "Iced"
                          ? "var(--color-secondary-soft)"
                          : "var(--color-hot-soft)",
                      color:
                        d.serveTemp === "Iced"
                          ? "var(--color-secondary)"
                          : "var(--color-hot-ink)",
                    }}
                  >
                    {d.serveTemp}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
