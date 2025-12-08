// Script to add Supabase environment variables to .env file
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');

// Supabase environment variables to add
const supabaseVars = `
# Supabase Configuration
# Get these from your Supabase project dashboard: https://app.supabase.com
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
`;

try {
  // Check if .env file exists
  if (fs.existsSync(envPath)) {
    const existingContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if Supabase variables already exist
    if (existingContent.includes('SUPABASE_URL')) {
      console.log('⚠️  Supabase variables already exist in .env file');
      console.log('   Please update them manually if needed.');
    } else {
      // Append Supabase variables
      fs.appendFileSync(envPath, supabaseVars);
      console.log('✅ Added Supabase environment variables to .env file');
      console.log('   Please update the placeholder values with your actual Supabase credentials.');
    }
  } else {
    // Create new .env file with Supabase variables
    fs.writeFileSync(envPath, supabaseVars.trim() + '\n');
    console.log('✅ Created .env file with Supabase environment variables');
    console.log('   Please update the placeholder values with your actual Supabase credentials.');
  }
  
  console.log('\n📝 Next steps:');
  console.log('   1. Open .env file in the project root');
  console.log('   2. Replace the placeholder values with your Supabase credentials');
  console.log('   3. Get credentials from: https://app.supabase.com → Settings → API');
  
} catch (error) {
  console.error('❌ Error updating .env file:', error.message);
  console.log('\n📝 Manual steps:');
  console.log('   1. Open .env file in the project root');
  console.log('   2. Add these lines:');
  console.log('   SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('   SUPABASE_ANON_KEY=your-anon-key-here');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here');
  console.log('   3. Replace with your actual values from Supabase dashboard');
}

