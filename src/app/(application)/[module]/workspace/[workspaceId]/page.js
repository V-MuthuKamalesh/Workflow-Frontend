import WorkspaceDisplay from "@/app/(application)/_components/workspaces/workspaceDisplay";

export default async function WorkspacePage({ params }) {
  const { module, workspaceId } = await params;

  return <WorkspaceDisplay module={module} workspaceId={workspaceId} />;
}
