const express = require("express");
const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Express on Vercel. \n However your pointing at nothing");
});

app.get("/home", (req, res) => {
  res.status(200).json("Welcome to the home page");
});

app.listen(PORT, () => {
  console.log("Running on port: ", PORT);
});

module.exports = app;
