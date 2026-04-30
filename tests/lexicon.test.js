const fs = require('fs');
const path = require('path');

describe('Phase 1: Lexicon Integrity', () => {
  const vocabPath = path.join(__dirname, '../VOCABULARY_LOCK.md');

  test('VOCABULARY_LOCK.md exists and contains version header', () => {
    const content = fs.readFileSync(vocabPath, 'utf8');
    expect(content).toMatch(/Version: \d+\.\d+\.\d+/);
    expect(content).toMatch(/Authority: Normative/);
  });

  test('Core terms are defined', () => {
    const content = fs.readFileSync(vocabPath, 'utf8');
    const requiredTerms = ['Active', 'Parked', 'Fail-Closed', 'Claim Boundary', 'Reconstructable'];
    requiredTerms.forEach(term => {
      expect(content).toContain(term);
    });
  });
});
