import { t } from '../i18n.js';
import { createWheel } from '../wheel.js';
import { pushKeys } from '../keys.js';

/** Roll the Bottle: the prize wheel stays open for the whole game. */
export function render(root, { odds }) {
  const section = document.createElement('section');
  section.className = 'wheel-screen';
  section.innerHTML = `
    <div class="wheel-screen-head">
      <h1>🎯 ${t('bottle')}</h1>
      <p>${t('bottleHint')}</p>
    </div>`;
  const wheel = createWheel(odds);
  section.appendChild(wheel.el);
  root.appendChild(section);

  const popKeys = pushKeys((e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      wheel.spin();
      return true;
    }
    return false;
  });

  return () => {
    popKeys();
    wheel.destroy();
  };
}
