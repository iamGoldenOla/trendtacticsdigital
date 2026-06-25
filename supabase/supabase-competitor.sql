-- Database migration for Step 1: Brand Competitor Analyzer

-- Create table to store competitor analysis data
CREATE TABLE IF NOT EXISTS competitor_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID, -- References your clients/leads table
    domain VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    competitors JSONB NOT NULL, -- Holds competitor detail list
    swot_analysis JSONB NOT NULL, -- Holds swot components (strengths, weaknesses, opportunities, threats)
    positioning_strategy TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable row-level security (RLS) if required
ALTER TABLE competitor_analyses ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous insert (since it can be triggered from public contact flows/quiz)
CREATE POLICY "Allow public inserts" ON competitor_analyses
    FOR INSERT WITH CHECK (true);

-- Policy to allow authenticated reads (e.g. TrendyAI dashboard view)
CREATE POLICY "Allow authenticated read access" ON competitor_analyses
    FOR SELECT TO authenticated USING (true);
