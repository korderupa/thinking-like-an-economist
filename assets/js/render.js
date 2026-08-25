/* Renders GAMES / TOPICS (from data.js) into the page. */

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderGames() {
  const mount = document.getElementById("games-grid");
  if (!mount) return;

  if (!GAMES.length) {
    mount.innerHTML = `<div class="empty-state">More games coming soon.</div>`;
    return;
  }

  mount.innerHTML = GAMES.map((g) => {
    const statusClass = g.status === "live" ? "status-live" : "status-dev";
    const actionHtml = g.link
      ? `<a class="btn" href="${escapeHtml(g.link)}" target="_blank" rel="noopener">Launch the game →</a>`
      : `<span class="btn disabled">${escapeHtml(g.linkLabel || "Coming soon")}</span>`;

    return `
      <article class="card">
        <span class="tag ${statusClass}">${escapeHtml(g.statusLabel)}</span>
        <h3 style="margin-top:.5em">${escapeHtml(g.title)}</h3>
        <p class="muted">${escapeHtml(g.tagline)}</p>
        <p>${escapeHtml(g.description)}</p>
        <div class="tags">
          ${g.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
        </div>
        <p class="muted mono" style="font-family:var(--mono);font-size:.85rem">
          ${escapeHtml(g.course)}<br>${escapeHtml(g.format)}
        </p>
        <div class="spacer"></div>
        <div class="card-actions">${actionHtml}</div>
      </article>
    `;
  }).join("");
}

function renderTopics() {
  const mount = document.getElementById("topics-grid");
  if (!mount) return;

  if (!TOPICS.length) {
    mount.innerHTML = `<div class="empty-state">More topics coming soon.</div>`;
    return;
  }

  mount.innerHTML = TOPICS.map((t) => {
    const gameLinks = (t.games || [])
      .map((title) => `<li>${escapeHtml(title)}</li>`)
      .join("");

    return `
      <article class="card">
        <h3>${escapeHtml(t.title)}</h3>
        <p>${escapeHtml(t.description)}</p>
        ${
          gameLinks
            ? `<p class="muted" style="margin-bottom:.3em">Explored through:</p><ul class="muted">${gameLinks}</ul>`
            : ""
        }
      </article>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderGames();
  renderTopics();
});
