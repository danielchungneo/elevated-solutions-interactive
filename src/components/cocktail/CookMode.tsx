import { useEffect, useState } from "react";

type Step = {
  title: string;
  body: string;
  tip?: string;
};

type Ingredient = {
  amount: string;
  item: string;
};

type Props = {
  name: string;
  slug: string;
  steps: Step[];
  ingredients: Ingredient[];
  garnish: string[];
  initialStep?: number;
};

function clampStep(n: number, max: number) {
  return Math.min(Math.max(n, 0), max);
}

export default function CookMode({
  name,
  slug,
  steps,
  ingredients,
  garnish,
  initialStep = 0,
}: Props) {
  const [index, setIndex] = useState(() =>
    clampStep(initialStep, steps.length - 1),
  );
  const [done, setDone] = useState(false);
  const [showIng, setShowIng] = useState(false);
  const [wakeSupported, setWakeSupported] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("step");
    if (!raw) return;
    const n = Number.parseInt(raw, 10);
    if (Number.isFinite(n) && n >= 1) {
      setIndex(clampStep(n - 1, steps.length - 1));
    }
  }, [steps.length]);

  useEffect(() => {
    const supported = "wakeLock" in navigator;
    setWakeSupported(supported);
    if (!supported) return;

    let lock: WakeLockSentinel | null = null;
    let released = false;

    async function acquire() {
      try {
        lock = await navigator.wakeLock.request("screen");
      } catch {
        /* permission / battery policies may reject */
      }
    }

    void acquire();

    const onVisibility = () => {
      if (document.visibilityState === "visible" && !released) {
        void acquire();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      released = true;
      document.removeEventListener("visibilitychange", onVisibility);
      void lock?.release();
    };
  }, []);

  useEffect(() => {
    if (done) {
      const url = new URL(window.location.href);
      url.searchParams.delete("step");
      window.history.replaceState({}, "", url);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set("step", String(index + 1));
    window.history.replaceState({}, "", url);
  }, [index, done]);

  const step = steps[index]!;
  const last = index === steps.length - 1;
  const backDisabled = index === 0 && !done;

  function goNext() {
    if (done) {
      setDone(false);
      setIndex(0);
      setShowIng(false);
      return;
    }
    if (last) {
      setDone(true);
      setShowIng(false);
      return;
    }
    setIndex((i) => i + 1);
    setShowIng(false);
  }

  function goBack() {
    if (done) {
      setDone(false);
      return;
    }
    if (index > 0) {
      setIndex((i) => i - 1);
      setShowIng(false);
    }
  }

  return (
    <div className="cook">
      <header className="cook__header">
        <a
          href={`/cocktails/${slug}`}
          aria-label="Exit cook mode"
          className="cook__icon-btn"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>
        </a>
        <div className="cook__title-block">
          <span className="cook__drink">{name}</span>
          <span className="cook__mode-label">Cook mode</span>
        </div>
        <button
          type="button"
          aria-label="Show ingredients"
          aria-expanded={showIng}
          onClick={() => setShowIng((v) => !v)}
          className="cook__icon-btn"
          style={{
            border: showIng ? "1.5px solid var(--accent)" : "1.5px solid transparent",
            background: showIng ? "var(--slate-700)" : "transparent",
            color: showIng ? "var(--accent)" : "var(--paper-50)",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"></path><circle cx="4.5" cy="6" r="1"></circle><circle cx="4.5" cy="12" r="1"></circle><circle cx="4.5" cy="18" r="1"></circle></svg>
        </button>
      </header>

      <div
        aria-hidden="true"
        className="cook__progress"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((_, k) => (
          <span
            key={k}
            style={{
              display: "block",
              height: 4,
              borderRadius: 2,
              background: done || k <= index ? "var(--accent)" : "var(--slate-600)",
            }}
          />
        ))}
      </div>

      {!done ? (
        <main aria-live="polite" className="cook__main">
          <span className="cook__step-label">
            Step {index + 1} of {steps.length}
          </span>
          <h1>{step.title}</h1>
          <p className="cook__body">{step.body}</p>
          {step.tip && (
            <div className="cook__tip">
              <span>Tip</span>
              <p>{step.tip}</p>
            </div>
          )}
        </main>
      ) : (
        <main className="cook__done">
          <div className="diamond-rule diamond-rule--brass" aria-hidden="true" style={{ width: 180, color: "var(--paper-50)" }}>
            <span></span><span></span><span></span>
          </div>
          <h1>Cheers.</h1>
          <p className="cook__done-copy">
            Taste it. Too tart or too sweet? Adjust the next one slightly.
          </p>
          <p className="cook__done-note">Please drink responsibly.</p>
        </main>
      )}

      {wakeSupported && (
        <div className="cook__wake">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
          Screen stays awake while cook mode is open
        </div>
      )}

      <nav aria-label="Step controls" className="cook__nav">
        <button
          type="button"
          onClick={goBack}
          disabled={backDisabled}
          className="cook__back"
          style={{
            borderColor: backDisabled ? "var(--slate-600)" : "var(--stone-400)",
            color: backDisabled ? "#6B7176" : "var(--paper-50)",
            cursor: backDisabled ? "default" : "pointer",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"></path></svg>
          Back
        </button>
        <button type="button" onClick={goNext} className="cook__next">
          {done ? "Start over" : last ? "Done" : "Next"}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
        </button>
      </nav>

      {showIng && (
        <section aria-label="Ingredients" className="cook__ing">
          <div className="cook__ing-head">
            <h2>Ingredients</h2>
            <span>1 serving</span>
          </div>
          <ul>
            {ingredients.map((ing) => (
              <li key={`${ing.item}-${ing.amount}`}>
                <strong>{ing.amount}</strong>
                <span>{ing.item}</span>
              </li>
            ))}
          </ul>
          <p>
            Garnish:{" "}
            {garnish
              .map((g, i) =>
                i === 0 ? g.toLowerCase() : g.charAt(0).toLowerCase() + g.slice(1),
              )
              .join(", ")}
          </p>
        </section>
      )}

      <style>{`
        .cook {
          width: 100%;
          min-height: 100dvh;
          max-width: 480px;
          margin: 0 auto;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          background: var(--slate-900);
          color: var(--paper-50);
          font-family: var(--font-body);
          display: flex;
          flex-direction: column;
        }
        .cook__header {
          height: 64px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .cook__icon-btn {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--paper-50);
          background: transparent;
          border: 1.5px solid transparent;
          cursor: pointer;
          text-decoration: none;
        }
        .cook__title-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.2;
        }
        .cook__drink {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.1875rem;
        }
        .cook__mode-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--on-dark-muted);
        }
        .cook__progress {
          padding: 4px 16px 0;
          display: grid;
          gap: 6px;
          flex-shrink: 0;
        }
        .cook__main {
          flex: 1;
          min-height: 0;
          padding: 32px 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
        }
        .cook__step-label {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .cook__main h1 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 2.5rem;
          line-height: 1.08;
        }
        .cook__body {
          margin: 0;
          font-size: 1.5625rem;
          line-height: 1.45;
          color: var(--paper-50);
        }
        .cook__tip {
          margin-top: 4px;
          padding: 16px;
          background: var(--slate-700);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cook__tip span {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .cook__tip p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.45;
          color: #e4ded1;
        }
        .cook__done {
          flex: 1;
          padding: 48px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 16px;
        }
        .cook__done h1 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 900;
          font-size: 3.5rem;
          line-height: 1;
        }
        .cook__done-copy {
          margin: 0;
          font-size: 1.375rem;
          line-height: 1.45;
          color: #e4ded1;
        }
        .cook__done-note {
          margin: 8px 0 0;
          font-size: 0.9375rem;
          color: var(--on-dark-muted);
        }
        .cook__wake {
          padding: 0 20px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: var(--on-dark-muted);
          flex-shrink: 0;
        }
        .cook__nav {
          padding: 12px 16px 28px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
          gap: 12px;
          border-top: 1px solid var(--slate-700);
          flex-shrink: 0;
        }
        .cook__back, .cook__next {
          height: 68px;
          border-radius: 4px;
          font-family: var(--font-body);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .cook__back {
          background: transparent;
          border: 1.5px solid var(--stone-400);
          font-weight: 700;
          font-size: 1.0625rem;
        }
        .cook__next {
          border: 0;
          background: var(--accent);
          color: var(--slate-900);
          font-weight: 700;
          font-size: 1.1875rem;
          cursor: pointer;
        }
        .cook__ing {
          position: absolute;
          left: 0;
          right: 0;
          top: 64px;
          bottom: 108px;
          background: var(--slate-800);
          border-top: 1px solid var(--slate-500);
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
        }
        .cook__ing-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .cook__ing-head h2 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.875rem;
        }
        .cook__ing-head span {
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--on-dark-muted);
        }
        .cook__ing ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--slate-500);
        }
        .cook__ing li {
          display: grid;
          grid-template-columns: 84px minmax(0, 1fr);
          padding: 14px 0;
          border-bottom: 1px solid var(--slate-600);
          font-size: 1.375rem;
        }
        .cook__ing strong {
          font-family: var(--font-display);
          color: var(--accent);
        }
        .cook__ing > p {
          margin: 0;
          font-size: 1.0625rem;
          color: #e4ded1;
        }
        .diamond-rule {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .diamond-rule span:first-child,
        .diamond-rule span:last-child {
          flex: 1;
          height: 1px;
          background: currentColor;
        }
        .diamond-rule span:nth-child(2) {
          width: 7px;
          height: 7px;
          background: var(--accent);
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
}
