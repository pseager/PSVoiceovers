# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single, fully static React + Webpack site (no backend, no database, no external services, no secrets/env vars). It is the marketing/portfolio site for "Paul Seager / PS Voiceovers LLC".

Standard commands live in `package.json` (`scripts`) and `README.md`. Key points for running it here:

- **Dev server:** `npm run dev` serves the app on **http://localhost:5173** (port is fixed in `webpack.config.js` → `devServer.port`, with `hot` reload). `open` is disabled, so nothing auto-launches a browser.
- **Build:** `npm run build` outputs static files to `dist/`. The build prints bundle-size performance **warnings** (entrypoint exceeds 244 KiB due to self-hosted fonts/icons/audio) — these are expected and do not indicate failure.
- **Preview:** `npm run preview` runs `npx serve dist` to serve the production build.
- **No lint or test scripts exist** in this repo (no `lint`/`test` npm scripts, no test framework configured). Don't expect `npm test` to work.
- The "core functionality" to smoke-test is the custom audio player: load the page and click play on a voice demo (e.g. "Commercial Demo") and confirm the timer/progress bar advances.
