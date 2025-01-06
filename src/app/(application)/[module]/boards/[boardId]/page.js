import { boardInfo } from "@/app/_components/boards/boardData";
import Groups from "@/app/_components/groups/Groups";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";

export default async function BoardPage({ params }) {
  const { boardId } = await params;

  return (
    <>
      <Groups boardId={boardId} />
    </>
  );
}
