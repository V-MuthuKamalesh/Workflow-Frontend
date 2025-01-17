"use client";

import { useState } from "react";

const statusOptionsMap = {
  dev: {
    Bug: [
      "Awaiting Review",
      "Ready for Dev",
      "Fixing",
      "Fixed",
      "Missing Info",
      "Pending Deploy",
      "Known Bug",
      "Duplicated",
    ],
  },
  "work-management": [
    "Ready to start",
    "In Progress",
    "Waiting for review",
    "Pending Deploy",
    "Done",
    "Stuck",
  ],
  crm: {
    Lead: [
      "New Lead",
      "Attempted to contact",
      "Contacted",
      "Qualified",
      "Unqualified",
    ],
  },
  service: {
    Ticket: ["New", "Awaiting customer", "New reply", "Resolved"],
  },
};

export default function Status({
  currentStatus,
  onStatusChange,
  module,
  type,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const statusColors = {
    "Awaiting Review": "text-gray-100 bg-gray-500",
    "Ready for Dev": "text-blue-100 bg-blue-500",
    Fixing: "text-yellow-100 bg-yellow-500",
    Fixed: "text-green-100 bg-green-500",
    "Missing Info": "text-orange-100 bg-orange-500",
    "Pending Deploy": "text-purple-100 bg-purple-500",
    "Known Bug": "text-red-100 bg-red-500",
    Duplicated: "text-gray-100 bg-gray-700",
    "Ready to start": "text-gray-100 bg-gray-500",
    "In Progress": "text-blue-100 bg-blue-500",
    "Waiting for review": "text-yellow-100 bg-yellow-500",
    Done: "text-green-100 bg-green-500",
    Stuck: "text-red-100 bg-red-500",
    "New Lead": "text-teal-100 bg-teal-500",
    "Attempted to contact": "text-indigo-100 bg-indigo-500",
    Contacted: "text-blue-100 bg-blue-500",
    Qualified: "text-green-100 bg-green-500",
    Unqualified: "text-red-100 bg-red-500",
    New: "text-gray-100 bg-gray-500",
    "Awaiting customer": "text-yellow-100 bg-yellow-500",
    "New reply": "text-blue-100 bg-blue-500",
    Resolved: "text-green-100 bg-green-500",
    "Set Status": "text-gray-100 bg-gray-500",
  };

  const hoverColors = {
    "Awaiting Review": "hover:bg-gray-700",
    "Ready for Dev": "hover:bg-blue-800",
    Fixing: "hover:bg-yellow-800",
    Fixed: "hover:bg-green-800",
    "Missing Info": "hover:bg-orange-800",
    "Pending Deploy": "hover:bg-purple-800",
    "Known Bug": "hover:bg-red-800",
    Duplicated: "hover:bg-gray-800",
    "Ready to start": "hover:bg-gray-700",
    "In Progress": "hover:bg-blue-800",
    "Waiting for review": "hover:bg-yellow-800",
    Done: "hover:bg-green-800",
    Stuck: "hover:bg-red-800",
    "New Lead": "hover:bg-teal-700",
    "Attempted to contact": "hover:bg-indigo-700",
    Contacted: "hover:bg-blue-700",
    Qualified: "hover:bg-green-700",
    Unqualified: "hover:bg-red-700",
    New: "hover:bg-gray-700",
    "Awaiting customer": "hover:bg-yellow-700",
    "New reply": "hover:bg-blue-700",
    Resolved: "hover:bg-green-700",
    "Set Status": "hover:bg-gray-700",
  };

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
      <button
        className={`px-3 rounded-lg font-medium w-full ${
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
