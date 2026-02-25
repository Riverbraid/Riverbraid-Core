export function validateInvariant(fn, input, runs = 100) {
  let firstResult = JSON.stringify(fn(input));
  for (let i = 1; i < runs; i++) {
    if (JSON.stringify(fn(input)) !== firstResult) return false;
  }
  return true;
}
export function checkEntropySources(code) {
  const forbidden = [/Date\.now\(\)/g, /Math\.random\(\)/g, /crypto\.randomUUID\(\)/g];
  const violations = forbidden.filter(p => p.test(code)).map(p => p.source);
  return { clean: violations.length === 0, violations };
}
