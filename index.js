const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

// Test GET endpoint to verify server is running
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Example GET endpoint
app.get("/api", (req, res) => {
  const exampleData = {
    message: "Hello from the /api endpoint!",
    success: true,
    data: {
      name: "Example",
      description: "This is an example response from the /api endpoint.",
    },
  };
  res.json(exampleData);
});

// Endpoint to set signal status
app.post("/api/setSignal", (req, res) => {
  console.log("Received request:", req.body);
  const { id, status } = req.body;
  const validStatuses = ["green", "amber", "red"];

  if (!validStatuses.includes(status)) {
    console.log("Invalid status:", status);
    return res.status(400).send({ error: "Invalid status" });
  }

  const signal = signals.find((s) => s.id === id);
  if (signal) {
    signal.status = status;
    console.log("Updated signal:", signal);
    return res.status(200).send(signal);
  } else {
    console.log("Signal not found:", id);
    return res.status(404).send({ error: "Signal not found" });
  }
});

// Endpoint to get signal by id
app.get("/api/getSignal/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log("Fetching signal with id:", id);
  const signal = signals.find((s) => s.id === id);
  if (signal) {
    console.log("Found signal:", signal);
    return res.status(200).send(signal);
  } else {
    console.log("Signal not found:", id);
    return res.status(404).send({ error: "Signal not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
