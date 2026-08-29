# CLAUDE.md

## Commands

- Serve locally: `node .claude/server.mjs` → `http://127.0.0.1:8765`
- Without Node: `python3 -m http.server 8765`
- Build: none. Test: none. Lint: none. There is no `package.json` and no `.github/`.

Runtime `fetch` calls fail on `file://`, so open the site over HTTP, not by
double-clicking `index.html`.

## Rules

- No package manager, bundler, or framework. Do not add `package.json`.
- `wpdev.html` is standalone: Tailwind CDN plus its own inline `<style>` and
  `<script>`. It loads neither `css/style.css` nor `js/script.js` — do not wire it up.
- `websites.html` loads `css/style.css` but no JavaScript at all.
- `css/style.css` is shared by six pages. Single-page styling belongs in that page's
  own inline `<style>` block, which is loaded after the stylesheet link.
- `parmacyShop/` is misspelt on purpose. Image paths depend on the spelling — do not
  "fix" it.
- `Animation/` is a strict sequence, `222_000.png` through `222_051.png`. Renaming or
  renumbering a frame breaks `wpdev.html`.
- `videos/*` is gitignored except `intro.mp4`, `README.md` and `*.vtt`. Never commit a
  raw recording; GitHub rejects files over 100 MB.
- Live-stat fetches in `js/script.js` swallow errors on purpose. The hardcoded numbers
  in `index.html` are the intended fallback — keep them plausible.
- `images/README.md` is stale and describes files that do not exist.

## Read first

- `index.html` — the hub; every shared pattern appears here first.
- `css/style.css` — design tokens in `:root`, then all shared components.
- `js/script.js` — the four IIFEs that drive every page.

Architecture: see ARCHITECTURE.md — read before structural changes
