# 🧪 How to Run All Tests

## Prerequisites
1. All test files have been automatically updated with your Supabase project ID
2. Make sure your Supabase functions are deployed

## Test Order
Run the tests in this specific order:

### 1. Health Test (No Authentication Required)
```bash
# Open test-health.html in your browser and click the button
# OR run in browser console:
testHealthFunction()
```

### 2. Registration Test
```bash
# Open browser console and run:
testRegisterFunction()
```

### 3. Login Test (Alternative to Registration)
```bash
# If you already have an account, run:
testLoginFunction()
```

### 4. Get Courses Test
```bash
# Run after registration/login:
testGetCoursesFunction()
```

### 5. Quiz Interaction Test
```bash
# Run after registration/login:
testQuizInteractionFunction()
```

### 6. Tool Usage Test
```bash
# Run after registration/login:
testToolUsageFunction()
```

### Automated Test Runner
```bash
# Run all tests automatically:
# Open run-all-tests.js and copy the entire content to your browser console
# OR create a new HTML file with the script and open it in your browser
```

## Expected Results
- Health test should return success message
- Registration/Login should return auth token
- Course test should return course list
- Interaction tests should return success messages

## Troubleshooting
1. If you get 401 errors, run registration/login first
2. If you get 404 errors, check your function URLs
3. Make sure all functions are deployed in Supabase