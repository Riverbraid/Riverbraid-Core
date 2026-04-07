'use strict';
function sortValue(value) {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(sortValue);
  const out = {};
  for (const key of Object.keys(value).sort()) {
    out[key] = sortValue(value[key]);
  }
  return out;
}
function canonicalJSONStringify(value) {
  return JSON.stringify(sortValue(value));
}
module.exports = { canonicalJSONStringify, sortValue };
