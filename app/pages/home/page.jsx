"use client";
import React, { useState, useEffect } from "react";
// Assuming PostCard is in components/PostCard.js and is updated to support dark mode
import PostCard from "../../components/post";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Use Link for navigation where appropriate

// Reusing your icons, but consider using a library like Heroicons for more control
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6" // Slightly larger for better tap target
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
    className="h-6 w-6" // Slightly larger for better tap target
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const HomePage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch posts
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/getallpost");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        // Assuming data.posts is the array if wrapped, otherwise data itself
        setPosts(data.posts || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  const handleLoginRedirect = () => {
    router.push("login"); // Use absolute path
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("login"); // Use absolute path
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMyPosts = () => {
    router.push("/pages/mypost"); // Corrected path based on previous components
  };

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
            Gathering stories from the ether...
          </p>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          darkMode ? "bg-gray-950" : "bg-gray-50"
        }`}
      >
        <div
          className={`p-8 rounded-xl shadow-lg text-center ${
            darkMode
              ? "bg-red-900 border border-red-700 text-red-100"
              : "bg-red-100 border border-red-300 text-red-700"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Error Loading Posts</h2>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()} // Simple reload to retry
            className={`px-6 py-3 rounded-lg text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-[1.01] ${
              darkMode
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
                : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header
        className={`p-4 shadow-lg transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 border-b border-gray-700"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center group">
              <h1
                className={`text-3xl font-extrabold tracking-tight transition-colors duration-200 ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                } group-hover:text-indigo-500`}
              >
                Blogi
              </h1>
            </Link>
            {/* Dark Mode Toggle - Moved inside the main header group */}
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full text-lg transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <span
                  className={`hidden sm:inline ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } font-medium`}
                >
                  Welcome,{" "}
                  <span className="font-semibold">{user.username}!</span>
                </span>
                <button
                  onClick={() => router.push("/pages/postform")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    darkMode
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-indigo-500 text-white hover:bg-indigo-600"
                  }`}
                >
                  Create Post
                </button>
                <button
                  onClick={handleMyPosts}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    darkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  My Posts
                </button>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    darkMode
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginRedirect}
                className={`px-6 py-3 rounded-lg text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-105 ${
                  darkMode
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
                    : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
                }`}
              >
                Get Started
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 md:py-16">
        <h2
          className={`text-4xl font-extrabold mb-10 text-center md:text-left ${
            darkMode ? "text-indigo-400" : "text-gray-800"
          }`}
        >
          Discover New Stories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post) => (
            <PostCard key={post._id} {...post} darkMode={darkMode} />
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
              It's quiet here... No posts to display.
            </p>
            {user && (
              <button
                onClick={() => router.push("/pages/postform")}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-bold shadow-md transition-all duration-300 hover:bg-indigo-700"
              >
                Be the first to create one!
              </button>
            )}
            {!user && (
              <p
                className={`mt-4 ${
                  darkMode ? "text-gray-500" : "text-gray-700"
                }`}
              >
                <button
                  onClick={handleLoginRedirect}
                  className={`font-semibold ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-600 hover:text-indigo-700"
                  }`}
                >
                  Login
                </button>{" "}
                to start sharing your thoughts.
              </p>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`mt-auto py-8 transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 border-t border-gray-800"
            : "bg-gray-100 border-t border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-500" : "text-gray-600"
            }`}
          >
            © {new Date().getFullYear()} Blogi. All rights reserved. Crafted
            with <span className="text-red-500">♥</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
