(() => {
  'use strict';
  const key = 'suiji-catalogue-demo-v1';
  const legacyKey = 'suiji-look-preview-v1';
  const parse = name => { try { return JSON.parse(sessionStorage.getItem(name)) || {}; } catch { return {}; } };
  const amount = q => Math.max(1, Math.min(99, Number.parseInt(q, 10) || 1));
  const legacyAmount = q => Math.max(1, Math.min(9, Number.parseInt(q, 10) || 1));
  const read = () => { const state = parse(key); return { version: 1, giftNote: typeof state.giftNote === 'string' ? state.giftNote.slice(0,300) : '', lines: Array.isArray(state.lines) ? state.lines.filter(x => x && typeof x.sku === 'string').map(x => ({ ...x, quantity: amount(x.quantity) })) : [], favourites: Array.isArray(state.favourites) ? state.favourites.filter(x => typeof x === 'string') : [] }; };
  const legacy = () => { const state = parse(legacyKey); return state.version === 1 && Array.isArray(state.lines) ? state.lines.filter(x => x && x.id && ['base','charm'].includes(x.kind)).map(x => ({ ...x, quantity: legacyAmount(x.quantity), legacy: true })) : []; };
  const localeRoot = () => document.documentElement.lang.toLowerCase().startsWith('fr') ? '' : '/en';
  function count() { return [...read().lines, ...legacy()].reduce((n,x) => n + amount(x.quantity),0); }
  function paint() {
    document.querySelectorAll('form[action*="/localization"] input[name="return_to"]').forEach(input=>{input.value=location.pathname+location.search+location.hash;});
    document.querySelectorAll('[data-suiji-preview-count]').forEach(x => { x.textContent = String(count()); });
    document.querySelectorAll('a[href*="/pages/bases#preview-bag"]').forEach(a => { a.href = localeRoot() + '/cart'; a.setAttribute('aria-label', localeRoot() ? 'Shopping bag' : 'Panier'); });
  }
  function save(state) { try { sessionStorage.setItem(key,JSON.stringify(state)); } catch { throw new Error('storage-unavailable'); } paint(); document.dispatchEvent(new CustomEvent('suiji:bag-change')); }
  const api = {
    read, legacy, count,
    add(product,variant,quantity=1) {
      const state=read(), current=state.lines.find(x => x.sku === variant.sku);
      if(current) current.quantity=Math.min(99,current.quantity+amount(quantity));
      else state.lines.push({sku:variant.sku,product:product.key,quantity:amount(quantity)});
      save(state);
    },
    quantity(id,quantity,isLegacy=false) {
      if(isLegacy) { const state=parse(legacyKey); state.lines=(state.lines||[]).map(x => x.id===id?{...x,quantity:legacyAmount(quantity)}:x); try{sessionStorage.setItem(legacyKey,JSON.stringify(state));}catch{throw new Error('storage-unavailable');} paint(); document.dispatchEvent(new CustomEvent('suiji:bag-change')); return; }
      const state=read();state.lines=state.lines.map(x=>x.sku===id?{...x,quantity:amount(quantity)}:x);save(state);
    },
    remove(id,isLegacy=false) {
      if(isLegacy) { const state=parse(legacyKey);state.lines=(state.lines||[]).filter(x=>x.id!==id);try{sessionStorage.setItem(legacyKey,JSON.stringify(state));}catch{throw new Error('storage-unavailable');}paint();document.dispatchEvent(new CustomEvent('suiji:bag-change'));return; }
      const state=read();state.lines=state.lines.filter(x=>x.sku!==id);save(state);
    },
    note(value) {const state=read();state.giftNote=String(value||'').slice(0,300);try{sessionStorage.setItem(key,JSON.stringify(state));}catch{throw new Error('storage-unavailable');}},
    favourite(product) {const state=read();state.favourites=state.favourites.includes(product)?state.favourites.filter(x=>x!==product):[...state.favourites,product];save(state);return state.favourites.includes(product);},
    clearAfterDemo() {const state=read();state.lines=[];state.giftNote='';save(state);const old=parse(legacyKey);if(old.version===1){old.lines=[];try{sessionStorage.setItem(legacyKey,JSON.stringify(old));}catch{}}paint();}
  };
  window.SuijiCommerceBag=api;
  document.addEventListener('DOMContentLoaded',paint);
  window.addEventListener('pageshow',()=>requestAnimationFrame(paint));
  document.addEventListener('suiji:catalogue-ready',paint);
  document.addEventListener('suiji:preview-change',paint);
  document.addEventListener('suiji:route-change',paint);
  document.addEventListener('DOMContentLoaded',()=>{
    if(!location.pathname.includes('/pages/faq'))return;
    const content=document.querySelector('main .rte');if(!content||content.querySelector('details'))return;
    for(const heading of [...content.querySelectorAll('h2')]){
      const disclosure=document.createElement('details'),summary=document.createElement('summary'),body=document.createElement('div');disclosure.className='sc-help-accordion';summary.textContent=heading.textContent;let next=heading.nextElementSibling;heading.replaceWith(disclosure);disclosure.append(summary,body);while(next&&next.tagName!=='H2'){const after=next.nextElementSibling;body.append(next);next=after;}
    }
  });
})();
