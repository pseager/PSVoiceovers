# Paul Seager Voice Talent Website

A responsive React site for Paul Seager / PS Voiceovers LLC, built with Webpack for broad browser support and fully self-hosted assets.

## Features

- Webpack production build with Babel transpilation and core-js polyfills
- All images, audio demos, fonts, and icons served from the same site (no external CDN dependencies)
- Sticky-style header with social links, navigation, and contact info
- Mobile-friendly collapsible menu
- Hero section with logo, headshot, and seven audio demos
- Custom audio player with play/pause, seek, progress bar, and download
- Featured YouTube videos grid
- About, contact, and footer sections
- Responsive layout for desktop, tablet, and mobile

## Requirements

- [Node.js](https://nodejs.org/) 18 or newer

## Getting Started

```bash
cd ~/Projects/paul-seager-voice
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production Build

```bash
npm run build
```

Static files are output to `dist/`. Deploy the entire `dist/` folder to any static host (Netlify, Vercel, S3, Apache, Nginx, etc.).

Preview the production build locally:

```bash
npm run preview
```

## Deploy to GitHub Pages (psvoiceovers.com)

This repo includes `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages on every push to `main`.

### One-time GitHub setup

1. Create a new **public** repository on GitHub (for example `psvoiceovers-website`).
2. Push this project:

```bash
git remote add origin https://github.com/YOUR_USERNAME/psvoiceovers-website.git
git push -u origin main
```

3. In the repo on GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Wait for the **Deploy to GitHub Pages** workflow to finish in the **Actions** tab.
6. Under **Custom domain**, enter `psvoiceovers.com` and save.

### One-time GoDaddy DNS setup

In GoDaddy DNS for `psvoiceovers.com`, add:

| Type | Host | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `YOUR_USERNAME.github.io` |

Remove any conflicting forwarding or old A/CNAME records. After DNS propagates, enable **Enforce HTTPS** in GitHub Pages settings.

## SEO and Google Search Console

The site includes optimized meta tags, Open Graph/Twitter cards, JSON-LD structured data, `robots.txt`, and `sitemap.xml`.

### Submit your site to Google

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add property** → enter `https://psvoiceovers.com`
3. Verify ownership (HTML tag or DNS — DNS is easy if you already use GoDaddy)
4. After verification, open **Sitemaps** in the left menu
5. Submit: `https://psvoiceovers.com/sitemap.xml`
6. Over the next few weeks, check **Performance** to see which searches bring visitors

Also link to `https://psvoiceovers.com` from LinkedIn, YouTube, and any voice-over directories you use.

## Browser Support

Targets browsers used by more than 0.5% of users, plus the last two versions of major browsers and Firefox ESR. JavaScript is transpiled via Babel with `core-js` polyfills injected as needed.

## Project Structure

- `src/assets/images/` — logo, headshot, and studio background
- `src/assets/audio/` — voice demo MP3 files
- `src/data/siteData.js` — site content and local asset imports
- `src/components/` — React UI components
- `webpack.config.js` — build and dev server configuration
- `dist/` — production build output (generated)

## Updating Assets

Replace files in `src/assets/` and rebuild. Webpack hashes filenames in production for cache busting.
