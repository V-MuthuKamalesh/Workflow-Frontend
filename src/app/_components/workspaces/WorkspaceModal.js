"use client";

import { useState } from "react";

export default function WorkspaceModal({ onClose }) {
  const [workspaceName, setWorkspaceName] = useState("");

  function handleWorkspaceCreation() {
    console.log("Workspace");
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-3xl shadow-md min-h-10 w-[35rem] space-y-5">
        <div className="w-full mt-8 space-y-2">
          <h2 className="text-3xl font-bold mb-4">Add new workspace</h2>
          <p className="text-gray-600 text-lg">Workspace name</p>
          <input
            className="w-full outline-none border border-gray-300 p-2 rounded-sm"
            type="text"
            placeholder="Choose a name for your workspace"
            onChange={(event) => setWorkspaceName(event.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={handleWorkspaceCreation}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-150"
          >
            Add Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
