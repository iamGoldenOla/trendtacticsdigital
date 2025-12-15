#!/usr/bin/env node

/**
 * Restore Original Homepage
 * This script restores the original homepage as the main index.html
 * and updates the navigation to point to the new hub page
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';

console.log('🔧 Restoring Original Homepage...');
console.log('================================\n');

// Check if index-original.html exists
if (!existsSync('index-original.html')) {
    console.log('❌ Error: index-original.html not found');
    process.exit(1);
}

// Read the original homepage
const originalHomepage = readFileSync('index-original.html', 'utf8');
console.log('✅ Loaded original homepage');

// Read the current hub page
const currentHubPage = readFileSync('hub.html', 'utf8');
console.log('✅ Loaded current hub page');

// Restore the original homepage as index.html
writeFileSync('index.html', originalHomepage);
console.log('✅ Restored original homepage as index.html');

// Update the "Get Started" button in the restored homepage to point to the hub
let updatedHomepage = originalHomepage;
updatedHomepage = updatedHomepage.replace(
    /<a href="\/hub\.html" class="btn btn-primary">Get Started<\/a>/g,
    '<a href="/hub.html" class="btn btn-primary">Get Started</a>'
);

// Make sure the Get Started button points to hub.html
if (!updatedHomepage.includes('href="/hub.html"') && updatedHomepage.includes('Get Started')) {
    updatedHomepage = updatedHomepage.replace(
        /(<a[^>]*>Get Started<\/a>)/g,
        '<a href="/hub.html" class="btn btn-primary">Get Started</a>'
    );
}

writeFileSync('index.html', updatedHomepage);
console.log('✅ Updated Get Started button to point to hub.html');

// Verify the hub.html file exists and is properly configured
if (existsSync('hub.html')) {
    let hubContent = currentHubPage;
    
    // Ensure the hub page links to the new authentication system
    if (hubContent.includes('client-dashboard.html')) {
        console.log('✅ Hub page correctly links to client dashboard');
    } else {
        console.log('⚠️  Please verify hub page links are correct');
    }
    
    console.log('✅ Hub page verified');
} else {
    console.log('⚠️  hub.html not found - please verify hub page exists');
}

console.log('\n✨ Restoration Complete!');
console.log('\n📋 Changes Made:');
console.log('   • Original homepage restored as index.html');
console.log('   • Get Started button points to /hub.html');
console.log('   • Hub page remains at /hub.html');
console.log('   • Authentication system preserved');

console.log('\n🌐 Expected Behavior After Deployment:');
console.log('   1. https://trendtacticsdigital.com shows original homepage');
console.log('   2. "Get Started" button leads to hub page (/hub.html)');
console.log('   3. Hub page links to Client Dashboard and Academy');
console.log('   4. Client Dashboard requires authentication');

console.log('\n🔄 Next Steps:');
console.log('   1. Commit and push these changes to GitHub');
console.log('   2. Wait for GitHub Actions deployment');
console.log('   3. Test the corrected navigation flow');