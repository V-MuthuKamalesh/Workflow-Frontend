"use client";

import { useState } from "react";

export default function WorkspaceMembers({ members }) {
  const [activeTab, setActiveTab] = useState("admin");

  // Organize members by role
  const groupedMembers = members.reduce(
    (acc, member) => {
      acc[member.role].push(member);
      return acc;
    },
    { admin: [], member: [] }
  );

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Workspace Members
      </h3>

      <div className="flex space-x-4 border-b mb-4">
        {Object.keys(groupedMembers).map((role) => (
          <button
            key={role}
            onClick={() => setActiveTab(role)}
            className={`px-4 py-2 font-medium ${
              activeTab === role
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            } transition duration-200`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      <ul>
        {groupedMembers[activeTab].map((member, index) => (
          <li key={index} className="p-2 bg-white rounded-lg shadow-sm mb-2">
            <div className="space-x-3">
              <span className="font-medium text-gray-800">
                {member.fullname}
              </span>
              <span className="text-gray-500 text-sm">{member.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
