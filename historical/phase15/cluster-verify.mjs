import { readFileSync } from "fs";
import { execFileSync } from "child_process";
import path from "path";

const OWNER = "Riverbraid";
const EXPECTED_REPO_COUNT = 30;

function run(command, args, cwd = process.cwd()) {
  return execFileSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function loadJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));
}

console.log("\n--- RIVERBRAID CLUSTER VERIFICATION ---");

const registry = loadJson("./phase20-cross-repo-anchor-registry.json");
const repos = Array.isArray(registry.repos) ? registry.repos : [];

if (repos.length !== EXPECTED_REPO_COUNT) {
  fail(`RIVERBRAID_CLUSTER_VERIFICATION_FAIL registry_count=${repos.length}`);
}

const results = [];

for (const entry of repos) {
  const repoName = entry.repo;
  if (!repoName || typeof repoName !== "string") {
    fail("RIVERBRAID_CLUSTER_VERIFICATION_FAIL invalid registry entry");
  }

  const repoPath = path.resolve("..", repoName);
  const ghRepo = `${OWNER}/${repoName}`;

  process.stdout.write(`Checking ${repoName}... `);

  try {
    run("git", ["-C", repoPath, "fetch", "origin"]);
    const localHead = run("git", ["-C", repoPath, "rev-parse", "HEAD"]);
    const remoteHead = run("git", ["-C", repoPath, "rev-parse", "origin/main"]);
    const status = run("git", ["-C", repoPath, "status", "--short"]);
    
    const aligned = localHead === remoteHead;
    const clean = status.length === 0;

    const runsJson = run("gh", [
      "run",
      "list",
      "--repo",
      ghRepo,
      "--branch",
      "main",
      "--limit",
      "30",
      "--json",
      "databaseId,workflowName,headSha,status,conclusion,url,createdAt"
    ]);

    const runs = JSON.parse(runsJson);
    const successfulCurrentRun = runs.find((runItem) => {
      return (
        runItem.headSha === remoteHead &&
        runItem.status === "completed" &&
        runItem.conclusion === "success"
      );
    });

    const pass = clean && aligned && Boolean(successfulCurrentRun);

    results.push({
      repo: repoName,
      clean,
      local_remote_aligned: aligned,
      remote_head: remoteHead,
      workflow_remote_passing: Boolean(successfulCurrentRun),
      pass
    });

    console.log(pass ? "PASS" : "FAIL");
  } catch (error) {
    results.push({
      repo: repoName,
      pass: false,
      error: error.message
    });
    console.log("ERROR");
  }
}

const passing = results.filter((result) => result.pass).length;
const failing = results.filter((result) => !result.pass);

console.log("\n--- CLUSTER VERIFICATION SUMMARY ---");
console.log(`repos_checked: ${results.length}`);
console.log(`repos_passing: ${passing}`);
console.log(`repos_failing: ${failing.length}`);

if (passing === EXPECTED_REPO_COUNT) {
  console.log("\nRIVERBRAID_CLUSTER_VERIFICATION_PASS");
  process.exit(0);
}

console.log("\nRIVERBRAID_CLUSTER_VERIFICATION_FAIL");
for (const item of failing) {
  console.log(JSON.stringify(item));
}
process.exit(1);
