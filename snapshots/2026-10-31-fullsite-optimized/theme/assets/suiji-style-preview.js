(() => {
  'use strict';
  const storageKey = 'suiji-look-preview-v1';
  const metals = ['gold', 'silver', 'blue'];
  const stones = ['rose', 'blue', 'smoky', 'aqua'];
  const colours = { gold: '#b69a58', silver: '#a9b0b3', blue: '#317ca5', rose: '#dfaaa9' };
  const defaults = () => ({ version: 1, lines: [], favourite: false, selection: { quantity: 1, size: '54', metal: 'blue', a: { stone: 'smoky', metal: 'gold' }, b: { stone: 'aqua', metal: 'silver' } } });
  const lineId = line => line.kind === 'base' ? `preview-base-${line.size}-${line.metal}` : `preview-charm-${line.style}-${line.stone}-${line.metal}`;
  function read() {
    const state = defaults();
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey));
      if (saved?.version !== 1) return state;
      state.favourite = saved.favourite === true;
      state.selection.quantity = Math.max(1, Math.min(9, Number.parseInt(saved.selection?.quantity, 10) || 1));
      if (['54', '57'].includes(saved.selection?.size)) state.selection.size = saved.selection.size;
      if (metals.includes(saved.selection?.metal)) state.selection.metal = saved.selection.metal;
      // Recommendation cards show the two existing photographed colourways. Saved bag lines remain intact.
      for (const source of Array.isArray(saved.lines) ? saved.lines.slice(0, 20) : []) {
        if (!metals.includes(source.metal)) continue;
        const line = source.kind === 'base' && ['54', '57'].includes(source.size)
          ? { kind: 'base', size: source.size, metal: source.metal }
          : source.kind === 'charm' && ['a', 'b'].includes(source.style) && stones.includes(source.stone)
            ? { kind: 'charm', style: source.style, stone: source.stone, metal: source.metal } : null;
        if (!line) continue;
        line.id = lineId(line);
        line.quantity = Math.max(1, Math.min(9, Number.parseInt(source.quantity, 10) || 1));
        if (!state.lines.some(item => item.id === line.id)) state.lines.push(line);
      }
    } catch { /* Preview remains usable when session storage is unavailable. */ }
    return state;
  }
  let state = read();
  function counters() {
    const count = state.lines.reduce((sum, line) => sum + line.quantity, 0);
    document.querySelectorAll('[data-suiji-preview-count]').forEach(node => { node.textContent = String(count); });
  }
  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* No customer data or checkout is stored. */ }
    counters();
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  class SuijiLookPreview extends HTMLElement {
    connectedCallback() {
      if (this.dataset.ready) return;
      this.dataset.ready = 'true';
      this.labels = JSON.parse(this.querySelector('[data-preview-labels]').textContent);
      this.addEventListener('change', event => this.change(event));
      this.addEventListener('input', event => {
        if (event.target.matches('[data-preview-quantity]')) this.change(event);
      });
      this.addEventListener('click', event => this.click(event));
      this.querySelector('[data-charm-options-link]')?.addEventListener('click', () => { const options = this.querySelector('[data-charm-options]'); if (options?.tagName === 'DETAILS') options.open = true; });
      this.addEventListener('keydown', event => this.keydown(event));
      this.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', event => {
          if (event.target !== dialog) return;
          const bounds = dialog.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
        });
        dialog.addEventListener('close', () => { if (!this.querySelector('dialog[open]')) document.documentElement.classList.remove('suiji-dialog-open'); });
      });
      this.setTab('description');
      this.restoreControls();
      this.paint();
      this.renderBag();
      this.initCharmSlider();
      this.querySelectorAll('[data-add-base], [data-add-charm], [data-open-size-guide], [data-save-ring], [data-open-charm]').forEach(button => { button.disabled = false; });
      counters();
    }
    restoreControls() {
      this.querySelector(`[name="preview-ring-size"][value="${state.selection.size}"]`).checked = true;
      this.querySelectorAll('[data-base-metal]').forEach(control => {
        if (control.type === 'radio') control.checked = control.value === state.selection.metal;
        else control.value = state.selection.metal;
      });
      const quantity = this.querySelector('[data-base-quantity]');
      if (quantity) quantity.value = String(state.selection.quantity);
      for (const style of ['a', 'b']) {
        const card = this.querySelector(`[data-charm-card="${style}"]`);
        card.querySelectorAll('[data-charm-stone]').forEach(control => { if (control.type === 'radio') control.checked = control.value === state.selection[style].stone; else control.value = state.selection[style].stone; });
        card.querySelectorAll('[data-charm-metal]').forEach(control => { if (control.type === 'radio') control.checked = control.value === state.selection[style].metal; else control.value = state.selection[style].metal; });
      }
    }
    title(line) { return this.labels[line.kind === 'base' ? 'base_title' : `charm_${line.style}`]; }
    metal(value) { return this.labels[`metal_${value}`]; }
    stone(value) { return this.labels[`stone_${value}`]; }
    announce(message) { this.querySelector('[data-preview-status]').textContent = message; const local = this.querySelector('dialog[open] [data-charm-status]'); if (local) local.textContent = message; }
    paint() {
      this.querySelector('[data-base-illustration]').style.setProperty('--preview-metal', colours[state.selection.metal]);
      let hasPhoto = false;
      this.querySelectorAll('[data-base-photo]').forEach(photo => {
        photo.hidden = photo.dataset.basePhoto !== state.selection.metal;
        if (!photo.hidden) hasPhoto = true;
      });
      const drawing = this.querySelector('[data-base-drawing]');
      if (drawing) drawing.hidden = hasPhoto;
      this.querySelector('[data-selected-ring]').textContent = `${state.selection.size} mm`;
      const selectedMetal = this.querySelector('[data-selected-metal]');
      if (selectedMetal) selectedMetal.textContent = this.metal(state.selection.metal);
      this.querySelectorAll('[data-photo-select]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.photoSelect === state.selection.metal)));
      this.querySelector('[data-save-ring]')?.setAttribute('aria-pressed', String(state.favourite));
      const zoom = this.querySelector('[data-preview-zoom]');
      if (zoom) zoom.disabled = !hasPhoto;
      for (const style of ['a', 'b']) {
        const card = this.querySelector(`[data-charm-card="${style}"]`);
        const selection = card.querySelector('[data-charm-selection]');
        if (selection) selection.textContent = this.stone(state.selection[style].stone) + ' · ' + this.metal(state.selection[style].metal);
      }
    }
    change(event) {
      const control = event.target;
      if (control.matches('[name="preview-ring-size"]')) state.selection.size = control.value;
      else if (control.matches('[data-base-metal]')) state.selection.metal = control.value;
      else if (control.matches('[data-base-quantity]')) state.selection.quantity = Math.max(1, Math.min(9, Number.parseInt(control.value, 10) || 1));
      else if (control.matches('[data-charm-stone], [data-charm-metal]')) {
        const style = control.closest('[data-charm-card]').dataset.charmCard;
        state.selection[style][control.matches('[data-charm-stone]') ? 'stone' : 'metal'] = control.value;
      } else if (control.matches('[data-preview-quantity]')) {
        const line = state.lines.find(item => item.id === control.closest('[data-preview-row]').dataset.previewRow);
        if (line) {
          line.quantity = Math.max(1, Math.min(9, Number.parseInt(control.value, 10) || 1));
          control.value = String(line.quantity);
        }
        this.announce(this.labels.updated);
      }
      save();
      this.paint();
    }
    openDialog(dialog) {
      if (!dialog?.showModal || dialog.open) return;
      const localStatus = dialog.querySelector('[data-charm-status]'); if (localStatus) localStatus.textContent = '';
      dialog.showModal();
      document.documentElement.classList.add('suiji-dialog-open');
    }
    setTab(name, focus = false) {
      this.querySelectorAll('[data-pdp-tab]').forEach(tab => {
        const selected = tab.dataset.pdpTab === name;
        tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
        if (selected && focus) tab.focus();
      });
      this.querySelectorAll('[data-pdp-panel]').forEach(panel => { panel.hidden = panel.dataset.pdpPanel !== name; });
    }
    keydown(event) {
      const tab = event.target.closest('[data-pdp-tab]');
      if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      const tabs = [...this.querySelectorAll('[data-pdp-tab]')];
      let index = tabs.indexOf(tab);
      if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = tabs.length - 1;
      else index = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      event.preventDefault(); this.setTab(tabs[index].dataset.pdpTab, true);
    }
    click(event) {
      const button = event.target.closest('button');
      if (!button || !this.contains(button)) return;
      if (button.matches('[data-pdp-tab]')) { this.setTab(button.dataset.pdpTab); return; }
      if (button.matches('[data-close-dialog]')) { button.closest('dialog').close(); return; }
      if (button.matches('[data-open-charm]')) {
        const card = button.closest('[data-charm-card]');
        const optionDialog = card.querySelector('[data-charm-dialog]');
        if (optionDialog) this.openDialog(optionDialog);
        else {
          const photo = card.querySelector('.suiji-charm-card__image img');
          if (!photo) return;
          const dialog = this.querySelector('[data-image-dialog]');
          const fullImage = dialog.querySelector('[data-full-image]');
          fullImage.src = photo.src; fullImage.alt = photo.alt;
          this.openDialog(dialog);
        }
        return;
      }
      if (button.matches('[data-open-size-guide]')) { this.openDialog(this.querySelector('[data-size-dialog]')); return; }
      if (button.matches('[data-preview-zoom]')) {
        const photo = this.querySelector('[data-base-photo]:not([hidden]) img');
        if (!photo) return;
        const dialog = this.querySelector('[data-image-dialog]');
        const fullImage = dialog.querySelector('[data-full-image]');
        fullImage.src = photo.src; fullImage.alt = photo.alt;
        this.openDialog(dialog); return;
      }
      if (button.matches('[data-save-ring]')) {
        state.favourite = !state.favourite; save(); this.paint();
        this.announce(state.favourite ? this.labels.saved : this.labels.unsaved); return;
      }
      if (button.matches('[data-photo-select]')) {
        state.selection.metal = button.dataset.photoSelect;
        save(); this.restoreControls(); this.paint(); return;
      }
      let line;
      if (button.matches('[data-add-base]')) {
        line = { kind: 'base', size: state.selection.size, metal: state.selection.metal };
      } else if (button.matches('[data-add-charm]')) {
        const style = button.dataset.addCharm;
        line = { kind: 'charm', style, ...state.selection[style] };
      } else if (button.matches('[data-preview-remove]')) {
        state.lines = state.lines.filter(item => item.id !== button.closest('[data-preview-row]').dataset.previewRow);
        save(); this.renderBag(); this.announce(this.labels.removed); return;
      } else if (button.matches('[data-preview-clear]')) {
        state.lines = []; save(); this.renderBag(); this.announce(this.labels.empty); return;
      }
      if (!line) return;
      line.id = lineId(line);
      const existing = state.lines.find(item => item.id === line.id);
      const requested = line.kind === 'base' ? state.selection.quantity : 1;
      if (existing && existing.quantity === 9) { this.announce(this.labels.limit); return; }
      if (existing) existing.quantity = Math.min(9, existing.quantity + requested);
      else state.lines.push({ ...line, quantity: requested });
      save(); this.renderBag();
      this.announce(this.labels.added.replace('__ITEM__', this.title(line)));
      const optionDialog = button.closest('dialog[data-charm-dialog]'); if (optionDialog?.open) optionDialog.close();
    }
    initCharmSlider() {
      const strip = this.querySelector('[data-charm-strip]');
      if (!strip) return;
      const cards = [...strip.querySelectorAll('[data-charm-card]')];
      const dots = [...this.querySelectorAll('[data-charm-page]')];
      const previous = this.querySelector('[data-charm-previous]');
      const next = this.querySelector('[data-charm-next]');
      let current = 0;
      const update = () => {
        const step = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
        current = Math.max(0, Math.min(cards.length - 1, Math.round(strip.scrollLeft / Math.max(1, step))));
        if (previous) previous.disabled = current === 0;
        if (next) next.disabled = current === cards.length - 1 || strip.scrollWidth <= strip.clientWidth + 1;
        dots.forEach((dot, index) => { dot.disabled = false; dot.setAttribute('aria-pressed', String(index === current)); });
      };
      const go = index => {
        index = Math.max(0, Math.min(cards.length - 1, index));
        strip.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      };
      previous?.addEventListener('click', () => go(current - 1));
      next?.addEventListener('click', () => go(current + 1));
      dots.forEach((dot, index) => dot.addEventListener('click', () => go(index)));
      strip.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    }
    renderBag() {
      const list = this.querySelector('[data-preview-lines]');
      list.replaceChildren();
      this.querySelector('[data-preview-empty]').hidden = state.lines.length > 0;
      this.querySelector('[data-preview-clear]').hidden = state.lines.length === 0;
      for (const line of state.lines) {
        const row = element('li', 'suiji-preview__bag-line');
        row.dataset.previewRow = line.id;
        const detail = element('div', 'suiji-preview__bag-detail');
        detail.append(element('h4', '', this.title(line)));
        detail.append(element('p', '', line.kind === 'base' ? `${line.size} mm · ${this.metal(line.metal)}` : `${this.stone(line.stone)} · ${this.metal(line.metal)}`));
        const quantityLabel = element('label', 'suiji-preview__quantity');
        quantityLabel.append(element('span', '', this.labels.quantity));
        const quantity = element('input');
        quantity.type = 'number'; quantity.min = '1'; quantity.max = '9'; quantity.value = String(line.quantity);
        quantity.dataset.previewQuantity = '';
        quantity.setAttribute('aria-label', `${this.labels.quantity}: ${this.title(line)}`);
        quantityLabel.append(quantity);
        const remove = element('button', 'suiji-preview__text-button', this.labels.remove);
        remove.type = 'button'; remove.dataset.previewRemove = '';
        remove.setAttribute('aria-label', `${this.labels.remove}: ${this.title(line)}`);
        row.append(detail, quantityLabel, remove);
        list.append(row);
      }
    }
  }
  if (!customElements.get('suiji-look-preview')) customElements.define('suiji-look-preview', SuijiLookPreview);
  counters();
  window.addEventListener('pageshow', () => {
    state = read(); counters();
    document.querySelectorAll('suiji-look-preview[data-ready]').forEach(preview => {
      preview.restoreControls(); preview.paint(); preview.renderBag();
    });
  });

  // Native Dawn disclosure remains the click/keyboard control. Hover is an enhancement for mouse input.
  function initMegaMenus() {
    document.querySelectorAll('[data-suiji-mega-root]:not([data-hover-ready])').forEach(root => {
      root.dataset.hoverReady = 'true';
      const details = root.querySelector('header-menu > details');
      const summary = details?.querySelector(':scope > summary');
      if (!details || !summary) return;
      const desktop = window.matchMedia('(min-width: 990px) and (hover: hover) and (pointer: fine)');
      let closeTimer;
      const cancelClose = () => window.clearTimeout(closeTimer);
      const close = () => { details.open = false; summary.setAttribute('aria-expanded', 'false'); };
      root.addEventListener('pointerenter', event => {
        if (!desktop.matches || event.pointerType !== 'mouse') return;
        cancelClose();
        root.closest('nav')?.querySelectorAll('header-menu > details[open]').forEach(other => { if (other !== details) other.open = false; });
        details.open = true; summary.setAttribute('aria-expanded', 'true');
      });
      root.addEventListener('pointerleave', () => {
        if (!desktop.matches) return;
        closeTimer = window.setTimeout(() => { if (!root.contains(document.activeElement)) close(); }, 180);
      });
      root.addEventListener('focusin', cancelClose);
      root.addEventListener('focusout', () => { closeTimer = window.setTimeout(() => { if (!root.contains(document.activeElement)) close(); }, 0); });
      root.addEventListener('keydown', event => { if (event.key === 'Escape' && details.open) { event.preventDefault(); event.stopPropagation(); close(); summary.focus(); } });
      document.addEventListener('click', event => { if (details.open && !root.contains(event.target)) close(); });
      desktop.addEventListener('change', () => { cancelClose(); close(); });
    });
  }
  initMegaMenus();
  document.addEventListener('shopify:section:load', initMegaMenus);

})();
