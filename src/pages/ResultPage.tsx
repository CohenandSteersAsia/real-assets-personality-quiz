import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Disclaimer } from "../components/Disclaimer/Disclaimer";
import { ResultHero } from "../components/ResultHero/ResultHero";
import { SiteHeader } from "../components/SiteHeader/SiteHeader";
import { useQuiz } from "../context/QuizContext";
import { personalities } from "../data/personalities";
import { siteContent } from "../data/siteContent";
import { trackEvent } from "../lib/analytics";
import { ASSET_CLASSES, type AssetClass } from "../types/quiz";

export function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const validId = ASSET_CLASSES.includes(id as AssetClass)
    ? (id as AssetClass)
    : null;
  const personality = validId ? personalities[validId] : null;

  useEffect(() => {
    if (validId) trackEvent("result_viewed", { result: validId });
  }, [validId]);

  if (!personality) return <Navigate to="/" replace />;

  const restart = () => {
    dispatch({ type: "restart" });
    trackEvent("quiz_restarted");
    navigate("/");
    window.scrollTo?.(0, 0);
  };

  return (
    <div className="page page--result">
      <SiteHeader />
      <main id="main-content" className="result-shell">
        <ResultHero personality={personality} />
        <button type="button" className="retake" onClick={restart}>
          {siteContent.result.restart}
        </button>
        <Disclaimer />
      </main>
    </div>
  );
}
