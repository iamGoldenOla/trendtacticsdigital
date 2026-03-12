// Test script to verify video files exist and are accessible
const fs = require('fs');
const path = require('path');

const videoFiles = [
  /Trendtactics-digital-promo.mp4',
  /Trendtactics-digital-promo-480p.mp4',
  /Trendtactics-digital-promo-720p.mp4'
];

console.log('Checking video files...\n');

videoFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`✅ ${file} - Found (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
  } else {
    console.log(`❌ ${file} - Not found`);
  }
});

console.log('\nTest complete.');