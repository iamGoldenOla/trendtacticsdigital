-- Database migration for Step 5: Social Media Campaign Blueprint & Image Prompt Generator

-- Create table to store generated campaign calendars
CREATE TABLE IF NOT EXISTS social_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID, -- References your clients/leads table
    topic VARCHAR(255) NOT NULL,
    target_audience VARCHAR(255),
    campaign_duration VARCHAR(50),
    platforms JSONB NOT NULL, -- Target platforms array
    content_calendar JSONB NOT NULL, -- Generated list of posts, captions, prompts
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE social_campaigns ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies first
DROP POLICY IF EXISTS "Allow public inserts" ON social_campaigns;
DROP POLICY IF EXISTS "Allow authenticated read access" ON social_campaigns;

-- Create policies
CREATE POLICY "Allow public inserts" ON social_campaigns
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read access" ON social_campaigns
    FOR SELECT TO authenticated USING (true);
