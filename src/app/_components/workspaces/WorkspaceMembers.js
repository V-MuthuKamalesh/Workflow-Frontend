"use client";

import { useState } from "react";

export default function WorkspaceMembers({ workspaceId }) {
  const [activeTab, setActiveTab] = useState("Admin");

  const members = {
    Admin: [{ name: "John Doe", role: "Admin" }],
    Member: [
      { name: "Jane Smith", role: "Member" },
      { name: "Tom Johnson", role: "Member" },
    ],
    Guest: [{ name: "Emily Davis", role: "Guest" }],
  };

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Workspace Members</h3>

      <div className="flex space-x-4 border-b mb-4">
        {Object.keys(members).map((role) => (
          <button
            key={role}
            onClick={() => setActiveTab(role)}
            className={`px-4 py-2 font-medium ${
              activeTab === role
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            } transition duration-200`}
          >
            {role}
          </button>
        ))}
      </div>

      <ul className="">
        {members[activeTab].map((member, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 bg-white rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-800">{member.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
