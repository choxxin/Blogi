// app/api/search/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import Post from "../../../models/post";

export async function GET(request) {
  await connectToDB();

  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    // Search for posts where title matches the query (case insensitive)
    const results = await Post.find({
      title: { $regex: query, $options: "i" },
    })
      .limit(10)
      .select("title slug"); // Only return title and slug

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
