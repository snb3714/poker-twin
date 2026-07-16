# Poker Twin — install on your phone

Everything is static files. Any static host works; GitHub Pages is free and takes ~3 minutes.

## Deploy (GitHub Pages)
1. Create a new repo (e.g. `poker-twin`), public or private with Pages enabled.
2. Upload ALL files in this folder to the repo root (drag-and-drop on github.com works).
3. Repo Settings → Pages → Source: "Deploy from a branch" → branch `main`, folder `/ (root)` → Save.
4. Wait ~1 minute. Your app is live at `https://<your-username>.github.io/poker-twin/`.

(Netlify/Vercel: drag this folder into their dashboard — same result.)

## Install on iPhone
1. Open the URL in **Safari** (must be Safari for Add to Home Screen to install as an app).
2. Share button → **Add to Home Screen** → Add.
3. Launch from the icon: full screen, no browser chrome, works offline after first load.

## Install on Android
1. Open the URL in Chrome.
2. Menu (⋮) → **Add to Home screen** (Chrome may also show an "Install app" prompt).

## Notes
- Data (sessions, hands, settings) is stored in the browser's localStorage **on your device**.
  It survives closing the app, but clearing Safari/Chrome website data will erase it —
  use Export in the app to back up JSON periodically.
- Updating the app later: replace `index.html` in the repo and bump the cache name in `sw.js`
  (`poker-twin-v1` → `v2`) so phones pick up the new version.
