import { loadSettings, computeOdds } from './config.js';
import { LANGS, getLang, setLang, t, tr } from './i18n.js';
import { buildSegments, drawWheel } from './wheel.js';
import { confetti } from './confetti.js';
import { pushKeys } from './keys.js';

// Slides are laid out on a fixed 1600×900 stage that is scaled to fit the screen.
const STAGE_W = 1600;
const STAGE_H = 900;

const L = (en, zh, ms) => ({ en, zh, ms });

// Not part of the quiz, so it doesn't spoil a real question.
const SAMPLE = {
  q: L("Which fruit is known as the 'King of Fruits'?", '哪一种水果被称为“水果之王”？', "Buah apakah yang dikenali sebagai 'Raja Buah'?"),
  options: [L('Mango', '芒果', 'Mangga'), L('Durian', '榴梿', 'Durian'), L('Rambutan', '红毛丹', 'Rambutan'), L('Banana', '香蕉', 'Pisang')],
  answer: 1,
};

const { settings } = loadSettings();
const segments = buildSegments(computeOdds(settings));

function bottleDiagram() {
  return `
    <svg class="bottle-diagram" viewBox="0 0 900 440" role="img" aria-label="${t('bottle')}">
      <defs>
        <marker id="arrowhead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#e8590c" />
        </marker>
      </defs>
      <rect x="30" y="50" width="840" height="320" rx="28" fill="#d9a46a" stroke="#a8743d" stroke-width="6" />
      <text x="64" y="100" class="dg-label dg-table">${t('labelTable')}</text>

      <g transform="rotate(-4 720 210)">
        <rect x="610" y="110" width="220" height="200" rx="6" fill="#ffffff" stroke="#c9b8a0" stroke-width="3" />
        <circle cx="720" cy="210" r="86" fill="#f03e3e" />
        <circle cx="720" cy="210" r="64" fill="#ffffff" />
        <circle cx="720" cy="210" r="42" fill="#f03e3e" />
        <circle cx="720" cy="210" r="20" fill="#ffffff" />
        <circle cx="720" cy="210" r="8" fill="#f03e3e" />
      </g>

      <path d="M250 210 C 360 160, 470 260, 590 210" fill="none" stroke="#e8590c" stroke-width="8"
        stroke-dasharray="18 14" stroke-linecap="round" marker-end="url(#arrowhead)" />

      <g class="dg-bottle">
        <rect x="145" y="150" width="56" height="130" rx="24" fill="#a5d8ff" stroke="#1c7ed6" stroke-width="5" />
        <rect x="145" y="190" width="56" height="40" fill="#ffffff" opacity="0.75" />
        <rect x="160" y="126" width="26" height="28" rx="4" fill="#a5d8ff" stroke="#1c7ed6" stroke-width="5" />
        <rect x="155" y="106" width="36" height="24" rx="5" fill="#1c7ed6" />
      </g>

      <text x="173" y="410" text-anchor="middle" class="dg-label">${t('labelBottle')}</text>
      <text x="720" y="410" text-anchor="middle" class="dg-label">${t('labelTarget')}</text>
    </svg>`;
}

const SLIDES = [
  {
    theme: 'hero',
    render: () => `
      <div class="hero-emoji" aria-hidden="true">🎡</div>
      <h1>${t('appTitle')}</h1>
      <p class="hero-sub">St. Luke's ElderCare Clementi</p>
      <p class="hero-welcome">${t('welcome')}</p>`,
    enter: () => confetti(2500),
  },
  {
    render: () => `
      <h2>${t('todaysGames')}</h2>
      <div class="activity-cards">
        <div class="activity-card card-trivia">
          <span class="activity-num">1</span>
          <span class="activity-icon" aria-hidden="true">💡</span>
          <span class="activity-title">${t('trivia')}</span>
          <span class="activity-desc">${t('triviaIntro')}</span>
          <span class="activity-time">⏱ ${t('about25')}</span>
        </div>
        <div class="activity-card card-bottle">
          <span class="activity-num">2</span>
          <span class="activity-icon" aria-hidden="true">🎯</span>
          <span class="activity-title">${t('bottle')}</span>
          <span class="activity-desc">${t('bottleIntro')}</span>
          <span class="activity-time">⏱ ${t('about25')}</span>
        </div>
      </div>`,
  },
  {
    steps: 1,
    render: (step) => `
      <p class="kicker">💡 ${t('trivia')} · ${t('sampleQuestion')}</p>
      <h2 class="sample-q">${tr(SAMPLE.q)}</h2>
      <ol class="sample-options ${step >= 1 ? 'is-revealed' : ''}">
        ${SAMPLE.options
          .map((o, i) => {
            const correct = step >= 1 && i === SAMPLE.answer;
            return `<li class="${correct ? 'correct' : ''}"><span class="letter">${correct ? '✓' : 'ABCD'[i]}</span>${tr(o)}</li>`;
          })
          .join('')}
      </ol>
      <p class="rule ${step >= 1 ? '' : 'is-hidden'}">🎡 ${t('triviaRule')}</p>`,
  },
  {
    render: () => `
      <h2>🎯 ${t('bottle')}</h2>
      <div class="bottle-layout">
        ${bottleDiagram()}
        <ol class="steps">
          <li><span class="step-num">1</span>${t('bottleStep1')}</li>
          <li><span class="step-num">2</span>${t('bottleStep2')}</li>
          <li><span class="step-num">3</span>${t('bottleStep3')}</li>
        </ol>
      </div>`,
  },
  {
    render: () => `
      <div class="wheel-slide">
        <div class="mini-wheel">
          <div class="wheel-pointer" aria-hidden="true"></div>
          <canvas width="1000" height="1000" aria-hidden="true"></canvas>
          <div class="wheel-hub">${t('spin')}</div>
        </div>
        <div class="wheel-copy">
          <p class="kicker">🎡 ${t('prizeWheel')}</p>
          <h2>${t('wheelExplain')}</h2>
          <p class="could-win">${t('youCouldWin')}</p>
          <ul class="prize-list">
            <li class="prize-tissues">🎁 ${t('tissues')}</li>
            <li class="prize-wipes">🎁 ${t('wipes')}</li>
            <li class="prize-nothing">🍀 ${t('nothing')}</li>
          </ul>
        </div>
      </div>`,
    mount: (el) => {
      const canvas = el.querySelector('canvas');
      drawWheel(canvas, segments);
      document.fonts?.ready.then(() => drawWheel(canvas, segments));
    },
  },
  {
    theme: 'hero',
    render: () => `
      <div class="hero-emoji" aria-hidden="true">🎉</div>
      <h1 class="have-fun">${t('haveFun')}</h1>
      <p class="hero-welcome">${t('goodLuck')}</p>`,
    enter: () => confetti(4000),
  },
];

