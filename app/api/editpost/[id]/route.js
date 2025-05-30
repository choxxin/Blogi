import { NextResponse } from "next/server";
import { connectToDB } from "../../../lib/db";
import Post from "../../../../models/post";
import verifyToken from "../../../../utils/verifyjwt";

// ✅ GET method — get post by ID
export async function GET(req, { params }) {
  await connectToDB();

  try {
    const { id } = params;

    const post = await Post.findById(id).populate("author", "username name");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ POST method — update post by ID
export async function POST(req, { params }) {
  await connectToDB();

  try {
    const { id } = params;

    // Get token from cookies
    const cookieHeader = req.headers.get("cookie");
    const cookies = cookieHeader?.split(";").reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split("=");
      acc[name] = value;
      return acc;
    }, {});

    const token = cookies?.token;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { title, content, imageUrl } = await req.json();

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        imageUrl,
        author: decoded.userId,
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (err) {
    console.error("Error updating post:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
