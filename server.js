import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import playerRoutes from "../routes/playerRoutes.js";
import questRoutes from "../routes/questRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));


  
app.use("/app/api/players", playerRoutes);
app.use("/app/api/quests", questRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
