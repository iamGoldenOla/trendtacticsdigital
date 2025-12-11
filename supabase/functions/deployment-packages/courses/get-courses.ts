// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";

interface GetCoursesQuery {
  category?: string;
  level?: string;
  limit?: number;
  offset?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Serve the function
serve(async (req) => {
  try {
    // Parse query parameters
    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit");
    const offsetParam = url.searchParams.get("offset");
    
    let limit = limitParam ? parseInt(limitParam) : 10;
    let offset = offsetParam ? parseInt(offsetParam) : 0;
    
    // Validate limit
    if (isNaN(limit) || limit < 1 || limit > 100) {
      limit = 10;
    }
    
    // Validate offset
    if (isNaN(offset) || offset < 0) {
      offset = 0;
    }
    
    const queryParams: GetCoursesQuery = {
      category: url.searchParams.get("category") || undefined,
      level: url.searchParams.get("level") || undefined,
      limit: limit,
      offset: offset,
      search: url.searchParams.get("search") || undefined,
      sortBy: url.searchParams.get("sortBy") || "created_at",
      sortOrder: (url.searchParams.get("sortOrder") as "asc" | "desc") || "desc"
    };
    
    // Build query
    let query = supabase
      .from("courses")
      .select(`
        *,
        instructor:users(first_name, last_name, avatar),
        categories(name),
        lessons(count),
        enrollments(count)
      `)
      .eq("is_published", true);
    
    // Apply filters
    if (queryParams.category) {
      query = query.eq("category_id", queryParams.category);
    }
    
    if (queryParams.level) {
      query = query.eq("level", queryParams.level);
    }
    
    if (queryParams.search) {
      query = query.ilike("title", `%${queryParams.search}%`);
    }
    
    // Apply sorting
    query = query.order(queryParams.sortBy || "created_at", { 
      ascending: queryParams.sortOrder === "asc" 
    });
    
    // Apply pagination
    const { data, error, count } = await query
      .range(offset, offset + limit - 1);
    
    if (error) {
      throw new Error(error.message);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          courses: data,
          pagination: {
            limit: limit,
            offset: offset,
            total: count,
            hasMore: count ? (offset + limit) < count : false
          }
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
    console.error("Get Courses Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to fetch courses" 
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