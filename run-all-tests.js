// run-all-tests.js
// Automated test runner for all Supabase functions

async function runAllTests() {
  console.log('🚀 Starting all tests...\n');
  
  // Test 1: Health Function
  console.log('🧪 Test 1: Health Function');
  try {
    const healthResponse = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health Function Result:', healthData);
  } catch (error) {
    console.log('❌ Health Function Error:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 2: Registration
  console.log('🧪 Test 2: Registration');
  let authToken = null;
  try {
    const registerResponse = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@trendtacticsdigital.com',
        password: 'SecurePass123!',
        firstName: 'Test',
        lastName: 'User'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('✅ Registration Result:', registerData);
    
    if (registerData.success && registerData.data?.token) {
      authToken = registerData.data.token;
      localStorage.setItem('testToken', authToken);
      console.log('🔑 Token stored for future tests');
    }
  } catch (error) {
    console.log('❌ Registration Error:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 3: Login (if registration failed or token not available)
  if (!authToken) {
    console.log('🧪 Test 3: Login');
    try {
      const loginResponse = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@trendtacticsdigital.com',
          password: 'SecurePass123!'
        })
      });
      
      const loginData = await loginResponse.json();
      console.log('✅ Login Result:', loginData);
      
      if (loginData.success && loginData.data?.token) {
        authToken = loginData.data.token;
        localStorage.setItem('testToken', authToken);
        console.log('🔑 Token stored for future tests');
      }
    } catch (error) {
      console.log('❌ Login Error:', error.message);
    }
    
    console.log('\n---\n');
  }
  
  // Test 4: Get Courses (requires auth)
  console.log('🧪 Test 4: Get Courses');
  try {
    if (!authToken) {
      authToken = localStorage.getItem('testToken');
    }
    
    if (authToken) {
      const coursesResponse = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/get-courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      
      const coursesData = await coursesResponse.json();
      console.log('✅ Get Courses Result:', coursesData);
    } else {
      console.log('⚠️  Skipping - No auth token available');
    }
  } catch (error) {
    console.log('❌ Get Courses Error:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 5: Quiz Interaction (requires auth)
  console.log('🧪 Test 5: Quiz Interaction');
  try {
    if (!authToken) {
      authToken = localStorage.getItem('testToken');
    }
    
    if (authToken) {
      const quizResponse = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/log-quiz-interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          quizId: 'growth_quiz_001',
          quizName: 'Digital Marketing Growth Quiz',
          completed: true,
          score: 85
        })
      });
      
      const quizData = await quizResponse.json();
      console.log('✅ Quiz Interaction Result:', quizData);
    } else {
      console.log('⚠️  Skipping - No auth token available');
    }
  } catch (error) {
    console.log('❌ Quiz Interaction Error:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 6: Tool Usage (requires auth)
  console.log('🧪 Test 6: Tool Usage');
  try {
    if (!authToken) {
      authToken = localStorage.getItem('testToken');
    }
    
    if (authToken) {
      const toolResponse = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/log-tool-usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          toolName: 'SEO Analyzer',
          toolCategory: 'SEO Tools',
          sessionDuration: 300,
          metadata: {
            pagesAnalyzed: 5,
            issuesFound: 12
          }
        })
      });
      
      const toolData = await toolResponse.json();
      console.log('✅ Tool Usage Result:', toolData);
    } else {
      console.log('⚠️  Skipping - No auth token available');
    }
  } catch (error) {
    console.log('❌ Tool Usage Error:', error.message);
  }
  
  console.log('\n🏁 All tests completed!');
}

// Run all tests
runAllTests();