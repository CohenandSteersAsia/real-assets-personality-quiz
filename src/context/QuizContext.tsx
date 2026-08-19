/* oxlint-disable react/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import {
  quizReducer,
  createInitialQuizState,
  type QuizAction,
  type QuizState,
} from "../lib/quizState";
import { calculateQuizResult } from "../lib/scoring";
import { questions } from "../data/questions";
import type { QuizResult } from "../types/quiz";

interface QuizContextValue {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
  result: QuizResult;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    quizReducer,
    undefined,
    createInitialQuizState,
  );
  const result = useMemo(
    () => calculateQuizResult(questions, state.answersByQuestion),
    [state.answersByQuestion],
  );
  return (
    <QuizContext.Provider value={{ state, dispatch, result }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const value = useContext(QuizContext);
  if (!value) throw new Error("useQuiz must be used within QuizProvider");
  return value;
}
