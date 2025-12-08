// Test Supabase URL connectivity
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const https = require('https');
const http = require('http');

const supabaseUrl = process.env.SUPABASE_URL;

if (!supabaseUrl) {
  console.error('❌ SUPABASE_URL not found in .env');
  process.exit(1);
}

console.log('🔍 Testing Supabase URL connectivity...\n');
console.log('URL:', supabaseUrl);

// Extract hostname from URL
const urlObj = new URL(supabaseUrl);
const hostname = urlObj.hostname;
const protocol = urlObj.protocol;

console.log('Hostname:', hostname);
console.log('Protocol:', protocol);
console.log('\nTesting connection...\n');

// Try to connect to the Supabase REST endpoint
const testPath = '/rest/v1/';
const options = {
  hostname: hostname,
  port: 443,
  path: testPath,
  method: 'GET',
  headers: {
    'apikey': process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'test',
    'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'test'}`
  },
  timeout: 10000
};

const req = https.request(options, (res) => {
  console.log('✅ Connection successful!');
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  
  if (res.statusCode === 200 || res.statusCode === 401 || res.statusCode === 404) {
    console.log('\n✅ Supabase is reachable!');
    console.log('   (401/404 is normal - means server is responding)');
  }
  
  res.on('data', () => {});
  res.on('end', () => {
    console.log('\n✅ Network connectivity is working');
    console.log('💡 The issue might be with the Supabase client library');
    console.log('   Try running: node test-supabase.js');
  });
});

req.on('error', (error) => {
  console.error('❌ Connection failed:', error.message);
  
  if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
    console.log('\n💡 DNS Resolution Error');
    console.log('   Possible causes:');
    console.log('   1. Internet connection issue');
    console.log('   2. Firewall/proxy blocking connection');
    console.log('   3. Incorrect URL format');
    console.log('   4. VPN or network restrictions');
    console.log('\n💡 Try:');
    console.log('   - Check your internet connection');
    console.log('   - Verify the URL in Supabase dashboard');
    console.log('   - Try accessing: ' + supabaseUrl + '/rest/v1/ in browser');
  } else if (error.code === 'ETIMEDOUT') {
    console.log('\n💡 Connection timeout');
    console.log('   The server might be slow or unreachable');
  } else {
    console.log('\n💡 Error code:', error.code);
  }
});

req.on('timeout', () => {
  console.error('❌ Request timeout');
  req.destroy();
});

req.setTimeout(10000);
req.end();

