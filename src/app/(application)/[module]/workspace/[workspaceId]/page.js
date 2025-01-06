import BoardsDisplay from "@/app/_components/boards/BoardsDisplay";

export default async function WorkspacePage({ params }) {
  const { module, workspaceId } = await params;

  return (
    <>
      <BoardsDisplay module={module} workspaceId={workspaceId} />
    </>
  );
}
