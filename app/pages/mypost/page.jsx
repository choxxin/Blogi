// app/pages/userposts/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserPostCard from "../../components/userpostcard";

export default function UserPostsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode for a darker vibe
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          router.push("/login");
          return;
        }

        const response = await fetch("/api/userpost");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [router]); // Added router to dependency array

  const handleDelete = async (postId) => {
    try {
      await fetch("/api/deletepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    router.push(`/pages/editpost/${post._id}`);
  };

  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-xl">Loading your thoughts...</p>
      </div>
    );

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
            My Creations
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

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <UserPostCard
              key={post._id}
              {...post}
              darkMode={darkMode}
              onDelete={() => handleDelete(post._id)}
              onEdit={() => handleEdit(post)}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div
            className={`text-center py-16 rounded-xl border-dashed border-2 ${
              darkMode
                ? "border-gray-700 bg-gray-900 text-gray-400"
                : "border-gray-300 bg-white text-gray-600"
            } mt-12`}
          >
            <p className="text-xl font-semibold mb-4">
              It seems you haven't shared anything yet.
            </p>
            <p className="mb-6">
              Start creating your first post and let your ideas shine!
            </p>
            <button
              onClick={() => router.push("/pages/postform")}
              className={`px-6 py-3 text-lg font-bold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                darkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
              }`}
            >
              Create Your First Post →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
