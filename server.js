
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const dbPath = path.join(__dirname, "db", "users.json");

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(dbPath));
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Game list endpoint
app.get("/api/games", (req, res) => {
  res.json(["Baccarat", "Slots", "Color Game", "Fishing", "Roulette"]);
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
