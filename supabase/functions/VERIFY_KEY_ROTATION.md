# Key Rotation Verification Guide

This guide helps you verify that your OpenRouter key rotation implementation is working correctly.

## 🎯 Objective

Verify that all 21 OpenRouter API keys are properly configured and accessible to your Edge Functions.

## 🔍 Verification Methods

### 1. Environment Variable Check

In your Supabase Dashboard, navigate to Settings → Configuration → Environment Variables and verify:

- [ ] `OPENROUTER_KEY_1` is set
- [ ] `OPENROUTER_KEY_2` is set
- [ ] `OPENROUTER_KEY_3` is set
- [ ] ...
- [ ] `OPENROUTER_KEY_21` is set

All keys should be marked as "Secret" for security.

### 2. Utility Function Test

Create a temporary test function to verify key rotation:

```typescript
// test-key-rotation.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getOpenRouterKeys } from "./_utils/keyRotation.ts";

serve(async (_req) => {
  try {
    const keys = getOpenRouterKeys();
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Found ${keys.length} OpenRouter keys`,
        keyCount: keys.length,
        hasKeys: keys.length > 0,
        sampleKeyPresent: keys.length > 0 ? "****" + keys[0].slice(-4) : null
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
        message: err.message
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
```

Deploy this function and call it to verify key detection.

### 3. Round-Robin Test

Modify one of your AI functions temporarily to test round-robin selection:

```typescript
// In your chat.ts or similar function
let lastIndex = -1;

// Inside your function
const keys = getOpenRouterKeys();
if (keys.length > 1) {
  const result = getNextKey(keys, lastIndex);
  apiKey = result.key;
  lastIndex = result.nextIndex;
  
  // Log for testing (remove in production)
  console.log(`Using key index: ${result.nextIndex}`);
} else {
  apiKey = keys[0] || Deno.env.get("OPENROUTER_API_KEY") || "";
}
```

Call the function multiple times to verify it rotates through different keys.

### 4. Random Selection Test

Test random key selection:

```typescript
// In your function
const keys = getOpenRouterKeys();
const apiKey = getRandomKey(keys);
console.log(`Randomly selected key: ****${apiKey.slice(-4)}`);
```

## 🧪 Manual Testing Procedure

### Step 1: Deploy Test Function

1. Create the test function above
2. Deploy it to Supabase as `test-key-rotation`
3. Call the endpoint:

```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/test-key-rotation
```

Expected response:
```json
{
  "success": true,
  "message": "Found 21 OpenRouter keys",
  "keyCount": 21,
  "hasKeys": true,
  "sampleKeyPresent": "****XXXX"
}
```

### Step 2: Load Distribution Test

Call your AI functions multiple times (10-20 times) and monitor:

1. Supabase function logs
2. OpenRouter API usage dashboard
3. Response times

You should see:
- [ ] Even distribution across keys
- [ ] No single key being overused
- [ ] Consistent response times
- [ ] No rate limiting errors

### Step 3: Failure Handling Test

Temporarily invalidate one of your OpenRouter keys and test:

1. Change one key's value to something invalid
2. Call your AI function multiple times
3. Verify it continues to work using other keys

Expected behavior:
- [ ] Function continues to work
- [ ] Invalid key is skipped
- [ ] Other keys are used successfully

## 📊 Monitoring Key Usage

### Supabase Logs

Monitor your function logs in Supabase Dashboard:

1. Navigate to Functions → [Your Function] → Logs
2. Look for key usage patterns
3. Check for any key-related errors

### OpenRouter Dashboard

Check your OpenRouter dashboard for:

- [ ] Balanced usage across all 21 keys
- [ ] No single key hitting rate limits
- [ ] Consistent request distribution

## 🔧 Troubleshooting

### No Keys Detected

If `getOpenRouterKeys()` returns an empty array:

1. Verify environment variable names match exactly:
   - `OPENROUTER_KEY_1` through `OPENROUTER_KEY_21`
2. Check that variables are set as "Secret" in Supabase
3. Confirm keys have valid values

### Uneven Distribution

If keys aren't being distributed evenly:

1. Check your key selection logic
2. Verify `getNextKey()` or `getRandomKey()` is being called
3. Monitor usage patterns over time

### Rate Limiting

If you're still hitting rate limits:

1. Add more OpenRouter keys (up to 21)
2. Implement request queuing or delays
3. Contact OpenRouter for higher limits

## ✅ Success Criteria

Key rotation is working when:

- [ ] All 21 keys are detected by utility functions
- [ ] Keys are rotated evenly across requests
- [ ] No single key hits rate limits
- [ ] Functions continue working even if some keys fail
- [ ] Response times remain consistent
- [ ] No authentication errors in logs

## 🗑 Cleanup

After verification:

1. Remove the test function
2. Revert any temporary logging changes
3. Document your findings

## 📈 Optimization Tips

1. **Monitor Usage**: Regularly check key usage distribution
2. **Add More Keys**: If you're approaching limits, add more keys
3. **Implement Smart Rotation**: Consider usage-based rather than just round-robin
4. **Handle Failures Gracefully**: Skip failed keys automatically
5. **Log Key Performance**: Track which keys perform best

Your key rotation implementation is now verified and ready for production use!