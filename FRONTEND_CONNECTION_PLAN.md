# Frontend Connection Plan

## Current Setup
- **Frontend**: Static HTML/CSS/JS deployed on cPanel
- **Backend**: Supabase with Edge Functions
- **Deployment**: GitHub integration with .htaccess

## Integration Steps

### 1. Add Supabase SDK to HTML Pages
```html
<!-- Add to <head> section of your HTML files -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### 2. Initialize Supabase Client
```javascript
// Add to your JavaScript files or inline scripts
const supabaseUrl = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const supabaseKey = 'YOUR_ANON_KEY'; // From your .env file
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
```

### 3. Connect Authentication Forms
- Update login.html to use `supabase.auth.signInWithPassword()`
- Update any signup forms to use `supabase.auth.signUp()`

### 4. Integrate Function Calls
- Update tools to call Edge Functions using `supabase.functions.invoke()`
- Examples: analyze-content, health, register functions

### 5. Handle User Sessions
- Add session checking to protected pages
- Implement logout functionality

## Files to Modify
1. login.html - Add authentication
2. Any signup forms - Add registration
3. tools.html - Add function calls
4. dashboard.html - Add user data fetching
5. Add a shared JavaScript file for common functions

## Security Considerations
- Store anon key in environment variables or server-side
- Never expose service role key in frontend
- Use .htaccess to restrict access to sensitive files

## Testing Approach
1. Test authentication flow
2. Test function calls
3. Test user data retrieval
4. Test session management

This approach connects your existing frontend to your Supabase backend without changing your current deployment setup.