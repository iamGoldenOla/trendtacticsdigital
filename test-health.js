// test-health.js
async function testHealthFunction() {
  try {
    const response = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/health');
    const data = await response.json();
    console.log('Health Function Response:', data);
  } catch (error) {
    console.error('Health Function Error:', error);
  }
}

// Run the test
testHealthFunction();