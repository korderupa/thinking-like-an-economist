# Thinking Like an Economist — website

One self-contained file: `index.html`. No build step, no dependencies —
open it directly in a browser, or serve the folder with any static file
server. All routing happens client-side via the URL hash (`#/games`,
`#/games/the-lake/round-cards`, etc.), so it also works as a single
Artifact publish or a GitHub Pages site with zero changes.

## Structure

Everything lives in `index.html`, in three parts:

1. `<style>` — design tokens (palette, type, layout) and components,
   including the accordion and tabs components (see below).
2. Page skeleton — sticky header/ticker, `<main id="app">`, footer.
3. `<script>` — data, then one render function per page, then a small
   hash-based router that swaps `#app`'s contents.

```
website/
  index.html      Everything — see below for where to edit
  README.md       This file
  assets/img/     Photos (e.g. about-page portrait) go here
```

## Adding a new game

In the `<script>` block, find `var GAMES = { ... }` and add an entry:

```js
"your-game-id": {
  id: "your-game-id",
  title: "Name of the game",
  tagline: "One-sentence hook.",
  description: "A paragraph on what it teaches and how it's played.",
  course: "Course/context it was built for",
  format: "Live classroom / browser game / worksheet, and how long it takes",
  status: "live",              // or "dev" while still building it
  statusLabel: "Field-tested", // or "In development"
  tags: ["Concept one", "Concept two"],
  link: null,                  // the launch URL once deployed, or null
  linkLabel: "Coming soon",
  minutes: 0,                  // session length, used in the homepage ledger
  glance: [                    // shown as cards on the game's overview page
    { k: "Course", v: "..." },
    { k: "Format", v: "..." }
  ]
}
```

It appears on the homepage and Games page automatically (`gameCard()` and
`renderHome()`'s stat row both read `GAMES`/`QUIZZES` directly, no extra
wiring needed).

### Giving it resource pages (teaching note, debrief guide, quiz, etc.)

Each game defines **its own** resource names — they don't have to match
another game's. The Trade Game has Teaching Note / Debrief Note / Quiz /
Student Note; The Lake has Round Cards / Session Guide / Debrief Guide /
Lessons Learned. Two registries wire this up:

```js
// 1. The tabs shown on every page of this game (subNav()):
RESOURCE_NAV["your-game-id"] = [
  ["overview", "Overview"],           // always first, always "overview"
  ["your-slug", "Your Label"],
  ...
];

// 2. Which function renders each slug:
RESOURCE_PAGES["your-game-id"] = {
  "your-slug": renderYourFunction,
  ...
};
```

Write one `function renderYourFunction(id){ ... }` per resource — it gets
the game id and returns an HTML string, same as `renderGameOverview`. The
router (`route()`) already dispatches `#/games/<id>/<slug>` through
`RESOURCE_PAGES` automatically; nothing else needs to change.

For a quiz specifically, add an entry to `QUIZZES[id]` instead (an array
of `{id, q, options, correct, explain}` objects) and point that slug at
the existing generic `renderQuiz` — no new function needed.

## Adding a new topic

Add to `var TOPICS = [...]`:

```js
{
  title: "Topic name",
  description: "What this topic covers.",
  games: ["your-game-id"], // must match a key in GAMES
}
```

## Keeping pages interactive, not long scrolls

Two reusable components keep resource pages from becoming one long page to
scroll (or print) top to bottom:

- **`accordionHtml(items)`** — click-to-expand sections. Pass
  `[{title, html, open}]`; collapsed panels use a real `hidden` attribute
  (not just CSS), so a browser print only captures what's actually open
  on screen. Nesting one `accordionHtml(...)` call inside another item's
  `html` works fine (see The Lake's "Three repairs" section).
- **`tabsHtml(groupKey, items, keyFn, labelFn, panelFn, activeKey, syncAttr)`**
  — a row of pill buttons that swap the panel below. Used for The Lake's
  round selector (shared across Round Cards / Session Guide / Debrief
  Guide via `syncAttr: "round"` and the global `activeRound` variable, so
  picking Round 3 on one page keeps Round 3 selected when you click to
  another) and for the Trade Game's debrief category selector (no sync).

Both are wired by **one delegated click listener** near the bottom of the
script (`document.addEventListener("click", ...)`), not per-render — so a
new accordion or tabs block you add needs no extra JS, just the right
CSS classes (`.accordion-item` / `.accordion-header` / `.accordion-panel`,
or `.tabs` / `.tab-btn` / `.tab-panel`).

There's also a `@media print` rule that replaces the whole page with a
short redirect-to-the-site message — intentional, so the site can't be
casually printed or exported as one long document.

## The homepage subway map

`subwayMap()` hand-draws the dashboard as inline SVG — **one line per
topic, one station per game, nothing else.** Resource pages (notes,
guides, quizzes) are deliberately not shown on the map; they're one click
further in, off the game's own overview page. To add a third line for a
new topic, copy one of the two `<line>` + two `<a><circle>...</circle></a>`
blocks and give it a new stroke color token (see `--violet-line` /
`--stamp-line` etc. already defined, currently unused by the map).

## Publishing

- **This session's Artifact link** is a snapshot for previewing — it does
  not update itself when you edit this file. Ask for a redeploy after a
  content change.
- **GitHub Pages** — this repo is already pushed and serving from
  `main` at whatever URL Pages assigned it; just `git push` after an
  edit and it rebuilds within a minute or two.
- **Netlify/Vercel** — drag-and-drop this folder, or connect the git repo.

No server-side code anywhere, so any static host works as-is.
