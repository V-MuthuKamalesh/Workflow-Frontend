"use client";

import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { setBoardData } from "@/redux/feautres/boardSlice";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";

export default function DeleteGroupButton({ groupId, isAdmin }) {
  const { type: boardType } = useSelector((state) => state.board.data);
  const dispatch = useDispatch();

  const handleDeleteGroup = () => {
    socket.emit("removeGroupFromBoard", { groupId, type: boardType }, (response) => {
      if (!response) {
        console.error("Error deleting task.");
        return;
      }
      dispatch(setBoardData(response));
    });
  };

  const buttonClasses = isAdmin ? "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-400" : "bg-gray-400 text-white cursor-not-allowed";

  const iconClasses = isAdmin ? "text-white" : "text-white cursor-not-allowed";

  const tooltipText = isAdmin ? "Click to delete the group" : "You are not an admin";

  return (
    <div className="relative group">
      <button onClick={isAdmin ? handleDeleteGroup : () => {}} disabled={!isAdmin} className={`p-2 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${buttonClasses}`}>
        <Trash2 className={`w-5 h-5 ${iconClasses}`} />
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1 text-sm text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">{tooltipText}</div>
    </div>
  );
}
