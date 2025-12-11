# 🚀 Supabase Migration Guide

Complete step-by-step guide to migrate your backend from file storage to Supabase.

---

## 📋 Prerequisites

1. A Supabase account (free tier is sufficient)
2. Node.js installed (for backend)
3. Access to your Supabase project dashboard

---

## 🎯 Step 1: Create Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - **Name:** `trendtacticsdigital` (or your preferred name)
   - **Database Password:** Create a strong password (save it!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier is fine to start
4. Click **"Create new project"**
5. Wait 2-3 minutes for project setup

---

## 🗄️ Step 2: Create Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy and paste the entire contents of `backend/supabase-schema.sql`
4. Click **"Run"** (or press `Ctrl+Enter`)
5. You should see: `Success. No rows returned`

**What this creates:**
- `quiz_results` table with proper structure
- Indexes for faster queries
- Row Level Security (RLS) policies
- Analytics view for reporting

---

## 🔑 Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - **⚠️ Keep this secret!**

3. Copy these values (you'll need them in the next step)

---

## ⚙️ Step 4: Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)
2. Copy the contents from `.env.example`
3. Fill in your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
PORT=4000
```

**⚠️ Important:**
- Use `SUPABASE_SERVICE_ROLE_KEY` for backend (bypasses RLS)
- Never commit `.env` to Git (it's in `.gitignore`)
- Keep your service role key secret!

---

## 📦 Step 5: Install Dependencies

Navigate to the backend directory and install Supabase:

```bash
cd backend
npm install
```

This will install `@supabase/supabase-js` along with other dependencies.

---

## 🧪 Step 6: Test the Migration

1. **Start your backend server:**
   ```bash
   cd backend
   npm start
   ```

2. **Test the health endpoint:**
   ```bash
   curl http://localhost:4000/api/health
   ```
   
   Should return:
   ```json
   {
     "status": "API is running!",
     "supabase": "configured"
   }
   ```

3. **Test quiz submission:**
   - Go to your website: `http://localhost:8000/quiz.html`
   - Complete the quiz
   - Submit results
   - Check your Supabase dashboard → **Table Editor** → `quiz_results`
   - You should see the new entry!

---

## ✅ Step 7: Verify Migration

### Check Supabase Dashboard:

1. Go to **Table Editor** → `quiz_results`
2. You should see quiz submissions appearing in real-time
3. Click on a row to see the full data structure

### Check Backend Logs:

When a quiz is submitted, you should see:
```
✅ Quiz result saved to Supabase: [uuid]
```

---

## 🔄 Migration Features

### **Automatic Fallback:**
- If Supabase is not configured → saves to file (backward compatible)
- If Supabase insert fails → falls back to file storage
- Your website **never breaks** during migration

### **Dual Storage (Optional):**
- You can keep both Supabase and file storage running
- Gradually migrate existing data
- Test thoroughly before removing file storage

---

## 📊 Step 8: Migrate Existing Data (Optional)

If you have existing quiz results in `data/quiz-results.json`:

1. **Export existing data:**
   ```bash
   cat data/quiz-results.json
   ```

2. **Create migration script** (optional):
   ```javascript
   // backend/migrate-data.js
   const { supabase } = require('./config');
   const fs = require('fs');
   const path = require('path');
   
   async function migrate() {
     const file = path.join(__dirname, '..', 'data', 'quiz-results.json');
     const data = JSON.parse(fs.readFileSync(file, 'utf8'));
     
     const { error } = await supabase
       .from('quiz_results')
       .insert(data);
     
     if (error) console.error('Error:', error);
     else console.log(`✅ Migrated ${data.length} records`);
   }
   
   migrate();
   ```

3. **Run migration:**
   ```bash
   node backend/migrate-data.js
   ```

---

## 🚀 Step 9: Deploy

### **For Production:**

1. **Set environment variables on your hosting:**
   - Add `SUPABASE_URL`
   - Add `SUPABASE_SERVICE_ROLE_KEY`
   - Add `PORT` (if needed)

2. **Deploy backend:**
   - Your backend server needs to run (Node.js hosting)
   - Or use Supabase Edge Functions (advanced)

3. **Update frontend API URL** (if needed):
   - Currently uses `/api/quiz-results` (relative)
   - If backend is on different domain, update in `js/quiz.js`

---

## 🔍 Troubleshooting

### **Issue: "Supabase credentials not found"**

**Solution:**
- Check `.env` file exists in project root
- Verify environment variable names match exactly
- Restart your backend server after adding `.env`

### **Issue: "Failed to save quiz result"**

**Solution:**
- Check Supabase dashboard → **Table Editor** → verify `quiz_results` table exists
- Check **SQL Editor** → verify schema was created
- Check **Settings** → **API** → verify keys are correct
- Check backend logs for detailed error messages

### **Issue: "Row Level Security policy violation"**

**Solution:**
- Verify RLS policies in `supabase-schema.sql` were created
- Check **Authentication** → **Policies** in Supabase dashboard
- Ensure you're using `SERVICE_ROLE_KEY` (not anon key) in backend

### **Issue: Backend not starting**

**Solution:**
```bash
cd backend
npm install  # Reinstall dependencies
node server.js  # Test directly
```

---

## 📈 Next Steps

### **1. Set Up Analytics:**
- Use the `quiz_analytics` view in Supabase
- Create dashboards in Supabase dashboard
- Export data for reporting

### **2. Add More Features:**
- User authentication (Supabase Auth)
- Real-time subscriptions
- File storage for ebooks
- Email notifications

### **3. Optimize:**
- Add more indexes if needed
- Set up database backups
- Monitor query performance

---

## ✅ Migration Checklist

- [ ] Created Supabase project
- [ ] Ran `supabase-schema.sql` in SQL Editor
- [ ] Copied API keys to `.env` file
- [ ] Installed dependencies (`npm install` in backend)
- [ ] Tested health endpoint
- [ ] Tested quiz submission
- [ ] Verified data in Supabase dashboard
- [ ] Deployed to production (if applicable)

---

## 🎉 Success!

Your backend is now using Supabase! 

**Benefits:**
- ✅ Scalable database (PostgreSQL)
- ✅ Real-time capabilities
- ✅ Built-in security (RLS)
- ✅ Easy analytics
- ✅ No server management

**Your website continues working exactly as before - zero downtime migration!**

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Check backend logs for detailed error messages

---

**Last Updated:** December 2024

