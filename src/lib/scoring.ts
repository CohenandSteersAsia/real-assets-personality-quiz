import {
  ASSET_CLASSES,
  type AnswersByQuestion,
  type AssetClass,
  type QuizAnswer,
  type QuizQuestion,
  type QuizResult,
} from "../types/quiz";
import { resolveTie, STABLE_TIE_ORDER } from "./tieBreaker";

export const emptyScores = (): Record<AssetClass, number> => ({
  "real-estate": 0,
  infrastructure: 0,
  commodities: 0,
  "natural-resources": 0,
});

function selectedAnswer(
  question: QuizQuestion,
  answers: AnswersByQuestion,
): QuizAnswer | undefined {
  return question.answers.find((answer) => answer.id === answers[question.id]);
}

function primaryClass(answer: QuizAnswer | undefined): AssetClass | null {
  if (!answer) return null;
  if (answer.primaryAssetClass) return answer.primaryAssetClass;
  let best: AssetClass | null = null;
  let value = Number.NEGATIVE_INFINITY;
  for (const id of STABLE_TIE_ORDER) {
    const score = answer.scores[id] ?? Number.NEGATIVE_INFINITY;
    if (score > value) {
      best = id;
      value = score;
    }
  }
  return best;
}

export function sumScores(
  questions: QuizQuestion[],
  answers: AnswersByQuestion,
): Record<AssetClass, number> {
  const totals = emptyScores();
  questions.forEach((question) => {
    const answer = selectedAnswer(question, answers);
    if (!answer) return;
    ASSET_CLASSES.forEach((id) => {
      totals[id] += (answer.scores[id] ?? 0) * (question.weight ?? 1);
    });
  });
  return totals;
}

export function calculateQuizResult(
  questions: QuizQuestion[],
  answers: AnswersByQuestion,
): QuizResult {
  const scores = sumScores(questions, answers);
  const primarySelectionCounts: Partial<Record<AssetClass, number>> = {};
  questions.forEach((question) => {
    const id = primaryClass(selectedAnswer(question, answers));
    if (id) primarySelectionCounts[id] = (primarySelectionCounts[id] ?? 0) + 1;
  });
  const finalQuestionPrimary = primaryClass(
    questions.length
      ? selectedAnswer(questions[questions.length - 1], answers)
      : undefined,
  );
  const context = { finalQuestionPrimary, primarySelectionCounts };
  const maxScore = Math.max(...ASSET_CLASSES.map((id) => scores[id]));
  const leaders = ASSET_CLASSES.filter((id) => scores[id] === maxScore);
  const primary = resolveTie([...leaders], scores, context);

  const remaining = ASSET_CLASSES.filter((id) => id !== primary);
  const secondScore = Math.max(...remaining.map((id) => scores[id]));
  const secondLeaders = remaining.filter((id) => scores[id] === secondScore);
  const secondary = secondLeaders.length
    ? resolveTie([...secondLeaders], scores, context)
    : null;

  return { primary, secondary, scores };
}
