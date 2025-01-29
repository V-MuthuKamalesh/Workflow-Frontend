"use client";

import { useState } from "react";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { deleteWorkspace } from "@/redux/feautres/userDetailsSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function EditWorkspace({ isDialogOpen, setIsDialogOpen, module, workspaceId, workspaceName }) {
  const [newWorkspaceName, setNewWorkspaceName] = useState(workspaceName);
  const [deleteInput, setDeleteInput] = useState("");
  const router = useRouter();

  const handleEditWorkspace = () => {
    socket.emit(
      "updateWorkspaceById",
      {
        id: workspaceId,
        moduleId: Cookies.get("moduleId"),
        updateData: { workspaceName: newWorkspaceName },
      },
      (response) => {
        if (!response) {
          console.error("Error updating workspace.");
        }
      }
    );

    setIsDialogOpen(false);
  };

  const handleDeleteWorkspace = () => {
    if (deleteInput === `${module}/${workspaceName}`) {
      socket.emit("deleteWorkspaceById", { id: workspaceId, moduleId: Cookies.get("moduleId") }, (response) => {
        if (!response) {
          console.error("Error deleting workspace.");
          return;
        }

        Cookies.remove("workspaceId");
      });

      router.push(`/${module}/view/dashboard`);

      setIsDialogOpen(false);
    } else {
      alert("Invalid input. Please enter the correct combination.");
    }
  };

  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Edit Workspace</h2>
              <button onClick={() => setIsDialogOpen(false)} aria-label="Close">
                <XCircle size={28} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-4">
              <input type="text" placeholder="Workspace Name" value={newWorkspaceName} onChange={(event) => setNewWorkspaceName(event.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
              <input type="text" placeholder={`Enter ${module}/${workspaceName}`} value={deleteInput} onChange={(event) => setDeleteInput(event.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-lg" />
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setIsDialogOpen(false)} className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none text-lg">
                Cancel
              </button>
              <button onClick={handleEditWorkspace} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none text-lg">
                Save
              </button>
              <button onClick={handleDeleteWorkspace} disabled={deleteInput !== `${module}/${workspaceName}`} className={`px-6 py-2 rounded-md text-lg ${deleteInput === `${module}/${workspaceName}` ? "bg-yellow-600 text-white hover:bg-yellow-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
