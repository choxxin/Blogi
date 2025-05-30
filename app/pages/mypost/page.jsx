// app/pages/userposts/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserPostCard from "../../components/userpostcard";

export default function UserPostsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
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
  }, []);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <header className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Back
          </button>
          <h1
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            My Posts
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-12">
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              You haven't created any posts yet.
            </p>
            <button
              onClick={() => router.push("/pages/postform")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Create Post
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
