export default async function DashboardPage({ params }) {
  const { module } = await params;

  console.log(module);

  return <section className="h-screen"></section>;
}
