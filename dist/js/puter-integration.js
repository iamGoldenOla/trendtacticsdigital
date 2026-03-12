// Puter.js Integration Manager
// This file handles the global initialization and management of Puter.js AI features

class PuterManager {
    constructor() {
        this.isReady = false;
        this.retryCount = 0;
        this.maxRetries = 5;
        this.init();
    }

    async init() {
        console.log('Initializing Puter.js Manager...');
        // Wait for Puter.js to be available
        await this.waitForPuter();
        if (this.isReady) {
            console.log('Puter.js Manager initialized successfully');
            this.setupGlobalFunctions();
            this.testConnection();
        } else {
            console.error('Puter.js Manager failed to initialize');
        }
    }

    async waitForPuter() {
        return new Promise((resolve) => {
            const checkPuter = () => {
                console.log('Checking for Puter.js...', typeof puter, puter ? 'Found' : 'Not found');
                if (typeof puter !== 'undefined' && puter && puter.ai) {
                    console.log('Puter.js found with AI capabilities');
                    this.isReady = true;
                    resolve();
                } else if (this.retryCount < this.maxRetries) {
                    this.retryCount++;
                    console.log('Waiting for Puter.js... Attempt ' + this.retryCount + '/' + this.maxRetries);
                    setTimeout(checkPuter, 2000);
                } else {
                    console.error('Puter.js failed to load after maximum retries');
                    resolve();
                }
            };
            checkPuter();
        });
    }

    async testConnection() {
        try {
            console.log('Testing Puter.js connection...');
            const testResponse = await puter.ai.chat('Hello, this is a test message.');
            console.log('Puter.js test successful:', testResponse.substring(0, 50) + '...');
        } catch (error) {
            console.error('Puter.js test failed:', error);
            this.isReady = false;
        }
    }

    setupGlobalFunctions() {
        console.log('Setting up global AI functions...');
        // Make AI functions available globally
        window.aiChat = async (prompt) => {
            if (!this.isReady) {
                throw new Error('Puter.js not ready');
            }
            try {
                console.log('Sending AI request:', prompt.substring(0, 50) + '...');
                const response = await puter.ai.chat(prompt);
                console.log('AI response received:', response.substring(0, 50) + '...');
                return response;
            } catch (error) {
                console.error('AI Chat error:', error);
                throw error;
            }
        };

        window.aiPrint = (message) => {
            if (!this.isReady) {
                console.log('Puter.js not ready, using console.log instead');
                console.log(message);
                return;
            }
            try {
                puter.print(message);
            } catch (error) {
                console.error('AI Print error:', error);
                console.log(message);
            }
        };

        // Add a simple test function
        window.testPuterAI = async () => {
            try {
                console.log('Testing Puter.js AI...');
                window.aiPrint('Loading...');
                const response = await window.aiChat('What is life?');
                window.aiPrint(response);
                console.log('Test completed successfully');
                return response;
            } catch (error) {
                console.error('Test failed:', error);
                return 'AI service temporarily unavailable';
            }
        };
    }

    // Helper function to check if AI is available
    isAIAvailable() {
        return this.isReady;
    }

    // Function to get AI response with fallback
    async getAIResponse(prompt, fallbackResponse = 'AI service temporarily unavailable') {
        console.log('Getting AI response for:', prompt.substring(0, 50) + '...');
        if (!this.isReady) {
            console.log('Puter.js not ready, using fallback');
            return fallbackResponse;
        }
        try {
            const response = await puter.ai.chat(prompt);
            console.log('AI response received successfully');
            return response;
        } catch (error) {
            console.error('AI request failed:', error);
            return fallbackResponse;
        }
    }
}

// Initialize the manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing PuterManager...');
    window.puterManager = new PuterManager();
});

// Also initialize if the script is loaded after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded (delayed), initializing PuterManager...');
        window.puterManager = new PuterManager();
    });
} else {
    console.log('DOM already ready, initializing PuterManager immediately...');
    window.puterManager = new PuterManager();
} 