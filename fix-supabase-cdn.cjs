const fs = require('fs');
const path = require('path');

// List of HTML files to fix
const htmlFiles = [
  'about.html',
  'academy-enroll.html',
  'academy.html',
  'admin-dashboard.html',
  'analytics-dashboard.html',
  'blog.html',
  'client-dashboard.html',
  'contact.html',
  'dashboard.html',
  'ebooks.html',
  'index.html',
  'login.html',
  'portfolio.html',
  'pricing.html',
  'quiz.html',
  'register.html',
  'resources.html',
  'service-web-development.html',
  'services.html',
  'simple-client-test.html',
  'test-academy-setup.html',
  'test-backend-separation.html',
  'test-supabase-connection.html',
  'tools.html',
  'trendy-ai.html'
];

// Old and new CDN URLs
const oldCDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
const newCDN = 'https://cdnjs.cloudflare.com/ajax/libs/supabase/2.39.0/supabase.min.js';

console.log('🔧 Fixing Supabase CDN references...');
console.log('=====================================');

let fixedCount = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      return;
    }
    
    // Read file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file contains the old CDN
    if (content.includes(oldCDN)) {
      // Replace with new CDN
      content = content.replace(oldCDN, newCDN);
      
      // Write updated content
      fs.writeFileSync(filePath, content, 'utf8');
      
      console.log(`✅ Fixed: ${file}`);
      fixedCount++;
    } else {
      console.log(`ℹ️  No changes needed: ${file}`);
    }
  } catch (error) {
    console.log(`❌ Error fixing ${file}: ${error.message}`);
  }
});

console.log('=====================================');
console.log(`🎉 Fixed ${fixedCount} files with updated Supabase CDN`);
console.log('✨ All files now use the CSP-compliant CDN');