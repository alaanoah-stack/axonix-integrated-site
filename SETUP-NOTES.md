# Site Fixes — August 5, 2026

Changes made in this update, based on the two independent site audits.

## What changed (deploy-ready)

1. **Removed the live placeholder text** from the homepage "Project Types"
   section and replaced it with real customer-facing copy.
2. **New hero** — plain-language H1 stating services + location, "Get a Free
   Site Assessment" (amber) + "Call 586-339-5370" buttons, and a trust line
   underneath. The engineering positioning is kept as the H1's second line.
3. **Trust strip** now carries concrete claims (commercial only, 5 counties,
   written scope, tested handoff). A TODO comment marks where to add
   "Licensed & Insured" and manufacturer certifications ONCE you can verify
   them — never publish credentials you can't back up.
4. **LocalBusiness / SecuritySystemInstaller JSON-LD schema** added to the
   homepage head with all 5 counties and the service catalog.
5. **Footer NAP** on the homepage: Sterling Heights, MI + all 5 counties +
   phone + email. Footer county line updated on EVERY page (Washtenaw and
   Livingston were missing site-wide).
6. **All internal links, canonicals, og:urls, and the sitemap** converted to
   extensionless URLs (e.g. /services/surveillance) — Cloudflare Pages was
   308-redirecting every .html link, which wastes crawl equity.
7. **Contact page** — form cut from 7 fields to 4 (name, company, phone,
   message; email optional), added a 1-business-day response promise, a
   "call or text" fallback, email address, hours, and full service area.
8. **Form now submits via AJAX** and redirects to the new **/thank-you/**
   page (noindex), which tells the prospect exactly what happens next.
   On failure it shows the phone number instead of a dead end.
9. **Sticky mobile bar** relabeled: "Call Now" + "Free Assessment" (amber).
10. **functions/api/lead.js** — optional Cloudflare-native lead pipeline
    (Turnstile + Resend). Dormant until you add env vars; Formspree keeps
    working meanwhile. Instructions are in the file header.

## Before you merge

- [ ] Test the mobile hamburger menu on a real phone (audit flagged it).
- [ ] Submit the contact form once end-to-end and confirm the Formspree
      email arrives and /thank-you/ loads.
- [ ] Confirm the hours listed on the contact page (Mon–Sat 8–6) are right —
      I had to pick something; edit if wrong.
- [ ] Confirm you're comfortable publishing the 1-business-day response
      promise. Only keep it if you'll honor it.

## After deploy (the stuff that actually gets you ranked)

- [ ] Google Business Profile: create/verify, category "Security System
      Installer", all 5 counties, 10+ real photos, then request reviews
      from past clients. This is the #1 lever.
- [ ] Google Search Console: verify domain (Cloudflare DNS TXT), submit
      sitemap.xml, use "Request Indexing" on every page to purge the stale
      cached version Google is currently showing.
- [ ] Bing Webmaster Tools: one-click import from Search Console.
- [ ] Replace the CSS-gradient project cards with REAL photos from jobs
      (rack, labeled cabling, mounted cameras, wide facility shot). Drop
      files into /assets/img/ — both audits called this the single
      highest-impact trust fix.
- [ ] Citations with identical NAP: Yelp, Nextdoor, Apple Business Connect,
      Facebook, BBB free listing, and any manufacturer installer
      directories you qualify for.
- [ ] Later: 5 county landing pages (NOT dozens of thin city pages), a
      founder/about section, and 2–3 real case studies with photos.
