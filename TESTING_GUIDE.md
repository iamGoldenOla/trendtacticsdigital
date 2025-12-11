# Supabase Functions Testing Guide

## Overview
This guide explains how to test your Supabase Edge Functions that have been deployed to your project.

## Test Files Included
1. `frontend-integration-test.html` - Browser-based testing interface
2. `test-functions-node.js` - Server-side Node.js testing script

## Method 1: Browser-Based Testing (Recommended for development)

### Setup:
1. Open `frontend-integration-test.html` in your web browser
2. The interface provides buttons to test various functions

### Known Issues:
- You may encounter CORS errors due to Content Security Policy restrictions
- This is expected behavior and indicates your functions are properly secured

## Method 2: Server-Side Testing with Node.js

### Prerequisites:
- Node.js must be installed on your system

### How to run:
```bash
node test-functions-node.js
```

### What this tests:
1. Health function
2. User registration
3. Content analysis function

## Expected Results

### Successful Health Function:
```json
{
  "success": true,
  "message": "Function is working correctly",
  "timestamp": "2023-XX-XXTXX:XX:XX.XXXZ"
}
```

### Successful Registration:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "test@trendtacticsdigital.com",
      "firstName": "Test",
      "lastName": "User"
    },
    "token": "jwt_token_here"
  }
}
```

### Successful Content Analysis:
```json
{
  "success": true,
  "data": {
    "analysis": {
      "seoScore": 85,
      "readability": "Good",
      "keywords": ["sample", "text", "SEO"],
      "suggestions": ["Add more headings", "Increase keyword density"]
    }
  }
}
```

## Troubleshooting

### Common Errors:

1. **"Failed to fetch" in browser**:
   - Caused by CORS restrictions
   - Use the Node.js test script instead
   - Or test directly in Supabase dashboard

2. **401 Unauthorized**:
   - Function requires authentication
   - Run registration first to get a token
   - Some functions may always require auth

3. **404 Not Found**:
   - Function may not be deployed
   - Check function name spelling
   - Verify deployment in Supabase dashboard

## Testing in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to Edge Functions
3. Click on any function
4. Use the built-in test interface
5. This bypasses all CORS restrictions

## Next Steps

Once testing is complete, you can integrate these functions into your frontend application:

1. Use the authentication flow (register/login) to get JWT tokens
2. Store tokens securely (localStorage/sessionStorage)
3. Include tokens in Authorization headers for protected functions
4. Handle errors appropriately in your UI

## Security Notes

- Never expose JWT tokens in client-side code in production
- Always use HTTPS for API calls
- Implement proper error handling
- Validate all user inputs