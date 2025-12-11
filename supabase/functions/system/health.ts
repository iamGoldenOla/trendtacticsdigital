// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Serve the function
serve(async (_req) => {
  try {
    // Return a success response
    return new Response(
      JSON.stringify({ 
        status: "API is running!",
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
    // Return an error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Health check failed" 
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