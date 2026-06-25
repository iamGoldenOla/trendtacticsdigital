/**
 * AI Lead Scoring & Qualification Service
 * Evaluates lead parameters and drafts a custom outreach email
 */

const aiService = require('./aiService');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

class LeadScoreService {
    /**
     * Score a lead based on project requirements, company size, and budget
     */
    async scoreLead(name, company, budgetRange, projectDescription, clientId = null) {
        if (!name || !projectDescription) {
            throw new Error('Lead name and project description are required');
        }

        const prompt = `Evaluate the following lead details for conversion potential:
        Lead Name: "${name}"
        Company: "${company || 'Not Provided'}"
        Budget Range: "${budgetRange || 'Flexible'}"
        Project Description: "${projectDescription}"
        
        Analyze the client potential. 
        Assign a score tier: 
        - "A" (High Value / Enterprise / Ready Budget)
        - "B" (Medium Value / Standard SMB Project)
        - "C" (Low Value / Underspecified / Small Budget)
        
        Draft a highly personalized, contextual first touch follow-up outreach email that sounds natural and professional, addressing their specific project goals.
        
        You MUST format your output as a valid JSON object matching this schema exactly:
        {
          "score_tier": "A",
          "confidence_score": 0.85,
          "justification": "Brief justification for why this tier was assigned",
          "drafted_outreach": "Subject: Outreach subject line\\n\\nDear name,\\n\\nEmail body text here..."
        }
        
        Ensure the JSON is well-formed, clean, and has no additional markdown blocks around it.`;

        const aiResponse = await aiService.getAIResponse(prompt, {
            provider: 'openrouter',
            temperature: 0.6,
            maxTokens: 1000
        });

        let parsedData;
        try {
            const cleanedContent = aiResponse.content
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            parsedData = JSON.parse(cleanedContent);
        } catch (parseError) {
            console.error('Failed to parse AI Lead Score JSON response:', parseError);
            throw new Error('AI failed to return valid structured lead qualification data. Please try again.');
        }

        // Store in Supabase
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('lead_scores')
                    .insert([
                        {
                            client_id: clientId,
                            lead_name: name,
                            company,
                            budget_range: budgetRange,
                            score_tier: parsedData.score_tier,
                            confidence_score: parsedData.confidence_score,
                            justification: parsedData.justification,
                            drafted_outreach: parsedData.drafted_outreach
                        }
                    ])
                    .select();

                if (error) throw error;
                parsedData.dbRecord = data[0];
            } catch (dbError) {
                console.warn('Could not save lead score in Supabase:', dbError.message);
            }
        }

        return parsedData;
    }
}

module.exports = new LeadScoreService();
