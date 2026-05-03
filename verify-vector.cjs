const fs = require('fs');
const crypto = require('crypto');

/** 
 * Ground Truth: df8fc8e4 
 * Established: 2026-05-03
 * Protocol: Absolute V2 (RDK v1.5.0)
 */
const EXPECTED_HASH = 'df8fc8e4'; 

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.js') || f.endsWith('.cjs'));
let hashSum = crypto.createHash('sha256');

files.forEach(file => {
    const content = fs.readFileSync(file);
    hashSum.update(content);
});

const computed = hashSum.digest('hex').substring(0, 8);

if (computed === EXPECTED_HASH) {
    console.log(computed);
    process.exit(0);
} else {
    console.error('VERIFICATION_FAIL: HASH_MISMATCH (Computed: ' + computed + ')');
    process.exit(1);
}