// Import the serve function from the standard library
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "../_utils/supabaseClient.ts";
import { requireAuth, getUserFromToken } from "../_utils/auth.ts";

interface UpdatePreferencesPayload {
  notificationEmails?: boolean;
  newsletterSubscription?: boolean;
  privacyLevel?: string;
  theme?: string;
  language?: string;
  timezone?: string;
}

// Serve the function
serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Parse request body
    const payload: UpdatePreferencesPayload = await req.json();
    
    // Prepare fields to update
    const fieldsToUpdate: Record<string, any> = {};
    
    if (payload.notificationEmails !== undefined) fieldsToUpdate.notification_emails = payload.notificationEmails;
    if (payload.newsletterSubscription !== undefined) fieldsToUpdate.newsletter_subscription = payload.newsletterSubscription;
    if (payload.privacyLevel !== undefined) fieldsToUpdate.privacy_level = payload.privacyLevel;
    if (payload.theme !== undefined) fieldsToUpdate.theme = payload.theme;
    if (payload.language !== undefined) fieldsToUpdate.language = payload.language;
    if (payload.timezone !== undefined) fieldsToUpdate.timezone = payload.timezone;
    
    // Update user preferences
    const { data: updatedPreferences, error } = await supabase
      .from("user_preferences")
      .upsert({
        user_id: user.id,
        ...fieldsToUpdate
      }, {
        onConflict: "user_id"
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Preferences updated successfully",
        data: updatedPreferences
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
    
    console.error("Update Preferences Error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || "Failed to update preferences" 
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