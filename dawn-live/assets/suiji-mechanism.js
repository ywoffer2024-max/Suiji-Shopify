/* SUIJI · Interactive mechanism (v2 — scene mode)
   All bases of a set on one stage, charms pre-mounted.
   Drag a charm to another base: empty -> move, occupied -> swap.
   Tap flow: tap a charm, then tap a base. Keyboard: Enter to pick/drop. */
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

    var anchors = JSON.parse(scene.dataset.anchors);
    var section = scene.closest('.suiji-mech');
    var live = section.querySelector('.suiji-mech__live');
    var cta = section.querySelector('.suiji-mech__cta');
    var panels = {};
    FORMS.forEach(function (f) {
      var el = scene.querySelector('.suiji-mech__panel[data-form="' + f + '"]');
      if (!el) return;
      panels[f] = {
        form: f,
        el: el,
        anchorEl: el.querySelector('.suiji-mech__anchor'),
        charmEl: el.querySelector('.suiji-mech__charm'),
        charm: null
      };
      var a = anchors[f] || [50, 50, 18];
      panels[f].anchorEl.style.left = a[0] + '%';
      panels[f].anchorEl.style.top = a[1] + '%';
      panels[f].anchorEl.style.width = Math.max(a[2] * 0.85, 10) + '%';
    });

    var currentSet = sets[0];
    var tryHint = document.getElementById('suiji-try-hint');
    var coaxed = false;
    var selected = null; /* panel whose charm is picked (tap/keyboard flow) */

    function track(name, params) {
      if (window.gtag) { try { window.gtag('event', name, params); } catch (e) {} }
    }

    function announce(msg) { if (live) live.textContent = msg; }

    function renderPanel(p, withClick) {
      var a = anchors[p.form] || [50, 50, 18];
      if (p.charm) {
        p.charmEl.src = p.charm.overlay;
        p.charmEl.style.left = a[0] + '%';
        p.charmEl.style.top = a[1] + '%';
        p.charmEl.style.width = a[2] + '%';
        p.charmEl.hidden = false;
        p.charmEl.setAttribute('aria-label', p.charm.name + ' on ' + p.form + ' base. Press Enter to pick up.');
        if (withClick) {
          p.charmEl.classList.remove('is-snapping');
          void p.charmEl.offsetWidth;
          p.charmEl.classList.add('is-snapping');
        }
      } else {
        p.charmEl.hidden = true;
        p.charmEl.removeAttribute('aria-label');
      }
      p.anchorEl.classList.toggle('is-empty', !p.charm);
    }

    function loadSet(set) {
      currentSet = set;
      clearSelection();
      FORMS.forEach(function (f, i) {
        if (!panels[f]) return;
        panels[f].charm = set.charms[i] || null;
        renderPanel(panels[f], false);
      });
      if (tryHint && set.charms[0]) {
        tryHint.textContent = 'Try it: drag the ' + set.charms[0].name.toLowerCase() + ' from the ring to the pendant \u2192';
      }
      if (!coaxed) {
        FORMS.forEach(function (f) {
          if (panels[f] && panels[f].charm) panels[f].charmEl.classList.add('is-coax');
        });
      }
      if (cta) {
        cta.hidden = false;
        cta.querySelector('.suiji-mech__cta-name').textContent = set.name;
        cta.querySelector('.suiji-mech__cta-price').textContent = set.price || '';
        var link = cta.querySelector('a.button');
        if (set.url) { link.href = set.url; link.style.display = ''; }
        else { link.style.display = 'none'; }
      }
    }

    function transfer(fromP, toP) {
      if (fromP === toP || !fromP.charm) return;
      var moving = fromP.charm;
      var resident = toP.charm;
      toP.charm = moving;
      fromP.charm = resident; /* null -> move, charm -> swap */
      renderPanel(toP, true);
      renderPanel(fromP, !!resident);
      announce(resident
        ? moving.name + ' swapped with ' + resident.name + '.'
        : moving.name + ' locked onto the ' + toP.form + ' base.');
      track('mechanism_snap', { charm: moving.handle, from: fromP.form, to: toP.form, set: currentSet.handle });
    }

    /* ---- set tabs ---- */
    sets.forEach(function (set, i) {
      var tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'suiji-mech__tab' + (i === 0 ? ' is-active' : '');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      tab.textContent = set.name.replace(/^SET \d+ — /, '');
      tab.addEventListener('click', function () {
        tabsEl.querySelectorAll('.suiji-mech__tab').forEach(function (t) {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        loadSet(set);
      });
      tabsEl.appendChild(tab);
    });

    /* ---- selection (tap / keyboard) ---- */
    function clearSelection() {
      if (selected) selected.charmEl.classList.remove('is-selected');
      selected = null;
      Object.keys(panels).forEach(function (f) {
        panels[f].el.classList.remove('is-target');
      });
    }

    function select(p) {
      clearSelection();
      selected = p;
      p.charmEl.classList.add('is-selected');
      Object.keys(panels).forEach(function (f) {
        if (panels[f] !== p) panels[f].el.classList.add('is-target');
      });
      announce(p.charm.name + ' picked up. Choose another base.');
    }

    /* ---- pointer drag ---- */
    var ghost = null;
    var dragFrom = null;
    var dragMoved = false;

    function panelAt(x, y) {
      var best = null;
      Object.keys(panels).forEach(function (f) {
        var r = panels[f].el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) best = panels[f];
      });
      return best;
    }

    Object.keys(panels).forEach(function (f) {
      var p = panels[f];

      p.charmEl.addEventListener('pointerdown', function (ev) {
        if (ev.pointerType === 'mouse' && ev.button !== 0) return;
        if (!p.charm) return;
        dragFrom = p;
        dragMoved = false;
        if (!coaxed) {
          coaxed = true;
          if (tryHint) tryHint.textContent = '';
          Object.keys(panels).forEach(function (f) { panels[f].charmEl.classList.remove('is-coax'); });
        }
        ghost = document.createElement('img');
        ghost.className = 'suiji-mech__drag-ghost';
        ghost.src = p.charm.overlay;
        ghost.style.width = Math.round(p.el.getBoundingClientRect().width * 0.22) + 'px';
        document.body.appendChild(ghost);
        moveGhost(ev);
        p.charmEl.classList.add('is-lifted');
        track('mechanism_play', { charm: p.charm.handle, set: currentSet.handle });
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp, { once: true });
        ev.preventDefault();
      });

      /* tap-to-place target */
      p.el.addEventListener('click', function () {
        if (selected && selected !== p && selected.charm) {
          var from = selected;
          clearSelection();
          transfer(from, p);
        }
      });

      /* keyboard */
      p.charmEl.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        ev.preventDefault();
        if (selected === p) { clearSelection(); announce('Cancelled.'); return; }
        if (selected && selected.charm) { var from = selected; clearSelection(); transfer(from, p); return; }
        if (p.charm) select(p);
      });
      p.el.addEventListener('keydown', function (ev) {
        if ((ev.key === 'Enter' || ev.key === ' ') && selected && selected !== p) {
          ev.preventDefault();
          var from = selected;
          clearSelection();
          transfer(from, p);
        }
      });
    });

    function onMove(ev) {
      dragMoved = true;
      moveGhost(ev);
      var over = panelAt(ev.clientX, ev.clientY);
      Object.keys(panels).forEach(function (f) {
        panels[f].el.classList.toggle('is-target', !!over && panels[f] === over && over !== dragFrom);
      });
    }

    function moveGhost(ev) {
      if (!ghost) return;
      ghost.style.left = ev.clientX + 'px';
      ghost.style.top = ev.clientY + 'px';
    }

    function onUp(ev) {
      window.removeEventListener('pointermove', onMove);
      if (ghost) { ghost.remove(); ghost = null; }
      Object.keys(panels).forEach(function (f) { panels[f].el.classList.remove('is-target'); });
      if (dragFrom) dragFrom.charmEl.classList.remove('is-lifted');
      var target = panelAt(ev.clientX, ev.clientY);
      if (dragFrom && target && target !== dragFrom && dragMoved) {
        transfer(dragFrom, target);
      } else if (dragFrom && !dragMoved && dragFrom.charm) {
        select(dragFrom); /* treated as tap on charm */
      }
      dragFrom = null;
    }

    loadSet(sets[0]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
