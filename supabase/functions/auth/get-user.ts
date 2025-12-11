// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "../_utils/auth.ts";

// Serve the function
serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Get extended user data from users table
    const { data: userData, error } = await supabase
      .from("users")
      .select(`
        *,
        subscriptions(*),
        user_preferences(*),
        user_enrollments(*),
        learning_stats(*)
      `)
      .eq("id", user.id)
      .single();
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to fetch user data" 
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
        data: userData
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