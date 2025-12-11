// test-key-rotation.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getOpenRouterKeys, getNextKey, getRandomKey } from "./keyRotation.ts";

serve(async (_req) => {
  try {
    // Test getOpenRouterKeys function
    const keys = getOpenRouterKeys();
    
    // Test getNextKey function
    let nextKeyResult = null;
    let randomKeyResult = null;
    
    if (keys.length > 0) {
      // Test round-robin selection
      nextKeyResult = getNextKey(keys, -1);
      
      // Test random selection
      randomKeyResult = getRandomKey(keys);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Found ${keys.length} OpenRouter keys`,
        keyCount: keys.length,
        hasKeys: keys.length > 0,
        sampleKeys: keys.length > 0 ? keys.map((key, index) => `KEY_${index + 1}: ****${key.slice(-4)}`) : [],
        nextKeyTest: nextKeyResult ? {
          keyPreview: `****${nextKeyResult.key.slice(-4)}`,
          nextIndex: nextKeyResult.nextIndex
        } : null,
        randomKeyTest: randomKeyResult ? `****${randomKeyResult.slice(-4)}` : null
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