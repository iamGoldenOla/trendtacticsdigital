// Create cPanel deployment package
const fs = require('fs');
const path = require('path');

// Files and folders to include in deployment
const deployFiles = [
    'index.html',
    'about.html',
    'academy.html',
    'academy-enroll.html',
    'admin.html',
    'admin-dashboard.html',
    'admin-login.html',
    'analytics-dashboard.html',
    'blog.html',
    'blog-post.html',
    'client-dashboard.html',
    'coming-soon.html',
    'contact.html',
    'dashboard.html',
    'ebooks.html',
    'hub.html',
    'login.html',
    'portfolio.html',
    'pricing.html',
    'privacy-policy.html',
    'quiz.html',
    'register.html',
    'resources.html',
    'services.html',
    'service-web-development.html',
    'service-app-development.html',
    'service-digital-marketing.html',
    'service-email-marketing.html',
    'service-content-creation.html',
    'service-social-media-marketing.html',
    'service-facebook-ads.html',
    'shop.html',
    'trendy-ai.html',
    'tools.html',
    'header.html',
    '.htaccess',
    'robots.txt',
    'sitemap.xml',
    'rss.xml',
    'CNAME',
    'package.json'
];

const deployFolders = [
    'js',
    'styles',
    'images',
    'data',
    'ebooks',
    'components',
    'public'
];

// Create dist folder
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
    console.log('✓ Created dist folder');
}

// Copy HTML files
deployFiles.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(distPath, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`✓ Copied ${file}`);
    } else {
        console.log(`⚠ Skipped (not found): ${file}`);
    }
});

// Copy folders
deployFolders.forEach(folder => {
    const src = path.join(__dirname, folder);
    const dest = path.join(distPath, folder);
    if (fs.existsSync(src)) {
        fs.cpSync(src, dest, { recursive: true });
        console.log(`✓ Copied ${folder}/`);
    } else {
        console.log(`⚠ Skipped (not found): ${folder}/`);
    }
});

console.log('\n✅ Deployment package created in "dist" folder!');
console.log('📦 Ready to upload to cPanel');
