"use client";

import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Invite({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");

  const handleInvite = async () => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    try {
      const response = await workflowBackend.post("/users/sendinvite", {
        email,
        role,
        workspaceId: Cookies.get("workspaceId"),
        adminId: Cookies.get("userId"),
      });

      console.log(response);
    } catch (error) {
      console.error("Failed to invite member:", error);
    }

    alert(`Invited ${email} as a ${role}`);

    setEmail("");
    setRole("member");
    onClose();
  };

  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          Invite a Member
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </span>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="member"
                checked={role === "member"}
                onChange={(event) => setRole(event.target.value)}
                className="mr-2"
              />
              Member
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(event) => setRole(event.target.value)}
                className="mr-2"
              />
              Admin
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            onClick={handleInvite}
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
}
