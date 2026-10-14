# Acceptance tests

## Automated

- Scoring sums arbitrary and weighted score maps independent of answer order.
- Every class can win; Q8 prototype weight is represented by data.
- Final-question, primary-selection-count, and fallback ties are deterministic.
- Secondary result is deterministic and distinct from primary.
- Quiz selection, navigation, answer changes, completion, and restart behave correctly.
- Questions each have exactly four valid answers and all four personality configs exist.
- The details form validates name, company, email and consent; the quiz cannot be reached without details.
- The entry is saved before the result is revealed; a failed save keeps the visitor on the last question with a retry.
- Restarting clears the previous visitor's details.
- Lint, format check, tests, TypeScript compilation, and production build pass.

## Manual/browser

- Start on landing, enter details, complete all six questions, see one branded result card, and retake.
- With Supabase configured, the entry appears in the `quiz_submissions` table.
- Previous preserves selections; changing one changes eventual scoring.
- Keyboard-only operation has visible focus and logical order.
- 320, 375, 390, 430, 768, and 1024+ widths have no horizontal overflow.
- Reduced-motion mode removes nonessential transitions.
- `#/dev/results` and `#/dev/components` exist only in development builds.
- Direct result URLs show configured public result content without private data.
