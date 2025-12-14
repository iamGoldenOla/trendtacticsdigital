# 🚀 Auto Deployment to GitHub Pages

This guide explains how to automatically deploy your Trendtactics Digital website to GitHub Pages.

## 📋 Prerequisites

Before using auto-deployment, ensure you have:

1. **Node.js** installed (https://nodejs.org/)
2. **GitHub CLI** installed (https://cli.github.com/)
3. **Git** installed and configured
4. This repository connected to GitHub

## 🔧 Setup Instructions

### 1. Install GitHub CLI
Download and install from: https://cli.github.com/

### 2. Authenticate with GitHub
```bash
gh auth login
```

Follow the prompts to authenticate with your GitHub account.

### 3. Verify Repository Connection
Ensure your local repository is connected to GitHub:
```bash
git remote -v
```

You should see your GitHub repository URL.

## ▶️ Auto Deployment Methods

### Method 1: Run Batch Script (Windows)
Double-click `auto-deploy.bat` or run from command line:
```cmd
auto-deploy.bat
```

### Method 2: Run Node Script
```bash
node auto-deploy.js
```

### Method 3: Use GitHub Actions (Automatic)
Push to the `main` branch and GitHub Actions will automatically deploy:
```bash
git add .
git commit -m "Update website"
git push origin main
```

## 🛠️ Manual GitHub Pages Setup

If automatic setup fails, configure GitHub Pages manually:

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

## 🌐 Access Your Deployed Site

After deployment, your site will be available at:
```
https://iamGoldenOla.github.io/trendtacticsdigital
```

## 🔄 Deployment Workflow

1. Make changes to your website files
2. Commit changes to Git
3. Push to GitHub (`git push origin main`)
4. GitHub Actions automatically deploys
5. Visit your site to see changes

## 🆘 Troubleshooting

### Issue: "GitHub CLI not found"
**Solution**: Install GitHub CLI from https://cli.github.com/

### Issue: "Not a Git repository"
**Solution**: 
```bash
git init
git remote add origin YOUR_REPOSITORY_URL
```

### Issue: Deployment not triggering
**Solution**: 
```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

### Issue: Site not updating
**Solution**:
1. Check GitHub Actions status in repository
2. Verify no errors in deployment logs
3. Clear browser cache

## 📞 Support

If you encounter issues:

1. Check GitHub Actions logs in your repository
2. Verify all prerequisites are installed
3. Ensure you have proper repository permissions
4. Check internet connectivity

## ✅ Deployment Checklist

- [ ] Node.js installed
- [ ] GitHub CLI installed and authenticated
- [ ] Repository connected to GitHub
- [ ] Changes committed and pushed
- [ ] GitHub Pages configured
- [ ] Site accessible at GitHub Pages URL

Your website will automatically deploy with every push to the main branch!