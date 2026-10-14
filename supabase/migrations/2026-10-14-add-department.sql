-- Adds the required "Team / department" field to an existing quiz_submissions
-- table. Run once in the Supabase SQL editor BEFORE deploying the form that
-- sends it; until then the database would reject every entry.
-- (Fresh projects get this column from supabase/schema.sql instead.)

alter table public.quiz_submissions
  add column department text;

-- NOT VALID: rows saved before this change have no department and are left
-- as they are; every new row must include one.
alter table public.quiz_submissions
  add constraint quiz_submissions_department_check
  check (department is not null and char_length(btrim(department)) between 1 and 100)
  not valid;

grant insert (department) on table public.quiz_submissions to anon;
