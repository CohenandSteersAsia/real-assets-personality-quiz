# Acceptance tests

## Automated

- Scoring sums arbitrary and weighted score maps independent of answer order.
- Every class can win; Q8 prototype weight is represented by data.
- Final-question, primary-selection-count, and fallback ties are deterministic.
- Secondary result is deterministic and distinct from primary.
- Quiz selection, navigation, answer changes, completion, and restart behave correctly.
- Questions each have exactly four valid answers and all four personality configs exist.
- Lint, format check, tests, TypeScript compilation, and production build pass.

## Manual/browser

- Start on landing, complete all six questions, see one branded result card, and retake.
- Previous preserves selections; changing one changes eventual scoring.
- Keyboard-only operation has visible focus and logical order.
- 320, 375, 390, 430, 768, and 1024+ widths have no horizontal overflow.
- Reduced-motion mode removes nonessential transitions.
- `#/dev/results` and `#/dev/components` exist only in development builds.
- Direct result URLs show configured public result content without private data.
