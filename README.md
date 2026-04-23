# Axonix Integrated Technologies — Website

Production-ready multi-page commercial website.

## File Structure

```
axonix-website/
├── index.html                          ← Homepage
├── services/
│   ├── index.html                      ← Services hub
│   ├── surveillance.html
│   ├── access-control.html
│   ├── network-infrastructure.html
│   └── structured-cabling.html
├── projects/index.html
├── about/index.html
├── contact/index.html
├── privacy/index.html
├── terms/index.html
└── assets/
    ├── css/shared.css                  ← All styles
    └── js/components.js                ← Nav, footer, scroll reveal, form
```

## Setup: Contact Form (REQUIRED before launch)

1. Go to https://formspree.io and create a free account
2. Create a new form → copy your Form ID (looks like `xpzvowkq`)
3. Open `contact/index.html`
4. Find this line:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Replace `YOUR_FORM_ID` with your actual ID
6. Done — form submissions will be emailed to the address you registered with

## Run Locally

**Option A — Python (built-in):**
```bash
cd axonix-website
python3 -m http.server 8080
```
Open http://localhost:8080

**Option B — VS Code Live Server:**
Install "Live Server" extension → right-click index.html → Open with Live Server

> ⚠️ Do NOT open HTML files directly (file://) — relative paths for CSS/JS require a server.

## Deploy to GitHub Pages

```bash
# 1. Create a new repo on github.com named: axonix-website (or your domain)

# 2. In this folder:
git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/axonix-website.git
git push -u origin main

# 3. On GitHub: Settings → Pages → Source: Deploy from branch → main → / (root)
# Your site will be live at: https://alaanoah-stack.github.io/axonix-integrated-site/
```

## Deploy to Custom Domain (axonixintegrated.com)

1. In your repo root, create a file named `CNAME` containing:
   ```
   axonixintegrated.com
   ```
2. Push it to GitHub
3. In your domain registrar (GoDaddy/Namecheap/etc), add DNS records:
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   CNAME www   YOUR_USERNAME.github.io
   ```
4. Back on GitHub: Settings → Pages → Custom domain → enter axonixintegrated.com
5. Check "Enforce HTTPS" once it activates (takes up to 24 hrs)

## What's Included

- ✅ 11 fully-written HTML pages (no JS routing — real file structure)
- ✅ Shared CSS design system (one file controls all styles)
- ✅ Shared JS: nav injection, footer injection, scroll reveal, mobile nav, active link highlighting, form validation + Formspree submission
- ✅ SEO: unique title + meta description on every page, Open Graph tags, JSON-LD LocalBusiness schema on homepage
- ✅ Contact form with client-side validation, Formspree backend, success confirmation state
- ✅ Partner/technology logos section (Ubiquiti, Axis, Avigilon, Verkada, Hikvision, Cisco)
- ✅ Testimonials on homepage, about, and contact pages
- ✅ Project filter on projects page
- ✅ Scroll reveal animations on all pages
- ✅ Active nav link highlighting per page
- ✅ Phone number in nav (clickable tel: link)
- ✅ Privacy Policy and Terms of Service pages
- ✅ Mobile-first responsive, all buttons ≥ 48px
- ✅ All contact info: 586-339-5370 / al.eagleeyes@gmail.com
