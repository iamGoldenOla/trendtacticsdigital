# Quick Start: Supabase Backend

This guide provides a quick reference for working with your Supabase backend.

## 🚀 Getting Started

### 1. Environment Setup
```bash
# Set these environment variables in Supabase Dashboard
SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
CLIENT_URL=https://yourdomain.com

# OpenRouter keys (all 21)
OPENROUTER_KEY_1=sk-or-v1-...
OPENROUTER_KEY_2=sk-or-v1-...
# ... up to ...
OPENROUTER_KEY_21=sk-or-v1-...
```

### 2. Deploy Functions
All functions are organized in `supabase/functions/deployment-packages/`:

```bash
# Deploy in this order:
1. System functions (health check)
2. Authentication functions
3. AI functions
4. Course functions
5. User functions
```

## 🔧 Key Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `GET /get-user` - Get current user (auth required)

### AI Services
- `POST /chat` - Chat completions (auth required)
- `POST /generate-image` - Image generation (auth required)
- `POST /analyze-content` - Content analysis (auth required)

### Courses
- `GET /get-courses` - List courses
- `GET /get-course?id=COURSE_ID` - Get course details
- `POST /enroll` - Enroll in course (auth required)

### User Management
- `GET /get-profile` - Get full profile (auth required)
- `POST /update-preferences` - Update preferences (auth required)

### System
- `GET /health` - System status

## 🧪 Quick Testing

### Health Check
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/health
```

### User Registration
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

### AI Chat
```bash
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "prompt": "Hello, what can you help me with?",
    "provider": "openrouter"
  }'
```

## 🔑 Key Rotation

All 21 OpenRouter keys are automatically rotated. To verify:

1. Deploy the test function in `supabase/functions/deployment-packages/utils/test-key-rotation.ts`
2. Call the endpoint to verify all keys are detected

## 📚 Documentation

Key documentation files:
- `DEPLOYMENT_COMPLETE_GUIDE.md` - Full deployment guide
- `supabase/functions/DEPLOYMENT_CHEAT_SHEET.md` - Quick reference
- `supabase/functions/FINAL_TESTING_GUIDE.md` - Testing procedures
- `supabase/functions/AI_KEY_ROTATION.md` - Key rotation details

## 🆘 Troubleshooting

### Common Issues
1. **401 Unauthorized** - Check JWT token validity
2. **Missing Environment Variables** - Verify all variables are set in Supabase Dashboard
3. **Rate Limiting** - Add more OpenRouter keys or implement delays
4. **Function Deployment Failures** - Check file sizes and imports

### Checking Logs
```bash
# View function logs in Supabase Dashboard
Supabase Dashboard → Functions → [Function Name] → Logs
```

## 🎉 Success!

Your Supabase backend is ready for production use with:
✅ 21 OpenRouter keys rotating automatically
✅ Secure authentication
✅ Scalable serverless functions
✅ Comprehensive API coverage
✅ Built-in security features

For detailed instructions, refer to the full documentation in your project directory.