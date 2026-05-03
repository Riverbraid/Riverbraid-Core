import fs from "node:fs";
import crypto from "node:crypto";
const repo = "Riverbraid-Core";
const requiredFiles = ["package.json","AUTHORITY.md","RING.md","cluster-manifest-v2.json","constellation-audit.mjs"];
const missing = requiredFiles.filter((file) => !fs.existsSync(file));
const hash = crypto.createHash("sha256");
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    hash.update(file);
    hash.update("\0");
    hash.update(fs.readFileSync(file));
    hash.update("\0");
  }
}
const ok = missing.length === 0;
const output = {
  repo,
  status: ok ? "VERIFIED" : "FAILED",
  verification_scope: "ring0-file-surface",
  claim_boundary: "declared-conditions-only",
  required_files: requiredFiles,
  missing_files: missing,
  failure_codes: ok ? [] : ["REQUIRED_FILES_MISSING"],
  digest: "sha256:" + hash.digest("hex")
};
fs.writeFileSync("verify-output.json", JSON.stringify(output, null, 2));
process.exit(ok ? 0 : 1);