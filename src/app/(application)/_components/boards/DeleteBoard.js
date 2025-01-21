"use client";

import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { removeBoard } from "@/redux/feautres/workspaceSlice";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import useCheckUserRole from "../../hooks/useCheckUserRole";
import Cookies from "js-cookie";

export default function DeleteBoard({ workspaceId, boardId }) {
  const dispatch = useDispatch();
  const { isAdmin } = useCheckUserRole(Cookies.get("userId"), workspaceId);

  const handleDelete = (event) => {
    event.stopPropagation();

    socket.emit("removeBoardFromWorkspace", { boardId }, (response) => {
      if (!response) {
        console.error("Error deleting board.");
        return;
      }

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
