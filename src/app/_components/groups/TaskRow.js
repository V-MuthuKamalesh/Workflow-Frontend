import { useState } from "react";
import StatusComponent from "../UI/StatusComponent";

export default function TaskRow({ item, fields, statusOptions, onEditTask }) {
  const [editingField, setEditingField] = useState(null);

  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      setEditingField(null);
    }
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  return (
    <tr className="hover:bg-gray-50">
      {fields.map((field) => (
        <td key={field} className="border border-gray-300 px-4 py-2 w-96">
          {field === "status" ? (
            <StatusComponent
              currentStatus={item[field]}
              statusOptions={statusOptions}
              onStatusChange={(newStatus) => onEditTask(field, newStatus)}
            />
          ) : editingField === field ? (
            <input
              type={field === "dueDate" ? "date" : "text"}
              value={
                field === "dueDate" ? item[field]?.split("T")[0] : item[field]
              }
              className="w-full bg-transparent border border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => onEditTask(field, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, field)}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span
              onClick={() => setEditingField(field)}
              className="cursor-pointer border border-transparent rounded-md hover:border-gray-400 px-2 py-1 transition"
              title="Click to edit"
            >
              {field === "dueDate"
                ? new Date(item[field]).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : field === "assignedToId"
                ? item[field].map((a) => a.email).join(", ")
                : item[field]}
            </span>
          )}
        </td>
      ))}
    </tr>
  );
}
