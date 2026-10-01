import { loadSettings, computeOdds } from './config.js';
import { LANGS, getLang, setLang, t } from './i18n.js';
import { isSoundOn, setSound } from './sound.js';
import * as home from './screens/home.js';
import * as trivia from './screens/trivia.js';
import * as wheel from './screens/wheel.js';
import * as setup from './screens/setup.js';

const ROUTES = { '': home, trivia, wheel, setup };

const { settings, source } = loadSettings();
const ctx = { settings, source, odds: computeOdds(settings) };

const header = document.getElementById('topbar');
const view = document.getElementById('view');
let cleanup = null;

function currentRoute() {
  const name = location.hash.replace(/^#\/?/, '').split(/[?/]/)[0];
  return ROUTES[name] ? name : '';
}

function renderHeader(route) {
  const lang = getLang();
  header.innerHTML = `
    <a href="#/" class="btn btn-home" ${route === '' ? 'hidden' : ''}>🏠 ${t('home')}</a>
    <div class="brand">${t('appTitle')}</div>
    <div class="top-controls">
      <div class="lang-switch" role="group" aria-label="Language">
        ${LANGS.map(
          (l) =>
            `<button type="button" data-lang="${l.code}" aria-pressed="${l.code === lang}">${l.label}</button>`,
        ).join('')}
      </div>
      <button type="button" class="btn-sound" aria-pressed="${isSoundOn()}" title="${isSoundOn() ? t('soundOn') : t('soundOff')}">
        ${isSoundOn() ? '🔊' : '🔇'}
      </button>
    </div>`;

  header.querySelectorAll('[data-lang]').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (document.body.classList.contains('is-spinning')) return;
      setLang(btn.dataset.lang);
      render();
    }),
  );
  header.querySelector('.btn-sound').addEventListener('click', () => {
    setSound(!isSoundOn());
    renderHeader(route);
  });
}

function render() {
  const route = currentRoute();
  cleanup?.();
  cleanup = null;
  document.body.dataset.route = route || 'home';
  renderHeader(route);
  view.innerHTML = '';
  cleanup = ROUTES[route].render(view, ctx) ?? null;
  view.focus({ preventScroll: true });
}

setLang(getLang());
window.addEventListener('hashchange', () => {
  window.scrollTo(0, 0);
  render();
});
render();
