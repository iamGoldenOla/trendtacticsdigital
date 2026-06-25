/**
 * Competitor & Market Intelligence Service
 * Handles competitor identification, SWOT analysis, and positioning strategies
 */

const aiService = require('./aiService');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

class CompetitorService {
    /**
     * Perform competitor and SWOT analysis for a domain
     */
    async analyzeCompetitor(domain, industry, clientId = null) {
        if (!domain) {
            throw new Error('Target domain is required for analysis');
        }

        const prompt = `Perform a comprehensive competitor and SWOT analysis for the domain: "${domain}" in the "${industry || 'general digital'}" industry.
        Identify 3 major competitors. For each competitor, provide their domain, strengths, and weaknesses.
        Provide a complete SWOT analysis for "${domain}" (Strengths, Weaknesses, Opportunities, Threats).
        Finally, suggest a tailored digital positioning strategy.
        
        You MUST format your output as a valid JSON object matching this schema exactly:
        {
          "competitors": [
            { "name": "Competitor Name", "domain": "competitor.com", "strengths": ["strength1", "strength2"], "weaknesses": ["weakness1"] }
          ],
          "swot_analysis": {
            "strengths": ["s1", "s2"],
            "weaknesses": ["w1", "w2"],
            "opportunities": ["o1", "o2"],
            "threats": ["t1", "t2"]
          },
          "positioning_strategy": "Detailed strategy text here..."
        }
        
        Ensure the JSON is well-formed, clean, and has no additional markdown blocks around it.`;

        // Request OpenRouter response using the standard failover queue
        const aiResponse = await aiService.getAIResponse(prompt, {
            provider: 'openrouter',
            temperature: 0.7,
            maxTokens: 1500
        });

        let parsedData;
        try {
            // Clean up any potential markdown wrapped formatting in LLM output
            const cleanedContent = aiResponse.content
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            parsedData = JSON.parse(cleanedContent);
        } catch (parseError) {
            console.error('Failed to parse AI Competitor JSON response:', parseError);
            throw new Error('AI failed to return valid structured data. Please try again.');
        }

        // Store in Supabase if database connection is available
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('competitor_analyses')
                    .insert([
                        {
                            client_id: clientId,
                            domain,
                            industry,
                            competitors: parsedData.competitors,
                            swot_analysis: parsedData.swot_analysis,
                            positioning_strategy: parsedData.positioning_strategy
                        }
                    ])
                    .select();

                if (error) throw error;
                parsedData.dbRecord = data[0];
            } catch (dbError) {
                console.warn('Could not save competitor analysis in Supabase:', dbError.message);
            }
        }

        return parsedData;
    }
}

module.exports = new CompetitorService();
