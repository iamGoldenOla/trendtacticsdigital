/**
 * Secure API Key Manager
 * Handles multiple API keys with rotation, failover, and rate limiting
 * Can load keys from Environment Variables or Supabase system_settings table
 */

const { supabase, isSupabaseConfigured } = require('../config');

class ApiKeyManager {
    constructor() {
        this.keys = {
            openrouter: [],
            openai: process.env.OPENAI_API_KEY,
            google: process.env.GOOGLE_AI_API_KEY,
            anthropic: process.env.ANTHROPIC_API_KEY
        };

        this.usage = new Map();
        this.lastRotation = Date.now();
        this.rotationInterval = parseInt(process.env.API_KEY_ROTATION_INTERVAL) || 3600000; // 1 hour default

        // Initial load
        this.loadKeys();
    }

    /**
     * Load all keys from all sources
     */
    async loadKeys() {
        // 1. Load from Environment Variables
        this.keys.openrouter = this.loadOpenRouterKeysFromEnv();

        // 2. Load from Supabase (if configured)
        if (isSupabaseConfigured && supabase) {
            try {
                const { data, error } = await supabase
                    .from('system_settings')
                    .select('key_name, key_value')
                    .like('key_name', 'OPENROUTER_KEY_%');

                if (!error && data) {
                    data.forEach(item => {
                        // Check if already loaded from env to avoid duplicates
                        if (!this.keys.openrouter.find(k => k.key === item.key_value)) {
                            this.keys.openrouter.push({
                                key: item.key_value,
                                label: `Supabase: ${item.key_name}`,
                                usage: 0,
                                lastUsed: 0,
                                errors: 0
                            });
                        }
                    });
                    console.log(`✅ Loaded ${data.length} keys from Supabase`);
                }
            } catch (err) {
                console.error('Failed to load keys from Supabase:', err.message);
            }
        }
    }

    /**
     * Load OpenRouter API keys from environment variables
     */
    loadOpenRouterKeysFromEnv() {
        const keys = [];

        // Check primary key
        if (process.env.OPENROUTER_API_KEY) {
            keys.push({
                key: process.env.OPENROUTER_API_KEY,
                label: 'OpenRouter Primary (Env)',
                usage: 0,
                lastUsed: 0,
                errors: 0
            });
        }

        // Check numbered keys
        let i = 1;
        while (process.env[`OPENROUTER_KEY_${i}`]) {
            keys.push({
                key: process.env[`OPENROUTER_KEY_${i}`],
                label: `OpenRouter Key ${i} (Env)`,
                usage: 0,
                lastUsed: 0,
                errors: 0
            });
            i++;
        }

        return keys;
    }

    /**
     * Get the best available API key for a service
     */
    async getKey(service = 'openrouter') {
        if (service === 'openrouter') {
            // Re-sync if keys list is empty
            if (this.keys.openrouter.length === 0) {
                await this.loadKeys();
            }
            return this.getBestOpenRouterKey();
        }

        return this.keys[service] || null;
    }

    /**
     * Get the best OpenRouter key based on usage and errors
     */
    getBestOpenRouterKey() {
        if (!this.keys.openrouter || this.keys.openrouter.length === 0) {
            // Last resort: check env variable one more time
            if (process.env.OPENROUTER_API_KEY) {
                return { key: process.env.OPENROUTER_API_KEY };
            }
            throw new Error('No OpenRouter API keys configured');
        }

        // Sort by errors (ascending) then by usage (ascending)
        const sortedKeys = [...this.keys.openrouter].sort((a, b) => {
            if (a.errors !== b.errors) {
                return a.errors - b.errors;
            }
            return a.usage - b.usage;
        });

        return sortedKeys[0];
    }

    /**
     * Record API key usage
     */
    recordUsage(service, key, success = true) {
        if (service === 'openrouter') {
            const keyObj = this.keys.openrouter.find(k => k.key === key);
            if (keyObj) {
                keyObj.usage++;
                keyObj.lastUsed = Date.now();
                if (!success) {
                    keyObj.errors++;
                }
            }
        }
    }

    /**
     * Rotate API keys (called periodically)
     */
    rotateKeys() {
        const now = Date.now();
        if (now - this.lastRotation > this.rotationInterval) {
            // Reset usage counters
            this.keys.openrouter.forEach(key => {
                key.usage = 0;
                key.errors = 0;
            });
            this.lastRotation = now;

            // Reload from dynamic sources
            this.loadKeys();
        }
    }

    /**
     * Get API key statistics
     */
    getStats() {
        return {
            openrouter: this.keys.openrouter.map(k => ({
                label: k.label,
                usage: k.usage,
                errors: k.errors,
                lastUsed: k.lastUsed
            })),
            totalKeys: this.keys.openrouter.length,
            lastRotation: this.lastRotation
        };
    }
}

module.exports = new ApiKeyManager();