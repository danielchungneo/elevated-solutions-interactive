# Agent instructions

This repo builds a mobile-first recipe platform that NFC coasters link to. It hosts multiple themed collections (Cocktails, Coffee).

- **Full spec:** `docs/HANDOFF.md`. Read it before starting any task. The platform home page (`/`) has its own spec: `docs/HANDOFF-platform-home.md`.
- **Design references:** `design/reference/**/*.dc.html` are design exports. Use them for layout, copy and states only, and ignore their tool scaffolding (`<x-dc>`, `<sc-for>`, `{{…}}`, `DCLogic`).
- **Tokens:** `design/themes/base.css` (shared) plus one theme file per collection, and `platform.css` for the home page. Components use semantic `var(--…)` tokens only. Never hard-code hex values in components.
- **Content:** `content/collections.json` plus `content/<collection>/<slug>.json`. Validate with the Zod schema in HANDOFF §6. Optional modules (`dialIn`, `homeMethods`, `timer`, `flavorProfile`) render only when present.

## Rules

- Stack: Astro (static) + React islands only where interaction is needed.
- Mobile-first at 390px. Primary actions in the bottom third. Touch targets ≥ 44px.
- Contrast ≥ 4.5:1. Body text ≥ 15px, in rem. Use real `<button>` / `<a>` / `<label>` elements and keep the focus rings.
- Never change a published slug (NFC tags point at it). Add redirects instead.
- Work milestone by milestone (HANDOFF §11) and stop for review after each one.
