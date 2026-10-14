import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../src/App";
import { personalities } from "../src/data/personalities";
import { privacyNotice } from "../src/data/privacyNotice";
import { questions } from "../src/data/questions";
import { siteContent } from "../src/data/siteContent";
import { calculateQuizResult } from "../src/lib/scoring";
import { ASSET_CLASSES } from "../src/types/quiz";

type User = ReturnType<typeof userEvent.setup>;

const fillDetails = async (user: User) => {
  await user.type(screen.getByLabelText(privacyNotice.fields.name), "Alex Tan");
  await user.type(
    screen.getByLabelText(privacyNotice.fields.company),
    "Example Pte Ltd",
  );
  await user.type(
    screen.getByLabelText(privacyNotice.fields.email),
    "alex@example.com",
  );
  await user.click(screen.getByRole("button", { name: privacyNotice.submit }));
};

const startQuiz = async (user: User) => {
  await user.click(
    screen.getByRole("button", { name: siteContent.landing.cta }),
  );
  await fillDetails(user);
};

const answerAllWithFirstOption = async (user: User) => {
  for (let index = 0; index < questions.length; index += 1) {
    await user.click(screen.getAllByRole("radio")[0]);
    if (index < questions.length - 1) {
      await user.click(
        screen.getByRole("button", { name: siteContent.quiz.next }),
      );
    }
  }
};

const firstOptionResult = calculateQuizResult(
  questions,
  Object.fromEntries(
    questions.map((question) => [question.id, question.answers[0].id]),
  ),
);

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
      const resultHeading = within(card).getByRole("heading", { level: 1 });
      expect(resultHeading).toHaveTextContent(
        personalities[id].personalityName,
      );
      expect(resultHeading.nextElementSibling).toHaveTextContent(
        personalities[id].assetClassName,
      );
      expect(resultHeading.nextElementSibling).not.toHaveTextContent(/[()]/);
      expect(
        within(card).getByText(personalities[id].tagline),
      ).toBeInTheDocument();
      expect(
        within(card).getByText(personalities[id].educationalContent.body),
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
    for (const paragraph of siteContent.landing.scarcityBody) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Real Assets: Built For What's Next",
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(siteContent.landing.disclaimer),
    ).not.toBeInTheDocument();
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
    // Revealing waits for the entry to save, so the result renders asynchronously.
    expect(await screen.findByRole("article")).toBeInTheDocument();
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

describe("participant details", () => {
  beforeEach(() => {
    window.location.hash = "#/";
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  const stubDatabase = (...statuses: number[]) => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://project.supabase.co");
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
    const fetchMock = vi.fn(
      async (_url: string, _init: RequestInit) =>
        new Response(null, { status: statuses.shift() ?? 201 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  };

  it("asks for details and shows the personal data notice before the quiz", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: siteContent.landing.cta }),
    );
    expect(
      screen.getByRole("heading", { name: privacyNotice.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(privacyNotice.notice)).toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });

  it("sends visitors without details from the quiz to the details form", () => {
    window.location.hash = "#/quiz";
    render(<App />);
    expect(
      screen.getByRole("heading", { name: privacyNotice.heading }),
    ).toBeInTheDocument();
  });

  it("explains what is missing and stays on the form", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole("button", { name: siteContent.landing.cta }),
    );
    await user.type(
      screen.getByLabelText(privacyNotice.fields.email),
      "not-an-email",
    );
    await user.click(
      screen.getByRole("button", { name: privacyNotice.submit }),
    );

    const name = screen.getByLabelText(privacyNotice.fields.name);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveFocus();
    expect(name).toHaveAccessibleDescription(privacyNotice.errors.required);
    expect(
      screen.getByLabelText(privacyNotice.fields.email),
    ).toHaveAccessibleDescription(privacyNotice.errors["invalid-email"]);
    expect(screen.queryByRole("radio")).not.toBeInTheDocument();
  });

  it("saves details and result before revealing the result", async () => {
    const fetchMock = stubDatabase(201);
    const user = userEvent.setup();
    render(<App />);
    await startQuiz(user);
    await answerAllWithFirstOption(user);
    await user.click(
      screen.getByRole("button", { name: siteContent.quiz.reveal }),
    );

    expect(await screen.findByRole("article")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://project.supabase.co/rest/v1/quiz_submissions");
    expect(JSON.parse(String(init.body))).toEqual({
      name: "Alex Tan",
      company: "Example Pte Ltd",
      email: "alex@example.com",
      personal_data_consent: true,
      marketing_opt_in: false,
      notice_version: privacyNotice.version,
      primary_result: firstOptionResult.primary,
      secondary_result: firstOptionResult.secondary,
    });
  });

  it("keeps the visitor on the last question when saving fails and allows a retry", async () => {
    const fetchMock = stubDatabase(500, 201);
    const user = userEvent.setup();
    render(<App />);
    await startQuiz(user);
    await answerAllWithFirstOption(user);
    await user.click(
      screen.getByRole("button", { name: siteContent.quiz.reveal }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      privacyNotice.saveError,
    );
    expect(screen.queryByRole("article")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: siteContent.quiz.reveal }),
    );
    expect(await screen.findByRole("article")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("clears the previous visitor's details on restart", async () => {
    stubDatabase(201);
    const user = userEvent.setup();
    render(<App />);
    await startQuiz(user);
    await answerAllWithFirstOption(user);
    await user.click(
      screen.getByRole("button", { name: siteContent.quiz.reveal }),
    );
    await user.click(
      await screen.findByRole("button", { name: siteContent.result.restart }),
    );
    await user.click(
      screen.getByRole("button", { name: siteContent.landing.cta }),
    );

    expect(screen.getByLabelText(privacyNotice.fields.name)).toHaveValue("");
    expect(screen.getByLabelText(privacyNotice.fields.email)).toHaveValue("");
  });
});
