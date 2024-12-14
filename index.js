const express = require("express");
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Express on Vercel. \n However your pointing at nothing");
});

app.get("/home", (req, res) => {
  res.status(200).json("Welcome to the home page");
});

let signals = [
  { id: 1, status: "green" },
  { id: 2, status: "amber" },
  { id: 3, status: "red" },
  { id: 4, status: "green" },
  { id: 5, status: "amber" },
  { id: 6, status: "red" },
  { id: 7, status: "green" },
  { id: 8, status: "amber" },
  { id: 9, status: "red" },
  { id: 10, status: "green" },
];

// Endpoint to set signal status
app.post("/api/setSignal", (req, res) => {
  const { id, status } = req.body;
  const validStatuses = ["green", "amber", "red"];
  if (!validStatuses.includes(status)) {
    return res.status(400).send({ error: "Invalid status" });
  }

  const signal = signals.find((s) => s.id === id);
  if (signal) {
    signal.status = status;
    return res.status(200).send(signal);
  } else {
    return res.status(404).send({ error: "Signal not found" });
  }
});

// Endpoint to get signal by id
app.get("/api/getSignal/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const signal = signals.find((s) => s.id === id);
  if (signal) {
    return res.status(200).send(signal);
  } else {
    return res.status(404).send({ error: "Signal not found" });
  }
});

app.listen(PORT, () => {
  console.log("Running on port: ", PORT);
});

module.exports = app;
