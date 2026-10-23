# SKRAM website

A one-page band website. Open `index.html` in a browser to view it.

## Files

| File | What it does |
|---|---|
| `index.html` | All content and text (in Dutch). Each section is marked with a `<!-- ===== NAME ===== -->` comment. |
| `css/style.css` | All styling. Colours and fonts are set at the top under `:root`. |
| `js/main.js` | Mobile menu, scroll effects, photo lightbox and sending the contact form. |
| `images/` | Logo, hero photo (`hero-band.jpg`), video poster, `bandleden/` and `galerij/`. |

## Common edits

- **Band members:** in `index.html`, under `DE BAND`, each member is an `<article class="member">`. Photos are cropped 4:5 web versions in `images/bandleden/`; the originals are in `Piccas_bandleden/`.
- **Gallery photos:** under `MEDIA`, each photo is a `<button class="gallery-item reveal">` with an `<img>` inside (photos in `images/galerij/`). Clicking opens it large. The grid has 3 columns: `gallery-wide` makes a tile 2×2, `gallery-tall` makes it 1×2, the rest are 1×1. The current 6 photos (two wide, four small) fill it exactly; when adding photos, keep the number of cells a multiple of 3 to avoid gaps. On phones, wide photos become full-width landscape tiles and the rest are squares. To change which part of a photo shows in its tile, add e.g. `style="object-position: center 55%"` to the `<img>`.
- **Hero photo:** `images/hero-band.jpg` (from `Piccas_bandleden/Band (groepsfoto).webp`). It's shown large on the right and fades into the dark background (on phones it sits between the logo and the text); a blurred copy fills the background. Change both `src`s in the `HERO` section to swap it.
- **Promo video:** replace the `video-placeholder` div (including the poster image inside it) with the YouTube embed `<iframe>` (YouTube → Share → Embed).
- **Shows:** in the `AGENDA` section, copy the commented-out example, fill it in, and remove the `shows-empty` block.
- **Social links:** in the footer (Instagram, Facebook, TikTok). For YouTube/Spotify later, copy an `<li>` in `.socials` and change the link and icon.
- **Logo:** `images/logo.png` is the white mark from `Piccas_bandleden/Logo Skram.jpg` on a transparent background, used in the nav, hero and footer. Favicons are `images/favicon.png` and `images/apple-touch-icon.png`.
- **Accent colour:** the red from the logo, set by `--color-accent` (with `--color-accent-hover`, `--color-accent-text` for small text, and `--color-accent-rgb`) in `css/style.css`.

## Contact form

The form sends via [Web3Forms](https://web3forms.com) (free). To activate it:
1. Go to web3forms.com, enter the band's email address, and you'll receive an access key.
2. In `index.html`, replace `VUL-HIER-DE-SLEUTEL-IN` with that key.

Until then, the form shows a message pointing visitors to the email address.

## After changing CSS or JS

In `index.html`, bump the `?v=2` after `css/style.css` and `js/main.js` (e.g. to `?v=3`) so visitors' browsers load the new version instead of a cached one.
