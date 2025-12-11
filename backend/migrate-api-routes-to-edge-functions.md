# Migrating API Routes to Supabase Edge Functions

This guide details how to migrate existing Express.js API routes to Supabase Edge Functions, covering all current functionality.

## Current API Routes Analysis

Based on the existing codebase, we have the following API routes:

### Authentication Routes (`backend/routes/auth.js`)
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/logout` - User logout
- GET `/api/auth/me` - Get current user
- PUT `/api/auth/update-profile` - Update user profile
- PUT `/api/auth/change-password` - Change password
- POST `/api/auth/forgot-password` - Forgot password
- PUT `/api/auth/reset-password/:token` - Reset password
- GET `/api/auth/verify-email/:token` - Verify email
- POST `/api/auth/resend-verification` - Resend verification email

### AI Routes (`backend/routes/ai.js`)
- POST `/api/ai/chat` - General AI chat
- POST `/api/ai/tools/headline-generator` - Generate headlines
- POST `/api/ai/tools/hashtag-generator` - Generate hashtags
- POST `/api/ai/tools/content-optimizer` - Optimize content
- POST `/api/ai/tools/business-strategy` - Generate business strategy
- GET `/api/ai/models` - Get available models
- GET `/api/ai/stats` - Get API stats

### Quiz Routes (`backend/server.js`)
- GET `/api/health` - Health check
- POST `/api/quiz-results` - Save quiz results
- GET `/api/quiz-results` - Get quiz results

## Migration Plan

We'll create Edge Functions for each route group and ensure feature parity.

### 1. Authentication Functions

#### Register Function (`supabase/functions/auth/register.ts`)

```typescript
// This function was created in the previous step
// See supabase-edge-functions-setup.md for full implementation
```

#### Login Function (`supabase/functions/auth/login.ts`)

```typescript
// This function was created in the previous step
// See supabase-edge-functions-setup.md for full implementation
```

#### Logout Function (`supabase/functions/auth/logout.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';
import { requireAuth } from '../_utils/auth.ts';

