
import fs from 'fs';
import path from 'path';

const distPath = './dist';
const requiredFiles = [
  'index.html',
  '.htaccess',
  'web.config',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico'
];

const requiredDirectories = [
  'assets',
  'lovable-uploads'
];

console.log('🔍 Verifying deployment build...\n');

// Check if dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('❌ dist directory not found! Run "npm run build" first.');
  process.exit(1);
}

// Check required files
let missingFiles = [];
requiredFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  } else {
    console.log(`✅ ${file} - Found`);
  }
});

// Check required directories
let missingDirectories = [];
requiredDirectories.forEach(dir => {
  const dirPath = path.join(distPath, dir);
  if (!fs.existsSync(dirPath)) {
    missingDirectories.push(dir);
  } else {
    const files = fs.readdirSync(dirPath);
    console.log(`✅ ${dir}/ - Found (${files.length} files)`);
  }
});

// Check if assets directory has expected structure
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  const assetDirs = fs.readdirSync(assetsPath).filter(item => 
    fs.statSync(path.join(assetsPath, item)).isDirectory()
  );
  console.log(`📁 Assets structure: ${assetDirs.join(', ')}`);
}

// Check index.html for proper asset references
const indexPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Check for proper asset references
  const hasJS = indexContent.includes('assets/js/');
  const hasCSS = indexContent.includes('assets/css/');
  
  console.log(`🔗 Index.html asset references:`);
  console.log(`   JavaScript: ${hasJS ? '✅' : '❌'}`);
  console.log(`   CSS: ${hasCSS ? '✅' : '❌'}`);
  
  // Check for proper favicon reference
  const hasFavicon = indexContent.includes('favicon.ico');
  console.log(`   Favicon: ${hasFavicon ? '✅' : '❌'}`);
}

// Summary
console.log('\n📊 Deployment Summary:');
if (missingFiles.length > 0) {
  console.log(`❌ Missing files: ${missingFiles.join(', ')}`);
}
if (missingDirectories.length > 0) {
  console.log(`❌ Missing directories: ${missingDirectories.join(', ')}`);
}

if (missingFiles.length === 0 && missingDirectories.length === 0) {
  console.log('✅ All required files and directories are present!');
  console.log('\n🚀 Ready for deployment via FileZilla!');
  console.log('\nDeployment Instructions:');
  console.log('1. Open FileZilla and connect to your server');
  console.log('2. Navigate to your domain\'s root directory (usually public_html)');
  console.log('3. Upload ALL files and folders from the dist/ directory');
  console.log('4. Ensure hidden files like .htaccess are uploaded');
  console.log('5. Test your site by visiting your domain');
} else {
  console.log('\n❌ Build verification failed! Please check the issues above.');
  process.exit(1);
}
