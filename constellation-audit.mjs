import fs from "node:fs";
import path from "node:path";
const manifestPath = path.resolve("cluster-manifest-v2.json");

function readJsonNoBom(file) {
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
}

if (!fs.existsSync(manifestPath)) {
  console.error(JSON.stringify({ status: "FAIL", failure_code: "CLUSTER_MANIFEST_MISSING" }, null, 2));
  process.exit(1);
}

let manifest;
try {
  manifest = readJsonNoBom(manifestPath);
} catch (error) {
  console.error(JSON.stringify({ status: "FAIL", error: error.message }, null, 2));
  process.exit(1);
}

const repos = Array.isArray(manifest.repos) ? manifest.repos : [];
const ringArgIndex = process.argv.indexOf("--ring");
const targetRing = ringArgIndex >= 0 ? Number(process.argv[ringArgIndex + 1]) : null;
const filtered = targetRing === null ? repos : repos.filter((repo) => repo.ring === targetRing);

console.log(JSON.stringify({
  status: "PASS",
  result: "CORE_CI_MANIFEST_PARSE_OK",
  claim_boundary: manifest.claim_boundary || "reduced-floor-only",
  repos: filtered.map((repo) => ({ name: repo.name, ring: repo.ring }))
}, null, 2));
process.exit(0);