(() => {
  'use strict';
  class SuijiHomeEditorial extends HTMLElement {
    connectedCallback() {
      if (this.dataset.homeReady) return;
      this.dataset.homeReady = 'true';
      this.controller = new AbortController();
      const { signal } = this.controller;
      const dialog = this.querySelector('[data-home-look-dialog]');
      const items = this.querySelector('[data-home-look-items]');
      const marker = this.querySelector('[data-home-look-marker]');
      const close = () => { if (dialog.open) dialog.close(); };
      const open = (index = 0) => {
        dialog.append(items);
        if (!dialog.open) dialog.showModal();
        document.documentElement.classList.add('suiji-home-dialog-open');
        const card = items.querySelector(`[data-home-look-item="${index}"]`);
        items.scrollTo({ left: card ? card.offsetLeft - items.firstElementChild.offsetLeft : 0, behavior: 'instant' });
      };
      this.querySelector('[data-home-look-open]').addEventListener('click', () => open(), { signal });
      this.querySelector('[data-home-look-close]').addEventListener('click', close, { signal });
      dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const b = dialog.getBoundingClientRect();
        if (event.clientX < b.left || event.clientX > b.right || event.clientY < b.top || event.clientY > b.bottom) close();
      }, { signal });
      dialog.addEventListener('close', () => { marker.after(items); document.documentElement.classList.remove('suiji-home-dialog-open'); }, { signal });
      const mobile = matchMedia('(max-width: 749px)');
      mobile.addEventListener('change', close, { signal });
      this.querySelectorAll('[data-home-hotspot]').forEach(button => {
        button.addEventListener('click', () => {
          const index = Number(button.dataset.homeHotspot);
          if (mobile.matches) { open(index); return; }
          const card = items.querySelector(`[data-home-look-item="${index}"]`);
          items.querySelectorAll('[data-highlighted]').forEach(n => n.removeAttribute('data-highlighted'));
          card.dataset.highlighted = 'true';
          card.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
        }, { signal });
      });
      this.querySelectorAll('[data-home-look-open],[data-home-hotspot]').forEach(button => { button.disabled = false; });
    }
    disconnectedCallback() { this.controller?.abort(); document.documentElement.classList.remove('suiji-home-dialog-open'); delete this.dataset.homeReady; }
  }
  if (!customElements.get('suiji-home-editorial')) customElements.define('suiji-home-editorial', SuijiHomeEditorial);
})();
