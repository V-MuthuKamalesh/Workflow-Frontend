"use client";

import { useState, useCallback } from "react";
import Cookies from "js-cookie";
import { XCircle, Plus } from "lucide-react";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";

export default function CreateWorkspace({ onClose }) {
  const [workspaceName, setWorkspaceName] = useState("");

  const handleWorkspaceCreation = useCallback(() => {
    if (!workspaceName.trim() || !socket) return;

    socket.emit(
      "createWorkspace",
      {
        moduleId: Cookies.get("moduleId"),
        workspaceData: {
          createdBy: Cookies.get("userId"),
          workspaceName: workspaceName.trim(),
        },
      },
      (response) => {
        if (!response) {
          console.error("Error creating workspace.");
          return;
        }

        onClose();
      }
    );
  }, [workspaceName, onClose]);

  const handleInputChange = (e) => setWorkspaceName(e.target.value);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">🚀 Create Your Workspace</h2>
          <button onClick={onClose} aria-label="Close">
            <XCircle size={28} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <p className="text-gray-600 mb-4 text-base">Start organizing your projects and collaborating seamlessly.</p>

        <div className="mb-4">
          <input type="text" placeholder="Workspace Name" value={workspaceName} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base" />
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-5 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none text-base">
            Cancel
          </button>
          <button onClick={handleWorkspaceCreation} disabled={!workspaceName.trim()} className={`px-5 py-2 rounded-md flex items-center text-base ${workspaceName.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
            <Plus size={16} className="mr-2" />
            Create Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
