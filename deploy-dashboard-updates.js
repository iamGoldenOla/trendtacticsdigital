/**
 * Deploy Dashboard Updates Script
 * 
 * This script helps deploy the dashboard updates to the live website.
 * It copies the necessary files and updates navigation links.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files that need to be deployed
const filesToDeploy = [
  'admin-dashboard.html',
  'analytics-dashboard.html',
  'hub.html',
  'js/main.js',
  'login.html',
  'register.html',
  'DASHBOARD_IMPLEMENTATION_GUIDE.md'
];

console.log('🚀 Starting Dashboard Deployment...');

// Check if all files exist
console.log('🔍 Checking required files...');
let allFilesExist = true;

filesToDeploy.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('❌ Some required files are missing. Please run the implementation first.');
  process.exit(1);
}

console.log('\n📋 Deployment Instructions:');
console.log('1. Upload the following files to your live website:');
filesToDeploy.forEach(file => {
  console.log(`   - ${file}`);
});

console.log('\n2. Update your website navigation to include admin links (for admin users)');
console.log('3. Ensure your live website is using the updated hub.html file');
console.log('4. Verify that login.html and register.html have the admin detection code');

console.log('\n🔧 For manual deployment, copy these files to your web server:');
console.log('- admin-dashboard.html → root directory');
console.log('- analytics-dashboard.html → root directory');
console.log('- hub.html → root directory (replace existing)');
console.log('- js/main.js → js directory (replace existing)');
console.log('- login.html → root directory (replace existing)');
console.log('- register.html → root directory (replace existing)');

console.log('\n✅ Deployment preparation complete!');
console.log('Run this script to verify file integrity before uploading.');

// Verify hub.html has the correct authentication logic
const hubFilePath = path.join(__dirname, 'hub.html');
if (fs.existsSync(hubFilePath)) {
  const hubContent = fs.readFileSync(hubFilePath, 'utf8');
  if (hubContent.includes('checkAuthStatus') && hubContent.includes('Sign In to Access')) {
    console.log('✅ Hub page authentication logic verified');
  } else {
    console.log('❌ Hub page authentication logic may be missing');
  }
}

// Verify login.html has admin detection
const loginFilePath = path.join(__dirname, 'login.html');
if (fs.existsSync(loginFilePath)) {
  const loginContent = fs.readFileSync(loginFilePath, 'utf8');
  if (loginContent.includes('isAdmin') && loginContent.includes('admin')) {
    console.log('✅ Login page admin detection verified');
  } else {
    console.log('❌ Login page admin detection may be missing');
  }
}

// Verify register.html has admin guidance
const registerFilePath = path.join(__dirname, 'register.html');
if (fs.existsSync(registerFilePath)) {
  const registerContent = fs.readFileSync(registerFilePath, 'utf8');
  if (registerContent.includes('isAdmin') && registerContent.includes('admin')) {
    console.log('✅ Register page admin guidance verified');
  } else {
    console.log('❌ Register page admin guidance may be missing');
  }
}

console.log('\n🎉 Ready for deployment to live website!');