// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getOpenRouterKeys } from "../_utils/keyRotation.ts";

interface ContentAnalysisPayload {
  content: string;
  analysisType: "sentiment" | "keywords" | "summary" | "seo" | "readability";
  provider?: string;
  model?: string;
  options?: Record<string, any>;
}

// Serve the function
serve(async (req) => {
  try {
    // Parse request body
    const payload: ContentAnalysisPayload = await req.json();
    
    // Validate required fields
    if (!payload.content || typeof payload.content !== "string") {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Valid content is required" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    if (!payload.analysisType || !isValidAnalysisType(payload.analysisType)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Valid analysisType is required (sentiment, keywords, summary, seo, readability)" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Get API key based on provider
    let apiKey = "";
    let apiUrl = "";
    let headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    
    const provider = payload.provider || "openrouter";
    
    switch (provider.toLowerCase()) {
      case "openrouter":
        // Get all available OpenRouter keys
        const openRouterKeys = [];
        for (let i = 1; i <= 21; i++) {
          const key = Deno.env.get(`OPENROUTER_KEY_${i}`);
          if (key) openRouterKeys.push(key);
        }
        
        // Use first available key or fallback
        apiKey = openRouterKeys.length > 0 ? openRouterKeys[0] : Deno.env.get("OPENROUTER_API_KEY") || "";
        
        apiUrl = "https://openrouter.ai/api/v1/chat/completions";
        headers["Authorization"] = `Bearer ${apiKey}`;
        headers["HTTP-Referer"] = Deno.env.get("CLIENT_URL") || "https://trendtacticsdigital.com";
        headers["X-Title"] = "Trendtactics Digital Tools";
        break;
        
      case "openai":
        apiKey = Deno.env.get("OPENAI_API_KEY") || "";
        apiUrl = "https://api.openai.com/v1/chat/completions";
        headers["Authorization"] = `Bearer ${apiKey}`;
        break;
        
      case "google":
        apiKey = Deno.env.get("GOOGLE_AI_API_KEY") || "";
        const model = payload.model || "gemini-1.5-flash";
        apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        break;
        
      default:
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: "Unsupported provider" 
          }), 
          { 
            status: 400, 
            headers: { 
              "Content-Type": "application/json" 
            }
          }
        );
    }
    
    // Create analysis prompt based on type
    const analysisPrompt = createAnalysisPrompt(payload.content, payload.analysisType);
    
    // Prepare request body
    let requestBody: Record<string, any>;
    
    if (provider === "google") {
      requestBody = {
        contents: [{
          parts: [{
            text: analysisPrompt
          }]
        }],
        generationConfig: {
          maxOutputTokens: payload.options?.maxTokens || 1000,
          temperature: payload.options?.temperature || 0.3,
          ...payload.options?.generationConfig
        }
      };
    } else {
      requestBody = {
        model: payload.model || getDefaultModel(provider),
        messages: [{ role: "user", content: analysisPrompt }],
        max_tokens: payload.options?.maxTokens || 1000,
        temperature: payload.options?.temperature || 0.3,
        ...payload.options
      };
    }
    
    // Call AI API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    // Extract response content
    let content = "";
    if (provider === "google" && data.candidates?.[0]?.content?.parts?.[0]?.text) {
      content = data.candidates[0].content.parts[0].text;
    } else if (data.choices?.[0]?.message?.content) {
      content = data.choices[0].message.content;
    } else {
      throw new Error("Invalid response format from AI API");
    }
    
    // Try to parse as JSON, fallback to plain text
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch {
      parsedContent = { result: content };
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          analysisType: payload.analysisType,
          result: parsedContent,
          model: payload.model || getDefaultModel(provider),
          usage: data.usage || data.usageMetadata || null
        }
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
    console.error("AI Content Analysis Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "AI content analysis error" 
      }), 
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
  }
});

function isValidAnalysisType(type: string): boolean {
  return ["sentiment", "keywords", "summary", "seo", "readability"].includes(type);
}

function createAnalysisPrompt(content: string, analysisType: string): string {
  const basePrompt = `Analyze the following content:

${content}

`;
  
  switch (analysisType) {
    case "sentiment":
      return `${basePrompt}Provide sentiment analysis in JSON format with these fields:
      {
        "sentiment": "positive|negative|neutral",
        "confidence": 0.0-1.0,
        "explanation": "brief explanation"
      }`;
      
    case "keywords":
      return `${basePrompt}Extract top 10 keywords in JSON format with these fields:
      {
        "keywords": ["keyword1", "keyword2", ...],
        "primary_topic": "main topic of the content"
      }`;
      
    case "summary":
      return `${basePrompt}Provide a concise summary in JSON format with these fields:
      {
        "summary": "concise summary of the content",
        "key_points": ["point1", "point2", ...]
      }`;
      
    case "seo":
      return `${basePrompt}Provide SEO analysis in JSON format with these fields:
      {
        "title_suggestions": ["title1", "title2"],
        "meta_description": "suggested meta description",
        "keywords": ["keyword1", "keyword2", ...],
        "readability_score": 0-100,
        "seo_recommendations": ["recommendation1", "recommendation2"]
      }`;
      
    case "readability":
      return `${basePrompt}Provide readability analysis in JSON format with these fields:
      {
        "readability_score": 0-100,
        "grade_level": "estimated grade level",
        "word_count": number,
        "sentence_count": number,
        "paragraph_count": number,
        "complexity": "low|medium|high",
        "improvement_suggestions": ["suggestion1", "suggestion2"]
      }`;
      
    default:
      return `${basePrompt}Analyze this content and provide insights.`;
  }
}

function getDefaultModel(provider: string): string {
  switch (provider.toLowerCase()) {
    case "openrouter": return "mistralai/mistral-small";
    case "openai": return "gpt-3.5-turbo";
    case "google": return "gemini-1.5-flash";
    default: return "mistralai/mistral-small";
  }
}