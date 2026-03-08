// test-supabase-login.js
// Simple test script to check Supabase connection and login functionality

console.log('Testing Supabase connection and login functionality...\n');

// Function to test basic Supabase connection
async function testSupabaseConnection() {
  console.log('1. Testing Supabase connection...');

  try {
    // Try to fetch the health endpoint
    const response = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/system/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('   Health check response:', data);

    if (response.ok) {
      console.log('   ✅ Supabase connection test PASSED\n');
      return true;
    } else {
      console.log('   ❌ Supabase connection test FAILED\n');
      return false;
    }
  } catch (error) {
    console.log('   ❌ Supabase connection test FAILED with error:', error.message);
    return false;
  }
}

// Function to test login functionality
async function testLoginFunctionality() {
  console.log('2. Testing login functionality...');

  try {
    // Try to call the login function
    const response = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword123'
      })
    });

    const data = await response.json();
    console.log('   Login response status:', response.status);
    console.log('   Login response data:', JSON.stringify(data, null, 2));

    if (response.status === 401) {
      console.log('   ✅ Login function is working (returned 401 for invalid credentials)\n');
      return true;
    } else if (response.ok) {
      console.log('   ⚠️  Login function returned unexpected success\n');
      return true;
    } else {
      console.log('   ❌ Login function test FAILED\n');
      return false;
    }
  } catch (error) {
    console.log('   ❌ Login function test FAILED with error:', error.message);
    return false;
  }
}

// Function to test frontend Supabase client
async function testFrontendClient() {
  console.log('3. Testing frontend Supabase client...');

  // Check if Supabase SDK is loaded
  if (typeof window !== 'undefined' && window.supabase) {
    console.log('   ✅ Supabase SDK is loaded');

    // Try to initialize client
    try {
      const supabaseUrl = 'https://wtgwxnhnqdnbzpetltrt.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Z3d4bmhucWRuYnpwZXRsdHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwNjQ2NjUsImV4cCI6MjA4MDY0MDY2NX0.3eblmq4lsnDQU33M9XqZpBqux9bi9hX2G0yUuPScHJA';

      const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
      console.log('   ✅ Frontend Supabase client initialized successfully\n');
      return true;
    } catch (error) {
      console.log('   ❌ Frontend Supabase client initialization FAILED:', error.message);
      return false;
    }
  } else {
    console.log('   ❌ Supabase SDK is not loaded\n');
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('=== Supabase Login Test Suite ===\n');

  const connectionSuccess = await testSupabaseConnection();
  const loginSuccess = await testLoginFunctionality();
  // Skip frontend test since we're running in Node.js environment
  console.log('3. Testing frontend Supabase client... (skipped in Node.js environment)\n');

  console.log('=== Test Summary ===');
  console.log('Connection Test:', connectionSuccess ? 'PASSED' : 'FAILED');
  console.log('Login Function Test:', loginSuccess ? 'PASSED' : 'FAILED');
  console.log('Frontend Client Test: SKIPPED (Node.js environment)');

  if (connectionSuccess && loginSuccess) {
    console.log('\n🎉 All critical tests PASSED! Supabase backend appears to be working correctly.');
  } else {
    console.log('\n❌ Some tests FAILED. Please check the Supabase configuration.');
  }
}

// Run the tests
runAllTests();