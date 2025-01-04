import BoardsDisplay from "@/app/_components/boards/BoardsDisplay";
import Welcome from "@/app/_components/UI/Welcome";

export default async function ViewPage({ params }) {
  const { view } = await params;

  console.log(view);

  return (
    <section className="min-h-96 bg-blue-50 mb-5 mx-5 rounded-3xl">
      <Welcome />
      <BoardsDisplay />
    </section>
  );
}
