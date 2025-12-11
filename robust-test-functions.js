// Robust Node.js test script for Supabase functions
// Run with: node robust-test-functions.js

const https = require('https');

// Configuration
const SUPABASE_URL = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

// Utility function for making HTTP requests with timeout and retry
function makeRequest(url, options = {}, postData = null, retries = 3, timeout = 10000) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        
        function attemptRequest() {
            attempts++;
            
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
            
            // Set timeout
            req.setTimeout(timeout, () => {
                req.destroy();
                if (attempts < retries) {
                    console.log(`Attempt ${attempts} timed out, retrying...`);
                    setTimeout(attemptRequest, 1000);
                } else {
                    reject(new Error(`Request timed out after ${retries} attempts`));
                }
            });
            
            req.on('error', (e) => {
                if (attempts < retries) {
                    console.log(`Attempt ${attempts} failed: ${e.message}, retrying...`);
                    setTimeout(attemptRequest, 1000);
                } else {
                    reject(e);
                }
            });
            
            if (postData) {
                req.write(postData);
            }
            
            req.end();
        }
        
        attemptRequest();
    });
}

// Test functions
async function testHealthFunction(authToken = null) {
    console.log('=== Testing Health Function ===');
    try {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        // Add auth header if provided
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        
        const result = await makeRequest(`${FUNCTIONS_URL}/health`, {
            method: 'GET',
            headers: headers
        });
        
        console.log('Status:', result.statusCode);
        console.log('Response:', JSON.stringify(result.data, null, 2));
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
        
        // Registration should not require auth headers normally
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
            console.log('✅ Registration successful - token received');
            return result.data.data.token;
        }
        return null;
    } catch (error) {
        console.error('Registration Error:', error.message);
        return null;
    }
}

async function testLogin() {
    console.log('=== Testing Login ===');
    try {
        const postData = JSON.stringify({
            email: 'test@trendtacticsdigital.com',
            password: 'SecurePass123!'
        });
        
        const result = await makeRequest(`${FUNCTIONS_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, postData);
        
        console.log('Status:', result.statusCode);
        console.log('Response:', JSON.stringify(result.data, null, 2));
        
        if (result.data && result.data.success && result.data.data?.token) {
            console.log('✅ Login successful - token received');
            return result.data.data.token;
        }
        return null;
    } catch (error) {
        console.error('Login Error:', error.message);
        return null;
    }
}

async function testAnalyzeContent(authToken) {
    console.log('=== Testing Analyze Content Function ===');
    try {
        if (!authToken) {
            console.log('❌ No auth token provided - skipping test');
            return null;
        }
        
        const postData = JSON.stringify({
            content: 'This is a sample text to analyze for SEO and content quality.',
            contentType: 'text'
        });
        
        const headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'Authorization': `Bearer ${authToken}`
        };
        
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
    console.log('🚀 Starting Robust Supabase Functions Tests\n');
    
    // Test 1: Try health function without auth (should fail)
    console.log('--- Test 1: Health Function (No Auth) ---');
    await testHealthFunction();
    console.log('\n');
    
    // Test 2: Registration (should work without auth)
    console.log('--- Test 2: User Registration ---');
    const regToken = await testRegistration();
    console.log('\n');
    
    // Test 3: Login (alternative way to get token)
    console.log('--- Test 3: User Login ---');
    const loginToken = await testLogin();
    console.log('\n');
    
    // Use whichever token we got
    const authToken = regToken || loginToken;
    
    if (authToken) {
        console.log('✅ Got authentication token, proceeding with authenticated tests...\n');
        
        // Test 4: Health function with auth
        console.log('--- Test 4: Health Function (With Auth) ---');
        await testHealthFunction(authToken);
        console.log('\n');
        
        // Test 5: Analyze content with auth
        console.log('--- Test 5: Analyze Content (With Auth) ---');
        await testAnalyzeContent(authToken);
        console.log('\n');
    } else {
        console.log('❌ No authentication token obtained, skipping authenticated tests\n');
    }
    
    console.log('🏁 All tests completed!');
}

// Run the tests
runAllTests();