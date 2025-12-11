// test-register.js
async function testRegisterFunction() {
  try {
    const response = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'SecurePass123!',
        firstName: 'Test',
        lastName: 'User'
      })
    });
    
    const data = await response.json();
    console.log('Registration Response:', data);
    
    // If successful, store the token for later tests
    if (data.success && data.data?.token) {
      localStorage.setItem('testToken', data.data.token);
      console.log('Token stored for future tests');
    }
  } catch (error) {
    console.error('Registration Error:', error);
  }
}

// Run the test
testRegisterFunction();