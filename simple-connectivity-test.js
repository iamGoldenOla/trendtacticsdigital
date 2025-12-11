// Simple connectivity test to check if we can reach Supabase
// Run with: node simple-connectivity-test.js

const https = require('https');

function testConnectivity() {
    console.log('Testing basic connectivity to Supabase...');
    
    const url = 'https://wtgwxnhnqdnbzpetltrt.supabase.co/';
    
    const req = https.get(url, (res) => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
        
        res.on('data', (chunk) => {
            // Just read a small portion to confirm connectivity
            console.log('Received data chunk (first 200 chars):');
            console.log(chunk.toString().substring(0, 200));
        });
        
        res.on('end', () => {
            console.log('Connection test completed successfully');
        });
    });
    
    req.on('error', (e) => {
        console.error('Connection test failed:');
        console.error(`Error: ${e.message}`);
        if (e.code) {
            console.error(`Error Code: ${e.code}`);
        }
    });
    
    req.setTimeout(15000, () => {
        console.error('Connection test timed out');
        req.destroy();
    });
}

testConnectivity();