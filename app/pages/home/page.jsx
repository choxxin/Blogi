"use client";
import React, { useState, useEffect } from "react";
import PostCard from "../../components/post";
import { useRouter } from "next/navigation";

const SunIcon = () => (
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
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const HomePage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/getallpost");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLoginRedirect = () => {
    router.push("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
            Loading posts...
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
        <p className={`text-lg ${darkMode ? "text-red-400" : "text-red-600"}`}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header className={`shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1
              className={`text-3xl font-bold ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              Blogi
            </h1>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Welcome, {user.username}!
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md transition bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Logout
              </button>
              <button
                onClick={() => router.push("/pages/postform")}
                className="px-4 py-2 rounded-md transition bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Create Post
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 rounded-md transition bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2
          className={`text-2xl font-bold mb-8 ${
            darkMode ? "text-indigo-400" : "text-gray-800"
          }`}
        >
          Latest Posts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} {...post} darkMode={darkMode} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
              No posts available yet.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`border-t mt-12 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p
            className={`text-center ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            © {new Date().getFullYear()} Blogi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
