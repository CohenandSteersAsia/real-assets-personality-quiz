import type { QuizAnswer } from "../../types/quiz";

interface AnswerCardProps {
  answer: QuizAnswer;
  name: string;
  selected: boolean;
  onSelect: (answerId: string) => void;
  index: number;
}

export function AnswerCard({
  answer,
  name,
  selected,
  onSelect,
  index,
}: AnswerCardProps) {
  return (
    <label className={`answer-card${selected ? " is-selected" : ""}`}>
      <input
        type="radio"
        name={name}
        value={answer.id}
        checked={selected}
        onChange={() => onSelect(answer.id)}
      />
      <span className="answer-card__letter" aria-hidden="true">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="answer-card__text">{answer.text}</span>
      <span className="answer-card__check" aria-hidden="true">
        {selected ? "✓" : ""}
      </span>
    </label>
  );
}
