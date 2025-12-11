// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth } from "../_utils/auth.ts";

// Serve the function
serve(async (req) => {
  try {
    // Get auth token
    const token = requireAuth(req);
    
    // Sign out using Supabase Auth
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Logout failed" 
        }), 
        { 
          status: 500, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Logged out successfully"
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
    if (err.message === "Missing or invalid Authorization header") {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Unauthorized" 
        }), 
        { 
          status: 401, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Internal server error" 
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