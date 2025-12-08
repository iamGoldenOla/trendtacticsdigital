# Environment Variables Setup

Create a `.env` file in the **project root** (not in backend folder) with the following:

```env
# Supabase Configuration
# Get these from your Supabase project dashboard: https://app.supabase.com
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Server Configuration
PORT=4000

# Optional: Node Environment
NODE_ENV=production
```

## How to Get Supabase Credentials:

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** → `SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep this secret!

## Important Notes:

- ⚠️ Never commit `.env` to Git (it's already in `.gitignore`)
- Use `SUPABASE_SERVICE_ROLE_KEY` for backend operations
- The backend will work without Supabase (falls back to file storage)

