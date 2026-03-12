-- SQL Schema for Careers Page Job Applications
-- Run this in your Supabase SQL Editor

-- 1. Create the applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    position TEXT NOT NULL,
    resume_url TEXT, -- URL to the file in Supabase Storage
    message TEXT,
    status TEXT DEFAULT 'pending', -- pending, reviewing, accepted, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow anyone to submit an application
-- (Or restrict it if you want only logged-in users to apply)
CREATE POLICY "Enable insert for everyone" ON job_applications
    FOR INSERT WITH CHECK (true);

-- 4. Create a policy for admins to view applications
-- Replace 'admin-role' with your actual admin role check if applicable
CREATE POLICY "Admins can view all applications" ON job_applications
    FOR SELECT USING (auth.role() = 'service_role'); -- Service role or custom admin check

-- 5. STORAGE BUCKET INSTRUCTIONS
-- To handle file uploads (Resumes):
-- a. Go to "Storage" in Supabase Dashboard
-- b. Create a new bucket named "careers"
-- c. Set bucket to "Public" if you want public resume links (safe for hiring)
-- d. Or Keep it Private and use signed URLs for security.
