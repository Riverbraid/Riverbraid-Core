import fs from "node:fs";
import path from "node:path";

const fatal = (msg) => {
  console.error(`[FAIL-CLOSED] ${msg}`);
  process.exit(1);
};

try {
  const contract = JSON.parse(fs.readFileSync("./identity.contract.json", "utf8"));
  console.log(`[VERIFY] Auditing Petal: ${contract.name} v${contract.version}`);

  if (!Array.isArray(contract.governed_files)) {
    fatal("Missing governed_files array in identity.contract.json");
  }

  for (const file of contract.governed_files) {
    if (!fs.existsSync(path.resolve(file))) {
      fatal(`Governed file missing: ${file}`);
    }
    console.log(`[OK] ${file} present.`);
  }

  if (contract.invariants?.entropy_ban) {
    const checkFiles = ["index.js"].filter(f => fs.existsSync(f));
    for (const f of checkFiles) {
      const content = fs.readFileSync(f, "utf8");
      if (content.includes("Date.now()") || content.includes("new Date()")) {
        fatal(`Entropy violation in ${f}: Dynamic time detected.`);
      }
    }
  }
} catch (e) {
  fatal(`Audit crashed: ${e.message}`);
}
