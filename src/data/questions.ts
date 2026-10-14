import type { AssetClass, QuizQuestion } from "../types/quiz";

const a = (id: string, text: string, asset: AssetClass, score = 1) => ({
  id,
  text,
  primaryAssetClass: asset,
  scores: { [asset]: score },
});

// PROVISIONAL MARKETING COPY: wording, order, and weights are expected to change.
export const questions: QuizQuestion[] = [
  {
    id: "holiday-role",
    question:
      "Your friends are planning a holiday. What role do you naturally end up playing?",
    answers: [
      a(
        "holiday-infrastructure",
        "Plan the itinerary for a smooth trip.",
        "infrastructure",
      ),
      a(
        "holiday-commodities",
        "Keep the itinerary flexible for changes.",
        "commodities",
      ),
      a(
        "holiday-real-estate",
        "Choose places that suit everyone in the group.",
        "real-estate",
      ),
      a(
        "holiday-natural-resources",
        "Set the basics and figure out the rest along the way.",
        "natural-resources",
      ),
    ],
  },
  {
    id: "satisfying-project",
    question: "Which project sounds most like your kind of challenge?",
    answers: [
      a(
        "project-natural-resources",
        "Creating useful solutions with available resources.",
        "natural-resources",
      ),
      a(
        "project-real-estate",
        "Finding ways to make things more attractive and engaging.",
        "real-estate",
      ),
      a(
        "project-infrastructure",
        "Making sure everything runs as it should.",
        "infrastructure",
      ),
      a(
        "project-commodities",
        "Thriving in a fast-paced environment and adapting quickly to succeed.",
        "commodities",
      ),
    ],
  },
  {
    id: "plans-fall-apart",
    question: "Oh no! Your plans suddenly fall apart, how do you respond?",
    answers: [
      a(
        "plans-real-estate",
        "Finding a different alternative that still gives everyone what they need.",
        "real-estate",
      ),
      a(
        "plans-natural-resources",
        "Take stock of what’s available and figure out how to make it work.",
        "natural-resources",
      ),
      a("plans-commodities", "New situation, new plan.", "commodities"),
      a(
        "plans-infrastructure",
        "Solve the problem systematically until everything is back on track.",
        "infrastructure",
      ),
    ],
  },
  {
    id: "compliment",
    question: "Which compliment would you most like to receive?",
    answers: [
      a(
        "compliment-commodities",
        "“You’re incredibly good at thinking on your feet.”",
        "commodities",
      ),
      a(
        "compliment-real-estate",
        "“You have a knack for seeing what makes a place special.”",
        "real-estate",
      ),
      a(
        "compliment-infrastructure",
        "“Everything runs more smoothly when you’re around.”",
        "infrastructure",
      ),
      a(
        "compliment-natural-resources",
        "“You can always make something work with what you’ve got.”",
        "natural-resources",
      ),
    ],
  },
  {
    id: "superpower",
    question: "Choose your completely impractical superpower.",
    answers: [
      a(
        "superpower-natural-resources",
        "Turn anything into exactly what’s needed.",
        "natural-resources",
      ),
      a(
        "superpower-infrastructure",
        "Make any system work perfectly with a touch.",
        "infrastructure",
      ),
      a(
        "superpower-real-estate",
        "Transform any place into its best possible version.",
        "real-estate",
      ),
      a(
        "superpower-commodities",
        "Sense changes in your surroundings before they happen.",
        "commodities",
      ),
    ],
  },
  {
    id: "final-statement",
    question: "Finally, which one would you pick as your personal motto?",
    answers: [
      a(
        "statement-real-estate",
        "I see what things could become, not just what they are.",
        "real-estate",
        2,
      ),
      a(
        "statement-commodities",
        "When circumstances change, I adapt.",
        "commodities",
        2,
      ),
      a(
        "statement-natural-resources",
        "Give me what we have, and I’ll make it work.",
        "natural-resources",
        2,
      ),
      a(
        "statement-infrastructure",
        "I believe reliability is the foundation of everything.",
        "infrastructure",
        2,
      ),
    ],
  },
];
