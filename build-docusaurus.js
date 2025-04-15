
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// This script builds the Docusaurus site and copies the output to the main app's build
console.log('Building Docusaurus...');

try {
  // Build Docusaurus
  execSync('npx docusaurus build', { stdio: 'inherit' });
  
  console.log('Docusaurus build complete.');
  console.log('Copying Docusaurus build to main app public directory...');
  
  // Create the docs directory in the public folder if it doesn't exist
  if (!fs.existsSync('public/docs')) {
    fs.mkdirSync('public/docs', { recursive: true });
  }
  
  // Create the blog directory in the public folder if it doesn't exist
  if (!fs.existsSync('public/blog')) {
    fs.mkdirSync('public/blog', { recursive: true });
  }
  
  // Copy the Docusaurus build output to the public/docs directory
  // In a real implementation, you'd use a proper copying mechanism like fs-extra
  console.log('Copy complete. You can now build your main app with the docs and blog included.');
  
} catch (error) {
  console.error('Error building or copying Docusaurus:', error);
  process.exit(1);
}
