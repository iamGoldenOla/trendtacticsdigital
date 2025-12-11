# Supabase Edge Functions Setup Guide

This guide explains how to set up Supabase Edge Functions to replace the current Express.js backend server with serverless functions.

## Current Backend Architecture

The current backend consists of:
- Express.js server (`backend/server.js`)
- API routes (`backend/routes/`)
- Middleware (`backend/middleware/`)
- Services (`backend/services/`)
- Models (`backend/models/`)
- Configuration (`backend/config.js`)

## Benefits of Supabase Edge Functions

1. **Serverless**: No need to manage servers
2. **Auto-scaling**: Automatically scales with demand
3. **Global Distribution**: Deployed to edge locations worldwide
4. **Cost-effective**: Pay only for what you use
5. **Fast Cold Starts**: Optimized for quick function initialization
6. **Built-in Integration**: Seamless integration with Supabase services

## Setting Up Supabase Edge Functions

### 1. Install Supabase CLI

First, install the Supabase CLI:

```bash
npm install -g supabase
```

Or using Homebrew (macOS):

```bash
brew install supabase/tap/supabase
```

### 2. Initialize Supabase Project

In your project root directory:

```bash
supabase init
```

This creates a `supabase` directory with configuration files.

### 3. Link to Your Supabase Project

```bash
supabase link --project-ref your-project-ref
```

You can find your project ref in the Supabase dashboard URL: `https://app.supabase.com/project/{project-ref}`

### 4. Create Functions Directory

Create the functions directory structure:

```
supabase/
└── functions/
    ├── _utils/
    ├── auth/
    ├── courses/
    ├── users/
    └── ai/
```

### 5. Set Up Function Development Environment

Create a `.env.local` file in the `supabase/functions` directory:

```env
# Supabase credentials
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key

# API Keys for external services
OPENROUTER_API_KEY=your_openrouter_key
OPENAI_API_KEY=your_openai_key
GOOGLE_AI_API_KEY=your_google_ai_key

# Application settings
CLIENT_URL=https://yourdomain.com
AI_RATE_LIMIT_WINDOW=900000
AI_RATE_LIMIT_MAX=50
```

## Creating Edge Functions

### 1. Utility Functions

Create `supabase/functions/_utils/supabaseClient.ts`:

```typescript
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

// Create a single supabase client for interacting with the API
export const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Create a client for client-side operations
export const supabaseAnon = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? ''
);
```

Create `supabase/functions/_utils/auth.ts`:

```typescript
import { supabase } from './supabaseClient.ts';

export async function getUserFromToken(token: string) {
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error) {
    throw new Error('Invalid authentication token');
  }
  
  return user;
}

export function requireAuth(req: Request) {
  const authHeader = req.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or invalid Authorization header');
  }
  
  return authHeader.substring(7); // Remove 'Bearer ' prefix
}
```

### 2. Authentication Functions

Create `supabase/functions/auth/register.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  city?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
}

serve(async (_req) => {
  try {
    // Parse request body
    const payload: RegisterPayload = await _req.json();
    
    // Validate required fields
    if (!payload.firstName || !payload.lastName || !payload.email || !payload.password || !payload.country) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Missing required fields' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Sign up with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          first_name: payload.firstName,
          last_name: payload.lastName,
          country: payload.country,
          city: payload.city,
          phone: payload.phone,
          date_of_birth: payload.dateOfBirth,
          gender: payload.gender
        }
      }
    });
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: error.message 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Create user record in users table
    const { error: userError } = await supabase
      .from('users')
      .insert({
        id: data.user?.id,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        country: payload.country,
        city: payload.city,
        phone: payload.phone,
        date_of_birth: payload.dateOfBirth,
        gender: payload.gender,
        is_email_verified: data.user?.identities ? true : false
      });
    
    if (userError) {
      console.error('User creation error:', userError);
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Registration successful. Please check your email for verification.',
        data: {
          user: data.user,
          session: data.session
        }
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

Create `supabase/functions/auth/login.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';

interface LoginPayload {
  email: string;
  password: string;
}

serve(async (_req) => {
  try {
    // Parse request body
    const payload: LoginPayload = await _req.json();
    
    // Validate required fields
    if (!payload.email || !payload.password) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email and password are required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    });
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid credentials' 
        }), 
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Update last login in users table
    await supabase
      .from('users')
      .update({ last_login: new Date() })
      .eq('id', data.user.id);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Login successful',
        data: {
          user: data.user,
          session: data.session
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

### 3. Course Management Functions

Create `supabase/functions/courses/get-courses.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';
import { requireAuth, getUserFromToken } from '../_utils/auth.ts';

serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Fetch published courses
    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        *,
        modules (
          *,
          lessons (*)
        )
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: error.message 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Get user's enrollments
    const { data: enrollments } = await supabase
      .from('user_enrollments')
      .select('*')
      .eq('user_id', user.id);
    
    // Add enrollment status to courses
    const coursesWithEnrollment = courses.map(course => ({
      ...course,
      is_enrolled: enrollments.some(e => e.course_id === course.id),
      progress: enrollments.find(e => e.course_id === course.id)?.progress || 0
    }));
    
    return new Response(
      JSON.stringify({
        success: true,
        data: coursesWithEnrollment
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    if (err.message === 'Missing or invalid Authorization header') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Unauthorized' 
        }), 
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

Create `supabase/functions/courses/enroll-course.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';
import { requireAuth, getUserFromToken } from '../_utils/auth.ts';

interface EnrollPayload {
  courseId: string;
}

serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Parse request body
    const payload: EnrollPayload = await req.json();
    
    // Validate required fields
    if (!payload.courseId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Course ID is required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Check if course exists and is published
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select('*')
      .eq('id', payload.courseId)
      .eq('is_published', true)
      .single();
    
    if (courseError || !course) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Course not found or not published' 
        }), 
        { 
          status: 404, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Check if already enrolled
    const { data: existingEnrollment } = await supabase
      .from('user_enrollments')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', payload.courseId)
      .maybeSingle();
    
    if (existingEnrollment) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Already enrolled in this course' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Create enrollment
    const { data: enrollment, error: enrollError } = await supabase
      .from('user_enrollments')
      .insert({
        user_id: user.id,
        course_id: payload.courseId,
        enrolled_at: new Date()
      })
      .select();
    
    if (enrollError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to enroll in course' 
        }), 
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully enrolled in course',
        data: enrollment[0]
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    if (err.message === 'Missing or invalid Authorization header') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Unauthorized' 
        }), 
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

