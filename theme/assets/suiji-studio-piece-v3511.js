(() => {
  'use strict';
  const root = document.querySelector('[data-studio-piece]');
  if (!root) return;

  const main = root.querySelector('[data-studio-main]');
  const caption = root.querySelector('[data-studio-caption]');
  const counter = root.querySelector('[data-studio-counter]');
  const groups = [...root.querySelectorAll('[data-studio-angles]')];
  const finishOptions = root.querySelector('[data-studio-finishes]');
  const contact = root.querySelector('[data-studio-contact]');
  const widths = [420, 560, 840, 1120, 1400];
  const views = group => [...group.querySelectorAll('[data-studio-angle]')];

  function showAngle(button, buttons) {
    const { photo, photoAlt, photoCaption } = button.dataset;
    main.srcset = widths.map(width => photo + '?width=' + width + ' ' + width + 'w').join(', ');
    main.src = photo;
    main.alt = photoAlt;
    caption.textContent = photoCaption;
    counter.textContent = (buttons.indexOf(button) + 1) + ' / ' + buttons.length;
    buttons.forEach(view => view.setAttribute('aria-pressed', String(view === button)));
  }

  for (const group of groups) {
    const buttons = views(group);
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => showAngle(button, buttons));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = buttons.length - 1;
        else return;
        event.preventDefault();
        buttons[next].focus();
        showAngle(buttons[next], buttons);
      });
    });
  }

  if (finishOptions) {
    function showFinish(option) {
      const active = groups.find(group => group.dataset.studioAngles === option.value);
      if (!active) return;
      groups.forEach(group => { group.hidden = group !== active; });
      const buttons = views(active);
      showAngle(buttons.find(view => view.getAttribute('aria-pressed') === 'true') || buttons[0], buttons);
      contact.href = contact.dataset.studioContact + '?piece=' +
        encodeURIComponent(contact.dataset.pieceTitle + ' · ' + option.dataset.label);
    }

    finishOptions.addEventListener('change', event => {
      if (event.target.matches('[data-studio-finish]')) showFinish(event.target);
    });
    const selected = finishOptions.querySelector('[data-studio-finish]:checked');
    if (selected && groups[0].dataset.studioAngles !== selected.value) showFinish(selected);
    finishOptions.hidden = false;
  }
})();
