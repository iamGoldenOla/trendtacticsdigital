# Supabase Edge Functions Deployment Checklist

This checklist helps you deploy all your Edge Functions in the correct order.

## Prerequisites
- [ ] Supabase project created
- [ ] Environment variables configured in Supabase Dashboard
- [ ] Supabase schema deployed (from supabase-full-schema.sql)

## Deployment Order

### 1. System Functions
- [ ] `/system/health.ts` → Function name: `health`

### 2. Authentication Functions
- [ ] `/auth/register.ts` → Function name: `register`
- [ ] `/auth/login.ts` → Function name: `login`
- [ ] `/auth/logout.ts` → Function name: `logout`
- [ ] `/auth/get-user.ts` → Function name: `get-user`
- [ ] `/auth/update-profile.ts` → Function name: `update-profile`

### 3. AI Functions
- [ ] `/ai/chat.ts` → Function name: `chat`
- [ ] `/ai/generate-image.ts` → Function name: `generate-image`
- [ ] `/ai/analyze-content.ts` → Function name: `analyze-content`

### 4. Course Functions
- [ ] `/courses/get-courses.ts` → Function name: `get-courses`
- [ ] `/courses/get-course.ts` → Function name: `get-course`
- [ ] `/courses/enroll.ts` → Function name: `enroll`
- [ ] `/courses/get-enrollments.ts` → Function name: `get-enrollments`
- [ ] `/courses/update-progress.ts` → Function name: `update-progress`

### 5. User Functions
- [ ] `/users/get-profile.ts` → Function name: `get-profile`
- [ ] `/users/update-profile.ts` → Function name: `update-profile-user`
- [ ] `/users/get-learning-stats.ts` → Function name: `get-learning-stats`
- [ ] `/users/update-learning-stats.ts` → Function name: `update-learning-stats`
- [ ] `/users/get-preferences.ts` → Function name: `get-preferences`
- [ ] `/users/update-preferences.ts` → Function name: `update-preferences`

## Deployment Steps for Each Function

1. In Supabase Dashboard, navigate to **Functions**
2. Click **"Create Function"**
3. Enter the function name (as listed above)
4. Select the appropriate file from your local filesystem
5. Set the function slug (usually matches the name)
6. Click **"Create Function"**
7. Wait for deployment to complete
8. Test the function using the provided URL

## Testing Functions

After deployment, test each function:

### System Functions
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/health
```

### Auth Functions
```bash
# Register
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"securepassword","country":"USA"}'

# Login
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"securepassword"}'
```

### AI Functions
```bash
# Chat
curl -X POST https://YOUR_PROJECT_ID.supabase.co/functions/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"prompt":"Hello, how are you?","provider":"openrouter"}'
```

## Verification
- [ ] All functions deployed successfully
- [ ] Environment variables working
- [ ] Functions returning expected responses
- [ ] No errors in function logs

## Troubleshooting
- If functions fail, check the logs in the Supabase Dashboard
- Verify all environment variables are set correctly
- Ensure the Supabase schema is deployed
- Check that file paths match the directory structure