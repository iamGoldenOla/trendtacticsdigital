#!/usr/bin/env node

/**
 * Auto-deploy script for cPanel hosting
 * This script will automatically upload the new hub.html file to your cPanel hosting
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting cPanel deployment...');

// Check if we're running on Windows
const isWindows = process.platform === 'win32';

// Configuration
const LOCAL_HUB_FILE = join(process.cwd(), 'hub.html');
const DEPLOY_SCRIPT = join(process.cwd(), 'update-hub-cpanel.php');

console.log('📁 Checking for required files...');

// Check if hub.html exists
if (!existsSync(LOCAL_HUB_FILE)) {
    console.error('❌ Error: hub.html not found in current directory');
    process.exit(1);
}

console.log('✅ Found hub.html');

// Check if update-hub-cpanel.php exists
if (!existsSync(DEPLOY_SCRIPT)) {
    console.error('❌ Error: update-hub-cpanel.php not found');
    console.log('📝 Creating deployment script...');
    
    const phpScript = `<?php
// Auto-generated deployment script for TrendTacticsDigital
echo "<h1>🔄 Auto Deployment in Progress...</h1>";
echo "<p>Deploying updated hub.html file...</p>";

// Download the new hub.html from GitHub
\$githubUrl = 'https://raw.githubusercontent.com/iamGoldenOla/trendtacticsdigital/main/hub.html';
\$newHubContent = file_get_contents(\$githubUrl);

if (\$newHubContent === FALSE) {
    echo "<p style='color:red;'>❌ Error: Could not download hub.html from GitHub</p>";
    exit;
}

// Save to current directory
\$result = file_put_contents('hub.html', \$newHubContent);

if (\$result === FALSE) {
    echo "<p style='color:red;'>❌ Error: Could not save hub.html to server</p>";
} else {
    echo "<p style='color:green;'>✅ Success: hub.html has been updated!</p>";
    echo "<p>📄 File size: " . strlen(\$newHubContent) . " bytes</p>";
    
    // Also update the timestamp
    \$timestamp = date('Y-m-d H:i:s');
    file_put_contents('last-deploy.txt', "Last deployed: " . \$timestamp);
    echo "<p>🕒 Timestamp: " . \$timestamp . "</p>";
}

echo "<p><a href='/hub.html' target='_blank'>🔗 Test Hub Page</a></p>";
echo "<p><a href='/'>🏠 Back to Homepage</a></p>";
?>`;
    
    writeFileSync(DEPLOY_SCRIPT, phpScript);
    console.log('✅ Created update-hub-cpanel.php');
}

console.log('📋 Instructions:');
console.log('1. Upload both hub.html and update-hub-cpanel.php to your cPanel hosting');
console.log('2. Visit http://trendtacticsdigital.com/update-hub-cpanel.php in your browser');
console.log('3. The script will automatically update your hub.html file');
console.log('4. After deployment, test your hub page');

console.log('\n✨ Deployment preparation complete!');
console.log('📦 Files ready for upload:');
console.log(`   - ${LOCAL_HUB_FILE}`);
console.log(`   - ${DEPLOY_SCRIPT}`);

// Create a simple batch file for Windows users
if (isWindows) {
    const batchContent = `@echo off
echo 🚀 Uploading files to cPanel...
echo Please use FileZilla or cPanel File Manager to upload these files:
echo.
echo 1. hub.html
echo 2. update-hub-cpanel.php
echo.
echo After uploading, visit http://trendtacticsdigital.com/update-hub-cpanel.php
echo.
pause
`;
    
    const batchFile = join(process.cwd(), 'upload-to-cpanel.bat');
    writeFileSync(batchFile, batchContent);
    console.log(`\n🔧 Windows batch file created: ${batchFile}`);
    console.log('   Double-click this file for quick upload instructions');
}

console.log('\n🎉 Ready for deployment!');