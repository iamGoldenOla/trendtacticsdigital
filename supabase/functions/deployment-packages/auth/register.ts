// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  city?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
}

// Serve the function
serve(async (_req) => {
  try {
    // Parse request body
    const payload: RegisterPayload = await _req.json();
    
    // Validate required fields
    if (!payload.firstName || !payload.lastName || !payload.email || !payload.password || !payload.country) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Missing required fields" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Sign up with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          first_name: payload.firstName,
          last_name: payload.lastName,
          country: payload.country,
          city: payload.city,
          phone: payload.phone,
          date_of_birth: payload.dateOfBirth,
          gender: payload.gender
        }
      }
    });
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: error.message 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Create user record in users table
    const { error: userError } = await supabase
      .from("users")
      .insert({
        id: data.user?.id,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        country: payload.country,
        city: payload.city,
        phone: payload.phone,
        date_of_birth: payload.dateOfBirth,
        gender: payload.gender,
        is_email_verified: data.user?.identities ? true : false
      });
    
    if (userError) {
      console.error("User creation error:", userError);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Registration successful. Please check your email for verification.",
        data: {
          user: data.user,
          session: data.session
        }
      }),
      {
        status: 201,
        headers: { 
          "Content-Type": "application/json" 
        }
      }
    );
    
  } catch (err) {
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