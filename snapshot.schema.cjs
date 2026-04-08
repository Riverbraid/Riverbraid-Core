const path = require('path');
function include(file, root) {
  const rel = path.relative(root, file);
  const excludes = ['.git', 'node_modules', '.rb_devlogs', 'constitution.snapshot.json', 'constitution.signature.json'];
  if (excludes.some(e => rel.includes(e))) return false;
  
  // Core Critical Set
  return rel === 'swarm-signatures.json' || 
         rel.startsWith('bin/') || 
         rel === 'package.json' ||
         rel === 'cluster-repos.json';
}
module.exports = { include };
