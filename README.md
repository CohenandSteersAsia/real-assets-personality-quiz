# Real Assets Personality Quiz

A responsive, static React personality quiz that introduces four real-asset archetypes through a playful editorial experience. It is a financial-services marketing/education prototype—not a suitability assessment, recommendation engine, or source of investment advice.

> **Quiz content is actively being refined. Current copy should not be treated as final approved marketing material.**

## Status

The initial end-to-end prototype includes the landing experience, eight configurable questions, weighted deterministic scoring, primary and secondary results, all four result designs, sharing with copy fallback, development previews, tests, and GitHub Pages deployment automation. Names, descriptions, educational copy, artwork, CTAs, and the tie methodology remain provisional.

## Local setup

Requires Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Other commands:

```bash
npm run test        # one test run
npm run test:watch  # interactive test watcher
npm run lint
npm run format
npm run format:check
npm run build
npm run preview     # serve the production build locally
```

## Architecture

- **`src/data/`** — replaceable questions, personalities, site labels, CTA, disclaimer, and artwork references.
- **`src/types/quiz.ts`** — stable domain IDs and content contracts.
- **`src/lib/scoring.ts`** — generic score-map summing and result calculation.
- **`src/lib/tieBreaker.ts`** — isolated provisional tie methodology.
- **`src/lib/quizState.ts`** — small tested reducer for navigation and answer state.
- **`src/context/QuizContext.tsx`** — client-only quiz state shared across hash routes.
- **`src/components/`** — reusable presentation components with no marketing decisions.
- **`src/pages/`** — landing, quiz, result, and development preview composition.
- **`public/placeholders/`** — lightweight replaceable local SVG artwork.
- **`tests/`** — scoring, tie, state, content-integrity, and end-to-end component behavior.

The app uses `HashRouter`, so repository-hosted routes work without server rewrites. Direct public results use `#/result/<stable-id>` and contain no user data.

## Editing content

### Questions and answers

Edit `src/data/questions.ts`. Each question must have a stable question ID and exactly four answers. Answer position has no scoring meaning. Put all scoring in the answer’s `scores` map and identify its primary class with `primaryAssetClass`.

```ts
{
  id: 'example-answer',
  text: 'Replaceable answer copy',
  primaryAssetClass: 'real-estate',
  scores: { 'real-estate': 2, infrastructure: 1 },
}
```

Run `npm test` after every content change; integrity tests reject invalid IDs, missing score maps, missing personalities, and incorrect answer counts.

### Personality/result content

Edit `src/data/personalities.ts`. Public names can change without changing stable IDs. Descriptions, traits, educational copy, artwork paths, and optional CTA are all configured there.

### Landing, labels, sharing, and disclaimer

Edit `src/data/siteContent.ts`. The disclaimer is controlled copy; do not rewrite it casually.

### Artwork

Add approved local assets under `public/` and update each personality’s `artwork.hero` path. Avoid remote dependencies. Keep meaningful alt text in configuration. Current illustrations in `public/placeholders/` are intentionally simple and neutral.

## Previewing results

During `npm run dev`:

- `#/dev/results` links to all four complete result states.
- `#/dev/components` shows answers, selected state, progress, result hero, traits, secondary match, CTA, and disclaimer.
- `#/result/real-estate`
- `#/result/infrastructure`
- `#/result/commodities`
- `#/result/natural-resources`

Development preview routes are omitted from production routing. Public result URLs remain available intentionally so shared links can open a result without persisted quiz answers; a direct result does not invent a secondary match.

## Scoring

The engine sums whatever score values exist in selected answers, multiplied by optional question weights. Questions 1–7 currently award one point and question 8 awards two points directly in its answer data. No scoring rule depends on answer order or copy.

The provisional tie logic is documented in `docs/SCORING.md` and isolated in `src/lib/tieBreaker.ts`: final-question preference among tied leaders, then primary-selection counts, then a stable technical order. Percentages are not calculated or displayed.

## GitHub Pages deployment

`.github/workflows/deploy.yml` verifies formatting, lint, and tests, builds with the actual repository name as Vite’s base path, and deploys `dist/` through GitHub Pages.

Repository setup:

1. Push this repository to GitHub.
2. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
3. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.

For a repository named `my-quiz`, the expected URL is `https://<owner>.github.io/my-quiz/`. Local development always uses `/`, so it does not depend on a final repository name.

## Project documentation

See `docs/PRODUCT_SPEC.md`, `CONTENT_MODEL.md`, `SCORING.md`, `DESIGN.md`, `COMPLIANCE.md`, and `ACCEPTANCE_TESTS.md` for the product boundary and engineering rationale.
