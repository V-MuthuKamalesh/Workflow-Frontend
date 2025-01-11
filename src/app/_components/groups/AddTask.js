"use client";

import { useState } from "react";
import { io } from "socket.io-client";

export default function AddTask(groupId) {
  const [newTaskName, setNewTaskName] = useState("");

  const handleAddTask = () => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    if (!newTaskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    const newItem = {
      itemName: newTaskName,
      assignedToId: [],
      status: "Pending",
      dueDate: new Date(),
    };

    socket.emit("addItemToGroup", { groupId, item: newItem }, (response) => {
      if (response?.error) {
        console.error("Error creating item:", response.error);
        return;
      }

      console.log(response);

      setNewTaskName("");
    });
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-1 py-1 w-96">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter task name..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="max-w-lg bg-transparent border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>
      </td>
    </tr>
  );
}
