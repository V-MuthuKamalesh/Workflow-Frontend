import Dashboard from "@/app/(application)/_components/dashboard/Dashboard";
import FavoriteWorkspacesAndBoards from "@/app/(application)/_components/favorites/Favorites";
import Welcome from "@/app/(application)/_components/UI/Welcome";
import DevServiceDashboard from "../../_components/dashboard/DevServiceDashboard";

export default async function ViewPage({ params }) {
  const { module, view } = await params;

  return (
    <>
      <Welcome view={view} module={module} />
      {view === "dashboard" ? (
        <div className="p-3 space-y-8">
          {module === "work-management" || module === "crm" ? (
            <Dashboard module={module} />
          ) : (
            <DevServiceDashboard module={module} />
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
