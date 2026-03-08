import os
import re

def patch_hub():
    hub_path = "hub.html"
    
    with open(hub_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Inject supabase-utils.js into the head if missing
    if '<script src="js/supabase-utils.js"></script>' not in content:
        content = content.replace(
            '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>\n    <script src="js/supabase-utils.js"></script>'
        )

    # Standardize the script using window.supabaseUtils
    old_script_start = """        // Initialize Supabase client for authentication check
        const supabaseUrl = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
        const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA';
        const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);"""

    new_script_start = """        // Use the shared Supabase client
        const supabase = window.supabaseUtils.supabase;"""
        
    content = content.replace(old_script_start, new_script_start)

    with open(hub_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("Patched hub.html to use unified supabase client!")

if __name__ == "__main__":
    patch_hub()
