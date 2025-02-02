import express from "express";
import Player from "../models/player.js";

const router = express.Router();

// ✅ Create a new player
router.post("/", async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a specific player by username
router.get("/:username", async (req, res) => {
  try {
    const player = await Player.findOne({ username: req.params.username });
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update player class level
router.put("/:username/class", async (req, res) => {
  try {
    const { class_name, level, level_points } = req.body;
    const player = await Player.findOneAndUpdate(
      { username: req.params.username, "classes.class_name": class_name },
      { $set: { "classes.$.level": level, "classes.$.level_points": level_points } },
      { new: true }
    );
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
