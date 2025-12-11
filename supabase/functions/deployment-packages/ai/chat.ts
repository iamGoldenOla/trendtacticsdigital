// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getOpenRouterKeys } from "../_utils/keyRotation.ts";

interface ChatPayload {
  prompt: string;
  provider?: string;
  model?: string;
  options?: Record<string, any>;
}

// Serve the function
serve(async (req) => {
  try {
    // Parse request body
    const payload: ChatPayload = await req.json();
    
    // Validate required fields
    if (!payload.prompt || typeof payload.prompt !== "string") {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Valid prompt is required" 
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
        // Get all available OpenRouter keys using our utility function
        const openRouterKeys = getOpenRouterKeys();
        
        // Use first available key or fallback
        apiKey = openRouterKeys.length > 0 ? openRouterKeys[0] : Deno.env.get("OPENROUTER_API_KEY") || "";
        
        // TODO: Implement key rotation logic here
        // For now, using the first key
        
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
    
    // Prepare request body
    let requestBody: Record<string, any>;
    
    if (provider === "google") {
      requestBody = {
        contents: [{
          parts: [{
            text: payload.prompt
          }]
        }],
        generationConfig: {
          maxOutputTokens: payload.options?.maxTokens || 1000,
          temperature: payload.options?.temperature || 0.7,
          ...payload.options?.generationConfig
        }
      };
    } else {
      requestBody = {
        model: payload.model || getDefaultModel(provider),
        messages: [{ role: "user", content: payload.prompt }],
        max_tokens: payload.options?.maxTokens || 1000,
        temperature: payload.options?.temperature || 0.7,
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
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          content,
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
    console.error("AI Chat Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "AI service error" 
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

function getDefaultModel(provider: string): string {
  switch (provider.toLowerCase()) {
    case "openrouter": return "mistralai/mistral-small";
    case "openai": return "gpt-3.5-turbo";
    case "google": return "gemini-1.5-flash";
    default: return "mistralai/mistral-small";
  }
}