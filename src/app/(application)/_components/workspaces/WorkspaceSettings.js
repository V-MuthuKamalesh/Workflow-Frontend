// WorkspaceSettings.js
import React from "react";

export default function WorkspaceSettings({ workspaceId }) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-4">
      <h3 className="font-bold mb-4">Workspace Settings</h3>
      <form className="space-y-4">
        <div>
          <label htmlFor="workspaceName" className="block font-semibold">
            Workspace Name
          </label>
          <input
            type="text"
            id="workspaceName"
            defaultValue={`Workspace ${workspaceId}`}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="workspaceDescription" className="block font-semibold">
            Description
          </label>
          <textarea
            id="workspaceDescription"
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Describe your workspace..."
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save Settings
        </button>
      </form>
    </div>
  );
}
