// test-quiz-interaction.js
async function testQuizInteractionFunction() {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('testToken');
    
    const response = await fetch('https://wtgwxnhnqdnbzpetltrt.supabase.co/functions/v1/log-quiz-interaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        quizId: 'growth_quiz_001',
        quizName: 'Digital Marketing Growth Quiz',
        completed: true,
        score: 85
      })
    });
    
    const data = await response.json();
    console.log('Quiz Interaction Response:', data);
  } catch (error) {
    console.error('Quiz Interaction Error:', error);
  }
}

// Run the test
testQuizInteractionFunction();