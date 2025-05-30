// // app/pages/postform/page.js
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image"; // For image preview

// export default function PostFormPage() {
//   const router = useRouter();
//   const [darkMode, setDarkMode] = useState(true); // Default to dark mode
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     imageUrl: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [user, setUser] = useState(null); // To check if user is logged in

//   useEffect(() => {
//     // Check if user is logged in
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       router.push("/login"); // Redirect to login if not authenticated
//     }
//   }, [router]); // Added router to dependency array

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("/api/uploadpost", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         // credentials: "include", // Only needed if CORS is an issue AND you're sending cookies
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create post");
//       }

//       alert("Post created successfully!");
//       router.push("/pages/home"); // Redirect to user's posts
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Redirect if no user ---
//   if (!user) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center ${
//           darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
//         }`}
//       >
//         <div className="text-center">
//           <p className="text-xl">Redirecting to login...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${
//         darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
//       }`}
//     >
//       <header
//         className={`p-4 shadow-lg transition-colors duration-300 ${
//           darkMode
//             ? "bg-gray-900 border-b border-gray-700"
//             : "bg-white border-b border-gray-200"
//         }`}
//       >
//         <div className="flex justify-between items-center max-w-7xl mx-auto">
//           <button
//             onClick={() => router.back()}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//               darkMode
//                 ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//           >
//             ← Back
//           </button>
//           <h1
//             className={`text-3xl font-extrabold tracking-tight ${
//               darkMode ? "text-indigo-400" : "text-indigo-600"
//             }`}
//           >
//             Create New Post
//           </h1>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-3 rounded-full text-lg transition-all duration-200 ${
//               darkMode
//                 ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
//                 : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//             }`}
//             aria-label="Toggle dark mode"
//           >
//             {darkMode ? "☀️" : "🌙"}
//           </button>
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto my-12 p-8 rounded-xl shadow-2xl transition-colors duration-300 transform scale-100 hover:scale-[1.005] cursor-pointer">
//         <div
//           className={`
//             ${
//               darkMode
//                 ? "bg-gray-900 border border-gray-700"
//                 : "bg-white border border-gray-200"
//             }
//           `}
//         >
//           {error && (
//             <div className="bg-red-800 text-white p-4 rounded-lg mb-6 text-center">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="title"
//                 className={`block text-sm font-medium mb-2 ${
//                   darkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Post Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="A compelling title for your new post"
//                 className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
//                   ${
//                     darkMode
//                       ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
//                       : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
//                   }`}
//                 required
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="imageUrl"
//                 className={`block text-sm font-medium mb-2 ${
//                   darkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Image URL (Optional)
//               </label>
//               <input
//                 type="url"
//                 id="imageUrl"
//                 name="imageUrl"
//                 value={formData.imageUrl}
//                 onChange={handleChange}
//                 placeholder="e.g., https://example.com/image.jpg"
//                 className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
//                   ${
//                     darkMode
//                       ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
//                       : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
//                   }`}
//               />
//               {formData.imageUrl && ( // Live image preview
//                 <div className="mt-4 w-full h-48 relative rounded-lg overflow-hidden border border-gray-700">
//                   <img
//                     src={formData.imageUrl || "/images/placeholder.jpg"}
//                     alt="Image Preview"
//                     className="w-full h-64 object-cover object-center transition-transform duration-300 hover:scale-105"
//                   />

//                   <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
//                     Image Preview
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label
//                 htmlFor="content"
//                 className={`block text-sm font-medium mb-2 ${
//                   darkMode ? "text-gray-300" : "text-gray-700"
//                 }`}
//               >
//                 Post Content
//               </label>
//               <textarea
//                 id="content"
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 rows={8} // Increased rows for more space
//                 placeholder="Share your thoughts, stories, and ideas here..."
//                 className={`w-full p-3 rounded-lg border h-auto resize-y focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none
//                   ${
//                     darkMode
//                       ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
//                       : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
//                   }`}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full px-6 py-3 rounded-lg text-lg font-bold shadow-md transition-all duration-300 transform hover:scale-[1.01]
//                 ${
//                   darkMode
//                     ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
//                     : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
//                 }
//                 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
//               `}
//             >
//               {isLoading ? "Publishing..." : "Publish Post"}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }
// app/pages/postform/page.js
"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostFormPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);

      // Append image file if selected
      if (fileInputRef.current.files[0]) {
        formDataToSend.append("image", fileInputRef.current.files[0]);
      }

      const response = await fetch("/api/uploadpost", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }

      alert("Post created successfully!");
      router.push("/pages/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="text-center">
          <p className="text-xl">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header remains the same */}
      <header
        className={`p-4 shadow-lg transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 border-b border-gray-700"
            : "bg-white border-b border-gray-200"
        }`}
      >
        {/* ... existing header code ... */}
      </header>

      <main className="max-w-3xl mx-auto my-12 p-8 rounded-xl shadow-2xl transition-colors duration-300">
        <div
          className={`
          ${
            darkMode
              ? "bg-gray-900 border border-gray-700"
              : "bg-white border border-gray-200"
          }
          p-6 rounded-lg
        `}
        >
          {error && (
            <div className="bg-red-800 text-white p-4 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title field (same as before) */}
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
                value={formData.title}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
                required
              />
            </div>

            {/* Image upload field */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Post Image
              </label>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer px-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Choose File
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                {fileInputRef.current?.files[0] && (
                  <span className="text-sm">
                    {fileInputRef.current.files[0].name}
                  </span>
                )}
              </div>

              {/* Image preview */}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>

            {/* Content field (same as before) */}
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
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                }`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 rounded-lg text-lg font-bold shadow-md transition-all duration-300 ${
                darkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/30"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-500/30"
              } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {isLoading ? "Publishing..." : "Publish Post"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
