// Extract credentials from ENV_SETUP.md and add to .env file
const fs = require('fs');
const path = require('path');

const docPath = path.join(__dirname, 'ENV_SETUP.md');
const envPath = path.join(__dirname, '..', '.env');

try {
  // Read the documentation file
  const docContent = fs.readFileSync(docPath, 'utf8');
  
  // Extract the credentials using regex
  const urlMatch = docContent.match(/SUPABASE_URL=(https:\/\/[^\s]+)/);
  const anonMatch = docContent.match(/SUPABASE_ANON_KEY=([^\s]+)/);
  const serviceMatch = docContent.match(/SUPABASE_SERVICE_ROLE_KEY=([^\s]+)/);
  
  if (!urlMatch || !serviceMatch) {
    console.error('❌ Could not find Supabase credentials in ENV_SETUP.md');
    process.exit(1);
  }
  
  const supabaseUrl = urlMatch[1];
  const supabaseAnonKey = anonMatch ? anonMatch[1] : '';
  const supabaseServiceKey = serviceMatch[1];
  
  console.log('✅ Found Supabase credentials in ENV_SETUP.md');
  console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`);
  console.log(`   Service Key: ${supabaseServiceKey.substring(0, 20)}...`);
  
  // Read existing .env file or create new
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Remove old Supabase entries if they exist
  envContent = envContent.replace(/# Supabase Configuration[\s\S]*?SUPABASE_SERVICE_ROLE_KEY=[^\n]+\n/g, '');
  envContent = envContent.replace(/SUPABASE_URL=[^\n]+\n/g, '');
  envContent = envContent.replace(/SUPABASE_ANON_KEY=[^\n]+\n/g, '');
  envContent = envContent.replace(/SUPABASE_SERVICE_ROLE_KEY=[^\n]+\n/g, '');
  
  // Add new Supabase configuration
  const supabaseConfig = `
# Supabase Configuration
SUPABASE_URL=${supabaseUrl}
SUPABASE_ANON_KEY=${supabaseAnonKey}
SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceKey}
`;
  
  // Append to .env file
  envContent = envContent.trim() + supabaseConfig;
  
  // Write to .env file
  fs.writeFileSync(envPath, envContent);
  
  console.log('\n✅ Successfully copied credentials to .env file!');
  console.log('   Location: ' + envPath);
  console.log('\n⚠️  Security Note:');
  console.log('   - Remove credentials from ENV_SETUP.md (they should not be in documentation)');
  console.log('   - .env is already in .gitignore (safe)');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

