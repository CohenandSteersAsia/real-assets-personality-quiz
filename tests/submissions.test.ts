import { describe, expect, it } from "vitest";
import {
  buildSubmission,
  readSubmissionConfig,
  submitQuizEntry,
  type SubmissionConfig,
} from "../src/lib/submissions";
import type { ParticipantDetails } from "../src/types/participant";

const participant: ParticipantDetails = {
  name: "Alex Tan",
  company: "Example Pte Ltd",
  department: "Wealth Solutions",
  email: "alex@example.com",
};

const config: SubmissionConfig = {
  url: "https://project.supabase.co",
  publishableKey: "sb_publishable_test",
};

const submission = buildSubmission(
  participant,
  {
    primary: "infrastructure",
    secondary: "commodities",
    scores: {
      "real-estate": 0,
      infrastructure: 4,
      commodities: 2,
      "natural-resources": 1,
    },
  },
  "notice-v1",
);

function recordingFetch(response: Response) {
  const calls: { url: string; init: RequestInit }[] = [];
  const fetchImpl = async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    return response;
  };
  return { calls, fetchImpl };
}

describe("quiz submissions", () => {
  it("records submission under the notice as consent, with no marketing opt-in", () => {
    expect(submission).toEqual({
      name: "Alex Tan",
      company: "Example Pte Ltd",
      department: "Wealth Solutions",
      email: "alex@example.com",
      personal_data_consent: true,
      marketing_opt_in: false,
      notice_version: "notice-v1",
      primary_result: "infrastructure",
      secondary_result: "commodities",
    });
  });

  it("inserts the entry through the Supabase REST API without reading it back", async () => {
    const { calls, fetchImpl } = recordingFetch(
      new Response(null, { status: 201 }),
    );
    await submitQuizEntry(submission, config, fetchImpl);

    expect(calls).toHaveLength(1);
    expect(calls[0].url).toBe(
      "https://project.supabase.co/rest/v1/quiz_submissions",
    );
    expect(calls[0].init.method).toBe("POST");
    expect(calls[0].init.headers).toEqual({
      apikey: "sb_publishable_test",
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    });
    expect(JSON.parse(String(calls[0].init.body))).toEqual(submission);
  });

  it("rejects when the database refuses the entry", async () => {
    const { fetchImpl } = recordingFetch(new Response(null, { status: 400 }));
    await expect(
      submitQuizEntry(submission, config, fetchImpl),
    ).rejects.toThrow("400");
  });

  it("reads the project URL and publishable key from the environment", () => {
    expect(
      readSubmissionConfig({
        VITE_SUPABASE_URL: "https://project.supabase.co/",
        VITE_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
      }),
    ).toEqual(config);
    expect(readSubmissionConfig({ VITE_SUPABASE_URL: "" })).toBeNull();
  });
});
