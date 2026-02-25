export function enforceAscii(text) {
  if (typeof text !== 'string') throw new TypeError('Input must be a string');
  const nonAsciiMatch = text.match(/[^\x00-\x7F]/);
  if (nonAsciiMatch) {
    const char = nonAsciiMatch[0];
    const codePoint = char.codePointAt(0).toString(16).toUpperCase();
    throw new Error(`NON_ASCII_DETECTED: Character '${char}' (U+${codePoint})`);
  }
  return text;
}
export function validateLineEndings(text) {
  if (text.includes('\r\n') || text.includes('\r')) return false;
  return true;
}
