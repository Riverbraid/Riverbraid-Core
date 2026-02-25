import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_NAME = 'CORE';

function fatal(msg) {
  console.error(`FATAL:${REPO_NAME}:${msg}`);
  process.exit(1);
}

const identityPath = path.join(__dirname, 'identity.contract.json');
if (!fs.existsSync(identityPath)) fatal('Missing identity.contract.json');

const identity = JSON.parse(fs.readFileSync(identityPath, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
  fatal('Core must have zero runtime dependencies.');
}

for (const file of identity.governed_files) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath) && (file.endsWith('.js') || file.endsWith('.mjs'))) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (/[^\x00-\x7F]/.test(content)) fatal(`Non-ASCII characters detected in ${file}`);
  }
}

console.log('PASS:_INVARIANTS');
process.exit(0);
