import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import Post from "../../../models/post";
import User from "../../../models/user";

export async function GET(req) {
  await connectToDB();

  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 posts per page

    const skip = (page - 1) * limit;

    // Get total count of posts for pagination info
    const totalPosts = await Post.countDocuments({});
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username name");

    return NextResponse.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        postsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (err) {
    console.error("Error in GET /api/getallpost:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
