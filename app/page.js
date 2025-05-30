// app/pages/showoff/page.js
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // For optimized images

// Icons (using simple placeholders, replace with actual SVG/Heroicons if available)
const FeatureIcon = ({ children }) => (
  <div className="p-4 rounded-full bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-lg">
    {children}
  </div>
);

export default function ShowoffPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode for this page

  // Optional: Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExploreClick = () => {
    router.push("/pages/home");
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header (Minimal, focused on site name and dark mode toggle) */}
      <header
        className={`p-4 shadow-lg transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 border-b border-gray-800"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1
            className={`text-3xl font-extrabold tracking-tight ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            Blogi
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

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 flex items-center justify-center overflow-hidden">
        {/* Background Overlay for Dark Mode */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-300 ${
            darkMode ? "bg-gray-900 bg-opacity-70" : "bg-white bg-opacity-70"
          }`}
        ></div>
        {/* Placeholder Image or Background */}
        <Image
          src="/images/hero-bg.jpg" // Replace with your actual hero image path
          alt="Blogi Background"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="absolute inset-0 z-[-1]"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2
            className={`text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Share Your <span className="text-indigo-500">Stories</span>.
            Discover New <span className="text-indigo-500">Ideas</span>.
          </h2>
          <p
            className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-fade-in delay-200 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Blogi is your platform to connect, create, and explore. Express
            yourself effortlessly.
          </p>
          <button
            onClick={handleExploreClick}
            className={`px-10 py-4 rounded-full text-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 animate-fade-in delay-400
              ${
                darkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/40"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-300/40"
              }`}
          >
            Start Exploring →
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className={`text-4xl font-extrabold text-center mb-16 ${
              darkMode ? "text-indigo-400" : "text-gray-800"
            }`}
          >
            Powerful Features at Your Fingertips
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {/* Feature 1 */}
            <div
              className={`p-8 rounded-xl shadow-lg text-center transition-colors duration-300 transform hover:scale-[1.01] ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <FeatureIcon>✍️</FeatureIcon>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Effortless Creation
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Write and publish your articles with an intuitive,
                distraction-free editor.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className={`p-8 rounded-xl shadow-lg text-center transition-colors duration-300 transform hover:scale-[1.01] ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <FeatureIcon>👁️</FeatureIcon>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Stunning Readability
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Posts are beautifully formatted for an optimal reading
                experience on any device.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={`p-8 rounded-xl shadow-lg text-center transition-colors duration-300 transform hover:scale-[1.01] ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <FeatureIcon>🌟</FeatureIcon>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Personalized Profile
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Manage your own posts, edit, and delete them from your dedicated
                space.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className={`p-8 rounded-xl shadow-lg text-center transition-colors duration-300 transform hover:scale-[1.01] ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <FeatureIcon>💡</FeatureIcon>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Dark Mode Ready
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Switch between light and dark themes for comfortable browsing
                day or night.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className={`p-8 rounded-xl shadow-lg text-center transition-colors duration-300 transform hover:scale-[1.01] ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <FeatureIcon>🔒</FeatureIcon>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Secure & Reliable
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Your data is safe with us. Focus on your content, we handle the
                rest.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              className={`p-8 rounded-xl shadow-lg text-center transition-colors duration-300 transform hover:scale-[1.01] ${
                darkMode
                  ? "bg-gray-900 border border-gray-800"
                  : "bg-white border border-gray-200"
              }`}
            >
              <FeatureIcon>📱</FeatureIcon>
              <h3
                className={`text-2xl font-bold mb-3 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Fully Responsive
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Enjoy a seamless experience whether you're on desktop, tablet,
                or mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 md:py-24 bg-indigo-600 dark:bg-indigo-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
            Ready to Share Your Voice?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Join thousands of creators and start your blogging journey today.
          </p>
          <button
            onClick={handleExploreClick}
            className={`px-10 py-4 rounded-full text-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105
              ${
                darkMode
                  ? "bg-white text-indigo-700 hover:bg-gray-100 shadow-indigo-200/50"
                  : "bg-gray-900 text-white hover:bg-gray-700 shadow-gray-700/50"
              }`}
          >
            Explore Blogi Now →
          </button>
        </div>
      </section>

      {/* Footer (Simple) */}
      <footer
        className={`py-8 transition-colors duration-300 ${
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
            © {new Date().getFullYear()} Blogi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
