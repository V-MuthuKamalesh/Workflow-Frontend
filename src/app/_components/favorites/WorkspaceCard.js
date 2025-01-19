import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

export function WorkspaceCard({ module, workspace }) {
  return (
    <div className="p-4 flex flex-col space-y-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition">
      <div className="flex items-center space-x-2">
        <BriefcaseBusiness className="text-gray-600 w-6 h-6" />
        <span className="font-semibold text-lg">{workspace.workspaceName}</span>
      </div>
      <div className="text-sm text-gray-600">
        {workspace.members.length}{" "}
        {workspace.members.length > 1 ? "members" : "member"}
      </div>
      <div className="text-sm text-gray-400">
        Number of Boards: {workspace.boards.length}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
          Favorite
        </span>
        <Link
          className="text-sm text-blue-600 hover:underline"
          href={`/${module}/workspace/${workspace.workspaceId}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
