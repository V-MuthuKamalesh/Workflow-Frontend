"use client";

import { useSelector } from "react-redux";

export default function AddGroupButton({ onAddGroup }) {
  const { isAdmin } = useSelector((state) => state.userDetails);

  return (
    <button
      onClick={isAdmin ? onAddGroup : undefined}
      className={`px-4 py-2 rounded-lg shadow-md transition-all ${
        isAdmin
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-green-500 text-white hover:bg-gray-500 cursor-not-allowed"
      }`}
      disabled={!isAdmin}
      title={!isAdmin ? "You are not an admin" : "Add a new group"}
    >
      + Add Group
    </button>
  );
}
