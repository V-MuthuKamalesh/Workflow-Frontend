export default async function DashboardPage({ params }) {
  const { view } = await params;

  console.log(view);

  return <section className="h-screen"></section>;
}
