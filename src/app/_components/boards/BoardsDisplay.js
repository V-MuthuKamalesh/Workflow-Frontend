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
        console.log(response);
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
      <div className="text-gray-500 text-lg italic flex items-center">Loading boards...</div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      {boards.length === 0 ? (
        <span className="text-gray-500 text-lg italic">
          No boards found in {workspaceName}.
        </span>
      ) : (
        <div className="mt-3 grid grid-cols-4">
          {boards.map((board) => (
            <Link key={board.boardId} href={`/${module}/boards/${board.boardId}`}>
              <BoardCard boardName={board.boardName} workspaceName={workspaceName} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
