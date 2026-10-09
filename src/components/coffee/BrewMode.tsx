import { useEffect, useRef, useState } from "react";
import { coffeeBrand } from "../../lib/coffeeBrand";

type Step = {
  title: string;
  body: string;
  tip?: string;
};

type TimerConfig = {
  stepIndex: number;
  targetMinSeconds: number;
  targetMaxSeconds: number;
  scaleMaxSeconds: number;
};

type Props = {
  name: string;
  slug: string;
  steps: Step[];
  timer?: TimerConfig;
  initialStep?: number;
};

function clampStep(n: number, max: number) {
  return Math.min(Math.max(n, 0), max);
}

function timerStatus(
  sec: number,
  running: boolean,
  min: number,
  max: number,
): { text: string; color: string } {
  if (sec <= 0) return { text: "Start with the shot", color: "#E8C9A4" };
  if (sec < min) {
    return {
      text: running ? "Keep going…" : "Paused",
      color: "#E8C9A4",
    };
  }
  if (sec <= max) {
    return { text: "In the window. Stop the shot.", color: "#B9CBAA" };
  }
  if (sec <= max + 5) {
    return { text: "A little long", color: "#F2C38F" };
  }
  return {
    text: "Too long: grind coarser next time",
    color: "#F2C38F",
  };
}

