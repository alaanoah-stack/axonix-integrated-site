/* =====================================================================
   AXONIX — V2 Hybrid Motion Layer
   ---------------------------------------------------------------------
   Base: Axonix V2 Elite design
   Added from the other AI kit: safer motion checks, rAF-throttled parallax,
   sticky mobile CTA, hero video pause/off-screen handling, graceful fallbacks.
   No fake stats, no fake testimonials, no dependency on /projects/ pages.
   ===================================================================== */
(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  const commandCard = document.querySelector('.command-card');
  const stickyCta = document.querySelector('[data-sticky-cta]');
  const heroVideo = document.querySelector('.hero-video');

  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const supportsIO = 'IntersectionObserver' in window;

  /* ---------- Header state ------------------------------------------ */
  function updateHeader() {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- Mobile navigation ------------------------------------- */
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal system ---------------------------------- */
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length && motionOK && supportsIO) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -70px 0px' });

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- rAF-throttled parallax variable ------------------------ */
  let ticking = false;
  function updateParallaxVar() {
    if (!motionOK || isMobile) {
      root.style.setProperty('--scrollY', '0px');
    } else {
      root.style.setProperty('--scrollY', `${window.scrollY}px`);
    }
    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallaxVar);
      ticking = true;
    }
  }

  updateParallaxVar();
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });

  /* ---------- Cursor spotlight -------------------------------------- */
  if (motionOK && canHover) {
    window.addEventListener('pointermove', (event) => {
      const x = Math.round((event.clientX / window.innerWidth) * 100);
      const y = Math.round((event.clientY / window.innerHeight) * 100);
      root.style.setProperty('--mx', `${x}%`);
      root.style.setProperty('--my', `${y}%`);
    }, { passive: true });
  }

  /* ---------- Subtle 3D tilt for system map card --------------------- */
  if (commandCard && motionOK && canHover) {
    commandCard.addEventListener('pointermove', (event) => {
      const rect = commandCard.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      const rotateX = -((y / rect.height) - 0.5) * 6;
      commandCard.style.setProperty('--tiltX', `${rotateX.toFixed(2)}deg`);
      commandCard.style.setProperty('--tiltY', `${rotateY.toFixed(2)}deg`);
    });

    commandCard.addEventListener('pointerleave', () => {
      commandCard.style.setProperty('--tiltX', '0deg');
      commandCard.style.setProperty('--tiltY', '0deg');
    });
  }

  /* ---------- Sticky mobile CTA ------------------------------------- */
  if (stickyCta) {
    const updateStickyCta = () => {
      const show = window.scrollY > 640;
      stickyCta.classList.toggle('is-visible', show);
      stickyCta.setAttribute('aria-hidden', String(!show));
    };

    updateStickyCta();
    window.addEventListener('scroll', updateStickyCta, { passive: true });
  }

  /* ---------- Hero video: fail gracefully + pause off-screen -------- */
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      heroVideo.style.display = 'none';
    });

    if (supportsIO) {
      const videoObserver = new IntersectionObserver(([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && motionOK && !isMobile) {
          heroVideo.play().catch(() => { /* autoplay may be blocked; fallback remains visible */ });
        } else {
          heroVideo.pause();
        }
      }, { threshold: 0.1 });

      videoObserver.observe(heroVideo);
    }
  }

  /* ---------- Footer year ------------------------------------------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
