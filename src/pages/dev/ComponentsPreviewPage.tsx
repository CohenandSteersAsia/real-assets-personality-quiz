import { AnswerCard } from "../../components/AnswerCard/AnswerCard";
import { Disclaimer } from "../../components/Disclaimer/Disclaimer";
import { PersonalityTraits } from "../../components/PersonalityTraits/PersonalityTraits";
import { Progress } from "../../components/Progress/Progress";
import { ResultHero } from "../../components/ResultHero/ResultHero";
import { SecondaryResult } from "../../components/SecondaryResult/SecondaryResult";
import { SiteHeader } from "../../components/SiteHeader/SiteHeader";
import { personalities } from "../../data/personalities";
import { questions } from "../../data/questions";

export function ComponentsPreviewPage() {
  const personality = personalities["real-estate"];
  return (
    <div className="page dev-page">
      <SiteHeader />
      <main id="main-content">
        <p className="eyebrow">Development preview</p>
        <h1>Component gallery</h1>
        <section className="dev-section">
          <h2>Progress</h2>
          <Progress current={3} total={8} />
        </section>
        <section className="dev-section">
          <h2>Answer cards</h2>
          <div className="answers">
            <AnswerCard
              answer={questions[0].answers[0]}
              name="preview"
              index={0}
              selected={false}
              onSelect={() => undefined}
            />
            <AnswerCard
              answer={questions[0].answers[1]}
              name="preview"
              index={1}
              selected
              onSelect={() => undefined}
            />
          </div>
        </section>
        <section className="dev-section dev-wide">
          <h2>Personality header</h2>
          <ResultHero personality={personality} />
        </section>
        <section className="dev-section">
          <h2>Traits</h2>
          <PersonalityTraits traits={personality.traits} />
        </section>
        <section className="dev-section">
          <h2>Secondary</h2>
          <SecondaryResult personality={personalities.infrastructure} />
        </section>
        <section className="dev-section">
          <h2>CTA</h2>
          <button className="button">Example call to action</button>
        </section>
        <section className="dev-section">
          <h2>Disclaimer</h2>
          <Disclaimer />
        </section>
      </main>
    </div>
  );
}
