import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { io } from "socket.io-client";

const moduleColors = {
  "work-management": "from-purple-600 to-purple-400",
  dev: "from-green-600 to-green-400",
  crm: "from-yellow-600 to-yellow-400",
  service: "from-teal-600 to-teal-400",
  default: "from-gray-600 to-gray-400",
};

export default function WorkspaceHeader({
  module,
  workspaceId,
  workspaceName,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState(workspaceName);
  const [deleteInput, setDeleteInput] = useState("");

  const bgColor = moduleColors[module] || moduleColors.default;

  const handleEditWorkspace = () => {
    // const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    // const

    // socket.emit("updateWorkspaceById", {
    //   id: workspaceId,
    //   updateData: updatedName,
    // });

    setIsDialogOpen(false);
  };

  const handleDeleteWorkspace = () => {
    if (deleteInput === `${module}/${workspaceName}`) {
      console.log("Workspace deleted:", workspaceName);
      setIsDialogOpen(false);
    } else {
      alert("Invalid input. Please enter the correct combination.");
    }
  };

  return (
    <div
      className={`bg-gradient-to-r ${bgColor} text-white p-6 rounded-lg shadow-lg flex justify-between items-center`}
    >
      <div>
        <h1 className="text-3xl font-bold leading-tight">{workspaceName}</h1>
        <p className="text-sm opacity-80 mt-1 capitalize">
          {module.replace("-", " ")}
        </p>
      </div>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center gap-2"
      >
        <span>Edit Workspace</span>
      </button>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Workspace</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <TextField
              label="Workspace Name"
              value={newWorkspaceName}
              onChange={(event) => setNewWorkspaceName(event.target.value)}
              fullWidth
            />
            <TextField
              label="Delete Confirmation"
              placeholder={`Enter work-management/${workspaceName}`}
              value={deleteInput}
              onChange={(event) => setDeleteInput(event.target.value)}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleEditWorkspace} color="primary">
            Save
          </Button>
          <Button
            onClick={handleDeleteWorkspace}
            color="warning"
            disabled={deleteInput !== `${module}t/${workspaceName}`}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
