import type { AnswersByQuestion } from "../types/quiz";

export interface QuizState {
  currentQuestion: number;
  answersByQuestion: AnswersByQuestion;
  completionState: "not-started" | "in-progress" | "complete";
}

export type QuizAction =
  | { type: "start" }
  | { type: "select"; questionId: string; answerId: string }
  | { type: "next"; questionCount: number }
  | { type: "previous" }
  | { type: "restart" };

export const createInitialQuizState = (): QuizState => ({
  currentQuestion: 0,
  answersByQuestion: {},
  completionState: "not-started",
});

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "start":
      return { ...state, completionState: "in-progress" };
    case "select":
      return {
        ...state,
        completionState: "in-progress",
        answersByQuestion: {
          ...state.answersByQuestion,
          [action.questionId]: action.answerId,
        },
      };
    case "next":
      if (state.currentQuestion >= action.questionCount - 1) {
        return { ...state, completionState: "complete" };
      }
      return { ...state, currentQuestion: state.currentQuestion + 1 };
    case "previous":
      return {
        ...state,
        currentQuestion: Math.max(0, state.currentQuestion - 1),
      };
    case "restart":
      return createInitialQuizState();
  }
}
