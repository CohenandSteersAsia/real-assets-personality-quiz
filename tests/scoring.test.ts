import { describe, expect, it } from "vitest";
import { questions as quizQuestions } from "../src/data/questions";
import { ASSET_CLASSES } from "../src/types/quiz";
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

describe("approved question-bank scoring regression", () => {
  it("keeps one point per choice and double weight only on the final statement", () => {
    expect(quizQuestions).toHaveLength(6);
    expect(quizQuestions.at(-1)?.id).toBe("final-statement");
    quizQuestions.forEach((question, index) => {
      expect(question.weight ?? 1).toBe(1);
      expect(
        question.answers
          .map(({ primaryAssetClass }) => primaryAssetClass)
          .sort(),
      ).toEqual([...ASSET_CLASSES].sort());
      question.answers.forEach((answer) => {
        expect(answer.scores).toEqual({
          [answer.primaryAssetClass!]: index === 5 ? 2 : 1,
        });
      });
    });
  });

  it("reaches each primary equally across all 4096 equally likely answer paths", () => {
    const winners = {
      "real-estate": 0,
      infrastructure: 0,
      commodities: 0,
      "natural-resources": 0,
    };
    let paths = 0;
    const walk = (index: number, answers: AnswersByQuestion) => {
      if (index === quizQuestions.length) {
        const result = calculateQuizResult(quizQuestions, answers);
        winners[result.primary] += 1;
        paths += 1;
        expect(
          Object.values(result.scores).reduce((sum, score) => sum + score, 0),
        ).toBe(7);
        expect(result.secondary).not.toBe(result.primary);
        expect(calculateQuizResult(quizQuestions, answers)).toEqual(result);
        return;
      }
      const question = quizQuestions[index];
      question.answers.forEach((answer) =>
        walk(index + 1, { ...answers, [question.id]: answer.id }),
      );
    };
    walk(0, {});
    expect(paths).toBe(4096);
    expect(winners).toEqual({
      "real-estate": 1024,
      infrastructure: 1024,
      commodities: 1024,
      "natural-resources": 1024,
    });
  });
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
