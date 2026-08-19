import type { PersonalityContent } from "../../types/quiz";

export function SecondaryResult({
  personality,
}: {
  personality: PersonalityContent;
}) {
  return (
    <aside className="secondary-result">
      <p className="eyebrow">Also in your mix:</p>
      <div>
        <h2>{personality.personalityName}</h2>
        <p>
          {personality.assetClassName} · {personality.shortDescription}
        </p>
      </div>
    </aside>
  );
}
