"use client";

import { useDispatch, useSelector } from "react-redux";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceMembers from "./WorkspaceMembers";
import CreateBoard from "../boards/CreateBoard";
import BoardsDisplay from "../boards/BoardsDisplay";
import { useEffect } from "react";
import { fetchBoardsByWorkspaceId } from "@/redux/feautres/workspaceSlice";
import { setCookies } from "@/app/_utils/helpers/cookies";
import { setIsAdmin } from "@/redux/feautres/userDetailsSlice";
import Cookies from "js-cookie";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";

export default function WorkspaceDisplay({ module, workspaceId }) {
  const dispatch = useDispatch();
  const { workspaceName, members, loading, error } = useSelector(
    (state) => state.workspace
  );
  const { isAdmin } = useSelector((state) => state.userDetails);

  useEffect(() => {
    const checkUserRole = async () => {
      const workspaceId = Cookies.get("workspaceId");
      const userId = Cookies.get("userId");

      if (workspaceId && userId) {
        try {
          console.log(workspaceId, userId);
          const response = await workflowBackend.post("/users/checkRole", {
            workspaceId,
            userId,
          });

          dispatch(setIsAdmin(response.data.role === "admin"));
        } catch (error) {
          console.error("Error checking user role:", error);
          dispatch(setIsAdmin(false));
        }
      } else {
        dispatch(setIsAdmin(false));
      }
    };

    checkUserRole();
  });

  useEffect(() => {
    dispatch(fetchBoardsByWorkspaceId(workspaceId));
    setCookies("workspaceId", workspaceId);
  }, [workspaceId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500 italic">Loading Workspace...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <WorkspaceHeader
        module={module}
        isAdmin={isAdmin}
        workspaceId={workspaceId}
        workspaceName={workspaceName}
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-lg shadow-lg p-6 space-y-10">
          <WorkspaceMembers members={members} />

          <div className="space-y-8">
            {isAdmin && (
              <div>
                <h1 className="text-2xl font-semibold">Create Board</h1>
                <CreateBoard module={module} workspaceId={workspaceId} />
              </div>
            )}

            <div>
              <h1 className="text-2xl font-semibold">Boards</h1>
              <BoardsDisplay module={module} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
