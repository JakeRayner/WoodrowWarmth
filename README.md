# Woodrow Warmth — website rebuild

A modern rebuild of [woodrow-warmth.co.uk](https://www.woodrow-warmth.co.uk/) for
**Woodrow Warmth UK Ltd** — specialists in underfloor heating & screed, Congleton, Cheshire.

Same content and functionality as the original four-page site (Home, Services,
Projects, Contact), redesigned as a fast single-page static site with a
"warmth from the ground up" visual concept: dark warm-toned ground, ember/amber
heat accents, an animated serpentine heating-pipe hero, and a floor build-up
diagram.

## Structure

```
woodrow-warmth/
├── index.html      # all four sections: home, services, projects, contact
├── css/style.css   # design system (tokens at the top)
└── js/main.js      # pipe animation, scroll reveals, mobile nav, enquiry form
```

No build step, no dependencies — open `index.html` in a browser or host the
folder on any static host (Netlify, Cloudflare Pages, GitHub Pages…).

## Notes

- **Fonts**: Bricolage Grotesque + Figtree via Google Fonts, with system
  fallbacks if the CDN is unreachable.
- **Enquiry form**: composes an email to `info@woodrowwarmth.co.uk` via the
  visitor's mail app (the original Wix form emailed the office too). To submit
  without a mail client, point the form at a service like Formspree/Basin:
  swap the JS submit handler for `action="https://formspree.io/f/<id>" method="POST"`.
- **Content** was carried over from the live site: services copy (underfloor
  heating, flowing screed, servicing & repairs), the 15+ years / 25% efficiency /
  24–48 h screed facts, sectors served, and all contact details & social links.
