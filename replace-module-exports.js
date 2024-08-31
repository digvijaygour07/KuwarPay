import fs from 'fs';
import path from 'path';

// Function to replace `module.exports` with `module.exports`
function replaceModuleExports(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      replaceModuleExports(filePath); // Recursively process directories
    } else if (stat.isFile() && filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('module.exports')) {
        content = content.replace(/module\.exports\s*=\s*/g, 'module.exports ');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Replaced in ${filePath}`);
      }
    }
  });
}

// Replace './src' with the correct directory path
replaceModuleExports('./netlify/functions/api'); // Adjust the path as needed

