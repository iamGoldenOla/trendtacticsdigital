# Supabase Edge Functions Deployment Guide

This guide explains how to deploy the Edge Functions for the Trendtactics Digital LMS platform.

## Prerequisites

1. Supabase project set up with the schema from `supabase-full-schema.sql`
2. API keys configured in Supabase Dashboard
3. Environment variables set up in Supabase Project Settings

## Deployment Methods

### Method 1: Deploy via Supabase Dashboard (Recommended)

1. Log in to your Supabase Dashboard
2. Navigate to your project
3. Go to "Functions" in the left sidebar
4. Click "Deploy Function"
5. Select the function you want to deploy
6. Configure environment variables if needed
7. Click "Deploy"

### Method 2: Deploy via Supabase CLI (If Available)

If you have the Supabase CLI properly installed:

```bash
# Link your project
supabase link --project-ref YOUR_PROJECT_ID

# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy auth/register
```

## Environment Variables Required

The following environment variables need to be set in your Supabase Project Settings:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `OPENROUTER_KEY_1` through `OPENROUTER_KEY_21` - OpenRouter API keys (for AI functions)
- `OPENROUTER_API_KEY` - Fallback OpenRouter API key (optional)
- `OPENAI_API_KEY` - OpenAI API key (for AI functions)
- `GOOGLE_AI_API_KEY` - Google AI API key (for AI functions)
- `CLIENT_URL` - Your frontend URL (e.g., https://trendtacticsdigital.com)

## Function Endpoints

After deployment, your functions will be available at:

### Authentication Functions
- POST `/auth/register` - User registration
- POST `/auth/login` - User login
- POST `/auth/logout` - User logout
- GET `/auth/get-user` - Get user profile
- PUT `/auth/update-profile` - Update user profile

### AI Functions
- POST `/ai/chat` - AI chat completions
- POST `/ai/generate-image` - AI image generation
- POST `/ai/analyze-content` - Content analysis

### Course Functions
- GET `/courses/get-courses` - Get course listings
- GET `/courses/get-course?id=COURSE_ID` - Get course details
- POST `/courses/enroll` - Enroll in course
- GET `/courses/get-enrollments` - Get user enrollments
- PUT `/courses/update-progress` - Update course progress

### User Functions
- GET `/users/get-profile` - Get user profile
- PUT `/users/update-profile` - Update user profile
- GET `/users/get-learning-stats` - Get learning statistics
- PUT `/users/update-learning-stats` - Update learning statistics
- GET `/users/get-preferences` - Get user preferences
- PUT `/users/update-preferences` - Update user preferences

## Testing Functions Locally

To test functions locally:

```bash
# Start Supabase local development
supabase start

# Serve functions locally
supabase functions serve
```

## Troubleshooting

### Common Issues

1. **Function not found**: Ensure the function file is in the correct directory structure
2. **Permission denied**: Check that your Supabase service role key is correct
3. **Environment variables missing**: Verify all required environment variables are set
4. **Import errors**: Ensure all imports use the correct Deno-compatible URLs

### Logs and Monitoring

View function logs in the Supabase Dashboard under the "Logs" section of each function.

## Security Considerations

1. All functions requiring authentication check for valid JWT tokens
2. Role-based access control is implemented through Supabase RLS policies
3. API keys are stored securely in Supabase Project Settings
4. Rate limiting should be implemented for AI functions to prevent abuse

## Updating Functions

To update a deployed function:

1. Make changes to the function code
2. Redeploy using the same method as initial deployment
3. Test the updated function

Note: Supabase automatically versions functions, so you can roll back if needed.