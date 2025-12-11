// Node.js test script for Supabase functions
// Run with: node test-functions-node.js

const https = require('https');

// Configuration
const SUPABASE_URL = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

// Utility function for making HTTP requests
function makeRequest(url, options = {}, postData = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: jsonData
                    });
                } catch (e) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        data: data
                    });
                }
            });
        });
        
        req.on('error', (e) => {
            reject(e);
        });
        
        if (postData) {
            req.write(postData);
        }
        
        req.end();
    });
}

// Test functions
async function testHealthFunction() {
    console.log('=== Testing Health Function ===');
    try {
        // Try without auth first
        let result = await makeRequest(`${FUNCTIONS_URL}/health`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Status (no auth):', result.statusCode);
        console.log('Response (no auth):', JSON.stringify(result.data, null, 2));
        
        // If that fails, try with a placeholder token
        if (result.statusCode === 401) {
            console.log('Retrying with auth...');
            result = await makeRequest(`${FUNCTIONS_URL}/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer placeholder-token'
                }
            });
            
            console.log('Status (with auth):', result.statusCode);
            console.log('Response (with auth):', JSON.stringify(result.data, null, 2));
        }
        
        return result.data;
    } catch (error) {
        console.error('Health Function Error:', error.message);
        return null;
    }
}

async function testRegistration() {
    console.log('=== Testing Registration ===');
    try {
        const postData = JSON.stringify({
            email: 'test@trendtacticsdigital.com',
            password: 'SecurePass123!',
            firstName: 'Test',
            lastName: 'User'
        });
        
        // Registration should not require auth headers
        const result = await makeRequest(`${FUNCTIONS_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, postData);
        
        console.log('Status:', result.statusCode);
        console.log('Response:', JSON.stringify(result.data, null, 2));
        
        if (result.data && result.data.success && result.data.data?.token) {
            return result.data.data.token;
        }
        return null;
    } catch (error) {
        console.error('Registration Error:', error.message);
        return null;
    }
}

async function testAnalyzeContent(token) {
    console.log('=== Testing Analyze Content Function ===');
    try {
        const postData = JSON.stringify({
            content: 'This is a sample text to analyze for SEO and content quality.',
            contentType: 'text'
        });
        
        const headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        };
        
        // Add authorization header if token is provided
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            // Try with placeholder token if no token provided
            headers['Authorization'] = 'Bearer placeholder-token';
        }
        
        const result = await makeRequest(`${FUNCTIONS_URL}/analyze-content`, {
            method: 'POST',
            headers: headers
        }, postData);
        
        console.log('Status:', result.statusCode);
        console.log('Response:', JSON.stringify(result.data, null, 2));
        return result.data;
    } catch (error) {
        console.error('Analyze Content Error:', error.message);
        return null;
    }
}

// Main test sequence
async function runAllTests() {
    console.log('🚀 Starting Supabase Functions Tests\n');
    
    // Test 1: Registration (this should work without auth)
    const token = await testRegistration();
    console.log('\n---\n');
    
    // Test 2: Health function (may require auth in your setup)
    await testHealthFunction();
    console.log('\n---\n');
    
    // Test 3: Analyze content (requires auth)
    await testAnalyzeContent(token);
    
    console.log('\n🏁 All tests completed!');
}

// Run the tests
runAllTests();