// test-get-courses.js
async function testGetCoursesFunction() {
  try {
    // Get token from localStorage (from previous login/registration)
    const token = localStorage.getItem('testToken');
    
    const response = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/get-courses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    console.log('Get Courses Response:', data);
  } catch (error) {
    console.error('Get Courses Error:', error);
  }
}

// Run the test
testGetCoursesFunction();