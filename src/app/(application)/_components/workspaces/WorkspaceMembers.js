"use client";

import { useEffect, useState } from "react";
import { Trash2, ArrowUpRight, ExternalLink, ArrowDown } from "lucide-react";
import { setMembers } from "@/redux/feautres/workspaceSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";
import Link from "next/link";
import { groupMembers } from "@/app/_utils/helpers/helper";
import { appBgColors, appButtonColors, appTextColors } from "@/app/_utils/constants/colors";
import useCheckUserRole from "../../hooks/useCheckUserRole";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";

export default function WorkspaceMembers({ module, workspaceId, members }) {
  const { isAdmin } = useCheckUserRole(Cookies.get("userId"), workspaceId);
  const [activeTab, setActiveTab] = useState("admin");
  const dispatch = useDispatch();

  const groupedMembers = groupMembers(members);

  const appTextColor = appTextColors[module];
  const appBgColor = appBgColors[module];
  const appButtonColor = appButtonColors[module];

  useEffect(() => {
    socket.on("memberAdded", (data) => {
      dispatch(setMembers(data));
    });

    return () => socket.off("memberAdded");
  }, [dispatch]);

  const handleMemberAction = async (action, userId) => {
    try {
      const endpoints = {
        delete: "/users/removeMember",
        promote: "/users/promoteToAdmin",
        depromote: "/users/dePromoteToMember",
      };

      let response;

      if (action === "delete") {
        response = await workflowBackend.delete(endpoints.delete, {
          params: { workspaceId, userId },
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        });
      } else {
        response = await workflowBackend.patch(
          endpoints[action],
          { workspaceId, userId },
          { headers: { Authorization: `Bearer ${Cookies.get("authToken")}` } }
        );
      }

      if (response.status === 200) {
        let updatedMembers;

        if (action === "delete") {
          updatedMembers = members.filter((member) => member.userId !== userId);
        } else if (action === "promote") {
          updatedMembers = members.map((member) => (member.userId === userId ? { ...member, role: "admin" } : member));
        } else if (action === "depromote") {
          updatedMembers = members.map((member) => (member.userId === userId ? { ...member, role: "member" } : member));
        }

        dispatch(setMembers(updatedMembers));
      }
    } catch (error) {
      console.error(`Error performing ${action} action on member:`, error);
    }
  };

  return (
    <div className="mt-6 p-4 bg-white shadow-md rounded-md w-full">
      <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center md:text-left">Workspace Members</h3>
      <div className="flex flex-wrap justify-center md:justify-start gap-2 border-b pb-2 mb-4">
        {Object.keys(groupedMembers).map((role) => (
          <button
            key={role}
            onClick={() => setActiveTab(role)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === role ? `${appBgColor} text-white` : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } transition`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)} ({groupedMembers[role].length})
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {groupedMembers[activeTab].map((member) => (
          <li
            key={member.userId}
            className="flex flex-col sm:flex-row items-center p-3 bg-gray-50 rounded-md shadow-sm hover:shadow transition space-y-2 sm:space-y-0 sm:space-x-4 w-full"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${appTextColor} bg-blue-100 font-medium`}
            >
              {member.fullname.charAt(0)}
            </div>
            <div className="flex-grow text-center sm:text-left">
              <p className="text-sm font-medium text-gray-800">{member.fullname}</p>
              <p className="text-xs text-gray-500">{member.email}</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 w-full sm:w-auto">
              {isAdmin && member.role === "admin" && member.userId !== Cookies.get("userId") && (
                <button
                  onClick={() => handleMemberAction("depromote", member.userId)}
                  className="text-sm text-white bg-zinc-700 hover:bg-zinc-800 p-2 rounded-lg transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                  DePromote
                  <ArrowDown size={20} className="ml-1" />
                </button>
              )}
              {isAdmin && member.role === "member" && (
                <Link
                  href={`/${module}/view/dashboard?userId=${member.userId}&workspaceId=${workspaceId}`}
                  className={`text-sm text-white ${appButtonColor} p-2 rounded-lg transition-colors duration-200 flex items-center justify-center w-full sm:w-auto`}
                >
                  <span>View Dashboard</span>
                  <ExternalLink size={20} className="ml-1" />
                </Link>
              )}
              {isAdmin && member.role !== "admin" && (
                <button
                  onClick={() => handleMemberAction("promote", member.userId)}
                  className="text-sm text-white bg-zinc-700 hover:bg-zinc-800 p-2 rounded-lg transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                  Promote
                  <ArrowUpRight size={20} className="ml-1" />
                </button>
              )}
              {isAdmin && member.role === "member" && (
                <button
                  onClick={() => handleMemberAction("delete", member.userId)}
                  className="text-red-500 hover:text-red-600 transition-colors text-sm flex items-center justify-center w-full sm:w-auto"
                  title={`Remove ${member.fullname}`}
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </li>
        ))}
        {groupedMembers[activeTab].length === 0 && (
          <p className="text-center text-gray-500 italic">No {activeTab} found.</p>
        )}
      </ul>
    </div>
  );
}
