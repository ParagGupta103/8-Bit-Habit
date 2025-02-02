import express from "express";
import Quest from "../models/quest.js";

const router = express.Router();

// ✅ Create a new quest
router.post("/", async (req, res) => {
  try {
    const newQuest = new Quest(req.body);
    await newQuest.save();
    res.status(201).json(newQuest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all quests
router.get("/", async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json(quests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get quests by class name and level
router.get("/:class_name/:level", async (req, res) => {
  try {
    const quests = await Quest.find({ 
      class_name: req.params.class_name, 
      level: req.params.level 
    });
    res.json(quests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
