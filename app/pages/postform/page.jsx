"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PostForm from "../../components/postform";

export default function NewPostPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/pages/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <PostForm darkMode={darkMode} />
    </div>
  );
}
