import { Link } from "react-router-dom";
import { SiteHeader } from "../../components/SiteHeader/SiteHeader";
import { personalities } from "../../data/personalities";
import { ASSET_CLASSES } from "../../types/quiz";

export function ResultsPreviewPage() {
  return (
    <div className="page dev-page">
      <SiteHeader />
      <main id="main-content">
        <p className="eyebrow">Development preview</p>
        <h1>All result states</h1>
        <div className="dev-result-grid">
          {ASSET_CLASSES.map((id) => {
            const personality = personalities[id];
            return (
              <Link
                to={`/result/${id}`}
                key={id}
                className={`dev-result-card theme-${id}`}
              >
                <span>{personality.assetClassName}</span>
                <strong>{personality.personalityName}</strong>
                <img
                  src={`${import.meta.env.BASE_URL}${personality.artwork.hero}`}
                  alt=""
                />
              </Link>
            );
          })}
        </div>
        <Link className="text-link" to="/dev/components">
          Open component preview →
        </Link>
      </main>
    </div>
  );
}
