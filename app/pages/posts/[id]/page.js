"use client";
import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params); // ✅ unwrap the params object
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/getpost/${unwrappedParams.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className={`mt-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Loading post...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`p-4 rounded-md ${
            darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-700"
          }`}
        >
          Error: {error}
          <button
            onClick={() => router.push("/pages/home")}
            className={`mt-4 block px-4 py-2 rounded-md ${
              darkMode ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white"
            }`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div
          className={`p-4 rounded-md ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"
          }`}
        >
          Post not found
          <button
            onClick={() => router.push("/")}
            className={`mt-4 block px-4 py-2 rounded-md ${
              darkMode ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white"
            }`}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <header className={`shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link
            href="/"
            className={`text-3xl font-bold ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Blogi
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${
              darkMode
                ? "bg-gray-700 text-yellow-300"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <article>
          <div className="relative h-64 w-full mb-6 rounded-lg overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h1
            className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {post.title}
          </h1>

          <div
            className={`flex items-center mb-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <span>
              By {post.author?.name || post.author?.username || "Unknown"}
            </span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <div className={`prose max-w-none ${darkMode ? "prose-invert" : ""}`}>
            <p>{post.content}</p>
          </div>
        </article>

        <div className="mt-8">
          <Link
            href="/pages/home"
            className={`px-4 py-2 rounded-md ${
              darkMode ? "bg-indigo-600 text-white" : "bg-indigo-600 text-white"
            }`}
          >
            Back to All Posts
          </Link>
        </div>
      </main>
    </div>
  );
}
