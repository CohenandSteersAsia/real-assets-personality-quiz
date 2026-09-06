import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import App from "../src/App";
import { personalities } from "../src/data/personalities";
import { questions } from "../src/data/questions";
import { siteContent } from "../src/data/siteContent";
import { ASSET_CLASSES } from "../src/types/quiz";

const startQuiz = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(
    screen.getByRole("button", { name: siteContent.landing.cta }),
  );
};

describe("quiz experience", () => {
  beforeEach(() => {
    window.location.hash = "#/";
  });

  it("uses the supplied Cohen & Steers logo in the page header", () => {
    render(<App />);
    expect(screen.getByRole("img", { name: "Cohen & Steers" })).toHaveAttribute(
      "src",
      `${import.meta.env.BASE_URL}brand/cohen_steers_logo-40_2.svg`,
    );
  });

  it.each(ASSET_CLASSES)(
    "shows one self-contained branded result for %s",
    (id) => {
      window.location.hash = `#/result/${id}`;
      render(<App />);
      const card = screen.getByRole("article", {
        name: personalities[id].personalityName,
      });
      expect(
        within(card).getByRole("img", { name: "Cohen & Steers" }),
      ).toBeInTheDocument();
      expect(within(card).getByRole("heading", { level: 1 })).toHaveTextContent(
        personalities[id].personalityName,
      );
      expect(
        within(card).getByText(personalities[id].tagline),
      ).toBeInTheDocument();
      expect(
        within(card).getByText(personalities[id].assetClassName),
      ).toBeInTheDocument();
      for (const trait of personalities[id].traits) {
        expect(within(card).getByText(trait)).toBeInTheDocument();
      }
      expect(
        screen.queryByText(/a real assets connection/i),
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/share your result/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/also in your mix/i)).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /share|copy/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: /continue exploring/i }),
      ).not.toBeInTheDocument();
      expect(screen.getByText(siteContent.disclaimer)).toBeInTheDocument();
    },
  );

  it("emphasises REAL on the six-question cover", () => {
    render(<App />);
    const heading = screen.getByRole("heading", {
      name: "What’s your REAL assets personality?",
    });
    expect(within(heading).getByText("REAL")).toHaveClass(
      "landing-title__emphasis",
    );
    expect(screen.getByText(/^6 questions$/i)).toBeInTheDocument();
    expect(screen.queryByText(/\[PLACEHOLDER\]/)).not.toBeInTheDocument();
  });

  it("preserves and allows changing an answer after previous navigation", async () => {
    const user = userEvent.setup();
    render(<App />);
    await startQuiz(user);
    expect(
      screen.getByRole("img", { name: "Cohen & Steers" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: siteContent.quiz.next }),
    ).toBeDisabled();
    const firstAnswer = questions[0].answers[0];
    await user.click(screen.getByRole("radio", { name: firstAnswer.text }));
    await user.click(
      screen.getByRole("button", { name: siteContent.quiz.next }),
    );
    await user.click(
      screen.getByRole("button", { name: /previous question/i }),
    );
    expect(screen.getByRole("radio", { name: firstAnswer.text })).toBeChecked();
    const replacement = screen.getByRole("radio", {
      name: questions[0].answers[1].text,
    });
    await user.click(replacement);
    expect(replacement).toBeChecked();
    expect(
      screen.getByRole("radio", { name: firstAnswer.text }),
    ).not.toBeChecked();
  });

  it("completes six questions and restarts with no previous selection", async () => {
    const user = userEvent.setup();
    render(<App />);
    await startQuiz(user);
    expect(questions).toHaveLength(6);
    for (let index = 0; index < questions.length; index += 1) {
      await user.click(screen.getAllByRole("radio")[0]);
      await user.click(
        screen.getByRole("button", {
          name:
            index === questions.length - 1
              ? siteContent.quiz.reveal
              : siteContent.quiz.next,
        }),
      );
    }
    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByText(siteContent.result.eyebrow)).toBeInTheDocument();
    expect(screen.queryByText(/also in your mix/i)).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: siteContent.result.restart }),
    );
    await startQuiz(user);
    expect(
      screen
        .getAllByRole("radio")
        .every((radio) => !(radio as HTMLInputElement).checked),
    ).toBe(true);
    expect(
      screen.getByRole("button", { name: siteContent.quiz.next }),
    ).toBeDisabled();
  });
});
