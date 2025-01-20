import JoinUser from "./JoinUser";

export default async function InvitePage({ searchParams }) {
  const { token } = await searchParams;

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="text-center space-y-3">
        <h1 className="text-5xl">Invitation to a workspace</h1>
        <p>
          Click Join to add as a memeber to workspace in Work Flow. This link
          will expire in 1 hour.
        </p>
      </div>

      <JoinUser token={token} />
    </section>
  );
}
