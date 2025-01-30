"use client";

import { createNewItem } from "@/app/_utils/helpers/helper";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { addItemToGroup } from "@/redux/feautres/boardSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";

export default function AddTask({ module, groupId, isAdmin }) {
  const [taskName, setTaskName] = useState("");
  const { data: boardData } = useSelector((state) => state.board);
  const { boardId, type: boardType } = boardData;
  const dispatch = useDispatch();

  const handleAddTask = (event) => {
    event.preventDefault();

    if (!isAdmin) return;

    if (!taskName.trim()) {
      return alert("Task name cannot be empty.");
    }

    const newItem = createNewItem(module, boardType, taskName);

    socket.emit("addItemToGroup", { boardId, type: boardType, groupId, item: newItem }, (response) => {
      if (!response) {
        return console.error("Error adding task to group.");
      }

      const createdItem = { itemId: response._id, ...response };

      dispatch(addItemToGroup({ groupId, item: createdItem }));

      setTaskName("");
    });
  };

  const buttonClasses = isAdmin ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-white cursor-not-allowed";

  const inputClasses = isAdmin ? "border-gray-300" : "border-gray-200 bg-gray-100 cursor-not-allowed";

  const tooltipText = isAdmin ? "Click to add a new task" : "You are not an admin";

  return (
    <tr>
      <td colSpan="3">
        <form onSubmit={handleAddTask} className="flex items-center gap-2">
          <input type="text" placeholder="New task..." value={taskName} onChange={(e) => setTaskName(e.target.value)} className={`border rounded-md px-2 py-1 flex-grow focus:outline-none ${inputClasses}`} disabled={!isAdmin} />

          <button title={tooltipText} onClick={handleAddTask} disabled={!isAdmin} className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all ${buttonClasses}`}>
            <Plus className={`w-4 h-4 ${isAdmin ? "text-white" : "text-gray-100"}`} />
            <span>Add Task</span>
          </button>
        </form>
      </td>
    </tr>
  );
}
