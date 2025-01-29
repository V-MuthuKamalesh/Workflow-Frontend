"use client";

import { useSelector } from "react-redux";
import BoardCard from "./BoardCard";

export default function BoardsDisplay({ module }) {
  const { workspaceName, boards, workspaceId } = useSelector((state) => state.workspace);

  if (!boards.length) {
    return <span className="text-gray-500 text-lg italic">No boards found in {workspaceName}.</span>;
  }

  return (
    <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {boards.map(({ boardId, boardName }) => (
        <BoardCard key={boardId} module={module} workspaceId={workspaceId} workspaceName={workspaceName} boardId={boardId} boardName={boardName} />
      ))}
    </div>
  );
}
