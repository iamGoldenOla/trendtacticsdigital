// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";

interface LoginPayload {
  email: string;
  password: string;
}

// Serve the function
serve(async (_req) => {
  try {
    // Parse request body
    const payload: LoginPayload = await _req.json();
    
    // Validate required fields
    if (!payload.email || !payload.password) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Email and password are required" 
        }), 
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    });
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Invalid credentials" 
        }), 
        { 
          status: 401, 
          headers: { 
            "Content-Type": "application/json" 
          }
        }
      );
    }
    
    // Update last login in users table
    await supabase
      .from("users")
      .update({ last_login: new Date() })
      .eq("id", data.user.id);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        data: {
          user: data.user,
          session: data.session
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