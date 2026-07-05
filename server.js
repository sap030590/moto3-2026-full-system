const express = require("express");
const fs = require("fs-extra");
const app = express();
const PORT = process.env.PORT || 3000;

const read = (f) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch (e) {
    return { error: `File ${f} not found` };
  }
};

app.get("/", (req, res) => res.json({ status: "Moto3 READY" }));

app.get("/race", (req, res) => res.json(read("./calendar.json")));
app.get("/riders", (req, res) => res.json(read("./riders_2026.json")));
app.get("/standings", (req, res) => res.json(read("./standings.json")));

app.get("/results/:session", (req, res) => {
  res.json(read("./standings.json"));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
