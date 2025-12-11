// test-login.js
async function testLoginFunction() {
  try {
    const response = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'SecurePass123!'
      })
    });
    
    const data = await response.json();
    console.log('Login Response:', data);
    
    // If successful, store the token for later tests
    if (data.success && data.data?.token) {
      localStorage.setItem('testToken', data.data.token);
      console.log('Token stored for future tests');
    }
  } catch (error) {
    console.error('Login Error:', error);
  }
}

// Run the test
testLoginFunction();