-- Database migration for Step 4: Lead Scoring & Predictive Qualification

-- Create table to store generated lead scores and draft emails
CREATE TABLE IF NOT EXISTS lead_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID, -- References your clients/leads table
    lead_name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    budget_range VARCHAR(100),
    score_tier CHAR(1) NOT NULL, -- 'A', 'B', or 'C'
    confidence_score NUMERIC,
    justification TEXT,
    drafted_outreach TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE lead_scores ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies first
DROP POLICY IF EXISTS "Allow public inserts" ON lead_scores;
DROP POLICY IF EXISTS "Allow authenticated read access" ON lead_scores;

-- Create policies
CREATE POLICY "Allow public inserts" ON lead_scores
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read access" ON lead_scores
    FOR SELECT TO authenticated USING (true);
