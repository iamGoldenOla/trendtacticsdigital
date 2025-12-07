# Quick Guide: Enable GitHub Pages

## Step-by-Step Instructions

### Option 1: Via GitHub Web Interface (Recommended)

1. **Open your repository in GitHub:**
   - Go to: https://github.com/iamGoldenOla/trendtacticsdigital

2. **Navigate to Settings:**
   - Click on the **"Settings"** tab (top right of the repository page)

3. **Go to Pages section:**
   - Scroll down in the left sidebar
   - Click on **"Pages"** (under "Code and automation")

4. **Configure Source:**
   - Under **"Source"**, you'll see a dropdown
   - Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Click **"Save"**

5. **Done!**
   - The workflow will automatically run on the next push to `main`
   - Your site will be available at: `https://iamGoldenOla.github.io/trendtacticsdigital`

### Option 2: Direct Link (Fastest)

Click this link to go directly to the Pages settings:
**https://github.com/iamGoldenOla/trendtacticsdigital/settings/pages**

Then:
1. Under "Source", select **"GitHub Actions"**
2. Click **"Save"**

## Verify It's Working

1. **Check the Actions tab:**
   - Go to: https://github.com/iamGoldenOla/trendtacticsdigital/actions
   - You should see "Deploy to GitHub Pages" workflow
   - It will run automatically on the next push to `main`

2. **Check your site:**
   - After the workflow completes, visit: `https://iamGoldenOla.github.io/trendtacticsdigital`
   - It may take 1-2 minutes to become available

## Troubleshooting

### If "GitHub Actions" option is not available:
- Make sure the workflow file exists: `.github/workflows/github-pages.yml`
- Try refreshing the page
- Check that you have write access to the repository

### If the workflow fails:
- Check the Actions tab for error messages
- Ensure all required files are in the repository
- Verify the workflow file syntax is correct

## Custom Domain (Optional)

If you want to use a custom domain:
1. In Pages settings, add your domain under "Custom domain"
2. Update your DNS records as instructed
3. The workflow will automatically handle the deployment

---

**Note:** Once enabled, every push to the `main` branch will automatically deploy your site to GitHub Pages!

