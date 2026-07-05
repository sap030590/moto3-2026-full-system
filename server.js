const express = require("express");
const fs = require("fs-extra");
const app = express();
const PORT = process.env.PORT || 3000;

const read = (f) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    console.error(`File not found: ${f}`);
    return { error: `File ${f} not found` };
  }
};

app.get("/", (req, res) => {
  res.json({ status: "Moto3 FULL AUTO SYSTEM READY" });
});

/* CALENDAR */
app.get("/race", (req, res) => {
  res.json(read("./calendar.json"));
});

/* RIDERS */
app.get("/riders", (req, res) => {
  res.json(read("./riders_2026.json"));
});

/* STANDINGS */
app.get("/standings", (req, res) => {
  try {
    if (fs.existsSync("./standings.json")) {
      res.json(read("./standings.json"));
    } else {
      res.json({ message: "Standings belum dibuat. Jalankan standings-generator.js" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* RESULTS PER SESSION */
app.get("/results/:session", (req, res) => {
  const session = req.params.session.toLowerCase();
  console.log(`[REQUEST] Hasil session: ${session}`);

  try {
    if (fs.existsSync("./results.json")) {
      const allResults = read("./results.json");
      // Untuk sementara tampilkan semua data (bisa difilter nanti)
      res.json(allResults);
    } else {
      res.json({ message: "results.json belum ada. Jalankan scraper.js" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Moto3 system running on port ${PORT}`);
});
