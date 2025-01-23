import AppHeader from "@/app/(application)/_components/header/AppHeader";
import AppSidebar from "@/app/(application)/_components/header/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

const moduleColors = {
  "work-management": "bg-purple-100",
  dev: "bg-green-100",
  crm: "bg-blue-100",
  service: "bg-teal-100",
};

const moduleBackgrounds = {
  "work-management": "bg-purple-50",
  dev: "bg-green-50",
  crm: "bg-blue-50",
  service: "bg-teal-50",
};

export default async function Layout({ children, params }) {
  const { module } = await params;
  const cookieStore = await cookies();

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
            <section
              className={`min-h-32 ${sectionBgColor} mb-5 ml-7 -mt-7 rounded-l-3xl`}
            >
              {children}
            </section>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
