import BoardsDisplay from "@/app/_components/boards/BoardsDisplay";
import Welcome from "@/app/_components/UI/Welcome";

export default function WorkspacePage() {
  return (
    <section className="min-h-96 bg-blue-50 mb-5 mx-5 rounded-3xl">
      <Welcome />
      <BoardsDisplay />
    </section>
  );
}
