import { describe, expect, it } from "vitest";
import { createInitialQuizState, quizReducer } from "../src/lib/quizState";
import type { ParticipantDetails } from "../src/types/participant";

const participant: ParticipantDetails = {
  name: "Alex Tan",
  company: "Example Pte Ltd",
  email: "alex@example.com",
};

describe("quiz state", () => {
  it("selects an answer and advances deliberately", () => {
    const selected = quizReducer(createInitialQuizState(), {
      type: "select",
      questionId: "q1",
      answerId: "a1",
    });
    const advanced = quizReducer(selected, { type: "next", questionCount: 8 });

    expect(selected.answersByQuestion.q1).toBe("a1");
    expect(advanced.currentQuestion).toBe(1);
  });

  it("preserves selection when navigating back", () => {
    let state = quizReducer(createInitialQuizState(), {
      type: "select",
      questionId: "q1",
      answerId: "a1",
    });
    state = quizReducer(state, { type: "next", questionCount: 8 });
    state = quizReducer(state, { type: "previous" });

    expect(state.currentQuestion).toBe(0);
    expect(state.answersByQuestion.q1).toBe("a1");
  });

  it("changes an existing answer", () => {
    let state = quizReducer(createInitialQuizState(), {
      type: "select",
      questionId: "q1",
      answerId: "a1",
    });
    state = quizReducer(state, {
      type: "select",
      questionId: "q1",
      answerId: "a2",
    });
    expect(state.answersByQuestion.q1).toBe("a2");
  });

  it("marks completion after the last answered question", () => {
    const state = quizReducer(
      {
        currentQuestion: 7,
        answersByQuestion: { q8: "a1" },
        completionState: "in-progress",
        participant,
      },
      { type: "next", questionCount: 8 },
    );
    expect(state.completionState).toBe("complete");
  });

  it("registers participant details and starts the quiz", () => {
    const state = quizReducer(createInitialQuizState(), {
      type: "register",
      participant,
    });
    expect(state.participant).toEqual(participant);
    expect(state.completionState).toBe("in-progress");
  });

  it("restart clears all state, including participant details", () => {
    const state = quizReducer(
      {
        currentQuestion: 5,
        answersByQuestion: { q1: "a1" },
        completionState: "complete",
        participant,
      },
      { type: "restart" },
    );
    expect(state).toEqual(createInitialQuizState());
  });
});
