export type AnalyticsEvent =
  | "quiz_started"
  | "question_answered"
  | "quiz_completed"
  | "result_viewed"
  | "secondary_result_viewed"
  | "cta_clicked"
  | "result_shared"
  | "quiz_restarted";

export type AnalyticsPayload = Record<string, string | number | boolean>;

export function trackEvent(
  event: AnalyticsEvent,
  payload: AnalyticsPayload = {},
): void {
  if (import.meta.env.DEV) console.info("[analytics]", event, payload);
}
