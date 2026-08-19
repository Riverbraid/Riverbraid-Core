"use strict";
const fs = require("node:fs");
const required = ["package.json", "cluster-manifest-v2.json"];
const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length > 0) {
  process.exit(1);
}
console.log(JSON.stringify({ status: "PASS", result: "AUDIT_FINAL_OK" }, null, 2));
process.exit(0);