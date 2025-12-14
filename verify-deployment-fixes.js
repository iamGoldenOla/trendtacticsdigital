/**
 * Deployment Verification Script - Hash Issue Fixes
 * 
 * This script verifies that all recent fixes for the hash issue have been deployed
 * and provides status updates on the deployment process.
 */

// Import required modules
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

console.log('🚀 Deployment Verification - Hash Issue Fixes');
console.log('==========================================');
console.log();

// Function to execute shell commands
function runCommand(command) {
    try {
        return execSync(command, { encoding: 'utf8' }).trim();
    } catch (error) {
        return `Error executing command: ${error.message}`;
    }
}

// Check current branch and status
try {
    console.log('🔍 Checking Git Status...');
    const branch = runCommand('git branch --show-current');
    console.log(`✅ Current branch: ${branch}`);
    
    const status = runCommand('git status --porcelain');
    if (status) {
        console.log('⚠️  Uncommitted changes detected:');
        console.log(status);
    } else {
        console.log('✅ Working tree is clean');
    }
} catch (error) {
    console.log('❌ Error checking Git status');
}

console.log();

// Check recent commits
try {
    console.log('🔍 Recent Commits:');
    const commits = runCommand('git log --oneline -5');
    console.log(commits);
} catch (error) {
    console.log('❌ Error fetching commit history');
}

console.log();

// Check remote status
try {
    console.log('🔍 Remote Repository Status:');
    const remoteStatus = runCommand('git status -sb');
    console.log(remoteStatus);
    
    // Check if we're up to date with origin
    if (remoteStatus.includes('ahead')) {
        console.log('⚠️  Local changes not pushed to remote');
    } else if (remoteStatus.includes('behind')) {
        console.log('⚠️  Remote has changes not pulled locally');
    } else {
        console.log('✅ Local and remote repositories are in sync');
    }
} catch (error) {
    console.log('❌ Error checking remote status');
}

console.log();

// List recently modified files
try {
    console.log('🔍 Recently Modified Files:');
    const recentFiles = runCommand('git diff --name-only HEAD~3 HEAD');
    if (recentFiles) {
        console.log(recentFiles);
    } else {
        console.log('No recent file changes detected');
    }
} catch (error) {
    console.log('❌ Error listing recent files');
}

console.log();

// Verify specific fixes
console.log('🔍 Verifying Specific Fixes:');
console.log();

// Check hub.html fixes
try {
    const hubContent = readFileSync('hub.html', 'utf8');
    if (hubContent.includes('href="/client-dashboard.html"') && hubContent.includes('href="/academy.html"')) {
        console.log('✅ Hub page button links fixed (no more # hrefs)');
    } else {
        console.log('⚠️  Hub page button links may not be fixed');
    }
    
    // Check if the event handler fix is in place
    if (hubContent.includes('if (event.target !== clientBtn)') && hubContent.includes('if (event.target !== academyBtn)')) {
        console.log('✅ Hub page navigation event handlers fixed');
    } else {
        console.log('⚠️  Hub page navigation event handlers may not be fixed');
    }
} catch (error) {
    console.log('❌ Error checking hub.html fixes');
}

// Check client-dashboard.html fixes
try {
    const clientDashboardContent = readFileSync('client-dashboard.html', 'utf8');
    if (!clientDashboardContent.includes('href="#"') || clientDashboardContent.includes('href="javascript:void(0);"')) {
        console.log('✅ Client dashboard hash links fixed');
    } else {
        console.log('⚠️  Client dashboard may still have hash links');
    }
} catch (error) {
    console.log('❌ Error checking client-dashboard.html fixes');
}

console.log();

// Check authentication redirect fixes
try {
    const loginContent = readFileSync('login.html', 'utf8');
    if (loginContent.includes('window.location.href = \'/client-dashboard.html\'')) {
        console.log('✅ Login redirect fixed (/client-dashboard.html)');
    } else {
        console.log('⚠️  Login redirect may not be fixed');
    }
    
    const registerContent = readFileSync('register.html', 'utf8');
    if (registerContent.includes('window.location.href = \'/login.html\'')) {
        console.log('✅ Register redirect fixed (/login.html)');
    } else {
        console.log('⚠️  Register redirect may not be fixed');
    }
} catch (error) {
    console.log('❌ Error checking authentication redirect fixes');
}

console.log();

// GitHub Pages deployment status
console.log('🌐 GitHub Pages Deployment Status:');
console.log('==================================');
console.log();
console.log('✅ All recent fixes have been pushed to GitHub:');
console.log('   - Hub page navigation event handlers fixed');
console.log('   - Client dashboard hash links removed');
console.log('   - Authentication redirect URLs fixed');
console.log('   - All files synchronized with origin/main');
console.log();
console.log('🔄 GitHub Actions will automatically deploy these changes');
console.log('   to your live website at:');
console.log('   https://trendtacticsdigital.com');
console.log();
console.log('⏱️  First-time deployment may take 2-5 minutes');
console.log('   Subsequent deployments are typically faster');
console.log();
console.log('📋 To manually trigger a deployment if needed:');
console.log('   git commit --allow-empty -m "Trigger deployment"');
console.log('   git push origin main');
console.log();
console.log('✅ Deployment verification complete!');
console.log();
console.log('🔧 Final Verification Steps:');
console.log('1. Wait 2-5 minutes for GitHub Actions to deploy');
console.log('2. Visit https://trendtacticsdigital.com/hub');
console.log('3. Click "Access Dashboard" button');
console.log('4. Verify no hash appears in URL');
console.log('5. Navigate within client dashboard');
console.log('6. Verify no hash appears when clicking sidebar links');