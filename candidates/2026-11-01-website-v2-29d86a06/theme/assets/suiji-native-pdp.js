(() => {
  'use strict';
  class SuijiNativeProduct extends HTMLElement {
    connectedCallback() {
      if (this.dataset.ready) return;
      this.dataset.ready = 'true';
      const saveButton = this.querySelector('[data-native-save]');
      let saved = [];
      try { const stored = JSON.parse(sessionStorage.getItem('suiji-native-saved-v1')); if (Array.isArray(stored)) saved = stored.filter(id => /^[0-9]+$/.test(id)).slice(0,100); } catch {}
      if (saveButton) { saveButton.disabled = false; saveButton.setAttribute('aria-pressed', String(saved.includes(this.dataset.saveProduct))); }
      const tabs = [...this.querySelectorAll('[data-native-tab]')];
      const select = (name, focus = false) => {
        tabs.forEach(tab => { const active = tab.dataset.nativeTab === name; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; if (active && focus) tab.focus(); });
        this.querySelectorAll('[data-native-panel]').forEach(panel => { panel.hidden = panel.dataset.nativePanel !== name; });
      };
      if (tabs.length) select(tabs[0].dataset.nativeTab);
      this.querySelectorAll('[data-native-guide-open]').forEach(button => { button.disabled = false; });
      this.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button || !this.contains(button)) return;
        if (button.hasAttribute('data-native-save')) {
          const id = this.dataset.saveProduct;
          if (!/^[0-9]+$/.test(id)) return;
          saved = saved.includes(id) ? saved.filter(value => value !== id) : [...saved, id].slice(-100);
          try { sessionStorage.setItem('suiji-native-saved-v1',JSON.stringify(saved)); } catch {}
          button.setAttribute('aria-pressed',String(saved.includes(id))); return;
        }
        if (button.dataset.nativeTab) { select(button.dataset.nativeTab); return; }
        const dialog = this.querySelector('dialog');
        if (button.hasAttribute('data-native-guide-open') && dialog?.showModal && !dialog.open) { dialog.showModal(); document.documentElement.classList.add('suiji-native-dialog-open'); }
        if (button.hasAttribute('data-native-guide-close')) dialog?.close();
      });
      this.addEventListener('keydown', event => {
        const index = tabs.indexOf(event.target);
        if (index < 0 || !['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        event.preventDefault(); select(tabs[next].dataset.nativeTab, true);
      });
      this.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('close', () => { if (!document.querySelector('suiji-native-product dialog[open]')) document.documentElement.classList.remove('suiji-native-dialog-open'); });
        dialog.addEventListener('click', event => { const box = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close(); });
      });
    }
  }
  if (!customElements.get('suiji-native-product')) customElements.define('suiji-native-product', SuijiNativeProduct);
})();
