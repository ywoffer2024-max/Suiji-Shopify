(() => {
 'use strict';
 if(window.SuijiSizingGuide)return;
 window.SuijiSizingGuide=true;
 const convert=(field,explicit=false)=>{
  const input=field.querySelector('[data-sizing-value]'),type=field.querySelector('[data-sizing-type]').value;
  const first=field.querySelector('[data-sizing-result]'),second=field.querySelector('[data-sizing-result-diameter]');
  const value=Number(input.value),empty=input.value.trim()==='',min=type==='diameter'?5:20,max=type==='diameter'?35:120;
  if(empty&&!explicit){first.textContent=field.dataset.idle;second.textContent='';input.removeAttribute('aria-invalid');return;}
  if(empty||!Number.isFinite(value)||value<min||value>max){first.textContent=field.dataset.error;second.textContent='';input.setAttribute('aria-invalid','true');return;}
  input.removeAttribute('aria-invalid');const locale=field.closest('[data-sizing-guide]').dataset.sizingLocale==='fr'?'fr-FR':'en-GB';
  const number=new Intl.NumberFormat(locale,{minimumFractionDigits:1,maximumFractionDigits:1});
  const circumference=type==='diameter'?value*Math.PI:value,diameter=type==='diameter'?value:value/Math.PI;
  const guide=field.closest('[data-sizing-guide]');
  const reference=guide.querySelector('[data-us-size="'+Math.round(circumference)+'"]');
  const measured=field.dataset.result.replace('__VALUE__',number.format(circumference));
  const measuredDiameter=field.dataset.diameterResult.replace('__VALUE__',number.format(diameter));
  first.textContent=reference?field.dataset.usSizeResult.replace('__SIZE__',reference.textContent.trim()):measured;
  second.textContent=reference?measured+' · '+measuredDiameter:measuredDiameter;
 };
 document.addEventListener('input',event=>{const field=event.target.closest('[data-sizing-calculator]');if(field&&event.target.matches('[data-sizing-value]'))convert(field);});
 document.addEventListener('change',event=>{if(!event.target.matches('[data-sizing-type]'))return;const field=event.target.closest('[data-sizing-calculator]');if(!field)return;const input=field.querySelector('[data-sizing-value]'),diameter=event.target.value==='diameter';input.value='';input.min=diameter?'5':'20';input.max=diameter?'35':'120';input.placeholder=diameter?'17.2':'54';convert(field);});
 document.addEventListener('click',event=>{const button=event.target.closest('[data-sizing-convert]');if(button)convert(button.closest('[data-sizing-calculator]'),true);});
 document.addEventListener('keydown',event=>{if(event.key==='Enter'&&event.target.matches('[data-sizing-value]')){event.preventDefault();convert(event.target.closest('[data-sizing-calculator]'),true);}});
})();

