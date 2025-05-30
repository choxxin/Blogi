"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", imageUrl: "" });
  const [loading, setLoading] = useState(true);

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
          alert(data.error || "Post not found");
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        alert("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        alert("Post updated!");
        router.push("/"); // or redirect somewhere else
      } else {
        alert(data.error || "Failed to update post");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          className="w-full p-2 border rounded h-32"
          required
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
