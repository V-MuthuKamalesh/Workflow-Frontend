"use client";

import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { appButtonColors } from "@/app/_utils/constants/colors";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { addBoard } from "@/redux/feautres/workspaceSlice";

export default function CreateBoard({ module, workspaceId }) {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    boardName: "",
    boardType: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { boardName, boardType } = formState;
  const appButtonColor = appButtonColors[module];

  const moduleOptions = useMemo(() => {
    switch (module) {
      case "service":
        return [{ value: "Ticket", label: "Ticket" }];
      case "dev":
        return [
          { value: "Bug", label: "Bug" },
          { value: "Sprint", label: "Sprint" },
        ];
      case "crm":
        return [{ value: "Lead", label: "Lead" }];
      default:
        return [];
    }
  }, [module]);

  const isWorkManagement = module === "work-management";
  const isCreateDisabled = !boardName.trim() || (!isWorkManagement && !boardType.trim()) || loading;

  const handleInputChange = (field) => (event) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleCreateBoard = async (event) => {
    event.preventDefault();

    if (!boardName.trim()) {
      setError("Board name is required");
      return;
    }

    setError("");
    setLoading(true);

    const board = {
      boardName,
      type: boardType,
      createdById: Cookies.get("userId"),
    };

    socket.emit("addBoardToWorkspace", { id: workspaceId, board }, (response) => {
      setLoading(false);

      if (!response) {
        setError("Error creating board.");
        return;
      }

      response.forEach((board) => {
        dispatch(addBoard(board));
      });

      setFormState({ boardName: "", boardType: "" });
    });
  };

  return (
    <form onSubmit={handleCreateBoard} className="mt-1 max-w-md">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={boardName}
          onChange={handleInputChange("boardName")}
          placeholder="Enter board name"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {moduleOptions.length > 0 && (
          <select
            value={boardType}
            onChange={handleInputChange("boardType")}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select type
            </option>
            {moduleOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          disabled={isCreateDisabled}
          title={isCreateDisabled ? "Enter Board Name" : "Create Board"}
          className={`px-6 py-2 text-white rounded-lg ${
            isCreateDisabled ? "bg-gray-400 cursor-not-allowed" : appButtonColor
          }`}
        >
          {loading ? "Creating..." : "Create"}
        </button>

        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </form>
  );
}
