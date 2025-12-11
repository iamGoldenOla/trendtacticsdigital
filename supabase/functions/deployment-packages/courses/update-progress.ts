// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "../_utils/auth.ts";

interface ProgressPayload {
  enrollmentId: string;
  progress: number;
  lessonId?: string;
}

// Serve the function
serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Parse request body
    const payload: ProgressPayload = await req.json();
    
    // Validate required fields
    if (!payload.enrollmentId || payload.progress === undefined) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Enrollment ID and progress are required" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Validate progress range
    if (payload.progress < 0 || payload.progress > 100) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Progress must be between 0 and 100" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Check if enrollment exists and belongs to user
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("id, user_id, course_id, progress")
      .eq("id", payload.enrollmentId)
      .eq("user_id", user.id)
      .maybeSingle();
    
    if (enrollmentError || !enrollment) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Enrollment not found or unauthorized" 
        }), 
        { 
          status: 404, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Update progress
    const { data: updatedEnrollment, error: updateError } = await supabase
      .from("enrollments")
      .update({
        progress: payload.progress,
        last_accessed: new Date().toISOString()
      })
      .eq("id", payload.enrollmentId)
      .select()
      .single();
    
    if (updateError) {
      throw new Error(updateError.message);
    }
    
    // If progress is 100%, mark course as completed
    let completionDate = null;
    if (payload.progress === 100) {
      const { data: completedData, error: completedError } = await supabase
        .from("course_completions")
        .upsert({
          user_id: user.id,
          course_id: enrollment.course_id,
          completion_date: new Date().toISOString()
        }, {
          onConflict: "user_id, course_id"
        })
        .select()
        .single();
      
      if (!completedError && completedData) {
        completionDate = completedData.completion_date;
      }
    }
    
    // If lesson ID provided, mark lesson as completed
    if (payload.lessonId) {
      await supabase
        .from("lesson_progress")
        .upsert({
          user_id: user.id,
          lesson_id: payload.lessonId,
          enrollment_id: payload.enrollmentId,
          completed: true,
          completed_at: new Date().toISOString()
        }, {
          onConflict: "user_id, lesson_id"
        });
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Progress updated successfully",
        data: {
          ...updatedEnrollment,
          completion_date: completionDate
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
    
    console.error("Update Progress Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to update progress" 
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