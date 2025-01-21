"use client";

import { addItemToGroup } from "@/redux/feautres/boardSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

export default function AddTask({ module, boardId, boardType, groupId }) {
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.userDetails);

  const handleAddTask = (event) => {
    event.preventDefault();

    if (!taskName.trim()) {
      alert("Task name cannot be empty.");
      return;
    }

    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

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
        Task: () => ({
          taskName: taskName,
          person: [],
          priority: "",
          status: "",
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
      { boardId, type: boardType, groupId, item: newItem },
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
        <form
          onSubmit={isAdmin ? handleAddTask : (event) => event.preventDefault()}
        >
          <input
            type="text"
            placeholder="New task..."
            value={taskName}
            onChange={(event) => setTaskName(event.target.value)}
            className={`border rounded-md px-2 py-1 ${
              isAdmin
                ? "border-gray-300"
                : "border-gray-200 bg-gray-100 cursor-not-allowed"
            }`}
            disabled={!isAdmin}
          />
          <button
            className={`ml-2 px-2 py-1 rounded-md ${
              isAdmin
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-500 text-white hover:bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!isAdmin}
            title={!isAdmin ? "You are not an admin" : "Add a new task"}
          >
            Add Task
          </button>
        </form>
      </td>
    </tr>
  );
}
