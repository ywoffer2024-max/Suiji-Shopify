(() => {
  function filterSets(root, selected) {
    root.querySelectorAll('[data-set-filter]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.setFilter === selected));
    });
    root.querySelectorAll('[data-set-card], [data-set-detail]').forEach(item => {
      item.hidden = selected !== 'all' && !item.dataset.tags.split(' ').includes(selected);
    });
    const result = root.querySelector('[data-set-results]');
    if (result) {
      const count = Array.from(root.querySelectorAll('[data-set-card]')).filter(item => !item.hidden).length;
      result.textContent = result.dataset.label.replace('__COUNT__', String(count));
    }
  }

  function revealTarget(hash) {
    if (!hash || hash === '#') return null;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return null; }
    const target = document.getElementById(id);
    if (target?.matches('[data-set-detail][hidden]')) {
      filterSets(target.closest('[data-suiji-information]'), 'all');
    }
    return target;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-set-filter]');
    if (button) {
      const root = button.closest('[data-suiji-information]');
      if (root) filterSets(root, button.dataset.setFilter);
      return;
    }
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname) return;
    const target = revealTarget(url.hash);
    if (!target) return;
    const drawer = link.closest('header-drawer');
    const menu = link.closest('header-menu');
    if (drawer && typeof drawer.closeMenuDrawer === 'function') {
      const trigger = drawer.querySelector('summary');
      drawer.closeMenuDrawer(event, trigger);
      trigger.setAttribute('aria-expanded', 'false');
      // Dawn's close animation restores focus; move focus only after it finishes.
      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: 'start' });
      }, 450);
    } else if (menu && typeof menu.close === 'function') {
      menu.close();
    }
  });
  window.addEventListener('hashchange', () => {
    const target = revealTarget(location.hash);
    if (target) target.scrollIntoView({ block: 'start' });
  });
  revealTarget(location.hash);
})();
