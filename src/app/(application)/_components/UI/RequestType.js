"use client";

import { requestHoverColors, requestTypeColors } from "@/app/_utils/constants/colors";
import { requestTypeOptions } from "@/app/_utils/helpers/fields";
import { useState } from "react";

export default function RequestType({ module, type, currentRequestType, onRequestTypeChange }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const options = requestTypeOptions[module]?.[type] || [];

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleRequestTypeSelect = (requestType) => {
    onRequestTypeChange(requestType);
    setDropdownVisible(false);
  };

  return (
    <div className="relative">
      <button className={`px-3 rounded-lg font-medium w-full ${requestTypeColors[currentRequestType] || requestTypeColors["Set Request Type"]}`} onClick={toggleDropdown}>
        {currentRequestType || "Set Request Type"}
      </button>
      {dropdownVisible && (
        <div className="absolute bg-gray-800 border border-gray-600 shadow-lg rounded-lg mt-2 z-10">
          {options.map((requestType) => (
            <div key={requestType} className={`px-4 py-2 cursor-pointer ${requestTypeColors[requestType] || requestTypeColors["Set Request Type"]} ${requestHoverColors[requestType] || requestHoverColors["Set Request Type"]}`} onClick={() => handleRequestTypeSelect(requestType)}>
              {requestType}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
