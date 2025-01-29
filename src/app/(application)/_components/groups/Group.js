"use client";

import TaskRow from "./TaskRow";
import AddTask from "./AddTask";
import GroupHeader from "./GroupHeader";
import { useMemo, useState } from "react";
import getFields from "@/app/_utils/helpers/fields";
import DeleteGroupButton from "./DeleteGroupButton";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { Download } from "lucide-react";
import { handleExportGroup } from "@/app/_utils/helpers/helper";
import { CustomTooltip } from "../UI/CustomTooltip";

export default function Group({ module, boardType, group, isAdmin }) {
  const [editingGroupName, setEditingGroupName] = useState(false);
  const [groupName, setGroupName] = useState(group.groupName);

  const fields = useMemo(() => {
    return getFields(module, boardType);
  }, [module, boardType]);

  const handleGroupNameSave = (newName) => {
    socket.emit("updateGroupInBoard", { groupId: group.groupId, updateData: { groupName: newName } }, (response) => {
      if (!response) {
        console.error("Error updating group name.");
      }
    });
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

  const renderGroupName = () => {
    if (editingGroupName && isAdmin) {
      return <input type="text" value={groupName} onChange={(event) => setGroupName(event.target.value)} onKeyDown={handleKeyDown} onBlur={handleBlur} className="px-2 bg-transparent text-xl focus:outline-none focus:ring focus:ring-gray-400 focus:rounded-md" autoFocus />;
    }

    return (
      <div className="relative group">
        <span onClick={isAdmin ? () => setEditingGroupName(true) : () => {}} className={`cursor-pointer border border-transparent text-xl rounded-md px-2 py-1 transition ${isAdmin ? "hover:border-gray-400 text-lime-700" : "text-gray-400"}`}>
          {groupName}
        </span>
        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md px-2 py-1 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">{isAdmin ? "Click to edit group name" : "Only admins can edit the group name"}</div>
      </div>
    );
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center text-lime-700 font-semibold mb-2">
        {renderGroupName()}

        <div className="flex items-center space-x-6">
          <CustomTooltip text="Export the group .xlsx">
            <button onClick={() => handleExportGroup(group)} className="p-2 rounded-md bg-gray-500 text-white">
              <Download className="w-5 h-5" />
            </button>
          </CustomTooltip>

          <DeleteGroupButton groupId={group.groupId} isAdmin={isAdmin} />
        </div>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-300">
        <tbody>
          <GroupHeader fields={fields} />
          {group.items.map((item, index) => (
            <TaskRow key={index} module={module} item={item} fields={fields} isAdmin={isAdmin} />
          ))}
          <AddTask module={module} groupId={group.groupId} isAdmin={isAdmin} />
        </tbody>
      </table>
    </div>
  );
}
