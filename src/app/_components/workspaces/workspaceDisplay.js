"use client";

import { useDispatch, useSelector } from "react-redux";
import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceMembers from "./WorkspaceMembers";
import CreateBoard from "../boards/CreateBoard";
import BoardsDisplay from "../boards/BoardsDisplay";
import ActivityFeed from "./ActivityFeed";
import { useEffect } from "react";
import { fetchBoardsByWorkspaceId } from "@/redux/feautres/workspaceSlice";

export default function WorkspaceDisplay({ module, workspaceId }) {
  const dispatch = useDispatch();
  const { workspaceName, members, loading, error } = useSelector(
    (state) => state.workspace
  );

  useEffect(() => {
    dispatch(fetchBoardsByWorkspaceId(workspaceId));
  }, [workspaceId, dispatch]);

  console.log(members);

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
      <WorkspaceHeader module={module} workspaceName={workspaceName} />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-lg shadow-lg p-6 space-y-10">
          <WorkspaceMembers members={members} />

          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-semibold">Create Board</h1>
              <CreateBoard workspaceId={workspaceId} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold">Boards</h1>
              <BoardsDisplay module={module} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
            <ActivityFeed workspaceId={workspaceId} />
          </div>
        </section>
      </div>
    </>
  );
}
