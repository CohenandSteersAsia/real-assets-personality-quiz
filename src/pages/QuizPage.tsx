import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Progress } from "../components/Progress/Progress";
import { QuizQuestion } from "../components/QuizQuestion/QuizQuestion";
import { SiteHeader } from "../components/SiteHeader/SiteHeader";
import { useQuiz } from "../context/QuizContext";
import { privacyNotice } from "../data/privacyNotice";
import { questions } from "../data/questions";
import { siteContent } from "../data/siteContent";
import { trackEvent } from "../lib/analytics";
import { buildSubmission, saveQuizEntry } from "../lib/submissions";

export function QuizPage() {
  const navigate = useNavigate();
  const { state, dispatch, result } = useQuiz();
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const { participant } = state;
  if (!participant) return <Navigate to="/details" replace />;

  const question = questions[state.currentQuestion];
  const selected = state.answersByQuestion[question.id];
  const isLast = state.currentQuestion === questions.length - 1;

  const select = (answerId: string) => {
    dispatch({ type: "select", questionId: question.id, answerId });
    trackEvent("question_answered", { question: question.id });
  };
  const next = async () => {
    if (!selected || saving) return;
    if (isLast) {
      setSaving(true);
      setSaveFailed(false);
      try {
        await saveQuizEntry(
          buildSubmission(participant, result, privacyNotice.version),
        );
      } catch {
        setSaveFailed(true);
        setSaving(false);
        return;
      }
    }
    dispatch({ type: "next", questionCount: questions.length });
    if (isLast) {
      trackEvent("quiz_completed", { result: result.primary });
      navigate(`/result/${result.primary}`);
      window.scrollTo?.(0, 0);
    }
  };

  return (
    <div className="page page--quiz">
      <SiteHeader />
      <main id="main-content" className="quiz-shell">
        <Progress
          current={state.currentQuestion + 1}
          total={questions.length}
        />
        <div className="question-transition" key={question.id}>
          <QuizQuestion
            question={question}
            selectedAnswer={selected}
            onSelect={select}
            hint={siteContent.quiz.selectionHint}
          />
        </div>
        {saveFailed && (
          <p className="form-error quiz-save-error" role="alert">
            {privacyNotice.saveError}
          </p>
        )}
        <nav className="quiz-nav" aria-label="Question navigation">
          <button
            type="button"
            className="button button--ghost"
            onClick={() => dispatch({ type: "previous" })}
            disabled={state.currentQuestion === 0 || saving}
          >
            <span aria-hidden="true">← </span>
            {siteContent.quiz.previous}
          </button>
          <button
            type="button"
            className="button"
            onClick={next}
            disabled={!selected || saving}
          >
            {saving
              ? privacyNotice.saving
              : isLast
                ? siteContent.quiz.reveal
                : siteContent.quiz.next}
            {!saving && <span aria-hidden="true"> →</span>}
          </button>
        </nav>
      </main>
    </div>
  );
}
