import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import Post from "../../../models/post";
import verifyToken from "../../../utils/verifyjwt";

export async function POST(req) {
  await connectToDB();

  try {
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

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { title, content, imageUrl } = await req.json();

    const post = new Post({
      title,
      content,
      imageUrl,
      author: decoded.userId,
    });

    await post.save();

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
