const fs = require('fs');
const path = require('path');

const VECTORS_PATH = '/workspaces/Riverbraid-Golds/vectors.json';
if (!fs.existsSync(VECTORS_PATH)) {
    console.error("Cluster Vectors Missing. Run synchronization from Golds.");
    process.exit(1);
}

const vectors = JSON.parse(fs.readFileSync(VECTORS_PATH, 'utf8'));
const myIdentity = JSON.parse(fs.readFileSync('./identity.contract.json', 'utf8'));

if (vectors[myIdentity.repo_name]) {
    console.log(`[ALIGNED] ${myIdentity.repo_name} matches Cluster Root.`);
} else {
    console.error("[DRIFT] This petal is not recognized by the current Gold Root.");
    process.exit(1);
}
