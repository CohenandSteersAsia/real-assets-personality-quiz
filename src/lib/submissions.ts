import type { ParticipantDetails } from "../types/participant";
import type { AssetClass, QuizResult } from "../types/quiz";

// Column names match public.quiz_submissions in supabase/schema.sql.
export interface QuizSubmission {
  name: string;
  company: string;
  department: string;
  email: string;
  personal_data_consent: true;
  marketing_opt_in: boolean;
  notice_version: string;
  primary_result: AssetClass;
  secondary_result: AssetClass | null;
}

export interface SubmissionConfig {
  url: string;
  publishableKey: string;
}

type FetchLike = (
  url: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>;

const TIMEOUT_MS = 10_000;

export function buildSubmission(
  participant: ParticipantDetails,
  result: QuizResult,
  noticeVersion: string,
): QuizSubmission {
  return {
    name: participant.name,
    company: participant.company,
    department: participant.department,
    email: participant.email,
    // The form has no tick-boxes: submitting it with the notice shown is the
    // consent record, and no marketing consent is asked for.
    personal_data_consent: true,
    marketing_opt_in: false,
    notice_version: noticeVersion,
    primary_result: result.primary,
    secondary_result: result.secondary,
  };
}

export function readSubmissionConfig(
  env: Partial<
    Record<"VITE_SUPABASE_URL" | "VITE_SUPABASE_PUBLISHABLE_KEY", string>
  >,
): SubmissionConfig | null {
  const url = env.VITE_SUPABASE_URL?.trim().replace(/\/+$/, "");
  const publishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
  return url && publishableKey ? { url, publishableKey } : null;
}

// Insert-only: the anon role has no SELECT grant, so the row is never read back.
export async function submitQuizEntry(
  submission: QuizSubmission,
  config: SubmissionConfig,
  fetchImpl: FetchLike = fetch,
): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetchImpl(`${config.url}/rest/v1/quiz_submissions`, {
      method: "POST",
      headers: {
        apikey: config.publishableKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(submission),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Quiz submission failed with status ${response.status}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

// Local development may run without a database; production builds may not.
export async function saveQuizEntry(submission: QuizSubmission): Promise<void> {
  const config = readSubmissionConfig(import.meta.env);
  if (config) return submitQuizEntry(submission, config);
  if (import.meta.env.DEV) {
    console.info("[submission] Supabase is not configured; entry not saved");
    return;
  }
  throw new Error("Quiz submissions are not configured");
}
