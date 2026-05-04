# Axonix Integrated Technologies — Website

Production-ready static commercial website. Multi-page HTML, no build step.

**Live:** https://axonixintegrated.com/
**Phone:** 586-339-5370 / `tel:+15863395370`
**Email:** al.eagleeyes@gmail.com

---

## File structure

```
axonix-integrated-site/
├── index.html                          ← Homepage
├── services/
│   ├── index.html                      ← Services hub
│   ├── surveillance.html
│   ├── access-control.html
│   ├── network-infrastructure.html
│   └── structured-cabling.html
├── projects/index.html
├── about/index.html
├── contact/index.html                  ← Form, posts to Formspree
├── privacy/index.html
├── terms/index.html
├── assets/
│   ├── css/
│   │   ├── shared.css                  ← Original design system
│   │   └── accessibility.css           ← Additive: focus/reduced-motion/forms
│   ├── js/
│   │   └── components.js               ← Nav, footer, scroll reveal, form
│   ├── og-image.jpg                    ← Social card (1200×630) — REPLACE
│   ├── favicon.ico                     ← Optional
│   └── projects/                       ← Real install photos go here
├── patch-pages.sh                      ← One-shot fix script
└── README.md
```

`shared.css` is the original design system (do not edit). `accessibility.css` is additive — focus rings, reduced-motion safety, mobile sticky CTA, header/drawer styles, form a11y states.

---

## Quick start (local)

**Python (built-in):**
```bash
python3 -m http.server 8080
```
Open http://localhost:8080.

**VS Code Live Server:** install the extension → right-click `index.html` → Open with Live Server.

> ⚠️ Do NOT open HTML files via `file://` — relative paths for `/assets/css/shared.css` and `/assets/js/components.js` need a real server.

---

## How to update common things

### Phone number
**Display:** `586-339-5370`
**Tel link:** `tel:+15863395370`

Edit in three places:
1. **`assets/js/components.js`** — top of file, change `PHONE_DISPLAY` and `PHONE_TEL` constants. This propagates to nav, footer, and mobile sticky CTA across every page.
2. **`index.html`** — search and replace any hero/CTA references.
3. **`contact/index.html`** — search and replace any visible references.

If multiple pages have hardcoded numbers, run the patch script:
```bash
bash patch-pages.sh
```

### Replace stock images with real install photos
Drop your install photos into `assets/projects/` and replace the Unsplash URLs in:
- `index.html` — hero side images (2), service cards (5), project cards (3), industry cards (8), gallery scroll (8)
- The service pages (`services/surveillance.html`, etc.)

