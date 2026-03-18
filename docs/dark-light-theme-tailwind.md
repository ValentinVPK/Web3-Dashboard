## Dark & Light Theme in Tailwind CSS (v4)

### 1. Defining Theme Colors with CSS Variables

Colors are defined as CSS custom properties in two blocks in your CSS file:

```css
/* Light theme (default) */
:root {
  --background: oklch(1 0 0);        /* white */
  --foreground: oklch(0.145 0 0);    /* near-black */
  --primary: oklch(0.55 0.24 264);   /* purple */
  --card: oklch(1 0 0);              /* white */
  --muted-foreground: oklch(0.556 0 0); /* gray */
  /* ... more tokens */
}

/* Dark theme (activated by .dark class) */
.dark {
  --background: oklch(0.145 0 0);    /* near-black */
  --foreground: oklch(0.985 0 0);    /* near-white */
  --primary: oklch(0.55 0.24 264);   /* same purple (or different) */
  --card: oklch(0.205 0 0);          /* dark gray */
  --muted-foreground: oklch(0.708 0 0); /* lighter gray */
  /* ... same token names, different values */
}
```

**Key principle:** Both blocks define the **same variable names** with **different values**. The browser resolves the correct value based on which block is active.

### 2. Bridging CSS Variables to Tailwind (the `@theme inline` block)

Tailwind v4 doesn't automatically see raw CSS variables. The `@theme inline` block registers them as Tailwind colors:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-card: var(--card);
  --color-muted-foreground: var(--muted-foreground);
  /* ... maps --color-X to var(--X) */
}
```

This is what enables Tailwind utility classes like `bg-background`, `text-primary`, `border-card`, etc. **You define this once** — it doesn't change between themes since it just points to the variables.

### 3. Enabling Class-Based Dark Mode

By default, Tailwind v4 uses the `prefers-color-scheme` media query (follows OS setting). To enable **manual** theme switching, add this line:

```css
@custom-variant dark (&:is(.dark *));
```

This redefines the `dark:` variant to activate when the element is a descendant of an element with the `.dark` class, instead of relying on the OS preference.

### 4. How Theme Switching Works

Toggle the `dark` class on the `<html>` element:

```tsx
function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return <button onClick={toggleTheme}>{isDark ? "Light" : "Dark"}</button>;
}
```

To persist across page reloads, restore the preference on app load:

```tsx
// In main.tsx or a <script> in index.html (run before React renders to avoid flash)
if (localStorage.getItem("theme") === "dark") {
  document.documentElement.classList.add("dark");
}
```

**What happens when you toggle:**
- Adding `.dark` to `<html>` → browser resolves all `var(--X)` from the `.dark {}` block
- Removing `.dark` → browser resolves all `var(--X)` from `:root {}`
- Every component using token-based classes re-renders with the new colors automatically

### 5. Writing Theme-Aware Styles

#### The common case: just use the token class

```html
<p class="text-primary bg-card">Hello</p>
```

Since `--primary` and `--card` are defined in both `:root` and `.dark`, this **automatically** uses the correct color for each theme. No `dark:` prefix needed.

#### The edge case: one-off colors not in the token system

If you use a hardcoded Tailwind color (not a CSS variable token), it won't switch automatically. You need both variants:

```html
<div class="bg-white dark:bg-gray-900">...</div>
<span class="text-blue-500 dark:text-blue-300">...</span>
```

**Rule of thumb:** If the color comes from your variable system (`bg-primary`, `text-muted-foreground`, `border-card`), write it once. If it's a raw Tailwind color (`bg-white`, `text-blue-500`), you need the `dark:` variant.

### 6. Adding Custom Tokens Beyond the Defaults

You can extend the system with your own semantic tokens:

```css
:root {
  --success: oklch(0.72 0.19 155);    /* green */
  --warning: oklch(0.80 0.15 85);     /* amber */
}

.dark {
  --success: oklch(0.65 0.17 155);
  --warning: oklch(0.75 0.13 85);
}
```

Then register them in the theme block:

```css
@theme inline {
  --color-success: var(--success);
  --color-warning: var(--warning);
}
```

Now `text-success`, `bg-warning`, `border-success` all work and auto-switch with the theme.

### Summary

| Concept | Mechanism |
|---|---|
| Define colors | CSS variables in `:root` (light) and `.dark` (dark) |
| Register with Tailwind | `@theme inline` maps `--color-X` to `var(--X)` |
| Enable class-based toggle | `@custom-variant dark (&:is(.dark *))` |
| Switch themes | Toggle `.dark` class on `<html>` |
| Persist preference | `localStorage` |
| Token-based classes | Write once (`text-primary`) — auto-switches |
| Hardcoded colors | Need both variants (`bg-white dark:bg-gray-900`) |
