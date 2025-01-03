export default async function ViewPage({ params }) {
  const { view } = await params;

  console.log(view);

  return (
    <section className="h-screen bg-white mb-10 mx-10 rounded-3xl"></section>
  );
}
