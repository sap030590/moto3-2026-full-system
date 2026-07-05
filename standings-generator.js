const fs = require("fs-extra");

// Data dummy sementara (karena results.json belum ada)
const results = [
  { pos: "1", rider: "P. Acosta" },
  { pos: "2", rider: "D. Alonso" },
  { pos: "3", rider: "D. Holgado" },
  { pos: "4", rider: "J. Rueda" },
  { pos: "5", rider: "A. Fernandez" },
  { pos: "6", rider: "I. Ortola" },
  { pos: "7", rider: "R. Rossi" },
  { pos: "8", rider: "T. Furusato" },
  { pos: "9", rider: "V. Rohid" },
  { pos: "10", rider: "J. Kelso" }
];

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

const output = Object.keys(standings)
  .map((rider, i) => ({
    pos: i + 1,
    rider: rider,
    points: standings[rider]
  }))
  .sort((a, b) => a.pos - b.pos);

fs.writeJsonSync("./standings.json", output, { spaces: 2 });
console.log("✅ Standings.json berhasil dibuat");
