/**
 * Secure AI Client
 * Frontend client that communicates with secure backend API
 * No API keys exposed in frontend code
 */

class SecureAIClient {
    constructor() {
        // Use window.location.hostname to detect environment
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.baseURL = isLocalhost 
            ? 'http://localhost:5000/api' 
            : 'https://trendtacticsdigital.com/api';
        this.retryAttempts = 3;
        this.retryDelay = 1000;
    }

    /**
     * Make a secure API request to the backend
     */
    async makeRequest(endpoint, data = {}, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        };

        let lastError;
        
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const response = await fetch(url, config);
                
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP ${response.status}`);
                }

                const result = await response.json();
                
                if (!result.success) {
                    throw new Error(result.message || 'API request failed');
                }

                return result.data;

            } catch (error) {
                lastError = error;
                console.warn(`AI request attempt ${attempt} failed:`, error.message);
                
                if (attempt < this.retryAttempts) {
                    await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
                }
            }
        }

        throw new Error(`All retry attempts failed. Last error: ${lastError.message}`);
    }

    /**
     * Get AI response for general chat
     */
    async getAIResponse(prompt, options = {}) {
        return await this.makeRequest('/ai/chat', {
            prompt,
            ...options
        });
    }

    /**
     * Generate headlines
     */
    async generateHeadlines(topic, count = 5, style = 'marketing') {
        return await this.makeRequest('/ai/tools/headline-generator', {
            topic,
            count,
            style
        });
    }

    /**
     * Generate hashtags
     */
    async generateHashtags(topic, platform = 'general', count = 10) {
        return await this.makeRequest('/ai/tools/hashtag-generator', {
            topic,
            platform,
            count
        });
    }

    /**
     * Optimize content
     */
    async optimizeContent(content, target = 'SEO and engagement', platform = 'social media') {
        return await this.makeRequest('/ai/tools/content-optimizer', {
            content,
            target,
            platform
        });
    }

    /**
     * Generate business strategy
     */
    async generateBusinessStrategy(business, industry = 'business', goals = 'growth', challenges = 'competition') {
        return await this.makeRequest('/ai/tools/business-strategy', {
            business,
            industry,
            goals,
            challenges
        });
    }

    /**
     * Get available models
     */
    async getAvailableModels() {
        try {
            const response = await fetch(`${this.baseURL}/ai/models`);
            const result = await response.json();
            return result.success ? result.data : {};
        } catch (error) {
            console.warn('Failed to get models:', error.message);
            return {};
        }
    }

    /**
     * Track tool usage for analytics
     */
    trackToolUsage(toolName) {
        try {
            const usage = JSON.parse(localStorage.getItem('toolUsage') || '{}');
            usage[toolName] = (usage[toolName] || 0) + 1;
            localStorage.setItem('toolUsage', JSON.stringify(usage));
        } catch (error) {
            console.warn('Failed to track tool usage:', error.message);
        }
    }

    /**
     * Show loading state
     */
    showLoading(element) {
        if (element) {
            element.innerHTML = `
                <div style="text-align:center;padding:2rem;">
                    <div style="display:inline-block;width:40px;height:40px;border:4px solid #f3f3f3;border-top:4px solid #00FFFF;border-radius:50%;animation:spin 1s linear infinite;"></div>
                    <p style="margin-top:1rem;color:#666;">AI is thinking...</p>
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
        }
    }

    /**
     * Show error state
     */
    showError(element, message) {
        if (element) {
            element.innerHTML = `
                <div style="text-align:center;padding:2rem;color:#d32f2f;">
                    <i class="fas fa-exclamation-triangle" style="font-size:2rem;margin-bottom:1rem;"></i>
                    <p><strong>Error:</strong> ${message}</p>
                    <p style="font-size:0.9rem;margin-top:1rem;">Please try again or contact support if the problem persists.</p>
                </div>
            `;
        }
    }

    /**
     * Format AI response for display
     */
    formatResponse(content) {
        // Convert markdown-style formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/^(\d+\.\s)/gm, '<strong>$1</strong>')
            .replace(/^(#{1,6})\s+(.*)/gm, (match, hashes, text) => {
                const level = hashes.length;
                return `<h${level}>${text}</h${level}>`;
            });
    }
}

// Create global instance
window.secureAIClient = new SecureAIClient();

// Backward compatibility - replace the old openRouterAIWithTracking function
window.openRouterAIWithTracking = async function(prompt, options = {}, toolName = 'Unknown Tool') {
    try {
        // Track usage
        window.secureAIClient.trackToolUsage(toolName);
        
        // Get AI response
        const response = await window.secureAIClient.getAIResponse(prompt, options);
        return response.content;
    } catch (error) {
        throw new Error(`AI request failed: ${error.message}`);
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecureAIClient;
} 