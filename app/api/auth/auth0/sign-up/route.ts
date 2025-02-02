import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/models/mongodb";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Connect to MongoDB
    await connectToDB();

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
