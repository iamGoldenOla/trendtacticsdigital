# AI API Key Rotation Guide

This guide explains how to set up and use API key rotation for AI services in your Supabase Edge Functions.

## Supported Providers

The Edge Functions support key rotation for the following AI providers:

1. **OpenRouter** - Supports up to 21 API keys
2. OpenAI (single key)
3. Google AI (single key)

## Setting Up Key Rotation

### OpenRouter Key Rotation

To enable key rotation for OpenRouter:

1. **Add your keys as environment variables** in the Supabase Dashboard:
   ```
   OPENROUTER_KEY_1=sk-or-v1-firstkeyvalue
   OPENROUTER_KEY_2=sk-or-v1-secondkeyvalue
   OPENROUTER_KEY_3=sk-or-v1-thirdkeyvalue
   ...
   OPENROUTER_KEY_21=sk-or-v1-twentyfirstkeyvalue
   ```

2. **Fallback key** (optional):
   ```
   OPENROUTER_API_KEY=sk-or-v1-fallbackkeyvalue
   ```

The functions will automatically detect and use all available numbered keys (OPENROUTER_KEY_1 through OPENROUTER_KEY_21).

### Other Providers

For OpenAI and Google AI, single keys are used:
```
OPENAI_API_KEY=sk-your-openai-key
GOOGLE_AI_API_KEY=your-google-ai-key
```

## How Key Rotation Works

### Current Implementation

Currently, the functions use the **first available key** from your list:
- Checks for OPENROUTER_KEY_1 through OPENROUTER_KEY_21
- Falls back to OPENROUTER_API_KEY if no numbered keys are found
- Uses the first key found for all requests

### Future Enhancements

Planned improvements include:
1. **Round-robin rotation** - Cycle through keys evenly
2. **Load-based selection** - Choose keys based on usage
3. **Failure fallback** - Automatically switch to backup keys on failures
4. **Rate limit monitoring** - Track usage per key to optimize rotation

## Benefits of Key Rotation

1. **Rate Limit Distribution** - Spread requests across multiple keys
2. **Improved Reliability** - Automatic failover when keys hit limits
3. **Better Performance** - Load distribution across multiple accounts
4. **Enhanced Security** - Reduced impact if a single key is compromised

## Testing Key Rotation

To verify your keys are properly configured:

1. Deploy your Edge Functions
2. Test an AI endpoint:
   ```bash
   curl -X POST https://your-project.supabase.co/functions/v1/ai/chat \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"prompt": "Hello, world!", "provider": "openrouter"}'
   ```

3. Check Supabase function logs for any key-related errors

## Troubleshooting

### No Keys Detected

If your functions aren't detecting your keys:
1. Verify environment variable names match exactly
2. Check that keys are set in the Supabase Dashboard
3. Redeploy functions after adding keys

### Rate Limit Errors

If you're hitting rate limits:
1. Add more OpenRouter keys
2. Space out requests in your application
3. Implement client-side rate limiting

### Invalid Key Format

Ensure your keys follow the correct format:
- OpenRouter: `sk-or-v1-` followed by alphanumeric characters
- OpenAI: `sk-` followed by alphanumeric characters
- Google AI: Alphanumeric API key string

## Security Best Practices

1. **Never commit keys** to version control
2. **Use the Supabase Dashboard** for environment variables
3. **Regularly rotate keys** for enhanced security
4. **Monitor usage** to detect unusual activity
5. **Use least-privilege keys** when possible

## Example Environment Setup

In Supabase Dashboard → Settings → Configuration → Environment Variables:

```
OPENROUTER_KEY_1=sk-or-v1-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4
OPENROUTER_KEY_2=sk-or-v1-z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d7c6
OPENROUTER_KEY_3=sk-or-v1-1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4
OPENROUTER_API_KEY=sk-or-v1-fallbackkeyvalue

OPENAI_API_KEY=sk-proj-yourkeyhere
GOOGLE_AI_API_KEY=your-google-ai-key-here

CLIENT_URL=https://yourdomain.com
```

With this setup, your AI functions will automatically use your OpenRouter keys with built-in support for expansion to full rotation functionality.