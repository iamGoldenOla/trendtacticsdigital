#!/usr/bin/env node

/**
 * Setup script for automatic deployment to cPanel
 * This script helps configure GitHub Actions for automatic deployment
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Setting up Automatic Deployment to cPanel...\n');

// Create .github/workflows directory if it doesn't exist
const workflowsDir = join('.github', 'workflows');
if (!existsSync('.github')) {
    mkdirSync('.github');
}
if (!existsSync(workflowsDir)) {
    mkdirSync(workflowsDir);
}

// GitHub Actions workflow content
const workflowContent = `name: Deploy to cPanel
on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Deploy to cPanel
      uses: SamKirkland/FTP-Deploy-Action@v4.3.5
      with:
        server: \${{ secrets.FTP_SERVER }}
        username: \${{ secrets.FTP_USERNAME }}
        password: \${{ secrets.FTP_PASSWORD }}
        server-dir: \${{ secrets.FTP_SERVER_DIR || '/public_html/' }}
        exclude: |
          **/.git*/
          **/node_modules/**
          **/backend/**
          **/trendtacticsdigital/**
          **/README.md
          **/*.md
`;

// Write the workflow file
const workflowPath = join(workflowsDir, 'deploy-cpanel.yml');
writeFileSync(workflowPath, workflowContent);

console.log('✅ Created GitHub Actions workflow file:');
console.log(`   ${workflowPath}\n`);

// Instructions
console.log('📋 Next Steps to Complete Setup:\n');

console.log('1. 🔐 Set GitHub Secrets');
console.log('   Go to: https://github.com/iamGoldenOla/trendtacticsdigital/settings/secrets/actions');
console.log('   Add these secrets:');
console.log('   - FTP_SERVER: Your cPanel FTP server (e.g., ftp.yourdomain.com)');
console.log('   - FTP_USERNAME: Your cPanel FTP username');
console.log('   - FTP_PASSWORD: Your cPanel FTP password');
console.log('   - FTP_SERVER_DIR: /public_html/ (or your specific directory)\n');

console.log('2. 🚀 Test the Deployment');
console.log('   Make a small change and push to GitHub:');
console.log('   git add .');
console.log('   git commit -m "Test automatic deployment"');
console.log('   git push origin main\n');

console.log('3. 📊 Monitor Deployment');
console.log('   Check the Actions tab in GitHub to see the deployment progress\n');

console.log('🎉 Once configured, all future changes will deploy automatically!');
console.log('   Just push to GitHub and your website updates automatically!\n');

// Create a simple test file to verify deployment works
const testFileContent = `<!DOCTYPE html>
<html>
<head>
    <title>Deployment Test</title>
</head>
<body>
    <h1>✅ Auto-Deployment Setup Complete!</h1>
    <p>This file was automatically deployed via GitHub Actions.</p>
    <p>Last updated: ${new Date().toISOString()}</p>
</body>
</html>`;

const testFilePath = join('deployment-test.html');
writeFileSync(testFilePath, testFileContent);

console.log('🔧 Created test file for deployment verification:');
console.log(`   ${testFilePath}\n`);

console.log('✨ Setup complete! Follow the instructions above to enable automatic deployment.');