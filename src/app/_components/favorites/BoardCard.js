import Link from "next/link";

export function BoardCard({ board }) {
  return (
    <div className="p-4 flex flex-col space-y-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition">
      <div className="font-semibold text-lg text-gray-700">{board.boardName}</div>
      <p className="text-sm text-gray-500">{board.description}</p>
      <div className="text-sm text-gray-400">Last updated: {board.lastUpdated}</div>
      <Link
        className="text-sm text-blue-600 hover:underline"
        href={`/work-management/workspace/${board.workspaceId}/board/${board.id}`}
      >
        View Details
      </Link>
    </div>
  );
}
