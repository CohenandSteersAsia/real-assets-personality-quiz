import { describe, expect, it } from "vitest";
import { calculateQuizResult, sumScores } from "../src/lib/scoring";
import { resolveTie } from "../src/lib/tieBreaker";
import type { AnswersByQuestion, QuizQuestion } from "../src/types/quiz";

const question = (
  id: string,
  entries: Array<[string, Record<string, number>]>,
): QuizQuestion => ({
  id,
  question: id,
  answers: entries.map(([answerId, scores]) => ({
    id: answerId,
    text: answerId,
    scores,
  })),
});

describe("sumScores", () => {
  it("sums arbitrary score maps and weighted answers", () => {
    const questions: QuizQuestion[] = [
      question("q1", [
        ["blend", { "real-estate": 2, infrastructure: 1 }],
        ["other", { commodities: 1 }],
      ]),
      question("q2", [
        ["weighted", { commodities: 2 }],
        ["other", { infrastructure: 1 }],
      ]),
    ];
    questions[1].weight = 2;

    expect(sumScores(questions, { q1: "blend", q2: "weighted" })).toEqual({
      "real-estate": 2,
      infrastructure: 1,
      commodities: 4,
      "natural-resources": 0,
    });
  });

  it("uses answer score mappings rather than answer positions", () => {
    const first = question("q1", [
      ["a", { infrastructure: 1 }],
      ["b", { "real-estate": 1 }],
    ]);
    const reordered = { ...first, answers: [...first.answers].reverse() };

    expect(sumScores([first], { q1: "a" })).toEqual(
      sumScores([reordered], { q1: "a" }),
    );
  });
});

describe("tie handling", () => {
  const tied = {
    "real-estate": 3,
    infrastructure: 3,
    commodities: 1,
    "natural-resources": 0,
  };

  it("prefers the final-question primary selection among tied leaders", () => {
    expect(
      resolveTie(["real-estate", "infrastructure"], tied, {
        finalQuestionPrimary: "infrastructure",
        primarySelectionCounts: { "real-estate": 2, infrastructure: 1 },
      }),
    ).toBe("infrastructure");
  });

  it("otherwise prefers primary-selection count", () => {
    expect(
      resolveTie(["real-estate", "infrastructure"], tied, {
        finalQuestionPrimary: "commodities",
        primarySelectionCounts: { "real-estate": 1, infrastructure: 2 },
      }),
    ).toBe("infrastructure");
  });

  it("uses stable fallback order as the last resort", () => {
    expect(
      resolveTie(["infrastructure", "real-estate"], tied, {
        finalQuestionPrimary: null,
        primarySelectionCounts: { "real-estate": 1, infrastructure: 1 },
      }),
    ).toBe("real-estate");
  });
});

describe("calculateQuizResult", () => {
  const questions: QuizQuestion[] = [
    question("q1", [
      ["re", { "real-estate": 1 }],
      ["infra", { infrastructure: 1 }],
      ["com", { commodities: 1 }],
      ["nr", { "natural-resources": 1 }],
    ]),
    question("q8", [
      ["re", { "real-estate": 2 }],
      ["infra", { infrastructure: 2 }],
      ["com", { commodities: 2 }],
      ["nr", { "natural-resources": 2 }],
    ]),
  ];

  it.each([
    ["re", "real-estate"],
    ["infra", "infrastructure"],
    ["com", "commodities"],
    ["nr", "natural-resources"],
  ] as const)("allows %s to produce %s as winner", (answer, expected) => {
    const answers: AnswersByQuestion = { q1: answer, q8: answer };
    expect(calculateQuizResult(questions, answers).primary).toBe(expected);
  });

  it("honours the prototype final-question weighting from data", () => {
    const result = calculateQuizResult(questions, { q1: "re", q8: "infra" });
    expect(result.primary).toBe("infrastructure");
    expect(result.scores.infrastructure).toBe(2);
  });

  it("returns a distinct deterministic secondary result", () => {
    const result = calculateQuizResult(questions, { q1: "re", q8: "infra" });
    expect(result.secondary).toBe("real-estate");
    expect(result.secondary).not.toBe(result.primary);
  });
});
