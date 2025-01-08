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
import Cookies from "js-cookie";

const moduleColors = {
  "work-management": "bg-red-50",
  dev: "bg-green-50",
  crm: "bg-yellow-50",
  service: "bg-purple-50",
};

export default function AppSidebar({ module }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const moduleName = module
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  const items = [
    {
      title: "Home",
      url: `/${module}/home`,
      icon: Home,
    },
    {
      title: "Favorites",
      url: `/${module}/favorites`,
      icon: Star,
    },
  ];

  const bgColor = moduleColors[module] || "bg-gray-50";

  useEffect(() => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit("getWorkspaces", { token: Cookies.get("authToken") }, (data) => {
      if (data) {
        setWorkspaces(data);
        if (data.length > 0) {
          setSelectedWorkspace(data[0].workspaceId);
        }
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
      <SidebarContent className={`${bgColor} shadow-lg rounded-r-xl`}>
        <SidebarGroup>
          <div className="mt-16"></div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md"
                    >
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
                    <SidebarMenuButton className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md relative">
                      <span>Select Workspace</span>
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[--radix-popper-anchor-width] flex flex-col mt-2 max-h-60 overflow-y-auto scrollbar-hidden absolute z-10">
                    {error ? (
                      <div className="text-red-500 text-center p-2">{error}</div>
                    ) : workspaces.length === 0 ? (
                      <div className="text-center p-2">No workspaces available</div>
                    ) : (
                      workspaces.map((workspace) => (
                        <Link
                          key={workspace.workspaceId}
                          href={`/${module}/workspace/${workspace.workspaceId}`}
                          onClick={() => setSelectedWorkspace(workspace.workspaceId)}
                          className={`border border-gray-300 rounded-md mb-3 p-2 hover:bg-gray-200 transition duration-150 ${
                            selectedWorkspace === workspace.workspaceId ? "bg-gray-300" : ""
                          }`}
                        >
                          {workspace.workspaceName}
                        </Link>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {selectedWorkspace && (
                  <div className="flex items-center justify-between p-4 bg-gray-200 rounded-t-md mb-4">
                    <span className="text-sm">
                      {
                        workspaces.find(
                          (workspace) => workspace.workspaceId === selectedWorkspace
                        )?.workspaceName
                      }
                    </span>
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
