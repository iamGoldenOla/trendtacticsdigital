// Supabase Authenticated Test Script
// This script uses proper Supabase authentication
// You'll need to add your Supabase credentials to test properly

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuration - Loaded from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA'; // Get from Supabase Dashboard -> Settings -> API

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testSupabaseConnection() {
    console.log('=== Testing Supabase Connection ===');
    try {
        // Simple health check using Supabase client
        const { data, error } = await supabase.from('users').select('count').limit(1);
        
        if (error) {
            console.log('Connection test result (may show auth error which is expected):');
            console.log('Error:', error.message);
        } else {
            console.log('Connection successful - received data:', data);
        }
    } catch (error) {
        console.error('Connection test failed:', error.message);
    }
}

async function testUserRegistration() {
    console.log('\n=== Testing User Registration ===');
    try {
        // This simulates what your Edge Function should do
        const { data, error } = await supabase.auth.signUp({
            email: 'test@trendtacticsdigital.com',
            password: 'SecurePass123!'
        });
        
        if (error) {
            console.log('Registration result:');
            console.log('Error:', error.message);
            return null;
        } else {
            console.log('Registration successful:');
            console.log('User data:', JSON.stringify(data, null, 2));
            return data?.session?.access_token || null;
        }
    } catch (error) {
        console.error('Registration failed:', error.message);
        return null;
    }
}

async function testUserLogin() {
    console.log('\n=== Testing User Login ===');
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'test@trendtacticsdigital.com',
            password: 'SecurePass123!'
        });
        
        if (error) {
            console.log('Login result:');
            console.log('Error:', error.message);
            return null;
        } else {
            console.log('Login successful:');
            console.log('Session data:', JSON.stringify(data, null, 2));
            return data?.session?.access_token || null;
        }
    } catch (error) {
        console.error('Login failed:', error.message);
        return null;
    }
}

async function testDirectFunctionCall(token) {
    console.log('\n=== Testing Direct Function Call ===');
    try {
        if (!token) {
            console.log('No token provided - skipping direct function test');
            return;
        }
        
        // Test calling your analyze-content function directly
        const response = await fetch(`${SUPABASE_URL}/functions/v1/analyze-content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                content: 'Sample content for analysis',
                contentType: 'text'
            })
        });
        
        const result = await response.json();
        console.log('Function call result:');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Function call failed:', error.message);
    }
}

async function runAllTests() {
    console.log('🚀 Starting Supabase Authenticated Tests\n');
    
    // Test 1: Basic connection
    await testSupabaseConnection();
    
    // Test 2: User registration
    const token = await testUserRegistration();
    
    // Test 3: User login (alternative)
    const loginToken = token ? null : await testUserLogin();
    
    // Use whichever token we got
    const authToken = token || loginToken;
    
    // Test 4: Direct function call with token
    if (authToken) {
        await testDirectFunctionCall(authToken);
    }
    
    console.log('\n🏁 All tests completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Get your ANON_KEY and SERVICE_KEY from Supabase Dashboard');
    console.log('2. Update the script with your actual keys');
    console.log('3. Run the script again');
}

// Run the tests
runAllTests();