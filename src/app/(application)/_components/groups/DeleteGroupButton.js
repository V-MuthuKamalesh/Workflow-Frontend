"use client";

import { useSelector } from "react-redux";

export default function DeleteGroupButton({ onDeleteGroup }) {
  const { isAdmin } = useSelector((state) => state.userDetails);

  return (
    <button
      onClick={isAdmin ? onDeleteGroup : undefined}
      className={`px-2 py-1 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${
        isAdmin
          ? "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-400"
          : "bg-red-500 text-white hover:bg-gray-500 hover:shadow-lg focus:ring-red-400 cursor-not-allowed"
      }`}
      disabled={!isAdmin}
      title={!isAdmin ? "You are not an admin" : "Delete group"}
    >
      Delete Group
    </button>
  );
}
