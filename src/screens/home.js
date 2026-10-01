import { pct } from '../config.js';
import { t } from '../i18n.js';

export function render(root, { settings, source, odds }) {
  const sourceText = { link: t('sourceLink'), saved: t('sourceSaved'), default: t('sourceDefault') }[source];
  root.innerHTML = `
    <section class="home">
      <h1 class="home-title">${t('appTitle')}</h1>
      <p class="home-sub">St. Luke's ElderCare Clementi</p>

      <div class="home-cards">
        <a class="big-card card-trivia" href="#/trivia">
          <span class="big-card-icon" aria-hidden="true">💡</span>
          <span class="big-card-title">${t('trivia')}</span>
          <span class="big-card-desc">${t('triviaDesc')}</span>
        </a>
        <a class="big-card card-bottle" href="#/wheel">
          <span class="big-card-icon" aria-hidden="true">🎯</span>
          <span class="big-card-title">${t('bottle')}</span>
          <span class="big-card-desc">${t('bottleDesc')}</span>
        </a>
      </div>

      <div class="odds-banner ${source === 'default' ? 'is-default' : ''}">
        <div class="odds-row">
          <strong>${t('odds')}:</strong>
          <span class="chip chip-tissues">${t('tissues')} ${pct(odds.pTissue)}</span>
          <span class="chip chip-wipes">${t('wipes')} ${pct(odds.pWipes)}</span>
          <span class="chip chip-nothing">${t('nothing')} ${pct(odds.pNothing)}</span>
        </div>
        <div class="odds-meta">${t('settingsSummary', settings)}</div>
        <div class="odds-source">${sourceText}</div>
      </div>

      <a class="setup-link" href="#/setup">⚙️ ${t('organiserSetup')}</a>
    </section>`;
}
