import type { ParticipantDetails } from "../types/participant";

// Mirrors the check constraints in supabase/schema.sql.
export const PARTICIPANT_LIMITS = { name: 100, company: 150, email: 254 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ParticipantFormValues {
  name: string;
  company: string;
  email: string;
  personalDataConsent: boolean;
  marketingOptIn: boolean;
}

export type ParticipantField = "name" | "company" | "email";

export type ParticipantErrorCode =
  "required" | "too-long" | "invalid-email" | "consent-required";

export type ParticipantErrors = Partial<
  Record<ParticipantField | "personalDataConsent", ParticipantErrorCode>
>;

export type ParticipantValidation =
  | { ok: true; participant: ParticipantDetails }
  | { ok: false; errors: ParticipantErrors };

function textError(
  value: string,
  field: ParticipantField,
): ParticipantErrorCode | undefined {
  if (!value) return "required";
  if (value.length > PARTICIPANT_LIMITS[field]) return "too-long";
  if (field === "email" && !EMAIL_PATTERN.test(value)) return "invalid-email";
  return undefined;
}

export function validateParticipant(
  values: ParticipantFormValues,
): ParticipantValidation {
  const name = values.name.trim();
  const company = values.company.trim();
  const email = values.email.trim();
  const errors: ParticipantErrors = {};

  for (const [field, value] of [
    ["name", name],
    ["company", company],
    ["email", email],
  ] as const) {
    const error = textError(value, field);
    if (error) errors[field] = error;
  }
  if (!values.personalDataConsent) {
    errors.personalDataConsent = "consent-required";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    participant: {
      name,
      company,
      email,
      personalDataConsent: true,
      marketingOptIn: values.marketingOptIn,
    },
  };
}
