# AGENTS.md

## Project guardrails

This repository is a public-facing financial-services marketing and education experience. Treat all approved marketing, educational, and compliance copy as controlled content: do not casually rewrite it.

- Keep quiz questions, answers, personality content, site copy, calls-to-action, disclaimers, and artwork references in configuration under `src/data/`; UI and scoring code must not depend on current wording.
- Current content is provisional and may be replaced. Freeze architecture, not copy.
- Never introduce investment recommendations or imply that a quiz result establishes suitability, risk tolerance, or an appropriate investment.
- Never invent Cohen & Steers product or fund claims, fund names, tickers, performance figures, yields, returns, allocations, endorsements, or legal language.
- Do not scrape, imitate, or fabricate Cohen & Steers branding or corporate assets. Use replaceable neutral placeholders until approved assets are supplied.
- Do not alter the scoring or tie-breaking methodology unless specifically instructed. Keep tie-breaking isolated and tested.
- Preserve static GitHub Pages compatibility. Hash-based routing and Vite base-path handling must remain deployment-safe.
- Maintain mobile-first accessibility: semantic HTML, keyboard operation, visible focus, touch targets, contrast, reduced-motion support, and no colour-only state.
- Before considering implementation complete, run `npm run format:check`, `npm run lint`, `npm run test`, and `npm run build` and resolve failures.

Update this file if the architecture or operating guardrails materially change.
