"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react"; // Importing a trash icon for delete
import { setMembers } from "@/redux/feautres/workspaceSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";

export default function WorkspaceMembers({ isAdmin, workspaceId, members }) {
  const [activeTab, setActiveTab] = useState("admin");
  const dispatch = useDispatch();

  const groupedMembers = members.reduce(
    (acc, member) => {
      acc[member.role].push(member);
      return acc;
    },
    { admin: [], member: [] }
  );

  const handleMemberDelete = async (userId) => {
    console.log(Cookies.get("authToken"));
    try {
      const response = await workflowBackend.post("/users/removeMember", {
        id: workspaceId,
        userId: Cookies.get("userId"),
        token: Cookies.get("authToken"),
      });

      if (response.status === 200) {
        const newMembers = members.filter((member) => member.userId !== userId);
        dispatch(setMembers(newMembers));
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  console.log(members);

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Workspace Members
      </h3>

      <div className="flex space-x-2 border-b pb-2 mb-4">
        {Object.keys(groupedMembers).map((role) => (
          <button
            key={role}
            onClick={() => setActiveTab(role)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === role
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } transition`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)} (
            {groupedMembers[role].length})
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {groupedMembers[activeTab].map((member, index) => (
          <li
            key={index}
            className="flex items-center p-3 bg-gray-50 rounded-md shadow-sm hover:shadow transition"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center font-medium">
              {member.fullname.charAt(0)}
            </div>
            <div className="ml-3 flex-grow">
              <p className="text-sm font-medium text-gray-800">
                {member.fullname}
              </p>
              <p className="text-xs text-gray-500">{member.email}</p>
            </div>
            {isAdmin && member.role !== "admin" && (
              <button
                onClick={() => handleMemberDelete(member.userId)}
                className="text-red-500 hover:text-red-600 transition-colors duration-200"
                title={`Remove ${member.fullname}`}
              >
                <Trash2 size={18} />
              </button>
            )}
          </li>
        ))}
        {groupedMembers[activeTab].length === 0 && (
          <p className="text-center text-gray-500 italic">
            No {activeTab} found.
          </p>
        )}
      </ul>
    </div>
  );
}
