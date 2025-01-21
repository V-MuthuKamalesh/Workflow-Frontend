import GroupsDisplay from "@/app/(application)/_components/groups/GroupsDisplay";

export default async function BoardPage({ params, searchParams }) {
  const { module, boardId } = await params;
  const { workspaceId } = await searchParams;

  return (
    <GroupsDisplay
      module={module}
      workspaceId={workspaceId}
      boardId={boardId}
    />
  );
}
