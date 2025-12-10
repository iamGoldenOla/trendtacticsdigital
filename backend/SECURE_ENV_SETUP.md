# 🔐 Secure Environment Setup Guide

This guide explains how to securely set up your environment variables for the Trendtactics Digital LMS platform.

## ⚠️ SECURITY WARNING

**NEVER commit actual API keys or sensitive information to version control!**
The `.env.template` file contains placeholder values only.

## 🛡️ Security Best Practices

1. **Environment Variables Only**: All sensitive data must be stored as environment variables
2. **Never Hardcode Secrets**: Functions should use `Deno.env.get()` to access keys
3. **Local Only**: `.env` files should only exist on your local machine
4. **Production Secrets**: Use your hosting platform's secret management (Supabase Dashboard for Edge Functions)

## 📁 File Structure

```
backend/
├── .env.template     # Template file (safe to commit)
├── .env              # Your actual keys (NEVER commit this)
└── .gitignore        # Must exclude .env files
```

## 🛠️ Setup Instructions

### 1. Create Your Local .env File

Copy the template to create your actual environment file:

```bash
cp backend/.env.template backend/.env
```

Or on Windows:
```cmd
copy backend\.env.template backend\.env
```

### 2. Update Values in .env

Replace all placeholder values in `backend/.env` with your actual keys:

```env
# Example - Replace these with your actual values
MONGODB_URI=mongodb+srv://username:password@cluster.example.com/database
JWT_SECRET=your_real_secret_key_here_not_the_placeholder
OPENROUTER_KEY_1=sk-or-v1-your-real-key-here
```

### 3. Verify .gitignore

Ensure your `.gitignore` file includes these entries:

```gitignore
# Environment variables
.env
.env.local
.env*.local
.env.backup
.env.production

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Dependencies
/node_modules
/bower_components
```

## 🔑 Required API Keys

### Database
- MongoDB connection string from MongoDB Atlas

### Authentication
- JWT secret (random string, min 32 characters)

### Payment Processing
- Stripe API keys from Stripe Dashboard

### File Storage
- Cloudinary credentials from Cloudinary Dashboard

### Email Service
- Gmail app password (not your regular password)

### AI Services
- OpenRouter API keys (get from https://openrouter.ai/)
- OpenAI API key (optional, get from https://platform.openai.com/)
- Google AI API key (optional, get from https://aistudio.google.com/)
- Anthropic API key (optional, get from https://console.anthropic.com/)

## 🚀 Production Deployment

For Supabase Edge Functions, set environment variables in the Supabase Dashboard:

1. Go to your Supabase project
2. Navigate to **Settings** → **Configuration** → **Environment Variables**
3. Add each variable with its value
4. Mark sensitive ones as "secret"

## 🔍 Verification Checklist

Before deployment, verify:

- [ ] No actual API keys in code files
- [ ] No `.env` file committed to git
- [ ] All functions use `Deno.env.get()` for accessing keys
- [ ] `.gitignore` properly excludes sensitive files
- [ ] Environment variables set in production platform

## 🆘 If You've Already Committed Keys

If you've accidentally committed real API keys:

1. **Immediately regenerate all exposed keys**
2. **Revoke compromised keys** from their respective platforms
3. **Use `git filter-branch` or BFG Repo-Cleaner** to remove from git history
4. **Notify affected services** if necessary

## 💡 Tips

1. Use a password manager to store your API keys securely
2. Rotate keys periodically for enhanced security
3. Use different keys for development and production
4. Monitor API usage to detect unauthorized access

## 📞 Support

If you need help obtaining any API keys:
- OpenRouter: https://openrouter.ai/
- OpenAI: https://platform.openai.com/
- Google AI: https://aistudio.google.com/
- MongoDB: https://cloud.mongodb.com/
- Stripe: https://dashboard.stripe.com/
- Cloudinary: https://cloudinary.com/

Remember: **Security is everyone's responsibility!**