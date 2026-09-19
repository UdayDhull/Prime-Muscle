(() => {
  const body = document.body;
  const header = document.getElementById('siteHeader');
  const menu = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const loader = document.getElementById('pageLoader');

  window.addEventListener('load', () => {
    window.setTimeout(() => loader?.classList.add('is-hidden'), 220);
  });

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 32);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu?.classList.remove('open');
      menu?.setAttribute('aria-expanded', 'false');
    });
  });

  // Reveal-on-scroll.
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Program carousel.
  const programScroll = document.getElementById('programScroll');
  document.getElementById('programNext')?.addEventListener('click', () => {
    programScroll?.scrollBy({ left: Math.min(390, programScroll.clientWidth * .8), behavior: 'smooth' });
  });
  document.getElementById('programPrev')?.addEventListener('click', () => {
    programScroll?.scrollBy({ left: -Math.min(390, programScroll.clientWidth * .8), behavior: 'smooth' });
  });

  // Join modal.
  const joinModal = document.getElementById('joinModal');
  const closeModal = document.getElementById('modalClose');

  const openJoin = () => {
    joinModal?.classList.add('open');
    joinModal?.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
  };
  const closeJoin = () => {
    joinModal?.classList.remove('open');
    joinModal?.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  };

  document.querySelectorAll('.js-join').forEach(btn => btn.addEventListener('click', openJoin));
  closeModal?.addEventListener('click', closeJoin);
  joinModal?.addEventListener('click', e => {
    if (e.target === joinModal) closeJoin();
  });

  // Gallery lightbox.
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    lightbox?.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  };

  document.querySelectorAll('.js-lightbox').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = btn.dataset.image || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      body.classList.add('no-scroll');
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeJoin();
      closeLightbox();
    }
  });
})();
