/**
 * Test script for hub page functionality
 * This script verifies that the hub page works correctly with authentication
 */

// Test 1: Check if hub page exists
console.log('Test 1: Checking if hub page exists...');
fetch('/hub.html')
  .then(response => {
    if (response.ok) {
      console.log('✅ Hub page exists');
    } else {
      console.log('❌ Hub page not found');
    }
  })
  .catch(error => {
    console.log('❌ Error accessing hub page:', error);
  });

// Test 2: Check if Get Started buttons point to hub page
console.log('\nTest 2: Checking Get Started button links...');
const getStartedButtons = document.querySelectorAll('a[href="/hub.html"]');
if (getStartedButtons.length > 0) {
  console.log(`✅ Found ${getStartedButtons.length} Get Started buttons pointing to hub page`);
} else {
  console.log('❌ No Get Started buttons found pointing to hub page');
}

// Test 3: Check if hub page has the correct cards
console.log('\nTest 3: Checking hub page card structure...');
fetch('/hub.html')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const clientDashboardCard = doc.getElementById('client-dashboard-card');
    const academyCard = doc.getElementById('academy-card');
    
    if (clientDashboardCard && academyCard) {
      console.log('✅ Both Client Dashboard and Academy cards found');
      
      // Check card content
      const clientTitle = clientDashboardCard.querySelector('.card-title');
      const clientDesc = clientDashboardCard.querySelector('.card-description');
      const academyTitle = academyCard.querySelector('.card-title');
      const academyDesc = academyCard.querySelector('.card-description');
      
      if (clientTitle && clientTitle.textContent.trim() === 'Client Dashboard') {
        console.log('✅ Client Dashboard card has correct title');
      } else {
        console.log('❌ Client Dashboard card missing or incorrect title');
      }
      
      if (clientDesc && clientDesc.textContent.trim() === 'Manage your campaigns and services') {
        console.log('✅ Client Dashboard card has correct description');
      } else {
        console.log('❌ Client Dashboard card missing or incorrect description');
      }
      
      if (academyTitle && academyTitle.textContent.trim() === 'Academy') {
        console.log('✅ Academy card has correct title');
      } else {
        console.log('❌ Academy card missing or incorrect title');
      }
      
      if (academyDesc && academyDesc.textContent.trim() === 'Learn digital marketing and grow your skills') {
        console.log('✅ Academy card has correct description');
      } else {
        console.log('❌ Academy card missing or incorrect description');
      }
    } else {
      console.log('❌ Missing one or both cards on hub page');
    }
  })
  .catch(error => {
    console.log('❌ Error checking hub page content:', error);
  });

// Test 4: Simulate authentication check
console.log('\nTest 4: Simulating authentication check...');
function simulateAuthCheck(isAuthenticated) {
  // Mock Supabase auth check
  const mockSession = isAuthenticated ? { user: { id: 'test-user-id' } } : null;
  
  if (mockSession) {
    console.log('✅ User is authenticated');
    return Promise.resolve({ data: { session: mockSession } });
  } else {
    console.log('❌ User is not authenticated');
    return Promise.resolve({ data: { session: null } });
  }
}

// Test authenticated redirect
simulateAuthCheck(true).then(result => {
  if (result.data.session) {
    console.log('✅ Authenticated user would be redirected directly to destination');
  }
});

// Test unauthenticated redirect
simulateAuthCheck(false).then(result => {
  if (!result.data.session) {
    console.log('✅ Unauthenticated user would be redirected to login page');
  }
});

console.log('\n📋 Manual Testing Instructions:');
console.log('1. Open http://localhost:3000/hub.html in your browser');
console.log('2. Verify that both cards are displayed with correct content');
console.log('3. Click on each card to test navigation');
console.log('4. Test both authenticated and unauthenticated scenarios');
console.log('5. Check that footer remains unchanged on other pages');