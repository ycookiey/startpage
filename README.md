# Start Page

[日本語](README.ja.md)

The author's browser start page, served at <https://sp.ycookiey.com> from Cloudflare Pages. This repository holds the page itself, including the author's links.

## Features

- One `index.html` holds the CSS and the page script inline. No framework and no build step
- Search box at the top: typing anywhere on the page moves the input there. Fuzzy search over the links uses the [yfuzzy](https://github.com/ycookiey/yfuzzy) bundle, `yfuzzy.min.js`. Links opened often from the search box move up slightly in the results
- Enter opens the selected result. Input that looks like a URL opens that URL, and input that matches no link goes to a Google search
- After typing, press Esc and then `g`, `x` or `n` to send the input to Gemini, Grok or Nani. Typing the key and a space before the input, such as `g `, and pressing Enter does the same
- Icons of the links in the search results load from `favicons/<hostname>.png`, `.svg` or `.ico` once the browser is idle, and do not load when Save-Data is on
- A web app manifest and a service worker. The worker caches the page and its assets and serves them from the cache. When a new deployment is detected, a banner appears, and clicking it or pressing Enter in the empty search box loads the new version
- The Fraunces font is a self-hosted Latin subset. Light and dark themes follow the system setting

Links under `redirect.ycookiey.com/r/` need the author's sign-in, so they do not open for other visitors.

## License

The files written for this repository are under the MIT License ([LICENSE](LICENSE)). The bundled files below are under their own licenses:

- `yfuzzy.min.js`: MIT. It includes wanakana (MIT) and the Mozc romaji table (BSD-3-Clause)
- `fonts/fraunces-latin.woff2`: Fraunces, [SIL Open Font License 1.1](https://openfontlicense.org/)
- `favicons/`: logos of the linked sites. Their owners hold the rights