Recommended specs: 1600×1000 or 800×500, WebP, ≤300 KB each. Compress with [Squoosh](https://squoosh.app).

Each `<img>` already has `onerror="this.style.display='none'"` so missing images don't break the layout.

### Logo
The header and footer use a small inline SVG mark + the wordmark "AXONIX". To replace with a real file:
1. Save your logo at `assets/logo.svg`
2. In `assets/js/components.js`, replace the `LOGO_HTML` constant with:
   ```js
   var LOGO_HTML = '<img src="/assets/logo.svg" alt="Axonix Integrated Technologies" width="120" height="28">';
   ```

### OG (social share) image
Drop a 1200×630 JPG at `assets/og-image.jpg`. This shows in Slack/LinkedIn/iMessage previews. Without it, social previews work but with no image. The `<meta property="og:image">` tag is already wired across the homepage and contact page.

### Update the Formspree form ID
1. Sign up at https://formspree.io (free for low volume)
2. Create a new form, copy the form ID (e.g. `xpzvowkq`)
3. Edit **`assets/js/components.js`**, change:
   ```js
   var FORMSPREE_FORM_ID = 'YOUR_FORM_ID';
   ```
   to your real ID.
4. Save and test — submit the form once, confirm Formspree's confirmation email lands in your inbox, then click their verification link.

The form will:
- Validate required fields client-side
- Show loading state while submitting
- Show a success message with `aria-live="polite"`
- Show an error message with `aria-live="assertive"` on failure
- Ignore honeypot submissions silently (spam protection)

---

## Production-readiness patch (apply once)

The repo includes a one-shot fix script that:
- Replaces any fake placeholder phone numbers with `586-339-5370`
- Adds `accessibility.css` link to every page that loads `shared.css`
- Adds OpenGraph image dimensions/alt where missing
- Adds robots meta where missing

It's **idempotent** — running it twice does nothing on already-clean pages.

```bash
git checkout -b production-readiness-pass
bash patch-pages.sh
git diff           # review every change
git add -A && git commit -m "Production readiness pass"
git push origin production-readiness-pass
```

---

## How to test before deploy

### Pages
Open each page and confirm:
- [ ] Header renders, nav links work, no 404s
- [ ] Footer renders with correct contact info and service area
- [ ] Phone link opens dialer on mobile (`tel:+15863395370`)
- [ ] All images load (or fall back gracefully if missing)
- [ ] No raw HTML entities visible (`&amp;` should render as `&`)

### Mobile
1. Open on a real iOS Safari and Android Chrome (or Chrome DevTools mobile emulation, ≤720px viewport)
2. Mobile menu opens/closes
3. All tap targets feel tappable (≥44px)
4. Sticky CTA bar at bottom does NOT cover form fields on the contact page
5. Hero side images are hidden (`<1100px`), single-column layout below

### Contact form
1. Submit empty → required-field errors show, focus moves to first invalid input
2. Submit with valid data → loading state, then success message appears
3. Check your Formspree inbox — submission lands
4. Try with file attachment → success
5. Toggle airplane mode and submit → error message appears, no crash

### Reduced motion
1. macOS: System Settings → Accessibility → Display → Reduce Motion = ON
2. Windows: Settings → Accessibility → Visual Effects → Animation Effects = OFF
3. iOS: Settings → Accessibility → Motion → Reduce Motion = ON
4. Reload — scroll-reveal items appear immediately (no fade-up delay)
5. Page is fully usable

### Accessibility
1. Tab through every page — focus rings visible at every step
2. Skip-to-content link appears when first tabbing
3. Test with VoiceOver (Mac: ⌘F5) or NVDA (Windows) — every form input has a clear label
4. Run [Lighthouse Accessibility audit](https://developer.chrome.com/docs/lighthouse) — target ≥95
5. Run [WAVE](https://wave.webaim.org/) — should have zero errors

### SEO
1. Each page has unique `<title>` and `<meta description>` — verify in source
2. Validate LocalBusiness schema at https://search.google.com/test/rich-results
3. Check OG preview at https://www.opengraph.xyz/
4. Test mobile-friendliness at https://search.google.com/test/mobile-friendly

---

## Deploy

### GitHub Pages (current setup)
Already configured. Push to `main` branch:
```bash
git push origin main
```
Live at https://axonixintegrated.com/ (GitHub Pages serves the repo with the `CNAME` file pointing to the custom domain).

DNS records (already in place):
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   alaanoah-stack.github.io
```

### Cloudflare Pages (recommended alternative)
Faster CDN, instant cache invalidation, PR previews:
1. Connect the repo at https://pages.cloudflare.com/
2. Build command: *(leave blank — static site)*
3. Build output directory: `/`
4. Set custom domain `axonixintegrated.com` in Pages → Custom Domains
5. Update DNS at registrar (Cloudflare will guide)

### Netlify (also works, single-click)
Drag the repo into https://app.netlify.com/, no build step. Add custom domain in Site Settings.

---

## What's included

- ✅ 11 fully-written HTML pages — real file structure, no JS routing
- ✅ Shared CSS design system + additive accessibility layer
- ✅ Shared JS: nav inject, footer inject, scroll reveal (reduced-motion aware), mobile drawer, active link highlighting, contact form with Formspree
- ✅ SEO: unique title + meta description on every page, OG tags with dimensions, JSON-LD LocalBusiness schema on homepage
- ✅ Contact form: client-side validation, honeypot spam protection, file upload, accessible status messages, Formspree backend
- ✅ Partner/technology logos: Ubiquiti, Axis, Avigilon, Verkada, Hikvision, Cisco
- ✅ Real client testimonials (anonymized — replace with named when possible)
- ✅ Mobile-first responsive: tap targets ≥44px, sticky CTA never covers form fields
- ✅ Phone number in nav, hero, footer, and mobile sticky bar (clickable `tel:` everywhere)
- ✅ Privacy Policy and Terms of Service pages
- ✅ Accessibility: skip-to-content link, visible focus rings, `aria-live` form status, reduced-motion respect

---

## What still needs replacing (placeholders)

| File | What it is | Required? |
| --- | --- | --- |
| `assets/og-image.jpg` | Social share preview, 1200×630 | Recommended (cosmetic) |
| `assets/projects/*.webp` | Real install photos (currently Unsplash stock) | Strongly recommended |
| `assets/logo.svg` | Brand logo file | Optional (inline SVG fallback) |
| `assets/favicon.ico` / `favicon.svg` | Browser tab icon | Recommended |
| Formspree form ID | In `assets/js/components.js` | **Required for form to send** |

---

## Changelog (production-readiness pass)

- **Phone unified:** `(586) 339-5370` and `586.339.5370` variants normalized to `586-339-5370` everywhere; tel links all use `+15863395370`. Zero fake placeholders remain.
- **Schema cleaned:** LocalBusiness schema uses real phone, expanded `areaServed` to include Sterling Heights, Macomb, Oakland, Wayne County. No fake street address.
- **Accessibility:** Skip link, visible focus rings, mobile drawer with Escape-to-close, `aria-live` status on form, `aria-required` on required inputs, `aria-busy` on submit button, honeypot wrapped in accessible-hidden container.
- **Mobile:** Sticky CTA bar with `body { padding-bottom: 72px }` so it never covers form fields. Mobile drawer animates in/out with `prefers-reduced-motion` respect.
- **SEO:** OG image dimensions + alt added; Twitter card complete; canonical, robots meta on every page; unique title+description per page.
- **Reduced motion:** Global CSS rule zeroes animations; scroll-reveal short-circuits to immediate visibility.
- **Image fallbacks:** Every `<img>` has `onerror="this.style.display='none'"` so missing files don't break layout.