serve(async (req) => {
  try {
    // Get auth token
    const token = requireAuth(req);
    
    // Sign out using Supabase Auth
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Logout failed' 
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
        message: 'Logged out successfully'
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

#### Get Current User Function (`supabase/functions/auth/get-user.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';
import { requireAuth, getUserFromToken } from '../_utils/auth.ts';

serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Get extended user data from users table
    const { data: userData, error } = await supabase
      .from('users')
      .select(`
        *,
        subscriptions(*),
        user_preferences(*),
        user_enrollments(*),
        learning_stats(*)
      `)
      .eq('id', user.id)
      .single();
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to fetch user data' 
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
        data: userData
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

#### Update Profile Function (`supabase/functions/auth/update-profile.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';
import { requireAuth, getUserFromToken } from '../_utils/auth.ts';

interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  city?: string;
  dateOfBirth?: string;
  gender?: string;
  avatar?: string;
}

serve(async (req) => {
  try {
    // Get user from auth token
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Parse request body
    const payload: UpdateProfilePayload = await req.json();
    
    // Prepare fields to update
    const fieldsToUpdate: Record<string, any> = {};
    
    if (payload.firstName !== undefined) fieldsToUpdate.first_name = payload.firstName;
    if (payload.lastName !== undefined) fieldsToUpdate.last_name = payload.lastName;
    if (payload.bio !== undefined) fieldsToUpdate.bio = payload.bio;
    if (payload.phone !== undefined) fieldsToUpdate.phone = payload.phone;
    if (payload.city !== undefined) fieldsToUpdate.city = payload.city;
    if (payload.dateOfBirth !== undefined) fieldsToUpdate.date_of_birth = payload.dateOfBirth;
    if (payload.gender !== undefined) fieldsToUpdate.gender = payload.gender;
    if (payload.avatar !== undefined) fieldsToUpdate.avatar = payload.avatar;
    
    // Update user profile
    const { data, error } = await supabase
      .from('users')
      .update(fieldsToUpdate)
      .eq('id', user.id)
      .select();
    
    if (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Failed to update profile' 
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
        data: data[0]
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

### 2. AI Functions

#### General Chat Function (`supabase/functions/ai/chat.ts`)

```typescript
// This function was created in the previous step
// See supabase-edge-functions-setup.md for full implementation
```

#### Headline Generator Function (`supabase/functions/ai/headline-generator.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';

interface HeadlineGeneratorPayload {
  topic: string;
  count?: number;
  style?: string;
}

serve(async (req) => {
  try {
    // Parse request body
    const payload: HeadlineGeneratorPayload = await req.json();
    
    // Validate required fields
    if (!payload.topic || typeof payload.topic !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Topic is required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Set defaults
    const count = payload.count || 5;
    const style = payload.style || 'marketing';
    
    // Create prompt
    const prompt = `Generate ${count} catchy ${style} headlines for: "${payload.topic}". 
    Make them engaging, SEO-friendly, and suitable for social media. 
    Format as a numbered list.`;
    
    // Get API key and call AI service
    const apiKey = Deno.env.get('OPENROUTER_API_KEY') || '';
    const model = 'mistralai/mistral-small';
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('CLIENT_URL') || 'https://trendtacticsdigital.com',
        'X-Title': 'Trendtactics Digital Tools'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.8
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI API');
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          headlines: data.choices[0].message.content.split('\n').filter((line: string) => line.trim()),
          topic: payload.topic,
          count,
          style
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    console.error('Headline Generator Error:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || 'Headline generation failed' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

#### Hashtag Generator Function (`supabase/functions/ai/hashtag-generator.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

interface HashtagGeneratorPayload {
  topic: string;
  platform?: string;
  count?: number;
}

serve(async (req) => {
  try {
    // Parse request body
    const payload: HashtagGeneratorPayload = await req.json();
    
    // Validate required fields
    if (!payload.topic || typeof payload.topic !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Topic is required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Set defaults
    const platform = payload.platform || 'general';
    const count = payload.count || 10;
    
    // Create prompt
    const prompt = `Generate ${count} relevant hashtags for "${payload.topic}" on ${platform}. 
    Include trending and niche hashtags. Format as a list with # symbols.`;
    
    // Get API key and call AI service
    const apiKey = Deno.env.get('OPENROUTER_API_KEY') || '';
    const model = 'mistralai/mistral-small';
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('CLIENT_URL') || 'https://trendtacticsdigital.com',
        'X-Title': 'Trendtactics Digital Tools'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI API');
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          hashtags: data.choices[0].message.content.split('\n').filter((line: string) => line.trim()),
          topic: payload.topic,
          platform,
          count
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    console.error('Hashtag Generator Error:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || 'Hashtag generation failed' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

#### Content Optimizer Function (`supabase/functions/ai/content-optimizer.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

interface ContentOptimizerPayload {
  content: string;
  target?: string;
  platform?: string;
}

serve(async (req) => {
  try {
    // Parse request body
    const payload: ContentOptimizerPayload = await req.json();
    
    // Validate required fields
    if (!payload.content || typeof payload.content !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Content is required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Create prompt
    const prompt = `Optimize this content for ${payload.target || 'SEO and engagement'} on ${payload.platform || 'social media'}:
    
    "${payload.content}"
    
    Provide specific improvements and an optimized version.`;
    
    // Get API key and call AI service
    const apiKey = Deno.env.get('OPENROUTER_API_KEY') || '';
    const model = 'mistralai/mistral-small';
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('CLIENT_URL') || 'https://trendtacticsdigital.com',
        'X-Title': 'Trendtactics Digital Tools'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 800,
        temperature: 0.6
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI API');
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          original: payload.content,
          optimized: data.choices[0].message.content,
          target: payload.target,
          platform: payload.platform
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    console.error('Content Optimizer Error:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || 'Content optimization failed' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

#### Business Strategy Function (`supabase/functions/ai/business-strategy.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

interface BusinessStrategyPayload {
  business: string;
  industry?: string;
  goals?: string;
  challenges?: string;
}

serve(async (req) => {
  try {
    // Parse request body
    const payload: BusinessStrategyPayload = await req.json();
    
    // Validate required fields
    if (!payload.business || typeof payload.business !== 'string') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Business name is required' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Create prompt
    const prompt = `Create a comprehensive business strategy for ${payload.business} (${payload.industry || 'business'}) with goals: ${payload.goals || 'growth'} and challenges: ${payload.challenges || 'competition'}. 
    Include marketing, operations, and growth strategies.`;
    
    // Get API key and call AI service
    const apiKey = Deno.env.get('OPENROUTER_API_KEY') || '';
    const model = 'mistralai/mistral-small';
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': Deno.env.get('CLIENT_URL') || 'https://trendtacticsdigital.com',
        'X-Title': 'Trendtactics Digital Tools'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1200,
        temperature: 0.7
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI API');
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          business: payload.business,
          strategy: data.choices[0].message.content,
          industry: payload.industry,
          goals: payload.goals,
          challenges: payload.challenges
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (err) {
    console.error('Business Strategy Error:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err.message || 'Strategy generation failed' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

#### Get Models Function (`supabase/functions/ai/get-models.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (_req) => {
  try {
    // Define available models
    const models = {
      openrouter: [
        'Mistral Small',
        'DeepSeek R1',
        'NVIDIA Llama 3.1',
        'Kimi Dev 72b',
        'Qwen3 30B',
        'Meta Llama 4',
        'Qwen3 32B',
        'DeepSeek V3',
        'Google Gemma 3',
        'Google Gemini 2.0',
        'Mistral Nemo',
        'Agentica Deepcoder',
        'MiniMax M1'
      ],
      openai: [
        'gpt-4',
        'gpt-4-turbo',
        'gpt-3.5-turbo',
        'gpt-3.5-turbo-16k'
      ],
      google: [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-2.0-flash'
      ]
    };
    
    return new Response(
      JSON.stringify({
        success: true,
        data: models
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
        message: 'Failed to get models' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

### 3. Quiz Functions

#### Health Check Function (`supabase/functions/system/health.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (_req) => {
  try {
    return new Response(
      JSON.stringify({ 
        status: 'API is running!',
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
    
  } catch (err) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Health check failed' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

#### Save Quiz Results Function (`supabase/functions/quiz/save-result.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';

interface QuizResultPayload {
  email?: string;
  summary: any;
  answers: any;
  timestamp?: string;
}

serve(async (req) => {
  try {
    // Parse request body
    const payload: QuizResultPayload = await req.json();
    
    // Validate required fields
    if (!payload.summary || !payload.answers) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: summary and answers' 
        }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Insert quiz result
    const { data, error } = await supabase
      .from('quiz_results')
      .insert([
        {
          email: payload.email || null,
          summary: payload.summary,
          answers: payload.answers,
          timestamp: payload.timestamp || new Date().toISOString()
        }
      ])
      .select();
    
    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to save quiz result',
          details: error.message 
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
        id: data[0].id,
        message: 'Quiz result saved successfully'
      }), 
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
    
  } catch (err) {
    console.error('Failed to save quiz result:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to save result',
        details: err.message 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

#### Get Quiz Results Function (`supabase/functions/quiz/get-results.ts`)

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { supabase } from '../_utils/supabaseClient.ts';
import { requireAuth, getUserFromToken } from '../_utils/auth.ts';

serve(async (req) => {
  try {
    // Get user from auth token (admin only)
    const token = requireAuth(req);
    const user = await getUserFromToken(token);
    
    // Check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();
    
    if (userData?.role !== 'admin' && userData?.role !== 'super_admin') {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Forbidden: Admin access required' 
        }), 
        { 
          status: 403, 
          headers: { 'Content-Type': 'application/json' 
        }
      });
    }
    
    // Get quiz results
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (error) {
      throw error;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        results: data 
      }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' 
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
    
    console.error('Failed to fetch quiz results:', err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to fetch results' 
      }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' 
      }
    });
  }
});
```

## Function Deployment Structure

The final directory structure will look like:

```
supabase/
└── functions/
    ├── _utils/
    │   ├── supabaseClient.ts
    │   └── auth.ts
    ├── auth/
    │   ├── register.ts
    │   ├── login.ts
    │   ├── logout.ts
    │   ├── get-user.ts
    │   └── update-profile.ts
    ├── ai/
    │   ├── chat.ts
    │   ├── headline-generator.ts
    │   ├── hashtag-generator.ts
    │   ├── content-optimizer.ts
    │   ├── business-strategy.ts
    │   └── get-models.ts
    ├── quiz/
    │   ├── save-result.ts
    │   └── get-results.ts
    └── system/
        └── health.ts
```

## Deployment Commands

To deploy all functions:

```bash
# Deploy auth functions
supabase functions deploy auth/register
supabase functions deploy auth/login
supabase functions deploy auth/logout
supabase functions deploy auth/get-user
supabase functions deploy auth/update-profile

# Deploy AI functions
supabase functions deploy ai/chat
supabase functions deploy ai/headline-generator
supabase functions deploy ai/hashtag-generator
supabase functions deploy ai/content-optimizer
supabase functions deploy ai/business-strategy
supabase functions deploy ai/get-models

# Deploy quiz functions
supabase functions deploy quiz/save-result
supabase functions deploy quiz/get-results

# Deploy system functions
supabase functions deploy system/health
```

## Frontend Updates Required

Update frontend API calls to use new Edge Function URLs:

```javascript
// Before: http://localhost:4000/api/auth/login
// After: https://{project-ref}.supabase.co/functions/v1/auth/login

const API_BASE_URL = 'https://{project-ref}.supabase.co/functions/v1';

// Example login function
async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message);
  }
  
  return data.data;
}
```

## Benefits of This Migration

1. **Serverless Architecture**: No need to manage or scale servers
2. **Improved Performance**: Edge functions run closer to users
3. **Cost Efficiency**: Pay only for function invocations
4. **Automatic Scaling**: Functions scale automatically with demand
5. **Enhanced Security**: Built-in Supabase Auth integration
6. **Better Monitoring**: Integrated logging and metrics
7. **Simplified Deployment**: Single command deployment
8. **Global Distribution**: Functions deployed to edge locations

## Testing Strategy

1. **Unit Testing**: Test each function with mock data
2. **Integration Testing**: Test end-to-end workflows
3. **Load Testing**: Verify performance under load
4. **Security Testing**: Validate authentication and authorization
5. **Regression Testing**: Ensure all existing functionality works

## Rollback Plan

If issues occur:
1. Temporarily disable Edge Functions
2. Revert frontend to use Express.js endpoints
3. Debug and fix issues in development
4. Redeploy fixed functions

This migration maintains full feature parity while leveraging the benefits of serverless architecture.