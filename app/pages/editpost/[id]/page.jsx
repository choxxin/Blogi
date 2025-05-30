// app/pages/editpost/[id]/page.js (Assuming this is the file path based on useParams)
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"; // For potential image preview

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [post, setPost] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch post data on mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/getpost/${id}`);
        const data = await res.json();

        if (res.ok) {
          setPost(data);
          setForm({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl || "",
          });
        } else {
          setError(data.error || "Post not found");
          alert(data.error || "Post not found"); // Fallback alert
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        setError("Could not load post. Please try again.");
        alert("Server error"); // Fallback alert
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // Ensure id is available before fetching
      fetchPost();
    }
  }, [id]); // id is now in dependency array

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Clear previous errors

    try {
      const res = await fetch(`/api/editpost/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Post updated successfully!");
        router.push("/pages/mypost"); // Redirect to user's posts
      } else {
        setError(data.error || "Failed to update post.");
        alert(data.error || "Failed to update post"); // Fallback alert
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
      alert("Something went wrong"); // Fallback alert
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Loading State ---
  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-xl">Fetching post data...</p>
      </div>
    );

  // --- Error State ---
  if (error && !post)
    // Show error if no post loaded
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-950 text-red-400" : "bg-gray-50 text-red-600"
        }`}
      >
        <p className="text-xl font-semibold">{error}</p>
        <button
          onClick={() => router.push("/pages/userposts")}
          className={`ml-6 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            darkMode
              ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Go to My Posts
        </button>
      </div>
    );

  // --- Main Content (Edit Form) ---
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
                : "bg-gray-200 text-gray-700 hover:bg-gray-700"
            }`}
          >
            ← Back
          </button>
          <h1
            className={`text-3xl font-extrabold tracking-tight ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Edit Your Post
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

      <main className="max-w-3xl mx-auto my-12 p-8 rounded-xl shadow-2xl transition-colors duration-300 transform scale-100 hover:scale-[1.005] cursor-pointer">
        <div
          className={`
            ${
              darkMode
                ? "bg-gray-900 border border-gray-700"
                : "bg-white border border-gray-200"
            }
          `}
        >
          {error && (
            <div className="bg-red-800 text-white p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Post Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="A compelling title for your post"
                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
                  ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Post Content
              </label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Share your thoughts, stories, and ideas here..."
                className={`w-full p-3 rounded-lg border h-48 resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
                  ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Image URL (Optional)
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="e.g., https://example.com/image.jpg"
                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
                  ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
              />
              {form.imageUrl && (
                <div className="mt-4 w-full h-48 relative rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src={form.imageUrl}
                    alt="Image Preview"
                    layout="fill"
                    objectFit="cover"
                    className="object-center"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    Image Preview
                  </span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-lg text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-[1.01]
                ${
                  darkMode
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
                }
                ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {isSubmitting ? "Updating..." : "Update Post"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
