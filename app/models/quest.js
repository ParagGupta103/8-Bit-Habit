import mongoose from "mongoose";

const QuestSchema = new mongoose.Schema({
  class_name: { type: String, required: true },
  level: { type: Number, required: true },
  quest_name: { type: String, required: true },
  quest_desc: { type: String, required: true },
  quest_title: { type: String, required: true },
});

const Quest = mongoose.model("Quest", QuestSchema);

export default Quest;
