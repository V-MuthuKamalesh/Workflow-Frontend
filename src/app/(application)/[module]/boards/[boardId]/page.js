import GroupsDisplay from "@/app/_components/groups/GroupsDisplay";

export default async function BoardPage({ params }) {
  const { module, boardId } = await params;

  return <GroupsDisplay module={module} boardId={boardId} />;
}
