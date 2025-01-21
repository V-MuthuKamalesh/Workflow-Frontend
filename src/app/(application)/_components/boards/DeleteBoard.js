"use client";

import { removeBoard } from "@/redux/feautres/workspaceSlice";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function DeleteBoard({ boardId }) {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.userDetails);

  const handleDelete = (event) => {
    event.stopPropagation();

    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit("removeBoardFromWorkspace", { boardId }, (response) => {
      if (!response) {
        console.error("Error deleting board.");
        return;
      }

      console.log(response);

      for (const boardId of response) {
        dispatch(removeBoard(boardId));
      }
    });
  };

  return (
    <button
      onClick={isAdmin ? handleDelete : undefined}
      className={`text-gray-500 ${
        isAdmin
          ? "hover:text-red-500 transition duration-100"
          : "cursor-not-allowed"
      } z-50`}
      aria-label="Delete board"
      disabled={!isAdmin}
      title={!isAdmin ? "You are not an admin" : "Delete board"}
    >
      <Trash2 />
    </button>
  );
}
