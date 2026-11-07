(() => {
  'use strict';
  const host=document.querySelector('[data-r107-page]');
  if(!host)return;
  const $=(s,n=document)=>n.querySelector(s), $$=(s,n=document)=>[...n.querySelectorAll(s)];
  let config;try{config=JSON.parse($('[data-r107-config]').textContent);}catch{return;}
  const fr=config.locale==='fr', T=(en,f)=>fr?f:en;
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const products=new Map(config.products.map(p=>[p.key,p]));
  const studies=new Map(config.studies.map(s=>[s.id,s]));
  const routes=config.routes;
  const assetBase=config.asset_base||'/assets/';
  const BAG='suiji-r107-preview-bag-v1', DRAFTS='suiji-r107-local-designs-v1';
  const memory={};let storageAvailable=true;
  function get(key,fallback=[]){if(!storageAvailable&&key in memory)return memory[key];try{return JSON.parse(localStorage.getItem(key)||'null')??fallback;}catch{storageAvailable=false;return memory[key]??fallback;}}
  function put(key,value){memory[key]=value;try{localStorage.setItem(key,JSON.stringify(value));return true;}catch{storageAvailable=false;return false;}}
  let toastTimer;
  function toast(message){const n=$('.r-toast');if(!n)return;n.innerHTML=message;n.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{n.hidden=true;},6500);}
  const bag=()=>{const a=get(BAG);return Array.isArray(a)?a.filter(v=>v&&products.has(v.key)&&typeof v.sku==='string'&&Number.isInteger(v.quantity)&&v.quantity>=1&&v.quantity<=10):[];};
  function unavailableBagRows(){const all=get(BAG);return Array.isArray(all)?all.filter(v=>v&&typeof v.key==='string'&&!products.has(v.key)):[];}
  function saveBag(rows){return put(BAG,[...unavailableBagRows(),...rows]);}
  function updateCount(){const count=bag().reduce((s,v)=>s+v.quantity,0);$$('[data-selection-count]').forEach(n=>n.textContent=count);}
  updateCount();
  // Keep the language counterpart, including product and public study selections.
  $$('[data-switch-language]').forEach(a=>{let path=location.pathname.replace(/^\/en(?=\/|$)/,'')||'/';a.href=(fr?'/en':'')+(path==='/'?(fr?'':'/'):path)+location.search+location.hash;});
  $$('.r-language-form').forEach(form=>form.addEventListener('submit',()=>{const destination=$('input[name="return_to"]',form);if(destination)destination.value=location.pathname+location.search+location.hash;}));
  const menu=$('#r-mobile-menu');
  $('[data-open-menu]')?.addEventListener('click',()=>menu.showModal());
  $('[data-close-menu]')?.addEventListener('click',()=>menu.close());
  let lastMobileTrigger=null;
  $$('[data-mobile-submenu]').forEach(b=>b.addEventListener('click',()=>{lastMobileTrigger=b;const panels=$$('[data-mobile-level]',menu);panels.forEach(n=>n.hidden=n.dataset.mobileLevel!==b.dataset.mobileSubmenu);const activePanel=panels.find(n=>!n.hidden);$('[data-mobile-back]',activePanel)?.focus();menu.scrollTop=0;}));
  $('[data-mobile-back]',menu)?.addEventListener('click',mobileBack);
  $$('[data-mobile-back]',menu).forEach((b,i)=>{if(i)b.addEventListener('click',mobileBack);});
  function mobileBack(){$$('[data-mobile-level]',menu).forEach(n=>n.hidden=n.dataset.mobileLevel!=='main');(lastMobileTrigger||$('[data-mobile-submenu]',menu))?.focus();menu.scrollTop=0;}
  menu?.addEventListener('close',()=>{$$('[data-mobile-level]',menu).forEach(n=>n.hidden=n.dataset.mobileLevel!=='main');});
  const navItems=$$('[data-nav-item]');
  $$('[data-nav-item] .r-nav-label>a').forEach(a=>{if(new URL(a.href,location.href).pathname.replace(/\/$/,'')===location.pathname.replace(/\/$/,''))a.setAttribute('aria-current','page');});
  function closeNavItem(n){n.classList.remove('is-open');$('[data-nav-menu]',n).setAttribute('aria-expanded','false');}
  function closeNav(except){navItems.forEach(n=>{if(n!==except)closeNavItem(n);});}
  navItems.forEach(n=>{const b=$('[data-nav-menu]',n);const open=()=>{if(innerWidth<1280)return;closeNav(n);n.classList.add('is-open');b.setAttribute('aria-expanded','true');};n.addEventListener('pointerenter',event=>{if(event.pointerType!=='mouse')return;n.dataset.hoverJustOpened=String(!n.classList.contains('is-open'));open();});n.addEventListener('pointerleave',()=>{n.dataset.hoverJustOpened='false';if(!n.contains(document.activeElement))closeNavItem(n);});b.addEventListener('click',ev=>{if(ev.detail>0&&n.dataset.hoverJustOpened==='true'){n.dataset.hoverJustOpened='false';open();return;}n.dataset.hoverJustOpened='false';if(n.classList.contains('is-open'))closeNav();else open();});n.addEventListener('focusout',()=>{setTimeout(()=>{if(!n.contains(document.activeElement))closeNavItem(n);},0);});});
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape'){const current=navItems.find(n=>n.classList.contains('is-open'));closeNav();if(current)$('[data-nav-menu]',current).focus();$('.r-filters.is-open')?.classList.remove('is-open');}});
  $('[data-market-menu]')?.addEventListener('click',ev=>{const panel=$('.r-market-panel');panel.hidden=!panel.hidden;ev.currentTarget.setAttribute('aria-expanded',String(!panel.hidden));});
  $$('[data-market-select]').forEach(select=>select.addEventListener('change',ev=>{const b=$('[data-market-menu]');if(b)b.textContent=ev.target.selectedOptions[0].textContent+' ⌄';$$('[data-market-select]').forEach(other=>other.value=ev.target.value);toast(T('Destination selected for this preview. Order pricing and delivery still need confirmation.','Destination choisie pour cet aperçu. Le prix et la livraison restent à confirmer.'));}));
  document.addEventListener('click',ev=>{if(!ev.target.closest('.r-header'))closeNav();});
  function openImage(img){
    if(!img)return;
    const dialog=$('#r-image-dialog');
    const enlarged=img.cloneNode(true);
    enlarged.removeAttribute('srcset');
    enlarged.removeAttribute('sizes');
    enlarged.removeAttribute('fetchpriority');
    $('[data-dialog-image]',dialog).replaceChildren(enlarged);
    dialog.showModal();
  }
  $$('[data-enlarge]').forEach(b=>b.addEventListener('click',()=>openImage($('img',b)||$('[data-concept-image]'))));
  $$('.r-dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
  $$('dialog').forEach(d=>d.addEventListener('click',ev=>{if(ev.target===d){const r=d.getBoundingClientRect();if(ev.clientX<r.left||ev.clientX>r.right||ev.clientY<r.top||ev.clientY>r.bottom)d.close();}}));
  // Catalogue facets are based on actual listed roles. No invented price or weight filters.
  const catalogue=$('[data-catalogue]');
  if(catalogue){const filters=$('.r-filters',catalogue),trigger=$('[data-open-filters]',catalogue);trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-expanded','false');trigger.addEventListener('click',()=>{trigger.setAttribute('aria-expanded','true');filters.showModal();$('[data-close-filters]',filters).focus();});$('[data-close-filters]',filters).addEventListener('click',()=>filters.close());filters.addEventListener('close',()=>{trigger.setAttribute('aria-expanded','false');trigger.focus();});const grid=$('.r-grid',catalogue);const original=[...grid.children];function refresh(){const roles=$$('input[name=role]:checked',filters).map(i=>i.value);let visible=0;original.forEach(n=>{n.hidden=roles.length&&!roles.includes(n.dataset.role);if(!n.hidden)visible++;});$('[data-no-results]',catalogue).hidden=visible>0;$('[data-result-count]',catalogue).textContent=visible+' '+T('pieces','pièces');$('[data-filter-count]',catalogue).textContent=roles.length?'('+roles.length+')':'';const order=$('[data-sort]',catalogue).value==='name'?[...original].sort((a,b)=>$('h3',a).textContent.localeCompare($('h3',b).textContent,config.locale)):original;order.forEach(n=>grid.append(n));}$$('input',filters).forEach(i=>i.addEventListener('change',refresh));$('[data-sort]',catalogue).addEventListener('change',refresh);$$('[data-clear-filters]',catalogue).forEach(b=>b.addEventListener('click',()=>{$$('input:checked',filters).forEach(i=>i.checked=false);refresh();}));refresh();}
  $$('[data-newsletter-preview]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;$('[data-newsletter-status]',form).textContent=T('This local preview does not register a subscription. The live site uses the SUIJI subscription form.','Cet aperçu local n’enregistre pas d’inscription. Le site en ligne utilise le formulaire SUIJI.');}));
  const contactReference=$('[data-contact-reference]');if(contactReference){const piece=new URLSearchParams(location.search).get('piece');if(piece)contactReference.value=piece;}
  const detailRequests=new Map();
  async function prepareQuickForm(form){
    if(!form||form.dataset.pieceReady==='true')return;
    const status=$('[data-piece-status]',form),submit=$('button[type=submit]',form),source=form.dataset.pieceSrc;
    status.textContent=T('Loading options…','Chargement des options…');submit.disabled=true;
    try{if(!detailRequests.has(source))detailRequests.set(source,fetch(source,{credentials:'omit'}).then(response=>{if(!response.ok)throw new Error('Detail unavailable');return response.json();}));const product=await detailRequests.get(source);if(product.key!==form.dataset.pieceKey||!Array.isArray(product.options)||!Array.isArray(product.variants))throw new Error('Unexpected detail');bindPieceForm(form,product);status.textContent='';submit.disabled=false;}
    catch{detailRequests.delete(source);status.textContent=T('Options could not be loaded. ','Les options n’ont pas pu être chargées. ');const retry=document.createElement('button');retry.type='button';retry.className='r-link';retry.textContent=T('Try again','Réessayer');retry.addEventListener('click',()=>prepareQuickForm(form));status.append(retry);}
  }
  $$('[data-open-quick]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.getElementById(button.dataset.openQuick);if(dialog){dialog.showModal();prepareQuickForm($('[data-piece-form]',dialog));}}));
  $$('[data-open-size-guide]').forEach(link=>link.addEventListener('click',event=>{const dialog=$('#r-size-dialog');if(dialog){event.preventDefault();dialog.showModal();}}));
  function bindPieceForm(pieceForm,p){if(pieceForm.dataset.pieceReady==='true')return;pieceForm.dataset.pieceReady='true';if(p){$$('[data-paired-clasp]',pieceForm).forEach(group=>{const update=()=>{const parts=[0,1].map(i=>$('input[name="clasp_part_'+i+'"]:checked',group)?.value);$('input[name="clasp"]',group).value=parts.every(Boolean)?parts.join('-'):'';};group.addEventListener('change',update);});const v0=pieceForm.dataset.previewSku||new URLSearchParams(location.search).get('sku');if(v0){const variant=p.variants.find(v=>v.sku===v0);if(variant)p.options.forEach((o,i)=>{const paired=o.key==='clasp'&&$('[data-paired-clasp]',pieceForm);if(paired){variant.values[i].split('-').forEach((code,index)=>{const radio=$$('input[name="clasp_part_'+index+'"]',paired).find(n=>n.value===code);if(radio)radio.checked=true;});$('input[name="clasp"]',paired).value=variant.values[i];}else{const radio=$$('input[name="'+o.key+'"]',pieceForm).find(n=>n.value===variant.values[i]);if(radio)radio.checked=true;}});}function selected(){return p.options.map(o=>new FormData(pieceForm).get(o.key));}function updateSelectionStatus(){const values=selected();const variant=p.variants.find(v=>v.values.every((s,i)=>s===values[i]));$('[data-selection-status]',pieceForm).textContent=variant?T('Configuration selected. The image remains illustrative.','Configuration choisie. Le visuel reste illustratif.'):T('Choose each option to complete your configuration.','Choisissez chaque option pour compléter la configuration.');}pieceForm.addEventListener('change',updateSelectionStatus);updateSelectionStatus();pieceForm.addEventListener('submit',ev=>{ev.preventDefault();if(!pieceForm.reportValidity())return;const values=selected();const v=p.variants.find(v=>v.values.every((s,i)=>s===values[i]));const status=$('[data-piece-status]',pieceForm);if(!v){status.textContent=T('This combination is not listed. Please choose another configuration.','Cette combinaison n’est pas répertoriée. Choisissez une autre configuration.');return;}const quantity=Number(new FormData(pieceForm).get('quantity'));if(!Number.isInteger(quantity)||quantity<1||quantity>10)return;const rows=bag();const labels={en:[],fr:[]};p.options.forEach((o,i)=>{const choice=o.values.find(x=>x.value===values[i]);for(const l of ['en','fr'])labels[l].push((o.name[l]||o.name.en)+': '+(choice.label[l]||choice.label.en));});const sizeRequest=new FormData(pieceForm).get('preview_ring_size');if(sizeRequest){labels.en.push('Requested ring size: '+sizeRequest+' mm');labels.fr.push('Taille de bague souhaitée : '+sizeRequest+' mm');}const existing=rows.find(x=>x.key===p.key&&x.sku===v.sku&&JSON.stringify(currentLabels(x.labels))===JSON.stringify(currentLabels(labels)));if(existing)existing.quantity=Math.min(10,existing.quantity+quantity);else rows.push({key:p.key,sku:v.sku,quantity,labels});const saved=saveBag(rows);updateCount();status.innerHTML=T('Saved on this device.','Enregistré sur cet appareil.')+' <a href="'+routes.cart+'">'+T('View saved selection','Voir la sélection enregistrée')+' ↗</a>'+(saved?'':' '+T('Browser storage is unavailable; this selection is temporary.','Stockage indisponible ; cette sélection est temporaire.'));toast(status.innerHTML)});}}
  $$('[data-piece-form]:not([data-piece-src])').forEach(form=>{try{bindPieceForm(form,JSON.parse($('[data-r107-piece]',form).textContent));}catch{$('[data-piece-status]',form).textContent=T('Options are unavailable. Please contact SUIJI.','Les options sont indisponibles. Contactez SUIJI.');$('button[type=submit]',form).disabled=true;}});
  function currentFinishLabel(label,locale=config.locale){const names=locale==='fr'?{'Titane naturel':'Argent','Champagne':'Or classique','Bleu':'Bleu SUIJI'}:{'Natural titanium':'Silver','Champagne':'Classic Gold','Blue':'SUIJI Blue'};return String(label).replace(/(^|:\s*|\/\s*)(Natural titanium|Titane naturel|Champagne|Blue|Bleu)(?=$|\s*[·/])/g,(_,prefix,name)=>prefix+(names[name]||name));}
  function currentLabels(labels){return Object.fromEntries(['en','fr'].map(locale=>[locale,(Array.isArray(labels?.[locale])?labels[locale]:[]).map(label=>currentFinishLabel(label,locale))]));}
  function renderBag(){const n=$('[data-bag-items]');if(!n)return;const rows=bag();const summary=$('.r-bag-summary');if(summary)summary.hidden=!rows.length;const unavailable=$('[data-unavailable-selection]');if(unavailable){unavailable.hidden=!unavailableBagRows().length;unavailable.textContent=T('Some saved pieces are temporarily unavailable. Their records remain on this device; they have not been moved to your shopping bag.','Certaines pièces enregistrées sont temporairement indisponibles. Leurs données restent sur cet appareil ; elles n’ont pas été transférées au panier boutique.');}n.innerHTML=rows.map((v,i)=>{const p=products.get(v.key);return '<article class="r-bag-line"><a href="'+p.url+'&sku='+encodeURIComponent(v.sku)+'"><img src="'+esc(p.image)+'" alt="'+esc(p.title)+'" width="120" height="150"></a><div><h2><a href="'+p.url+'&sku='+encodeURIComponent(v.sku)+'">'+esc(p.title)+'</a></h2><p>'+esc(p.unit)+'</p><p>'+esc(currentLabels(v.labels)[config.locale].join(' · '))+'</p><p>'+esc(v.sku)+'</p><p>'+T('Price to be confirmed','Prix à confirmer')+'</p><label>'+T('Quantity','Quantité')+' <input data-bag-quantity="'+i+'" type="number" min="1" max="10" value="'+v.quantity+'"></label><button class="r-link" data-bag-remove="'+i+'">'+T('Remove','Retirer')+'</button></div></article>';}).join('');$('[data-bag-empty]').hidden=rows.length>0;$('[data-bag-total-count]').textContent=rows.reduce((s,v)=>s+v.quantity,0);$$('[data-bag-remove]',n).forEach(b=>b.addEventListener('click',()=>{const current=bag();current.splice(Number(b.dataset.bagRemove),1);saveBag(current);updateCount();renderBag();}));$$('[data-bag-quantity]',n).forEach(input=>{input.addEventListener('input',()=>{const quantity=Number(input.value);if(!Number.isInteger(quantity)||quantity<1||quantity>10)return;const rows=bag(),index=Number(input.dataset.bagQuantity);if(!rows[index])return;rows[index].quantity=quantity;saveBag(rows);updateCount();$('[data-bag-total-count]').textContent=rows.reduce((total,row)=>total+row.quantity,0);});input.addEventListener('change',()=>input.reportValidity());});}
  renderBag();window.addEventListener('storage',()=>{updateCount();renderBag();});
  $$('[data-size-calculator]').forEach(form=>{const diameterInput=$('[data-size-diameter]',form);diameterInput.addEventListener('input',()=>{$('[data-size-result]',form).textContent='';});form.addEventListener('submit',event=>{event.preventDefault();const input=$('[data-size-diameter]',form),result=$('[data-size-result]',form);if(!form.reportValidity())return;const diameter=Number(input.value);result.textContent=diameter>=10&&diameter<=30?T('Approximate inner circumference: ','Circonférence intérieure approximative : ')+(Math.PI*diameter).toFixed(1)+' mm. '+T('Compare this with the table below.','Comparez cette mesure au tableau ci-dessous.'):T('Enter an inner diameter between 10 and 30 mm.','Saisissez un diamètre intérieur entre 10 et 30 mm.');});});
  $$('[data-journal-filter]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.journalFilter;$$('[data-article-cluster]').forEach(a=>a.hidden=key!=='all'&&a.dataset.articleCluster!==key);$$('[data-journal-filter]').forEach(a=>a.setAttribute('aria-pressed',String(a.dataset.journalFilter===key)));$('[data-journal]')?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
  $$('[data-product-gallery]').forEach(gallery=>{
    const buttons=$$('[data-gallery-source]',gallery);
    const main=$('[data-gallery-main]',gallery);
    const counter=$('[data-gallery-counter]',gallery);
    buttons.forEach((button,index)=>{
      button.addEventListener('click',()=>{
        if(button.dataset.gallerySrcset)main.srcset=button.dataset.gallerySrcset;
        else main.removeAttribute('srcset');
        main.src=button.dataset.gallerySource;
        main.alt=button.dataset.galleryAlt;
        buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
        counter.textContent=(index+1)+' / '+buttons.length;
      });
      button.addEventListener('keydown',event=>{
        let next;
        if(event.key==='ArrowRight')next=(index+1)%buttons.length;
        else if(event.key==='ArrowLeft')next=(index-1+buttons.length)%buttons.length;
        else if(event.key==='Home')next=0;
        else if(event.key==='End')next=buttons.length-1;
        else return;
        event.preventDefault();
        buttons[next].focus();
        buttons[next].click();
      });
    });
  });
  $$('[data-gallery-stage]').forEach(b=>b.addEventListener('click',()=>{$$('[data-gallery-stage]').forEach(a=>a.setAttribute('aria-pressed',String(a===b)));$$('[data-gallery-panel]').forEach(p=>p.hidden=p.dataset.galleryPanel!==b.dataset.galleryStage);}));
  $$('[data-email-draft]').forEach(f=>f.addEventListener('submit',ev=>{ev.preventDefault();if(!f.reportValidity())return;const fields=[...new FormData(f)].map(([k,v])=>k+': '+v).join('\n\n');const subject=T('SUIJI enquiry','Demande SUIJI');$('[data-email-result]',f).innerHTML='<p>'+T('Your draft is ready. It has not been sent.','Votre brouillon est prêt. Il n’a pas été envoyé.')+'</p><a class="r-link" href="mailto:contact@suijijewelry.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(fields)+'">'+T('Open in my email app','Ouvrir dans ma messagerie')+' ↗</a><button class="r-link" type="button" data-copy-email>'+T('Copy email text','Copier le texte')+'</button><p class="r-caption">contact@suijijewelry.com</p>';$('[data-copy-email]',f).addEventListener('click',()=>copyText(fields));}));
  const ref=$('[data-contact-reference]');if(ref)ref.value=new URLSearchParams(location.search).get('piece')||'';
  async function copyText(value){try{await navigator.clipboard.writeText(value);toast(T('Copied.','Copié.'));}catch{toast(T('Copy is unavailable in this browser. Select the text instead.','La copie n’est pas disponible. Sélectionnez le texte.'));}}
  const selectionForm=$('[data-contact-selection]');
  if(selectionForm&&new URLSearchParams(location.search).get('selection')==='preview-bag'){
    const field=$('textarea[name=question],textarea[name="contact[body]"]',selectionForm);
    if(field&&!field.value.trim()){
      const lines=bag().map(v=>{const p=products.get(v.key);return p.title+' · '+v.sku+' · '+T('Quantity','Quantité')+': '+v.quantity;});
      if(lines.length)field.value=T('I would like to ask about these pieces:','Je souhaite me renseigner sur ces pièces :')+'\n\n'+lines.join('\n')+'\n\n'+T('Delivery country:','Pays de livraison :');
    }
  }
  // Search contains only public pieces, guides and public study records. No private drafts or queries are tracked.
  const search=$('[data-search]');if(search){let kind='all';const input=$('input[name=q]',search),normal=v=>v.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const result=$('[data-search-results]',search);function run(){const q=input.value.trim().slice(0,160);const words=normal(q).split(/\s+/).filter(Boolean);result.innerHTML='';if(!words.length){$('[data-search-status]').textContent=T('Try a piece, a component or a wearing question.','Essayez un bijou, un élément ou une question de port.');return;}const match=v=>words.every(w=>normal(v).includes(w));let count=0;const groups=[['pieces',T('Pieces','Bijoux'),config.products.filter(p=>match(p.search_text||p.title+' '+p.role+' '+p.category)).map(p=>({title:p.title,url:p.url}))],['guides',T('Guides & help','Guides et aide'),config.articles.filter(a=>match(a.title+' '+a.deck))],['design',T('Design examples','Exemples de création'),config.studies.filter(a=>match(a.name+' '+a.intent)).map(a=>({title:a.name,url:a.url}))]];for(const[k,title,items]of groups){if(kind!=='all'&&kind!==k)continue;count+=items.length;if(items.length)result.innerHTML+='<section class="r-search-result-group"><h2>'+title+'</h2><ul>'+items.map(a=>'<li><a class="r-link" href="'+esc(a.url)+'">'+esc(a.title)+' ↗</a></li>').join('')+'</ul></section>';}$('[data-search-status]').textContent=count===1?T('1 public result.','1 résultat public.'):count?count+' '+T('public results.','résultats publics.'):T('No public results. Try a wearing position or contact SUIJI.','Aucun résultat public. Essayez un emplacement ou contactez SUIJI.');if(!count){result.innerHTML='<div class="r-empty"><p>'+T('Try another word or browse the photographed pieces.','Essayez un autre mot ou découvrez les pièces photographiées.')+'</p><button type="button" class="r-button r-button--line" data-clear-search>'+T('Clear search','Effacer la recherche')+'</button><a class="r-button" href="'+esc(routes.all)+'">'+T('Browse pieces','Voir les bijoux')+'</a><a class="r-link" href="'+esc(routes.contact)+'">'+T('Contact SUIJI','Contacter SUIJI')+' ↗</a></div>';$('[data-clear-search]',result).addEventListener('click',()=>{input.value='';run();input.focus();});};}input.value=new URLSearchParams(location.search).get('q')||'';$('[data-search-form]',search).addEventListener('submit',ev=>{ev.preventDefault();run();});$$('[data-search-kind]',search).forEach(b=>b.addEventListener('click',()=>{kind=b.dataset.searchKind;$$('[data-search-kind]',search).forEach(a=>a.setAttribute('aria-pressed',String(a===b)));run();}));if(input.value)run();}
  // Local Studio: saved briefs reference existing public studies, never fabricated AI output.
  const workspace=$('[data-workspace]');
  function allDraftRows(){
    const records=get(DRAFTS);
    return Array.isArray(records)?records:[];
  }
  function canDisplayDraft(draft){
    return draft&&typeof draft.id==='string'&&typeof draft.study==='string'&&typeof draft.title==='string';
  }
  const draftRows=()=>allDraftRows().filter(canDisplayDraft);
  function persistDraftRows(rows){
    const preserved=allDraftRows().filter(draft=>!canDisplayDraft(draft));
    return put(DRAFTS,[...rows,...preserved]);
  }
  const missingExample=()=>T('Original example unavailable','Exemple d’origine indisponible');
  function draftDescription(draft){
    const updated=new Date(draft.updated);
    const date=Number.isFinite(draft.updated)&&!Number.isNaN(updated.valueOf())?new Intl.DateTimeFormat(config.locale,{dateStyle:'medium',timeStyle:'short'}).format(updated):null;
    return [T('Local draft','Brouillon local'),date,studies.get(draft.study)?.name||missingExample()].filter(Boolean).join(' · ');
  }
  function renderLocalDesigns(){
    const n=$('[data-local-design-list]');if(!n)return;const rows=draftRows();
    $$('[data-requires-local],[data-has-local-new]').forEach(el=>el.hidden=!rows.length);
    n.innerHTML=rows.length?'<p class="r-caption">'+T('Your saved text is unchanged. Collection reference images have been updated; review the reference before continuing.','Votre texte enregistré est conservé. Les images de référence ont été actualisées ; vérifiez la référence avant de poursuivre.')+'</p>'+rows.map(v=>'<article class="r-info-row"><h2>'+esc(v.title)+'</h2><div><p>'+esc(draftDescription(v))+'</p><p>'+esc(v.idea||T('Image-led brief','Projet guidé par une image'))+'</p><a class="r-link" href="'+routes['studio-workspace']+'?version='+encodeURIComponent(v.id)+'">'+T('Continue this local version','Poursuivre cette version locale')+' ↗</a><p class="r-caption">'+T('No server review, quote or production has been requested.','Aucune étude sur serveur, aucun devis ni fabrication n’ont été demandés.')+'</p></div></article>').join(''):'<div class="r-empty"><h2>'+T('No local designs yet.','Aucune création locale pour le moment.')+'</h2><p>'+T('Choose a collection example and save your first version.','Choisissez un exemple de la collection et enregistrez votre première version.')+'</p><a class="r-button" href="'+routes['studio-workspace']+'">'+T('Open the workspace','Ouvrir l’espace de création')+' ↗</a></div>';
  }
  renderLocalDesigns();
  if(workspace){
    let mode='words',currentStudy=config.studies[0].id,base='earrings',file=null,fileUrl=null,fileHash=null,currentVersion=null,chooseNewExample=false,referenceGeneration=0;
    const form=$('[data-studio-brief]',workspace),idea=$('[name=idea]',form),priority=$('[name=priority]',form),fileInput=$('[name=reference]',form),status=$('[data-studio-status]');
    const initialParams=new URLSearchParams(location.search);
    if(studies.has(initialParams.get('study')))currentStudy=initialParams.get('study');
    function setMode(value){mode=value;$$('[data-input-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.inputMode===mode)));$('[data-word-field]').hidden=mode==='image';$('[data-image-field]').hidden=mode==='words';idea.required=mode!=='image';$('[data-brief-status]').textContent='';}
    $$('[data-input-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.inputMode)));setMode(mode);
    function clearReference(){referenceGeneration++;if(fileUrl)URL.revokeObjectURL(fileUrl);file=null;fileUrl=null;fileHash=null;fileInput.value='';$('[data-reference-preview]').replaceChildren();$('[data-remove-reference]').hidden=true;}
    function fileError(message){$('[data-brief-status]').textContent=message;}
    async function acceptFile(candidate){
      clearReference();
      const request=referenceGeneration;
      if(!candidate)return;
      const allowed=['image/jpeg','image/png','image/webp'];
      if(!allowed.includes(candidate.type)){
        fileError(T('Choose a JPEG, PNG or WebP image.','Choisissez une image JPEG, PNG ou WebP.'));
        return;
      }
      if(!candidate.size||candidate.size>10*1024*1024){
        fileError(T('The image must be no larger than 10 MB.','L’image ne doit pas dépasser 10 Mo.'));
        return;
      }
      try{
        const bytes=new Uint8Array(await candidate.arrayBuffer());
        const jpeg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
        const png=bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71;
        const webp=String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP';
        if(!(candidate.type==='image/jpeg'&&jpeg||candidate.type==='image/png'&&png||candidate.type==='image/webp'&&webp))throw new Error('Format mismatch');
        const bitmap=await createImageBitmap(candidate);
        bitmap.close();
        const digest=await crypto.subtle.digest('SHA-256',bytes);
        if(request!==referenceGeneration)return;
        file=candidate;
        fileUrl=URL.createObjectURL(candidate);
        fileHash=[...new Uint8Array(digest)].map(value=>value.toString(16).padStart(2,'0')).join('');
        const image=new Image();
        image.src=fileUrl;
        image.alt=T('Your local reference image','Votre image de référence locale');
        $('[data-reference-preview]').replaceChildren(image);
        $('[data-remove-reference]').hidden=false;
        fileError(T('Image ready in this browser. It has not been uploaded.','Image prête dans ce navigateur. Elle n’a pas été envoyée.'));
      }catch{
        if(request!==referenceGeneration)return;
        clearReference();
        fileError(T('This image could not be read. Try a valid JPEG, PNG or WebP.','Cette image est illisible. Essayez un fichier JPEG, PNG ou WebP valide.'));
      }
    }
    fileInput.addEventListener('change',()=>acceptFile(fileInput.files[0]));$('[data-remove-reference]').addEventListener('click',clearReference);
    const drop=$('[data-dropzone]');drop.addEventListener('dragover',ev=>{ev.preventDefault();drop.classList.add('is-dragging');});drop.addEventListener('dragleave',()=>drop.classList.remove('is-dragging'));drop.addEventListener('drop',ev=>{ev.preventDefault();drop.classList.remove('is-dragging');if(ev.dataTransfer.files.length!==1){fileError(T('Choose just one reference image.','Choisissez une seule image de référence.'));return;}acceptFile(ev.dataTransfer.files[0]);});
    function showStudy(){const s=studies.get(currentStudy);$('[data-concept-image]').src=assetBase+s.image;$('[data-concept-image]').alt=s.name+' · '+T('existing SUIJI concept','concept SUIJI existant');$$('[data-study]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.study===currentStudy)));}
    $$('[data-study]').forEach(b=>b.addEventListener('click',()=>{currentStudy=b.dataset.study;chooseNewExample=false;showStudy();}));showStudy();
    function showBase(){const category={earrings:'earrings',ring:'rings',neckpiece:'necklaces'}[base];const p=config.products.find(p=>p.category===category&&p.role.endsWith('_base'))||config.products.find(p=>p.category===category);const target=$('[data-base-context]');if(!p){target.innerHTML='<p>'+T('No photographed base is on view for this position. Contact us to discuss the parts.','Aucune base photographiée n’est présentée pour cet emplacement. Contactez-nous pour en discuter.')+'</p>';return;}target.innerHTML='<img src="'+esc(p.image)+'" alt="'+esc(p.title)+'" width="54" height="64"><p>'+esc(p.title)+'<br>'+T('Separate base reference. No assembled fit or scale has been verified.','Référence de base séparée. Assemblage et échelle non vérifiés.')+'</p>';}
    $$('[name=base-context]').forEach(i=>i.addEventListener('change',()=>{base=i.value;showBase();}));showBase();
    function values(){return{mode,idea:mode==='image'?'':idea.value.trim().slice(0,5000),priority:priority.value.trim().slice(0,1000),study:currentStudy,base,reference:mode!=='words'&&file?{name:file.name,type:file.type,size:file.size,sha256:fileHash}:null};}
    function valid(){if(chooseNewExample){fileError(T('Choose a current example before saving this version.','Choisissez un exemple actuel avant d’enregistrer cette version.'));$('[data-study][aria-pressed=true]')?.focus();return false;}if(mode!=='image'&&!idea.value.trim()){fileError(T('Describe your idea to continue.','Décrivez votre idée pour continuer.'));idea.focus();return false;}if(mode!=='words'&&!file){fileError(T('Choose one reference image to continue.','Choisissez une image de référence pour continuer.'));fileInput.focus();return false;}return true;}
    function briefSummary(){const v=values(),n=$('[data-brief-summary]');n.hidden=false;n.innerHTML='<h3>'+T('Your local brief','Votre projet local')+'</h3><p>'+esc(v.idea||T('An image-led starting point.','Un point de départ visuel.'))+'</p>'+(v.reference?'<p>'+esc(v.reference.name)+'</p>':'')+'<p class="r-caption">'+T('The concept on the canvas is an existing example. No new design has been generated.','Le concept affiché est un exemple existant. Aucune nouvelle création n’a été générée.')+'</p>';}
    form.addEventListener('submit',ev=>{ev.preventDefault();if(!valid())return;briefSummary();fileError(T('Brief prepared locally. Compare examples or save a version.','Projet préparé localement. Comparez les exemples ou enregistrez une version.'));});
    function renderVersions(){const rows=draftRows();$('[data-version-list]').innerHTML=rows.length?rows.map(v=>'<article class="r-version'+(v.id===currentVersion?' is-current':'')+'"><h3>'+esc(v.title)+'</h3><p>'+esc(draftDescription(v))+'</p><label><input type="checkbox" data-compare-choice="'+esc(v.id)+'">'+T('Compare','Comparer')+'</label><div class="r-version-actions"><button data-load-version="'+esc(v.id)+'">'+T('Continue','Continuer')+'</button><button data-rename-version="'+esc(v.id)+'">'+T('Rename','Renommer')+'</button><button data-duplicate-version="'+esc(v.id)+'">'+T('Duplicate','Dupliquer')+'</button><button data-remove-version="'+esc(v.id)+'">'+T('Remove version','Supprimer la version')+'</button></div></article>').join(''):'<div class="r-empty"><p>'+T('Save a version to keep the idea and compare directions.','Enregistrez une version pour conserver l’idée et comparer les pistes.')+'</p></div>';
      $$('[data-load-version]').forEach(b=>b.addEventListener('click',()=>loadVersion(b.dataset.loadVersion)));
      $$('[data-duplicate-version]').forEach(b=>b.addEventListener('click',()=>{const rows=draftRows();const v=rows.find(v=>v.id===b.dataset.duplicateVersion);const copy={...v,id:crypto.randomUUID(),title:v.title+' · '+T('copy','copie'),updated:Date.now()};rows.unshift(copy);persistDraftRows(rows);currentVersion=copy.id;renderVersions();}));
      $$('[data-remove-version]').forEach(button=>button.addEventListener('click',()=>{
        const id=button.dataset.removeVersion;
        const draft=draftRows().find(row=>row.id===id);
        if(!draft)return;
        const question=T(
          'Remove “'+draft.title+'”? This local version cannot be recovered.',
          'Supprimer « '+draft.title+' » ? Cette version locale ne pourra pas être récupérée.'
        );
        if(!window.confirm(question))return;
        const saved=persistDraftRows(draftRows().filter(row=>row.id!==id));
        if(currentVersion===id)currentVersion=null;
        const review=$('[data-review-summary]');
        if(review.dataset.reviewVersion===id){review.hidden=true;review.replaceChildren();}
        renderVersions();
        ($('[data-remove-version]')||$('[data-save-version]'))?.focus();
        status.textContent=saved?T('Local version removed.','Version locale supprimée.'):
          T('Browser storage is unavailable. Reloading may restore this version.','Le stockage du navigateur est indisponible. Cette version peut réapparaître au rechargement.');
      }));
      $$('[data-rename-version]').forEach(button=>button.addEventListener('click',()=>{
        const card=button.closest('.r-version');
        const heading=$('h3',card);
        const id=button.dataset.renameVersion;
        const input=document.createElement('input');
        input.value=heading.textContent;
        input.maxLength=80;
        input.setAttribute('aria-label',T('Version name','Nom de la version'));
        heading.replaceWith(input);
        input.focus();
        input.select();
        let finished=false;
        function finish(save,restoreFocus){
          if(finished)return;
          finished=true;
          const title=input.value.trim();
          if(save&&title){
            const rows=draftRows();
            const row=rows.find(draft=>draft.id===id);
            if(row){row.title=title;persistDraftRows(rows);}
          }
          renderVersions();
          if(restoreFocus)$$('[data-rename-version]').find(el=>el.dataset.renameVersion===id)?.focus();
        }
        input.addEventListener('keydown',event=>{
          if(event.key==='Enter'||event.key==='Escape'){
            event.preventDefault();
            finish(event.key==='Enter',true);
          }
        });
        input.addEventListener('blur',()=>finish(true,false),{once:true});
      }));
    }
    function loadVersion(id){
      const draft=draftRows().find(row=>row.id===id);
      if(!draft)return;
      currentVersion=id;
      clearReference();
      setMode(['words','image','both'].includes(draft.mode)?draft.mode:'words');
      idea.value=typeof draft.idea==='string'?draft.idea:'';
      priority.value=typeof draft.priority==='string'?draft.priority:'';
      chooseNewExample=!studies.has(draft.study);
      currentStudy=chooseNewExample?config.studies[0].id:draft.study;
      base=['earrings','ring','neckpiece'].includes(draft.base)?draft.base:'earrings';
      const radio=$$('[name=base-context]').find(el=>el.value===base);
      if(radio)radio.checked=true;
      showStudy();
      showBase();
      renderVersions();
      status.textContent=chooseNewExample?
        T('Local version loaded. Its original example is unavailable. Choose an example to continue.','Version locale chargée. Son exemple d’origine est indisponible. Choisissez un exemple pour continuer.'):
        draft.reference?T('Version loaded. Re-select its reference image if needed; uploaded files are not stored.','Version chargée. Sélectionnez à nouveau l’image si nécessaire ; les fichiers ne sont pas conservés.'):
        T('Local version loaded.','Version locale chargée.');
    }
    $('[data-save-version]').addEventListener('click',()=>{if(!valid())return;const rows=draftRows();const v={...values(),id:crypto.randomUUID(),title:T('My charm','Mon ornement')+' · '+(rows.length+1),updated:Date.now(),stage:'local_draft'};rows.unshift(v);const saved=persistDraftRows(rows);currentVersion=v.id;renderVersions();status.textContent=saved?T('Version saved on this device. No server submission was made.','Version enregistrée sur cet appareil. Aucun envoi sur serveur.'):T('Saved temporarily; browser storage is unavailable.','Enregistrement temporaire ; stockage du navigateur indisponible.');});
    $('[data-compare-versions]').addEventListener('click',()=>{
      const ids=$$('[data-compare-choice]:checked').map(el=>el.dataset.compareChoice);
      const chosen=draftRows().filter(draft=>ids.includes(draft.id));
      if(chosen.length!==2){
        status.textContent=T('Select two saved versions to compare.','Sélectionnez deux versions enregistrées.');
        return;
      }
      const columns=chosen.map(draft=>{
        const example=studies.get(draft.study);
        const visual=example?
          '<img src="'+esc(assetBase+example.image)+'" alt="'+esc(example.name)+'" width="1200" height="1200">':
          '<p>'+missingExample()+'</p>';
        return '<article>'+visual+'<h3>'+esc(draft.title)+'</h3><p>'+esc(draft.idea||T('Image-led brief','Projet visuel'))+'</p><p>'+
          esc(draft.priority)+'</p><p>'+esc(draft.base)+'</p>'+
          (example?'<p>'+T('Existing concept example · not AI-generated from this brief.','Concept existant · non généré par IA à partir du projet.')+'</p>':'')+'</article>';
      });
      $('[data-compare-content]').innerHTML='<h2>'+T('Compare local versions','Comparer les versions locales')+'</h2><div class="r-compare-columns">'+columns.join('')+'</div>';
      $('#r-compare-dialog').showModal();
    });
    const prepareReview=$('[data-prepare-review]');
    prepareReview.addEventListener('click',async()=>{
      if(prepareReview.disabled||!valid())return;
      prepareReview.disabled=true;
      try{
      const v=values();let saved=draftRows().find(draft=>draft.id===currentVersion);
      const snapshot=a=>JSON.stringify({mode:a.mode,idea:a.idea,priority:a.priority,study:a.study,base:a.base,reference:a.reference});
      const isNew=!saved||snapshot(saved)!==snapshot(v);
      if(isNew)saved={...v,id:crypto.randomUUID(),title:T('My charm','Mon ornement')+' · '+(draftRows().length+1),updated:Date.now(),stage:'local_draft'};
      const internalSnapshot=JSON.stringify({version:saved.id,...v});
      const digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(internalSnapshot)))].map(v=>v.toString(16).padStart(2,'0')).join('');
      const rows=draftRows();
      if(!isNew){
        const current=rows.find(draft=>draft.id===saved.id);
        if(!current||snapshot(current)!==snapshot(v))throw new Error('Local version changed while preparing');
        saved=current;
      }
      saved={...saved,review_snapshot_sha256:digest};
      const persistent=persistDraftRows(isNew?[saved,...rows]:rows.map(draft=>draft.id===saved.id?saved:draft));
      currentVersion=saved.id;
      renderVersions();
      const baseName={earrings:T('Earrings','Boucles'),ring:T('Ring','Bague'),neckpiece:T('Neckpiece','Bijou de cou')}[v.base];
      const lines=[T('SUIJI making review enquiry','Demande d’étude de fabrication SUIJI'),T('Local version: ','Version locale : ')+saved.title,T('Idea: ','Idée : ')+(v.idea||T('Image-led brief','Projet guidé par une image')),T('What matters most: ','L’essentiel : ')+(v.priority||T('To discuss','À préciser')),T('Existing concept example: ','Exemple de concept existant : ')+studies.get(v.study).name,T('Base context: ','Contexte de base : ')+baseName,T('Reference image: ','Image de référence : ')+(v.reference?v.reference.name:T('None','Aucune')),T('Please confirm feasibility, materials, dimensions, price and timing before any work.','Merci de confirmer la faisabilité, les matières, les dimensions, le prix et les délais avant tout travail.')];
      const customPolicy=config.custom_order_policy;if(customPolicy)lines.splice(-1,0,customPolicy.label+': '+customPolicy.summary+' '+customPolicy.rights);
      const emailText=lines.join('\n\n'),n=$('[data-review-summary]');n.hidden=false;n.dataset.reviewVersion=saved.id;
      n.innerHTML='<h3>'+T('Review draft — not submitted','Brouillon d’étude — non envoyé')+'</h3><p><strong>'+esc(saved.title)+'</strong></p><p>'+esc(v.idea||T('Image-led brief','Projet visuel'))+'</p><p>'+esc(studies.get(v.study).name)+' · '+esc(baseName)+'</p><p>'+(persistent?T('This version is saved on this device.','Cette version est enregistrée sur cet appareil.'):T('Browser storage is unavailable. Copy this draft to keep it after closing the page.','Le stockage du navigateur est indisponible. Copiez ce brouillon pour le conserver après la fermeture de la page.'))+' '+T('The maker needs to confirm feasibility, materials, dimensions, price and timing. Attach your authorised reference in your email app.','L’artisan doit confirmer la faisabilité, les matières, les dimensions, le prix et les délais. Joignez votre référence autorisée dans votre messagerie.')+'</p><a class="r-link" href="mailto:contact@suijijewelry.com?subject='+encodeURIComponent(T('SUIJI making review enquiry','Demande d’étude SUIJI'))+'&body='+encodeURIComponent(emailText)+'">'+T('Open an email draft','Ouvrir un brouillon d’e-mail')+' ↗</a><button class="r-link" data-copy-review>'+T('Copy review draft','Copier le brouillon')+'</button><p class="r-caption">'+T('No quote has been approved, no design published and no production started. Uploaded image files are not kept with local versions.','Aucun devis accepté, aucune publication ni fabrication démarrée. Les fichiers image importés ne sont pas conservés avec les versions locales.')+'</p>';
      $('[data-copy-review]',n).addEventListener('click',()=>copyText(emailText));n.scrollIntoView({block:'nearest'});
      }catch{status.textContent=T('The review draft could not be prepared. Your brief is still here. Try again, or contact SUIJI.','Le brouillon d’étude n’a pas pu être préparé. Votre projet est toujours ici. Réessayez ou contactez SUIJI.');status.scrollIntoView({block:'nearest'});}
      finally{prepareReview.disabled=false;}
    });
    $$('[data-workspace-tab]').forEach(b=>b.addEventListener('click',()=>{$$('[data-workspace-tab]').forEach(a=>a.setAttribute('aria-pressed',String(a===b)));$('[data-workspace-panel="'+b.dataset.workspaceTab+'"]').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
    renderVersions();if(initialParams.get('version'))loadVersion(initialParams.get('version'));
    window.addEventListener('beforeunload',()=>{if(fileUrl)URL.revokeObjectURL(fileUrl);});
    window.addEventListener('offline',()=>{status.textContent=T('Connection unavailable. Local versions still work; no remote task has been started.','Connexion indisponible. Les versions locales restent utilisables ; aucune tâche distante n’a été lancée.');});
  }
})();
