// CONTROLLED LEGAL COPY: `notice` is the wording approved by compliance on
// 2026-10-14. Do not rewrite it. Change `version` whenever the notice or consent
// wording changes, so each saved entry records which notice the visitor saw.
export const privacyNotice = {
  version: "2026-10-14-v2",
  heading: "Before you start",
  introduction: "Tell us a little about yourself, then discover your result.",
  fields: {
    name: "Name",
    company: "Company",
    email: "Email address",
  },
  notice:
    "All data collected through this survey is for internal use only and will be managed in accordance with the Personal Data Protection Act (PDPA).",
  personalDataConsent:
    "I agree to Cohen & Steers collecting, using and storing my personal data for the purposes above, in accordance with the Personal Data Protection Act 2012.",
  marketingOptIn:
    "Optional: send me Cohen & Steers updates about real assets by email. I can unsubscribe at any time.",
  submit: "Start the quiz",
  errors: {
    required: "Please fill this in.",
    "too-long": "Please shorten this.",
    "invalid-email": "Enter an email address like name@company.com.",
    "consent-required":
      "Please agree to the personal data notice to take the quiz.",
  },
  saving: "Saving…",
  saveError:
    "We couldn’t save your entry. Check your connection and try again.",
} as const;
