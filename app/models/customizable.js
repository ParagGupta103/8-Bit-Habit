import mongoose from "mongoose";

const CustomizableSchema = new mongoose.Schema({
  item_id: { type: Number, required: true, unique: true },
  item_name: { type: String, required: true },
});

const Customizable = mongoose.model("Customizable", CustomizableSchema);

export default Customizable;
