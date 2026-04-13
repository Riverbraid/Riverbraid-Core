// Riverbraid-Core: The Single Source of Truth
module.exports = {
  verify: () => require('./verifier/run-vectors.cjs').verify?.() || require('./verifier/run-vectors.cjs')(),
  refusalGate: require('./refusal/gate.cjs') || {},
  sovereignty: require('./sovereignty/declaration.cjs') || {}
};
