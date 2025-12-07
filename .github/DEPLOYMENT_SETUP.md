# GitHub Actions Deployment Setup Guide

This repository includes GitHub Actions workflows for automated deployment.

## Available Workflows

### 1. **Deploy to Production (cPanel/FTP)** - `deploy.yml
   - Deploys to cPanel hosting via FTP
   - Triggers on push to `main` branch
   - Can be manually triggered

### 2. **Deploy to GitHub Pages** - `github-pages.yml`
   - Deploys to GitHub Pages
   - Free hosting for static websites
   - Automatically publishes to `https://yourusername.github.io/trendtacticsdigital`

## Setup Instructions

### For cPanel/FTP Deployment

1. **Add GitHub Secrets:**
   - Go to your repository on GitHub
   - Navigate to: **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Add the following secrets:

   ```
   FTP_SERVER: your-ftp-server.com
   FTP_USERNAME: your-ftp-username
   FTP_PASSWORD: your-ftp-password
   ```

2. **Configure Server Directory:**
   - Edit `.github/workflows/deploy.yml`
   - Update `server-dir: /public_html/` to match your cPanel directory structure
   - Common paths:
     - `/public_html/` - Main domain
     - `/public_html/subdomain/` - Subdomain
     - `/public_html/folder/` - Subdirectory

3. **Test Deployment:**
   - Push to `main` branch
   - Go to **Actions** tab in GitHub
   - Watch the workflow run
   - Check your website after completion

### For GitHub Pages Deployment

1. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Deploy:**
   - Push to `main` branch
   - The workflow will automatically deploy
   - Your site will be available at: `https://iamGoldenOla.github.io/trendtacticsdigital`

## Workflow Triggers

- **Automatic:** Pushes to `main` branch
- **Manual:** Go to **Actions** → Select workflow → **Run workflow**

## File Exclusions

The workflows automatically exclude:
- `node_modules/`
- `.git/` and `.github/`
- `.env*` files
- Build artifacts (`.next/`, `dist/`, `build/`)
- Log files
- OS files (`.DS_Store`, `Thumbs.db`)

## Troubleshooting

### FTP Connection Issues
- Verify FTP credentials in GitHub Secrets
- Check if your hosting provider allows FTP connections
- Some providers require SFTP instead of FTP
- Contact your hosting provider for correct FTP settings

### GitHub Pages Not Updating
- Ensure GitHub Pages is enabled in repository settings
- Check workflow logs in the **Actions** tab
- Verify the `_site` directory is being created correctly

### Deployment Fails
- Check workflow logs for specific error messages
- Verify all required secrets are set
- Ensure file permissions are correct
- Check if server directory path is correct

## Customization

### Change Deployment Branch
Edit the workflow file:
```yaml
on:
  push:
    branches:
      - your-branch-name
```

### Add Pre-deployment Steps
Add steps before deployment:
```yaml
- name: Run tests
  run: npm test

- name: Build assets
  run: npm run build
```

### Multiple Environments
Create separate workflows for staging and production:
- `.github/workflows/deploy-staging.yml`
- `.github/workflows/deploy-production.yml`

## Security Notes

- Never commit `.env` files or credentials
- Use GitHub Secrets for sensitive information
- Regularly rotate FTP passwords
- Enable two-factor authentication on GitHub

## Support

For issues or questions:
- Check workflow logs in GitHub Actions
- Review GitHub Actions documentation
- Contact your hosting provider for FTP issues

