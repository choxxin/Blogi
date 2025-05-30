// components/UserPostCard.js
"use client";
import { useRouter } from "next/navigation";

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
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="w-full h-48 relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={handleViewClick}
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
        <div className="flex justify-between">
          <button
            onClick={handleViewClick}
            className={`px-4 py-2 rounded-md ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-100 hover:bg-indigo-200"
            }`}
          >
            View
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className={`px-4 py-2 rounded-md ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className={`px-4 py-2 rounded-md ${
                darkMode
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-100 hover:bg-red-200"
              }`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
