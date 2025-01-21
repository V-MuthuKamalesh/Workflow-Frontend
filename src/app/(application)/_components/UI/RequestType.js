"use client";

import { useState } from "react";

const requestTypeOptions = {
  service: {
    Ticket: ["Issue", "Question", "Request"],
  },
};

export default function RequestType({
  module,
  type,
  currentRequestType,
  onRequestTypeChange,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const options = requestTypeOptions[module]?.[type] || [];

  const toggleDropdown = () => setDropdownVisible((prev) => !prev);

  const handleRequestTypeSelect = (requestType) => {
    onRequestTypeChange(requestType);
    setDropdownVisible(false);
  };

  const requestTypeColors = {
    Issue: "text-red-100 bg-red-500",
    Question: "text-blue-100 bg-blue-500",
    Request: "text-green-100 bg-green-500",
    "Set Request Type": "text-gray-100 bg-gray-500",
  };

  const hoverColors = {
    Issue: "hover:bg-red-700",
    Question: "hover:bg-blue-700",
    Request: "hover:bg-green-700",
    "Set Request Type": "hover:bg-gray-700",
  };

  return (
    <div className="relative">
      <button
        className={`px-3 rounded-lg font-medium w-full ${
          requestTypeColors[currentRequestType] ||
          requestTypeColors["Set Request Type"]
        }`}
        onClick={toggleDropdown}
      >
        {currentRequestType || "Set Request Type"}
      </button>
      {dropdownVisible && (
        <div className="absolute bg-gray-800 border border-gray-600 shadow-lg rounded-lg mt-2 z-10">
          {options.map((requestType) => (
            <div
              key={requestType}
              className={`px-4 py-2 cursor-pointer ${
                requestTypeColors[requestType] ||
                requestTypeColors["Set Request Type"]
              } ${hoverColors[requestType] || hoverColors["Set Request Type"]}`}
              onClick={() => handleRequestTypeSelect(requestType)}
            >
              {requestType}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
