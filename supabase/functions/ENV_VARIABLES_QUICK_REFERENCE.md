# Supabase Environment Variables Quick Reference

This guide provides a quick reference for setting up all required environment variables in your Supabase project.

## Required Environment Variables

### Supabase Core Variables
These are automatically provided by Supabase but can be referenced:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for admin access
- `SUPABASE_ANON_KEY` - Anonymous key for client-side access

### Application Variables
- `CLIENT_URL` - Your frontend application URL (e.g., https://trendtacticsdigital.com)

### AI Provider Keys
#### OpenRouter Keys (Required - All 21)
- `OPENROUTER_KEY_1` through `OPENROUTER_KEY_21` - Your OpenRouter API keys

#### Optional AI Keys
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `GOOGLE_AI_API_KEY` - Google AI API key (optional)

## How to Set Environment Variables

1. Log in to your Supabase Dashboard
2. Select your project
3. Navigate to **Settings** → **Configuration** → **Environment Variables**
4. Click **"Add variable"**
5. Enter the variable name and value
6. Set visibility:
   - Public for client-side accessible variables
   - Secret for server-side only variables
7. Click **"Save"**

## Variable Visibility Guidelines

### Public Variables
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `CLIENT_URL`

### Secret Variables
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENROUTER_KEY_1` through `OPENROUTER_KEY_21`
- `OPENAI_API_KEY` (if used)
- `GOOGLE_AI_API_KEY` (if used)

## Verification Commands

After setting up your environment variables, you can verify them using:

```bash
# Check if variables are set (run in Supabase SQL Editor)
SELECT current_setting('app.settings.SUPABASE_URL');
SELECT current_setting('app.settings.CLIENT_URL');
```

Note: Secret variables cannot be viewed once set for security reasons.

## Troubleshooting

### Missing Variables
If functions fail with "missing environment variable" errors:
1. Double-check variable names match exactly
2. Ensure all required variables are set
3. Restart affected functions after adding variables

### Incorrect Values
If functions behave unexpectedly:
1. Verify API keys are active and have proper permissions
2. Check URLs are correct and accessible
3. Confirm variable values don't contain extra spaces or quotes

## Best Practices

1. **Never hardcode** API keys in your source code
2. **Use descriptive names** for custom variables
3. **Keep secrets secret** - only expose what's necessary to the client
4. **Regularly rotate** API keys for security
5. **Document custom variables** for team reference

Your environment is now ready for deploying Supabase Edge Functions!