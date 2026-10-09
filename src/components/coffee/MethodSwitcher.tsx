import { useState } from "react";

type HomeMethod = {
  method: string;
  note: string;
};

type Props = {
  homeMethods: HomeMethod[];
  machineNote?: string;
};

const MACHINE_DEFAULT =
  "Use an espresso machine with a double-basket portafilter. Dial in dose, yield and time, then build the drink from a fresh shot.";

function pillFacts(method: string): string[] {
  const key = method.toLowerCase();
  if (key.includes("moka")) {
    return ["Fine-medium grind", "Medium heat", "Stop at sputter"];
  }
  if (key.includes("aeropress")) {
    return ["Fine grind", "Small water volume", "Firm press"];
  }
  return [];
}

export default function MethodSwitcher({
  homeMethods,
  machineNote = MACHINE_DEFAULT,
}: Props) {
  const tabs = [
    { id: "machine", label: "Machine", note: machineNote, facts: [] as string[] },
    ...homeMethods
      .filter((m) => !/strong brewed/i.test(m.method))
      .slice(0, 2)
      .map((m) => ({
        id: m.method.toLowerCase().replace(/\s+/g, "-"),
        label: m.method.replace(/\s*\(.*\)$/, ""),
        note: m.note,
        facts: pillFacts(m.method),
      })),
  ];

  const extras = homeMethods.filter((m) => /strong brewed/i.test(m.method));
  const [active, setActive] = useState(tabs[0]!.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0]!;

  return (
    <section
      aria-labelledby="method-switch-h"
      style={{
        padding: "40px 16px 0",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <h2
        id="method-switch-h"
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.875rem",
          lineHeight: 1.15,
          fontVariationSettings: '"SOFT" 100',
        }}
      >
        How to brew it
      </h2>

      <div
        role="tablist"
        aria-label="Brew method"
        style={{
          display: "flex",
          gap: 4,
          padding: 4,
          background: "var(--color-surface-2)",
          borderRadius: 999,
        }}
      >
        {tabs.map((tab) => {
          const on = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={on}
              aria-controls={`panel-${tab.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(tab.id)}
              style={{
                flex: 1,
                minHeight: 44,
                border: 0,
                borderRadius: 999,
                cursor: "pointer",
                font: "800 14px var(--font-body)",
                background: on ? "var(--color-ink)" : "transparent",
                color: on ? "var(--color-surface)" : "var(--color-ink)",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${current.id}`}
        aria-labelledby={`tab-${current.id}`}
        style={{
          padding: "18px 16px",
          background: "var(--color-surface)",
          borderRadius: 20,
          boxShadow: "var(--shadow-card)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p style={{ margin: 0, lineHeight: 1.6 }}>{current.note}</p>
        {current.facts.length > 0 && (
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
            {current.facts.map((f) => (
              <li
                key={f}
                style={{
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "var(--color-secondary-soft)",
                  color: "var(--color-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {extras.map((e) => (
        <p
          key={e.method}
          style={{
            margin: 0,
            padding: "12px 16px",
            background: "var(--color-surface-2)",
            borderRadius: 16,
            fontSize: "0.9375rem",
            lineHeight: 1.5,
            color: "var(--color-ink-muted)",
          }}
        >
          <strong style={{ color: "var(--color-ink)" }}>{e.method}. </strong>
          {e.note}
        </p>
      ))}
    </section>
  );
}
