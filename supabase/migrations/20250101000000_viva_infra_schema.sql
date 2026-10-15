-- ==============================================================================
-- Viva Infra — Architecture, Construction & Infrastructure Database Schema
-- Supabase PostgreSQL Migration with Row Level Security (RLS)
-- File: supabase/migrations/20250101000000_viva_infra_schema.sql
-- ==============================================================================

-- 1. Helper function for updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 2. Projects Table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  title_ta text not null,
  category text not null check (category in ('residential', 'commercial', 'renovation')),
  status text not null check (status in ('completed', 'in_progress', 'concept')),
  location text not null,
  location_ta text not null,
  summary text not null,
  summary_ta text not null,
  description text not null,
  description_ta text not null,
  scope jsonb not null default '[]'::jsonb,
  scope_ta jsonb not null default '[]'::jsonb,
  specifications jsonb not null default '{}'::jsonb,
  architectural_style text not null,
  architectural_style_ta text not null,
  accent_color text not null default '#A9563B',
  featured boolean not null default false,
  year integer not null default 2025,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Trigger for projects.updated_at
drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row
  execute function public.handle_updated_at();

-- 3. Project Images Table
create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade not null,
  image_url text not null,
  caption text,
  caption_ta text,
  is_hero boolean not null default false,
  display_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Services Table
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  title_ta text not null,
  short_desc text not null,
  short_desc_ta text not null,
  full_desc text not null,
  full_desc_ta text not null,
  target_audience text not null,
  target_audience_ta text not null,
  scope_items jsonb not null default '[]'::jsonb,
  scope_items_ta jsonb not null default '[]'::jsonb,
  deliverables jsonb not null default '[]'::jsonb,
  deliverables_ta jsonb not null default '[]'::jsonb,
  typical_timeline text not null,
  typical_timeline_ta text not null,
  icon_name text not null,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Testimonials Table (Honest Demonstration Reviews)
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  author_ta text not null,
  role_or_project text not null,
  role_or_project_ta text not null,
  location text not null,
  location_ta text not null,
  quote text not null,
  quote_ta text not null,
  year integer not null default 2024,
  project_type text not null,
  is_demo_review boolean not null default true,
  approved boolean not null default true,
  display_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Team Members Table (Demonstration Profiles)
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_ta text not null,
  role text not null,
  role_ta text not null,
  bio text not null,
  bio_ta text not null,
  experience_years integer not null default 10,
  credentials text not null,
  is_demo_profile boolean not null default true,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. FAQs Table
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('process', 'costing', 'approvals', 'quality')),
  question text not null,
  question_ta text not null,
  answer text not null,
  answer_ta text not null,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Enquiries Table (Submissions with Strict Privacy Controls)
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  project_type text not null check (project_type in ('residential', 'commercial', 'renovation', 'villa')),
  project_location text not null,
  approximate_budget text,
  expected_timeline text,
  requirements text not null,
  is_demo_submission boolean not null default false,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'closed')),
  client_ip text,
  user_agent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Site Settings Table
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ==============================================================================
create index if not exists idx_projects_slug on public.projects(slug);
create index if not exists idx_projects_category on public.projects(category);
create index if not exists idx_projects_featured on public.projects(featured);
create index if not exists idx_projects_published on public.projects(published);
create index if not exists idx_project_images_project_id on public.project_images(project_id);
create index if not exists idx_services_slug on public.services(slug);
create index if not exists idx_services_published on public.services(published);
create index if not exists idx_faqs_category on public.faqs(category);
create index if not exists idx_faqs_published on public.faqs(published);
create index if not exists idx_testimonials_approved on public.testimonials(approved);
create index if not exists idx_team_members_published on public.team_members(published);
create index if not exists idx_enquiries_created_at on public.enquiries(created_at desc);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.team_members enable row level security;
alter table public.faqs enable row level security;
alter table public.enquiries enable row level security;
alter table public.site_settings enable row level security;

-- Drop existing policies if they exist to allow clean rerun
drop policy if exists "Public can view published projects" on public.projects;
drop policy if exists "Public can view project images of published projects" on public.project_images;
drop policy if exists "Public can view published services" on public.services;
drop policy if exists "Public can view approved testimonials" on public.testimonials;
drop policy if exists "Public can view published team members" on public.team_members;
drop policy if exists "Public can view published faqs" on public.faqs;
drop policy if exists "Public can view site settings" on public.site_settings;
drop policy if exists "Public can submit validated enquiries" on public.enquiries;
drop policy if exists "Staff can view enquiries" on public.enquiries;
drop policy if exists "Staff can update enquiries" on public.enquiries;

-- Public can read only published / approved website content
create policy "Public can view published projects" on public.projects
  for select
  using (published = true);

create policy "Public can view project images of published projects" on public.project_images
  for select
  using (
    exists (
      select 1 from public.projects
      where projects.id = project_images.project_id
      and projects.published = true
    )
  );

create policy "Public can view published services" on public.services
  for select
  using (published = true);

create policy "Public can view approved testimonials" on public.testimonials
  for select
  using (approved = true);

create policy "Public can view published team members" on public.team_members
  for select
  using (published = true);

create policy "Public can view published faqs" on public.faqs
  for select
  using (published = true);

create policy "Public can view site settings" on public.site_settings
  for select
  using (true);

-- ENQUIRIES TABLE PRIVACY:
-- 1. Anonymous visitors CANNOT select, read, or browse any customer enquiries.
-- 2. Anonymous visitors can ONLY insert their own consultation brief, protected with validation.
create policy "Public can submit validated enquiries" on public.enquiries
  for insert
  to anon, authenticated
  with check (
    length(trim(full_name)) >= 2 and
    length(trim(full_name)) <= 120 and
    length(trim(email)) >= 5 and
    length(trim(email)) <= 150 and
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' and
    length(trim(phone)) >= 7 and
    length(trim(phone)) <= 25 and
    length(trim(project_location)) >= 2 and
    length(trim(requirements)) >= 10 and
    length(trim(requirements)) <= 3000 and
    project_type in ('residential', 'commercial', 'renovation', 'villa')
  );

-- Only authenticated staff / admin users can view private customer enquiries
create policy "Staff can view enquiries" on public.enquiries
  for select
  to authenticated
  using (true);

-- Only authenticated staff / admin users can update enquiry statuses
create policy "Staff can update enquiries" on public.enquiries
  for update
  to authenticated
  using (true)
  with check (true);
