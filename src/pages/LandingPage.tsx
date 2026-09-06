import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/SiteHeader/SiteHeader";
import { siteContent } from "../data/siteContent";
import { personalities } from "../data/personalities";
import { ASSET_CLASSES } from "../types/quiz";
import { trackEvent } from "../lib/analytics";
import { useQuiz } from "../context/QuizContext";

export function LandingPage() {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const { title, titleEmphasis } = siteContent.landing;
  const titleParts = title.split(titleEmphasis);
  const start = () => {
    dispatch({ type: "restart" });
    dispatch({ type: "start" });
    trackEvent("quiz_started");
    navigate("/quiz");
    window.scrollTo?.(0, 0);
  };
  return (
    <div className="page page--landing">
      <SiteHeader />
      <main id="main-content">
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <p className="eyebrow">{siteContent.landing.eyebrow}</p>
            <h1>
              {titleParts.map((part, index) => (
                <Fragment key={index}>
                  {index > 0 && (
                    <span className="landing-title__emphasis">
                      {titleEmphasis}
                    </span>
                  )}
                  {part}
                </Fragment>
              ))}
            </h1>
            <p className="landing-intro">{siteContent.landing.introduction}</p>
            <div className="landing-actions">
              <button className="button" type="button" onClick={start}>
                {siteContent.landing.cta}
                <span aria-hidden="true"> →</span>
              </button>
              <span>{siteContent.landing.duration}</span>
            </div>
          </div>
          <div className="landing-visual" aria-hidden="true">
            <div className="personality-mosaic">
              {ASSET_CLASSES.map((id) => (
                <div className={`mosaic-tile theme-${id}`} key={id}>
                  <img
                    src={`${import.meta.env.BASE_URL}${personalities[id].artwork.hero}`}
                    alt=""
                    width="600"
                    height="600"
                  />
                  <span>{personalities[id].personalityName}</span>
                </div>
              ))}
            </div>
            <p className="mosaic-caption">
              {siteContent.landing.visualCaption}
            </p>
          </div>
        </section>
        <section className="scarcity-section" aria-labelledby="scarcity-title">
          <h2 id="scarcity-title">{siteContent.landing.scarcityTitle}</h2>
          <p className="scarcity-lede">{siteContent.landing.scarcityBody}</p>
        </section>
      </main>
    </div>
  );
}
