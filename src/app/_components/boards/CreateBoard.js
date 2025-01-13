"use client";

import { addBoard } from "@/redux/feautres/workspaceSlice";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

export default function CreateBoard({ workspaceId }) {
  const [boardName, setBoardName] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleCreateBoard = (event) => {
    event.preventDefault();

    if (!boardName.trim()) {
      setError("Board name is required");
      return;
    }

    const board = {
      boardName,
      createdById: Cookies.get("userId"),
    };

    setLoading(true);

    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "addBoardToWorkspace",
      { id: workspaceId, board },
      (response) => {
        if (!response) {
          setError("Error creating board.");
          setLoading(false);
          return;
        }

        dispatch(addBoard(response));
        setBoardName("");
        setLoading(false);
      }
    );
  };

  return (
    <form onSubmit={handleCreateBoard} className="mt-1 max-w-md">
      <div className="flex items-center space-x-4 ">
        <input
          type="text"
          value={boardName}
          onChange={(event) => setBoardName(event.target.value)}
          placeholder="Enter board name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-white rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </form>
  );
}
