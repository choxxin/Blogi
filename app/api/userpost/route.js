import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import Post from "../../../models/post";
import verifyToken from "../../../utils/verifyjwt"; // Import your token verification utility

export async function GET(req) {
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

    // Find posts by author ID
    const posts = await Post.find({ author: decoded.userId })
      .sort({ createdAt: -1 })
      .populate("author", "username name");

    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
