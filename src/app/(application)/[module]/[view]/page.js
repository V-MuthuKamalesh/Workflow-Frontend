import Welcome from "@/app/_components/UI/Welcome";

export default async function ViewPage({ params }) {
  const { module, view } = await params;

  console.log(view);

  return (
    <>
      <Welcome />
    </>
  );
}
