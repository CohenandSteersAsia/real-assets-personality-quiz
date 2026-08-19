import { trackEvent } from "../../lib/analytics";
import type { PersonalityContent } from "../../types/quiz";

export function EducationSection({
  personality,
}: {
  personality: PersonalityContent;
}) {
  return (
    <section
      className="education"
      id="education"
      aria-labelledby="education-title"
    >
      <p className="eyebrow">A real assets connection</p>
      <h2 id="education-title">{personality.educationalContent.title}</h2>
      <p>{personality.educationalContent.body}</p>
      {personality.cta && (
        <a
          className="text-link"
          href={personality.cta.href}
          onClick={() => trackEvent("cta_clicked", { result: personality.id })}
        >
          {personality.cta.label}
          <span aria-hidden="true"> →</span>
        </a>
      )}
    </section>
  );
}
