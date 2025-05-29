"use client";
import React from "react";
import PostCard from "../../components/post";
import { useRouter } from "next/navigation";

const BlogPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);

  const handleLoginRedirect = () => {
    router.push("login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const posts = [
    {
      id: "1",
      imageUrl: "/frog.jpg",
      title: "The Beauty of Nature: A Photographic Journey",
      excerpt: "Exploring the wonders of nature through the lens of a camera",
    },
    {
      id: "2",
      imageUrl: "/frog.jpg",
      title: "The Beauty of Nature: A Photographic Journey",
      excerpt: "Exploring the wonders of nature through the lens of a camera",
    },
    {
      id: "1",
      imageUrl: "/frog.jpg",
      title: "The Beauty of Nature: A Photographic Journey",
      excerpt: "Exploring the wonders of nature through the lens of a camera",
    },
    {
      id: "1",
      imageUrl: "/frog.jpg",
      title: "The Beauty of Nature: A Photographic Journey",
      excerpt: "Exploring the wonders of nature through the lens of a camera",
    },
    {
      id: "1",
      imageUrl: "/frog.jpg",
      title: "The Beauty of Nature: A Photographic Journey",
      excerpt: "Exploring the wonders of nature through the lens of a camera",
    },
    {
      id: "1",
      imageUrl: "/frog.jpg",
      title: "The Beauty of Nature: A Photographic Journey",
      excerpt: "Exploring the wonders of nature through the lens of a camera",
    },
    // ... rest of your posts data
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header with Login Button */}
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

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                Welcome back!
              </span>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-md transition ${
                  darkMode
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className={`px-4 py-2 rounded-md transition ${
                darkMode
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Rest of your component remains the same */}
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
            <PostCard
              key={post.id}
              id={post.id}
              imageUrl={post.imageUrl}
              title={post.title}
              excerpt={post.excerpt}
              darkMode={darkMode}
            />
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

export default BlogPage;
