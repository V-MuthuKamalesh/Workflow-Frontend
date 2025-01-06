"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AddNewTask from "./AddNewTask";
import { convertFromCamelCasetoNormalText } from "@/app/_utils/helpers/helper";
import AddGroupButton from "./AddGroupButton";

export default function GroupsDisplay({ boardId }) {
  const [boardData, setBoardData] = useState({ groups: [] });
  const [newTaskData, setNewTaskData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayedFields = ["itemName", "assignedTo", "status", "dueDate"];

  useEffect(() => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit("getBoardById", { boardId }, (response) => {
      setLoading(false);

      if (response.error) {
        setError(response.error);
      } else {
        setBoardData(response);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [boardId]);

  if (loading) {
    return (
      <div className="text-gray-500 ml-32 text-lg italic pt-7 flex items-center justify-center">
        Loading Groups...
      </div>
    );
  }

  if (error) {
    return <div className="ml-32 text-red-500">{error}</div>;
  }

  console.log(boardData);

  function handleNewTaskInput(groupId, field, value) {
    setNewTaskData((prevData) => ({
      ...prevData,
      [groupId]: {
        ...prevData[groupId],
        [field]: value,
      },
    }));
  }

  function handleAddTask(groupId, event) {
    if (event.key === "Enter") {
      const newTask = displayedFields.reduce((task, field) => {
        task[field] =
          newTaskData[groupId]?.[field] || (field === "assignedToId" ? [] : "");
        return task;
      }, {});

      setBoardData((prevBoardData) => {
        const updatedGroups = prevBoardData.groups.map((group) => {
          if (group.groupId === groupId) {
            return { ...group, items: [...group.items, newTask] };
          }
          return group;
        });

        return { ...prevBoardData, groups: updatedGroups };
      });

      setNewTaskData((prevData) => ({ ...prevData, [groupId]: {} }));
    }
  }

  function handleEditTask(groupId, entryIndex, field, value) {
    setBoardData((prevBoardData) => {
      const updatedGroups = prevBoardData.groups.map((group) => {
        if (group.groupId === groupId) {
          const updatedItems = group.items.map((item, index) => {
            if (index === entryIndex) {
              return { ...item, [field]: value };
            }
            return item;
          });
          return { ...group, items: updatedItems };
        }
        return group;
      });

      return { ...prevBoardData, groups: updatedGroups };
    });
  }

  const handleAddGroup = () => {
    const newGroup = {
      groupId: Date.now().toString(),
      groupName: `New Group ${boardData.groups.length + 1}`,
      items: [
        {
          itemName: "",
          assignedToId: [],
          status: "",
          dueDate: "",
        },
      ],
    };

    setBoardData((prevBoardData) => ({
      ...prevBoardData,
      groups: [...prevBoardData.groups, newGroup],
    }));
  };

  return (
    <div className="px-16 py-8">
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
                  {displayedFields.map((field) => (
                    <th
                      key={field}
                      className="border border-gray-300 px-4 py-2 capitalize"
                    >
                      {convertFromCamelCasetoNormalText(field)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.items.map((item, itemIndex) => (
                  <tr key={itemIndex} className="hover:bg-gray-50">
                    {displayedFields.map((field) => (
                      <td
                        className="border border-gray-300 px-4 py-2"
                        key={field}
                      >
                        {field === "assignedToId" ? (
                          <input
                            type="text"
                            value={item[field]
                              .map((assigned) => assigned.email)
                              .join(", ")}
                            className="w-full bg-transparent focus:outline-none focus:ring focus:ring-blue-200"
                            onChange={(event) =>
                              handleEditTask(
                                group.groupId,
                                itemIndex,
                                field,
                                event.target.value.split(", ").map((email) => ({
                                  _id: Date.now().toString(),
                                  email,
                                  fullname: email.split("@")[0],
                                }))
                              )
                            }
                          />
                        ) : (
                          <input
                            type={field === "dueDate" ? "date" : "text"}
                            value={item[field]}
                            className="w-full bg-transparent focus:outline-none focus:ring focus:ring-blue-200"
                            onChange={(event) =>
                              handleEditTask(
                                group.groupId,
                                itemIndex,
                                field,
                                event.target.value
                              )
                            }
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <AddNewTask
                  group={group}
                  newTaskData={newTaskData}
                  handleNewTaskInput={handleNewTaskInput}
                  handleAddTask={handleAddTask}
                />
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <AddGroupButton handleAddGroup={handleAddGroup} />
    </div>
  );
}