const stage = document.getElementById('stage');
const nav = document.getElementById('deck-nav');

let index = Math.min(SLIDES.length - 1, Math.max(0, (parseInt(location.hash.slice(1), 10) || 1) - 1));
let step = 0;

function renderSlide(entering) {
  const slide = SLIDES[index];
  stage.innerHTML = `<section class="slide ${slide.theme ? `slide-${slide.theme}` : ''} ${entering ? 'is-entering' : ''}">${slide.render(step)}</section>`;
  slide.mount?.(stage.firstElementChild);
  if (entering) slide.enter?.();
  renderNav();
}

function renderNav() {
  const lang = getLang();
  nav.innerHTML = `
    <button type="button" class="nav-btn nav-prev" aria-label="${t('prev')}" ${index === 0 && step === 0 ? 'disabled' : ''}>◀</button>
    <div class="nav-dots">
      ${SLIDES.map(
        (_, i) =>
          `<button type="button" class="nav-dot" data-i="${i}" aria-label="${i + 1}" ${i === index ? 'aria-current="true"' : ''}></button>`,
      ).join('')}
    </div>
    <button type="button" class="nav-btn nav-next" aria-label="${t('next')}" ${index === SLIDES.length - 1 ? 'disabled' : ''}>▶</button>
    <div class="lang-switch" role="group" aria-label="Language">
      ${LANGS.map((l) => `<button type="button" data-lang="${l.code}" aria-pressed="${l.code === lang}">${l.label}</button>`).join('')}
    </div>
    <button type="button" class="nav-btn nav-full" aria-label="${t('fullscreen')}" title="${t('fullscreen')}">⛶</button>`;

  nav.querySelector('.nav-prev').addEventListener('click', prev);
  nav.querySelector('.nav-next').addEventListener('click', next);
  nav.querySelector('.nav-full').addEventListener('click', toggleFullscreen);
  nav.querySelectorAll('.nav-dot').forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.i))));
  nav.querySelectorAll('[data-lang]').forEach((b) =>
    b.addEventListener('click', () => {
      setLang(b.dataset.lang);
      renderSlide(false);
    }),
  );
}

function go(i, atStep = 0) {
  const target = Math.min(SLIDES.length - 1, Math.max(0, i));
  if (target === index && atStep === step) return;
  const entering = target !== index;
  index = target;
  step = atStep;
  history.replaceState(null, '', `#${index + 1}`);
  renderSlide(entering);
}

function next() {
  if (step < (SLIDES[index].steps ?? 0)) go(index, step + 1);
  else go(index + 1);
}

function prev() {
  if (step > 0) go(index, step - 1);
  else go(index - 1);
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => {});
}

function fit() {
  const scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
  stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

pushKeys((e) => {
  if (['ArrowRight', 'PageDown', ' ', 'Enter', 'ArrowDown'].includes(e.key)) next();
  else if (['ArrowLeft', 'PageUp', 'Backspace', 'ArrowUp'].includes(e.key)) prev();
  else if (e.key === 'Home') go(0);
  else if (e.key === 'End') go(SLIDES.length - 1);
  else if (e.key.toLowerCase() === 'f') toggleFullscreen();
  else return false;
  return true;
});

// Click or tap the slide to advance; swipe left/right on touch screens.
let touchX = null;
stage.addEventListener('pointerdown', (e) => (touchX = e.clientX));
stage.addEventListener('pointerup', (e) => {
  if (touchX == null) return;
  const dx = e.clientX - touchX;
  touchX = null;
  if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
  else next();
});

// Fade the controls out while the presenter isn't using the mouse.
let idleTimer = 0;
function wake() {
  document.body.classList.remove('is-idle');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => document.body.classList.add('is-idle'), 2500);
}
['mousemove', 'pointerdown', 'keydown'].forEach((ev) => window.addEventListener(ev, wake));

window.addEventListener('resize', fit);
window.addEventListener('hashchange', () => {
  const i = (parseInt(location.hash.slice(1), 10) || 1) - 1;
  if (i !== index) go(i);
});

setLang(getLang());
fit();
renderSlide(true);
wake();
