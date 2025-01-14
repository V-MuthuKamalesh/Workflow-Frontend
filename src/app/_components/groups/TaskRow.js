"use client";

import { updateTaskField } from "@/redux/feautres/boardSlice";
import { useState } from "react";
import StatusComponent from "../UI/StatusComponent";
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
import { Plus } from "lucide-react";

export default function TaskRow({ item, fields }) {
  const [editingField, setEditingField] = useState(null);
  const [openAddAssignee, setOpenAddAssignee] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { members } = useSelector((state) => state.workspace);
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
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "removeMembersFromItem",
      {
        itemId: item.itemId,
        userId: assigneeId,
      },
      (response) => {
        if (!response) {
          console.error("Error removing assignee from task.");
        }

        dispatch(
          updateTaskField({
            taskId: item.itemId,
            field: "assignedToId",
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
      },
      (response) => {
        if (!response) {
          console.error("Error adding assignee to task.");
        }

        dispatch(
          updateTaskField({
            taskId: item.itemId,
            field: "assignedToId",
            value: response.assignedToId,
          })
        );
      }
    );

    setSelectedMember(null);
    setOpenAddAssignee(false);
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        {fields.map((field) => (
          <td key={field} className="border border-gray-300 px-1 py-1 w-96">
            {field === "status" ? (
              <StatusComponent
                currentStatus={item[field]}
                onStatusChange={(newStatus) => handleEditTask(field, newStatus)}
              />
            ) : field === "assignedToId" ? (
              <div className="flex flex-wrap gap-1">
                {item[field]?.map((assignee) => (
                  <Tooltip
                    key={assignee.userId}
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
                        <Avatar>
                          {assignee.email.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      onDelete={() => handleRemoveAssignee(assignee.userId)}
                      className="bg-gray-100 shadow-sm hover:bg-gray-200"
                    />
                  </Tooltip>
                ))}
                <Chip
                  avatar={<Plus />}
                  label="Add"
                  className="cursor-pointer bg-blue-100 hover:bg-blue-200"
                  onClick={() => setOpenAddAssignee(true)}
                />
              </div>
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

      <Dialog
        open={openAddAssignee}
        onClose={() => setOpenAddAssignee(false)}
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
          <Button onClick={() => setOpenAddAssignee(false)} color="error">
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
