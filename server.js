const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const read = (f) => JSON.parse(fs.readFileSync(f));

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

/* RESULTS */
app.get("/results", (req, res) => {
  res.json(read("./results.json"));
});

/* STANDINGS */
app.get("/standings", (req, res) => {
  res.json(read("./standings.json"));
});

app.listen(PORT, () => {
  console.log("Moto3 system running");
});
