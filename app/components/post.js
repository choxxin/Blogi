import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostCard = ({ id, imageUrl, title, excerpt, darkMode }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
      onClick={handleClick}
    >
      <div className="w-full h-48 relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3
          className={`text-xl font-semibold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        {excerpt && (
          <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {excerpt}
          </p>
        )}
        <button
          onClick={handleClick}
          className={`px-4 py-2 rounded-md transition-colors ${
            darkMode
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          }`}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default PostCard;
