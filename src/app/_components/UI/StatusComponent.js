"use client";

import { useState } from "react";

export default function StatusComponent({
  currentStatus,
  statusOptions,
  onStatusChange,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const statusColors = {
    "Ready to start": "text-gray-100 bg-gray-500",
    "In Progress": "text-blue-100 bg-blue-500",
    "Waiting for review": "text-yellow-100 bg-yellow-500",
    "Pending Deploy": "text-purple-100 bg-purple-500",
    Done: "text-green-100 bg-green-500",
    Stuck: "text-red-100 bg-red-500",
    "Set Status": "text-gray-100 bg-gray-500",
  };

  const hoverColors = {
    "Ready to start": "hover:bg-gray-700",
    "In Progress": "hover:bg-blue-800",
    "Waiting for review": "hover:bg-yellow-800",
    "Pending Deploy": "hover:bg-purple-800",
    Done: "hover:bg-green-800",
    Stuck: "hover:bg-red-800",
    "Set Status": "hover:bg-gray-700",
  };

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleStatusSelect = (status) => {
    onStatusChange(status);
    setDropdownVisible(false);
  };

  return (
    <div className="relative">
      <button
        className={`px-3 py-1 rounded-lg font-medium w-full ${
          statusColors[currentStatus] || statusColors["Set Status"]
        }`}
        onClick={toggleDropdown}
      >
        {currentStatus || "Set Status"}
      </button>
      {dropdownVisible && (
        <div className="absolute bg-gray-800 border border-gray-600 shadow-lg rounded-lg mt-2 z-10">
          {statusOptions.map((status) => (
            <div
              key={status}
              className={`px-4 py-2 cursor-pointer ${statusColors[status]} ${hoverColors[status]}`}
              onClick={() => handleStatusSelect(status)}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
