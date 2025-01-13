"use client";

import { setWorkspaceData } from "@/redux/feautres/workspaceSlice";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

export default function DeleteBoard({ boardId }) {
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    event.stopPropagation();

    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit("removeBoardFromWorkspace", { boardId }, (response) => {
      if (!response) {
        console.error("Error deleting board.");
        return;
      }

      dispatch(setWorkspaceData(response));
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="text-gray-500 hover:text-red-500 transition duration-100 z-50"
      aria-label="Delete board"
    >
      <Trash2 />
    </button>
  );
}
