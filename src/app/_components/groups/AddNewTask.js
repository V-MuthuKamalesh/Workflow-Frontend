export default function AddNewTask({
  group,
  newTaskData,
  handleNewTaskInput,
  handleAddTask,
}) {
  return (
    <tr>
      {Object.keys(group.entries[0] || {}).map((field) => (
        <td key={field} className="border border-gray-300 px-4 py-2">
          <input
            type={field === "date" ? "date" : "text"}
            placeholder={`Enter ${field}`}
            value={newTaskData[group.groupId]?.[field] || ""}
            className="w-full bg-transparent focus:outline-none focus:ring focus:ring-blue-200"
            onChange={(event) =>
              handleNewTaskInput(group.groupId, field, event.target.value)
            }
            onKeyDown={(event) => handleAddTask(group.groupId, event)}
          />
        </td>
      ))}
    </tr>
  );
}
