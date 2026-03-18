## Fonts in Web Projects

### How Fonts Work in a Vite + Tailwind Project

Browsers need `@font-face` declarations to know where to find font files and how to use them. There are three common approaches to providing fonts:

1. **CDN (e.g., Google Fonts)** — a `<link>` tag in your HTML that loads fonts from an external server
2. **npm package (e.g., Fontsource)** — font files bundled as a dependency in `node_modules`
3. **Local files** — manually downloaded `.woff2` files placed in your project's `assets` folder

---

### Approach 1: CDN (Google Fonts)

```html
<!-- In index.html -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Advantages:**
- Easiest setup — one line in HTML
- Google's CDN is globally distributed and fast
- Browser may already have the font cached from other sites

**Disadvantages:**
- External network dependency — if Google Fonts is down or blocked (e.g., in China), fonts fail to load
- Privacy concerns — Google tracks font requests
- Render-blocking — the browser may wait for the font before painting text (FOIT — Flash of Invisible Text)
- Less control over which formats and subsets are loaded

---

### Approach 2: npm Package (Fontsource)

```bash
pnpm add @fontsource-variable/inter
```

```css
/* In your CSS */
@import "@fontsource-variable/inter";
```

The npm package bundles the `.woff2` font files directly inside `node_modules`. The CSS import loads a stylesheet from that package which declares the `@font-face` rules pointing to those local font files. Vite then bundles everything — no external network requests, no CDN dependency.

**Advantages:**
- Zero manual setup — install the package and add one CSS import
- Auto-bundled by Vite — correct paths, hashing, and cache-busting handled automatically
- Easy to update — `pnpm update` gets new font versions
- Self-hosted — no external network requests, no privacy concerns
- Variable fonts supported out of the box (all weights in one file)

**Disadvantages:**
- Adds to `node_modules` size
- You're dependent on the Fontsource package being maintained
- Less control over exactly which font subsets/formats are included

---

### Approach 3: Local Files (Manual Download)

1. Download `.woff2` files (e.g., from [Google Fonts](https://fonts.google.com/) or [Font Squirrel](https://www.fontsquirrel.com/))
2. Place them in your project (e.g., `src/assets/fonts/`)
3. Write `@font-face` declarations manually:

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./assets/fonts/Inter-Regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('./assets/fonts/Inter-Bold.woff2') format('woff2');
}

/* Repeat for each weight you need... */
```

**Advantages:**
- Full control — you pick exactly which `.woff2` files, subsets, and weights to include
- No third-party dependency
- Can optimize file size by only including the exact character subsets needed (e.g., Latin only)
- Works in offline/air-gapped environments without npm
- Required for custom or licensed fonts not available on npm

**Disadvantages:**
- Manual setup — you write the `@font-face` declarations yourself and manage file paths
- You handle updates manually if the font gets a new version
- Easy to misconfigure paths, especially across dev/prod builds
- More boilerplate, especially with multiple weights

---

### Connecting Fonts to Tailwind CSS

Regardless of which approach you use to load the font, Tailwind needs to know about it. In Tailwind v4, you register it in the `@theme inline` block:

```css
@theme inline {
  --font-sans: 'Inter Variable', sans-serif;
}
```

This makes Tailwind's `font-sans` utility (and the default body font) use Inter. The `sans-serif` fallback ensures text is still readable while the custom font loads.

### Variable Fonts vs Static Fonts

**Static fonts** have one file per weight (Inter-Regular.woff2, Inter-Bold.woff2, etc.). You need separate `@font-face` declarations and separate file downloads for each weight.

**Variable fonts** pack all weights (and sometimes widths, slants) into a single file. One `@font-face`, one download, and you can use any weight from 100 to 900:

```css
/* With a variable font, this just works */
.light { font-weight: 300; }
.normal { font-weight: 400; }
.semibold { font-weight: 600; }
.bold { font-weight: 700; }
```

Variable fonts are generally preferred for modern projects — fewer network requests and more flexibility. Fontsource's `@fontsource-variable/*` packages provide variable font versions.

---

### Which Approach to Use?

| Scenario | Recommended approach |
|---|---|
| Most web apps (like this project) | **npm package (Fontsource)** — least boilerplate, self-hosted |
| Custom/licensed font not on npm | **Local files** — only option |
| Quick prototype or static HTML | **CDN** — fastest to set up |
| Performance-critical, minimal bundle | **Local files** — full control over subsets and file size |
| Privacy-sensitive (GDPR compliance) | **npm package or local files** — no external requests |
