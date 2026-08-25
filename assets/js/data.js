/*
  Thinking Like an Economist — content data
  ------------------------------------------
  Add a new game or topic by adding an object to the arrays below.
  No other file needs to change — games.html and topics.html render
  whatever is listed here automatically.
*/

const GAMES = [
  {
    title: "The International Trade Game",
    tagline: "A live classroom simulation of comparative advantage, tariffs, and trade policy.",
    description:
      "Students are split into six \"countries\" with different resource endowments and must " +
      "manufacture and trade paper shapes for profit, while the instructor introduces real-time " +
      "conditions — tariffs, subsidies, embargoes, quotas — and watches how trade patterns shift. " +
      "Based on John Sloman's International Trade Game (Economics Network, 2002).",
    course: "ECON102 · Ways of Thinking Like an Economist",
    format: "Live classroom (45 min) · phones + projector",
    status: "live",
    statusLabel: "Ready to run",
    tags: ["Comparative advantage", "Trade policy", "Classroom simulation"],
    link: null, // paste the deployed Google Apps Script web app URL here when ready
    linkLabel: "Launch (link coming soon)",
  },
];

const TOPICS = [
  {
    title: "International Trade",
    description:
      "Comparative advantage, tariffs, subsidies, quotas, and why countries trade at all — " +
      "explored hands-on through The International Trade Game.",
    games: ["The International Trade Game"],
  },
];
