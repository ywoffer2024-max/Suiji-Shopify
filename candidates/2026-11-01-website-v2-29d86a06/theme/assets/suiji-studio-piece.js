(() => {
  const piece = document.querySelector('[data-studio-piece]');
  if (!piece) return;

  const photo = piece.querySelector('[data-studio-main]');
  const caption = piece.querySelector('[data-studio-caption]');
  const original = piece.querySelector('[data-studio-original]');
  const finishControl = piece.querySelector('[data-studio-finish-control]');
  const finish = piece.querySelector('[data-studio-finish]');
  const angleGroups = [...piece.querySelectorAll('[data-studio-angles]')];
  const widths = [420, 560, 840, 1120, 1400];

  function showAngle(angle) {
    const source = angle.href;
    photo.alt = angle.dataset.photoAlt;
    photo.srcset = widths.map(width => `${source}?width=${width} ${width}w`).join(', ');
    photo.src = source + '?width=840';
    caption.textContent = angle.dataset.photoCaption;
    original.href = source;
    piece.querySelector('[data-studio-angle][aria-current="true"]')?.removeAttribute('aria-current');
    angle.setAttribute('aria-current', 'true');
  }

  piece.addEventListener('click', event => {
    const angle = event.target.closest('[data-studio-angle]');
    if (!angle || event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showAngle(angle);
  });

  if (finish) {
    finish.addEventListener('change', () => {
      const active = angleGroups.find(group => group.dataset.studioAngles === finish.value);
      if (!active) return;
      angleGroups.forEach(group => { group.hidden = group !== active; });
      showAngle(active.querySelector('[data-studio-angle]'));
    });
    finishControl.hidden = false;
  }
})();
