/* Prime Muscle: all images are local originals. Static-site friendly, no backend required. */
(() => {
  'use strict';
  const $ = (q, parent=document) => parent.querySelector(q);
  const $$ = (q, parent=document) => Array.from(parent.querySelectorAll(q));
  const header = $('#siteHeader');
  const menuButton = $('#menuButton');
  const mobileNav = $('#mobileNav');
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', updateHeader, {passive:true}); updateHeader();
  $('#year').textContent = new Date().getFullYear();

  function closeMenu(focusButton=false){
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Open navigation');
    mobileNav.classList.remove('open'); mobileNav.inert = true;
    document.body.classList.remove('menu-open');
    if(focusButton) menuButton.focus();
  }
  menuButton.addEventListener('click',()=>{
    const open = menuButton.getAttribute('aria-expanded')!=='true';
    if(!open){ closeMenu(); return; }
    menuButton.setAttribute('aria-expanded','true');
    menuButton.setAttribute('aria-label','Close navigation');
    mobileNav.inert=false; mobileNav.classList.add('open');
    document.body.classList.add('menu-open');
  });
  $$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
  window.addEventListener('resize',()=>{if(window.innerWidth>940) closeMenu();});
  document.addEventListener('click',e=>{if(menuButton.getAttribute('aria-expanded')==='true'&&!header.contains(e.target))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true')closeMenu(true);});

  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion && 'IntersectionObserver' in window){
    document.documentElement.classList.add('motion-ready');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    }),{threshold:.08,rootMargin:'0px 0px 30px 0px'});
    $$('.reveal').forEach(el=>observer.observe(el));
  }else{$$('.reveal').forEach(el=>el.classList.add('is-visible'));}

  // Times are interpreted in Asia/Kolkata. Sunday hours are unconfirmed from the
  // supplied screenshot (which labels a particular holiday Sunday as closed).
  function updateStatus(){
    try{
      const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
      const val=type=>parts.find(p=>p.type===type)?.value;
      const day=val('weekday'),minute=(+val('hour'))*60+(+val('minute'));
      let status, open=false;
      if(day==='Sun')status='CLOSED TODAY · REOPENS MONDAY 5:30 AM';
      else if((minute>=330&&minute<600)||(minute>=960&&minute<1290)){
        open = true;
status = minute < 600
  ? 'OPEN NOW · CLOSES AT 10:00 AM'
  : 'OPEN NOW · CLOSES AT 9:30 PM';
      }else if(minute<330)status='NEXT REGULAR SESSION · 5:30 AM';
      else if(minute<960)status='NEXT REGULAR SESSION · 4:00 PM';
      else if(day==='Sat')status='NEXT REGULAR SESSION · MONDAY 5:30 AM';
      else status='NEXT REGULAR SESSION · TOMORROW 5:30 AM';
      $('#openStatus').textContent=status;
      $('#statusDot').style.background=open?'#d2a16b':'#84817a';
      $('#topHours').textContent='MON–SAT · 5:30–10 AM & 4–9:30 PM';
    }catch(e){$('#openStatus').textContent='MON–SAT · 5:30–10 AM & 4–9:30 PM';}
  }
  updateStatus(); setInterval(updateStatus,60000);

  const buttons=$$('.filter-button'),tiles=$$('.gallery-item');
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset.filter;
    buttons.forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
    tiles.forEach(tile=>{tile.hidden=filter!=='all'&&tile.dataset.category!==filter;});
  }));

  // Training-zone cards take visitors directly to that zone's real photographs.
  $$('[data-zone]').forEach(card=>card.addEventListener('click',()=>{
    const filter=$(`.filter-button[data-filter="${card.dataset.zone}"]`);
    if(filter)filter.click();
  }));

  const modal=$('#lightbox'),photo=$('#lightboxPhoto'),caption=$('#lightboxCaption');
  const openItems=()=>tiles.filter(t=>!t.hidden);
  let activeTile=null;
  function showTile(tile){
    activeTile=tile;
    const image=$('img',tile);
    photo.src=image.getAttribute('src'); // Exact original upload path; no filename rewriting.
    photo.alt=image.alt;
    caption.textContent=tile.innerText.replace('↗','').trim();
  }
  tiles.forEach(tile=>tile.addEventListener('click',()=>{showTile(tile);modal.showModal();}));
  function navigate(delta){
    const items=openItems();const i=items.indexOf(activeTile);
    if(i>=0&&items.length)showTile(items[(i+delta+items.length)%items.length]);
  }
  $('#lightboxClose').addEventListener('click',()=>modal.close());
  $('#lightboxPrev').addEventListener('click',()=>navigate(-1));
  $('#lightboxNext').addEventListener('click',()=>navigate(1));
  modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
  modal.addEventListener('keydown',e=>{if(e.key==='ArrowRight')navigate(1);if(e.key==='ArrowLeft')navigate(-1);});

  // This form composes a WhatsApp message. No data is stored or submitted to a server.
  $('#enquiryForm').addEventListener('submit',event=>{
    event.preventDefault();
    const form=event.currentTarget;
    if(!form.reportValidity())return;
    const name=$('#visitorName').value.trim();
    const topic=$('#visitorInterest').value;
    if(!name)return;
    const message=`Hello Prime Muscle! My name is ${name}. I'm interested in ${topic.toLowerCase()}. Could you please share more details?`;
    const url='https://wa.me/917206709285?text='+encodeURIComponent(message);
    window.open(url,'_blank','noopener,noreferrer');
  });
})();
