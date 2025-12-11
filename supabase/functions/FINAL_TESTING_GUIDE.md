# Final Testing Guide for Supabase Edge Functions

This guide walks you through testing all deployed Supabase Edge Functions to ensure they're working correctly.

## 🧪 Testing Prerequisites

1. All functions deployed to Supabase
2. Environment variables set in Supabase Dashboard
3. Database schema deployed
4. `curl` or Postman installed for API testing

## 🔐 Authentication Testing

### 1. User Registration
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "SecurePass123!",
    "country": "USA"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Registration successful. Please check your email for verification.",
  "data": {
    "user": { ... },
    "session": { ... }
  }
}
```

### 2. User Login
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "session": { ... }
  }
}
```

Save the JWT token from the response for authenticated requests.

### 3. Get User Profile
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/get-user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Expected response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    ...
  }
}
```

## 💬 AI Services Testing

### 1. Chat Completion
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "prompt": "Hello, what can you help me with?",
    "provider": "openrouter"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "content": "Hello! I can help you with...",
    "model": "mistralai/mistral-small",
    "usage": { ... }
  }
}
```

### 2. Image Generation
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/generate-image \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "prompt": "A beautiful sunset over mountains",
    "provider": "openai"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "url": "https://...",
    "prompt": "A beautiful sunset over mountains",
    "model": "dall-e-3",
    "size": "1024x1024"
  }
}
```

### 3. Content Analysis
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/analyze-content \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "content": "Artificial intelligence is transforming the world...",
    "analysisType": "summary"
  }'
```

Expected response:
```json
{
  "success": true,
  "data": {
    "analysisType": "summary",
    "result": {
      "summary": "AI is changing the world by..."
    },
    "model": "mistralai/mistral-small",
    "usage": { ... }
  }
}
```

## 📚 Course Management Testing

### 1. Get Courses
```bash
curl "https://YOUR_PROJECT_ID.supabase.co/functions/v1/get-courses?limit=5&category=marketing"
```

Expected response:
```json
{
  "success": true,
  "data": {
    "courses": [...],
    "pagination": {
      "limit": 5,
      "offset": 0,
      "total": 12,
      "hasMore": true
    }
  }
}
```

### 2. Get Specific Course
```bash
curl "https://YOUR_PROJECT_ID.supabase.co/functions/v1/get-course?id=COURSE_ID"
```

Expected response:
```json
{
  "success": true,
  "data": {
    "course": {
      "id": "COURSE_ID",
      "title": "Digital Marketing Fundamentals",
      ...
    }
  }
}
```

### 3. Enroll in Course
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "courseId": "COURSE_ID"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Successfully enrolled in course",
  "data": {
    "enrollment": { ... }
  }
}
```

## 👤 User Profile Testing

### 1. Get Full Profile
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/get-profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Expected response:
```json
{
  "success": true,
  "data": {
    "id": "...",
    "first_name": "Test",
    "last_name": "User",
    "email": "test@example.com",
    "subscriptions": [...],
    "user_preferences": {...},
    "learning_stats": {...}
  }
}
```

### 2. Update Preferences
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/update-preferences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "notification_emails": true,
    "newsletter_subscription": true,
    "privacy_level": "public"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Preferences updated successfully"
}
```

## 📊 System Health Check

```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/health
```

Expected response:
```json
{
  "status": "API is running!",
  "timestamp": "2023-..."
}
```

## ✅ Testing Checklist

### Authentication
- [ ] User registration works
- [ ] User login works
- [ ] JWT token generation works
- [ ] Protected endpoints require authentication
- [ ] User profile retrieval works

### AI Services
- [ ] Chat completions work with OpenRouter
- [ ] Image generation works with OpenAI
- [ ] Content analysis works
- [ ] All 21 OpenRouter keys are accessible
- [ ] Fallback key works when others fail

### Course Management
- [ ] Course listing works with filters
- [ ] Individual course retrieval works
- [ ] Course enrollment works
- [ ] Enrollment listing works
- [ ] Progress tracking works

### User Management
- [ ] Full profile retrieval works
- [ ] Profile updates work
- [ ] Learning statistics work
- [ ] Preference updates work

### System
- [ ] Health check endpoint responds
- [ ] All environment variables are accessible
- [ ] Database connections work
- [ ] Rate limiting handles appropriately

## 🚨 Common Issues and Solutions

### Authentication Errors
- **401 Unauthorized**: Check JWT token validity
- **Invalid credentials**: Verify email/password combination
- **Email not verified**: Check email inbox for verification link

### AI Service Errors
- **Rate limiting**: Add more API keys or implement delays
- **Invalid keys**: Verify API keys in environment variables
- **Provider downtime**: Try alternative providers

### Database Errors
- **Permission denied**: Check RLS policies
- **Record not found**: Verify data exists in tables
- **Connection failed**: Check database connectivity

### Function Errors
- **Timeout**: Optimize function code or increase timeout
- **Memory exceeded**: Reduce payload sizes or optimize processing
- **Import errors**: Verify all imports are correct

## 🎉 Success Criteria

All tests pass when:
✅ All endpoints return expected responses
✅ Authentication flows work correctly
✅ AI services respond with generated content
✅ Course management functions operate as expected
✅ User profile operations succeed
✅ System health check returns positive status
✅ No errors in Supabase function logs

Congratulations! Your Supabase backend is ready for production use.