import { LayoutGrid } from "lucide-react";
import Link from "next/link";

export function WorkspaceCard({ module, workspace, isFavorite }) {
  return (
    <div className="p-5 flex flex-col bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-100">
      <div className="flex items-center space-x-3">
        <LayoutGrid className="text-purple-500 w-7 h-7" />
        <h3 className="text-lg font-semibold text-gray-800">
          {workspace.workspaceName}
        </h3>
      </div>

      <div className="mt-3 text-gray-600 text-sm space-y-1">
        <p>
          <span className="font-medium">{workspace.members.length}</span>
          {workspace.members.length === 1 ? " member" : " members"}
        </p>
        <p>
          Number of Boards:{" "}
          <span className="font-medium">{workspace.boards.length}</span>
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        {isFavorite && (
          <span className="text-xs font-medium bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
            💜 Favorite
          </span>
        )}
        <Link
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          href={`/${module}/workspace/${workspace.workspaceId}`}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
