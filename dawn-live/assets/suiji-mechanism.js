/* SUIJI · Interactive mechanism (tier B)
   Drag (pointer events) or tap/keyboard a charm onto the base anchor.
   Snap + brand "click" rebound; CTA reveals the parent set. */
(function () {
  'use strict';

  function init() {
    var stage = document.getElementById('suiji-stage');
    var dataEl = document.getElementById('suiji-mech-data');
    var tray = document.getElementById('suiji-tray');
    if (!stage || !dataEl || !tray) return;

    var charms;
    try { charms = JSON.parse(dataEl.textContent); } catch (e) { return; }
    charms = charms.filter(function (c) { return c.overlay && c.setName; });
    if (!charms.length) return;

    var anchors = JSON.parse(stage.dataset.anchors);
    var anchorEl = stage.querySelector('.suiji-mech__anchor');
    var charmEl = stage.querySelector('.suiji-mech__charm');
    var hintEl = stage.querySelector('.suiji-mech__hint');
    var live = document.querySelector('.suiji-mech__live');
    var cta = document.querySelector('.suiji-mech__cta');
    var section = stage.closest('.suiji-mech');
    var currentForm = 'ring';
    var placed = null;

    function anchor() { return anchors[currentForm] || [50, 50, 24]; }

    function layoutAnchor() {
      var a = anchor();
      anchorEl.style.left = a[0] + '%';
      anchorEl.style.top = a[1] + '%';
      anchorEl.style.width = Math.max(a[2] * 0.7, 10) + '%';
    }

    function placeCharm(charm) {
      var a = anchor();
      charmEl.src = charm.overlay;
      charmEl.style.left = a[0] + '%';
      charmEl.style.top = a[1] + '%';
      charmEl.style.width = a[2] + '%';
      charmEl.hidden = false;
      charmEl.classList.remove('is-snapping');
      void charmEl.offsetWidth; /* restart animation */
      charmEl.classList.add('is-snapping');
      placed = charm;
      if (hintEl) hintEl.hidden = true;
      if (live) live.textContent = charm.name + ' locked onto the ' + currentForm + ' base.';
      if (cta) {
        cta.hidden = false;
        cta.querySelector('.suiji-mech__cta-name').textContent = charm.name;
        cta.querySelector('.suiji-mech__cta-set').textContent = charm.setName || 'SUIJI system';
        cta.querySelector('.suiji-mech__cta-price').textContent = charm.setPrice || '';
        var link = cta.querySelector('a.button');
        if (charm.setUrl) { link.href = charm.setUrl; link.style.display = ''; }
        else { link.style.display = 'none'; }
      }
      track('mechanism_snap', { charm: charm.handle, form: currentForm });
    }

    function track(name, params) {
      if (window.gtag) { try { window.gtag('event', name, params); } catch (e) {} }
    }

    /* ---- tray ---- */
    var selectedChip = null;
    charms.forEach(function (charm) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'suiji-charm-chip';
      chip.setAttribute('role', 'option');
      chip.setAttribute('aria-selected', 'false');
      chip.innerHTML =
        '<img class="suiji-charm-chip__img" alt="" loading="lazy" src="' + charm.overlay + '">' +
        '<span class="suiji-charm-chip__name">' + charm.name + '</span>';
      chip.addEventListener('click', function () {
        selectChip(chip);
        placeCharm(charm); /* tap-to-place (mobile + keyboard) */
      });
      chip.addEventListener('pointerdown', function (ev) {
        if (ev.pointerType === 'mouse' && ev.button !== 0) return;
        startDrag(ev, charm, chip);
      });
      tray.appendChild(chip);
    });

    function selectChip(chip) {
      if (selectedChip) {
        selectedChip.classList.remove('is-selected');
        selectedChip.setAttribute('aria-selected', 'false');
      }
      selectedChip = chip;
      chip.classList.add('is-selected');
      chip.setAttribute('aria-selected', 'true');
    }

    /* ---- drag ---- */
    var ghost = null;
    var dragCharm = null;

    function startDrag(ev, charm, chip) {
      dragCharm = charm;
      selectChip(chip);
      ghost = document.createElement('img');
      ghost.className = 'suiji-mech__drag-ghost';
      ghost.src = charm.overlay;
      ghost.style.width = '72px';
      document.body.appendChild(ghost);
      moveGhost(ev);
      track('mechanism_play', { charm: charm.handle });
      window.addEventListener('pointermove', moveGhost);
      window.addEventListener('pointerup', endDrag, { once: true });
      ev.preventDefault();
    }

    function moveGhost(ev) {
      if (!ghost) return;
      ghost.style.left = ev.clientX + 'px';
      ghost.style.top = ev.clientY + 'px';
      anchorEl.classList.toggle('is-near', isNearAnchor(ev));
    }

    function isNearAnchor(ev) {
      var r = stage.getBoundingClientRect();
      var a = anchor();
      var ax = r.left + r.width * a[0] / 100;
      var ay = r.top + r.height * a[1] / 100;
      var radius = Math.max(r.width * 0.14, 56);
      return Math.hypot(ev.clientX - ax, ev.clientY - ay) < radius;
    }

    function endDrag(ev) {
      window.removeEventListener('pointermove', moveGhost);
      if (ghost) { ghost.remove(); ghost = null; }
      anchorEl.classList.remove('is-near');
      if (dragCharm && isNearAnchor(ev)) placeCharm(dragCharm);
      dragCharm = null;
    }

    /* ---- form tabs ---- */
    var tabs = section.querySelectorAll('.suiji-mech__tab');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        currentForm = tab.dataset.form;
        section.querySelectorAll('.suiji-mech__stage-img').forEach(function (img) {
          img.hidden = img.dataset.form !== currentForm;
        });
        layoutAnchor();
        if (placed) placeCharm(placed); /* keep charm mounted across forms */
      });
    });

    layoutAnchor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
