import { QUESTIONS } from '../questions.js';
import { t, tr } from '../i18n.js';
import { pushKeys } from '../keys.js';
import { readJSON, writeJSON } from '../storage.js';
import { openWheelOverlay } from './wheelOverlay.js';

const INDEX_KEY = 'stw.question';
const LETTERS = ['A', 'B', 'C', 'D'];

// Kept at module level so switching language doesn't hide a revealed answer.
let revealedIndex = -1;

export function render(root, { odds }) {
  const total = QUESTIONS.length;
  let index = Math.min(total - 1, Math.max(0, Number(readJSON(INDEX_KEY, 0)) || 0));
  let overlay = null;

  const el = document.createElement('section');
  el.className = 'trivia';
  root.appendChild(el);

  function go(i) {
    const next = Math.min(total - 1, Math.max(0, i));
    if (next === index) return;
    index = next;
    revealedIndex = -1;
    writeJSON(INDEX_KEY, index);
    draw();
  }

  function toggleReveal() {
    revealedIndex = revealedIndex === index ? -1 : index;
    draw();
    el.querySelector(revealedIndex === index ? '.btn-spin-open' : '.btn-reveal')?.focus();
  }

  function openWheel() {
    if (overlay) return;
    overlay = openWheelOverlay(odds, () => {
      overlay = null;
      el.querySelector('.btn-spin-open')?.focus();
    });
  }

  function draw() {
    const q = QUESTIONS[index];
    const revealed = revealedIndex === index;
    el.innerHTML = `
      <div class="trivia-head">
        <span class="qnum">${t('qOf', { n: index + 1, total })}</span>
        <form class="goto">
          <label>${t('goTo')} <input type="number" min="1" max="${total}" inputmode="numeric" value="${index + 1}" /></label>
          <button type="submit" class="btn btn-small">${t('go')}</button>
        </form>
      </div>
      <div class="progress" aria-hidden="true"><span style="width:${((index + 1) / total) * 100}%"></span></div>

      <h1 class="question">${tr(q.q)}</h1>

      <ol class="options ${revealed ? 'is-revealed' : ''}">
        ${q.options
          .map(
            (o, i) => `
          <li class="option ${revealed && i === q.answer ? 'correct' : ''}">
            <span class="letter">${revealed && i === q.answer ? '✓' : LETTERS[i]}</span>
            <span class="opt-text">${tr(o)}</span>
          </li>`,
          )
          .join('')}
      </ol>

      <div class="fact" ${revealed ? '' : 'hidden'}>
        <span aria-hidden="true">💡</span> <strong>${t('funFact')}:</strong> ${tr(q.fact)}
      </div>

      <div class="trivia-nav">
        <button type="button" class="btn btn-secondary btn-prev" ${index === 0 ? 'disabled' : ''}>◀ ${t('prev')}</button>
        <div class="trivia-main-actions">
          <button type="button" class="btn ${revealed ? 'btn-secondary' : 'btn-primary'} btn-reveal">
            ${revealed ? t('hideAnswer') : `👀 ${t('reveal')}`}
          </button>
          ${revealed ? `<button type="button" class="btn btn-spin-open">🎡 ${t('spinTheWheel')}</button>` : ''}
        </div>
        <button type="button" class="btn btn-secondary btn-next" ${index === total - 1 ? 'disabled' : ''}>${t('next')} ▶</button>
      </div>`;

    el.querySelector('.btn-prev').addEventListener('click', () => go(index - 1));
    el.querySelector('.btn-next').addEventListener('click', () => go(index + 1));
    el.querySelector('.btn-reveal').addEventListener('click', toggleReveal);
    el.querySelector('.btn-spin-open')?.addEventListener('click', openWheel);
    el.querySelector('.goto').addEventListener('submit', (e) => {
      e.preventDefault();
      const n = Number(e.currentTarget.querySelector('input').value);
      if (Number.isFinite(n)) go(Math.round(n) - 1);
    });
  }

  draw();

  const popKeys = pushKeys((e) => {
    if (e.key === 'ArrowLeft') go(index - 1);
    else if (e.key === 'ArrowRight') go(index + 1);
    else if (e.key === ' ' || e.key === 'Enter') toggleReveal();
    else if (e.key.toLowerCase() === 's' && revealedIndex === index) openWheel();
    else return false;
    return true;
  });

  return () => {
    popKeys();
    overlay?.destroy();
  };
}
