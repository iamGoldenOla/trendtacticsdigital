// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "../_utils/auth.ts";

interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  city?: string;
  dateOfBirth?: string;
  gender?: string;
  avatar?: string;
}

// Serve the function
serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Parse request body
    const payload: UpdateProfilePayload = await req.json();
    
    // Prepare fields to update
    const fieldsToUpdate: Record<string, any> = {};
    
    if (payload.firstName !== undefined) fieldsToUpdate.first_name = payload.firstName;
    if (payload.lastName !== undefined) fieldsToUpdate.last_name = payload.lastName;
    if (payload.bio !== undefined) fieldsToUpdate.bio = payload.bio;
    if (payload.phone !== undefined) fieldsToUpdate.phone = payload.phone;
    if (payload.city !== undefined) fieldsToUpdate.city = payload.city;
    if (payload.dateOfBirth !== undefined) fieldsToUpdate.date_of_birth = payload.dateOfBirth;
    if (payload.gender !== undefined) fieldsToUpdate.gender = payload.gender;
    if (payload.avatar !== undefined) fieldsToUpdate.avatar = payload.avatar;
    
    // Update user profile
    const { data, error } = await supabase
      .from("users")
      .update(fieldsToUpdate)
      .eq("id", user.id)
      .select();
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to update profile" 
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
        data: data[0]
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