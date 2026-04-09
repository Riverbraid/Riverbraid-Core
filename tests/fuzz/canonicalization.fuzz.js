const crypto = require('crypto');
// Minimalist check for deterministic output
function test() {
  const data = { b: 1, a: 2 };
  const s1 = JSON.stringify(data);
  const s2 = JSON.stringify({ a: 2, b: 1 });
  if (s1 !== s2) {
    console.log("Fuzz Target: Object keys are non-deterministic.");
  }
}
test();
