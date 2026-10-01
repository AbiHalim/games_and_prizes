// Keyboard shortcuts go only to the topmost layer (e.g. an open pop-up blocks the page below).
const layers = [];

export function pushKeys(handler) {
  layers.push(handler);
  return () => {
    const i = layers.lastIndexOf(handler);
    if (i >= 0) layers.splice(i, 1);
  };
}

window.addEventListener('keydown', (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  const target = e.target;
  if (target.closest?.('input, textarea, select, [contenteditable]')) return;
  // Let a focused button/link handle its own Space/Enter natively.
  if ((e.key === ' ' || e.key === 'Enter') && target.closest?.('button, a')) return;
  const top = layers[layers.length - 1];
  if (top && top(e)) e.preventDefault();
});
