// CONTROLLED LEGAL COPY: `notice` is the wording approved by compliance on
// 2026-10-14, shown without tick-boxes at compliance's request. Do not rewrite
// it. Change `version` whenever the notice or form changes, so each saved
// entry records which notice the visitor saw.
export const privacyNotice = {
  version: "2026-10-14-v4",
  heading: "Before you start",
  introduction: "Tell us a little about yourself, then discover your result.",
  fields: {
    name: "Name",
    company: "Company",
    department: "Team / department",
    email: "Email address",
  },
  notice:
    "All data collected through this survey is for internal use only and will be managed in accordance with the Personal Data Protection Act (PDPA).",
  submit: "Start the quiz",
  errors: {
    required: "Please fill this in.",
    "too-long": "Please shorten this.",
    "invalid-email": "Enter an email address like name@company.com.",
  },
  saving: "Saving…",
  saveError:
    "We couldn’t save your entry. Check your connection and try again.",
} as const;
