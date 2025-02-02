import mongoose from "mongoose";
import bcrypt from "bcrypt"; // For password hashing

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  picture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to hash passwords before storing them
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
