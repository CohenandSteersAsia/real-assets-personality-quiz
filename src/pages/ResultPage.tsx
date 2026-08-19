import { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Disclaimer } from "../components/Disclaimer/Disclaimer";
import { EducationSection } from "../components/EducationSection/EducationSection";
import { PersonalityTraits } from "../components/PersonalityTraits/PersonalityTraits";
import { ResultHero } from "../components/ResultHero/ResultHero";
import { SecondaryResult } from "../components/SecondaryResult/SecondaryResult";
import { ShareResult } from "../components/ShareResult/ShareResult";
import { SiteHeader } from "../components/SiteHeader/SiteHeader";
import { useQuiz } from "../context/QuizContext";
import { personalities } from "../data/personalities";
import { siteContent } from "../data/siteContent";
import { trackEvent } from "../lib/analytics";
import { ASSET_CLASSES, type AssetClass } from "../types/quiz";

export function ResultPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, result, dispatch } = useQuiz();
  const validId = ASSET_CLASSES.includes(id as AssetClass)
    ? (id as AssetClass)
    : null;
  const personality = validId ? personalities[validId] : null;
  const secondary =
    state.completionState === "complete" && result.secondary
      ? personalities[result.secondary]
      : null;

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
        <p className="result-kicker">{siteContent.result.eyebrow}</p>
        <ResultHero personality={personality} />
        <section className="result-story" aria-labelledby="personality-story">
          <div>
            <p className="eyebrow">Your personality, in a nutshell</p>
            <h2 id="personality-story">{personality.shortDescription}</h2>
          </div>
          <div>
            <p>{personality.longDescription}</p>
            <PersonalityTraits traits={personality.traits} />
          </div>
        </section>
        {secondary && <SecondaryResult personality={secondary} />}
        <EducationSection personality={personality} />
        <ShareResult personality={personality} />
        <button type="button" className="retake" onClick={restart}>
          {siteContent.result.restart}
        </button>
        <Disclaimer />
      </main>
    </div>
  );
}
