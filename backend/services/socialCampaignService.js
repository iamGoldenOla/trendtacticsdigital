/**
 * Social Media Campaign Blueprint & Image Prompt Service
 * Generates marketing calendars, captions, hashtags, and Midjourney prompts
 */

const aiService = require('./aiService');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

class SocialCampaignService {
    /**
     * Generate social media content calendar and prompts based on topic and target audience
     */
    async generateCampaign(topic, targetAudience, platforms, duration = '7 Days', clientId = null) {
        if (!topic || !targetAudience) {
            throw new Error('Topic and target audience are required');
        }

        const platformsArr = Array.isArray(platforms) ? platforms : [platforms];

        const prompt = `Generate a highly engaging, structured social media campaign calendar for:
        Topic: "${topic}"
        Target Audience: "${targetAudience}"
        Duration: "${duration}"
        Target Platforms: ${JSON.stringify(platformsArr)}
        
        For each day in the duration, provide a specific post title, platform, copy/caption, relevant hashtags, and a detailed visual prompt (suitable for Midjourney or DALL-E) to generate the matching post graphic.
        
        You MUST format your output as a valid JSON object matching this schema exactly:
        {
          "topic": "string",
          "target_audience": "string",
          "platforms": ["LinkedIn", "Instagram"],
          "content_calendar": [
             {
               "day": 1,
               "title": "Post Topic Title",
               "platform": "LinkedIn",
               "caption": "Post body text here with engaging hook",
               "hashtags": ["#marketing", "#trend"],
               "image_prompt": "A professional cinematic photo of... --ar 16:9"
             }
          ]
        }
        
        Ensure the JSON is well-formed, clean, and has no additional markdown blocks around it.`;

        const aiResponse = await aiService.getAIResponse(prompt, {
            provider: 'openrouter',
            temperature: 0.8,
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
            console.error('Failed to parse AI Social Campaign JSON response:', parseError);
            throw new Error('AI failed to return valid structured campaign data. Please try again.');
        }

        // Store in Supabase
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('social_campaigns')
                    .insert([
                        {
                            client_id: clientId,
                            topic,
                            target_audience: targetAudience,
                            campaign_duration: duration,
                            platforms: platformsArr,
                            content_calendar: parsedData.content_calendar
                        }
                    ])
                    .select();

                if (error) throw error;
                parsedData.dbRecord = data[0];
            } catch (dbError) {
                console.warn('Could not save campaign blueprint in Supabase:', dbError.message);
            }
        }

        return parsedData;
    }
}

module.exports = new SocialCampaignService();
