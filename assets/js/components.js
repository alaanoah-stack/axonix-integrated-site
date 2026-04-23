/* ============================================================
   AXONIX — SHARED COMPONENTS & BEHAVIOUR
   components.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- NAV HTML ---- */
  const NAV_HTML = `
<nav id="site-nav">
  <div class="nav-inner">
    <a class="nav-logo" href="/">
      <div class="nav-logo-mark">AX</div>
      <div class="nav-logo-text">
        <span>AXONIX</span>
        <span>Integrated Technologies</span>
      </div>
    </a>
    <ul class="nav-links">
      <li class="nav-dropdown">
        <a class="nav-dropdown-toggle" href="/services/">
          Services
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6l4 4 4-4"/></svg>
        </a>
        <div class="nav-dropdown-menu">
          <a href="/services/surveillance.html"><span class="dot"></span>Surveillance Systems</a>
          <a href="/services/access-control.html"><span class="dot"></span>Access Control</a>
          <a href="/services/network-infrastructure.html"><span class="dot"></span>Network Infrastructure</a>
          <a href="/services/structured-cabling.html"><span class="dot"></span>Structured Cabling</a>
          <a href="/services/#audio"><span class="dot"></span>Commercial Audio</a>
        </div>
      </li>
      <li><a href="/projects/">Projects</a></li>
      <li><a href="/about/">About</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
    <div class="nav-cta-area">
      <a class="nav-phone" href="tel:+15863395370">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" style="display:inline-block;vertical-align:middle;margin-right:5px;"><path d="M2 2h2.5l1 3-1.5 1a9 9 0 004 4l1-1.5 3 1V13a1 1 0 01-1 1A12 12 0 011 3a1 1 0 011-1z"/></svg>
        586-339-5370
      </a>
      <a class="btn btn-primary" href="/contact/" style="padding:10px 20px;font-size:0.78rem;">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3z"/><path d="M2 3l6 5 6-5"/></svg>
        Request Assessment
      </a>
    </div>
    <button class="nav-hamburger" id="hamburger-btn" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<div id="mobile-nav">
  <div class="mobile-group-label">Services</div>
  <a href="/services/surveillance.html">Surveillance Systems</a>
  <a href="/services/access-control.html">Access Control</a>
  <a href="/services/network-infrastructure.html">Network Infrastructure</a>
  <a href="/services/structured-cabling.html">Structured Cabling</a>
  <a href="/services/#audio">Commercial Audio</a>
  <div class="mobile-group-label" style="margin-top:8px;">Company</div>
  <a href="/projects/">Projects</a>
  <a href="/about/">About</a>
  <a href="/contact/">Contact</a>
  <div style="margin-top:16px;padding:0 16px;">
    <a class="btn btn-primary" href="/contact/" style="width:100%;justify-content:center;">Request Infrastructure Assessment</a>
  </div>
  <div style="padding:12px 16px 0;">
    <a href="tel:+15863395370" style="display:flex;align-items:center;gap:8px;font-family:'Barlow',sans-serif;font-size:0.88rem;color:#8B9ABB;text-decoration:none;">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 2h2.5l1 3-1.5 1a9 9 0 004 4l1-1.5 3 1V13a1 1 0 01-1 1A12 12 0 011 3a1 1 0 011-1z"/></svg>
      586-339-5370
    </a>
  </div>
</div>`;

  /* ---- FOOTER HTML ---- */
  const FOOTER_HTML = `
<footer id="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
          <div style="width:36px;height:36px;background:var(--cyan);border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:1.1rem;color:#060A14;">AX</div>
          <div>
            <span style="font-family:'Barlow Condensed',sans-serif;font-size:1.05rem;font-weight:700;color:#EDF1FA;letter-spacing:0.04em;display:block;line-height:1.1;">AXONIX</span>
            <span style="font-family:'Barlow',sans-serif;font-size:0.58rem;color:#4A566E;letter-spacing:0.18em;text-transform:uppercase;display:block;">Integrated Technologies</span>
          </div>
        </a>
        <p>Commercial infrastructure and systems integration — designed, deployed, and documented to enterprise standards.</p>
        <p style="font-size:0.8rem;margin-top:12px;color:#4A566E;">Metro Detroit, Michigan<br>Serving commercial facilities across the Midwest.</p>
      </div>
      <div class="footer-col">
        <h5>Services</h5>
        <ul>
          <li><a href="/services/surveillance.html">AI Surveillance Systems</a></li>
          <li><a href="/services/access-control.html">Access Control</a></li>
          <li><a href="/services/network-infrastructure.html">Network Infrastructure</a></li>
          <li><a href="/services/structured-cabling.html">Structured Cabling</a></li>
          <li><a href="/services/#audio">Commercial Audio</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="/projects/">Projects</a></li>
          <li><a href="/about/">About Axonix</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/privacy/">Privacy Policy</a></li>
          <li><a href="/terms/">Terms of Service</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="mailto:al.eagleeyes@gmail.com">al.eagleeyes@gmail.com</a></li>
          <li><a href="tel:+15863395370">586-339-5370</a></li>
          <li><a>Metro Detroit, MI</a></li>
        </ul>
        <div style="margin-top:20px;">
          <a class="btn btn-primary" href="/contact/" style="padding:10px 20px;font-size:0.75rem;">Request Assessment</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} Axonix Integrated Technologies LLC. All rights reserved.</p>
      <div style="display:flex;gap:20px;">
        <a href="/privacy/">Privacy Policy</a>
        <a href="/terms/">Terms of Service</a>
        <a href="https://axonixintegrated.com" target="_blank" rel="noopener">axonixintegrated.com</a>
      </div>
    </div>
  </div>
</footer>`;

  /* ---- NOTIFICATION HTML ---- */
  const NOTIF_HTML = `
<div class="notification" id="site-notification">
  <div class="notification-icon">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 4L6 11l-3-3"/></svg>
  </div>
  <div>
    <div class="notification-title" id="notif-title">Message Sent</div>
    <div class="notification-msg" id="notif-msg">We'll be in touch within 1 business day.</div>
  </div>
</div>`;

  /* ---- INJECT COMPONENTS ---- */
  function inject() {
    // Nav
    const navPh = document.getElementById('nav-placeholder');
    if (navPh) navPh.outerHTML = NAV_HTML;

    // Footer
    const footerPh = document.getElementById('footer-placeholder');
    if (footerPh) footerPh.outerHTML = FOOTER_HTML;

    // Notification
    document.body.insertAdjacentHTML('beforeend', NOTIF_HTML);
  }

  /* ---- ACTIVE NAV ---- */
  function setActiveNav() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('#site-nav .nav-links a, #mobile-nav a').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPath = href.replace(/\/$/, '').split('#')[0] || '/';
      const isActive =
        (path === '/' && linkPath === '/') ||
        (path !== '/' && linkPath !== '/' && path.startsWith(linkPath));
      if (isActive) link.classList.add('active');
    });
  }

  /* ---- SCROLL SHADOW ---- */
  function initScrollShadow() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    const handler = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
  }

  /* ---- MOBILE NAV ---- */
  function initMobileNav() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('#hamburger-btn');
      if (btn) {
        document.getElementById('mobile-nav').classList.toggle('open');
        return;
      }
      // Close if clicking outside
      const nav = document.getElementById('mobile-nav');
      if (nav && nav.classList.contains('open') && !e.target.closest('#site-nav') && !e.target.closest('#mobile-nav')) {
        nav.classList.remove('open');
      }
    });
  }

  /* ---- SCROLL REVEAL ---- */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ---- NOTIFICATION HELPER ---- */
  window.showNotification = function (title, msg) {
    const n = document.getElementById('site-notification');
    if (!n) return;
    document.getElementById('notif-title').textContent = title;
    document.getElementById('notif-msg').textContent = msg;
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 5500);
  };

  /* ---- CONTACT FORM w/ FORMSPREE ---- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Basic validation
      let valid = true;
      const emailField = form.querySelector('[name="email"]');
      const nameField  = form.querySelector('[name="name"]');

      [emailField, nameField].forEach(f => {
        if (!f) return;
        const msg = f.closest('.form-group')?.querySelector('.form-error-msg');
        if (!f.value.trim()) {
          f.classList.add('error');
          if (msg) msg.classList.add('visible');
          valid = false;
        } else {
          f.classList.remove('error');
          if (msg) msg.classList.remove('visible');
        }
      });

      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add('error');
        const msg = emailField.closest('.form-group')?.querySelector('.form-error-msg');
        if (msg) { msg.textContent = 'Please enter a valid email address.'; msg.classList.add('visible'); }
        valid = false;
      }

      if (!valid) return;

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="animation:spin 1s linear infinite"><path d="M10 2a8 8 0 110 16A8 8 0 0110 2z" opacity=".2"/><path d="M10 2a8 8 0 018 8"/></svg> Sending...';
      submitBtn.disabled = true;

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          // Show confirmation
          document.getElementById('form-area').style.display = 'none';
          document.getElementById('form-confirm').style.display = 'block';
          window.showNotification('Request Submitted', "We'll be in touch within 1 business day.");
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        window.showNotification('Submission Error', 'Please try again or call us directly at 586-339-5370.');
      }
    });

    // Clear error on input
    form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
      el.addEventListener('input', function () {
        this.classList.remove('error');
        const msg = this.closest('.form-group')?.querySelector('.form-error-msg');
        if (msg) msg.classList.remove('visible');
      });
    });
  }

  /* ---- INIT ---- */
  document.addEventListener('DOMContentLoaded', function () {
    inject();
    setActiveNav();
    initScrollShadow();
    initMobileNav();
    initScrollReveal();
    initContactForm();
  });

  // Spin keyframe for loader
  const style = document.createElement('style');
  style.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(style);

})();
