import AppHeader from "@/app/_components/header/AppHeader";
import AppSidebar from "@/app/_components/header/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const moduleColors = {
  "work-management": "bg-red-100",
  dev: "bg-green-100",
  crm: "bg-yellow-100",
  service: "bg-purple-100",
};

const moduleBackgrounds = {
  "work-management": "bg-red-50",
  dev: "bg-green-50",
  crm: "bg-yellow-50",
  service: "bg-purple-50",
};

export default async function Layout({ children, params }) {
  const { module } = await params;

  const bgColor = moduleColors[module] || "bg-gray-200";
  const sectionBgColor = moduleBackgrounds[module] || "bg-gray-100";

  return (
    <div className={`flex flex-col min-h-screen ${bgColor}`}>
      <AppHeader module={module} />
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar module={module} />
          <main className="flex-1">
            <SidebarTrigger />
            <section className={`min-h-96 ${sectionBgColor} mb-5 ml-7 -mt-7 rounded-l-3xl`}>
              {children}
            </section>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
