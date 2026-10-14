# Quiz sign-up (lead capture)

Visitors give their name, company and email address before taking the quiz. When they reveal their result, one row is saved to a Supabase (Postgres) database hosted in Singapore. The site stays a static GitHub Pages app: the browser writes directly to Supabase with a public, insert-only key.

## Journey

Landing → **details form** (name, company, email and the personal data notice; no tick-boxes) → six questions → **save** → result.

- Details are required. `#/quiz` redirects to `#/details` when no details are held.
- Nothing is saved until the visitor presses **Reveal my result**. The row includes their details, the notice version they saw, and their primary and secondary result.
- If saving fails, the visitor stays on the last question with an error message and can retry. The result is shown only after a successful save.
- Compliance asked for no tick-boxes (2026-10-14). Submitting the form with the notice shown is the consent record, so every row stores `personal_data_consent = true`. No marketing consent is asked for, so `marketing_opt_in` is always `false`. Both columns stay in the table so older rows (notice versions `2026-10-14-draft` and `-v2`) keep their meaning.
- Details live in memory only. They are never written to the URL, `localStorage`, analytics events or the console, and **Retake the quiz** clears them so the next person on a shared device starts blank.
- Retaking the quiz saves a new row, so the same email can appear more than once.

## Code map

| File                        | Purpose                                                              |
| --------------------------- | -------------------------------------------------------------------- |
| `src/data/privacyNotice.ts` | Form labels, PDPA notice, error messages, notice version             |
| `src/lib/participant.ts`    | Form validation (mirrors the database constraints)                   |
| `src/lib/submissions.ts`    | Builds the database row and inserts it through the Supabase REST API |
| `src/pages/DetailsPage.tsx` | The details form                                                     |
| `src/pages/QuizPage.tsx`    | Requires details; saves before revealing the result                  |
| `supabase/schema.sql`       | Table, constraints, row level security and grants                    |

## One-time Supabase setup

1. Create a Supabase project under a **Cohen & Steers-owned** organisation (not a personal account). Choose the region **Southeast Asia (Singapore)** so data stays in Singapore. Turn on multi-factor authentication for everyone with dashboard access.
2. Open **SQL Editor**, paste `supabase/schema.sql`, and run it.
3. Open **Project Settings → API Keys** and copy the **project URL** and the **publishable key** (`sb_publishable_…`; on older projects, the `anon` key). Never use the secret or `service_role` key in this app.
4. In the GitHub repository that deploys the site, open **Settings → Secrets and variables → Actions → Variables** and add:
   - `VITE_SUPABASE_URL` — the project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` — the publishable key

   These are variables, not secrets: both values end up in the public JavaScript bundle by design. Row level security is what protects the data.

5. Re-run the **Deploy to GitHub Pages** workflow.

For local development, put the same two values in `.env.local` (ignored by git). Without them, `npm run dev` skips saving and logs `[submission] Supabase is not configured`. Production builds refuse to continue without them.

## Security model

- The public key can only **insert** the columns listed in `supabase/schema.sql`. It cannot read, update or delete rows, or set `id`/`created_at`.
- Check constraints reject blank or over-long values, malformed emails, missing consent and unknown results, even if someone bypasses the form.
- Staff read entries in the Supabase **Table Editor** and export them as CSV. Limit dashboard access to the people who need it.
- Known limitation: anyone can send rows directly to the public endpoint, so spam is possible. If that happens, add Cloudflare Turnstile verified by a Supabase Edge Function.

## Viewing and deleting data

- **Export:** Table Editor → `quiz_submissions` → Export → CSV.
- **Marketing:** the form does not ask for marketing consent, and the notice says data is for internal use only. Check with compliance before sending these contacts marketing emails.
- **Withdrawal, access or correction requests:** find the row by email in the Table Editor, then update or delete it.
- **Retention:** once the retention period is agreed, schedule automatic deletion. Example for 12 months, run in the SQL editor after enabling the `pg_cron` extension:

  ```sql
  select cron.schedule(
    'purge-quiz-submissions',
    '0 3 * * *',
    $$delete from public.quiz_submissions where created_at < now() - interval '12 months'$$
  );
  ```

## PDPA checklist

The notice is compliance's approved wording (2026-10-14), shown without tick-boxes at compliance's request.

- [x] Compliance approved the notice wording in `src/data/privacyNotice.ts` (2026-10-14).
- [x] No `[TO CONFIRM: …]` placeholders remain. A content test fails if one is added, and the deploy runs the tests, so a placeholder can never go live.
- [x] Compliance decided on no tick-boxes (2026-10-14).
- [ ] Confirm that requiring details to take the quiz is acceptable under PDPA section 14(2)(a) (consent may not be required beyond what is reasonable to provide the service).
- [ ] Bump `privacyNotice.version` whenever the notice or form changes.
- [ ] Agree on the retention period and schedule deletion.
- [ ] Add the Supabase project to the data breach response plan. Breaches likely to cause significant harm, or affecting 500 or more people, must be notified to the PDPC within 3 calendar days of assessment.
