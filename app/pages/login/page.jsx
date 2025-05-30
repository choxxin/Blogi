"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  // Explicitly set for this page to control its dark mode behavior independently
  const [darkMode, setDarkMode] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/login" : "/api/register";
      const body = isLogin
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred.");
      }

      if (isLogin) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          // Using toast/notification library for non-blocking feedback is better than alert
          // For now, keep alert as per existing code, but ideal for a project.
          alert("Login successful!");
          router.push("/pages/home");
        } else {
          throw new Error("Login successful but no user data received.");
        }
      } else {
        setRegistrationSuccess(true);
        setFormData({ name: "", username: "", password: "" }); // Clear form
        setIsLogin(true); // Switch to login view
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`bg-gray-600 p-8 sm:p-10 rounded-2xl shadow-xl border transition-colors duration-300 transform scale-100
          ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          }
          hover:scale-[1.005] hover:shadow-2xl ${
            darkMode
              ? "hover:shadow-indigo-500/20"
              : "hover:shadow-indigo-300/30"
          }
        `}
      >
        <h1
          className={`text-3xl sm:text-4xl font-extrabold text-center mb-8 sm:mb-10 ${
            darkMode ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          {isLogin ? "Welcome Back!" : "Join Our Community"}
        </h1>

        {registrationSuccess && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-medium border ${
              darkMode
                ? "bg-green-900 border-green-700 text-green-200"
                : "bg-green-100 border-green-300 text-green-800"
            }`}
          >
            Registration successful! Please login to continue.
          </div>
        )}

        {error && (
          <div
            className={`mb-6 p-4 rounded-lg text-center font-medium border ${
              darkMode
                ? "bg-red-900 border-red-700 text-red-200"
                : "bg-red-100 border-red-300 text-red-800"
            }`}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
                  ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                placeholder="e.g., John Doe"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              placeholder="Your chosen username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
                ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
              placeholder="Minimum 6 characters"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 rounded-lg text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-[1.01]
              ${
                darkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
              }
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : isLogin ? (
              "Login to Your Account"
            ) : (
              "Create Your Account"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setRegistrationSuccess(false);
              setFormData({ name: "", username: "", password: "" }); // Clear form data
            }}
            className={`text-lg font-medium hover:underline focus:outline-none transition-colors duration-200 ${
              darkMode
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-700"
            }`}
          >
            {isLogin ? "New here? Sign Up" : "Already a member? Login"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm border-t border-dashed pt-6 ${darkMode ? 'border-gray-800' : 'border-gray-200'}">
          <Link
            href="/pages/home"
            className={`font-medium hover:underline transition-colors duration-200 ${
              darkMode
                ? "text-gray-400 hover:text-gray-300"
                : "text-gray-600 hover:text-gray-700"
            }`}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
