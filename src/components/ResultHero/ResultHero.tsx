import type { PersonalityContent } from "../../types/quiz";

export function ResultHero({
  personality,
}: {
  personality: PersonalityContent;
}) {
  return (
    <header className={`result-hero theme-${personality.id}`}>
      <div className="result-hero__copy">
        <p className="eyebrow light">You are…</p>
        <h1>{personality.personalityName}</h1>
        <p className="result-asset">{personality.assetClassName}</p>
        <p className="result-tagline">{personality.tagline}</p>
      </div>
      <div className="result-artwork">
        <img
          src={`${import.meta.env.BASE_URL}${personality.artwork.hero}`}
          alt={personality.artwork.alt}
        />
      </div>
    </header>
  );
}
