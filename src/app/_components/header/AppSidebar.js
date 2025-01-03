import { ChevronDown, Home, SquareChartGantt, Star } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const items = [
  {
    title: "Home",
    url: "/work-management/dashboard",
    icon: Home,
  },
  {
    title: "Favorites",
    url: "/work-management/favorites",
    icon: Star,
  },
  {
    title: "Workspaces",
    url: "/work-management/workspaces",
    icon: SquareChartGantt,
  },
];

const workspaces = [
  {
    title: "Acme Inc",
    url: "/work-management/workspaces/acme-inc",
  },
  {
    title: "Acme Corp",
    url: "/work-management/workspaces/acme-corp",
  },
];

export default function AppSidebar({ module }) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <h1 className="text-slate-800 text-3xl font-bold ml-20">WorkFlow</h1>
          <SidebarGroupLabel>{module}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      Select Workspace
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width] flex flex-col mt-2">
                    {workspaces.map((workspace) => (
                      <Link
                        key={workspace.title}
                        href={workspace.url}
                        className="border border-gray-300 rounded-md mb-3 p-2 hover:bg-gray-300 transition duration-150"
                      >
                        {workspace.title}
                      </Link>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
