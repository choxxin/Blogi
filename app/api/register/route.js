import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectToDB();
  try {
    const { name, username, password } = await req.json();

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      name,
      username,
      password,
    });

    await user.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
