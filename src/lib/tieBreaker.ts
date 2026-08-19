import { ASSET_CLASSES, type AssetClass } from "../types/quiz";

export const STABLE_TIE_ORDER: readonly AssetClass[] = ASSET_CLASSES;

interface TieContext {
  finalQuestionPrimary: AssetClass | null;
  primarySelectionCounts: Partial<Record<AssetClass, number>>;
}

/**
 * Provisional, intentionally isolated tie methodology.
 * Marketing methodology can replace this function without changing score summing.
 */
export function resolveTie(
  candidates: AssetClass[],
  _scores: Record<AssetClass, number>,
  context: TieContext,
): AssetClass {
  if (candidates.length === 0) return STABLE_TIE_ORDER[0];
  if (
    context.finalQuestionPrimary &&
    candidates.includes(context.finalQuestionPrimary)
  ) {
    return context.finalQuestionPrimary;
  }

  const highestSelections = Math.max(
    ...candidates.map((id) => context.primarySelectionCounts[id] ?? 0),
  );
  const selectionLeaders = candidates.filter(
    (id) => (context.primarySelectionCounts[id] ?? 0) === highestSelections,
  );

  return (
    STABLE_TIE_ORDER.find((id) => selectionLeaders.includes(id)) ??
    candidates[0]
  );
}
