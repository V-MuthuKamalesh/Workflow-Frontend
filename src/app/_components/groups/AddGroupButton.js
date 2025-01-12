"use client";

import { Plus } from "lucide-react";

export default function AddGroupButton({ onAddGroup }) {
  return (
    <button
      className="mt-10 px-6 py-3 flex items-center space-x-1 bg-green-500 text-white rounded-md hover:bg-green-600"
      onClick={onAddGroup}
    >
      <span>Add Group</span>
      <Plus />
    </button>
  );
}
