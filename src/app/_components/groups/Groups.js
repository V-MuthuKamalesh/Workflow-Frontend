"use client";

import { useSelector, useDispatch } from "react-redux";
import { editTask, addTask } from "@/lib/redux/feautures/boardSlice.js";
import { useState } from "react";
import AddGroupButton from "./AddGroupButton";
import AddNewTask from "./AddNewTask";

export default function Groups() {
  const dispatch = useDispatch();
  const boardData = useSelector((state) => state.board);
  const [newTaskData, setNewTaskData] = useState({});

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
      const fields =
        boardData.groups.find((group) => group.groupId === groupId)
          ?.entries[0] || {};

      const newTask = Object.keys(fields).reduce((task, field) => {
        task[field] = newTaskData[groupId]?.[field] || "";
        return task;
      }, {});

      dispatch(addTask({ groupId, task: newTask }));
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
                  {Object.keys(group.entries[0] || {}).map((field) => (
                    <th
                      key={field}
                      className="border border-gray-300 px-4 py-2 capitalize"
                    >
                      {field}
                    </th>
                  ))}
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
                          type={field === "date" ? "date" : "text"}
                          value={entry[field]}
                          className="w-full bg-transparent focus:outline-none focus:ring focus:ring-blue-200"
                          onChange={(event) =>
                            dispatch(
                              editTask({
                                groupId: group.groupId,
                                entryIndex,
                                field,
                                value: event.target.value,
                              })
                            )
                          }
                        />
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
      <AddGroupButton />
    </div>
  );
}
