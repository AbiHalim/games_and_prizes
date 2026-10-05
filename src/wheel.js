import { pickOutcome } from './config.js';
import { t } from './i18n.js';
import { playTick, playWin, playTryAgain } from './sound.js';
import { confetti } from './confetti.js';
import { addResult, getTally, resetTally } from './tally.js';
import { pushKeys } from './keys.js';

const SEGMENTS = 12;
const SIZE = 1000; // canvas drawing size; CSS scales it to fit
const R = 470;

const FILL = {
  tissues: ['#1c7ed6', '#1971c2'],
  wipes: ['#2f9e44', '#2b8a3e'],
  nothing: ['#ffd43b', '#ffa94d'],
};
const TEXT = { tissues: '#ffffff', wipes: '#ffffff', nothing: '#3b2a00' };

/**
 * Decides what the wheel *looks* like. The real odds come from pickOutcome();
 * the picture only roughly reflects them so the wheel doesn't look like "mostly nothing".
 */
export function buildSegments(odds) {
  const hasT = odds.pTissue > 0;
  const hasW = odds.pWipes > 0;
  const hasN = odds.pNothing > 0;
  if (!hasT && !hasW) return Array(SEGMENTS).fill('nothing');

  const prizeSlots = hasN ? SEGMENTS / 2 : SEGMENTS;
  let tCount = 0;
  if (hasT && hasW) {
    const share = odds.pTissue / (odds.pTissue + odds.pWipes);
    tCount = Math.min(prizeSlots - 1, Math.max(1, Math.round(prizeSlots * share)));
  } else if (hasT) {
    tCount = prizeSlots;
  }

  // Spread tissues and wipes evenly around the wheel.
  const prizes = [];
  let acc = 0;
  for (let i = 0; i < prizeSlots; i++) {
    acc += tCount / prizeSlots;
    if (acc >= 0.5 && prizes.filter((p) => p === 'tissues').length < tCount) {
      prizes.push('tissues');
      acc -= 1;
    } else {
      prizes.push('wipes');
    }
  }
  if (!hasN) return prizes;
  return prizes.flatMap((p) => [p, 'nothing']);
}

export function drawWheel(canvas, segments) {
  const ctx = canvas.getContext('2d');
  const c = SIZE / 2;
  const seg = (Math.PI * 2) / segments.length;
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.save();
  ctx.translate(c, c);

  let nothingIndex = 0;
  segments.forEach((type, i) => {
    const a0 = -Math.PI / 2 + i * seg;
    const shade = type === 'nothing' ? nothingIndex++ % 2 : i % 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, a0, a0 + seg);
    ctx.closePath();
    ctx.fillStyle = FILL[type][shade];
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Label runs along the middle of the segment, from the rim towards the centre.
    ctx.save();
    ctx.rotate(a0 + seg / 2);
    ctx.fillStyle = TEXT[type];
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const label = t(type);
    const maxWidth = R * 0.62;
    let fontSize = 54;
    do {
      ctx.font = `800 ${fontSize}px Nunito, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif`;
      fontSize -= 2;
    } while (ctx.measureText(label).width > maxWidth && fontSize > 20);
    ctx.fillText(label, R * 0.9, 2);
    ctx.restore();
  });

  // Rim with light bulbs.
  ctx.beginPath();
  ctx.arc(0, 0, R + 12, 0, Math.PI * 2);
  ctx.lineWidth = 26;
  ctx.strokeStyle = '#3b2f63';
  ctx.stroke();
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * (R + 12), Math.sin(a) * (R + 12), 6.5, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 ? '#fff3bf' : '#ffd43b';
    ctx.fill();
  }
  ctx.restore();
}

const easeOutQuart = (k) => 1 - (1 - k) ** 4;

/**
 * Creates a prize wheel with its SPIN button and tally.
 * @param {object} odds  from computeOdds()
 * @param {{ extraActions?: HTMLElement[] }} opts
 */
