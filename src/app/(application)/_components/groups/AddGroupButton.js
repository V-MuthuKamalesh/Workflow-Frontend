"use client";

import { createNewItem } from "@/app/_utils/helpers/helper";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { setBoardData } from "@/redux/feautres/boardSlice";
import { Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

export default function AddGroupButton({ module, isAdmin }) {
  const { data: boardData } = useSelector((state) => state.board);
  const { boardId, type: boardType } = boardData;
  const dispatch = useDispatch();

  const handleAddGroup = () => {
    const newItem = createNewItem(module, boardType);

    socket.emit(
      "createItem",
      { boardId, type: boardType, item: newItem },
      (response) => {
        if (!response) {
          console.error("Error creating item.");
          return;
        }

        const newGroup = {
          groupName: `New Group ${boardData.groups.length + 1}`,
        };

        socket.emit(
          "addGroupToBoard",
          { boardId, group: newGroup, itemId: response.itemId },
          (response) => {
            if (!response) {
              console.error("Error adding group to board.");
              return;
            }

            dispatch(setBoardData(response));
          }
        );
      }
    );
  };

  return (
    <Tooltip
      title={!isAdmin ? "You are not an admin" : "Add a new group"}
      arrow
    >
      <span>
        <button
          onClick={isAdmin ? handleAddGroup : undefined}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all ${
            isAdmin
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
          disabled={!isAdmin}
        >
          <Plus
            className={`w-5 h-5 text-white ${
              isAdmin ? "" : "hover:text-gray-500 cursor-not-allowed"
            }`}
          />
          <span>Add Group</span>
        </button>
      </span>
    </Tooltip>
  );
}
