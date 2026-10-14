-- Quiz sign-ups for the Real Assets Personality Quiz.
-- Run once in the Supabase SQL editor of a project created in the
-- "Southeast Asia (Singapore)" region. See docs/LEAD_CAPTURE.md.
--
-- Security model: the public site holds only the publishable (anon) key, so the
-- anon role may INSERT the listed columns and nothing else. It cannot read,
-- update or delete rows. Staff view entries in the Supabase dashboard.
-- The check constraints mirror src/lib/participant.ts.

create table public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null
    check (char_length(btrim(name)) between 1 and 100),
  company text not null
    check (char_length(btrim(company)) between 1 and 150),
  email text not null
    check (char_length(email) <= 254 and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  personal_data_consent boolean not null
    check (personal_data_consent),
  marketing_opt_in boolean not null default false,
  notice_version text not null
    check (char_length(notice_version) between 1 and 40),
  primary_result text not null
    check (primary_result in ('real-estate', 'infrastructure', 'commodities', 'natural-resources')),
  secondary_result text
    check (secondary_result in ('real-estate', 'infrastructure', 'commodities', 'natural-resources'))
);

comment on table public.quiz_submissions is
  'Personal data collected under the PDPA notice identified by notice_version.';

alter table public.quiz_submissions enable row level security;

revoke all on table public.quiz_submissions from anon, authenticated;

grant insert (
  name,
  company,
  email,
  personal_data_consent,
  marketing_opt_in,
  notice_version,
  primary_result,
  secondary_result
) on table public.quiz_submissions to anon;

create policy "Quiz visitors can submit entries"
  on public.quiz_submissions
  for insert
  to anon
  with check (true);
