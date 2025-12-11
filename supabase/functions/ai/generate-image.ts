// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getOpenRouterKeys } from "../_utils/keyRotation.ts";

interface ImageGenerationPayload {
  prompt: string;
  size?: string;
  quality?: string;
  style?: string;
  provider?: string;
  model?: string;
  options?: Record<string, any>;
}

// Serve the function
serve(async (req) => {
  try {
    // Parse request body
    const payload: ImageGenerationPayload = await req.json();
    
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
    
    const provider = payload.provider || "openai";
    
    switch (provider.toLowerCase()) {
      case "openai":
        apiKey = Deno.env.get("OPENAI_API_KEY") || "";
        apiUrl = "https://api.openai.com/v1/images/generations";
        headers["Authorization"] = `Bearer ${apiKey}`;
        break;
        
      case "openrouter":
        // Get all available OpenRouter keys
        const openRouterKeys = [];
        for (let i = 1; i <= 21; i++) {
          const key = Deno.env.get(`OPENROUTER_KEY_${i}`);
          if (key) openRouterKeys.push(key);
        }
        
        // Use first available key or fallback
        apiKey = openRouterKeys.length > 0 ? openRouterKeys[0] : Deno.env.get("OPENROUTER_API_KEY") || "";
        
        apiUrl = "https://openrouter.ai/api/v1/images/generations";
        headers["Authorization"] = `Bearer ${apiKey}`;
        headers["HTTP-Referer"] = Deno.env.get("CLIENT_URL") || "https://trendtacticsdigital.com";
        headers["X-Title"] = "Trendtactics Digital Tools";
        break;
        
      default:
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: "Unsupported provider for image generation" 
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
    const requestBody = {
      prompt: payload.prompt,
      model: payload.model || (provider === "openai" ? "dall-e-3" : "openai/dall-e-3"),
      n: 1,
      size: payload.size || "1024x1024",
      quality: payload.quality || "standard",
      style: payload.style || "vivid",
      response_format: "url",
      ...payload.options
    };
    
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
    
    // Extract image URL
    let imageUrl = "";
    if (data.data?.[0]?.url) {
      imageUrl = data.data[0].url;
    } else {
      throw new Error("Invalid response format from AI API");
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          url: imageUrl,
          prompt: payload.prompt,
          model: requestBody.model,
          size: requestBody.size
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
    console.error("AI Image Generation Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "AI image generation error" 
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