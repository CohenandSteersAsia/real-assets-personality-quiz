import { describe, expect, it } from "vitest";
import { personalities } from "../src/data/personalities";
import { questions } from "../src/data/questions";
import { siteContent } from "../src/data/siteContent";
import { ASSET_CLASSES } from "../src/types/quiz";

describe("content integrity", () => {
  it("provides the approved landing copy without a time promise", () => {
    expect(siteContent.landing).toMatchObject({
      title: "What’s your REAL assets personality?",
      introduction:
        "Explore four distinct real asset pillars. Which one will be your match?",
      cta: "Find my REAL personality",
      duration: "6 questions",
      titleEmphasis: "REAL",
      visualCaption: "Four personalities. One REAL you.",
      scarcityTitle: "Real Assets: Built For What's Next",
      scarcityBody: [
        "Real assets are the structures, networks and raw materials that facilitate economic growth. They are physical assets and are priced based on their intrinsic value.",
        "Real assets are known for their potential to outperform during inflationary periods, their distinct performance from stocks and bonds, and historically strong total returns.",
        "There are four core real asset pillars: Real Estate, Infrastructure, Natural Resources & Commodities.",
      ],
    });
  });

  it("preserves the existing disclaimers verbatim", () => {
    expect(siteContent.disclaimer).toBe(
      "This quiz is for educational and entertainment purposes only. Your result is not an assessment of your investment objectives, financial situation, risk tolerance or investment suitability and should not be considered investment advice.",
    );
    expect(siteContent.landing.disclaimer).toBe(
      "A light-hearted way to learn about real assets—not an investment assessment.",
    );
  });
  it("provides the approved six questions in order with four answers", () => {
    expect(questions.map(({ id }) => id)).toEqual([
      "holiday-role",
      "satisfying-project",
      "plans-fall-apart",
      "compliment",
      "superpower",
      "final-statement",
    ]);
    questions.forEach((question) => expect(question.answers).toHaveLength(4));
  });

  it("connects every real-estate answer to people and places", () => {
    const expected = [
      "Choosing places to stay and visit that suit what everyone enjoys.",
      "Finding ways to make a place more appealing to the people who use it.",
      "Find a different place that still gives everyone what they need.",
      "“You have a knack for seeing what makes a place special.”",
      "See exactly what any place needs to bring out its potential.",
      "I see the potential in places and how they can work better for people.",
    ];
    expect(
      questions.map(
        (question) =>
          question.answers.find(
            (answer) => answer.primaryAssetClass === "real-estate",
          )?.text,
      ),
    ).toEqual(expected);
  });

  it("uses the approved personality copy and accurate asset connections", () => {
    expect(
      Object.values(personalities).map(({ personalityName, tagline }) => [
        personalityName,
        tagline,
      ]),
    ).toEqual([
      ["The Place-Maker", "You know what makes a place matter."],
      ["The Backbone", "You make the everyday work."],
      ["The Adapter", "When the world shifts, you find your next move."],
      ["The Resourceful", "You turn what’s available into what’s needed."],
    ]);
    expect(personalities["real-estate"].traits).toEqual([
      "Perceptive",
      "Enterprising",
      "Grounded",
      "Evolving",
    ]);
    expect(personalities["real-estate"].longDescription).toBe(
      "You have a feel for what people need from the places around them. You spot potential, appreciate what already works, and see how thoughtful changes can make somewhere even better. For you, lasting appeal comes from staying connected to how people live.",
    );
    expect(personalities["real-estate"].shortDescription).toBe(
      "You see the potential in places and the people who use them.",
    );
    expect(
      ASSET_CLASSES.map((id) => personalities[id].educationalContent.body),
    ).toEqual([
      "Listed real estate consists of shares in publicly traded real estate investment trusts (REITs) and other real estate companies that own, operate or develop properties, including residential, retail, office, industrial and specialized real estate such as data centres and cell towers.",
      "Listed infrastructure consists of shares in publicly traded companies that own or operate essential networks and facilities, including utilities, transport, energy pipelines and communications infrastructure. These businesses often earn regulated or contracted revenues.",
      "Commodities are physical raw materials—such as energy, metals, agricultural products and livestock—whose prices are driven by global supply and demand. Investment exposure is typically obtained through liquid futures contracts rather than shares of companies.",
      "Natural resource equities are shares in publicly traded companies involved in the production or processing of raw materials, including energy, metals, mining and agriculture. Returns reflect both commodity prices and company-specific factors.",
    ]);
    expect(
      Object.values(personalities).map(({ artwork }) => artwork.alt),
    ).toEqual([
      "Illustration of a functioning property collage",
      "Illustration of a connected bridge and utilities",
      "Illustration of shifting raw materials",
      "Illustration of a productive resource landscape",
    ]);
  });

  it("gives every answer a non-empty valid score object", () => {
    questions
      .flatMap((question) => question.answers)
      .forEach((answer) => {
        expect(Object.keys(answer.scores).length).toBeGreaterThan(0);
        Object.entries(answer.scores).forEach(([id, score]) => {
          expect(ASSET_CLASSES).toContain(id);
          expect(Number.isFinite(score)).toBe(true);
        });
      });
  });

  it("provides one configuration for every stable personality id", () => {
    expect(Object.keys(personalities).sort()).toEqual(
      [...ASSET_CLASSES].sort(),
    );
    ASSET_CLASSES.forEach((id) => expect(personalities[id].id).toBe(id));
  });

  it("varies asset-class positions across the question bank", () => {
    const firstScoreIds = questions.map(
      (question) => Object.keys(question.answers[0].scores)[0],
    );
    expect(new Set(firstScoreIds).size).toBeGreaterThan(1);
  });
});
