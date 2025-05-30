// app/pages/posts/[id]/page.js
"use client";
import { useState, useEffect, use } from "react"; // Import `use` from React
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Import Image component for optimization

export default function PostPage({ params }) {
  // --- Correct way to use React.use() with params ---
  // If `params` is a Promise, `use` will unwrap it.
  // If `params` is already an object, `use` will treat it as a resolved value.
  const unwrappedParams = use(params);
  const { id } = unwrappedParams; // Access id from the unwrapped object

  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    const fetchPost = async () => {
      // It's good practice to ensure `id` exists before fetching,
      // especially since `unwrappedParams` might be empty initially
      // before `use` fully resolves (though `use` is designed to suspend).
      if (!id) {
        setLoading(false);
        setError("Post ID is missing.");
        return;
      }

      try {
        const response = await fetch(`/api/getpost/${id}`);
        if (!response.ok) {
          throw new Error(
            "Failed to fetch post. Post not found or server error."
          );
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]); // Depend on id

  // --- Loading State ---
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p
            className={`mt-4 text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Summoning your story...
          </p>
        </div>
      </div>
    );
  }

  // --- Error/Not Found State ---
  if (error || !post) {
    // Combined error and not found for cleaner logic
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
          darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
      >
        <div
          className={`p-8 rounded-xl shadow-lg text-center ${
            darkMode
              ? "bg-gray-900 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-red-500">
            {error ? "Oops! An Error Occurred" : "Post Not Found"}
          </h2>
          <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            {error ||
              "The post you are looking for does not exist or has been removed."}
          </p>
          <button
            onClick={() => router.push("/pages/userposts")} // Redirect to user's posts, or home
            className={`px-6 py-3 rounded-lg text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-[1.01] ${
              darkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
                : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
            }`}
          >
            Back to Posts →
          </button>
        </div>
      </div>
    );
  }

  // --- Main Post Content ---
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <header
        className={`p-4 shadow-lg transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 border-b border-gray-700"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ← Back
          </button>
          <h1
            className={`text-3xl font-extrabold tracking-tight ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Read Post
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-full text-lg transition-all duration-200 ${
              darkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <article
          className={`p-8 rounded-xl shadow-xl transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          {post.imageUrl && (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>{" "}
              {/* Dark overlay */}
            </div>
          )}

          <h1
            className={`text-4xl font-extrabold mb-5 leading-tight ${
              darkMode ? "text-indigo-400" : "text-indigo-700"
            }`}
          >
            {post.title}
          </h1>

          <div
            className={`flex items-center space-x-4 mb-8 text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span>
              By{" "}
              <span
                className={`font-semibold ${
                  darkMode ? "text-indigo-300" : "text-indigo-600"
                }`}
              >
                {post.author?.name || post.author?.username || "Unknown"}
              </span>
            </span>
            <span className="text-gray-500">•</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div
            className={`prose max-w-none text-lg leading-relaxed ${
              darkMode ? "prose-invert prose-indigo" : "prose-blue"
            }`}
          >
            <p>{post.content}</p>
          </div>
        </article>

        <div className="mt-12 text-center">
          <button
            onClick={() => router.push("/pages/home")} // Adjusted redirect
            className={`px-8 py-3 rounded-lg text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-[1.01] ${
              darkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
                : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
            }`}
          >
            ← Back to All Posts
          </button>
        </div>
      </main>
    </div>
  );
}
