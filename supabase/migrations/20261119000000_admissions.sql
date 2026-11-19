-- Admissions applications for Gopal Bilingual International College.
-- Run once in Supabase Dashboard > SQL Editor (or `supabase db push`).

create table if not exists public.applications (
  id          uuid primary key default gen_random_uuid(),
  ref         text not null unique,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  stage       text not null default 'new'
              check (stage in ('new','contacted','visit','tested','accepted','enrolled','declined')),
  lang        text not null default 'en' check (lang in ('en','fr')),
  student     jsonb not null,
  level       jsonb not null,
  start       smallint not null default 0,
  guardian    jsonb not null,
  prefs       jsonb not null default '{}'::jsonb,
  docs        jsonb not null default '[]'::jsonb,
  visit_at    text not null default '',
  scores      jsonb not null default '{"english":null,"french":null,"maths":null}'::jsonb,
  activity    jsonb not null default '[]'::jsonb
);

create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists applications_stage_idx on public.applications (stage);

-- Only the server (secret key, which bypasses RLS) may touch this table.
-- RLS on with no policies + no grants = the browser keys can never read applicant data.
alter table public.applications enable row level security;
revoke all on table public.applications from anon, authenticated;
