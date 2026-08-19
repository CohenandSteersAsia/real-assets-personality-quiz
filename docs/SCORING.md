# Scoring and tie handling

Each answer supplies `scores: Partial<Record<AssetClass, number>>`. The scoring engine sums those values, optionally multiplied by the question's `weight`. It has no knowledge of answer position or marketing copy.

For this prototype, questions 1–7 give one point to the answer's primary class; question 8 gives two points through its data score. This is content configuration, not an engine rule.

Tie-breaking is isolated in `src/lib/tieBreaker.ts`:

1. The highest score wins.
2. If the final question's selected answer has a primary class among the tied leaders, that class wins.
3. Otherwise the tied class with the most primary selections wins.
4. If still tied, stable fallback order is: real estate, infrastructure, commodities, natural resources.

The secondary result is the highest-ranked class after the primary, using the same deterministic ranking inputs. The methodology is provisional and replaceable. No pseudo-scientific percentages are calculated or displayed.
