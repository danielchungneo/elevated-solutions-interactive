import { useMemo, useState } from "react";

export type LibraryDrink = {
  slug: string;
  name: string;
  tags: [string, string, string];
  heroImage?: string;
  spirit: string;
};

type Props = {
  drinks: LibraryDrink[];
  spirits: string[];
};

export default function CocktailLibrary({ drinks, spirits }: Props) {
  const [spirit, setSpirit] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return drinks
      .filter((d) => spirit === "All" || d.spirit === spirit)
      .filter(
        (d) =>
          !q ||
          `${d.name} ${d.tags.join(" ")}`.toLowerCase().includes(q),
      );
  }, [drinks, spirit, query]);

  const chips = ["All", ...spirits];

  return (
    <>
      <section
        aria-labelledby="home-h"
        style={{
          background: "var(--slate-800)",
          color: "var(--paper-50)",
          padding: "28px 16px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: 120,
            color: "var(--paper-50)",
          }}
        >
          <span style={{ flex: 1, height: 1, background: "currentColor" }} />
          <span
            style={{
              width: 6,
              height: 6,
              background: "var(--accent)",
              transform: "rotate(45deg)",
            }}
          />
          <span style={{ flex: 1, height: 1, background: "currentColor" }} />
        </div>
        <h1
          id="home-h"
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "2.75rem",
            lineHeight: 1.02,
            textTransform: "uppercase",
          }}
        >
          The Cocktail Library
        </h1>
        <p style={{ margin: 0, fontSize: "1.0625rem", color: "#E4DED1" }}>
          Tap a coaster, or pick a drink below.
        </p>
        <label
          htmlFor="q"
          style={{
            marginTop: 6,
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--on-dark-muted)",
          }}
        >
          Search cocktails
        </label>
        <div style={{ position: "relative" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16191B"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            style={{ position: "absolute", left: 14, top: 16 }}
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" />
          </svg>
          <input
            id="q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Margarita, gin, citrus…"
            style={{
              width: "100%",
              boxSizing: "border-box",
              height: 52,
              padding: "0 14px 0 44px",
              border: 0,
              borderRadius: 4,
              background: "var(--paper-50)",
              color: "var(--slate-900)",
              font: "400 17px var(--font-body)",
            }}
          />
        </div>
      </section>

      <main style={{ display: "flex", flexDirection: "column" }}>
        <div
          role="group"
          aria-label="Filter by spirit"
          style={{
            padding: "16px 16px 4px",
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {chips.map((label) => {
            const on = label === spirit;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => setSpirit(label)}
                style={{
                  minHeight: 44,
                  padding: "0 16px",
                  borderRadius: 4,
                  cursor: "pointer",
                  font: "600 15px var(--font-body)",
                  border: "1.5px solid var(--slate-900)",
                  background: on ? "var(--slate-900)" : "transparent",
                  color: on ? "var(--paper-50)" : "var(--slate-900)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <p
          style={{
            margin: 0,
            padding: "12px 16px 0",
            fontSize: "0.8125rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}
        >
          {filtered.length === 1
            ? "1 cocktail"
            : `${filtered.length} cocktails`}
        </p>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "8px 16px 32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {filtered.map((d) => (
            <li
              key={d.slug}
              style={{ borderBottom: "1px solid var(--paper-300)" }}
            >
              <a
                href={`/cocktails/${d.slug}`}
                style={{
                  padding: "12px 0",
                  display: "grid",
                  gridTemplateColumns: "88px minmax(0, 1fr) 24px",
                  columnGap: 14,
                  alignItems: "center",
                  color: "var(--slate-900)",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: 88,
                    height: 88,
                    background: "var(--slate-800)",
                    borderRadius: 4,
                    position: "relative",
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
                      width={80}
                      height={80}
                      style={{ width: 80, height: 80, objectFit: "contain" }}
                    />
                  ) : (
                    <>
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: 6,
                          border: "1px solid var(--slate-500)",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          fontSize: 40,
                          color: "#E4DED1",
                        }}
                      >
                        {d.name.charAt(0)}
                      </span>
                    </>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.375rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {d.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--ink-muted)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {d.tags.join(" · ")}
                  </span>
                </div>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--slate-900)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
