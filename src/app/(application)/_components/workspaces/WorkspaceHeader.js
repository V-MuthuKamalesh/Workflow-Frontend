"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Star, UserPlus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteWorkspace } from "@/redux/feautres/userDetailsSlice";
import Invite from "./Invite";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import EditWorkspace from "./EditWorkspace";
import { groupMembers } from "@/app/_utils/helpers/helper";
import { appGradients } from "@/app/_utils/constants/colors";
import { updateWorkspaceData } from "@/redux/feautres/workspaceSlice";
import useCheckUserRole from "../../hooks/useCheckUserRole";

export default function WorkspaceHeader({ module, workspaceId, workspaceName, members }) {
  const { isAdmin } = useCheckUserRole(Cookies.get("userId"), workspaceId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditWorkspaceOpen, setIsEditWorkspaceOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const bgColor = appGradients[module] || appGradients.default;
  const groupedMembers = groupMembers(members);

  useEffect(() => {
    socket.on("workspaceNameUpdated", (data) => {
      dispatch(updateWorkspaceData({ field: "workspaceName", value: data.workspaceName }));
    });
    return () => {
      socket.off("workspaceNameUpdated");
    };
  }, [dispatch]);

  useEffect(() => {
    socket.emit("isWorkspaceInFavourite", { workspaceId, type: module }, (response) => {
      if (response) {
        setIsFavorite(response.isFavourite);
      }
    });
  }, [workspaceId, module]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    socket.emit(isFavorite ? "removeFavouriteWorkspace" : "addFavouriteWorkspace", { workspaceId, type: module });
  };

  const handleExitWorkspace = async () => {
    if (isAdmin) {
      if (groupedMembers.admin.length === 1 && groupedMembers.member.length === 0) {
        alert("You cannot exit the workspace as the only admin. Please delete it instead.");
        return;
      } else if (groupedMembers.admin.length === 1 && groupedMembers.member.length > 0) {
        alert("You cannot exit the workspace as only admin have access. Please promote someone to admin first.");
        return;
      }
    }

    try {
      const response = await workflowBackend.post(
        "/users/removeMember",
        { workspaceId, userId: Cookies.get("userId") },
        { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } }
      );

      if (response.status === 200) {
        dispatch(deleteWorkspace(workspaceId));
        router.push(`/${module}/view/dashboard`);
      }
    } catch (error) {
      console.error("Error exiting workspace:", error);
    }
  };

  return (
    <div
      className={`bg-gradient-to-r ${bgColor} w-full p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0`}
    >
      <div className="text-white flex flex-col items-center md:items-start text-center md:text-left space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{workspaceName}</h1>

        <button
          onClick={() => setIsEditWorkspaceOpen(true)}
          className="py-2 px-4 md:px-6 rounded-lg bg-gray-800 text-white hover:bg-gray-700 text-sm md:text-base"
          title={!isAdmin ? "You are not an admin" : ""}
          disabled={!isAdmin}
        >
          Edit Workspace
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={toggleFavorite}
          className="text-yellow-400 hover:text-yellow-500"
        >
          {isFavorite ? <Star fill="yellow" size={20} /> : <Star fill="white" size={20} />}
        </button>

        {isAdmin && (
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
          >
            <UserPlus size={20} />
          </button>
        )}

        <button onClick={handleExitWorkspace} className="p-2 bg-red-500 hover:bg-red-400 text-white rounded-lg">
          <LogOut size={20} />
        </button>
      </div>

      <EditWorkspace
        isDialogOpen={isEditWorkspaceOpen}
        setIsDialogOpen={setIsEditWorkspaceOpen}
        module={module}
        workspaceId={workspaceId}
        workspaceName={workspaceName}
      />
      <Invite isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </div>
  );
}
