import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/models/mongodb";
import { User } from "@/lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // For generating tokens

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Connect to MongoDB
    await connectToDB();

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
