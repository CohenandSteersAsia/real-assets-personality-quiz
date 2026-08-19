import { describe, expect, it } from "vitest";
import { personalities } from "../src/data/personalities";
import { questions } from "../src/data/questions";
import { ASSET_CLASSES } from "../src/types/quiz";

describe("content integrity", () => {
  it("provides eight questions with exactly four answers", () => {
    expect(questions).toHaveLength(8);
    questions.forEach((question) => expect(question.answers).toHaveLength(4));
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
