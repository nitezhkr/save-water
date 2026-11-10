-- =====================================================================
-- EVERY DROP — SUPABASE DATABASE SCHEMA FOR LIVE WATER PLEDGES
-- =====================================================================
-- Run this script in your Supabase Dashboard: SQL Editor -> New Query -> Run

-- 1. Create the pledges table
CREATE TABLE IF NOT EXISTS public.pledges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL DEFAULT 'Alex Morgan',
    guardian_title TEXT NOT NULL DEFAULT 'Earth Guardian 2050',
    commitments TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create index for fast count queries
CREATE INDEX IF NOT EXISTS idx_pledges_created_at ON public.pledges(created_at);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies
-- Allow anyone (anonymous visitors) to submit a pledge
CREATE POLICY "Allow anonymous insert to pledges"
ON public.pledges
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to read pledges count & records
CREATE POLICY "Allow public read on pledges"
ON public.pledges
FOR SELECT
TO anon, authenticated
USING (true);

-- 5. Enable Realtime updates (so the counter animates live for all visitors)
ALTER PUBLICATION supabase_realtime ADD TABLE public.pledges;

