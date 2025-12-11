// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";

// Serve the function
serve(async (req) => {
  try {
    // Parse URL to get course ID
    const url = new URL(req.url);
    const courseId = url.searchParams.get("id");
    
    // Validate course ID
    if (!courseId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Course ID is required" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Fetch course details
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select(`
        *,
        instructor:users(first_name, last_name, avatar, bio),
        categories(name),
        lessons(*)
      `)
      .eq("id", courseId)
      .eq("is_published", true)
      .single();
    
    if (courseError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Course not found" 
        }), 
        { 
          status: 404, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Fetch enrollment count
    const { count: enrollmentCount, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true })
      .eq("course_id", courseId);
    
    // Fetch average rating
    const { data: ratingsData, error: ratingsError } = await supabase
      .from("course_ratings")
      .select("rating")
      .eq("course_id", courseId);
    
    let averageRating = 0;
    if (!ratingsError && ratingsData && ratingsData.length > 0) {
      const totalRating = ratingsData.reduce((sum, rating) => sum + rating.rating, 0);
      averageRating = totalRating / ratingsData.length;
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          ...course,
          enrollment_count: enrollmentCount || 0,
          average_rating: averageRating,
          total_ratings: ratingsData ? ratingsData.length : 0
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
    console.error("Get Course Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to fetch course" 
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