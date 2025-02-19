import AppHeader from "@/app/(application)/_components/header/AppHeader";
import AppSidebar from "@/app/(application)/_components/header/AppSidebar";
import { moduleBackgrounds, moduleColors } from "@/app/_utils/constants/colors";

export default async function Layout({ children, params }) {
  const { module } = await params;

  const bgColor = moduleColors[module] || "bg-gray-200";
  const sectionBgColor = moduleBackgrounds[module] || "bg-gray-100";

  return (
    <div className={`flex flex-col min-h-screen ${bgColor}`}>
      <AppHeader module={module} />

      <div className="flex flex-1">
        <aside className="w-64 fixed left-0 top-16 h-screen hidden md:block">
          <AppSidebar module={module} />
        </aside>

        <main className="flex-1 md:ml-64 p-4 md:p-6">
          <section className={`min-h-32 ${sectionBgColor} mb-5 rounded-lg p-6 shadow`}>{children}</section>
        </main>
      </div>
    </div>
  );
}
