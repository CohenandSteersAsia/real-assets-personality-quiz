// DRAFT LEGAL COPY: requires Cohen & Steers legal/compliance review before launch.
// Replace every "[TO CONFIRM: …]" value. The deploy workflow refuses to publish
// while any remain. Change `version` whenever the notice or consent wording
// changes, so each saved entry records which notice the visitor agreed to.
export const privacyNotice = {
  version: "2026-10-14-draft",
  heading: "Before you start",
  introduction: "Tell us a little about yourself, then discover your result.",
  fields: {
    name: "Name",
    company: "Company",
    email: "Email address",
  },
  noticeTitle: "How we use your personal data",
  noticeBody: [
    "[TO CONFIRM: legal entity] will collect your name, company, email address and quiz result to run this quiz, record your result and contact you about it.",
    "Your details are stored securely in Singapore, are never sold, and are kept for no longer than [TO CONFIRM: retention period].",
    "To withdraw your consent, or to access or correct your personal data, email [TO CONFIRM: data protection officer email].",
  ],
  privacyPolicy: {
    label: "Read our privacy policy",
    href: "[TO CONFIRM: privacy policy URL]",
  },
  personalDataConsent:
    "I agree to [TO CONFIRM: legal entity] collecting, using and storing my personal data for the purposes above, in accordance with the Personal Data Protection Act 2012.",
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
