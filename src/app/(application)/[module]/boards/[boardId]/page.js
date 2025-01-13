import GroupsDisplay from "@/app/_components/groups/GroupsDisplay";

export default async function BoardPage({ params }) {
  const { boardId } = await params;

  return <GroupsDisplay boardId={boardId} />;
}
