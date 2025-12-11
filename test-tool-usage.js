// test-tool-usage.js
async function testToolUsageFunction() {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('testToken');
    
    const response = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/log-tool-usage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    
    const data = await response.json();
    console.log('Tool Usage Response:', data);
  } catch (error) {
    console.error('Tool Usage Error:', error);
  }
}

// Run the test
testToolUsageFunction();