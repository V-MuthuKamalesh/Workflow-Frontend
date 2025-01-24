import Dashboard from "@/app/(application)/_components/dashboard/Dashboard";
import FavoriteWorkspacesAndBoards from "@/app/(application)/_components/favorites/Favorites";
import Welcome from "@/app/(application)/_components/UI/Welcome";
import DevServiceDashboard from "../../../_components/dashboard/DevServiceDashboard";
import { cookies } from "next/headers";

export default async function ViewPage({ params, searchParams }) {
  const { module, view } = await params;
  let { userId, workspaceId } = await searchParams;
  const cookieStore = await cookies();

  userId = userId || cookieStore.get("userId").value;

  return (
    <>
      <Welcome view={view} module={module} />
      {view === "dashboard" ? (
        <div className="p-3 space-y-8">
          {module === "work-management" || module === "crm" ? (
            <Dashboard
              module={module}
              userId={userId}
              workspaceId={workspaceId}
            />
          ) : (
            <DevServiceDashboard
              module={module}
              userId={userId}
              workspaceId={workspaceId}
            />
          )}
        </div>
      ) : view === "favorites" ? (
        <div className="mt-8">
          <FavoriteWorkspacesAndBoards module={module} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
