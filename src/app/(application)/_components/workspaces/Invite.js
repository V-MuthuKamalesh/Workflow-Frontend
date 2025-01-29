"use client";

import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Invite({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");

  const handleInvite = async (event) => {
    event.preventDefault();

    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    onClose();

    try {
      const response = await workflowBackend.post(
        "/users/sendinvite",
        {
          email,
          role,
          workspaceId: Cookies.get("workspaceId"),
          adminId: Cookies.get("userId"),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Invitation sent successfully!");
      } else {
        alert("Failed to send invitation. Please try again.");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      alert("An error occurred while sending the invite. Please try again.");
    }

    setEmail("");
    setRole("member");
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleInvite} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Invite a Member</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter email" autoComplete="off" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="role" value="member" checked={role === "member"} onChange={(e) => setRole(e.target.value)} className="mr-2" />
              Member
            </label>
            <label className="flex items-center">
              <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={(e) => setRole(e.target.value)} className="mr-2" />
              Admin
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Invite</button>
        </div>
      </div>
    </form>
  );
}
