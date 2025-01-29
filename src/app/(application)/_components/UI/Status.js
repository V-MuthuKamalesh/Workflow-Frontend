"use client";

import { statusColors, statusHoverColors } from "@/app/_utils/constants/colors";
import { statusOptionsMap } from "@/app/_utils/helpers/fields";
import { useState } from "react";

export default function Status({ currentStatus, onStatusChange, module, type }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleStatusSelect = (status) => {
    onStatusChange(status);
    setDropdownVisible(false);
  };

  const getStatusOptions = () => {
    if (module && type && statusOptionsMap[module]?.[type]) {
      return statusOptionsMap[module][type];
    } else if (module && statusOptionsMap[module]) {
      return statusOptionsMap[module];
    } else {
      return [];
    }
  };

  const statusOptions = getStatusOptions();

  return (
    <div className="relative">
      <button className={`px-3 rounded-lg font-medium w-full ${statusColors[currentStatus] || statusColors["Set Status"]}`} onClick={toggleDropdown}>
        {currentStatus || "Set Status"}
      </button>
      {dropdownVisible && (
        <div className="absolute bg-gray-800 border border-gray-600 shadow-lg rounded-lg mt-2 z-10">
          {statusOptions.map((status) => (
            <div key={status} className={`px-4 py-2 cursor-pointer ${statusColors[status]} ${statusHoverColors[status]}`} onClick={() => handleStatusSelect(status)}>
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
