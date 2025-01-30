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
        {/* Sidebar */}
        <AppSidebar module={module} />

        {/* Main Content Area */}
        <main className="flex-1 p-4">
          <section className={`min-h-32 ${sectionBgColor} mb-5 ml-7 -mt-7 rounded-l-3xl p-6`}>{children}</section>
        </main>
      </div>
    </div>
  );
}
