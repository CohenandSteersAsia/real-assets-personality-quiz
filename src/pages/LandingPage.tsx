import { useNavigate } from "react-router-dom";
import { SiteHeader } from "../components/SiteHeader/SiteHeader";
import { siteContent } from "../data/siteContent";
import { trackEvent } from "../lib/analytics";
import { useQuiz } from "../context/QuizContext";

const bridges = [
  ["Stays relevant", "Listed Real Estate"],
  ["People rely on", "Listed Infrastructure"],
  ["Responds to change", "Commodities"],
  ["Provides what is needed", "Natural Resource Equities"],
];

export function LandingPage() {
  const navigate = useNavigate();
  const { dispatch } = useQuiz();
  const start = () => {
    dispatch({ type: "restart" });
    dispatch({ type: "start" });
    trackEvent("quiz_started");
    navigate("/quiz");
  };
  return (
    <div className="page page--landing">
      <SiteHeader />
      <main id="main-content">
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <p className="eyebrow">{siteContent.landing.eyebrow}</p>
            <h1>{siteContent.landing.title}</h1>
            <p className="landing-intro">{siteContent.landing.introduction}</p>
            <div className="landing-actions">
              <button className="button" type="button" onClick={start}>
                {siteContent.landing.cta}
              </button>
              <span>{siteContent.landing.duration}</span>
            </div>
            <p className="landing-note">{siteContent.landing.disclaimer}</p>
          </div>
          <div className="landing-visual" aria-hidden="true">
            <span className="orb orb--one" />
            <span className="orb orb--two" />
            <div className="visual-seal">
              <span>4</span>real asset
              <br />
              personalities
            </div>
          </div>
        </section>
        <section className="scarcity-section" aria-labelledby="scarcity-title">
          <p className="eyebrow">The Era of Scarcity</p>
          <h2 id="scarcity-title">{siteContent.landing.scarcityTitle}</h2>
          <p className="scarcity-lede">{siteContent.landing.scarcityBody}</p>
          <div className="bridge-grid">
            {bridges.map(([idea, asset], index) => (
              <article key={asset}>
                <span>0{index + 1}</span>
                <h3>
                  Something that
                  <br />
                  {idea.toLowerCase()}
                </h3>
                <p>{asset}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
