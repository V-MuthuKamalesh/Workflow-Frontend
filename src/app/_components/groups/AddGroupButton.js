"use client";

export default function AddGroupButton({ onAddGroup }) {
  return (
    <button
      className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
      onClick={onAddGroup}
    >
      Add Group
    </button>
  );
}
