// import { NextResponse } from "next/server";
// import { connectToDB } from "../../lib/db";
// import Post from "../../../models/post";
// import verifyToken from "../../../utils/verifyjwt";

// export async function POST(req) {
//   await connectToDB();

//   try {
//     // Get token from cookies
//     const cookieHeader = req.headers.get("cookie");
//     const cookies = cookieHeader?.split(";").reduce((acc, cookie) => {
//       const [name, value] = cookie.trim().split("=");
//       acc[name] = value;
//       return acc;
//     }, {});

//     const token = cookies?.token;

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Verify token
//     const decoded = verifyToken(token);
//     if (!decoded) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     const { title, content, imageUrl } = await req.json();

//     const post = new Post({
//       title,
//       content,
//       imageUrl,
//       author: decoded.userId,
//     });

//     await post.save();

//     return NextResponse.json(post, { status: 201 });
//   } catch (err) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
// app/api/uploadpost/route.js
import { NextResponse } from "next/server";
import { connectToDB } from "../../lib/db";
import Post from "../../../models/post";
import verifyToken from "../../../utils/verifyjwt";
import cloudinary from "../../../utils/cloudinary";

export async function POST(req) {
  await connectToDB();

  try {
    // Authentication check (same as before)
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

    // Parse form data
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    let imageUrl = "";

    // Upload image to Cloudinary if present
    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blog-posts" }, (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          })
          .end(buffer);
      });

      imageUrl = result.secure_url;
    }

    // Create new post
    const post = new Post({
      title,
      content,
      imageUrl: imageUrl || undefined, // Only include if image was uploaded
      author: decoded.userId,
    });

    await post.save();

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
