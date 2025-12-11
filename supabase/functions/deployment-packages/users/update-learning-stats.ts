// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "../_utils/auth.ts";

interface UpdateLearningStatsPayload {
  totalTime?: number;
  completedCourse?: boolean;
  activity?: boolean;
}

// Serve the function
serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Parse request body
    const payload: UpdateLearningStatsPayload = await req.json();
    
    // Fetch current stats
    const { data: currentStats, error: fetchError } = await supabase
      .from("learning_stats")
      .select("*")
      .eq("user_id", user.id)
      .single();
    
    if (fetchError) {
      throw new Error(fetchError.message);
    }
    
    // Prepare fields to update
    const fieldsToUpdate: Record<string, any> = {
      last_activity: new Date().toISOString()
    };
    
    // Update total learning time
    if (payload.totalTime !== undefined) {
      fieldsToUpdate.total_learning_time = (currentStats.total_learning_time || 0) + payload.totalTime;
    }
    
    // Update courses completed
    if (payload.completedCourse) {
      fieldsToUpdate.courses_completed = (currentStats.courses_completed || 0) + 1;
    }
    
    // Update activity streak
    if (payload.activity) {
      // Check if last activity was yesterday to maintain streak
      const lastActivity = new Date(currentStats.last_activity);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Reset time parts for comparison
      lastActivity.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      yesterday.setHours(0, 0, 0, 0);
      
      if (lastActivity.getTime() === yesterday.getTime()) {
        // Continue streak
        fieldsToUpdate.current_streak = (currentStats.current_streak || 0) + 1;
        // Update longest streak if needed
        if (fieldsToUpdate.current_streak > (currentStats.longest_streak || 0)) {
          fieldsToUpdate.longest_streak = fieldsToUpdate.current_streak;
        }
      } else if (lastActivity.getTime() !== today.getTime()) {
        // Reset streak if last activity wasn't today or yesterday
        fieldsToUpdate.current_streak = 1;
        // Update longest streak if needed
        if (fieldsToUpdate.current_streak > (currentStats.longest_streak || 0)) {
          fieldsToUpdate.longest_streak = fieldsToUpdate.current_streak;
        }
      }
      // If last activity was today, we don't change the streak
    }
    
    // Update learning stats
    const { data: updatedStats, error: updateError } = await supabase
      .from("learning_stats")
      .update(fieldsToUpdate)
      .eq("user_id", user.id)
      .select()
      .single();
    
    if (updateError) {
      throw new Error(updateError.message);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Learning stats updated successfully",
        data: updatedStats
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
    
    console.error("Update Learning Stats Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to update learning stats" 
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