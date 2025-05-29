"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm({ darkMode }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/uploadpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      router.push("/pages/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-md`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          darkMode ? "text-indigo-400" : "text-indigo-600"
        }`}
      >
        Create New Post
      </h2>

      {error && (
        <div
          className={`mb-4 p-3 rounded ${
            darkMode ? "bg-red-900 text-red-100" : "bg-red-100 text-red-700"
          }`}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className={`block text-sm font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-600"
            }`}
            required
          />
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className={`block text-sm font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-600"
            }`}
            required
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className={`block text-sm font-medium mb-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-600"
            }`}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            darkMode
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
