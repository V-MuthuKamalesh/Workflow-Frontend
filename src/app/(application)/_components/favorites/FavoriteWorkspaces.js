import { WorkspaceCard } from "./WorkspaceCard";

export function FavoriteWorkspaces({ module, workspaces }) {
  return (
    <>
      <h3 className="text-2xl font-semibold text-gray-600 mb-4">
        My Favorite Workspaces
      </h3>
      {workspaces.length === 0 && (
        <p className="text-sm text-gray-500">
          You have no favorite workspaces. You can add them from the workspaces
          page.
        </p>
      )}
      <ul className="grid grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <WorkspaceCard
            key={workspace.workspaceId}
            module={module}
            workspace={workspace}
          />
        ))}
      </ul>
    </>
  );
}
