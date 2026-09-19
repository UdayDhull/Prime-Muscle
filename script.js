(() => {
  const body = document.body;
  const loader = document.getElementById('loader');
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  window.addEventListener('load', () => setTimeout(() => loader?.classList.add('hide'), 180));
  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 22);
  setHeader(); window.addEventListener('scroll', setHeader, {passive:true});

  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menuBtn?.classList.remove('open'); menuBtn?.setAttribute('aria-expanded','false');
  }));

  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
  }), {threshold:.11, rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const modal = document.getElementById('joinModal');
  const close = document.getElementById('joinClose');
  const openModal = () => { modal?.classList.add('open'); modal?.setAttribute('aria-hidden','false'); body.classList.add('lock'); };
  const closeModal = () => { modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); body.classList.remove('lock'); };
  document.querySelectorAll('.js-join').forEach(b => b.addEventListener('click', openModal));
  close?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if(e.target === modal) closeModal(); });

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');
  const closeLightbox = () => { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden','true'); body.classList.remove('lock'); };
  document.querySelectorAll('.js-lightbox').forEach(b => b.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = b.dataset.image || '';
    lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); body.classList.add('lock');
  }));
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => { if(e.key === 'Escape'){ closeModal(); closeLightbox(); } });
})();
