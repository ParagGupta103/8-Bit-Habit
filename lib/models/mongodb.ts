import mongoose from "mongoose";

export async function connectToDB() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error("Please add MONGODB_URI to .env.local");
  }

  // Now that we've checked, create a new constant
  // TS will infer this is just a string, never undefined
  const dbUri = MONGODB_URI;

  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(dbUri);
}
