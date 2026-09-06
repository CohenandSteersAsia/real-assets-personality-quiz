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
        "Sorting out flights, transport and bookings and making sure everything connects.",
        "infrastructure",
      ),
      a(
        "holiday-commodities",
        "Keeping the itinerary flexible because plans can change once you’re there.",
        "commodities",
      ),
      a(
        "holiday-real-estate",
        "Choosing places to stay and visit that suit what everyone enjoys.",
        "real-estate",
      ),
      a(
        "holiday-natural-resources",
        "Making sure the group has what it needs and figuring out the rest along the way.",
        "natural-resources",
      ),
    ],
  },
  {
    id: "satisfying-project",
    question: "Which project sounds the most satisfying?",
    answers: [
      a(
        "project-natural-resources",
        "Making the most of limited resources to produce something people genuinely need.",
        "natural-resources",
      ),
      a(
        "project-real-estate",
        "Finding ways to make a place more appealing to the people who use it.",
        "real-estate",
      ),
      a(
        "project-infrastructure",
        "Running something people rely on every day and making sure it never misses a beat.",
        "infrastructure",
      ),
      a(
        "project-commodities",
        "Working in an environment where circumstances constantly change and you need to respond quickly.",
        "commodities",
      ),
    ],
  },
  {
    id: "plans-fall-apart",
    question: "Your plans suddenly fall apart. What happens next?",
    answers: [
      a(
        "plans-real-estate",
        "Find a different place that still gives everyone what they need.",
        "real-estate",
      ),
      a(
        "plans-natural-resources",
        "Take stock of what’s available and figure out how to make it work.",
        "natural-resources",
      ),
      a(
        "plans-commodities",
        "New situation, new plan — adjust and move on.",
        "commodities",
      ),
      a(
        "plans-infrastructure",
        "Work through the problem systematically until everything is back on track.",
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
        "Turn whatever resources are available into exactly what’s needed.",
        "natural-resources",
      ),
      a(
        "superpower-infrastructure",
        "Make any system work perfectly just by touching it.",
        "infrastructure",
      ),
      a(
        "superpower-real-estate",
        "See exactly what any place needs to bring out its potential.",
        "real-estate",
      ),
      a(
        "superpower-commodities",
        "Sense whenever conditions around you are about to change.",
        "commodities",
      ),
    ],
  },
  {
    id: "final-statement",
    question: "Finally, which statement feels most like you?",
    answers: [
      a(
        "statement-real-estate",
        "I see the potential in places and how they can work better for people.",
        "real-estate",
        2,
      ),
      a(
        "statement-commodities",
        "When circumstances change, I change with them.",
        "commodities",
        2,
      ),
      a(
        "statement-natural-resources",
        "Give me what we’ve got, and I’ll find a way to make it work.",
        "natural-resources",
        2,
      ),
      a(
        "statement-infrastructure",
        "The things people depend on should simply work.",
        "infrastructure",
        2,
      ),
    ],
  },
];
