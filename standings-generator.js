const fs = require("fs-extra");

// List Rider Moto3 2026 (dari gambar kamu)
const results = [
  { pos: "1", rider: "Edie O'Shea" },
  { pos: "2", rider: "Joel Kelso" },
  { pos: "3", rider: "Veda Pratama" },
  { pos: "4", rider: "Zen Mitani" },
  { pos: "5", rider: "Adrián Fernández" },
  { pos: "6", rider: "Guido Pini" },
  { pos: "7", rider: "Nicola Carraro" },
  { pos: "8", rider: "Jesús Ríos" },
  { pos: "9", rider: "Leo Rammerstorfer" },
  { pos: "10", rider: "Casey O'Gorman" },
  { pos: "11", rider: "Máximo Quiles" },
  { pos: "12", rider: "Marco Morelli" },
  { pos: "13", rider: "Adrián Cruces" },
  { pos: "14", rider: "Scott Ogden" },
  { pos: "15", rider: "Cormac Buchanan" },
  { pos: "16", rider: "Ruché Moodley" },
  { pos: "17", rider: "Ryusei Yamanaka" },
  { pos: "18", rider: "Hakim Danish" },
  { pos: "19", rider: "Matteo Bertelle" },
  { pos: "20", rider: "Joel Esteban" },
  { pos: "21", rider: "David Almansa" },
  { pos: "22", rider: "David Muñoz" },
  { pos: "23", rider: "Brian Uriarte" },
  { pos: "24", rider: "Álvaro Carpe" },
  { pos: "25", rider: "Rico Salmela" },
  { pos: "26", rider: "Valentin Perrone" }
  // Tambahkan rider lain kalau ada
];

const pointsMap = [25, 20, 16, 13, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const standings = {};

results.forEach(r => {
  const pos = parseInt(r.pos);
  if (isNaN(pos)) return;

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
console.log("✅ Standings.json berhasil dibuat dengan", output.length, "pembalap Moto3");
