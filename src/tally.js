import { readJSON, writeJSON } from './storage.js';

// Prizes handed out on this laptop only (each volunteer's table).
const KEY = 'stw.tally.v1';

export function getTally() {
  return { spins: 0, tissues: 0, wipes: 0, ...readJSON(KEY, {}) };
}

export function addResult(outcome) {
  const tally = getTally();
  tally.spins += 1;
  if (outcome === 'tissues' || outcome === 'wipes') tally[outcome] += 1;
  writeJSON(KEY, tally);
  return tally;
}

export function resetTally() {
  writeJSON(KEY, { spins: 0, tissues: 0, wipes: 0 });
}
