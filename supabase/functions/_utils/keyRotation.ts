/**
 * Utility functions for API key rotation
 */

/**
 * Get all available OpenRouter keys from environment variables
 * @returns Array of available OpenRouter API keys
 */
export function getOpenRouterKeys(): string[] {
  const keys: string[] = [];
  
  // Check for numbered keys (OPENROUTER_KEY_1 through OPENROUTER_KEY_21)
  for (let i = 1; i <= 21; i++) {
    const key = Deno.env.get(`OPENROUTER_KEY_${i}`);
    if (key) {
      keys.push(key);
    }
  }
  
  // Add fallback key if no numbered keys found
  if (keys.length === 0) {
    const fallbackKey = Deno.env.get("OPENROUTER_API_KEY");
    if (fallbackKey) {
      keys.push(fallbackKey);
    }
  }
  
  return keys;
}

/**
 * Simple round-robin key selection
 * @param keys Array of available keys
 * @param lastIndex Last used key index (for round-robin)
 * @returns Selected key and next index
 */
export function getNextKey(keys: string[], lastIndex: number = -1): { key: string; nextIndex: number } {
  if (keys.length === 0) {
    throw new Error("No API keys available");
  }
  
  if (keys.length === 1) {
    return { key: keys[0], nextIndex: 0 };
  }
  
  const nextIndex = (lastIndex + 1) % keys.length;
  return { key: keys[nextIndex], nextIndex };
}

/**
 * Get a random key from available keys
 * @param keys Array of available keys
 * @returns Randomly selected key
 */
export function getRandomKey(keys: string[]): string {
  if (keys.length === 0) {
    throw new Error("No API keys available");
  }
  
  if (keys.length === 1) {
    return keys[0];
  }
  
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}