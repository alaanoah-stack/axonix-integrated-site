/* ============================================================================
   Axonix Integrated Technologies — components.js
   Shared site behavior:
     - Nav injection (sticky header with mobile drawer)
     - Footer injection
     - Scroll reveal animation (respects prefers-reduced-motion)
     - Active nav link highlighting
     - Contact form: validation, loading state, success/error messages,
       Formspree submission, accessible aria-live status updates
     - Mobile sticky CTA (inserted on every page; no overlap with form fields)

   IMPORTANT — replace before launch:
     • FORMSPREE_FORM_ID below — get from https://formspree.io
     • Logo/brand wordmark — currently text-only; swap LOGO_HTML if you have an SVG
   ========================================================================== */

(function () {
  'use strict';

  /* ============================================================================
     PHONE CONSTANTS — single source of truth.
     Edit ONLY here. Used in: nav, footer, sticky CTA, drawer, form errors.
     ========================================================================== */
  const PHONE_DISPLAY = '586-339-5370';
  const PHONE_TEL     = 'tel:+15863395370';

  /* ----------------------------- Config ----------------------------- */

  var EMAIL = 'al.eagleeyes@gmail.com';

  // TODO: replace with your real Formspree form ID — see https://formspree.io
  // Example: var FORMSPREE_FORM_ID = 'xabcdeyz';
  var FORMSPREE_FORM_ID = 'mpqkkjpl';

  /* Inline brand mark — keep small and crisp. To use a custom logo file,
     replace LOGO_HTML with: '<img src="/assets/logo.svg" alt="Axonix" width="120" height="28">' */
  var LOGO_HTML = '' +
    '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">' +
      '<rect x="0.5" y="0.5" width="21" height="21" rx="4.5" stroke="rgba(255,255,255,0.18)"/>' +
      '<path d="M5 17L11 5L17 17" stroke="#00C8FF" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<path d="M8 13H14" stroke="#00C8FF" stroke-width="1.5" stroke-linecap="round"/>' +
      '<circle cx="11" cy="5" r="1.3" fill="#FFA500"/>' +
    '</svg>' +
    '<span class="brand-wordmark">AXONIX</span>';

  /* Top-level nav definition */
  var NAV_LINKS = [
    { href: '/services/', label: 'Services' },
    { href: '/projects/', label: 'Projects' },
    { href: '/about/', label: 'About' },
    { href: '/contact/', label: 'Contact' }
  ];

  /* Footer service & company links */
  var FOOTER_SERVICES = [
    { href: '/services/surveillance.html', label: 'AI Surveillance' },
    { href: '/services/access-control.html', label: 'Access Control' },
    { href: '/services/network-infrastructure.html', label: 'Network Infrastructure' },
    { href: '/services/structured-cabling.html', label: 'Structured Cabling' },

    // Kept as /services/ because /services/commercial-audio-av.html does not currently exist.
    { href: '/services/', label: 'Commercial Audio / AV' }
  ];

  var FOOTER_COMPANY = [
    { href: '/about/', label: 'About' },
    { href: '/projects/', label: 'Projects' },
    { href: '/contact/', label: 'Contact' },
    { href: '/privacy/', label: 'Privacy Policy' },
    { href: '/terms/', label: 'Terms of Service' }
  ];

  var SERVICE_AREAS_TEXT = 'Metro Detroit · Sterling Heights · Macomb County · Oakland County · Wayne County';

  /* ----------------------------- NAV ----------------------------- */

  function buildNav() {
    var navHost = document.getElementById('nav-placeholder');
    if (!navHost) return;

    var currentPath = normalizePath(window.location.pathname);

    var linksMarkup = NAV_LINKS.map(function (l) {
      var isActive = isActiveLink(currentPath, l.href);
      return '<a href="' + l.href + '" class="nav-link' +
        (isActive ? ' is-active' : '') +
        '"' + (isActive ? ' aria-current="page"' : '') + '>' + l.label + '</a>';
    }).join('');

    navHost.innerHTML =
      '<a href="#main" class="skip-link">Skip to main content</a>' +
      '<header class="site-header" role="banner">' +
        '<div class="site-header-inner container-wide">' +
          '<a href="/" class="brand" aria-label="Axonix Integrated Technologies — Home">' +
            LOGO_HTML +
          '</a>' +
          '<nav class="nav-primary" aria-label="Primary">' +
            linksMarkup +
          '</nav>' +
          '<div class="nav-cta">' +
            '<a href="' + PHONE_TEL + '" class="nav-tel" aria-label="Call Axonix at ' + PHONE_DISPLAY + '">' +
              '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 2l3 1 1 3-2 1a8 8 0 004 4l1-2 3 1 1 3a1 1 0 01-1 1A12 12 0 012 3a1 1 0 011-1z"/></svg>' +
              PHONE_DISPLAY +
            '</a>' +
            '<a href="/contact/" class="btn btn-primary btn-sm">Request Assessment</a>' +
            '<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Open menu">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div id="mobile-drawer" class="mobile-drawer" hidden>' +
          NAV_LINKS.map(function (l) {
            return '<a href="' + l.href + '" class="mobile-drawer-link">' + l.label + '</a>';
          }).join('') +
          '<a href="' + PHONE_TEL + '" class="mobile-drawer-tel">' +
            '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 2l3 1 1 3-2 1a8 8 0 004 4l1-2 3 1 1 3a1 1 0 01-1 1A12 12 0 012 3a1 1 0 011-1z"/></svg>' +
            'Call ' + PHONE_DISPLAY +
          '</a>' +
          '<a href="/contact/" class="btn btn-primary mobile-drawer-cta">Request Infrastructure Assessment</a>' +
        '</div>' +
      '</header>';

    wireMobileDrawer();
  }

  function wireMobileDrawer() {
    var toggle = document.querySelector('.nav-toggle');
    var drawer = document.getElementById('mobile-drawer');
    if (!toggle || !drawer) return;

    function open() {
      drawer.hidden = false;
      requestAnimationFrame(function () {
        drawer.classList.add('is-open');
      });
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('drawer-open');
    }

    function close() {
      drawer.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('drawer-open');

      // Wait for transition to finish before hiding from accessibility tree.
      window.setTimeout(function () {
        drawer.hidden = true;
      }, 220);
    }

    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        close();
      } else {
        open();
      }
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
      }
    });
  }

  function normalizePath(p) {
    if (!p) return '/';
    if (p.length > 1 && p.charAt(p.length - 1) === '/') return p;
    return p;
  }

  function isActiveLink(currentPath, linkPath) {
    if (linkPath === '/') return currentPath === '/' || currentPath === '/index.html';

    // Match either exact or section prefix.
    // Example: /services/ matches /services/access-control.html
    return currentPath.indexOf(linkPath) === 0;
  }

  /* ----------------------------- FOOTER ----------------------------- */

  function buildFooter() {
    var host = document.getElementById('footer-placeholder');
    if (!host) return;

    var year = new Date().getFullYear();

    host.innerHTML =
      '<footer class="site-footer" role="contentinfo">' +
        '<div class="container">' +
          '<div class="site-footer-grid">' +
            '<div class="footer-col footer-col-brand">' +
              '<a href="/" class="brand brand-footer" aria-label="Axonix — Home">' +
                LOGO_HTML +
              '</a>' +
              '<p class="footer-blurb">Commercial security and low-voltage integrator. Surveillance, access control, structured cabling, network, and AV — engineered, documented, and supported.</p>' +
              '<p class="footer-area"><strong>Service Area:</strong> ' + SERVICE_AREAS_TEXT + '</p>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Services</h4>' +
              '<ul>' + FOOTER_SERVICES.map(function (l) {
                return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
              }).join('') + '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Company</h4>' +
              '<ul>' + FOOTER_COMPANY.map(function (l) {
                return '<li><a href="' + l.href + '">' + l.label + '</a></li>';
              }).join('') + '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Contact</h4>' +
              '<ul>' +
                '<li><a href="' + PHONE_TEL + '">' + PHONE_DISPLAY + '</a></li>' +
                '<li><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
                '<li>Licensed &amp; Insured</li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bar">' +
            '<p>© ' + year + ' Axonix Integrated Technologies. All rights reserved.</p>' +
            '<p class="footer-bar-meta">Commercial Security · Low-Voltage · Network Infrastructure</p>' +
          '</div>' +
        '</div>' +
      '</footer>' +

      // Mobile sticky CTA — only visible at narrow widths via CSS.
      '<div class="mobile-sticky-cta" aria-label="Quick contact actions">' +
        '<a href="' + PHONE_TEL + '" class="mobile-sticky-cta-item" aria-label="Call ' + PHONE_DISPLAY + '">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 2l3 1 1 3-2 1a8 8 0 004 4l1-2 3 1 1 3a1 1 0 01-1 1A12 12 0 012 3a1 1 0 011-1z"/></svg>' +
          '<span>Call</span>' +
        '</a>' +
        '<a href="/contact/" class="mobile-sticky-cta-item mobile-sticky-cta-primary">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>' +
          '<span>Request Assessment</span>' +
        '</a>' +
      '</div>';
  }

  /* ----------------------------- SCROLL REVEAL ----------------------------- */

  function initScrollReveal() {
    if (prefersReducedMotion()) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ----------------------------- HEADER SCROLL STATE ----------------------------- */

  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var scrolled = false;

    function update() {
      var should = window.scrollY > 8;

      if (should !== scrolled) {
        scrolled = should;
        header.classList.toggle('is-scrolled', should);
      }
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ----------------------------- CONTACT FORM ----------------------------- */
  /*
     Wires any <form data-axonix-contact> on the page to Formspree.
     Form must include input/select/textarea elements with name attributes.
     Required fields use the standard required attribute.
  */

  function initContactForm() {
    var form = document.querySelector('form[data-axonix-contact]');
    if (!form) return;

    var statusEl = form.querySelector('[data-form-status]');
    var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    var honeypot = form.querySelector('input[name="company_website"]');

    form.setAttribute('novalidate', 'novalidate');

    // If FORMSPREE_FORM_ID is unset, make that visible up front to whoever is testing.
    if (FORMSPREE_FORM_ID === 'YOUR_FORM_ID') {
      console.warn('[Axonix] Formspree form ID not configured. Edit FORMSPREE_FORM_ID in /assets/js/components.js.');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot — bots fill this; humans never see it.
      if (honeypot && honeypot.value && honeypot.value.length > 0) {
        showStatus(statusEl, 'success', 'Thanks — we\'ll be in touch shortly.');
        form.reset();
        return;
      }

      // Native validation.
      if (!form.checkValidity()) {
        showFieldErrors(form);

        var firstInvalid = form.querySelector(':invalid');
        if (firstInvalid && firstInvalid.focus) firstInvalid.focus();

        showStatus(statusEl, 'error', 'Please complete the required fields highlighted above.');
        return;
      }

      // Hard safety guard:
      // If the Formspree ID is still the placeholder, do NOT submit to a broken endpoint.
      if (FORMSPREE_FORM_ID === 'YOUR_FORM_ID') {
        showStatus(
          statusEl,
          'error',
          'The contact form is not configured yet. Please call ' +
            PHONE_DISPLAY +
            ' or email ' +
            EMAIL +
            '.'
        );
        return;
      }

      // Loading state.
      setSubmitting(submitBtn, true);
      showStatus(statusEl, 'pending', 'Sending your request…');

      var endpoint = 'https://formspree.io/f/' + FORMSPREE_FORM_ID;
      var data = new FormData(form);

      // _replyto helps Formspree route reply-to correctly.
      if (data.get('email') && !data.get('_replyto')) {
        data.append('_replyto', data.get('email'));
      }

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();

            showStatus(
              statusEl,
              'success',
              'Thanks — we received your request. We\'ll respond within one business day. For urgent items, call ' +
                PHONE_DISPLAY +
                '.'
            );

            // Move focus to status so screen readers announce it.
            if (statusEl) statusEl.focus();
          } else {
            return res.json().then(function (body) {
              var msg = (body && body.errors && body.errors.length)
                ? body.errors.map(function (er) { return er.message; }).join(', ')
                : 'Something went wrong. Please call ' + PHONE_DISPLAY + ' or email ' + EMAIL + '.';

              showStatus(statusEl, 'error', msg);
            });
          }
        })
        .catch(function () {
          showStatus(
            statusEl,
            'error',
            'Network error. Please call ' + PHONE_DISPLAY + ' or email ' + EMAIL + '.'
          );
        })
        .then(function () {
          setSubmitting(submitBtn, false);
        });
    });

    // Clear field-level error when user edits.
    form.addEventListener('input', function (e) {
      var t = e.target;

      if (t && t.classList && t.classList.contains('is-error')) {
        t.classList.remove('is-error');
      }
    });
  }

  function showFieldErrors(form) {
    form.querySelectorAll('[required]').forEach(function (el) {
      if (!el.checkValidity()) {
        el.classList.add('is-error');
      } else {
        el.classList.remove('is-error');
      }
    });
  }

  function setSubmitting(btn, isSubmitting) {
    if (!btn) return;

    btn.disabled = isSubmitting;
    btn.setAttribute('aria-busy', isSubmitting ? 'true' : 'false');

    if (isSubmitting) {
      btn.dataset.label = btn.dataset.label || btn.textContent.trim();
      btn.textContent = 'Sending…';
    } else if (btn.dataset.label) {
      btn.textContent = btn.dataset.label;
    }
  }

  function showStatus(el, kind, text) {
    if (!el) return;

    el.className = 'form-status form-status-' + kind;
    el.textContent = text;

    if (kind === 'error') {
      el.setAttribute('role', 'alert');
      el.setAttribute('aria-live', 'assertive');
    } else {
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
    }

    el.tabIndex = -1;
  }

  /* ----------------------------- BOOT ----------------------------- */

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    buildNav();
    buildFooter();
    initScrollReveal();
    initHeaderScroll();
    initContactForm();
  });
})();
