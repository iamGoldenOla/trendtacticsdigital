-- Database migration for Step 2: SEO Sitemap & Keyword Strategist

-- Create table to store SEO sitemaps and keywords
CREATE TABLE IF NOT EXISTS seo_strategies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID, -- References your clients/leads table
    domain VARCHAR(255) NOT NULL,
    services JSONB NOT NULL, -- Target services list
    locations JSONB NOT NULL, -- Target locations list
    sitemap_structure JSONB NOT NULL, -- Holds generated sitemap object array
    keywords JSONB NOT NULL, -- Holds keyword clusters JSON data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE seo_strategies ENABLE ROW LEVEL SECURITY;

-- Safely drop existing policies first
DROP POLICY IF EXISTS "Allow public inserts" ON seo_strategies;
DROP POLICY IF EXISTS "Allow authenticated read access" ON seo_strategies;

-- Create policies
CREATE POLICY "Allow public inserts" ON seo_strategies
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read access" ON seo_strategies
    FOR SELECT TO authenticated USING (true);