export default function BrewMode({
  name,
  slug,
  steps,
  timer,
  initialStep = 0,
}: Props) {
  const [index, setIndex] = useState(() =>
    clampStep(initialStep, steps.length - 1),
  );
  const [done, setDone] = useState(false);
  const [timerOpen, setTimerOpen] = useState<boolean | null>(null);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [wakeSupported, setWakeSupported] = useState(false);
  const [inWindow, setInWindow] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const baseElapsedRef = useRef(0);

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
        /* ignore */
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

  useEffect(() => {
    setElapsed(0);
    setRunning(false);
    setTimerOpen(null);
    setInWindow(false);
    baseElapsedRef.current = 0;
    startRef.current = null;
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, [index]);

  useEffect(() => {
    if (!running) {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      return;
    }
    startRef.current = performance.now();
    const tick = (now: number) => {
      const next =
        baseElapsedRef.current + (now - (startRef.current ?? now));
      const rounded = Math.floor(next / 100) / 10;
      setElapsed((prev) => (prev === rounded ? prev : rounded));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (!timer) return;
    const sec = elapsed;
    const entered =
      sec >= timer.targetMinSeconds && sec <= timer.targetMaxSeconds;
    if (entered && !inWindow) {
      setInWindow(true);
      if ("vibrate" in navigator) navigator.vibrate(40);
    }
    if (!entered && inWindow) setInWindow(false);
  }, [elapsed, timer, inWindow]);

  const showTimer =
    !!timer &&
    !done &&
    (timerOpen === null ? index === timer.stepIndex : timerOpen);

  const step = steps[index]!;
  const last = index === steps.length - 1;
  const backDisabled = index === 0 && !done;
  const status = timer
    ? timerStatus(
        elapsed,
        running,
        timer.targetMinSeconds,
        timer.targetMaxSeconds,
      )
    : null;
  const pct = timer
    ? Math.min(elapsed / timer.scaleMaxSeconds, 1) * 100
    : 0;
  const windowLeft = timer
    ? (timer.targetMinSeconds / timer.scaleMaxSeconds) * 100
    : 0;
  const windowWidth = timer
    ? ((timer.targetMaxSeconds - timer.targetMinSeconds) /
        timer.scaleMaxSeconds) *
      100
    : 0;

  function resetTimer() {
    setRunning(false);
    setElapsed(0);
    baseElapsedRef.current = 0;
    startRef.current = null;
    setInWindow(false);
  }

  function toggleRun() {
    if (running) {
      baseElapsedRef.current = elapsed * 1000;
      setRunning(false);
      return;
    }
    setRunning(true);
  }

  function goNext() {
    resetTimer();
    if (done) {
      setDone(false);
      setIndex(0);
      return;
    }
    if (last) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
  }

  function goBack() {
    resetTimer();
    if (done) {
      setDone(false);
      return;
    }
    if (index > 0) setIndex((i) => i - 1);
  }

  return (
    <div className="brew">
      <header className="brew__header">
        <a
          href={`/coffee/${slug}`}
          aria-label="Exit brew mode"
          className="brew__icon-btn"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </a>
        <div className="brew__title-block">
          <span className="brew__drink">{name}</span>
          <span className="brew__mode-label">{coffeeBrand.guidedModeName}</span>
        </div>
        {timer ? (
          <button
            type="button"
            aria-label="Shot timer"
            aria-pressed={showTimer}
            onClick={() => setTimerOpen(!showTimer)}
            className="brew__icon-btn"
            style={{
              background: showTimer ? "var(--color-inverse)" : "var(--color-surface-2)",
              color: showTimer ? "var(--color-on-inverse)" : "var(--color-ink)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v4l2.5 2M10 2h4" />
            </svg>
          </button>
        ) : (
          <span style={{ width: 48 }} />
        )}
      </header>

      <div
        aria-hidden="true"
        className="brew__progress"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((_, k) => (
          <span
            key={k}
            style={{
              display: "block",
              height: 6,
              borderRadius: 999,
              background:
                done || k <= index
                  ? "var(--color-accent)"
                  : "var(--color-rule)",
            }}
          />
        ))}
      </div>

      {!done ? (
        <main className="brew__main" aria-live="polite">
          <span className="brew__step-label">
            Step {index + 1} of {steps.length}
          </span>
          <h1>{step.title}</h1>
          <p className="brew__body">{step.body}</p>
          {step.tip && (
            <p className="brew__tip">
              <strong>Tip · </strong>
              {step.tip}
            </p>
          )}
          {wakeSupported && (
            <p className="brew__wake">Screen stays awake while you brew.</p>
          )}
        </main>
      ) : (
        <main className="brew__done">
          <svg
            width="56"
            height="40"
            viewBox="0 0 40 28"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 26c-4-4 4-7 0-11s4-7 0-11" />
            <path d="M20 26c-4-4 4-7 0-11s4-7 0-11" />
            <path d="M28 26c-4-4 4-7 0-11s4-7 0-11" />
          </svg>
          <h1>{coffeeBrand.guidedModeDoneTitle}</h1>
          <p>
            Sip it while it&apos;s at its best. Too sour or too bitter? Adjust
            one thing next time.
          </p>
          <a href="/coffee">Brew another</a>
        </main>
      )}

      {showTimer && timer && status && (
        <section aria-label="Shot timer" className="brew__timer">
          <div className="brew__timer-row">
            <div>
              <span role="timer" className="brew__time">
                {elapsed.toFixed(1)} s
              </span>
              <span
                aria-live="polite"
                className="brew__status"
                style={{ color: status.color }}
              >
                {status.text}
              </span>
            </div>
            <div className="brew__timer-controls">
              <button
                type="button"
                aria-label="Reset timer"
                onClick={resetTimer}
                className="brew__reset"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12a8 8 0 1 0 2.4-5.7" />
                  <path d="M4 4v4h4" />
                </svg>
              </button>
              <button type="button" onClick={toggleRun} className="brew__run">
                {running ? "Stop" : elapsed > 0 ? "Resume" : "Start"}
              </button>
            </div>
          </div>
          <div className="brew__track-wrap">
            <div aria-hidden="true" className="brew__track">
              <span
                className="brew__window"
                style={{ left: `${windowLeft}%`, width: `${windowWidth}%` }}
              />
              <span className="brew__fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="brew__track-labels">
              <span>0 s</span>
              <span>
                Target {timer.targetMinSeconds}–{timer.targetMaxSeconds} s
              </span>
              <span>{timer.scaleMaxSeconds} s</span>
            </div>
          </div>
        </section>
      )}

      <nav aria-label="Step controls" className="brew__nav">
        <button
          type="button"
          onClick={goBack}
          disabled={backDisabled}
          className="brew__back"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back
        </button>
        <button type="button" onClick={goNext} className="brew__next">
          {done ? "Start over" : last ? "Done" : "Next step"}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </nav>

      <style>{`
        .brew {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .brew__header {
          height: 64px;
          padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .brew__icon-btn {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-ink);
          text-decoration: none;
          border: 0;
          background: transparent;
          cursor: pointer;
        }
        .brew__title-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.2;
        }
        .brew__drink {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          font-variation-settings: "SOFT" 100;
        }
        .brew__mode-label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--color-ink-muted);
        }
        .brew__progress {
          padding: 0 20px;
          display: grid;
          gap: 6px;
          flex-shrink: 0;
        }
        .brew__main {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 24px 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .brew__step-label {
          font-size: 0.9375rem;
          font-weight: 800;
          color: var(--color-accent-ink);
        }
        .brew__main h1 {
          margin: 0;
          font-size: 2.375rem;
          line-height: 1.1;
        }
        .brew__body {
          margin: 0;
          font-size: 1.4375rem;
          line-height: 1.5;
        }
        .brew__tip {
          margin: 4px 0 0;
          padding: 14px 16px;
          background: var(--color-surface-2);
          border-radius: 16px;
          font-size: 1.1875rem;
          line-height: 1.5;
        }
        .brew__tip strong { color: var(--color-accent-ink); }
        .brew__wake {
          margin: 8px 0 0;
          font-size: 0.875rem;
          color: var(--color-ink-muted);
        }
        .brew__done {
          flex: 1;
          padding: 40px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          text-align: center;
        }
        .brew__done h1 {
          margin: 0;
          font-size: 3.25rem;
          line-height: 1;
        }
        .brew__done p {
          margin: 0;
          font-size: 1.375rem;
          line-height: 1.5;
        }
        .brew__done a {
          margin-top: 8px;
          min-height: 44px;
          display: flex;
          align-items: center;
          font-weight: 800;
          color: var(--color-accent-ink);
        }
        .brew__timer {
          margin: 0 16px 12px;
          padding: 16px 18px;
          background: var(--color-inverse);
          color: var(--color-on-inverse);
          border-radius: 24px;
          box-shadow: 0 8px 22px rgba(43,29,20,0.2);
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
        }
        .brew__timer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .brew__time {
          display: block;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 3rem;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .brew__status {
          display: block;
          font-size: 0.9375rem;
          font-weight: 700;
        }
        .brew__timer-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .brew__reset {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          border: 1.5px solid #8A715F;
          background: transparent;
          color: var(--color-on-inverse);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .brew__run {
          min-width: 96px;
          height: 56px;
          padding: 0 18px;
          border-radius: 999px;
          border: 0;
          background: var(--color-accent-soft);
          color: var(--color-ink);
          font: 800 18px var(--font-body);
          cursor: pointer;
        }
        .brew__track-wrap { display: flex; flex-direction: column; gap: 6px; }
        .brew__track {
          position: relative;
          height: 10px;
          border-radius: 999px;
          background: var(--color-inverse-raised);
          overflow: hidden;
        }
        .brew__window {
          position: absolute;
          top: 0;
          bottom: 0;
          background: #6E8063;
        }
        .brew__fill {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          background: var(--color-accent-soft);
          border-radius: 999px;
          opacity: 0.9;
        }
        .brew__track-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8125rem;
          color: var(--color-on-inverse-muted);
        }
        .brew__nav {
          padding: 12px 16px 28px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
          gap: 12px;
          border-top: 1px solid var(--color-rule);
          background: rgba(245, 237, 224, 0.96);
          flex-shrink: 0;
        }
        .brew__back {
          height: 68px;
          border: 1.5px solid var(--color-rule-strong);
          border-radius: 999px;
          background: var(--color-surface);
          color: var(--color-ink);
          font: 800 18px var(--font-body);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }
        .brew__back:disabled {
          opacity: 0.4;
        }
        .brew__next {
          height: 68px;
          border: 0;
          border-radius: 999px;
          background: var(--color-accent);
          color: var(--color-on-accent);
          font: 800 20px var(--font-body);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: var(--shadow-primary);
        }
      `}</style>
    </div>
  );
}
