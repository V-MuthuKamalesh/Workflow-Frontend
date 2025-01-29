"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateWorkspace from "./CreateWorkspace";

export default function CreateWorkspaceButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prevState) => !prevState);

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <button className="hover:bg-gray-300 flex items-center justify-between w-full" onClick={toggleModal}>
            <span>Add Workspace</span>
            <Plus className="ml-auto" />
          </button>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {isModalOpen && <CreateWorkspace onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
