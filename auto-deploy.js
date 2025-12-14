/**
 * Auto Deploy Script
 * 
 * This script automatically deploys the website to GitHub Pages
 * using the GitHub CLI (gh) tool.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Auto Deployment Script');
console.log('========================');
console.log();

// Check if GitHub CLI is installed
try {
  const ghVersion = execSync('gh --version', { encoding: 'utf8' });
  console.log(`✅ GitHub CLI found: ${ghVersion.split('\n')[0]}`);
} catch (error) {
  console.log('❌ GitHub CLI not found');
  console.log('📝 Please install GitHub CLI from: https://cli.github.com/');
  console.log('💡 After installation, authenticate with: gh auth login');
  process.exit(1);
}

// Check if we're in a git repository
try {
  execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  console.log('✅ Git repository detected');
} catch (error) {
  console.log('❌ Not a git repository');
  console.log('📝 Please initialize git repository first:');
  console.log('   git init');
  console.log('   git remote add origin <your-repository-url>');
  process.exit(1);
}

// Check current branch
try {
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log(`✅ Current branch: ${currentBranch}`);
  
  if (currentBranch !== 'main') {
    console.log('⚠️  Warning: You are not on the main branch');
    console.log('📝 Consider switching to main branch for deployment:');
    console.log('   git checkout main');
  }
} catch (error) {
  console.log('❌ Could not determine current branch');
  process.exit(1);
}

// Check for uncommitted changes
try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (status) {
    console.log('⚠️  Uncommitted changes detected');
    console.log('📝 Would you like to commit them before deployment? (y/n)');
    
    // In a real implementation, you would prompt the user
    // For now, we'll just warn and continue
    console.log('⏭️  Continuing with deployment (uncommitted changes will not be deployed)');
  } else {
    console.log('✅ No uncommitted changes');
  }
} catch (error) {
  console.log('❌ Could not check git status');
  process.exit(1);
}

// Enable GitHub Pages if not already enabled
try {
  console.log('\n🔧 Configuring GitHub Pages...');
  
  // Check if GitHub Pages is already configured
  try {
    const pagesConfig = execSync('gh api repos/{owner}/{repo}/pages', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore']
    });
    
    if (pagesConfig) {
      console.log('✅ GitHub Pages already configured');
    }
  } catch (error) {
    // GitHub Pages not configured, let's set it up
    console.log('⚙️  Setting up GitHub Pages...');
    
    try {
      // Set up GitHub Pages to use the main branch
      execSync('gh api --method PUT repos/{owner}/{repo}/pages -f source.branch=main -f source.path=/', {
        stdio: 'inherit'
      });
      console.log('✅ GitHub Pages configured to use main branch');
    } catch (setupError) {
      console.log('⚠️  Could not automatically configure GitHub Pages');
      console.log('📝 You may need to configure it manually in GitHub Settings → Pages');
    }
  }
} catch (error) {
  console.log('ℹ️  Could not check GitHub Pages configuration');
}

// Deploy to GitHub Pages
console.log('\n🚀 Deploying to GitHub Pages...');
console.log('⏳ This may take a minute...');

try {
  // Push to main branch first
  console.log('📤 Pushing changes to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  // Trigger deployment
  console.log('🌐 Triggering GitHub Pages deployment...');
  
  // Create empty commit to trigger deployment
  execSync('git commit --allow-empty -m "Trigger deployment"', { 
    stdio: 'pipe',
    cwd: __dirname
  });
  
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('✅ Deployment triggered successfully!');
  console.log();
  console.log('📋 Next steps:');
  console.log('1. Visit your repository on GitHub');
  console.log('2. Go to Settings → Pages to see deployment status');
  console.log('3. Your site will be available at: https://<username>.github.io/<repository>');
  console.log();
  console.log('⏱️  First deployment may take a few minutes');
  console.log('🔄 Subsequent deployments are usually faster');
  
} catch (error) {
  console.log('❌ Deployment failed');
  console.log('📝 Error:', error.message);
  console.log();
  console.log('🔧 Troubleshooting:');
  console.log('1. Check your internet connection');
  console.log('2. Verify GitHub authentication: gh auth status');
  console.log('3. Check repository permissions');
  console.log('4. Ensure you have admin access to the repository');
  process.exit(1);
}

console.log('\n🎉 Auto deployment completed!');