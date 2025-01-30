import Dashboard from "@/app/(application)/_components/dashboard/Dashboard";
import FavoriteWorkspacesAndBoards from "@/app/(application)/_components/favorites/Favorites";
import Welcome from "@/app/(application)/_components/UI/Welcome";
import DevServiceDashboard from "../../../_components/dashboard/DevServiceDashboard";
import { cookies } from "next/headers";

export default async function ViewPage({ params, searchParams }) {
  const { module, view } = await params;
  let { userId, workspaceId } = await searchParams;

  const cookieStore = await cookies();
  userId = userId || cookieStore.get("userId")?.value;

  const isDashboardView = view === "dashboard";
  const isFavoritesView = view === "favorites";
  const isWorkManagementOrCRM = module === "work-management" || module === "crm";

  const getDashboardComponent = () => {
    if (isWorkManagementOrCRM) {
      return <Dashboard module={module} userId={userId} workspaceId={workspaceId} />;
    }

    return <DevServiceDashboard module={module} userId={userId} workspaceId={workspaceId} />;
  };

  return (
    <>
      <Welcome view={view} module={module} />

      {isDashboardView && <div className="p-3 space-y-8">{getDashboardComponent()}</div>}

      {isFavoritesView && (
        <div className="mt-8">
          <FavoriteWorkspacesAndBoards module={module} />
        </div>
      )}
    </>
  );
}
