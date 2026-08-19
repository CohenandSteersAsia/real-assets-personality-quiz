import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../src/App";

describe("quiz experience", () => {
  beforeEach(() => {
    window.location.hash = "#/";
  });

  it("starts from the landing page and exposes the configured quiz length", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", {
        name: "What’s Your Real Assets Personality?",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/8 questions/i)).toBeInTheDocument();
  });

  it("preserves and allows changing an answer after previous navigation", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /start the quiz/i }));
    const first = screen.getByRole("radio", { name: /sorting out flights/i });
    await user.click(first);
    await user.click(screen.getByRole("button", { name: /next question/i }));
    await user.click(
      screen.getByRole("button", { name: /previous question/i }),
    );
    expect(first).toBeChecked();
    const replacement = screen.getByRole("radio", {
      name: /keeping the itinerary flexible/i,
    });
    await user.click(replacement);
    expect(replacement).toBeChecked();
    expect(
      screen.getByRole("radio", { name: /sorting out flights/i }),
    ).not.toBeChecked();
  });

  it("completes the quiz, displays a result, and restarts cleanly", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /start the quiz/i }));

    for (let index = 0; index < 8; index += 1) {
      await user.click(screen.getAllByRole("radio")[0]);
      await user.click(
        screen.getByRole("button", {
          name: index === 7 ? /reveal my result/i : /next question/i,
        }),
      );
    }

    expect(
      screen.getByText("Your Real Assets Personality"),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/also in your mix/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /retake the quiz/i }));
    expect(
      screen.getByRole("button", { name: /start the quiz/i }),
    ).toBeInTheDocument();
  });
});
