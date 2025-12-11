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
    
    // Fetch user learning statistics
    const { data: stats, error } = await supabase
      .from("learning_stats")
      .select("*")
      .eq("user_id", user.id)
      .single();
    
    if (error) {
      // If no stats exist, create default stats
      const { data: newStats, error: insertError } = await supabase
        .from("learning_stats")
        .insert({
          user_id: user.id,
          total_courses_enrolled: 0,
          courses_completed: 0,
          total_learning_time: 0,
          current_streak: 0,
          longest_streak: 0,
          last_activity: new Date().toISOString()
        })
        .select()
        .single();
      
      if (insertError) {
        throw new Error(insertError.message);
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          data: newStats
        }),
        {
          status: 200,
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: stats
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
    
    console.error("Get Learning Stats Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to fetch learning stats" 
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