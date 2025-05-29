import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import Post from "../../../../models/post";

export async function GET(req, { params }) {
  await connectToDB();

  try {
    const { id } = params;

    // Find the post by ID and populate author information
    const post = await Post.findById(id).populate("author", "username name");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
