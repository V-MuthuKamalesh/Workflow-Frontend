"use client";

import { addItemToGroup } from "@/redux/feautres/boardSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

export default function AddTask({ groupId }) {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!taskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    const newItem = {
      itemName: taskName,
      assignedToId: [],
      status: "",
      dueDate: new Date().toISOString(),
    };

    socket.emit("addItemToGroup", { groupId, item: newItem }, (response) => {
      if (!response) {
        console.error("Error adding task to group.");
        return;
      }

      console.log(response);

      const newItem = {
        itemId: response._id,
        itemName: response.itemName,
        assignedToId: response.assignedToId,
        status: response.status,
        dueDate: response.dueDate,
      };

      dispatch(addItemToGroup({ groupId, item: newItem }));
      setTaskName("");
    });
  };

  return (
    <tr>
      <td colSpan="3">
        <input
          type="text"
          placeholder="New task..."
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </td>
    </tr>
  );
}
