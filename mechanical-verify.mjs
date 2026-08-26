import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const PROFILE_PATH = path.join(ROOT, "mechanical-profile.json");

function sha256(bytes) {
  return crypto.createHash("sha256").update(bytes).digest("hex");
}

function git(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

function gitBlob(relPath) {
  return git(["hash-object", "--", relPath]);
}

function check(id, pass, evidence = {}) {
  return { check_ref: `urn:riverbraid:check:${id}:v0.1`, result: pass ? "PASS" : "FAIL", evidence };
}

const checks = [];
let profile;
try {
  profile = JSON.parse(fs.readFileSync(PROFILE_PATH, "utf8"));
} catch (error) {
  console.log(JSON.stringify({
    result_id: "urn:riverbraid:result:core-mechanical-boundary:invalid-profile",
    subject_ref: "https://github.com/Riverbraid/Riverbraid-Core",
    subject_commit: null,
    profile_ref: "urn:riverbraid:core:mechanical-profile:v0.1",
    evaluator_ref: "Riverbraid-Core/mechanical-verify.mjs",
    checks: [],
    result: "INVALID_ATTEMPT",
    evidence_refs: [],
    nonclaims: ["NO_TRUTH_OR_TRUST_JUDGMENT","NO_CERTIFICATION","NO_GENERAL_SUITABILITY"],
    error: error.message
  }, null, 2));
  process.exit(2);
}

const required = Array.isArray(profile.required_current_files) ? profile.required_current_files : [];
const missing = required.filter((rel) => !fs.existsSync(path.join(ROOT, rel)));
checks.push(check("required-current-files", missing.length === 0, { missing }));

const forbidden = Array.isArray(profile.forbidden_current_legacy_paths) ? profile.forbidden_current_legacy_paths : [];
const stillCurrent = forbidden.filter((rel) => fs.existsSync(path.join(ROOT, rel)));
checks.push(check("legacy-detached-from-current-root", stillCurrent.length === 0, { still_current: stillCurrent }));

const historicalExpected = profile.historical_phase15_blobs || {};
const historicalMismatches = [];
for (const [rel, expectedBlob] of Object.entries(historicalExpected)) {
  const absolute = path.join(ROOT, rel);
  if (!fs.existsSync(absolute)) {
    historicalMismatches.push({ path: rel, reason: "MISSING" });
    continue;
  }
  try {
    const actualBlob = gitBlob(rel);
    if (actualBlob !== expectedBlob) {
      historicalMismatches.push({ path: rel, reason: "BLOB_MISMATCH", expected: expectedBlob, actual: actualBlob });
    }
  } catch (error) {
    historicalMismatches.push({ path: rel, reason: "HASH_UNAVAILABLE", error: error.message });
  }
}
checks.push(check("historical-phase15-byte-identity", historicalMismatches.length === 0, { mismatches: historicalMismatches }));

const requiredNonAuthorities = new Set([
  "TRUTH","TRUST","EVIDENTIARY_WEIGHT","INTERPRETATION","LEGITIMACY","MEANING",
  "MORAL_PRIORITY","RISK_RANKING","READINESS","CERTIFICATION","ADOPTION_JUDGMENT"
]);
const declared = new Set(Array.isArray(profile.non_authorities) ? profile.non_authorities : []);
const missingNonAuthorities = [...requiredNonAuthorities].filter((x) => !declared.has(x));
checks.push(check("non-authority-boundary", missingNonAuthorities.length === 0, { missing: missingNonAuthorities }));

checks.push(check(
  "unknown-extension-preservation-policy",
  profile.unknown_extension_policy === "PRESERVE_OPAQUELY_NO_NETWORK_DEREFERENCE_FOR_STRUCTURAL_VALIDATION",
  { observed: profile.unknown_extension_policy || null }
));

checks.push(check(
  "relationship-meaning-outside-core",
  profile.relationship_policy?.predicate_meaning === "OUTSIDE_CORE_IN_DECLARED_NAMESPACED_VOCABULARY_OR_PROFILE" &&
  profile.relationship_policy?.mapping_semantics === "ATTRIBUTED_SCOPED_ASSERTION_NOT_AUTOMATIC_EQUIVALENCE",
  { observed: profile.relationship_policy || null }
));

let subjectCommit = null;
let subjectTree = null;
try {
  subjectCommit = git(["rev-parse", "HEAD"]);
  subjectTree = git(["rev-parse", "HEAD^{tree}"]);
} catch {}

const profileBytes = fs.readFileSync(PROFILE_PATH);
const result = checks.every((c) => c.result === "PASS") ? "PASS" : "FAIL";
const output = {
  result_id: `urn:riverbraid:result:core-mechanical-boundary:${subjectCommit || "unknown"}`,
  subject_ref: "https://github.com/Riverbraid/Riverbraid-Core",
  subject_commit: subjectCommit,
  subject_tree: subjectTree,
  profile_ref: profile.profile_id,
  profile_definition_sha256: sha256(profileBytes),
  evaluator_ref: "Riverbraid-Core/mechanical-verify.mjs",
  checks,
  result,
  evidence_refs: [
    "mechanical-profile.json",
    "PROTOCOL-BOUNDARY.md",
    "historical/phase15/"
  ],
  nonclaims: [
    "NO_TRUTH_OR_TRUST_JUDGMENT",
    "NO_EVIDENTIARY_WEIGHT_JUDGMENT",
    "NO_CERTIFICATION",
    "NO_GENERAL_SUITABILITY",
    "NO_EXTERNAL_AUDIT_CLAIM",
    "NO_DOWNSTREAM_AI_BEHAVIOR_CLAIM"
  ]
};
console.log(JSON.stringify(output, null, 2));
process.exit(result === "PASS" ? 0 : 1);
