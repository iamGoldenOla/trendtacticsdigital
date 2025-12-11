# Supabase Edge Functions Deployment Cheat Sheet

Quick reference for deploying your Supabase Edge Functions.

## 📋 Pre-Deployment Checklist

- [ ] Environment variables set in Supabase Dashboard
- [ ] Database schema deployed (`supabase-full-schema.sql`)
- [ ] Functions organized in `deployment-packages` directory
- [ ] Review `DEPLOYMENT_CHECKLIST.md`

## 🚀 Deployment Steps

### 1. System Functions
**Function**: `health`
**File**: `deployment-packages/system/health.ts`
**Slug**: `health`

### 2. Authentication Functions
**Functions**: `register`, `login`, `logout`, `get-user`, `update-profile`
**Directory**: `deployment-packages/auth/`
**Slugs**: Same as filenames (without .ts)

### 3. AI Functions
**Functions**: `chat`, `generate-image`, `analyze-content`
**Directory**: `deployment-packages/ai/`
**Slugs**: Same as filenames (without .ts)

### 4. Course Functions
**Functions**: `get-courses`, `get-course`, `enroll`, `get-enrollments`, `update-progress`
**Directory**: `deployment-packages/courses/`
**Slugs**: Same as filenames (without .ts)

### 5. User Functions
**Functions**: `get-profile`, `update-profile`, `get-learning-stats`, `update-learning-stats`, `get-preferences`, `update-preferences`
**Directory**: `deployment-packages/users/`
**Slugs**: Same as filenames (without .ts)

## 🔧 Dashboard Deployment Process

1. Go to Supabase Dashboard → Functions → Create Function
2. Enter function details:
   - Name: Same as filename (without .ts)
   - Slug: Same as filename (without .ts)
3. Upload file from `deployment-packages/[category]/[filename].ts`
4. Click "Create Function"
5. Wait for deployment to complete
6. Test function immediately

## 🧪 Quick Testing Commands

### Health Check
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/health
```

### Authentication
```bash
# Register
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"securepassword","country":"USA"}'

# Login
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepassword"}'
```

### AI Services
```bash
# Chat (requires JWT token)
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"prompt":"Hello, how are you?","provider":"openrouter"}'
```

## 🔑 Environment Variables

### Required
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_ANON_KEY`
- `CLIENT_URL`
- `OPENROUTER_KEY_1` through `OPENROUTER_KEY_21`

### Optional
- `OPENAI_API_KEY`
- `GOOGLE_AI_API_KEY`

## ⚠️ Common Issues & Solutions

### Deployment Failures
- **File too large**: Ensure files are under 2MB
- **Import errors**: Check all imports use Deno syntax
- **Syntax errors**: Verify TypeScript is valid

### Runtime Errors
- **Missing env vars**: Check all required variables are set
- **Auth failures**: Verify JWT tokens and permissions
- **Database errors**: Confirm schema matches function expectations

### AI Service Issues
- **Rate limiting**: Implement retry logic or add more keys
- **Invalid keys**: Verify API keys are active
- **Provider errors**: Check provider status pages

## 📊 Success Verification

### All Functions Deployed
- [ ] `health` - System status
- [ ] `register` - User registration
- [ ] `login` - User authentication
- [ ] `logout` - Session termination
- [ ] `get-user` - Current user info
- [ ] `update-profile` - Profile updates
- [ ] `chat` - AI conversations
- [ ] `generate-image` - Image creation
- [ ] `analyze-content` - Content analysis
- [ ] `get-courses` - Course listings
- [ ] `get-course` - Course details
- [ ] `enroll` - Course enrollment
- [ ] `get-enrollments` - User enrollments
- [ ] `update-progress` - Progress tracking
- [ ] `get-profile` - User profile
- [ ] `update-profile-user` - Profile updates
- [ ] `get-learning-stats` - Learning statistics
- [ ] `update-learning-stats` - Stats updates
- [ ] `get-preferences` - User preferences
- [ ] `update-preferences` - Preference updates

## 🎉 Deployment Complete

Once all functions are deployed and tested:
✅ Your Supabase backend is ready for production use
✅ All 21 OpenRouter keys are rotating properly
✅ Security best practices are implemented
✅ Functions are organized and documented

Happy coding!