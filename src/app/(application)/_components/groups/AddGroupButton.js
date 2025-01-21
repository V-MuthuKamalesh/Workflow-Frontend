"use client";

export default function AddGroupButton({ onAddGroup }) {
  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md transition-all"
      onClick={onAddGroup}
    >
      + Add Group
    </button>
  );
}
