/** @linear */
/** @linear */
/** @linear */
import { anchor } from '/workspaces/Riverbraid-Crypto-Gold/src/anchor.mjs';

export function computeRoot(leaves) {
  if (leaves.length === 0) return anchor('void');
  if (leaves.length === 1) return leaves[0];
  const parents = [];
  for (let i = 0; i < leaves.length; i += 2) {
    const left = leaves[i];
    const right = leaves[i + 1] || left;
    parents.push(anchor(left + right));
  }
  return computeRoot(parents);
}
