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
import { CustomTooltip } from "../UI/CustomTooltip";

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
      } else {
        console.error("Error checking if workspace is in favourite.");
      }
    });
  }, [workspaceId, module]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    socket.emit(isFavorite ? "removeFavouriteWorkspace" : "addFavouriteWorkspace", { workspaceId, type: module }, (response) => {
      if (!response) {
        console.error("Error toggling favorite workspace.");
      }
    });
  };

  const handleExitWorkspace = async () => {
    if (groupedMembers.admin.length === 1) {
      if (groupedMembers.member.length === 0) {
        alert("You cannot exit the workspace because you are the only admin, and there are no members left. Please delete the workspace instead.");
        return;
      } else {
        alert("You cannot exit the workspace as the only admin. Please promote another member to admin before you leave.");
        return;
      }
    }

    try {
      const response = await workflowBackend.post(
        "/users/removeMember",
        {
          workspaceId,
          userId: Cookies.get("userId"),
          token: Cookies.get("authToken"),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
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
    <div className={`bg-gradient-to-r ${bgColor} w-full p-6 rounded-lg shadow-lg flex justify-between items-center`}>
      <div className="text-white flex flex-col items-start space-y-3">
        <h1 className="text-3xl font-bold leading-tight">{workspaceName}</h1>

        <CustomTooltip text={isAdmin ? "Edit workspace" : "You are not an admin. Editing workspace is not allowed."}>
          <button onClick={() => isAdmin && setIsEditWorkspaceOpen(true)} className={`py-2 px-6 rounded-lg transition-colors duration-300 ${isAdmin ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-500 text-gray-300 cursor-not-allowed"}`} disabled={!isAdmin}>
            <span>Edit Workspace</span>
          </button>
        </CustomTooltip>
      </div>

      <div className="flex items-center gap-4">
        <CustomTooltip text={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <button onClick={toggleFavorite} className="text-yellow-400 hover:text-yellow-500 focus:outline-none">
            {isFavorite ? <Star fill="yellow" size={24} /> : <Star fill="white" size={24} />}
          </button>
        </CustomTooltip>

        {isAdmin && (
          <CustomTooltip text="Invite users into workspace">
            <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-700 hover:text-gray-100 cursor-pointer transition duration-200" onClick={() => setIsInviteModalOpen(true)}>
              <UserPlus fontSize="medium" />
            </div>
          </CustomTooltip>
        )}

        <CustomTooltip text="Exit Workspace">
          <button onClick={handleExitWorkspace} className="text-red-400 hover:text-red-500 bg-white p-2 rounded-lg focus:outline-none">
            <LogOut size={24} />
          </button>
        </CustomTooltip>
      </div>

      <EditWorkspace isDialogOpen={isEditWorkspaceOpen} setIsDialogOpen={setIsEditWorkspaceOpen} module={module} workspaceId={workspaceId} workspaceName={workspaceName} />
      <Invite isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} />
    </div>
  );
}
