"use client";

import { priorityColors, priorityHoverColors } from "@/app/_utils/constants/colors";
import { priorityOptions } from "@/app/_utils/helpers/fields";
import { useState } from "react";

export default function Priority({ currentPriority, onPriorityChange, module, type }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handlePrioritySelect = (priority) => {
    onPriorityChange(priority);
    setDropdownVisible(false);
  };

  const options = priorityOptions[module]?.[type] || [];

  return (
    <div className="relative">
      <button className={`px-3 rounded-lg font-medium w-full ${priorityColors[currentPriority] || priorityColors["Set Priority"]}`} onClick={toggleDropdown}>
        {currentPriority || "Set Priority"}
      </button>
      {dropdownVisible && (
        <div className="absolute bg-gray-800 border border-gray-600 shadow-lg rounded-lg mt-2 z-10">
          {options.map((priority) => (
            <div key={priority} className={`px-4 py-2 cursor-pointer ${priorityColors[priority]} ${priorityHoverColors[priority]}`} onClick={() => handlePrioritySelect(priority)}>
              {priority}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
