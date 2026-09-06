import type { PersonalityContent } from "../../types/quiz";
import { brandContent } from "../../data/brandContent";
import { siteContent } from "../../data/siteContent";
import { PersonalityTraits } from "../PersonalityTraits/PersonalityTraits";

export function ResultHero({
  personality,
}: {
  personality: PersonalityContent;
}) {
  return (
    <article
      className={`result-hero theme-${personality.id}`}
      aria-label={personality.personalityName}
    >
      <div className="result-card__brand">
        <img
          className="brand-logo"
          src={`${import.meta.env.BASE_URL}${brandContent.logo}`}
          alt={brandContent.logoAlt}
          width="333"
          height="40"
        />
        <p className="result-kicker">{siteContent.result.eyebrow}</p>
      </div>
      <div className="result-hero__copy">
        <p className="eyebrow">{siteContent.result.reveal}</p>
        <h1>{personality.personalityName}</h1>
        <p className="result-tagline">{personality.tagline}</p>
      </div>
      <div className="result-artwork">
        <img
          src={`${import.meta.env.BASE_URL}${personality.artwork.hero}`}
          alt={personality.artwork.alt}
          width="600"
          height="600"
        />
      </div>
      <div className="result-card__details">
        <p className="result-description">{personality.shortDescription}</p>
        <PersonalityTraits traits={personality.traits} />
        <p className="result-asset">{personality.assetClassName}</p>
      </div>
    </article>
  );
}
