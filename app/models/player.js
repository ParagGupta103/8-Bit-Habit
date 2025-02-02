import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  level: { type: Number, default: 1 },
  level_points: { type: Number, default: 0 },
});

const CustomizableSchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  item_id: { type: Number, required: true, unique: true },
});

const PlayerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  classes: [ClassSchema],
  customizables: [CustomizableSchema],
});

const Player = mongoose.model("Player", PlayerSchema);

export default Player;