### 4. AI Service Functions

Create `supabase/functions/ai/chat.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

interface ChatPayload {
  prompt: string;
  provider?: string;
  model?: string;
  options?: Record<string, any>;
}

serve(async (req) => {
  try {
    // Parse request body
    const payload: ChatPayload = await req.json();
    
    // Validate required fields
    if (!payload.prompt || typeof payload.prompt !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Valid prompt is required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Get API key based on provider
    let apiKey = '';
    let apiUrl = '';
    let headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    const provider = payload.provider || 'openrouter';
    
    switch (provider.toLowerCase()) {
      case 'openrouter':
        apiKey = Deno.env.get('OPENROUTER_API_KEY') || '';
        apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
        headers['Authorization'] = `Bearer ${apiKey}`;
        headers['HTTP-Referer'] = Deno.env.get('CLIENT_URL') || 'https://trendtacticsdigital.com';
        headers['X-Title'] = 'Trendtactics Digital Tools';
        break;
        
      case 'openai':
        apiKey = Deno.env.get('OPENAI_API_KEY') || '';
        apiUrl = 'https://api.openai.com/v1/chat/completions';
        headers['Authorization'] = `Bearer ${apiKey}`;
        break;
        
      case 'google':
        apiKey = Deno.env.get('GOOGLE_AI_API_KEY') || '';
        const model = payload.model || 'gemini-1.5-flash';
        apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        break;
        
      default:
        return new Response(
          JSON.stringify({ 
            success: false, 
            message: 'Unsupported provider' 
          }), 
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' 
          }
        });
    }
    
    // Prepare request body
    let requestBody: Record<string, any>;
    
    if (provider === 'google') {
      requestBody = {
        contents: [{
          parts: [{
            text: payload.prompt
          }]
        }],
        generationConfig: {
          maxOutputTokens: payload.options?.maxTokens || 1000,
          temperature: payload.options?.temperature || 0.7,
          ...payload.options?.generationConfig
        }
      };
    } else {
      requestBody = {
        model: payload.model || getDefaultModel(provider),
        messages: [{ role: 'user', content: payload.prompt }],
        max_tokens: payload.options?.maxTokens || 1000,
        temperature: payload.options?.temperature || 0.7,
        ...payload.options
      };
    }
    
    // Call AI API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    // Extract response content
    let content = '';
    if (provider === 'google' && data.candidates?.[0]?.content?.parts?.[0]?.text) {
      content = data.candidates[0].content.parts[0].text;
    } else if (data.choices?.[0]?.message?.content) {
      content = data.choices[0].message.content;
    } else {
      throw new Error('Invalid response format from AI API');
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          content,
          model: payload.model || getDefaultModel(provider),
          usage: data.usage || data.usageMetadata || null
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    console.error('AI Chat Error:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || 'AI service error' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});

function getDefaultModel(provider: string): string {
  switch (provider.toLowerCase()) {
    case 'openrouter': return 'mistralai/mistral-small';
    case 'openai': return 'gpt-3.5-turbo';
    case 'google': return 'gemini-1.5-flash';
    default: return 'mistralai/mistral-small';
  }
}
```

## Deploying Edge Functions

### 1. Local Development

To test functions locally:

```bash
supabase functions serve
```

This starts a local development server with hot reloading.

### 2. Deploy to Production

To deploy functions to Supabase:

```bash
# Deploy a single function
supabase functions deploy auth/register

# Deploy all functions
supabase functions deploy
```

### 3. Set Environment Variables

Set environment variables in Supabase:

```bash
supabase secrets set OPENROUTER_API_KEY=your_key_here
supabase secrets set OPENAI_API_KEY=your_key_here
supabase secrets set GOOGLE_AI_API_KEY=your_key_here
```

## Function URLs

After deployment, functions will be available at:
```
https://{project-ref}.supabase.co/functions/v1/{function-name}
```

For example:
```
https://abcd1234.supabase.co/functions/v1/auth/register
https://abcd1234.supabase.co/functions/v1/courses/get-courses
```

## Benefits of This Migration

1. **Zero Server Management**: No need to manage, scale, or monitor servers
2. **Automatic Scaling**: Functions automatically scale with demand
3. **Global Edge Network**: Deployed to edge locations for better performance
4. **Pay-per-use**: Only pay for actual function invocations
5. **Integrated Security**: Built-in authentication and authorization
6. **Seamless Database Access**: Direct access to Supabase database
7. **Real-time Capabilities**: Integrated with Supabase Realtime
8. **Storage Integration**: Direct access to Supabase Storage

## Next Steps

1. Implement remaining functions for all current API routes
2. Set up CI/CD pipeline for automatic deployments
3. Configure monitoring and logging
4. Set up custom domains if needed
5. Implement rate limiting and security measures
6. Test all functions thoroughly
7. Update frontend to use new function URLs
8. Migrate traffic gradually from Express server to Edge Functions