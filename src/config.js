import { readJSON, writeJSON } from './storage.js';

const STORAGE_KEY = 'stw.settings.v1';

export const DEFAULTS = {
  seniors: 50,
  tissues: 180,
  wipes: 160,
  duration: 50, // minutes of games
  round: 1, // minutes per round
  success: 33, // % chance a senior succeeds on an attempt
  reserve: 10, // % of each prize kept back as a safety buffer
};

// Short URL parameter names used in the share link.
const PARAM_KEYS = {
  seniors: 's',
  tissues: 't',
  wipes: 'w',
  duration: 'd',
  round: 'r',
  success: 'p',
  reserve: 'res',
};

const LIMITS = {
  seniors: [1, 1000],
  tissues: [0, 100000],
  wipes: [0, 100000],
  duration: [1, 600],
  round: [0.1, 60],
  success: [1, 100],
  reserve: [0, 90],
};

export function sanitize(raw) {
  const out = {};
  for (const key of Object.keys(DEFAULTS)) {
    const n = Number(raw?.[key]);
    const [min, max] = LIMITS[key];
    out[key] = Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : DEFAULTS[key];
  }
  return out;
}

/**
 * Settings come from (in order): the URL's query string (the organiser's share link),
 * then this laptop's saved settings, then the defaults.
 */
export function loadSettings() {
  const params = new URLSearchParams(location.search);
  const hasParams = Object.values(PARAM_KEYS).some((p) => params.has(p));
  if (hasParams) {
    const raw = { ...DEFAULTS };
    for (const [key, p] of Object.entries(PARAM_KEYS)) {
      if (params.has(p)) raw[key] = params.get(p);
    }
    const settings = sanitize(raw);
    writeJSON(STORAGE_KEY, settings);
    return { settings, source: 'link' };
  }
  const stored = readJSON(STORAGE_KEY);
  if (stored) return { settings: sanitize(stored), source: 'saved' };
  return { settings: { ...DEFAULTS }, source: 'default' };
}

export function shareUrl(settings) {
  const params = new URLSearchParams();
  for (const [key, p] of Object.entries(PARAM_KEYS)) params.set(p, String(settings[key]));
  return `${location.origin}${location.pathname}?${params}#/`;
}

const EPS = 1e-9;

/** Works out the wheel odds so the expected number of prizes won matches the usable stock. */
export function computeOdds(s) {
  const rounds = s.duration / s.round;
  const expectedSpins = s.seniors * rounds * (s.success / 100);
  const usableTissues = s.tissues * (1 - s.reserve / 100);
  const usableWipes = s.wipes * (1 - s.reserve / 100);
  const usable = usableTissues + usableWipes;

  let pTissue = 0;
  let pWipes = 0;
  let enoughForEveryone = false;
  if (expectedSpins > 0 && usable > 0) {
    if (usable >= expectedSpins) {
      // More prizes than expected wins: every spin wins, split by stock.
      enoughForEveryone = true;
      pTissue = usableTissues / usable;
      pWipes = usableWipes / usable;
    } else {
      pTissue = usableTissues / expectedSpins;
      pWipes = usableWipes / expectedSpins;
    }
  }
  const pNothing = Math.max(0, 1 - pTissue - pWipes);
  const expTissues = pTissue * expectedSpins;
  const expWipes = pWipes * expectedSpins;

  return {
    rounds,
    expectedSpins,
    spinsPerMinute: expectedSpins / s.duration,
    pTissue,
    pWipes,
    pNothing: pNothing < EPS ? 0 : pNothing,
    pPrize: pTissue + pWipes,
    expTissues,
    expWipes,
    leftTissues: s.tissues - expTissues,
    leftWipes: s.wipes - expWipes,
    enoughForEveryone,
  };
}

/** @returns {'tissues'|'wipes'|'nothing'} */
export function pickOutcome(odds, rng = Math.random) {
  const r = rng();
  if (r < odds.pTissue) return 'tissues';
  if (r < odds.pTissue + odds.pWipes) return 'wipes';
  return 'nothing';
}

export function pct(p, digits = 1) {
  return `${(p * 100).toFixed(digits)}%`;
}
