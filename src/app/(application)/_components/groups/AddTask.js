"use client";

import { createNewItem } from "@/app/_utils/helpers/helper";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { addItemToGroup } from "@/redux/feautres/boardSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { Plus } from "lucide-react";

export default function AddTask({ module, groupId, isAdmin }) {
  const [taskName, setTaskName] = useState("");
  const { data: boardData } = useSelector((state) => state.board);
  const { boardId, type: boardType } = boardData;
  const dispatch = useDispatch();

  const handleAddTask = (event) => {
    event.preventDefault();

    if (!taskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    const newItem = createNewItem(module, boardType, taskName);

    socket.emit(
      "addItemToGroup",
      { boardId, type: boardType, groupId, item: newItem },
      (response) => {
        if (!response) {
          console.error("Error adding task to group.");
          return;
        }

        const createdItem = {
          itemId: response._id,
          ...response,
        };

        dispatch(addItemToGroup({ groupId, item: createdItem }));
        setTaskName("");
      }
    );
  };

  return (
    <tr>
      <td colSpan="3">
        <form
          onSubmit={isAdmin ? handleAddTask : (event) => event.preventDefault()}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="New task..."
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            className={`border rounded-md px-2 py-1 flex-grow focus:outline-none ${
              isAdmin
                ? "border-gray-300"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
            disabled={!isAdmin}
          />
          <Tooltip
            title={!isAdmin ? "You are not an admin" : "Add a new task"}
            arrow
          >
            <span>
              <button
                className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${
                  isAdmin
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-blue-500 text-white hover:bg-gray-500 cursor-not-allowed"
                }`}
                disabled={!isAdmin}
              >
                <Plus
                  className={`w-4 h-4 ${
                    isAdmin ? "text-white" : "hover:text-gray-400"
                  }`}
                />
                <span>Add Task</span>
              </button>
            </span>
          </Tooltip>
        </form>
      </td>
    </tr>
  );
}
