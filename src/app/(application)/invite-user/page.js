import JoinUser from "./JoinUser";

export default async function InvitePage({ searchParams }) {
  const { token, name, workspaceName } = await searchParams;

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-zinc-800 text-white">
      <div className="text-center space-y-3">
        <h1 className="text-5xl text-purple-400">Invitation to a Workspace</h1>
        <p className="text-2xl max-w-xl text-center">
          <span className="font-semibold text-purple-400">{name}</span> has invited you to join the workspace
          <span className="font-semibold text-purple-400"> {workspaceName}</span> in Work Flow.
        </p>
        <p className="text-sm">Click Join to become a member of this workspace. This link will expire in 1 hour.</p>
      </div>

      <JoinUser token={token} />
    </section>
  );
}
