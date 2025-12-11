# Secure Testing Guide

## Setting Up Environment Variables

### 1. Create a .env file
Rename `.env.example` to `.env` and add your actual Supabase credentials:

```bash
# .env file
SUPABASE_URL=https://wtgwxnhnqdnbzpetltrt.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA
```

### 2. Never commit .env to version control
Add `.env` to your `.gitignore` file to prevent accidental commits:

```gitignore
# Environment variables
.env
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run tests
```bash
node supabase-auth-test.js
```

## Security Best Practices

### What's Safe:
- ✅ Using the anon key in client-side testing
- ✅ Storing keys in environment variables
- ✅ Using .env files for local development

### What's NOT Safe:
- ❌ Committing API keys to version control
- ❌ Using service role keys in client-side code
- ❌ Hardcoding keys in source files

## Test Script Security Features

The updated `supabase-auth-test.js` now:
1. Loads credentials from environment variables
2. Falls back to safe defaults if env vars aren't set
3. Only uses the anon key for client-side operations
4. Never exposes service role keys

## Supabase Edge Functions Security

Your Edge Functions properly require authentication for all operations, which:
- Prevents unauthorized access
- Protects your AI resources
- Ensures only legitimate requests are processed
- Provides enterprise-level security

## Troubleshooting

### Common Issues:
1. **401 Unauthorized**: Check your anon key
2. **Module not found**: Run `npm install` first
3. **Environment variables not loading**: Ensure .env file is in the correct location

### Debugging Tips:
1. Add `console.log` statements to verify environment variables are loaded
2. Check that your .env file is in the project root
3. Verify your Supabase project URL is correct