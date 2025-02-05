"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Star, BarChart, LogOut } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { clearWorkspaceData, fetchBoardsByWorkspaceId } from "@/redux/feautres/workspaceSlice";
import { usePathname } from "next/navigation";
import { setWorkspaces } from "@/redux/feautres/userDetailsSlice";
import { appTextColors, moduleColors } from "@/app/_utils/constants/colors";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import CreateWorkspaceButton from "../workspaces/CreateWorkspaceButton";

export default function AppSidebar({ module }) {
  const dispatch = useDispatch();
  const { workspaces } = useSelector((state) => state.userDetails);
  const { workspaceId, workspaceName, error } = useSelector((state) => state.workspace);
  const pathName = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    {
      title: "Dashboard",
      url: `/${module}/view/dashboard`,
      icon: BarChart,
    },
    {
      title: "Favorites",
      url: `/${module}/view/favorites`,
      icon: Star,
    },
  ];

  const bgColor = moduleColors[module] || "bg-gray-100";
  const appTextColor = appTextColors[module] || "text-gray-700";

  useEffect(() => {
    dispatch(clearWorkspaceData());
  }, [pathName, dispatch]);

  useEffect(() => {
    socket.emit("getWorkspaces", { moduleId: Cookies.get("moduleId"), token: Cookies.get("authToken") }, (response) => {
      if (!response) {
        console.error("Error getting workspaces.");
        return;
      }
      dispatch(setWorkspaces(response));
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on("workspacesUpdated", (data) => {
      dispatch(setWorkspaces(data));
    });
  }, [dispatch]);

  const handleWorkspaceSelect = (workspaceId) => {
    dispatch(fetchBoardsByWorkspaceId(workspaceId));
    setIsDropdownOpen(false);
  };

  return (
    <aside className="w-64 max-h-screen bg-white shadow-xl">
      <div className={`${bgColor} shadow-lg min-h-screen p-4`}>
        {navLinks.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <item.icon className="text-gray-600" />
            <span className="font-medium text-gray-800">{item.title}</span>
          </Link>
        ))}

        <CreateWorkspaceButton />

        <div className="mt-4">
          <button
            className="w-full flex justify-between items-center bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg px-4 py-2"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Select Workspace</span>
            <ChevronDown className={`ml-auto transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute w-full mt-2 max-h-60 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-10 transition-all duration-300">
              {error ? (
                <div className="text-red-500 text-center p-3 font-medium">{error}</div>
              ) : workspaces.length === 0 ? (
                <div className="text-center text-gray-500 p-4 italic">No workspaces available</div>
              ) : (
                <ul className="space-y-1 p-2">
                  {workspaces.map((workspace) => (
                    <li key={workspace.workspaceId}>
                      <Link
                        href={`/${module}/workspace/${workspace.workspaceId}`}
                        onClick={() => handleWorkspaceSelect(workspace.workspaceId)}
                        className={`block px-4 py-2 rounded-md transition-colors duration-200 ${
                          workspaceId === workspace.workspaceId
                            ? `${bgColor} ${appTextColor} font-medium`
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {workspace.workspaceName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {workspaceId && (
          <div className="p-4 bg-gray-200 rounded-lg flex items-center justify-between mt-4">
            <span className="font-medium text-gray-700">{workspaceName}</span>
          </div>
        )}
      </div>
    </aside>
  );
}
