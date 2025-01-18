"use client";

import { useState } from "react";

export default function Priority({
  currentPriority,
  onPriorityChange,
  module,
  type,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const priorityOptionsMap = {
    dev: {
      Bug: ["Critical", "High", "Medium", "Low"],
      Task: ["Critical", "High", "Medium", "Low", "Best Effort"],
    },
    service: {
      Ticket: ["Critical", "High", "Medium", "Low"],
    },
  };

  const priorityColors = {
    Critical: "text-red-100 bg-red-500",
    High: "text-orange-100 bg-orange-500",
    Medium: "text-yellow-100 bg-yellow-500",
    Low: "text-green-100 bg-green-500",
    "Best Effort": "text-blue-100 bg-blue-500",
    "Set Priority": "text-gray-100 bg-gray-500",
  };

  const hoverColors = {
    Critical: "hover:bg-red-800",
    High: "hover:bg-orange-800",
    Medium: "hover:bg-yellow-800",
    Low: "hover:bg-green-800",
    "Best Effort": "hover:bg-blue-800",
    "Set Priority": "hover:bg-gray-700",
  };

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handlePrioritySelect = (priority) => {
    onPriorityChange(priority);
    setDropdownVisible(false);
  };

  const options = priorityOptionsMap[module]?.[type] || [];

  return (
    <div className="relative">
      <button
        className={`px-3 rounded-lg font-medium w-full ${
          priorityColors[currentPriority] || priorityColors["Set Priority"]
        }`}
        onClick={toggleDropdown}
      >
        {currentPriority || "Set Priority"}
      </button>
      {dropdownVisible && (
        <div className="absolute bg-gray-800 border border-gray-600 shadow-lg rounded-lg mt-2 z-10">
          {options.map((priority) => (
            <div
              key={priority}
              className={`px-4 py-2 cursor-pointer ${priorityColors[priority]} ${hoverColors[priority]}`}
              onClick={() => handlePrioritySelect(priority)}
            >
              {priority}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
