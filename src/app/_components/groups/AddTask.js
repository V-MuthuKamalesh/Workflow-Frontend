"use client";

import { addItemToGroup } from "@/redux/feautres/boardSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

export default function AddTask({ module, boardType, groupId }) {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!taskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    // Dynamic newItem template
    const newItemTemplate = {
      "work-management": () => ({
        itemName: taskName,
        assignedToId: [],
        status: "",
        dueDate: new Date().toISOString(),
      }),
      crm: {
        Lead: () => ({
          leadName: taskName,
          status: "",
          company: "Company Name",
          title: "Title",
          email: "name@company.com",
          lastInteraction: new Date().toISOString(),
        }),
      },
      dev: {
        Bug: () => ({
          bugName: taskName,
          reporter: [],
          developer: [],
          priority: "",
          status: "",
        }),
        Sprint: () => ({
          sprintName: taskName,
          sprintGoals: "Type your sprint goals here",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
        }),
      },
      service: {
        Ticket: () => ({
          ticketName: taskName,
          description: "Ticket description",
          employee: [],
          agent: [],
          priority: "",
          status: "",
          requestType: "",
        }),
      },
    };

    const newItem =
      typeof newItemTemplate[module] === "function"
        ? newItemTemplate[module]()
        : newItemTemplate[module]?.[boardType]?.() || {};

    socket.emit(
      "addItemToGroup",
      { groupId, item: newItem, type: boardType },
      (response) => {
        if (!response) {
          console.error("Error adding task to group.");
          return;
        }

        console.log(response);

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
        <input
          type="text"
          placeholder="New task..."
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
        <button
          onClick={handleAddTask}
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </td>
    </tr>
  );
}
