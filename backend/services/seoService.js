/**
 * SEO Sitemap & Keyword Strategist Service
 * Handles keyword grouping, programmatic landing page sitemaps, and content outlines
 */

const aiService = require('./aiService');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

class SEOService {
    /**
     * Generate programmatic SEO sitemaps and keywords list
     */
    async generateStrategy(domain, services, locations, clientId = null) {
        if (!domain || !services || !locations) {
            throw new Error('Domain, services, and target locations are required');
        }

        const servicesArr = Array.isArray(services) ? services : [services];
        const locationsArr = Array.isArray(locations) ? locations : [locations];

        const prompt = `Perform a Programmatic SEO Sitemap and Keyword strategy for domain: "${domain}".
        Target Services: ${JSON.stringify(servicesArr)}
        Target Locations: ${JSON.stringify(locationsArr)}
        
        Generate a list of recommended programmatic URLs combining services + locations. For each URL, suggest a targeted Page Title.
        Provide a list of targeted keyword clusters (high-volume, low-difficulty keywords) mapped to the services.
        
        You MUST format your output as a valid JSON object matching this schema exactly:
        {
          "sitemap_structure": [
            { "url": "/services/service-name/location-name", "title": "Targeted Page Title" }
          ],
          "keywords": [
            { "cluster": "Keyword Cluster Name", "intent": "commercial", "terms": ["keyword1", "keyword2"] }
          ]
        }
        
        Ensure the JSON is well-formed, clean, and has no additional markdown blocks around it.`;

        const aiResponse = await aiService.getAIResponse(prompt, {
            provider: 'openrouter',
            temperature: 0.7,
            maxTokens: 1500
        });

        let parsedData;
        try {
            const cleanedContent = aiResponse.content
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            parsedData = JSON.parse(cleanedContent);
        } catch (parseError) {
            console.error('Failed to parse AI SEO JSON response:', parseError);
            throw new Error('AI failed to return valid structured sitemap data. Please try again.');
        }

        // Store in Supabase
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('seo_strategies')
                    .insert([
                        {
                            client_id: clientId,
                            domain,
                            services: servicesArr,
                            locations: locationsArr,
                            sitemap_structure: parsedData.sitemap_structure,
                            keywords: parsedData.keywords
                        }
                    ])
                    .select();

                if (error) throw error;
                parsedData.dbRecord = data[0];
            } catch (dbError) {
                console.warn('Could not save SEO strategy in Supabase:', dbError.message);
            }
        }

        return parsedData;
    }
}

module.exports = new SEOService();
