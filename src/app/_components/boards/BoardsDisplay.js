"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Link from "next/link";
import BoardCard from "./BoardCard";

export default function BoardsDisplay({ module, workspaceId }) {
  const [boards, setBoards] = useState([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit("getBoardsByWorkspaceById", { id: workspaceId }, (response) => {
      if (response.error) {
        setError(response.error);
        setLoading(false);
      } else {
        setWorkspaceName(response.workspaceName);
        setBoards(response.boards || []);
        setLoading(false);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [workspaceId]);

  if (loading) {
    return (
      <div className="text-gray-500 ml-32 text-lg italic pt-7 flex items-center justify-center">
        Loading boards...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 ml-32">{error}</div>;
  }

  return (
    <div className="pt-7">
      <h1 className="ml-32 text-xl font-medium">Boards</h1>
      {boards.length === 0 ? (
        <span className="ml-32 text-gray-500 text-lg italic">
          No boards found in {workspaceName}.
        </span>
      ) : (
        <div className="mt-3 grid grid-cols-3 mx-32">
          {boards.map((board) => (
            <Link
              key={board.boardId}
              href={`/${module}/boards/${board.boardId}`}
            >
              <BoardCard
                boardName={board.boardName}
                workspaceName={workspaceName}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
