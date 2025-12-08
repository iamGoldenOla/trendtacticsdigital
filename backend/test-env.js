// Test Environment Variables
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

console.log('🔍 Checking Environment Variables...\n');

const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
const optional = ['SUPABASE_ANON_KEY'];

let allGood = true;

required.forEach(key => {
  const value = process.env[key];
  if (!value || value.includes('your-') || value.includes('placeholder')) {
    console.error(`❌ ${key}: Not set or still has placeholder value`);
    allGood = false;
  } else {
    // Show first and last 4 chars for security
    const masked = value.length > 8 
      ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
      : '***';
    console.log(`✅ ${key}: ${masked}`);
  }
});

optional.forEach(key => {
  const value = process.env[key];
  if (value && !value.includes('your-') && !value.includes('placeholder')) {
    const masked = value.length > 8 
      ? `${value.substring(0, 4)}...${value.substring(value.length - 4)}`
      : '***';
    console.log(`✅ ${key}: ${masked} (optional)`);
  } else {
    console.log(`⚠️  ${key}: Not set (optional)`);
  }
});

if (!allGood) {
  console.log('\n❌ Please update your .env file with actual Supabase credentials');
  console.log('   Get them from: https://app.supabase.com → Settings → API');
  process.exit(1);
}

console.log('\n✅ All environment variables are set correctly!');
console.log('\n💡 Next: Run "node test-supabase.js" to test the connection');

