-- Supabase Database Schema for Trendtactics Digital
-- Run this SQL in your Supabase SQL Editor

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  summary JSONB NOT NULL,
  answers JSONB NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_quiz_results_email ON quiz_results(email);

-- Create index on timestamp for sorting
CREATE INDEX IF NOT EXISTS idx_quiz_results_timestamp ON quiz_results(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (public can submit quiz results)
CREATE POLICY "Allow public inserts" ON quiz_results
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role to read all (for admin/backend)
CREATE POLICY "Allow service role read" ON quiz_results
  FOR SELECT
  USING (true);

-- Optional: Create a view for quiz analytics
CREATE OR REPLACE VIEW quiz_analytics AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_submissions,
  COUNT(DISTINCT email) as unique_emails,
  AVG(jsonb_array_length(answers)) as avg_answers_count
FROM quiz_results
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON quiz_results TO anon, authenticated;

