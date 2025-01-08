// WorkspaceSidebar.js
import React from "react";
import { Link } from "next/link";

export default function WorkspaceSidebar({ module, workspaceId }) {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="font-bold mb-4">Navigation</h2>
      <ul>
        <li>
          <Link
            href={`/${module}/workspace/${workspaceId}/boards`}
            className="block p-2 hover:bg-gray-200"
          >
            Boards
          </Link>
        </li>
        <li>
          <Link
            href={`/${module}/workspace/${workspaceId}/tasks`}
            className="block p-2 hover:bg-gray-200"
          >
            Tasks
          </Link>
        </li>
        <li>
          <Link
            href={`/${module}/workspace/${workspaceId}/files`}
            className="block p-2 hover:bg-gray-200"
          >
            Files
          </Link>
        </li>
        <li>
          <Link
            href={`/${module}/workspace/${workspaceId}/settings`}
            className="block p-2 hover:bg-gray-200"
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
