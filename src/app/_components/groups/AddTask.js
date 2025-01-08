import { useState } from "react";

export default function AddTask({ groupId, socket, setBoardData }) {
  const [taskData, setTaskData] = useState({
    itemName: "",
    assignedToId: "",
    status: "Ready to start",
    dueDate: "",
  });

  const statusOptions = [
    "Ready to start",
    "In Progress",
    "Waiting for review",
    "Pending Deploy",
    "Done",
    "Stuck",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    if (!taskData.itemName) {
      alert("Item Name and Assigned To are required!");
      return;
    }

    socket.emit("addItemToGroup", { groupId, item: taskData }, (updatedGroup) => {
      if (updatedGroup.error) {
        console.error(updatedGroup.error);
      } else {
        setBoardData((prev) => {
          const updatedGroups = prev.groups.map((group) =>
            group.groupId === groupId
              ? { ...group, items: [...group.items, updatedGroup] }
              : group
          );
          return { ...prev, groups: updatedGroups };
        });
      }
    });
    setTaskData({ itemName: "", assignedToId: "", status: "Ready to start", dueDate: "" }); // Reset form
  };

  return (
    <div className="mb-6">
      <div className="text-xl font-semibold mb-2">Add New Task</div>
      <div className="space-y-2">
        <input
          type="text"
          name="itemName"
          value={taskData.itemName}
          onChange={handleInputChange}
          placeholder="Task Name"
          className="px-2 w-full bg-transparent focus:outline-none focus:ring focus:ring-gray-400 focus:rounded-md"
        />
        <input
          type="text"
          name="assignedToId"
          value={taskData.assignedToId}
          onChange={handleInputChange}
          placeholder="Assigned To ID"
          className="px-2 w-full bg-transparent focus:outline-none focus:ring focus:ring-gray-400 focus:rounded-md"
        />
        <select
          name="status"
          value={taskData.status}
          onChange={handleInputChange}
          className="px-2 w-full bg-transparent focus:outline-none focus:ring focus:ring-gray-400 focus:rounded-md"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleInputChange}
          className="px-2 w-full bg-transparent focus:outline-none focus:ring focus:ring-gray-400 focus:rounded-md"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
