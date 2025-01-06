export default function AddNewTask({
  group,
  newTaskData,
  handleNewTaskInput,
  handleAddTask,
}) {
  return (
    <tr>
      {Object.keys(group.items[0] || {}).map((field) => (
        <td key={field} className="border border-gray-300 px-4 py-2">
          <input
            type={field === "dueDate" ? "date" : "text"}
            placeholder={`Enter ${convertFromCamelCasetoNormalText(field)}`}
            value={newTaskData[group.groupId]?.[field] || ""}
            className="capitalize w-full bg-transparent focus:outline-none focus:ring focus:ring-blue-200"
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
