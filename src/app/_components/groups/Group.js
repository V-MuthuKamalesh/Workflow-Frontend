import { useState } from "react";
import GroupHeader from "./GroupHeader";
import TaskRow from "./TaskRow";

export default function Group({ group, socket, setBoardData }) {
  const [editingGroupName, setEditingGroupName] = useState(false);
  const [groupName, setGroupName] = useState(group.groupName);

  const displayedFields = ["itemName", "assignedToId", "status", "dueDate"];
  const statusOptions = [
    "Ready to start",
    "In Progress",
    "Waiting for review",
    "Pending Deploy",
    "Done",
    "Stuck",
  ];

  const handleEditTask = (entryIndex, field, value) => {
    setBoardData((prev) => {
      const updatedGroups = prev.groups.map((grp) => {
        if (grp.groupId === group.groupId) {
          const updatedItems = grp.items.map((item, index) => {
            if (index === entryIndex) {
              const updatedItem = { ...item, [field]: value };

              socket.emit(
                "updateItemInGroup",
                { itemId: item.itemId, updateData: updatedItem },
                (response) => {
                  if (response.error) {
                    console.error(response.error);
                  }
                }
              );

              return updatedItem;
            }
            return item;
          });

          return { ...grp, items: updatedItems };
        }
        return grp;
      });

      return { ...prev, groups: updatedGroups };
    });
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupNameSave = () => {
    socket.emit(
      "updateGroupInBoard",
      { groupId: group.groupId, updateData: { groupName } },
      (response) => {
        if (response.error) {
          console.error(response.error);
        } else {
          setEditingGroupName(false);
          setBoardData((prev) => {
            const updatedGroups = prev.groups.map((grp) =>
              grp.groupId === group.groupId ? { ...grp, groupName } : grp
            );
            return { ...prev, groups: updatedGroups };
          });
        }
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGroupNameSave();
    }
  };

  return (
    <div className="mb-6">
      <div className="text-xl font-semibold mb-2">
        {editingGroupName ? (
          <input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
            onKeyDown={handleKeyDown}
            onBlur={handleGroupNameSave}
            className="px-2 w-full bg-transparent focus:outline-none focus:ring"
            autoFocus
          />
        ) : (
          <span
            onClick={() => setEditingGroupName(true)}
            className="cursor-pointer border border-transparent rounded-md hover:border-gray-400 px-2 py-1 transition"
            title="Click to edit"
          >
            {groupName}
          </span>
        )}
      </div>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <GroupHeader fields={displayedFields} />
        </thead>
        <tbody>
          {group.items.map((item, index) => (
            <TaskRow
              key={index}
              item={item}
              fields={displayedFields}
              statusOptions={statusOptions}
              onEditTask={(field, value) => handleEditTask(index, field, value)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
