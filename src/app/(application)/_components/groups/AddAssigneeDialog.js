"use client";

import { useState } from "react";

export default function AddAssigneeDialog({ open, setOpen, members, handleAddAssignee }) {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Add Assignee</h2>
        <div className="relative">
          <select
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedMember ? selectedMember.email : ""}
            onChange={(e) => {
              const selected = members.find((m) => m.email === e.target.value);
              setSelectedMember(selected);
            }}
          >
            <option value="" disabled>
              Select Member
            </option>
            {members.map((member) => (
              <option key={member.email} value={member.email}>
                {member.fullname} ({member.email})
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition ${!selectedMember ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} onClick={() => handleAddAssignee(selectedMember)} disabled={!selectedMember}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
