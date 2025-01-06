import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/app/_components/header/AppSidebar";
import AppHeader from "@/app/_components/header/AppHeader";

const moduleColors = {
  "work-management": "bg-blue-100",
  dev: "bg-green-100",
  crm: "bg-yellow-100",
  service: "bg-purple-100",
};

export default async function Layout({ children, params }) {
  const { module } = await params;

  const bgColor = moduleColors[module] || "bg-gray-200";

  return (
    <div className={`flex flex-col min-h-screen ${bgColor}`}>
      <AppHeader module={module} />
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar module={module} />
          <main className="flex-1">
            <SidebarTrigger />
            <section className="min-h-96 bg-blue-50 mb-5 ml-7 -mt-7 rounded-l-3xl">
              {children}
            </section>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
