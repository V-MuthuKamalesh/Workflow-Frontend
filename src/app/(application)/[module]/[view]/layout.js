import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/app/_components/UI/AppSidebar";
import Header from "@/app/_components/header/Header";

export default async function Layout({ children, params }) {
  const { module } = await params;

  const moduleName = module
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  return (
    <SidebarProvider>
      <AppSidebar module={moduleName} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
