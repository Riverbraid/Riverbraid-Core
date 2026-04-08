module.exports = {
  include(file, root) {
    const path = require('path');
    const rel = path.relative(root, file);

    //  absolute exclusions (the "Observer" files)
    const blocked = [
      'constitution.snapshot.json',
      'constitution.signature.json',
      'constitution.threshold.json',
      'run-vectors.cjs',
      'package.json',
      'package-lock.json',
      'snapshot.schema.cjs'
    ];

    if (blocked.includes(rel)) return false;

    //  system directories
    if (
      rel.startsWith('.git') ||
      rel.startsWith('node_modules') ||
      rel.startsWith('.rb_devlogs')
    ) return false;

    return true;
  }
};
