import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import Post from "../../../models/post";
import User from "../../../models/user"; // ✅ IMPORTANT: Import this!

export async function GET(req) {
  await connectToDB();

  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("author", "username name"); // Now "User" is registered ✅

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Error in GET /api/getallpost:", err); // Log real error
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
