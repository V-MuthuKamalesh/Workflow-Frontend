"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Home, Star } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
import CreateWorkspaceButton from "../workspaces/CreateWorkspaceButton";
import { io } from "socket.io-client";

const moduleColors = {
  "work-management": "bg-red-50",
  dev: "bg-green-50",
  crm: "bg-yellow-50",
  service: "bg-purple-50",
};

const items = [
  {
    title: "Home",
    url: "/work-management/home",
    icon: Home,
  },
  {
    title: "Favorites",
    url: "/work-management/favorites",
    icon: Star,
  },
];

export default function AppSidebar({ module }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState(null);

  const moduleName = module
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  const bgColor = moduleColors[module] || "bg-gray-50";

  useEffect(() => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit("getWorkspaces", null, (data) => {
      if (data) {
        setWorkspaces(data);
      } else {
        setError("Failed to fetch workspaces");
      }
    });

    socket.on("connect_error", (err) => {
      setError(`Connection error: ${err.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Sidebar>
      <SidebarContent className={`${bgColor}`}>
        <SidebarGroup>
          <div className="mt-16"></div>
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
              <CreateWorkspaceButton />
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      Select Workspace
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width] flex flex-col mt-2 max-h-60 overflow-y-auto scrollbar-hidden">
                    {error ? (
                      <div className="text-red-500">{error}</div>
                    ) : workspaces.length === 0 ? (
                      <div>No workspaces available</div>
                    ) : (
                      workspaces.map((workspace) => (
                        <Link
                          key={workspace.workspaceId}
                          href={`/${module}/workspace/${workspace.workspaceId}`}
                          className="border border-gray-300 rounded-md mb-3 p-2 hover:bg-gray-200 transition duration-150"
                        >
                          {workspace.workspaceName}
                        </Link>
                      ))
                    )}
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
