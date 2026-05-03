import fs from "node:fs";
import path from "node:path";
const manifestPath = path.resolve("cluster-manifest-v2.json");
function readJsonNoBom(file) {
  return JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
}
function safeReadVerifyOutput(file) {
  if (!fs.existsSync(file)) { return { status: "UNAUDITED", failure_codes: ["VERIFY_OUTPUT_MISSING"] }; }
  try { return readJsonNoBom(file); } catch (error) { return { status: "FAILED", failure_codes: ["VERIFY_OUTPUT_PARSE_FAILED"], error: error.message }; }
}
function auditRepo(repo) {
  const repoPath = path.resolve("..", repo.name);
  const required = Array.isArray(repo.required_files) ? repo.required_files : [];
  const missing = required.filter((file) => !fs.existsSync(path.join(repoPath, file)));
  const filesOk = missing.length === 0;
  const verifyOutput = safeReadVerifyOutput(path.join(repoPath, "verify-output.json"));
  let status = verifyOutput.status || "UNAUDITED";
  if (!filesOk) { status = "MISSING_FILES"; }
  return { name: repo.name, ring: repo.ring, class: repo.class || null, status, files_ok: filesOk, missing_files: missing, verify_output_status: verifyOutput.status || null };
}
function summarizeRing(ringNumber, repos) {
  const ringRepos = repos.filter((repo) => repo.ring === ringNumber);
  const results = ringRepos.map(auditRepo);
  const verified = results.filter((repo) => repo.status === "VERIFIED").length;
  const filesPresentUnverified = results.filter((repo) => repo.status === "FILES_PRESENT_UNVERIFIED").length;
  const blocked = results.filter((repo) => ["FAILED", "MISSING_FILES", "UNAUDITED", "ANCHOR_FAILURE"].includes(repo.status)).length;
  let gateStatus = "RING_GATE_BLOCKED";
  if (ringNumber === 3) { gateStatus = "BEST_EFFORT"; } 
  else if (blocked === 0) { gateStatus = filesPresentUnverified > 0 ? "RING_GATE_PASS_CLASSIFIED" : "RING_GATE_PASS_VERIFIED"; }
  return { ring: ringNumber, gate_status: gateStatus, repo_count: results.length, verified_count: verified, files_present_unverified_count: filesPresentUnverified, blocked_count: blocked, results };
}
if (!fs.existsSync(manifestPath)) { process.exit(1); }
const manifest = readJsonNoBom(manifestPath);
const repos = Array.isArray(manifest.repos) ? manifest.repos : [];
const targetRing = process.argv.indexOf("--ring") >= 0 ? Number(process.argv[process.argv.indexOf("--ring") + 1]) : null;
const r0 = summarizeRing(0, repos);
const r1 = summarizeRing(1, repos);
const r2 = summarizeRing(2, repos);
const r3 = summarizeRing(3, repos);
const report = {
  _auditor: "Riverbraid Phase 15 Ring Auditor",
  constellation_status: r0.gate_status === "RING_GATE_BLOCKED" ? "ANCHOR_FAILURE" : (r0.gate_status === "RING_GATE_PASS_VERIFIED" && r1.gate_status === "RING_GATE_PASS_VERIFIED" ? "VERIFIED" : "PARTIAL"),
  ring0_gate_status: r0.gate_status,
  ring1_remediation_allowed: r0.gate_status !== "RING_GATE_BLOCKED",
  rings: targetRing === null ? [r0, r1, r2, r3] : [summarizeRing(targetRing, repos)]
};
console.log(JSON.stringify(report, null, 2));
if (targetRing === 0 && r0.gate_status === "RING_GATE_BLOCKED") { process.exit(1); }
process.exit(0);