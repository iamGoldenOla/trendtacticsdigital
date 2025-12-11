# Getting Your Supabase Credentials

## Step-by-Step Guide

### 1. Access Supabase Dashboard
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in with your account credentials
3. Select your "trendtacticsdigital" project

### 2. Navigate to API Settings
1. In the left sidebar, click on **"Settings"** (gear icon)
2. Click on **"API"** in the settings menu

### 3. Locate Your Credentials
You'll see the following information:

#### Project URL
```
https://wtgwxnhnqdnbzpetltrt.supabase.co
```

#### API Keys Section
You'll see two important keys:

1. **anon key** (public)
   - Used for client-side operations
   - Safe to use in frontend applications
   - Looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

2. **service_role key** (secret)
   - Used for server-side/admin operations
   - Should NEVER be exposed in frontend code
   - Looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Update Test Scripts
Replace the placeholder values in `supabase-auth-test.js`:

```javascript
// Configuration - UPDATE THESE VALUES WITH YOUR ACTUAL KEYS
const SUPABASE_URL = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ACTUAL_ANON_KEY_HERE'; // From API settings
const SUPABASE_SERVICE_KEY = 'YOUR_ACTUAL_SERVICE_KEY_HERE'; // From API settings
```

### 5. Security Best Practices
- **Never commit API keys to version control**
- Use environment variables for storing keys
- Rotate keys periodically for security
- Use the least privileged key for each operation

### 6. Running the Tests
After updating your credentials:

```bash
# Install dependencies
npm install

# Run the authenticated tests
node supabase-auth-test.js
```

## Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Double-check your API keys
2. **404 Not Found**: Verify your project URL
3. **Network Errors**: Check your internet connection

### Need Help?
If you're having trouble finding your credentials:
1. Make sure you're in the correct Supabase project
2. Check that you have the necessary permissions
3. Contact Supabase support if issues persist