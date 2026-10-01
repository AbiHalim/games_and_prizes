import { DEFAULTS, computeOdds, pct, sanitize, shareUrl } from '../config.js';

// The organiser page is English only.
const FIELDS = [
  { key: 'seniors', label: 'Seniors attending', step: 1 },
  { key: 'tissues', label: 'Packs of tissues', step: 1 },
  { key: 'wipes', label: 'Packs of wet wipes', step: 1 },
  {
    key: 'duration',
    label: 'Total game time (minutes)',
    step: 1,
    hint: 'Updating mid-activity? Enter the minutes left and the prizes left.',
  },
  { key: 'round', label: 'Minutes per round', step: 0.5, hint: 'Every senior gets one attempt per round.' },
  { key: 'success', label: 'Chance a senior succeeds (%)', step: 5 },
  {
    key: 'reserve',
    label: 'Keep in reserve (%)',
    step: 5,
    hint: 'Held back as a buffer in case seniors do better than expected. Hand out leftovers at the end.',
  },
];

const fmt = (n, digits = 0) => Number(n).toLocaleString('en-SG', { maximumFractionDigits: digits });
const same = (a, b) => Object.keys(DEFAULTS).every((k) => Number(a[k]) === Number(b[k]));

export function render(root, { settings: active }) {
  const section = document.createElement('section');
  section.className = 'setup';
  section.innerHTML = `
    <h1>⚙️ Organiser setup</h1>
    <p class="setup-intro">
      Enter the numbers on the day. The wheel's odds are worked out so the prizes are expected to last the
      whole activity. Then send the link below to every volunteer.
    </p>
    <div class="setup-grid">
      <form class="card setup-form" novalidate>
        ${FIELDS.map(
          (f) => `
          <label class="field">
            <span class="field-label">${f.label}</span>
            <input type="number" name="${f.key}" step="${f.step}" min="0" inputmode="decimal" value="${active[f.key]}" />
            ${f.hint ? `<span class="field-hint">${f.hint}</span>` : ''}
          </label>`,
        ).join('')}
        <button type="button" class="btn-link reset-defaults">Reset to defaults</button>
      </form>
      <div class="setup-results">
        <div class="card results"></div>
        <div class="card share">
          <h2>Share with volunteers</h2>
          <p class="share-hint">Send this link (e.g. in the volunteers' chat). Opening it sets these odds on that laptop.</p>
          <input class="share-url" type="text" readonly />
          <div class="share-actions">
            <button type="button" class="btn btn-primary btn-copy">📋 Copy link</button>
            <button type="button" class="btn btn-secondary btn-apply">Apply on this laptop</button>
          </div>
          <p class="apply-status"></p>
        </div>
      </div>
    </div>`;
  root.appendChild(section);

  const form = section.querySelector('.setup-form');
  const results = section.querySelector('.results');
  const urlInput = section.querySelector('.share-url');
  const status = section.querySelector('.apply-status');
  const copyBtn = section.querySelector('.btn-copy');

  function readForm() {
    const raw = {};
    for (const f of FIELDS) {
      const v = form.elements[f.key].value;
      raw[f.key] = v === '' ? NaN : v;
    }
    return sanitize(raw);
  }

  function update() {
    const s = readForm();
    const o = computeOdds(s);
    const perTen = (p) => fmt(p * o.spinsPerMinute * 10, 1);
    let note = '';
    if (s.tissues + s.wipes === 0) {
      note = '<p class="note warn">No prizes entered, so every spin will land on “Try again”.</p>';
    } else if (o.enoughForEveryone) {
      note = '<p class="note ok">You have more prizes than expected wins, so every spin wins a prize.</p>';
    }

    results.innerHTML = `
      <h2>Wheel odds</h2>
      ${bar('Tissues', o.pTissue, 'tissues')}
      ${bar('Wet wipes', o.pWipes, 'wipes')}
      ${bar('Try again', o.pNothing, 'nothing')}
      <p class="headline">${
        o.pPrize > 0
          ? `About <strong>1 in ${fmt(1 / o.pPrize, 1)}</strong> spins wins a prize.`
          : 'No spin wins a prize.'
      }</p>
      ${note}
      <table class="calc">
        <tr><th>Rounds</th><td>${fmt(o.rounds, 1)} <span class="muted">(${fmt(s.duration, 1)} min ÷ ${fmt(s.round, 1)} min)</span></td></tr>
        <tr><th>Expected spins</th><td>${fmt(o.expectedSpins)} <span class="muted">(${fmt(s.seniors)} seniors × ${fmt(o.rounds, 1)} rounds × ${fmt(s.success)}%)</span></td></tr>
        <tr><th>Expected to give out</th><td>${fmt(o.expTissues)} tissues · ${fmt(o.expWipes)} wet wipes</td></tr>
        <tr><th>Expected left at end</th><td>${fmt(o.leftTissues)} tissues · ${fmt(o.leftWipes)} wet wipes</td></tr>
        <tr><th>Pace check</th><td>Across all tables, about ${perTen(o.pTissue)} tissues and ${perTen(o.pWipes)} wet wipes every 10 minutes</td></tr>
      </table>`;

    urlInput.value = shareUrl(s);
    status.textContent = same(s, active)
      ? '✓ These settings are active on this laptop.'
      : '⚠️ Not applied yet. Copy the link to share it, or apply it on this laptop.';
    status.classList.toggle('pending', !same(s, active));
  }

  function bar(label, p, type) {
    return `
      <div class="bar-row">
        <span class="bar-label">${label}</span>
        <span class="bar-track"><span class="bar-fill fill-${type}" style="width:${p * 100}%"></span></span>
        <span class="bar-value">${pct(p, 2)}</span>
      </div>`;
  }

  form.addEventListener('input', update);
  form.addEventListener('submit', (e) => e.preventDefault());
  section.querySelector('.reset-defaults').addEventListener('click', () => {
    for (const f of FIELDS) form.elements[f.key].value = DEFAULTS[f.key];
    update();
  });

  copyBtn.addEventListener('click', async () => {
    const url = urlInput.value;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      urlInput.select();
      document.execCommand('copy');
    }
    copyBtn.textContent = '✓ Copied!';
    setTimeout(() => (copyBtn.textContent = '📋 Copy link'), 2000);
  });

  section.querySelector('.btn-apply').addEventListener('click', () => {
    const url = new URL(urlInput.value);
    url.hash = '#/setup';
    location.href = url.toString();
  });

  update();
}
