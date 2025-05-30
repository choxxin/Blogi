// components/UserPostCard.js
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image component for optimization

const UserPostCard = ({
  _id,
  imageUrl,
  title,
  excerpt,
  darkMode,
  onDelete,
  onEdit,
}) => {
  const router = useRouter();

  const handleViewClick = () => {
    router.push(`/pages/posts/${_id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent card click if buttons are clicked
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent card click if buttons are clicked
    onDelete();
  };

  return (
    <div
      className={`
        rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 ease-in-out
        ${
          darkMode
            ? "bg-gray-900 border border-gray-700"
            : "bg-white border border-gray-200"
        }
        hover:scale-[1.02] hover:shadow-2xl
        ${
          darkMode ? "hover:shadow-indigo-500/20" : "hover:shadow-indigo-300/30"
        }
      `}
    >
      {/* Image Section */}
      <div
        className="w-full h-52 relative cursor-pointer"
        onClick={handleViewClick}
      >
        <img
          src={imageUrl || "/images/placeholder.jpg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Optional overlay for better text readability on images */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        {/* Optional: Add a small tag or badge on the image */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
            darkMode ? "bg-indigo-600 text-white" : "bg-indigo-500 text-white"
          }`}
        >
          Post
        </span>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-7 flex flex-col justify-between h-[calc(100%-13rem)]">
        {" "}
        {/* Adjust height based on image height */}
        <div>
          <h3
            className={`text-2xl font-bold mb-2 leading-tight ${
              darkMode ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            {title}
          </h3>
          {excerpt && (
            <p
              className={`text-base mb-4 line-clamp-3 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {excerpt}
            </p>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-700 mt-auto">
          <button
            onClick={handleViewClick}
            className={`
              px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out
              ${
                darkMode
                  ? "bg-indigo-700 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/20"
                  : "bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-300/30"
              }
            `}
          >
            Read Post
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className={`
                p-2 rounded-full text-lg transition-all duration-300 ease-in-out
                ${
                  darkMode
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-110"
                    : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-110"
                }
              `}
              aria-label="Edit Post"
            >
              ✏️ {/* Or use an icon component */}
            </button>
            <button
              onClick={handleDelete}
              className={`
                p-2 rounded-full text-lg transition-all duration-300 ease-in-out
                ${
                  darkMode
                    ? "bg-red-600 text-white hover:bg-red-700 hover:scale-110"
                    : "bg-red-500 text-white hover:bg-red-600 hover:scale-110"
                }
              `}
              aria-label="Delete Post"
            >
              🗑️ {/* Or use an icon component */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
