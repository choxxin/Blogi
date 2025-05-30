// components/SearchBar.js
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ darkMode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.results);
      setIsOpen(true);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleResultClick = (slug) => {
    router.push(`/pages/posts/${slug}`);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value === "") {
              setResults([]);
              setIsOpen(false);
            }
          }}
          placeholder="Search posts..."
          className={`px-4 py-2 rounded-lg w-64 focus:w-80 transition-all duration-300 ${
            darkMode
              ? "bg-gray-800 text-white placeholder-gray-400"
              : "bg-gray-100 text-gray-800 placeholder-gray-500"
          }`}
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        <button
          type="submit"
          className={`ml-2 p-2 rounded-full ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          🔍
        </button>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div
          className={`absolute z-10 mt-2 w-full rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="py-1">
            {results.map((post) => (
              <div
                key={post._id}
                onClick={() => handleResultClick(post._id)}
                className={`px-4 py-2 cursor-pointer ${
                  darkMode
                    ? "hover:bg-gray-700 text-gray-200"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {post.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
