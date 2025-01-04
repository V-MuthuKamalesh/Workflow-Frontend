"use client";

import { useState } from "react";

export default function Groups({ boardInfo }) {
  const [boardData, setBoardData] = useState(boardInfo);
  const [newTaskData, setNewTaskData] = useState({}); // Temporary state for new task inputs

  function handleEdit(groupId, entryIndex, field, value) {
    setBoardData((prevData) => {
      const updatedGroups = prevData.groups.map((group) => {
        if (group.groupId === groupId) {
          const updatedEntries = [...group.entries];

          updatedEntries[entryIndex] = {
            ...updatedEntries[entryIndex],
            [field]: value,
          };

          return { ...group, entries: updatedEntries };
        }

        return group;
      });

      return { ...prevData, groups: updatedGroups };
    });
  }

  function handleAddGroup() {
    setBoardData((prevData) => {
      const newGroup = {
        groupId: Date.now(), // Unique ID
        groupName: `New Group ${prevData.groups.length + 1}`,
        entries: [],
      };

      return { ...prevData, groups: [...prevData.groups, newGroup] };
    });
  }

  function handleNewTaskInput(groupId, field, value) {
    setNewTaskData((prevData) => ({
      ...prevData,
      [groupId]: {
        ...prevData[groupId],
        [field]: value,
      },
    }));
  }

  function handleAddTask(groupId, e) {
    if (e.key === "Enter") {
      setBoardData((prevData) => {
        const updatedGroups = prevData.groups.map((group) => {
          if (group.groupId === groupId) {
            const newTask = {
              item: newTaskData[groupId]?.item || "New Task",
              person: newTaskData[groupId]?.person || "",
              status: newTaskData[groupId]?.status || "",
              date: newTaskData[groupId]?.date || "",
            };

            return { ...group, entries: [...group.entries, newTask] };
          }

          return group;
        });

        return { ...prevData, groups: updatedGroups };
      });

      // Clear the temporary task input state for the group
      setNewTaskData((prevData) => ({ ...prevData, [groupId]: {} }));
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-5">
        {boardData.workspaceName} - {boardData.boardName}
      </h1>
      <div className="space-y-14">
        {boardData.groups.map((group) => (
          <div key={group.groupId} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{group.groupName}</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Item</th>
                  <th className="border border-gray-300 px-4 py-2">Person</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {group.entries.map((entry, entryIndex) => (
                  <tr key={entryIndex} className="hover:bg-gray-50">
                    {Object.keys(entry).map((field) => (
                      <td
                        className="border border-gray-300 px-4 py-2"
                        key={field}
                      >
                        <input
                          type="text"
                          value={entry[field]}
                          className="w-full bg-transparent focus:outline-none focus:ring focus:ring-blue-200"
                          onChange={(e) =>
                            handleEdit(
                              group.groupId,
                              entryIndex,
                              field,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                {/* New task row */}
                <tr>
                  {Object.keys(group.entries[0]).map((field) => (
                    <td
                      key={field}
                      className="border border-gray-300 px-4 py-2"
                    >
                      <input
                        type="text"
                        placeholder={`Enter ${field}`}
                        value={newTaskData[group.groupId]?.[field] || ""}
                        className="w-full bg-transparent focus:outline-none focus:ring focus:ring-blue-200"
                        onChange={(e) =>
                          handleNewTaskInput(
                            group.groupId,
                            field,
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => handleAddTask(group.groupId, e)}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <button
        className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={handleAddGroup}
      >
        Add Group
      </button>
    </div>
  );
}
