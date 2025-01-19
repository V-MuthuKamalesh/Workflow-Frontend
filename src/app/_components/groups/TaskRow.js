"use client";

import {
  removeItemFromGroup,
  updateTaskField,
} from "@/redux/feautres/boardSlice";
import { useState } from "react";
import {
  Avatar,
  Chip,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Plus, Trash2 } from "lucide-react";
import Priority from "../UI/Priority";
import RequestType from "../UI/RequestType";
import Status from "../UI/Status";

export default function TaskRow({ module, boardId, boardType, item, fields }) {
  const [editingField, setEditingField] = useState(null);
  const [openAddAssignee, setOpenAddAssignee] = useState({
    open: false,
    assigneeType: null,
  });
  const [selectedMember, setSelectedMember] = useState(null);
  const { members } = useSelector((state) => state.workspace);
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditingField(null);
    }
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const handleEditTask = (field, value) => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    let updatedItem = { ...item, [field]: value };

    socket.emit(
      "updateItemInGroup",
      {
        boardId,
        type: boardType,
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

  const handleDeleteTask = () => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "removeItemFromGroup",
      {
        itemId: item.itemId,
        type: boardType,
      },
      (response) => {
        if (!response) {
          console.error("Error deleting task.");
          return;
        }

        dispatch(
          removeItemFromGroup({
            groupId: response.groupId,
            itemId: item.itemId,
          })
        );
      }
    );
  };

  const handleRemoveAssignee = (assigneeId, assigneeType) => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "removeMembersFromItem",
      {
        itemId: item.itemId,
        userId: assigneeId,
        type: assigneeType,
      },
      (response) => {
        if (!response) {
          console.error("Error removing assignee from task.");
        }

        dispatch(
          updateTaskField({
            taskId: item.itemId,
            field: assigneeType,
            value: response.assignedToId,
          })
        );
      }
    );
  };

  const handleAddAssignee = () => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "addMembersToItem",
      {
        itemId: item.itemId,
        userId: selectedMember.userId,
        type: openAddAssignee.assigneeType,
      },
      (response) => {
        if (!response) {
          console.error("Error adding assignee to task.");
        }

        dispatch(
          updateTaskField({
            taskId: item.itemId,
            field: openAddAssignee.assigneeType,
            value: response.assignedToId,
          })
        );
      }
    );

    setSelectedMember(null);
    setOpenAddAssignee({ open: false, assigneeType: null });
  };

  const getFieldDisplay = (field) => {
    if (field === "status") {
      return (
        <Status
          module={module}
          type={boardType}
          currentStatus={item[field]}
          onStatusChange={(newStatus) => handleEditTask(field, newStatus)}
        />
      );
    }

    if (field === "priority") {
      return (
        <Priority
          module={module}
          type={boardType}
          currentPriority={item[field]}
          onPriorityChange={(newPriority) => handleEditTask(field, newPriority)}
        />
      );
    }

    if (field === "requestType") {
      return (
        <RequestType
          module={module}
          type={boardType}
          currentRequestType={item[field]}
          onRequestTypeChange={(newRequestType) =>
            handleEditTask(field, newRequestType)
          }
        />
      );
    }

    if (
      field === "assignedToId" ||
      field === "person" ||
      field === "reporter" ||
      field === "developer" ||
      field === "employee" ||
      field === "agent"
    ) {
      return (
        <div className="flex flex-wrap gap-1">
          {item[field]?.map((assignee, index) => (
            <Tooltip
              key={`${field}-${assignee.userId}-${index}`}
              title={
                <div>
                  <strong>Name:</strong> {assignee.fullname || "Unknown"}
                  <br />
                  <strong>Email:</strong> {assignee.email}
                </div>
              }
              arrow
            >
              <Chip
                avatar={
                  <Avatar>{assignee.email.charAt(0).toUpperCase()}</Avatar>
                }
                onDelete={() => handleRemoveAssignee(assignee.userId, field)}
                className="bg-gray-100 shadow-sm hover:bg-gray-200"
              />
            </Tooltip>
          ))}
          <Chip
            avatar={<Plus />}
            label="Add"
            className="cursor-pointer bg-blue-100 hover:bg-blue-200"
            onClick={() =>
              setOpenAddAssignee({ open: true, assigneeType: field })
            }
          />
        </div>
      );
    }

    if (editingField === field) {
      return (
        <input
          type={
            field === "dueDate" ||
            field === "startDate" ||
            field === "endDate" ||
            field === "lastInteraction"
              ? "date"
              : "text"
          }
          value={field === "dueDate" ? item[field]?.split("T")[0] : item[field]}
          className="w-full bg-transparent border border-gray-300 rounded-md focus:outline-none"
          onChange={(event) => handleEditTask(field, event.target.value)}
          onKeyDown={(event) => handleKeyDown(event, field)}
          onBlur={handleBlur}
          autoFocus
        />
      );
    }

    return (
      <span
        onClick={() => setEditingField(field)}
        className="cursor-pointer border border-transparent rounded-md hover:border-gray-400 px-1 py-0.5 transition"
        title="Click to edit"
      >
        {field === "dueDate" ||
        field === "startDate" ||
        field === "endDate" ||
        field === "lastInteraction"
          ? new Date(item[field]).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : item[field]}
      </span>
    );
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        {fields.map((field) => (
          <td key={field} className="border border-gray-300 px-1 py-1 w-96">
            {getFieldDisplay(field)}
          </td>
        ))}
        <td className="border border-gray-300 px-1 py-1 w-10">
          <Trash2
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={handleDeleteTask}
          />
        </td>
      </tr>

      <Dialog
        open={openAddAssignee.open}
        onClose={() => setOpenAddAssignee({ open: false, assigneeType: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Assignee</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={members}
            getOptionLabel={(option) => `${option.fullname} (${option.email})`}
            renderInput={(params) => (
              <TextField {...params} label="Select Member" />
            )}
            value={selectedMember}
            onChange={(event, newValue) => setSelectedMember(newValue)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setOpenAddAssignee({ open: false, assigneeType: null })
            }
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddAssignee}
            color="primary"
            disabled={!selectedMember}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
