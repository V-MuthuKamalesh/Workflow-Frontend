"use client";

import { useDispatch, useSelector } from "react-redux";
import { setBoardData, updateGroup } from "@/redux/feautres/boardSlice.js";
import TaskRow from "./TaskRow";
import AddTask from "./AddTask";
import GroupHeader from "./GroupHeader";
import { io } from "socket.io-client";
import { useMemo, useState } from "react";
import { moduleFields } from "@/app/_utils/helpers/fields";

export default function Group({ module, boardType, boardId, group }) {
  const [editingGroupName, setEditingGroupName] = useState(false);
  const [groupName, setGroupName] = useState(group.groupName);
  const dispatch = useDispatch();

  const fields = useMemo(() => {
    if (module === "work-management") {
      return moduleFields["work-management"];
    }
    if (moduleFields[module] && moduleFields[module][boardType]) {
      return moduleFields[module][boardType];
    }
    return [];
  }, [module, boardType]);

  const handleGroupNameSave = (newName) => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "updateGroupInBoard",
      { groupId: group.groupId, updateData: { groupName: newName } },
      (response) => {
        if (!response) {
          console.error("Error updating group name.");
          return;
        }
      }
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGroupNameSave(groupName);
      setEditingGroupName(false);
    }
  };

  const handleBlur = () => {
    handleGroupNameSave(groupName);
    setEditingGroupName(false);
  };

  const handleDeleteGroup = (groupId) => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit(
      "removeGroupFromBoard",
      { groupId, type: boardType },
      (response) => {
        if (!response) {
          console.error("Error deleting task.");
          return;
        }

        dispatch(setBoardData(response));
      }
    );
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center font-semibold mb-2">
        {editingGroupName ? (
          <input
            type="text"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="px-2 bg-transparent text-xl focus:outline-none focus:ring focus:ring-gray-400 focus:rounded-md"
            autoFocus
          />
        ) : (
          <span
            onClick={() => setEditingGroupName(true)}
            className="cursor-pointer border border-transparent text-xl rounded-md hover:border-gray-400 px-2 py-1 transition"
            title="Click to edit"
          >
            {groupName}
          </span>
        )}
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
          onClick={() => handleDeleteGroup(group.groupId)}
        >
          Delete Group
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <tbody>
          <GroupHeader fields={fields} />
          {group.items.map((item, index) => (
            <TaskRow
              key={index}
              module={module}
              boardType={boardType}
              item={item}
              fields={fields}
            />
          ))}
          <AddTask
            module={module}
            boardType={boardType}
            groupId={group.groupId}
          />
        </tbody>
      </table>
    </div>
  );
}
