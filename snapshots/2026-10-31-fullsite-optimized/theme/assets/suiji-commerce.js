(() => {
  'use strict';
  const root=document.querySelector('[data-suiji-commerce]');
  if(!root)return;
  const fr=root.dataset.locale==='fr',lang=fr?'fr':'en',prefix=fr?'':'/en';
  const text=x=>typeof x==='string'?x:(x?.[lang]||x?.en||'');
  const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const T=(en,frText)=>fr?frText:en;
  const bag=window.SuijiCommerceBag;
  const money=n=>new Intl.NumberFormat(fr?'fr-FR':'en-FR',{style:'currency',currency:'EUR'}).format(n/100);
  const url=p=>prefix+(p.product_path||('/collections/'+p.category+(root.dataset.catalogueVersion==='2'?'?view=suiji-p-':'?view=suiji-product&product=')+encodeURIComponent(p.key)));
  const allUrl=prefix+'/collections/all';
  const roleNames={ring_base:T('Ring base','Support de bague'),earring_base:T('Earring base','Support de boucle'),pendant_base:T('Pendant base','Support de pendentif'),necklace_base:T('Necklace base','Support de collier'),bracelet_base:T('Bracelet base','Support de bracelet'),charm:T('Charm','Ornement'),connector:T('Connector','Connecteur'),ear_back:T('Ear back','Fermoir d’oreille'),assembled_jewelry:T('Jewelry','Bijou'),set:T('Set','Ensemble')};
  const categories={all:T('Shop All','Tous les bijoux'),rings:T('Rings','Bagues'),earrings:T('Earrings','Boucles d’oreilles'),necklaces:T('Necklaces','Colliers'),bracelets:T('Bracelets & Bangles','Bracelets'),charms:T('Charms','Ornements'),extras:T('Accessories','Accessoires'),sets:T('Sets','Ensembles'),bases:T('Jewelry Bases','Supports de bijoux')};
  let products=[],byKey={},selected,selection=[],quantity=1,listPage=1;
  const params=new URLSearchParams(location.search);
  const announce=message=>{const n=root.querySelector('[data-commerce-status]');if(n)n.textContent=message;};
  function image(p,small=false,eager=false){return `<img src="${e(small?p.image.thumb:(p.image.src||p.image.thumb))}" width="${p.image.width}" height="${p.image.height}" alt="${e(text(p.title))}" loading="${eager?'eager':'lazy'}" decoding="async" ${eager?'fetchpriority="high"':''}>`;}
  function badge(label,filter){return `<a class="sc-badge" href="${allUrl}${filter?'?'+filter:''}">${e(label)}</a>`;}
  function badges(p){return `${badge(roleNames[p.role]||p.role,'role='+p.role)}${p.metal?badge(T('TC4 Titanium','Titane TC4'),'material=titanium'):''}${p.core_lock_included===true?badge('Core-Lock','system=core-lock'):''}${p.stone==='moissanite'?badge('Moissanite','stone=moissanite'):''}${p.sale_unit==='pair'?badge(T('Pair','Paire')):''}`;}
  function card(p,plus=false,eager=false){return `<article class="sc-card"><div class="sc-card-image"><a href="${url(p)}">${image(p,true,eager)}</a>${plus?`<button type="button" data-quick-add="${p.key}" aria-label="${e(T((p.has_ring_size||p.options?.some(o=>o.key==='ring_size'))?'Choose ':'Add ',(p.has_ring_size||p.options?.some(o=>o.key==='ring_size'))?'Choisir ':'Ajouter ')+text(p.title))}">+</button>`:''}</div><h3><a href="${url(p)}">${e(text(p.title))}</a></h3><p>${e(roleNames[p.role]||'SUIJI')}</p><p class="sc-card-price">${money(p.demo_price_cents)}</p></article>`;}
  function bindQuickAdds(container=root){
    container.querySelectorAll('[data-quick-add]').forEach(button=>button.addEventListener('click',async()=>{
      const initial=byKey[button.dataset.quickAdd];
      if(initial.has_ring_size){location.href=url(initial);return;}
      button.disabled=true;
      try{
        const p=await loadProduct(initial.key);
        const v=button.dataset.quickAddSku?p.variants.find(v=>v.sku===button.dataset.quickAddSku):p.variants[0];
        if(!v)throw new Error('The requested configuration is unavailable');
        bag.add(p,v);
        announce(T('Added to your bag: ','Ajouté au panier : ')+text(p.title));
        if(container.matches?.('[data-sc-added]'))return;
        const look=root.querySelector('[data-look-dialog]');
        if(look?.open)look.close();
        await showAdded(p,v);
      }catch{
        announce(T('This piece could not be added. Please try again.','Cette pièce n’a pas pu être ajoutée. Réessayez.'));
      }finally{button.disabled=false;}
    }));
  }
  function recommendations(p){
    const keys=p.recommendations.filter(k=>byKey[k]).slice(0,2);let cards=keys.map(k=>card(byKey[k],true));
    if(p.role==='ring_base'&&p.recommendations.includes('oval-motif')){
      const motif=byKey['oval-motif'];const choices=[['OV-SM-SQ-G','mf-f01-front-f337b8015d3d1e41.png?v=1793146105',T('Oval charm · Smooth','Ornement ovale · Lisse')],['OV-HA-AQ-S','mf-f02-front-7866b0cf3fed3922.png?v=1793146100',T('Oval charm · Textured','Ornement ovale · Martelé')]];
      const available=new Set(motif?.variants?.map(v=>v.sku)||motif?.recommendation_preview_skus||[]);
      const featured=choices.filter(([sku])=>available.has(sku)).map(([sku,file,title])=>{
        const src='https://cdn.shopify.com/s/files/1/1041/4112/8020/files/'+file;
        const shown={...motif,title,image:{...motif.image,src:src+'&width=720',thumb:src+'&width=480',full:src}};
        return card(shown,true).replaceAll(url(motif),url(motif)+'&sku='+encodeURIComponent(sku)).replace('data-quick-add="oval-motif"','data-quick-add="oval-motif" data-quick-add-sku="'+sku+'"');
      });
      if(featured.length)cards=featured;
    }
    if(!cards.length)return '';return `<section class="sc-recommendations sc-recommendations-inline"><h2>${T('Complete the look','Complétez votre composition')}</h2><div class="sc-recommendation-rail">${cards.join('')}</div></section>`;
  }
  function alsoLike(p){
    const complete=new Set(p.recommendations);const others=products.filter(x=>x.key!==p.key&&!complete.has(x.key));
    others.sort((a,b)=>Number(b.category===p.category)-Number(a.category===p.category)||Number(b.role===p.role)-Number(a.role===p.role));
    return `<section class="sc-also-like" aria-labelledby="sc-also-like-title"><h2 id="sc-also-like-title">${T('You may also like','Vous aimerez aussi')}</h2><div class="sc-discovery-controls"><span data-discovery-count aria-live="polite">1 / 4</span><button type="button" data-discovery-step="-1" aria-label="${T('Previous suggestion','Suggestion précédente')}">←</button><button type="button" data-discovery-step="1" aria-label="${T('Next suggestion','Suggestion suivante')}">→</button></div><div class="sc-also-like-grid" data-discovery-track tabindex="0" aria-label="${T('Product suggestions. Use the arrow keys to browse.','Suggestions de produits. Utilisez les flèches pour parcourir.')}">${others.slice(0,4).map(x=>`<article class="sc-card"><div class="sc-card-image"><a href="${url(x)}">${image(x)}</a></div><h3><a href="${url(x)}">${e(text(x.title))}</a></h3><p>${e(roleNames[x.role]||'SUIJI')}</p><p class="sc-card-price">${money(x.demo_price_cents)}</p></article>`).join('')}</div></section>`;
  }
  function bindDiscoveryRail(){
    const track=root.querySelector('[data-discovery-track]');if(!track)return;const cards=[...track.children],buttons=[...root.querySelectorAll('[data-discovery-step]')];let active=0,tick=false;
    const update=()=>{const left=track.getBoundingClientRect().left;active=cards.reduce((best,n,i)=>Math.abs(n.getBoundingClientRect().left-left)<Math.abs(cards[best].getBoundingClientRect().left-left)?i:best,0);root.querySelector('[data-discovery-count]').textContent=(active+1)+' / '+cards.length;buttons.forEach(b=>b.disabled=Number(b.dataset.discoveryStep)<0?active===0:active===cards.length-1);};
    const go=index=>{const card=cards[Math.max(0,Math.min(cards.length-1,index))];track.scrollTo({left:track.scrollLeft+card.getBoundingClientRect().left-track.getBoundingClientRect().left,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});};
    buttons.forEach(b=>b.addEventListener('click',()=>go(active+Number(b.dataset.discoveryStep))));track.addEventListener('keydown',event=>{if(!matchMedia('(max-width:599px)').matches)return;if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();go(event.key==='Home'?0:event.key==='End'?cards.length-1:active+(event.key==='ArrowLeft'?-1:1));}});track.addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;update();});},{passive:true});update();
  }
  function finishLabel(v){return text(v.label);}
  function currentVariant(){return selected.variants.find(v=>v.values.every((x,i)=>x===selection[i]));}
  function openDialog(dialog,opener){dialog._opener=opener;dialog.showModal();document.documentElement.classList.add('sc-dialog-open');}
  function bindDialogs(){root.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelectorAll('[data-dialog-close]').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.documentElement.classList.remove('sc-dialog-open');dialog._opener?.focus();});dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();});});}
  const pdpState={media:[],active:0,zoom:1,drawerProduct:null};
  const clampQuantity=value=>Math.max(1,Math.min(99,Number.parseInt(value,10)||1));
  function productMedia(p){
    const base={type:'image',src:p.image.src,full:p.image.full||p.image.src,width:p.image.width,height:p.image.height,alt:text(p.title)};
    if(p.key==='oval-motif')return [
      {...base,src:'https://cdn.shopify.com/s/files/1/1041/4112/8020/files/mf-f01-front-f337b8015d3d1e41.png?v=1793146105&width=1000',full:'https://cdn.shopify.com/s/files/1/1041/4112/8020/files/mf-f01-front-f337b8015d3d1e41.png?v=1793146105',alt:T('Smooth oval charm — illustrative front view','Ornement ovale lisse — vue de face illustrative')},
      {...base,src:'https://cdn.shopify.com/s/files/1/1041/4112/8020/files/mf-f02-front-7866b0cf3fed3922.png?v=1793146100&width=1000',full:'https://cdn.shopify.com/s/files/1/1041/4112/8020/files/mf-f02-front-7866b0cf3fed3922.png?v=1793146100',alt:T('Textured oval charm — illustrative front view','Ornement ovale martelé — vue de face illustrative')}
    ];
    const extra=Array.isArray(p.media)?p.media.filter(m=>m&&/^https:\/\/(?:cdn\.shopify\.com|suijijewelry\.com)\//.test(m.src||'')&&['image','video'].includes(m.type)):[];
    return [base,...extra.filter(m=>m.src!==base.src)].slice(0,10);
  }
  function galleryMarkup(p){
    return `<section class="sc-gallery sc-pdp-gallery" aria-label="${T('Product gallery','Galerie du produit')}"><div class="sc-gallery-track" data-gallery-track tabindex="0" aria-label="${T('Product images. Use the arrow keys to browse.','Images du produit. Utilisez les flèches pour parcourir.')}">${pdpState.media.map((m,i)=>`<div class="sc-media-frame" data-media-frame="${i}">${m.type==='video'?`<video controls playsinline preload="none" ${m.poster?`poster="${e(m.poster)}"`:''} aria-label="${e(m.alt||text(p.title))}"><source src="${e(m.src)}"></video>`:`<button type="button" class="sc-gallery-image" data-image-open="${i}" aria-label="${e(T('Enlarge image ','Agrandir l’image ')+(i+1))}"><img src="${e(m.src)}" width="${m.width||1000}" height="${m.height||1000}" alt="${e(m.alt||text(p.title))}" loading="${i===0?'eager':'lazy'}" decoding="async" ${i===0?'fetchpriority="high"':''}><span aria-hidden="true">+</span></button>`}</div>`).join('')}</div><div class="sc-gallery-navigation" ${pdpState.media.length===1?'hidden':''}><button type="button" data-gallery-prev aria-label="${T('Previous image','Image précédente')}">←</button><div class="sc-gallery-dots">${pdpState.media.map((_,i)=>`<button type="button" data-media-go="${i}" aria-label="${e(T('View image ','Voir l’image ')+(i+1))}" aria-pressed="${i===0}"><span aria-hidden="true"></span></button>`).join('')}</div><button type="button" data-gallery-next aria-label="${T('Next image','Image suivante')}">→</button></div><p class="sc-caption"><span data-gallery-count>1 / ${pdpState.media.length}</span> · ${T('Illustrative product visuals','Visuels produits illustratifs')}</p></section>`;
  }
  function setGallery(index,scroll=false){
    pdpState.active=Math.max(0,Math.min(pdpState.media.length-1,index));
    root.querySelectorAll('[data-media-go]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.mediaGo)===pdpState.active)));
    root.querySelectorAll('[data-gallery-count]').forEach(n=>n.textContent=(pdpState.active+1)+' / '+pdpState.media.length);
    const previous=root.querySelector('[data-gallery-prev]'),next=root.querySelector('[data-gallery-next]');if(previous)previous.disabled=pdpState.active===0;if(next)next.disabled=pdpState.active===pdpState.media.length-1;
    const track=root.querySelector('[data-gallery-track]'),frame=root.querySelector(`[data-media-frame="${pdpState.active}"]`);
    if(track&&frame&&matchMedia('(max-width:989px)').matches)track.scrollTo({left:frame.offsetLeft-track.offsetLeft,behavior:scroll&&!matchMedia('(prefers-reduced-motion:reduce)').matches?'smooth':'auto'});if(frame&&scroll&&!matchMedia('(max-width:989px)').matches)frame.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
    const dialog=root.querySelector('[data-image-dialog]');
    if(dialog?.open){const m=pdpState.media[pdpState.active];pdpState.zoom=1;dialog.querySelector('[data-media-canvas]').classList.remove('is-zoomed');dialog.querySelector('[data-media-canvas]').innerHTML=m.type==='video'?`<video controls playsinline preload="none" src="${e(m.src)}"></video>`:`<img src="${e(m.full||m.src)}" alt="${e(m.alt||text(selected.title))}">`;dialog.querySelector('[data-media-modal-count]').textContent=(pdpState.active+1)+' / '+pdpState.media.length;dialog.querySelector('[data-media-modal-prev]').disabled=pdpState.active===0;dialog.querySelector('[data-media-modal-next]').disabled=pdpState.active===pdpState.media.length-1;dialog.querySelector('[data-media-zoom]').disabled=m.type==='video';dialog.querySelector('[data-media-zoom]').setAttribute('aria-pressed','false');}
  }
  function options(p){return p.options.map((o,index)=>{
    if(o.key==='ring_size')return `<fieldset class="sc-option" data-option="${index}"><legend><span>${e(text(o.name))}</span><strong data-option-label="${index}"></strong><button type="button" class="sc-text-button" data-size-open>${T('Ring size guide','Guide des tailles')}</button></legend><select class="sc-size-select" data-ring-size="${index}" aria-label="${T('Ring size — inner circumference in millimetres','Taille de bague — tour intérieur en millimètres')}">${Array.from({length:25},(_,n)=>String(41+n)).map(value=>{const available=o.values.some(v=>v.value===value);return `<option value="${value}" ${selection[index]===value?'selected':''} ${available?'':'disabled'}>${value} mm${available?'':' — '+T('Unavailable','Indisponible')}</option>`;}).join('')}</select><p class="sc-option-hint">${T('54 and 57 mm can be selected. Other sizes are currently unavailable.','Les tailles 54 et 57 mm sont proposées. Les autres tailles sont indisponibles pour le moment.')}</p></fieldset>`;
    return `<fieldset class="sc-option" data-option="${index}"><legend><span>${e(text(o.name))}</span><strong data-option-label="${index}"></strong></legend><div class="sc-option-values">${o.values.map(v=>`<label class="sc-choice${v.swatch?' sc-swatch':''}"><input type="radio" name="sc-option-${index}" value="${e(v.value)}" ${selection[index]===v.value?'checked':''}><span ${v.swatch?`style="--swatch:${v.swatch};--secondary:${v.secondary||v.swatch}"`:''}>${v.swatch?'':e(finishLabel(v))}</span><span class="${v.swatch?'sc-visually-hidden':'sc-option-name'}">${v.swatch?e(finishLabel(v)):''}</span></label>`).join('')}</div></fieldset>`;
  }).join('');}
  function updateSelection(){
    const v=currentVariant();selected.options.forEach((o,i)=>{const label=root.querySelector(`[data-option-label="${i}"]`),choice=o.values.find(x=>x.value===selection[i]);if(label)label.textContent=choice?finishLabel(choice)+(o.key==='ring_size'?' mm':''):'';});
    const sku=root.querySelector('[data-current-sku]');if(sku)sku.textContent=v?.sku||T('Unavailable combination','Combinaison indisponible');
    root.querySelectorAll('[data-main-add]').forEach(b=>b.disabled=!v);
    const sr=root.querySelector('[data-selected-stone-row]');if(sr){sr.hidden=!v?.stone;if(v?.stone){const a=sr.querySelector('a');a.textContent=text(v.stone.name)+' · '+text(v.stone.colour);a.href=allUrl+'?stone='+encodeURIComponent(v.stone.type);}}
    const u=new URL(location.href);if(v){u.searchParams.set('sku',v.sku);history.replaceState(null,'',u);document.dispatchEvent(new CustomEvent('suiji:route-change'));}
    root.querySelectorAll('.sc-choice input').forEach(input=>input.closest('label').classList.toggle('selected',input.checked));
    if(selected.key==='oval-motif')setGallery(selection[0]==='Hammered'?1:0,false);
  }
  function productPanels(p){return `<section class="sc-pdp-story" data-pdp-story><div class="sc-product-tabs" role="tablist" aria-label="${T('Product information','Informations produit')}">${[['description',T('Description','Description')],['notes',T('Our notes','Nos notes')],['shipping',T('Shipping info','Livraison')]].map(([id,label],i)=>`<button role="tab" type="button" data-tab="${id}" id="sc-tab-${id}" aria-selected="${i===0}" aria-controls="sc-panel-${id}" tabindex="${i===0?0:-1}">${label}</button>`).join('')}</div>
    <div id="sc-panel-description" role="tabpanel" aria-labelledby="sc-tab-description" data-panel="description"><div id="sc-copy-description" class="sc-readable-copy" data-readable-copy><p>${e(text(p.description))}</p>${productHelp(p)}${p.bom.length?`<ul>${p.bom.map(x=>`<li>${e(text(x))}</li>`).join('')}</ul>`:''}${p.stone==='moissanite'?`<p>${T('Stone: moissanite.','Pierre : moissanite.')}</p>`:''}<p>${p.metal?T('Metalwork: TC4 titanium alloy.','Parties métalliques : alliage de titane TC4.'):e(text(p.other_material))}</p></div><button type="button" class="sc-read-toggle" data-read-more aria-controls="sc-copy-description" aria-expanded="false">${T('Read more','Lire la suite')}</button></div>
    <div hidden id="sc-panel-notes" role="tabpanel" aria-labelledby="sc-tab-notes" data-panel="notes"><div id="sc-copy-notes" class="sc-readable-copy" data-readable-copy><p>${e(text(p.notes))}</p><p><a href="${prefix}/pages/the-mechanism">${T('Discover the SUIJI system','Découvrir le système SUIJI')} →</a></p><p><a href="${prefix}/pages/care-guide">${T('Care and storage guide','Conseils d’entretien et de rangement')} →</a></p></div><button type="button" class="sc-read-toggle" data-read-more aria-controls="sc-copy-notes" aria-expanded="false">${T('Read more','Lire la suite')}</button></div>
    <div hidden id="sc-panel-shipping" role="tabpanel" aria-labelledby="sc-tab-shipping" data-panel="shipping"><div id="sc-copy-shipping" class="sc-readable-copy" data-readable-copy>${p.role==='ring_base'||p.key==='oval-motif'?`<p>${T('Pre-order information: expected dispatch within 3 months of purchase.','Informations de précommande : expédition prévue dans les 3 mois suivant l’achat.')}</p>`:''}<p>${T('This is a shopping demonstration. No real order is sent and no payment is taken.','Il s’agit d’une démonstration du parcours d’achat. Aucune véritable commande n’est envoyée et aucun paiement n’est prélevé.')}</p><p><a href="${prefix}/pages/shipping-returns">${T('Read our shipping and returns information','Consultez les informations de livraison et de retours')} →</a></p><p>${T('For delivery or return questions about a piece, contact SUIJI before ordering.','Pour toute question de livraison ou de retour concernant une pièce, contactez SUIJI avant de commander.')}</p></div><button type="button" class="sc-read-toggle" data-read-more aria-controls="sc-copy-shipping" aria-expanded="false">${T('Read more','Lire la suite')}</button></div>
    <a class="sc-styling-callout" href="${prefix}/pages/contact"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="16" cy="12" r="5"/><path d="M5 32v-4c0-9 22-9 22 0v4M28 8a4 4 0 1 1 0 8M31 22c5 0 6 4 6 8"/></svg><span><strong>${T('Styling assistance?','Besoin d’un conseil ?')}</strong><small>${T('Ask us about a piece, size or composition.','Parlons d’une pièce, d’une taille ou d’une composition.')}</small></span><span aria-hidden="true">→</span></a></section>`;}
  function shopLookMarkup(p){const companions=p.recommendations.filter(k=>byKey[k]).slice(0,2);return `<section class="sc-shop-look"><button type="button" data-shop-look aria-haspopup="dialog"><span class="sc-shop-look-images">${image(p,true)}${companions.map(k=>image(byKey[k],true)).join('')}</span><span>${T('Click to explore the look','Découvrez la composition')} <span aria-hidden="true">→</span></span></button><p class="sc-caption">${T('Illustrative styling suggestions. Check each piece’s details.','Suggestions de composition illustratives. Consultez les détails de chaque pièce.')}</p></section>`;}
  function productPage(p){
    selected=p;quantity=1;const requested=p.variants.find(v=>v.sku===params.get('sku'))||p.variants[0];selection=[...requested.values];pdpState.media=productMedia(p);pdpState.active=0;
    document.title=text(p.title)+' – SUIJI';root.classList.add('sc-pdp');root.dataset.pdpPage='true';
    const guide=root.querySelector('[data-commerce-guide]')?.innerHTML||'';
    root.innerHTML=`<div class="sc-product-grid sc-pdp-layout">
      <header class="sc-pdp-heading" data-pdp-heading><nav class="sc-breadcrumb" aria-label="${T('Breadcrumb','Fil d’Ariane')}"><a href="${prefix||'/'}">${T('Home','Accueil')}</a><span aria-hidden="true">·</span><a href="${prefix}/collections/${p.category}">${e(categories[p.category])}</a><span aria-hidden="true">·</span><span>${e(text(p.title))}</span></nav><h1>${e(text(p.title))}</h1><div class="sc-pdp-price-row"><div><p class="sc-price">${money(p.demo_price_cents)}</p><p class="sc-demo-price">${T('Demonstration price','Prix de démonstration')}</p></div><button type="button" class="sc-heart" data-favourite aria-label="${T('Save this piece','Enregistrer cette pièce')}" aria-pressed="${bag.read().favourites.includes(p.key)}">${bag.read().favourites.includes(p.key)?'♥':'♡'}</button></div></header>
      ${galleryMarkup(p)}
      <section class="sc-product-info sc-pdp-purchase" data-pdp-purchase><p class="sc-preorder-copy">${p.role==='ring_base'||p.key==='oval-motif'?T('Pre-order — expected dispatch within 3 months of purchase.','Précommande — expédition prévue dans les 3 mois suivant l’achat.'):e(text(p.description))}</p><div class="sc-badges">${badges(p)}</div>${p.sale_unit==='pair'?`<div class="sc-material"><span>${T('Order as','Vendu par')}</span><strong>${T('Pair','Paire')}</strong></div>`:''}<div class="sc-material"><span>${T('Material','Matière')}</span><strong>${p.metal?T('Titanium · TC4','Titane · TC4'):e(text(p.other_material))}</strong></div>${p.fixed_finish?`<div class="sc-material"><span>${T('Finish','Finition')}</span><strong>${e(text(p.fixed_finish))}</strong></div>`:''}${root.dataset.catalogueVersion==='2'?componentSummary(p):''}<div class="sc-material" data-selected-stone-row hidden><span>${T('Gemstone','Pierre')}</span><a data-selected-stone></a></div>${options(p)}<div class="sc-pdp-quantity"><label><span>${T('Quantity','Quantité')}</span><select data-quantity-select aria-label="${T('Quantity','Quantité')}">${Array.from({length:9},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join('')}<option value="custom">10+</option></select></label><div class="sc-quantity-stepper" data-custom-quantity hidden><button type="button" data-product-step="-1" aria-label="${T('Decrease quantity','Réduire la quantité')}">−</button><input type="number" data-product-quantity value="1" min="1" max="99" aria-label="${T('Custom quantity','Quantité personnalisée')}"><button type="button" data-product-step="1" aria-label="${T('Increase quantity','Augmenter la quantité')}">+</button></div></div><button type="button" class="sc-primary" data-main-add>${T('ADD TO BAG','AJOUTER AU PANIER')}</button><p class="sc-reference">${T('Reference','Référence')} · <span data-current-sku></span></p><p class="sc-live-status" role="status" aria-live="polite" data-commerce-status></p>${recommendations(p)}</section>
      ${shopLookMarkup(p)}${productPanels(p)}</div>${alsoLike(p)}
      <dialog class="sc-dialog sc-media-dialog" data-image-dialog aria-label="${T('Product image gallery','Galerie du produit')}"><div class="sc-dialog-head"><span data-media-modal-count></span><button type="button" data-dialog-close class="sc-close" aria-label="${T('Close','Fermer')}">×</button></div><div class="sc-media-canvas" data-media-canvas></div><div class="sc-media-toolbar"><button type="button" data-media-modal-prev aria-label="${T('Previous image','Image précédente')}">←</button><button type="button" data-media-zoom aria-pressed="false">${T('Zoom','Agrandir')}</button><button type="button" data-media-modal-next aria-label="${T('Next image','Image suivante')}">→</button></div></dialog>
      <dialog class="sc-dialog sc-size-dialog" data-size-dialog aria-label="${T('Ring size guide','Guide des tailles')}"><div class="sc-dialog-head"><h2>${T('Ring size guide','Guide des tailles')}</h2><button type="button" data-dialog-close class="sc-close" aria-label="${T('Close','Fermer')}">×</button></div>${guide}</dialog>
      <dialog class="sc-dialog sc-look-dialog" data-look-dialog aria-label="${T('Explore the look','Explorer la composition')}"><div class="sc-dialog-head"><h2>${T('Make this look yours','Composez à votre façon')}</h2><button type="button" data-dialog-close class="sc-close" aria-label="${T('Close','Fermer')}">×</button></div><div class="sc-look-current">${card(p)}</div>${recommendations(p)}<p class="sc-caption">${T('Each piece is separate. Check the individual product details and compatibility.','Chaque pièce est distincte. Consultez les détails et la compatibilité de chaque produit.')}</p><a href="${prefix}/collections/sets">${T('Explore sets','Découvrir les ensembles')} →</a></dialog>`;
    root.querySelectorAll('[data-option] input').forEach(input=>input.addEventListener('change',()=>{selection[Number(input.closest('[data-option]').dataset.option)]=input.value;updateSelection();}));
    root.querySelectorAll('[data-ring-size]').forEach(input=>input.addEventListener('change',()=>{selection[Number(input.dataset.ringSize)]=input.value;updateSelection();}));
    const setQuantity=value=>{quantity=clampQuantity(value);root.querySelector('[data-product-quantity]').value=quantity;root.querySelector('[data-quantity-select]').value=quantity<=9?String(quantity):'custom';root.querySelector('[data-custom-quantity]').hidden=quantity<=9;};
    root.querySelector('[data-quantity-select]').addEventListener('change',event=>setQuantity(event.target.value==='custom'?10:event.target.value));root.querySelector('[data-product-quantity]').addEventListener('change',event=>setQuantity(event.target.value));root.querySelectorAll('[data-product-step]').forEach(b=>b.addEventListener('click',()=>setQuantity(quantity+Number(b.dataset.productStep))));
    root.querySelector('[data-main-add]').addEventListener('click',()=>{const v=currentVariant();if(!v)return;try{bag.add(p,v,quantity);announce(T('Added to your bag.','Ajouté à votre panier.'));showAdded(p,v);}catch{announce(T('Your browser could not save the bag.','Votre navigateur n’a pas pu enregistrer le panier.'));}});
    root.querySelector('[data-favourite]').addEventListener('click',event=>{try{const saved=bag.favourite(p.key);event.currentTarget.setAttribute('aria-pressed',String(saved));event.currentTarget.textContent=saved?'♥':'♡';announce(saved?T('Piece saved.','Pièce enregistrée.'):T('Piece removed from saved items.','Pièce retirée des favoris.'));}catch{announce(T('Unable to save.','Enregistrement impossible.'));}});
    bindDialogs();const mediaDialog=root.querySelector('[data-image-dialog]');root.querySelectorAll('[data-image-open]').forEach(b=>b.addEventListener('click',()=>{openDialog(mediaDialog,b);setGallery(Number(b.dataset.imageOpen));}));
    root.querySelectorAll('[data-media-go]').forEach(b=>b.addEventListener('click',()=>setGallery(Number(b.dataset.mediaGo),true)));root.querySelector('[data-gallery-prev]').addEventListener('click',()=>setGallery(pdpState.active-1,true));root.querySelector('[data-gallery-next]').addEventListener('click',()=>setGallery(pdpState.active+1,true));
    root.querySelector('[data-media-modal-prev]').addEventListener('click',()=>setGallery(pdpState.active-1));root.querySelector('[data-media-modal-next]').addEventListener('click',()=>setGallery(pdpState.active+1));root.querySelector('[data-media-zoom]').addEventListener('click',event=>{pdpState.zoom=pdpState.zoom===1?1.75:1;mediaDialog.querySelector('[data-media-canvas]').classList.toggle('is-zoomed',pdpState.zoom>1);event.currentTarget.setAttribute('aria-pressed',String(pdpState.zoom>1));});
    mediaDialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();setGallery(pdpState.active-1);}if(event.key==='ArrowRight'){event.preventDefault();setGallery(pdpState.active+1);}});mediaDialog.addEventListener('close',()=>{mediaDialog.querySelector('video')?.pause();mediaDialog.querySelector('[data-media-canvas]').classList.remove('is-zoomed');});
    const track=root.querySelector('[data-gallery-track]');track.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();setGallery(event.key==='Home'?0:event.key==='End'?pdpState.media.length-1:pdpState.active+(event.key==='ArrowLeft'?-1:1),true);}});let galleryTick=false;track.addEventListener('scroll',()=>{if(!matchMedia('(max-width:989px)').matches||galleryTick)return;galleryTick=true;requestAnimationFrame(()=>{galleryTick=false;const frames=[...root.querySelectorAll('[data-media-frame]')];const index=frames.reduce((best,n,i)=>Math.abs(n.offsetLeft-track.offsetLeft-track.scrollLeft)<Math.abs(frames[best].offsetLeft-track.offsetLeft-track.scrollLeft)?i:best,0);pdpState.active=index;root.querySelector('[data-gallery-prev]').disabled=index===0;root.querySelector('[data-gallery-next]').disabled=index===pdpState.media.length-1;root.querySelectorAll('[data-media-go]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.mediaGo)===index)));root.querySelector('[data-gallery-count]').textContent=(index+1)+' / '+pdpState.media.length;});},{passive:true});
    root.querySelector('[data-size-open]')?.addEventListener('click',event=>openDialog(root.querySelector('[data-size-dialog]'),event.currentTarget));root.querySelector('[data-shop-look]').addEventListener('click',event=>openDialog(root.querySelector('[data-look-dialog]'),event.currentTarget));
    const tabs=[...root.querySelectorAll('[data-tab]')];const sizeReadmore=()=>{const panel=root.querySelector('[data-panel]:not([hidden])');const copy=panel?.querySelector('[data-readable-copy]'),button=panel?.querySelector('[data-read-more]');if(copy&&button&&!copy.classList.contains('is-expanded'))button.hidden=copy.scrollHeight<=copy.clientHeight+2;};
    function tab(index){tabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});root.querySelectorAll('[data-panel]').forEach(panel=>panel.hidden=panel.dataset.panel!==tabs[index].dataset.tab);requestAnimationFrame(sizeReadmore);}
    tabs.forEach((b,i)=>{b.addEventListener('click',()=>tab(i));b.addEventListener('keydown',event=>{let n;if(event.key==='ArrowRight')n=(i+1)%tabs.length;if(event.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(event.key==='Home')n=0;if(event.key==='End')n=tabs.length-1;if(n!==undefined){event.preventDefault();tab(n);tabs[n].focus();}});});root.querySelectorAll('[data-read-more]').forEach(b=>b.addEventListener('click',()=>{const copy=root.querySelector('#'+b.getAttribute('aria-controls'));const expanded=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(expanded));copy.classList.toggle('is-expanded',expanded);b.textContent=expanded?T('Read less','Réduire'):T('Read more','Lire la suite');}));
    updateSelection();setGallery(pdpState.active);bindQuickAdds();bindDiscoveryRail();requestAnimationFrame(sizeReadmore);document.fonts?.ready.then(sizeReadmore);
  }
  function renderBagDrawer(){
    const dialog=document.querySelector('[data-sc-added]');if(!dialog?.open)return;
    const focused=document.activeElement,focusLine=focused?.closest('[data-drawer-line]')?.dataset.drawerLine,focusKind=focused?.hasAttribute('data-drawer-quantity')?'[data-drawer-quantity]':focused?.hasAttribute('data-drawer-step')?'[data-drawer-step="'+focused.dataset.drawerStep+'"]':focused?.hasAttribute('data-drawer-remove')?'[data-drawer-remove]':null;
    const rows=bagRows(),total=rows.reduce((n,x)=>n+x.price*x.quantity,0),p=pdpState.drawerProduct;
    dialog.innerHTML=`<div class="sc-dialog-head"><h2>${T('Your Bag','Votre panier')} <span aria-live="polite">(${bag.count()})</span></h2><button type="button" class="sc-close" data-drawer-close aria-label="${T('Close shopping bag','Fermer le panier')}">×</button></div><div class="sc-drawer-body">${rows.length?rows.map(line=>`<article class="sc-drawer-line" data-drawer-line="${e(line.id)}" data-legacy="${line.legacy?'true':'false'}">${line.p?`<a href="${lineUrl(line)}" class="sc-drawer-image">${lineImage(line)}</a>`:''}<div><h3>${e(line.p?text(line.p.title):line.sku)}</h3><p>${e(optionText(line))}</p><p class="sc-reference">${e(line.sku)}</p><strong>${money(line.price*line.quantity)}</strong><div class="sc-drawer-quantity"><button type="button" data-drawer-step="-1" aria-label="${T('Decrease quantity','Réduire la quantité')}">−</button><input type="number" min="1" max="${line.legacy?9:99}" value="${line.quantity}" data-drawer-quantity aria-label="${e(T('Quantity for ','Quantité pour ')+(line.p?text(line.p.title):line.sku))}"><button type="button" data-drawer-step="1" aria-label="${T('Increase quantity','Augmenter la quantité')}">+</button></div><button type="button" class="sc-text-button" data-drawer-remove>${T('Remove','Retirer')}</button></div></article>`).join(''):`<p>${T('Your bag is empty.','Votre panier est vide.')}</p>`}${p?recommendations(p):''}<details class="sc-cart-note"><summary>${T('Is this a gift?','Est-ce un cadeau ?')}</summary><label>${T('Gift message — saved only in this browser session, not sent','Message cadeau — conservé uniquement dans cette session, sans envoi')}<textarea maxlength="300" rows="3" data-drawer-note>${e(bag.read().giftNote||'')}</textarea></label></details><p class="sc-live-status" role="status" data-drawer-status></p></div><footer class="sc-drawer-footer"><div><span>${T('Subtotal','Sous-total')}</span><strong>${money(total)}</strong></div><a class="sc-primary" href="${allUrl}?view=suiji-product&product=checkout" ${rows.length?'':'hidden'}>${T('DEMO CHECKOUT','COMMANDER EN DÉMO')}</a><a class="sc-secondary" href="${prefix}/cart">${T('VIEW BAG','VOIR LE PANIER')}</a><button type="button" class="sc-drawer-continue" data-drawer-close>${T('Continue shopping','Continuer mes achats')}</button><p>${T('Demonstration prices. No real order or payment.','Prix de démonstration. Aucune véritable commande ni paiement.')}</p></footer>`;
    dialog.querySelectorAll('[data-drawer-close]').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.querySelectorAll('[data-drawer-step]').forEach(b=>b.addEventListener('click',()=>{const line=b.closest('[data-drawer-line]'),input=line.querySelector('input');bag.quantity(line.dataset.drawerLine,clampQuantity(Number(input.value)+Number(b.dataset.drawerStep)),line.dataset.legacy==='true');}));dialog.querySelectorAll('[data-drawer-quantity]').forEach(input=>input.addEventListener('change',()=>{const line=input.closest('[data-drawer-line]');bag.quantity(line.dataset.drawerLine,input.value,line.dataset.legacy==='true');}));dialog.querySelectorAll('[data-drawer-remove]').forEach(b=>b.addEventListener('click',()=>{const line=b.closest('[data-drawer-line]');bag.remove(line.dataset.drawerLine,line.dataset.legacy==='true');}));dialog.querySelector('[data-drawer-note]').addEventListener('input',event=>bag.note(event.target.value));bindQuickAdds(dialog);if(focusLine&&focusKind){const target=dialog.querySelector('[data-drawer-line="'+CSS.escape(focusLine)+'"] '+focusKind);(target||dialog.querySelector('[data-drawer-close]')).focus();}
  }
  async function showAdded(p,v){
    await loadBagProducts();
    let dialog=document.querySelector('[data-sc-added]');pdpState.drawerProduct=p;
    if(!dialog){dialog=document.createElement('dialog');dialog.className='sc-added-dialog sc-full-bag-drawer';dialog.dataset.scAdded='';dialog.setAttribute('aria-label',T('Shopping bag','Panier'));document.body.append(dialog);dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.documentElement.classList.remove('sc-dialog-open');root.querySelector('[data-main-add]')?.focus();dialog.remove();});dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right)dialog.close();});openDialog(dialog,root.querySelector('[data-main-add]'));}
    renderBagDrawer();
  }

  const landingArt="<svg class=\"sc-landing-art\" viewBox=\"0 0 430 600\" aria-hidden=\"true\" focusable=\"false\" fill=\"none\"><g stroke=\"currentColor\" stroke-width=\"2\"><ellipse cx=\"330\" cy=\"120\" rx=\"68\" ry=\"91\" transform=\"rotate(32 330 120)\"/><ellipse cx=\"330\" cy=\"120\" rx=\"47\" ry=\"68\" transform=\"rotate(32 330 120)\"/><rect x=\"205\" y=\"250\" width=\"103\" height=\"175\" rx=\"51\" transform=\"rotate(-28 255 335)\"/><rect x=\"218\" y=\"263\" width=\"77\" height=\"149\" rx=\"38\" transform=\"rotate(-28 255 335)\"/><rect x=\"308\" y=\"392\" width=\"88\" height=\"147\" rx=\"44\" transform=\"rotate(-28 350 465)\"/><path d=\"M210 30l-25 45 25 45-25 45 25 45-25 45M35 510c12-80 110-80 122 0s-110 80-122 0Z\"/></g></svg>";
  function categoryLanding(category,anchor=''){
    const routes={
      all:[T('Jewelry, your way','Des bijoux à votre image'),T('Choose a base. Find a charm. Make a combination that feels like you.','Choisissez un support. Trouvez un ornement. Composez un bijou qui vous ressemble.'),[['r01-ring-base',T('Jewelry bases','Supports de bijoux'),'/pages/bases'],['oval-motif',T('Charms','Ornements'),'/collections/charms']]],
      bases:[T('Bases & Charms','Supports et ornements'),T('Start with the piece you love to wear. Add a compatible element and make it personal.','Partez d’une pièce que vous aimez porter. Ajoutez un élément compatible pour la personnaliser.'),[['r01-ring-base',T('Ring bases','Supports de bague'),'/collections/rings?role=ring_base'],['h01-hoops',T('Earring bases','Supports de boucle'),'/collections/earrings?role=earring_base']]],
      rings:[T('Rings, your way','Des bagues à votre image'),T('Sculptural titanium bases, interchangeable elements and your own sense of style.','Des supports sculpturaux en titane, des éléments interchangeables et votre propre style.'),[['r01-ring-base',T('Ring bases','Supports de bague'),'/collections/rings?role=ring_base'],['set03-ring-set',T('Ring set','Ensemble bague'),'/collections/sets?view=suiji-p-set03-ring-set']]],
      earrings:[T('Earrings in motion','Des boucles en mouvement'),T('From everyday hoops to personal compositions. Explore each piece and its compatible elements.','Des créoles du quotidien aux compositions personnelles. Découvrez chaque pièce et ses éléments compatibles.'),[['h01-hoops',T('Hoops','Créoles'),'/collections/earrings#hoop-earrings'],['core-lock-stud-base',T('Studs','Puces d’oreilles'),'/collections/earrings#stud-earrings']]],
      necklaces:[T('Core-Lock & Chains','Core-Lock et chaînes'),T('Choose your chain. Explore the connections. Find your own way to wear it.','Choisissez votre chaîne. Explorez les connexions. Trouvez votre façon de la porter.'),[['collar-7',T('With Core-Lock','Avec Core-Lock'),'/collections/necklaces?system=core-lock'],['cross-chain',T('Chain bases','Supports chaîne'),'/collections/necklaces?role=necklace_base']]],
      bracelets:[T('Around your wrist','À votre poignet'),T('Titanium bracelet bases and decorative elements, ready for your own combinations. Check each piece’s compatibility.','Des supports de bracelet en titane et des éléments décoratifs pour vos compositions. Vérifiez la compatibilité de chaque pièce.'),[['bracelet-b3',T('Bracelet bases','Supports de bracelet'),'/collections/bracelets?role=bracelet_base'],['oval-motif',T('Explore charms','Découvrir les ornements'),'/collections/charms']]],
      charms:[T('Small pieces. Your signature.','De petites pièces. Votre signature.'),T('Change an element, change the feeling. Explore shapes, finishes and the stones you chose.','Changez un élément, changez l’allure. Explorez les formes, les finitions et les pierres que vous avez choisies.'),[['oval-motif',T('Oval charms','Ornements ovales'),'/collections/charms?view=suiji-p-oval-motif'],['logo-square',T('Logo charms','Ornements Logo'),'/collections/charms?q=Logo']]],
      extras:[T('The finishing touches','La touche finale'),T('Connectors, bases and the little details that bring your composition together.','Des connecteurs, des supports et ces petits détails qui réunissent votre composition.'),[['core-lock-pendant-base',T('Core-Lock elements','Éléments Core-Lock'),'/collections/extras?system=core-lock'],['metal-ear-backs',T('Ear backs','Fermoirs d’oreille'),'/collections/extras?role=ear_back']]],
      sets:[T('More ways to make it yours','À vous de composer'),T('Start with a set. Discover the pieces inside, then find your own combinations.','Partez d’un ensemble. Découvrez les pièces qu’il réunit, puis trouvez vos propres compositions.'),[['set01-stud-earring-set',T('Earring sets','Ensembles d’oreilles'),'/collections/sets?view=suiji-p-set01-stud-earring-set'],['set03-ring-set',T('Ring set','Ensemble bague'),'/collections/sets?view=suiji-p-set03-ring-set']]]
    };
    const entry=routes[category]||routes.all;
    return `<header class="sc-landing" id="${e(anchor||'collection-top')}">${landingArt}<p class="sc-landing-eyebrow">SUIJI</p><h1>${e(entry[0])}</h1><p class="sc-landing-intro">${e(entry[1])}</p><nav class="sc-landing-links" aria-label="${e(T('Explore this collection','Explorer cette collection'))}">${entry[2].map(([key,label,href],index)=>`<a class="sc-landing-link" href="${e(prefix+href)}"><span>${image(byKey[key],true,index===0)}</span><strong>${e(label)}</strong></a>`).join('')}</nav></header>`;
  }
  function catalogueSearchWords(value){
    return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/œ/g,'oe').replace(/æ/g,'ae').match(/[a-z0-9]+/g)||[];
  }
  function catalogueMatchesSearch(product,query){
    const terms=catalogueSearchWords(query);
    if(!terms.length)return !String(query||'').trim();
    const words=catalogueSearchWords(JSON.stringify([product.title,product.code,product.role,product.description,product.metal,product.alloy,product.stone,product.stone_palette?.map(stone=>[stone.name,stone.type,stone.colour])]));
    return terms.every(term=>words.some(word=>word.startsWith(term)));
  }
  function listing(){
    const requestedCategory=root.dataset.category||'all';const category=categories[requestedCategory]||requestedCategory==='search'?requestedCategory:'all';const q=params.get('q')||'';const material=params.get('material')||'';const anchor=location.hash.slice(1);const subtype=p=>p.category==='earrings'?(['h01-hoops','h02-hoop','a02-drop','a03-drop'].includes(p.key)?'hoop-earrings':'stud-earrings'):p.category==='necklaces'?(p.key.startsWith('collar-')?'chokers':p.key==='chain-l04'?'beaded-necklaces':p.key==='cross-chain-core-lock'?'pendant-necklaces':'chains'):p.category==='bracelets'?'chain-beaded-bracelets':p.category==='extras'?(['connector','pendant_base'].includes(p.role)?'multi-use-connectors':'decorative-add-ons'):'';let role=params.get('role')||'',system=params.get('system')||'',stone=params.get('stone')||'';
    function draw(){let rows=products.filter(p=>(category==='all'||category==='search'||p.category===category||(category==='bases'&&p.role.endsWith('_base')))&&(!['hoop-earrings','stud-earrings','chains','chokers','beaded-necklaces','pendant-necklaces','chain-beaded-bracelets','bangles','multi-use-connectors','decorative-add-ons'].includes(anchor)||subtype(p)===anchor)&&(!material||p.metal===material)&&(!role||p.role===role)&&(!system||(system==='core-lock'?p.core_lock_included===true:p.core_lock_included===false))&&(!stone||p.stone===stone||p.stone_palette?.some(s=>s.type===stone))&&(!q||catalogueMatchesSearch(p,q)));const pages=Math.max(1,Math.ceil(rows.length/12));listPage=Math.min(pages,listPage);root.innerHTML=`${category==='search'?`<header class="sc-list-head"><p>SUIJI</p><h1>${T('Search','Recherche')}</h1><p>${e(q)}</p></header>`:categoryLanding(category,anchor)}<nav class="sc-category-nav" aria-label="${T('Categories','Catégories')}">${Object.entries(categories).filter(([k])=>k!=='bases').map(([k,label])=>`<a class="${k===category?'active':''}" href="${prefix}/collections/${k}">${e(label)}</a>`).join('')}</nav><div class="sc-filters"><button data-filter-role="" aria-pressed="${!role}">${T('All pieces','Toutes les pièces')}</button><button data-filter-role="charm" aria-pressed="${role==='charm'}">${T('Charms','Ornements')}</button><button data-filter-role="ring_base" aria-pressed="${role==='ring_base'}">${T('Ring bases','Supports de bague')}</button><button data-filter-role="earring_base" aria-pressed="${role==='earring_base'}">${T('Earring bases','Supports de boucle')}</button><button data-filter-system="core-lock" aria-pressed="${system==='core-lock'}">Core-Lock</button><button data-filter-system="without-core-lock" aria-pressed="${system==='without-core-lock'}">${T('Without Core-Lock','Sans Core-Lock')}</button><button data-filter-stone="moissanite" aria-pressed="${stone==='moissanite'}">Moissanite</button></div><p class="sc-result-count" aria-live="polite">${rows.length} ${T(rows.length===1?'piece':'pieces',rows.length===1?'pièce':'pièces')}</p><div class="sc-catalogue-grid">${rows.slice((listPage-1)*12,listPage*12).map((p,index)=>card(p,false,category==='search'&&index===0)).join('')}</div>${!rows.length?`<p>${T('No pieces match these filters.','Aucune pièce ne correspond à ces filtres.')}</p>`:''}<div class="sc-pagination"><button data-page="-1" ${listPage===1?'disabled':''}>← ${T('Previous','Précédent')}</button><span>${listPage} / ${pages}</span><button data-page="1" ${listPage===pages?'disabled':''}>${T('Next','Suivant')} →</button></div><p class="sc-caption">${T('Demonstration collection · Illustrative visuals · €99 demonstration price','Collection de démonstration · Visuels illustratifs · Prix de démonstration de 99 €')}</p>`;
      root.querySelectorAll('[data-filter-role]').forEach(b=>b.addEventListener('click',()=>{role=b.dataset.filterRole;listPage=1;sync();draw();}));root.querySelectorAll('[data-filter-system]').forEach(b=>b.addEventListener('click',()=>{system=system===b.dataset.filterSystem?'':b.dataset.filterSystem;listPage=1;sync();draw();}));root.querySelector('[data-filter-stone]').addEventListener('click',()=>{stone=stone==='moissanite'?'':'moissanite';listPage=1;sync();draw();});root.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>{listPage+=Number(b.dataset.page);draw();root.scrollIntoView({behavior:'auto',block:'start'});}));
    }
    function sync(){const u=new URL(location.href);for(const[k,v]of Object.entries({role,system,stone}))v?u.searchParams.set(k,v):u.searchParams.delete(k);history.replaceState(null,'',u);}
    draw();
  }
  function bagRows(){return [...bag.read().lines.map(line=>{const p=byKey[line.product],v=p?.variants.find(v=>v.sku===line.sku);return{...line,id:line.sku,p,v,price:p?.demo_price_cents||9900};}),...bag.legacy().map(line=>{const p=byKey[line.kind==='base'?'r01-ring-base':'oval-motif'];return{...line,p,price:9900,sku:line.id,legacy:true};})];}
  function lineUrl(line){return url(line.p)+(line.v?'&sku='+encodeURIComponent(line.v.sku):'');}
  function lineImage(line){if(line.p.key==='oval-motif'&&line.v){const media=productMedia(line.p)[line.v.values[0]==='Hammered'?1:0];return image({...line.p,image:{...line.p.image,thumb:media.src,src:media.src,full:media.full}},true);}return image(line.p,true);}
  function optionText(line){if(line.legacy){const finishes={gold:T('Champagne','Champagne'),silver:T('Natural titanium','Titane naturel'),blue:T('Blue','Bleu')};return [line.size,finishes[line.metal],line.stone].filter(Boolean).join(' · ');}if(!line.p||!line.v)return line.sku;return [...(line.p.sale_unit==='pair'?[T('Pair','Paire')]:[]),...line.p.options.map((o,i)=>finishLabel(o.values.find(v=>v.value===line.v.values[i]))+(o.key==='ring_size'?' mm':''))].join(' · ');}
  function cart(){const rows=bagRows(),total=rows.reduce((n,x)=>n+x.price*x.quantity,0);document.title=T('Your Bag','Votre panier')+' – SUIJI';root.innerHTML=`<header class="sc-bag-head"><h1>${T('Your Bag','Votre panier')} <small>(${bag.count()})</small></h1><a href="${allUrl}">${T('Continue shopping','Continuer mes achats')} →</a></header>${rows.length?`<div class="sc-cart-grid"><div class="sc-cart-lines">${rows.map(line=>`<article class="sc-cart-line" data-bag-line="${e(line.id)}" data-legacy="${line.legacy?'true':'false'}">${line.p?`<a class="sc-cart-image" href="${lineUrl(line)}">${lineImage(line)}</a>`:''}<div class="sc-cart-details"><h2>${e(line.p?text(line.p.title):line.sku)}</h2><p>${e(optionText(line))}</p><p class="sc-reference">${e(line.sku)}</p><div class="sc-cart-controls"><label>${T('Quantity','Quantité')}<input type="number" min="1" max="${line.legacy?9:99}" value="${line.quantity}" aria-label="${e(T('Quantity for ','Quantité pour ')+(line.p?text(line.p.title):line.sku))}" data-cart-quantity></label><button type="button" data-cart-remove>${T('Remove','Retirer')}</button></div></div><p class="sc-cart-line-price">${money(line.price*line.quantity)}</p></article>`).join('')}<details class="sc-cart-note"><summary>${T('Add a gift message','Ajouter un message cadeau')}</summary><label>${T('Your message (demo only, not sent)','Votre message (démonstration, non envoyé)')}<textarea maxlength="300" rows="3" data-cart-note>${e(bag.read().giftNote||'')}</textarea></label></details></div><aside class="sc-cart-summary"><h2>${T('Order summary','Récapitulatif')}</h2><div><span>${T('Subtotal','Sous-total')}</span><strong>${money(total)}</strong></div><p>${T('Demonstration prices. Delivery and taxes are not charged.','Prix de démonstration. Aucun frais de livraison ni taxe ne sera prélevé.')}</p><a class="sc-primary" href="${allUrl}?view=suiji-product&product=checkout">${T('CHECKOUT','COMMANDER')} →</a><p class="sc-demo-notice">${T('Demo checkout · No payment is taken','Commande de démonstration · Aucun paiement')}</p></aside></div>`:`<div class="sc-empty-bag"><p>${T('Your bag is waiting for something personal.','Votre panier attend une pièce qui vous ressemble.')}</p><a class="sc-primary" href="${allUrl}">${T('EXPLORE THE COLLECTION','DÉCOUVRIR LA COLLECTION')}</a></div>`}`;root.querySelector('[data-cart-note]')?.addEventListener('input',event=>bag.note(event.target.value));root.querySelectorAll('[data-cart-quantity]').forEach(input=>input.addEventListener('change',()=>{const row=input.closest('[data-bag-line]');bag.quantity(row.dataset.bagLine,input.value,row.dataset.legacy==='true');}));root.querySelectorAll('[data-cart-remove]').forEach(b=>b.addEventListener('click',()=>{const row=b.closest('[data-bag-line]');bag.remove(row.dataset.bagLine,row.dataset.legacy==='true');}));}
  function refreshCartValues(){
    const rows=bagRows();
    const elements=Array.from(root.querySelectorAll('.sc-cart-line'));
    if(!rows.length||rows.length!==elements.length||rows.some((line,index)=>line.id!==elements[index].dataset.bagLine||String(!!line.legacy)!==elements[index].dataset.legacy)){
      cart();
      return;
    }
    rows.forEach((line,index)=>{
      const element=elements[index];
      element.querySelector('[data-cart-quantity]').value=line.quantity;
      element.querySelector('.sc-cart-line-price').textContent=money(line.price*line.quantity);
    });
    root.querySelector('.sc-bag-head h1 small').textContent='('+rows.reduce((sum,line)=>sum+line.quantity,0)+')';
    root.querySelector('.sc-cart-summary strong').textContent=money(rows.reduce((sum,line)=>sum+line.price*line.quantity,0));
  }
  function checkout(){const rows=bagRows(),total=rows.reduce((n,x)=>n+x.price*x.quantity,0);if(!rows.length){cart();return;}document.title=T('Demo Checkout','Commande de démonstration')+' – SUIJI';root.innerHTML=`<div class="sc-checkout-head"><a href="${prefix}/cart">← ${T('Your bag','Votre panier')}</a><h1>${T('Checkout','Votre commande')}</h1><p class="sc-demo-notice">${T('Demonstration · No payment, account or real order is created.','Démonstration · Aucun paiement, compte ou véritable commande n’est créé.')}</p></div><div class="sc-cart-grid"><form class="sc-demo-checkout"><fieldset><legend>1. ${T('Contact','Contact')}</legend><label>${T('Email address','Adresse e-mail')}<input type="email" required autocomplete="off" placeholder="you@example.com" aria-describedby="sc-demo-contact-note"></label><p id="sc-demo-contact-note">${T('Use example details to explore. Details stay on this screen and are never sent or saved.','Utilisez des coordonnées fictives. Elles restent sur cet écran, sans envoi ni enregistrement.')}</p></fieldset><fieldset><legend>2. ${T('Delivery','Livraison')}</legend><div class="sc-form-row"><label>${T('First name','Prénom')}<input required autocomplete="off"></label><label>${T('Last name','Nom')}<input required autocomplete="off"></label></div><label>${T('Address','Adresse')}<input required autocomplete="off"></label><div class="sc-form-row"><label>${T('City','Ville')}<input required autocomplete="off"></label><label>${T('Postal code','Code postal')}<input required autocomplete="off"></label></div><label>${T('Country / region','Pays / région')}<select><option>France</option><option>${T('United Kingdom','Royaume-Uni')}</option><option>${T('United States','États-Unis')}</option><option>Canada</option><option>${T('Germany','Allemagne')}</option><option>${T('Other','Autre')}</option></select></label></fieldset><fieldset><legend>3. ${T('Payment','Paiement')}</legend><p>${T('Demo payment · No card details required.','Paiement de démonstration · Aucune carte bancaire requise.')}</p></fieldset><button class="sc-primary" type="submit">${T('COMPLETE DEMO ORDER','TERMINER LA COMMANDE DÉMO')}</button></form><aside class="sc-cart-summary"><h2>${T('Your selection','Votre sélection')}</h2>${rows.map(line=>`<div><span>${e(line.p?text(line.p.title):line.sku)} × ${line.quantity}</span><strong>${money(line.price*line.quantity)}</strong></div>`).join('')}<div class="sc-order-total"><span>Total</span><strong>${money(total)}</strong></div><p>${T('Demonstration total. Nothing will be charged.','Total de démonstration. Aucun montant ne sera prélevé.')}</p></aside></div>`;root.querySelector('form').addEventListener('submit',event=>{event.preventDefault();if(!event.currentTarget.reportValidity())return;try{const record={reference:'DEMO-'+Date.now().toString(36).toUpperCase(),total,items:rows.map(x=>({sku:x.sku,quantity:x.quantity,title:x.p?x.p.title:{en:x.sku,fr:x.sku}}))};sessionStorage.setItem('suiji-demo-completion-v1',JSON.stringify(record));bag.clearAfterDemo();location.href=allUrl+'?view=suiji-product&product=complete';}catch{announce(T('Your browser could not complete this demo.','Votre navigateur n’a pas pu terminer la démonstration.'));}});}
  function complete(){let order;try{order=JSON.parse(sessionStorage.getItem('suiji-demo-completion-v1'));}catch{}root.innerHTML=`<section class="sc-complete"><p>SUIJI</p><h1>${T('A little more you.','Un peu plus vous.')}</h1><h2>${T('Your demo journey is complete.','Votre parcours de démonstration est terminé.')}</h2><p>${T('No real order was placed and no payment was taken.','Aucune véritable commande n’a été passée et aucun paiement n’a été effectué.')}</p>${order?`<p>${e(order.reference)}</p><ul>${order.items.map(x=>`<li>${e(text(x.title))} × ${x.quantity}</li>`).join('')}</ul><p>${T('Demonstration total','Total de démonstration')} : ${money(order.total)}</p>`:''}<a class="sc-primary" href="${allUrl}">${T('KEEP EXPLORING','CONTINUER À EXPLORER')}</a></section>`;}
  const serverFallbackHTML=root.innerHTML;
  const detailRequests=new Map();
  let catalogueVersion='';
  async function loadProduct(key){
    const current=byKey[key];
    if(!current)throw new Error('unknown-product');
    if(Array.isArray(current.options)&&Array.isArray(current.variants)&&current.variants.length){current._detailLoaded=true;return current;}
    if(current._detailLoaded)return current;
    if(detailRequests.has(key))return detailRequests.get(key);
    const file=current.detail_file;
    if(!file||file!=='suiji-item-'+key+'.json')throw new Error('invalid-detail');
    const asset=new URL(root.dataset.catalogueSrc,location.href);
    asset.pathname=asset.pathname.replace(/[^/]+$/,file);
    asset.search='v='+encodeURIComponent(catalogueVersion);
    const endpoint=key===root.dataset.productKey&&root.dataset.productSrc?root.dataset.productSrc:asset.href;
    const task=fetch(endpoint,{credentials:'omit'}).then(response=>{
      if(!response.ok)throw new Error('detail-load');
      return response.json();
    }).then(item=>{
      if(item.key!==key||!Array.isArray(item.options)||!Array.isArray(item.variants)||!item.variants.length)throw new Error('invalid-product');
      item._detailLoaded=true;
      byKey[key]=item;
      const i=products.findIndex(p=>p.key===key);
      if(i>=0)products[i]=item;
      return item;
    }).catch(error=>{
      detailRequests.delete(key);
      throw error;
    });
    detailRequests.set(key,task);
    return task;
  }
  async function loadProducts(keys){
    const unique=[...new Set(keys)].filter(key=>byKey[key]);
    for(let i=0;i<unique.length;i+=3)await Promise.all(unique.slice(i,i+3).map(loadProduct));
  }
  async function loadBagProducts(){
    const keys=bag.read().lines.map(line=>line.product);
    if(bag.legacy().length)keys.push('r01-ring-base','oval-motif');
    await loadProducts(keys);
  }
  function componentSummary(p){
    const shared=['set04-hoop-earring-necklace-set','set05-stud-earring-ring-set','set06-hoop-earring-necklace-ring-set'].includes(p.key);
    const ringSet=['set03-ring-set','set05-stud-earring-ring-set','set06-hoop-earring-necklace-ring-set'].includes(p.key);
    return '<section class="sc-component-summary" aria-label="'+T('Parts and connection','Pièces et connexion')+'">'+(p.bom.length?'<h2>'+T('Included with this piece','Les pièces incluses')+'</h2><ul>'+p.bom.map(x=>'<li>'+e(text(x))+'</li>').join('')+'</ul>':'')+
      (shared?'<p>'+T('Two ornaments are shared between arrangements. They do not make a separate decorated piece for every position at once.','Deux ornements se partagent entre les compositions. Ils ne forment pas un bijou décoré distinct à chaque position en même temps.')+'</p>':'')+
      '<p class="sc-connection-copy">'+e(text(p.connection_copy))+'</p>'+(ringSet?'<p><button type="button" class="sc-text-button" data-size-open>'+T('Ring size guide','Guide des tailles')+'</button></p>':'')+'</section>';
  }
  function productHelp(p){
    if(!p.help_link)return '';
    return '<p class="sc-context-guide"><a href="'+prefix+p.help_link.path+'">'+e(text(p.help_link.label))+' →</a></p>';
  }
  function keepServerContentOnError(){
    root.innerHTML=serverFallbackHTML;
    root.dataset.interfaceStatus='unavailable';
    const status=document.createElement('p');
    status.className='sc-load-error';
    status.setAttribute('role','alert');
    status.textContent=T('The selection controls could not load. The product details and links are still available.','Les options n’ont pas pu se charger. Les informations et les liens restent accessibles.');
    const button=document.createElement('button');
    button.type='button';
    button.className='sc-secondary';
    button.textContent=T('Try loading the options again','Réessayer de charger les options');
    button.addEventListener('click',()=>location.reload());
    root.append(status,button);
  }
  async function bootCatalogue(){
    const response=await fetch(root.dataset.catalogueSrc,{credentials:'omit'});
    if(!response.ok)throw new Error('catalogue-load');
    const data=await response.json();
    if(!Array.isArray(data.products)||!['suiji-public-index/2','suiji-demo-catalogue/1'].includes(data.schema))throw new Error('catalogue-schema');
    catalogueVersion=data.version;
    products=data.products;
    byKey=Object.fromEntries(products.map(p=>[p.key,p]));
    const key=root.dataset.productKey||params.get('product')||(params.get('view')==='suiji-h01'?'h01-hoops':'');
    if(root.dataset.view==='cart'||key==='checkout'){
      await loadBagProducts();
      if(key==='checkout')checkout();else cart();
    }else if(root.dataset.view==='product'&&key==='complete'){
      complete();
    }else if(root.dataset.view==='product'&&byKey[key]){
      const item=await loadProduct(key);
      productPage(item);
      // Old public bookmarks remain usable; normalize their client-side address.
      if(!root.dataset.productKey){
        const target=new URL(url(item),location.origin);
        if(params.get('sku'))target.searchParams.set('sku',params.get('sku'));
        history.replaceState(null,'',target.pathname+target.search+target.hash);
        const canonical=document.querySelector('head link[rel="canonical"]');
        if(canonical)canonical.href=new URL(url(item),location.origin).href;
      }
    }else if(root.dataset.view==='product'){
      throw new Error('unknown-product');
    }else{
      listing();
    }
    root.dataset.interfaceStatus='ready';
    document.dispatchEvent(new CustomEvent('suiji:catalogue-ready'));
  }
  bootCatalogue().catch(keepServerContentOnError);

  document.addEventListener('suiji:bag-change',()=>{if(root.dataset.view==='cart')refreshCartValues();renderBagDrawer();});
  document.addEventListener('click',event=>{const link=event.target.closest('a');if(root.dataset.pdpPage&&link?.querySelector('[data-suiji-preview-count]')){event.preventDefault();showAdded(selected,currentVariant());}});
})();
