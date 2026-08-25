# Thinking Like an Economist — website

One self-contained file: `index.html`. No build step, no dependencies —
open it directly in a browser, or serve the folder with any static file
server. All routing happens client-side via the URL hash (`#/games`,
`#/games/trade-game/quiz`, etc.), so it also works as a single Artifact
publish or a GitHub Pages site with zero changes.

## Structure

Everything lives in `index.html`, in three parts:

1. `<style>` — design tokens (palette, type, layout) and components.
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
  stats: { conditions: 0, categories: 0, quiz: 0, classSize: "..." }
}
```

It appears on the homepage and Games page automatically. Then give it the
same four resources the trade game has, by extending these render
functions for the new id: `renderTeachingNote`, `renderDebriefNote`,
`renderStudentNote`, and adding an entry to `QUIZZES` keyed by the game's
id (an array of `{id, q, options, correct, explain}` objects — see the
trade game's for the shape). Each resource is optional; a game with none
of them yet just needs `renderGameOverview` to work, which it will as
soon as it's in `GAMES`.

## Adding a new topic

Add to `var TOPICS = [...]`:

```js
{
  title: "Topic name",
  description: "What this topic covers.",
  games: ["your-game-id"], // must match a key in GAMES
}
```

## The homepage subway map

`subwayMap()` hand-draws the dashboard as inline SVG — one line per topic,
with each game as an interchange station and its notes as stops on a
spur. It's currently sized for one line; when a second topic gets its own
game, extend the SVG with a second colored line rather than reusing the
"under construction" dashed placeholder line.

## Publishing

- **This session's Artifact link** is a snapshot for previewing — it does
  not update itself when you edit this file. Ask for a redeploy after a
  content change.
- **GitHub Pages** — push this repo to GitHub, then in Settings → Pages,
  point it at the branch/folder containing `index.html`.
- **Netlify/Vercel** — drag-and-drop this folder, or connect the git repo.

No server-side code anywhere, so any static host works as-is.
