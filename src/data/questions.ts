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
        "Picking the tried-and-tested favourites, while making sure there’s something new enough to keep things interesting.",
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
        "Taking something that already works well and helping it stay useful and relevant for years to come.",
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
    id: "important-decision",
    question: "When making an important decision, what matters most?",
    answers: [
      a(
        "decision-commodities",
        "What are conditions telling me right now?",
        "commodities",
      ),
      a(
        "decision-infrastructure",
        "Can I depend on it to do what it’s supposed to do?",
        "infrastructure",
      ),
      a(
        "decision-natural-resources",
        "Do we have what we need to make this work?",
        "natural-resources",
      ),
      a(
        "decision-real-estate",
        "Will this still make sense when people’s needs change?",
        "real-estate",
      ),
    ],
  },
  {
    id: "plans-fall-apart",
    question: "Your plans suddenly fall apart. What happens next?",
    answers: [
      a(
        "plans-real-estate",
        "Keep the parts that are still working and change what no longer fits.",
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
        "“You always seem to know what will still matter years from now.”",
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
        "Know which trends will fade and which ones will become part of everyday life.",
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
    id: "headline",
    question: "Which headline are you most likely to click?",
    answers: [
      a(
        "headline-infrastructure",
        "The essential systems quietly keeping the world running",
        "infrastructure",
      ),
      a(
        "headline-natural-resources",
        "Who actually supplies the energy, metals and food the world depends on?",
        "natural-resources",
      ),
      a(
        "headline-commodities",
        "Why the price of everyday raw materials can change so quickly",
        "commodities",
      ),
      a(
        "headline-real-estate",
        "Why some things stay relevant while others get left behind",
        "real-estate",
      ),
    ],
  },
  {
    id: "final-statement",
    question: "Finally, which statement feels most like you?",
    answers: [
      a(
        "statement-real-estate",
        "I like things that continue to deliver and know how to stay relevant.",
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
