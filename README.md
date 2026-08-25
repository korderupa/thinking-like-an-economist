# Thinking Like an Economist — website

Plain static HTML/CSS/JS. No build step, no dependencies — open `index.html`
directly in a browser, or serve the folder with any static file server.

## Structure

```
website/
  index.html      Home
  topics.html     Topics (rendered from assets/js/data.js)
  games.html      Games (rendered from assets/js/data.js)
  about.html      About Rupa Korde + the project
  terms.html      Terms of Use
  assets/
    css/style.css
    js/data.js    <- edit this to add a game or topic
    js/render.js  turns data.js into the cards on games.html / topics.html
    img/          photos go here
```

## Adding a new game

Open `assets/js/data.js` and add an object to the `GAMES` array, e.g.:

```js
{
  title: "Name of the game",
  tagline: "One-sentence hook.",
  description: "A paragraph on what it teaches and how it's played.",
  course: "Course/context it was built for",
  format: "Live classroom / browser game / worksheet, and how long it takes",
  status: "live",            // or "dev" while you're still building it
  statusLabel: "Ready to run", // or "In development"
  tags: ["Concept one", "Concept two"],
  link: "https://...",        // the URL students/instructors use to launch it, or null
  linkLabel: "Coming soon",   // shown instead of a link when link is null
}
```

It will show up on both the homepage and the Games page automatically —
no HTML editing needed.

## Adding a new topic

Same idea, in the `TOPICS` array:

```js
{
  title: "Topic name",
  description: "What this topic covers.",
  games: ["Name of a game that teaches it"], // must match a GAMES title
}
```

## Publishing

Nothing is live until you push it somewhere. When ready:

- **GitHub Pages** — push this repo to GitHub, then in the repo Settings →
  Pages, set the source to the branch/folder containing this site.
- **Netlify/Vercel** — drag-and-drop this folder, or connect the git repo.

The site has no server-side code, so any static host works.
