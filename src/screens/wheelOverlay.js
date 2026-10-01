import { t } from '../i18n.js';
import { createWheel } from '../wheel.js';
import { pushKeys } from '../keys.js';

/** Full-screen prize wheel on top of the current page. Stays open for several spins. */
export function openWheelOverlay(odds, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'wheel-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `<h2 class="overlay-title">🎡 ${t('prizeWheel')}</h2>`;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn btn-secondary';
  closeBtn.textContent = `✕ ${t('close')}`;

  const wheel = createWheel(odds, { extraActions: [closeBtn] });
  overlay.appendChild(wheel.el);
  document.body.appendChild(overlay);
  document.body.classList.add('has-overlay');
  wheel.focus();

  const popKeys = pushKeys((e) => {
    if (e.key === ' ' || e.key === 'Enter') wheel.spin();
    else if (e.key === 'Escape' && !wheel.isBusy()) close();
    return true;
  });

  function close() {
    if (wheel.isBusy()) return;
    popKeys();
    wheel.destroy();
    overlay.remove();
    document.body.classList.remove('has-overlay');
    onClose?.();
  }
  closeBtn.addEventListener('click', close);

  return {
    close,
    // Used when leaving the page entirely; closes even mid-spin.
    destroy() {
      popKeys();
      wheel.destroy();
      overlay.remove();
      document.body.classList.remove('has-overlay');
    },
  };
}
