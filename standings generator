const fs = require("fs-extra");

const results = require("./results.json");

const pointsMap = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const standings = {};

results.forEach(r => {
  const pos = parseInt(r.pos);

  if (!standings[r.rider]) {
    standings[r.rider] = 0;
  }

  if (pos >= 1 && pos <= 15) {
    standings[r.rider] += pointsMap[pos - 1];
  }
});

const output = Object.keys(standings).map((rider, i) => ({
  position: i + 1,
  rider,
  points: standings[rider]
}));

fs.writeJsonSync("./standings.json", output, { spaces: 2 });

console.log("Standings updated");
