-- =========================================================================
-- APNA LIBRARY — Supabase Database Schema (Phase 2)
-- -------------------------------------------------------------------------
-- KAISE USE KAREIN:
-- 1. https://supabase.com par free account banao → "New Project"
-- 2. Project khulne ke baad left sidebar mein "SQL Editor" kholo
-- 3. Ye poori file copy-paste karke "Run" dabao
-- 4. Isse saari tables + security rules ban jayengi
-- =========================================================================

-- ---------- EXAMS ----------
-- overview / eligibility / pattern ab jsonb hain: {"hg":"...","en":"...","hi":"...","bn":"...","mr":"..."}
-- Admin panel form isi shape mein save karta hai. Khaali language ho to
-- website automatically English/Hinglish dikhati hai (fallback logic frontend mein hai).
create table exams (
  id text primary key,                 -- e.g. 'nda', 'ssc-cgl'
  name text not null,
  full_name text,
  category text not null,
  trending boolean default false,
  overview jsonb default '{}',
  eligibility jsonb default '{}',
  pattern jsonb default '{}',
  official_website text,
  apply_link text,
  links jsonb default '[]',            -- array of {label,url,type,year,subject,status,note}
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- CATEGORIES ----------
-- name bhi jsonb hai: {"hg":"Defence","en":"Defence","hi":"रक्षा","bn":"প্রতিরক্ষা","mr":"संरक्षण"}
create table categories (
  id text primary key,
  name jsonb not null,
  icon text,
  color text
);

-- ---------- NOTIFICATIONS ----------
create table notifications (
  id uuid primary key default gen_random_uuid(),
  exam_id text references exams(id) on delete set null,
  title text not null,
  tag text,                            -- New / Update / Admit Card / Answer Key / Result / Apply
  date date default now(),
  pdf_url text,
  created_at timestamptz default now()
);

-- ---------- GALLERY ----------
create table gallery (
  id uuid primary key default gen_random_uuid(),
  url text not null,                   -- Supabase Storage public URL
  caption text,
  category text,                       -- Campus / Library / Events / Achievements
  created_at timestamptz default now()
);

-- ---------- QUERIES (from the "Have a Question" form) ----------
create table queries (
  id uuid primary key default gen_random_uuid(),
  name text,
  mobile text,
  email text,
  exam_category text,
  message text,
  status text default 'new',           -- new / replied / closed
  created_at timestamptz default now()
);

-- ---------- SITE SETTINGS (single row: contact info, slider text, director msg) ----------
-- director_message jsonb hai (multi-language); baaki fields (address/phone/email) same
-- rehte hain sabhi languages mein — inhe translate karne ki zaroorat nahi hoti.
create table site_settings (
  id int primary key default 1,
  address text,
  phone text,
  email text,
  working_hours text,
  whatsapp_number text,
  director_message jsonb default '{}',
  director_name text,
  map_embed_url text,
  constraint single_row check (id = 1)
);
insert into site_settings (id) values (1);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS)
-- Public (website visitors) → sirf READ kar sakte hain
-- Admin (logged in) → sab kuch READ/WRITE kar sakta hai
-- =========================================================================
alter table exams enable row level security;
alter table categories enable row level security;
alter table notifications enable row level security;
alter table gallery enable row level security;
alter table queries enable row level security;
alter table site_settings enable row level security;

-- Public read access
create policy "Public can read exams" on exams for select using (true);
create policy "Public can read categories" on categories for select using (true);
create policy "Public can read notifications" on notifications for select using (true);
create policy "Public can read gallery" on gallery for select using (true);
create policy "Public can read settings" on site_settings for select using (true);

-- Public can INSERT queries only (submit the contact form) — cannot read others' queries
create policy "Public can submit queries" on queries for insert with check (true);

-- Admin (any authenticated/logged-in user) full access
create policy "Admin full access exams" on exams for all using (auth.role() = 'authenticated');
create policy "Admin full access categories" on categories for all using (auth.role() = 'authenticated');
create policy "Admin full access notifications" on notifications for all using (auth.role() = 'authenticated');
create policy "Admin full access gallery" on gallery for all using (auth.role() = 'authenticated');
create policy "Admin full access queries" on queries for all using (auth.role() = 'authenticated');
create policy "Admin full access settings" on site_settings for all using (auth.role() = 'authenticated');

-- =========================================================================
-- STORAGE (for gallery images + notification PDFs)
-- Ye Supabase Dashboard → Storage section mein manually banana hoga:
--   1. Bucket name: "gallery"  → Public bucket ON
--   2. Bucket name: "documents" → Public bucket ON  (PYQ/notification PDFs)
-- =========================================================================
