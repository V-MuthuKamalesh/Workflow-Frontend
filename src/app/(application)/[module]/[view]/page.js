import FavoriteWorkspacesAndBoards from "@/app/_components/favorites/Favorites";
import Announcements from "@/app/_components/home/Announcements";
import ContactSales from "@/app/_components/home/ContactSalesCard";
import DashboardStats from "@/app/_components/home/DashboardStatistics";
import QuickAccess from "@/app/_components/home/QuickAccess";
import RecentActivity from "@/app/_components/home/RecentActivity";
import SearchBar from "@/app/_components/home/SearchBar";
import Welcome from "@/app/_components/UI/Welcome";

export default async function ViewPage({ params }) {
  const { module, view } = await params;

  console.log(view);

  return (
    <>
      <Welcome view={view} module={module} />
      {view === "home" ? (
        <div className="pb-3 space-y-8">
          {" "}
          <SearchBar />
          <ContactSales />
          <QuickAccess />
          <Announcements />
          <DashboardStats />
          <RecentActivity />
        </div>
      ) : view === "favorites" ? (
        <div className="mt-8">
          <FavoriteWorkspacesAndBoards />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
