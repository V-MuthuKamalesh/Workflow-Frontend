"use client";

import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { setBoardData } from "@/redux/feautres/boardSlice";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";

export default function DeleteGroupButton({ groupId, isAdmin }) {
  const { data: boardData } = useSelector((state) => state.board);
  const { type: boardType } = boardData;
  const dispatch = useDispatch();

  const handleDeleteGroup = () => {
    socket.emit(
      "removeGroupFromBoard",
      { groupId, type: boardType },
      (response) => {
        if (!response) {
          console.error("Error deleting task.");
          return;
        }

        dispatch(setBoardData(response));
      }
    );
  };

  return (
    <Tooltip title={!isAdmin ? "You are not an admin" : "Delete group"} arrow>
      <span>
        <button
          onClick={isAdmin ? handleDeleteGroup : undefined}
          className={`p-2 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            isAdmin
              ? "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-400"
              : "bg-red-500 text-white hover:bg-gray-500 focus:ring-red-400 cursor-not-allowed"
          }`}
          disabled={!isAdmin}
        >
          <Trash2
            className={`w-5 h-5 ${
              isAdmin ? "text-white" : "text-gray-400 cursor-not-allowed"
            }`}
          />
        </button>
      </span>
    </Tooltip>
  );
}
