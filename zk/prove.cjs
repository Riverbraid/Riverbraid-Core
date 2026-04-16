const { foldHash } = require('./recursive-hash.cjs');
const fs = require('fs');

const prevProof = process.argv[2] || "0";
const root = fs.readFileSync('MERKLE_ROOT', 'utf8').trim();
const hardwareId = "NODE-01";

const newProof = foldHash(prevProof, root, hardwareId);

console.log(`\n--- Recursive Proof Generated ---`);
console.log(`Input Proof:  ${prevProof}`);
console.log(`State Root:   ${root}`);
console.log(`New Proof:    ${newProof}\n`);
