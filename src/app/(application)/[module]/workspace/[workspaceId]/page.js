import BoardsDisplay from "@/app/_components/boards/BoardsDisplay";
import ActivityFeed from "@/app/_components/workspaces/ActivityFeed";
import WorkspaceHeader from "@/app/_components/workspaces/WorkspaceHeader";
import WorkspaceMembers from "@/app/_components/workspaces/WorkspaceMembers";

export default async function WorkspacePage({ params }) {
  const { module, workspaceId } = await params;

  return (
    <div className="min-h-screen bg-gray-100">
      <WorkspaceHeader module={module} workspaceName={"My Workspace"} />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-lg shadow-lg p-6 space-y-10">
          <WorkspaceMembers workspaceId={workspaceId} />

          <div>
            <h1 className="text-2xl font-semibold">Boards</h1>
            <BoardsDisplay module={module} workspaceId={workspaceId} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Activity Feed</h2>
            <ActivityFeed workspaceId={workspaceId} />
          </div>
        </section>
      </div>
    </div>
  );
}
