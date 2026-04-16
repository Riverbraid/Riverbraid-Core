const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      if (!name.includes('node_modules') && !name.includes('.git')) getFiles(name, fileList);
    } else {
      fileList.push(name);
    }
  });
  return fileList;
}

const manifest = {
  timestamp: new Date().toISOString(),
  anchor: fs.readFileSync('MERKLE_ROOT', 'utf8').trim(),
  files: getFiles(process.cwd()).map(f => {
    const content = fs.readFileSync(f);
    return {
      path: path.relative(process.cwd(), f),
      hash: crypto.createHash('sha256').update(content).digest('hex')
    };
  })
};

fs.writeFileSync('MANIFEST.json', JSON.stringify(manifest, null, 2));
console.log("📄 MANIFEST.json generated and sealed.");
