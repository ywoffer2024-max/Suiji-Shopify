/* SUIJI · Interactive mechanism (v3 — line-art configurator)
   Three fixed bases (ring/pendant/earring), each holds one charm in a drawn mount.
   Move a charm to another base: drag (whole panel is the drop target) or click,
   or keyboard. Seating is deterministic CSS — never misaligned. */
(function () {
  'use strict';
  var FORMS = ['ring', 'necklace', 'earring'];

  function init() {
    var scene = document.getElementById('suiji-scene');
    var dataEl = document.getElementById('suiji-mech-data');
    var tabsEl = document.getElementById('suiji-set-tabs');
    if (!scene || !dataEl || !tabsEl) return;

    var sets;
    try { sets = JSON.parse(dataEl.textContent); } catch (e) { return; }
    sets = sets.filter(function (s) { return s.charms && s.charms.length; });
    if (!sets.length) return;

    var section = scene.closest('.suiji-mech');
    var live = section.querySelector('.suiji-mech__live');
    var cta = section.querySelector('.suiji-mech__cta');
    var tryHint = document.getElementById('suiji-try-hint');
    var currentSet = sets[0];
    var selected = null;
    var coaxed = false;

    var panels = {};
    FORMS.forEach(function (f) {
      var el = scene.querySelector('.suiji-mech__panel[data-form="' + f + '"]');
      if (el) panels[f] = { form: f, el: el, charmEl: el.querySelector('.suiji-mech__charm'), charm: null };
    });

    function track(n, p) { if (window.gtag) { try { window.gtag('event', n, p); } catch (e) {} } }
    function announce(m) { if (live) live.textContent = m; }

    function renderPanel(p, withClick) {
      if (p.charm) {
        if (p.charmEl.getAttribute('src') !== p.charm.overlay) p.charmEl.src = p.charm.overlay;
        p.charmEl.hidden = false;
        p.charmEl.setAttribute('aria-label', p.charm.name + ' on the ' + p.form + ' base. Press Enter to pick it up.');
        p.el.classList.remove('is-empty');
        if (withClick) { p.charmEl.classList.remove('is-snapping'); void p.charmEl.offsetWidth; p.charmEl.classList.add('is-snapping'); }
      } else {
        p.charmEl.hidden = true;
        p.charmEl.removeAttribute('aria-label');
        p.el.classList.add('is-empty');
      }
    }

    function setCoax(on) {
      FORMS.forEach(function (f) { if (panels[f]) panels[f].charmEl.classList.toggle('is-coax', on && !!panels[f].charm); });
    }

    function loadSet(set) {
      currentSet = set;
      clearSelection();
      FORMS.forEach(function (f, i) { if (panels[f]) { panels[f].charm = set.charms[i] || null; renderPanel(panels[f], false); } });
      if (tryHint && !coaxed && set.charms[0]) tryHint.textContent = 'Try it: drag the ' + set.charms[0].name.toLowerCase() + ' onto another base →';
      if (cta) {
        cta.hidden = false;
        cta.querySelector('.suiji-mech__cta-name').textContent = set.name;
        cta.querySelector('.suiji-mech__cta-price').textContent = set.price || '';
        var link = cta.querySelector('a.button');
        if (set.url) { link.href = set.url; link.style.display = ''; } else { link.style.display = 'none'; }
      }
    }

    function firstInteraction() {
      if (coaxed) return;
      coaxed = true;
      if (tryHint) tryHint.textContent = '';
    }

    function transfer(fromP, toP) {
      if (fromP === toP || !fromP.charm) return;
      var moving = fromP.charm, resident = toP.charm;
      toP.charm = moving; fromP.charm = resident;
      renderPanel(toP, true); renderPanel(fromP, !!resident);
      announce(resident ? moving.name + ' swapped with ' + resident.name + '.' : moving.name + ' locked onto the ' + toP.form + ' base.');
      track('mechanism_snap', { charm: moving.handle, from: fromP.form, to: toP.form, set: currentSet.handle });
    }

    /* set tabs */
    sets.forEach(function (set, i) {
      var tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'suiji-mech__tab' + (i === 0 ? ' is-active' : '');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      tab.textContent = set.name.replace(/^SET\s*\d+\s*[—-]\s*/i, '');
      tab.addEventListener('click', function () {
        tabsEl.querySelectorAll('.suiji-mech__tab').forEach(function (t) { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('is-active'); tab.setAttribute('aria-selected', 'true');
        loadSet(set); setCoax(true);
      });
      tabsEl.appendChild(tab);
    });

    /* selection (tap / keyboard) */
    function clearSelection() {
      if (selected) selected.charmEl.classList.remove('is-selected');
      selected = null;
      Object.keys(panels).forEach(function (f) { panels[f].el.classList.remove('is-target'); });
    }
    function select(p) {
      clearSelection(); selected = p; p.charmEl.classList.add('is-selected');
      Object.keys(panels).forEach(function (f) { if (panels[f] !== p) panels[f].el.classList.add('is-target'); });
      announce(p.charm.name + ' picked up. Choose another base.');
    }

    /* drag — whole panel is the target */
    var ghost = null, dragFrom = null, dragMoved = false;
    function panelAt(x, y) {
      var best = null;
      Object.keys(panels).forEach(function (f) {
        var r = panels[f].el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) best = panels[f];
      });
      return best;
    }
    function moveGhost(ev) { if (ghost) { ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px'; } }

    Object.keys(panels).forEach(function (f) {
      var p = panels[f];
      p.charmEl.addEventListener('pointerdown', function (ev) {
        if (ev.pointerType === 'mouse' && ev.button !== 0) return;
        if (!p.charm) return;
        firstInteraction(); setCoax(false);
        dragFrom = p; dragMoved = false;
        ghost = document.createElement('img');
        ghost.className = 'suiji-mech__drag-ghost';
        ghost.src = p.charm.overlay;
        ghost.style.width = Math.round(p.el.getBoundingClientRect().width * 0.3) + 'px';
        document.body.appendChild(ghost); moveGhost(ev);
        p.charmEl.classList.add('is-lifted');
        track('mechanism_play', { charm: p.charm.handle, set: currentSet.handle });
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp, { once: true });
        ev.preventDefault();
      });
      p.el.addEventListener('click', function () {
        if (selected && selected !== p && selected.charm) { var from = selected; clearSelection(); transfer(from, p); }
      });
      p.charmEl.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        ev.preventDefault(); firstInteraction(); setCoax(false);
        if (selected === p) { clearSelection(); announce('Cancelled.'); return; }
        if (selected && selected.charm) { var from = selected; clearSelection(); transfer(from, p); return; }
        if (p.charm) select(p);
      });
      p.el.addEventListener('keydown', function (ev) {
        if ((ev.key === 'Enter' || ev.key === ' ') && selected && selected !== p) { ev.preventDefault(); var from = selected; clearSelection(); transfer(from, p); }
      });
    });

    function onMove(ev) {
      dragMoved = true; moveGhost(ev);
      var over = panelAt(ev.clientX, ev.clientY);
      Object.keys(panels).forEach(function (f) { panels[f].el.classList.toggle('is-target', !!over && panels[f] === over && over !== dragFrom); });
    }
    function onUp(ev) {
      window.removeEventListener('pointermove', onMove);
      if (ghost) { ghost.remove(); ghost = null; }
      Object.keys(panels).forEach(function (f) { panels[f].el.classList.remove('is-target'); });
      if (dragFrom) dragFrom.charmEl.classList.remove('is-lifted');
      var target = panelAt(ev.clientX, ev.clientY);
      if (dragFrom && target && target !== dragFrom && dragMoved) transfer(dragFrom, target);
      else if (dragFrom && !dragMoved && dragFrom.charm) select(dragFrom);
      dragFrom = null;
    }

    loadSet(sets[0]);
    setCoax(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
