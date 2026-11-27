-- Client reviews table. Run once in Supabase → SQL Editor.
create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  invite_id    text not null unique,            -- one review per invite link
  name         text not null check (char_length(name) <= 100),
  role         text not null default 'Client',
  company      text not null default '',
  service      text not null default 'Full-Stack Web App',
  rating       int  not null check (rating between 1 and 5),
  comment      text not null check (char_length(comment) <= 3000),
  avatar_url   text,
  linkedin_url text,
  project_url  text,
  verified     boolean not null default true,
  status       text not null default 'published' check (status in ('published', 'hidden')),
  created_at   timestamptz not null default now()
);

-- No policies on purpose: the public cannot read or write this table directly.
-- Only the site's server routes, using the secret key, can access it.
alter table public.reviews enable row level security;

-- Give the server's secret key (service_role) access. Newer projects don't grant this automatically.
grant select, insert, update, delete on table public.reviews to service_role;

-- Make the Supabase API pick up the new table right away.
notify pgrst, 'reload schema';
