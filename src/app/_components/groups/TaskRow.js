"use client";

import { updateTaskField } from "@/redux/feautres/boardSlice";
import { useState } from "react";
import StatusComponent from "../UI/StatusComponent";
import { Avatar, Chip, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

export default function TaskRow({ item, fields }) {
  const [editingField, setEditingField] = useState(null);
  const dispatch = useDispatch();

  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      setEditingField(null);
    }
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const handleEditTask = (field, value) => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    const updatedItem = { ...item, [field]: value };

    socket.emit(
      "updateItemInGroup",
      {
        itemId: item.itemId,
        updateData: updatedItem,
      },
      (response) => {
        if (!response) {
          console.error("Error updating task.");
        }
      }
    );

    dispatch(updateTaskField({ taskId: item.itemId, field, value }));
  };

  const handleRemoveAssignee = (assigneeId) => {
    const updatedAssignees = item.assignedToId.filter(
      (assignee) => assignee.id !== assigneeId
    );
    handleEditTask("assignedToId", updatedAssignees);
  };

  return (
    <tr className="hover:bg-gray-50">
      {fields.map((field) => (
        <td key={field} className="border border-gray-300 px-1 py-1 w-96">
          {field === "status" ? (
            <StatusComponent
              currentStatus={item[field]}
              onStatusChange={(newStatus) => handleEditTask(field, newStatus)}
            />
          ) : field === "assignedToId" ? (
            editingField === field ? (
              <div className="flex flex-wrap gap-1">
                {item[field]?.map((assignee) => (
                  <Chip
                    key={assignee.id}
                    avatar={
                      <Avatar {...stringAvatar(assignee.fullname)}>
                        {assignee.email.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    label={assignee.email}
                    onDelete={() => handleRemoveAssignee(assignee.id)}
                    // deleteIcon={<CloseIcon />}
                    className="bg-gray-100 shadow-sm hover:bg-gray-200"
                  />
                ))}
                <span
                  className="text-blue-600 cursor-pointer ml-2"
                  onClick={() => setEditingField(null)}
                >
                  Done
                </span>
              </div>
            ) : (
              <div
                key={`assignedToId-${field}`}
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => setEditingField(field)}
              >
                {item[field]?.map((assignee) => (
                  <Tooltip
                    key={`tooltip-${assignee.id}`}
                    title={
                      <div className="text-sm">
                        <p>
                          <strong>Name:</strong>{" "}
                          {assignee.fullname || "Unknown"}
                        </p>
                        <p>
                          <strong>Email:</strong> {assignee.email}
                        </p>
                      </div>
                    }
                    arrow
                    placement="top"
                  >
                    <Avatar {...stringAvatar(assignee.fullname)}>
                      {assignee.email.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </div>
            )
          ) : editingField === field ? (
            <input
              type={field === "dueDate" ? "date" : "text"}
              value={
                field === "dueDate" ? item[field]?.split("T")[0] : item[field]
              }
              className="w-full bg-transparent border border-gray-300 rounded-md focus:outline-none"
              onChange={(event) => handleEditTask(field, event.target.value)}
              onKeyDown={(event) => handleKeyDown(event, field)}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span
              onClick={() => setEditingField(field)}
              className="cursor-pointer border border-transparent rounded-md hover:border-gray-400 px-1 py-0.5 transition"
              title="Click to edit"
            >
              {field === "dueDate"
                ? new Date(item[field]).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : item[field]}
            </span>
          )}
        </td>
      ))}
    </tr>
  );
}
