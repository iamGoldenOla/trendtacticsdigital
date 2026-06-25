/**
 * AI Sales Engineer & Project Proposal Service
 * Evaluates project descriptions and outputs a structured proposal and pricing estimate
 */

const aiService = require('./aiService');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

class ProposalService {
    /**
     * Generate dynamic pricing estimate and features based on project details
     */
    async generateProposal(projectName, description, budgetRange, timelinePreference, clientId = null) {
        if (!projectName || !description) {
            throw new Error('Project name and description are required');
        }

        const prompt = `Act as an AI Sales Engineer. Create a detailed project proposal and cost breakdown for:
        Project Name: "${projectName}"
        Description: "${description}"
        Budget Range Preference: "${budgetRange || 'Flexible'}"
        Timeline Preference: "${timelinePreference || 'Standard'}"
        
        Generate the required features, a detailed line-item cost breakdown (pricing), and estimated total cost.
        
        You MUST format your output as a valid JSON object matching this schema exactly:
        {
          "project_name": "string",
          "description": "string",
          "timeline": "string (e.g. 6-8 weeks)",
          "features": [
             { "name": "Feature Title", "description": "Quick feature overview" }
          ],
          "pricing_breakdown": [
             { "item": "Design/Development Task Name", "cost": 1500 }
          ],
          "total_estimated_cost": 4500
        }
        
        Ensure the JSON is well-formed, clean, and has no additional markdown blocks around it. Ensure the sum of costs in pricing_breakdown matches the total_estimated_cost.`;

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
            console.error('Failed to parse AI Proposal JSON response:', parseError);
            throw new Error('AI failed to return valid structured proposal data. Please try again.');
        }

        // Store in Supabase
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('proposals')
                    .insert([
                        {
                            client_id: clientId,
                            project_name: parsedData.project_name,
                            description: parsedData.description,
                            budget_range: budgetRange,
                            timeline: parsedData.timeline,
                            features: parsedData.features,
                            pricing_breakdown: parsedData.pricing_breakdown,
                            total_estimated_cost: parsedData.total_estimated_cost
                        }
                    ])
                    .select();

                if (error) throw error;
                parsedData.dbRecord = data[0];
            } catch (dbError) {
                console.warn('Could not save proposal in Supabase:', dbError.message);
            }
        }

        return parsedData;
    }
}

module.exports = new ProposalService();
