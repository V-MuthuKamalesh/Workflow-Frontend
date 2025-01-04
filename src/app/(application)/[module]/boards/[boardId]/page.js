import { boardInfo } from "@/app/_components/boards/boardData";
import Groups from "@/app/_components/groups/Groups";

export default function BoardPage() {
  return (
    <section className="min-h-96 bg-white mx-5 pb-10 rounded-t-3xl">
      <Groups boardInfo={boardInfo} />
    </section>
  );
}
