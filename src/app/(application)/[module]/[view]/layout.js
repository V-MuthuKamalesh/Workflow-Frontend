import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/app/_components/header/AppSidebar";
import AppHeader from "@/app/_components/header/AppHeader";

export default async function Layout({ children, params }) {
  const { module } = await params;

  const moduleName = module
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <AppHeader />
      <div className="flex flex-1">
        <SidebarProvider>
          <AppSidebar module={moduleName} />
          <main className="flex-1">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
}
