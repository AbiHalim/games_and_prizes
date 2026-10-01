import { readJSON, writeJSON } from './storage.js';

// All sounds are synthesised with WebAudio, so there are no audio files to load.

const SOUND_KEY = 'stw.sound';
let enabled = readJSON(SOUND_KEY, true) !== false;
let ctx = null;

function audio() {
  if (!enabled) return null;
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function isSoundOn() {
  return enabled;
}

export function setSound(on) {
  enabled = on;
  writeJSON(SOUND_KEY, on);
}

function tone(freq, start, length, { type = 'triangle', volume = 0.2 } = {}) {
  const ac = audio();
  if (!ac) return;
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + length);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + length + 0.02);
}

export function playTick() {
  tone(1400, 0, 0.04, { type: 'square', volume: 0.06 });
}

export function playWin() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.12, 0.35, { volume: 0.22 }));
  tone(1046.5, 0.5, 0.6, { type: 'sine', volume: 0.18 });
}

export function playTryAgain() {
  tone(523.25, 0, 0.3, { type: 'sine', volume: 0.15 });
  tone(392, 0.22, 0.45, { type: 'sine', volume: 0.15 });
}
