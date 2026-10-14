import { describe, expect, it } from "vitest";
import {
  PARTICIPANT_LIMITS,
  validateParticipant,
  type ParticipantFormValues,
} from "../src/lib/participant";

const valid: ParticipantFormValues = {
  name: "  Alex Tan ",
  company: " Example Pte Ltd ",
  department: " Wealth Solutions ",
  email: " alex@example.com ",
};

describe("participant validation", () => {
  it("accepts complete details and trims whitespace", () => {
    expect(validateParticipant(valid)).toEqual({
      ok: true,
      participant: {
        name: "Alex Tan",
        company: "Example Pte Ltd",
        department: "Wealth Solutions",
        email: "alex@example.com",
      },
    });
  });

  it("requires name, company, team/department and email", () => {
    expect(
      validateParticipant({
        name: " ",
        company: "",
        department: "  ",
        email: "",
      }),
    ).toEqual({
      ok: false,
      errors: {
        name: "required",
        company: "required",
        department: "required",
        email: "required",
      },
    });
  });

  it.each(["alex", "alex@", "alex@example", "alex @example.com"])(
    "rejects the malformed email %s",
    (email) => {
      expect(validateParticipant({ ...valid, email })).toEqual({
        ok: false,
        errors: { email: "invalid-email" },
      });
    },
  );

  it("rejects values longer than the database allows", () => {
    expect(
      validateParticipant({
        ...valid,
        name: "a".repeat(PARTICIPANT_LIMITS.name + 1),
        company: "a".repeat(PARTICIPANT_LIMITS.company + 1),
        department: "a".repeat(PARTICIPANT_LIMITS.department + 1),
        email: `${"a".repeat(PARTICIPANT_LIMITS.email)}@example.com`,
      }),
    ).toEqual({
      ok: false,
      errors: {
        name: "too-long",
        company: "too-long",
        department: "too-long",
        email: "too-long",
      },
    });
  });
});
