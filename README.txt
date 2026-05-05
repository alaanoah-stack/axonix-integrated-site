AXONIX V2 HYBRID — Elite Motion + Safe Business Copy
=====================================================

This package keeps the approved Axonix V2 Elite homepage structure and adds the best technical improvements from the alternate AI package.

What changed from V2 Elite:
- Added WebM + MP4 hero video support.
- Added local poster/fallback support at assets/img/hero-fallback.jpg.
- Added rAF-throttled parallax for smoother performance.
- Added reduced-motion and mobile motion safeguards.
- Added hero video pause when off-screen.
- Added sticky mobile CTA.
- Added stronger keyboard focus styles.
- Added desktop content-visibility optimization.
- Kept the original services/industries/contact structure.
- Removed/avoided risky claims like Licensed & Insured, fake stats, fake testimonials, and unsupported certifications.

Files included:
- index.html
- styles.css
- script.js
- assets/media/
- assets/img/

Deploy instructions:
1. Upload index.html, styles.css, script.js, and the assets folder to the root of your GitHub repo.
2. Keep your existing folders:
   - /services/
   - /industries/
   - /contact/
   - sitemap.xml
   - robots.txt
3. Add hero video files when ready:
   - assets/media/axonix-hero.webm
   - assets/media/axonix-hero.mp4
4. Add hero fallback image when ready:
   - assets/img/hero-fallback.jpg
5. Replace placeholder/stock visual backgrounds with real Axonix project photos when available.

Hero video specs:
- 8–12 seconds loop
- 1920x1080 maximum
- muted, no audio
- compressed MP4 target under 3 MB
- compressed WebM target under 2 MB
- avoid people/faces, license plates, screens, IP addresses, and client-identifying details

Recommended ffmpeg commands:

MP4:
ffmpeg -i source.mov -vf "scale=1920:-2,format=yuv420p" -c:v libx264 -profile:v high -level:v 4.0 -crf 26 -preset slow -movflags +faststart -an axonix-hero.mp4

WebM:
ffmpeg -i source.mov -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -an axonix-hero.webm

Poster image:
ffmpeg -i source.mov -ss 00:00:02 -frames:v 1 -q:v 2 hero-fallback.jpg

Photo priority:
1. Clean rack / patch panel photo
2. Exterior camera install
3. Interior camera install
4. Access control door reader/controller
5. AV or speaker install
6. Low-voltage LED lighting install
7. Wide commercial facility photo

Pre-launch checklist:
- Test homepage on desktop and mobile.
- Click every navigation link.
- Confirm /services/, /industries/, and /contact/ still work.
- Confirm the sticky mobile CTA does not cover important content.
- Run Lighthouse in Chrome DevTools.
- Target performance score: 90+.
- Confirm reduced-motion mode shows all content without animation problems.
- Submit sitemap in Google Search Console after deploy.

Important credibility rule:
Do not add Licensed & Insured, certified platform claims, project numbers, testimonials, or named projects unless they are real and provable.
