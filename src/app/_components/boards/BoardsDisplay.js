"use client";

import { useSelector } from "react-redux";
import BoardCard from "./BoardCard";
import { useRouter } from "next/navigation";

export default function BoardsDisplay({ module }) {
  const { workspaceName, boards } = useSelector((state) => state.workspace);

  return (
    <>
      {boards.length === 0 ? (
        <span className="text-gray-500 text-lg italic">
          No boards found in {workspaceName}.
        </span>
      ) : (
        <div className="mt-1 grid grid-cols-4">
          {boards.map((board) => (
            <BoardCard
              key={board.boardId}
              module={module}
              workspaceName={workspaceName}
              boardName={board.boardName}
              boardId={board.boardId}
            />
          ))}
        </div>
      )}
    </>
  );
}
