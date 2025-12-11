#!/usr/bin/env node

/**
 * Package Supabase Edge Functions for deployment
 * This script helps organize functions for easier deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Packaging Supabase Edge Functions for Deployment...\n');

// Function categories
const functionCategories = {
  'system': ['health'],
  'auth': ['register', 'login', 'logout', 'get-user', 'update-profile'],
  'ai': ['chat', 'generate-image', 'analyze-content'],
  'courses': ['get-courses', 'get-course', 'enroll', 'get-enrollments', 'update-progress'],
  'users': ['get-profile', 'update-profile', 'get-learning-stats', 'update-learning-stats', 'get-preferences', 'update-preferences']
};

// Utility functions
const utilFiles = ['supabaseClient', 'auth', 'keyRotation'];

// Create deployment directory
const deploymentDir = path.join(__dirname, 'deployment-packages');
if (!fs.existsSync(deploymentDir)) {
  fs.mkdirSync(deploymentDir);
  console.log(`📁 Created deployment directory: ${deploymentDir}`);
}

// Package utility files
const utilsDir = path.join(deploymentDir, 'utils');
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir);
  console.log('\n🔧 Packaging Utility Files:');
  
  utilFiles.forEach(file => {
    const sourcePath = path.join(__dirname, '_utils', `${file}.ts`);
    const destPath = path.join(utilsDir, `${file}.ts`);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`   ✅ ${file}.ts`);
    } else {
      console.log(`   ❌ ${file}.ts (not found)`);
    }
  });
}

// Package function categories
Object.keys(functionCategories).forEach(category => {
  const categoryDir = path.join(deploymentDir, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir);
    console.log(`\n📂 Packaging ${category.charAt(0).toUpperCase() + category.slice(1)} Functions:`);
    
    functionCategories[category].forEach(func => {
      const sourcePath = path.join(__dirname, category, `${func}.ts`);
      const destPath = path.join(categoryDir, `${func}.ts`);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`   ✅ ${func}.ts`);
      } else {
        console.log(`   ❌ ${func}.ts (not found)`);
      }
    });
  }
});

// Create deployment instructions
const instructions = `
# Supabase Edge Functions Deployment Instructions

## Prerequisites
1. Ensure all environment variables are set in your Supabase Dashboard
2. Ensure your Supabase database schema is deployed

## Deployment Order
Deploy functions in this order:
1. System functions (health check)
2. Authentication functions
3. AI functions
4. Course functions
5. User functions

## Deployment Steps
1. Go to your Supabase Dashboard
2. Navigate to Functions
3. Click "Create Function"
4. Enter function details:
   - Name: Use the filename without extension
   - Slug: Same as name
   - File: Select the .ts file from the appropriate folder in this package
5. Click "Create Function"
6. Repeat for all functions

## Environment Variables Required
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_ANON_KEY
- CLIENT_URL
- OPENROUTER_KEY_1 through OPENROUTER_KEY_21
- OPENAI_API_KEY (optional)
- GOOGLE_AI_API_KEY (optional)

## Testing
After deployment, test functions using:
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/FUNCTION_NAME

For functions requiring authentication, include:
-H "Authorization: Bearer YOUR_JWT_TOKEN"
`;

fs.writeFileSync(path.join(deploymentDir, 'DEPLOYMENT_INSTRUCTIONS.txt'), instructions.trim());
console.log('\n📝 Created deployment instructions');

console.log('\n✅ Packaging complete!');
console.log(`📁 Deployment package located at: ${deploymentDir}`);
console.log('\nNext steps:');
console.log('1. Review the DEPLOYMENT_INSTRUCTIONS.txt file');
console.log('2. Deploy functions via Supabase Dashboard in the specified order');
console.log('3. Test each function after deployment');