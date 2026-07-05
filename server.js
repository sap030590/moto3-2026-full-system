const express = require("express");
const fs = require("fs");
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

// Root
app.get("/", (req, res) => {
  res.json({ status: "Moto3 FULL AUTO SYSTEM READY" });
});

// Calendar
app.get("/race", (req, res) => {
  res.json(read("./calendar.json"));
});

// Riders
app.get("/riders", (req, res) => {
  res.json(read("./riders_2026.json"));
});

// Standings (sementara pakai standings-generator.js kalau ada)
app.get("/standings", (req, res) => {
  try {
    // Kalau ada file standings.json
    if (fs.existsSync("./standings.json")) {
      res.json(read("./standings.json"));
    } 
    // Kalau tidak, coba generate
    else if (fs.existsSync("./standings-generator.js")) {
      const { generateStandings } = require("./standings-generator.js");
      const data = generateStandings ? generateStandings() : { message: "Standings generator ready" };
      res.json(data);
    } else {
      res.json({ message: "Standings belum tersedia" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Results per session (baru)
app.get("/results", (req, res) => {
  try {
    if (fs.existsSync("./results.json")) {
      res.json(read("./results.json"));
    } else {
      res.json({ message: "Results belum tersedia. Jalankan scraper dulu." });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Moto3 system running on port ${PORT}`);
});
