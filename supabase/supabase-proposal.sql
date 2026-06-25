-- Database migration for Step 3: AI Sales Engineer & Project Proposal Generator

-- Create table to store generated proposals
CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID, -- References your clients/leads table
    project_name VARCHAR(255) NOT NULL,
    description TEXT,
    budget_range VARCHAR(100),
    timeline VARCHAR(100),
    features JSONB NOT NULL, -- Detailed features requested
    pricing_breakdown JSONB NOT NULL, -- Cost line items
    total_estimated_cost NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies first
DROP POLICY IF EXISTS "Allow public inserts" ON proposals;
DROP POLICY IF EXISTS "Allow authenticated read access" ON proposals;

-- Create policies
CREATE POLICY "Allow public inserts" ON proposals
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read access" ON proposals
    FOR SELECT TO authenticated USING (true);
