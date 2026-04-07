import fs from 'fs';
import path from 'path';
const ROOT_ANCHOR = "adef13";
const REPOS = ["Riverbraid-Cognition", "Riverbraid-Golds", "Riverbraid-Action-Gold"];
REPOS.forEach(repo => {
    const p = path.join('/workspaces', repo, '.anchor');
    if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8').trim() !== ROOT_ANCHOR) {
        console.error(`[FAIL-CLOSED] ${repo} Anchor Mismatch`);
        process.exit(1);
    }
});
console.log("--- STATIONARY: ROOT AUTHORITY VERIFIED ---");
