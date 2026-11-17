(() => {
  const catalogue = document.querySelector('[data-photo-catalogue]');
  if (!catalogue) return;

  const dialog = catalogue.querySelector('[data-photo-dialog]');
  if (typeof dialog?.showModal !== 'function') return;

  const data = JSON.parse(catalogue.querySelector('[data-photo-data]').textContent);
  const title = dialog.querySelector('[data-photo-title]');
  const close = dialog.querySelector('[data-photo-close]');
  const finish = dialog.querySelector('[data-photo-finish]');
  const main = dialog.querySelector('[data-photo-main]');
  const thumbs = dialog.querySelector('[data-photo-thumbs]');
  const counter = dialog.querySelector('[data-photo-counter]');
  const note = dialog.querySelector('[data-photo-note]');
  const original = dialog.querySelector('[data-photo-original]');
  const widths = [420, 560, 840, 1120, 1400];
  let active;
  let opener;

  const source = (filename, width) => data.cdn + filename + (width ? '?width=' + width : '');

  function showAngle(index) {
    const selected = active.finishes[Number(finish.value)];
    const angle = selected.angles[index];
    const label = `${data.angle} ${index + 1} / ${selected.angles.length}`;
    main.alt = `${active.title} · ${selected.name} · ${label}`;
    main.sizes = '(max-width: 749px) 80vw, 530px';
    main.srcset = widths.map(width => `${source(angle, width)} ${width}w`).join(', ');
    main.src = source(angle, 560);
    original.href = source(angle);
    counter.textContent = label;
    [...thumbs.children].forEach((thumb, i) => {
      thumb.setAttribute('aria-pressed', String(i === index));
    });
  }

  function showFinish() {
    const selected = active.finishes[Number(finish.value)];
    thumbs.replaceChildren(...selected.angles.map((angle, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.photoAngle = String(index);
      button.setAttribute('aria-label', `${data.angle} ${index + 1}`);
      const image = document.createElement('img');
      image.width = 112;
      image.height = 140;
      image.alt = '';
      image.src = source(angle, 112);
      button.append(image);
      return button;
    }));
    showAngle(0);
  }

  catalogue.querySelectorAll('[data-open-photo]').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      active = data.pieces[link.dataset.openPhoto];
      if (!active) return;
      event.preventDefault();
      opener = link;
      title.textContent = active.title;
      note.textContent = active.note;
      note.hidden = !active.note;
      finish.replaceChildren(...active.finishes.map((item, i) => new Option(item.name, String(i))));
      showFinish();
      dialog.showModal();
      close.focus();
    });
  });

  finish.addEventListener('change', showFinish);
  thumbs.addEventListener('click', event => {
    const button = event.target.closest('button[data-photo-angle]');
    if (button) showAngle(Number(button.dataset.photoAngle));
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus());
})();