export function createWheel(odds, { extraActions = [] } = {}) {
  const segments = buildSegments(odds);
  const segDeg = 360 / segments.length;

  const el = document.createElement('div');
  el.className = 'wheel-layout';
  el.innerHTML = `
    <div class="wheel-stage">
      <div class="wheel-pointer" aria-hidden="true"></div>
      <canvas class="wheel-canvas" width="${SIZE}" height="${SIZE}" role="img" aria-label="${t('prizeWheel')}"></canvas>
      <button type="button" class="wheel-hub" aria-label="${t('spin')}">${t('spin')}</button>
    </div>
    <div class="wheel-side">
      <button type="button" class="btn btn-spin">🎡 ${t('spin')}</button>
      <div class="wheel-extra"></div>
      <p class="tally"></p>
      <button type="button" class="btn-link reset-tally">${t('resetTally')}</button>
    </div>`;

  const canvas = el.querySelector('.wheel-canvas');
  const pointer = el.querySelector('.wheel-pointer');
  const spinBtn = el.querySelector('.btn-spin');
  const hub = el.querySelector('.wheel-hub');
  const tallyEl = el.querySelector('.tally');
  el.querySelector('.wheel-extra').append(...extraActions);

  const renderTally = () => {
    const tally = getTally();
    tallyEl.textContent = t('tally', tally);
  };
  renderTally();

  drawWheel(canvas, segments);
  // Redraw once web fonts are ready so labels use the nicer font.
  document.fonts?.ready.then(() => drawWheel(canvas, segments));

  let rotation = 0;
  let spinning = false;
  let raf = 0;
  let destroyed = false;
  let closeModal = null;

  function setSpinning(on) {
    spinning = on;
    document.body.classList.toggle('is-spinning', on);
    spinBtn.disabled = on;
    hub.disabled = on;
    spinBtn.textContent = on ? t('spinning') : `🎡 ${t('spin')}`;
  }

  function spin() {
    if (spinning || closeModal || destroyed) return;
    const outcome = pickOutcome(odds);
    const candidates = segments.map((s, i) => (s === outcome ? i : -1)).filter((i) => i >= 0);
    const index = candidates[Math.floor(Math.random() * candidates.length)];
    const centre = (index + 0.5) * segDeg + (Math.random() - 0.5) * segDeg * 0.6;
    // The pointer sits at the top, so the wheel must stop rotated by -centre (mod 360).
    const desired = (((360 - centre) % 360) + 360) % 360;
    const current = ((rotation % 360) + 360) % 360;
    const delta = (desired - current + 360) % 360;
    const from = rotation;
    const to = rotation + 360 * (5 + Math.floor(Math.random() * 3)) + delta;
    const duration = 5000 + Math.random() * 1200;
    const start = performance.now();
    let lastTick = Math.floor(from / segDeg);

    setSpinning(true);
    const frame = (now) => {
      if (destroyed) return;
      const k = Math.min(1, (now - start) / duration);
      rotation = from + (to - from) * easeOutQuart(k);
      canvas.style.transform = `rotate(${rotation}deg)`;
      const tick = Math.floor(rotation / segDeg);
      if (tick !== lastTick) {
        lastTick = tick;
        playTick();
        pointer.classList.remove('wiggle');
        void pointer.offsetWidth; // restart the CSS animation
        pointer.classList.add('wiggle');
      }
      if (k < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        setTimeout(() => finish(outcome), 350);
      }
    };
    raf = requestAnimationFrame(frame);
  }

  function finish(outcome) {
    if (destroyed) return;
    setSpinning(false);
    addResult(outcome);
    renderTally();
    showResult(outcome);
  }

  function showResult(outcome) {
    const won = outcome !== 'nothing';
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal result ${won ? 'won' : 'lost'}" role="dialog" aria-modal="true" aria-live="assertive">
        <div class="result-emoji">${won ? '🎉' : '🍀'}</div>
        <h2>${won ? t('youWon') : t('soClose')}</h2>
        ${
          won
            ? `<div class="prize-pill prize-${outcome}">🎁 ${t(outcome)}</div>`
            : `<p class="result-sub">${t('betterLuck')}</p>`
        }
        <button type="button" class="btn btn-primary btn-ok">${t('ok')}</button>
      </div>`;
    document.body.appendChild(modal);
    const ok = modal.querySelector('.btn-ok');
    ok.focus();

    const popKeys = pushKeys((e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        closeModal();
        return true;
      }
      return true; // block other shortcuts while the result is showing
    });
    closeModal = () => {
      popKeys();
      modal.remove();
      closeModal = null;
      spinBtn.focus();
    };
    ok.addEventListener('click', () => closeModal());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    if (won) {
      playWin();
      confetti();
    } else {
      playTryAgain();
    }
  }

  spinBtn.addEventListener('click', spin);
  hub.addEventListener('click', spin);
  el.querySelector('.reset-tally').addEventListener('click', () => {
    if (confirm(t('resetConfirm'))) {
      resetTally();
      renderTally();
    }
  });

  return {
    el,
    spin,
    isBusy: () => spinning || !!closeModal,
    focus: () => spinBtn.focus(),
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      closeModal?.();
      document.body.classList.remove('is-spinning');
    },
  };
}
