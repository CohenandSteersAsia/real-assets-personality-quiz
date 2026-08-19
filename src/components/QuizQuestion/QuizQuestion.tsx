import { AnswerCard } from "../AnswerCard/AnswerCard";
import type { QuizQuestion as QuizQuestionType } from "../../types/quiz";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer?: string;
  onSelect: (answerId: string) => void;
  hint: string;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onSelect,
  hint,
}: QuizQuestionProps) {
  return (
    <fieldset className="question-card">
      <legend>{question.question}</legend>
      <p className="question-hint" id={`${question.id}-hint`}>
        {hint}
      </p>
      <div className="answers" aria-describedby={`${question.id}-hint`}>
        {question.answers.map((answer, index) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            name={question.id}
            selected={selectedAnswer === answer.id}
            onSelect={onSelect}
            index={index}
          />
        ))}
      </div>
    </fieldset>
  );
}
