const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Creating deployment package...\n');

// Clean up old dist folder
if (fs.existsSync('dist')) {
    console.log('Removing old dist folder...');
    fs.rmSync('dist', { recursive: true, force: true });
}

// Create fresh dist folder
fs.mkdirSync('dist');

// Essential files to include
const essentialFiles = [
    'index.html', 'about.html', 'academy.html', 'academy-enroll.html',
    'admin.html', 'admin-dashboard.html', 'admin-login.html',
    'analytics-dashboard.html', 'blog.html', 'blog-post.html',
    'client-dashboard.html', 'coming-soon.html', 'contact.html',
    'dashboard.html', 'ebooks.html', 'hub.html', 'login.html',
    'portfolio.html', 'pricing.html', 'privacy-policy.html',
    'quiz.html', 'register.html', 'resources.html', 'services.html',
    'service-web-development.html', 'service-app-development.html',
    'service-digital-marketing.html', 'service-email-marketing.html',
    'service-content-creation.html', 'service-social-media-marketing.html',
    'service-facebook-ads.html', 'shop.html', 'trendy-ai.html',
    'tools.html', 'header.html'
];

// Config files
const configFiles = ['.htaccess', 'robots.txt', 'sitemap.xml', 'rss.xml', 'CNAME', 'package.json'];

// Folders to include
const folders = ['js', 'styles', 'data', 'ebooks', 'components', 'public', 'videos'];

let copiedCount = 0;

// Copy HTML files
console.log('Copying HTML files...');
essentialFiles.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join('dist', file));
        copiedCount++;
    }
});

// Copy config files
console.log('Copying config files...');
configFiles.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join('dist', file));
        copiedCount++;
    }
});

// Copy folders
console.log('Copying asset folders...');
folders.forEach(folder => {
    if (fs.existsSync(folder)) {
        fs.cpSync(folder, path.join('dist', folder), { recursive: true });
        copiedCount++;
    }
});

// Copy images selectively (skip large files)
console.log('Copying images...');
if (fs.existsSync('images')) {
    fs.mkdirSync(path.join('dist', 'images'), { recursive: true });

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];
    const maxFileSize = 50 * 1024 * 1024; // 50MB

    // Copy root level images
    fs.readdirSync('images').forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (imageExtensions.includes(ext) && file !== 'images.zip') {
            const filePath = path.join('images', file);
            const stats = fs.statSync(filePath);
            if (stats.size < maxFileSize) {
                fs.copyFileSync(filePath, path.join('dist', 'images', file));
                copiedCount++;
            }
        }
    });

    // Copy subdirectories (brands, team, testimonials, etc.)
    fs.readdirSync('images').forEach(item => {
        const itemPath = path.join('images', item);
        if (fs.statSync(itemPath).isDirectory() && item !== 'videos-for-advert') {
            fs.cpSync(itemPath, path.join('dist', 'images', item), { recursive: true });
            copiedCount++;
        }
    });
}

console.log(`\n✓ Copied ${copiedCount} items to dist folder`);

// Use Windows built-in compression
console.log('\nCompressing to ZIP using Windows native compression...');
try {
    const zipName = 'trendtactics-frontend-deploy.zip';
    if (fs.existsSync(zipName)) fs.unlinkSync(zipName);

    const zipCommand = `Compress-Archive -Path 'dist\\*' -DestinationPath '${zipName}' -Force`;
    execSync(`powershell -Command "${zipCommand}"`, { stdio: 'inherit' });

    // Wait a moment for compression to complete
    setTimeout(() => {
        const zipSize = fs.statSync(zipName);
        const sizeMB = (zipSize.size / (1024 * 1024)).toFixed(2);

        console.log('\n✅ Deployment package created successfully!');
        console.log(`📦 File: ${zipName}`);
        console.log(`📊 Size: ${sizeMB} MB`);
        console.log('\n✅ This ZIP file is compatible with cPanel extraction!');
    }, 3000);
} catch (error) {
    console.error('❌ Error creating ZIP:', error.message);
    console.log('\nTrying alternative method...');

    // Alternative: Just copy to dist and let user zip manually
    console.log('✅ Files copied to "dist" folder.');
    console.log('You can manually zip the dist folder using Windows Explorer:');
    console.log('1. Right-click on dist folder');
    console.log('2. Select "Send to" > "Compressed (zipped) folder)"');
}
