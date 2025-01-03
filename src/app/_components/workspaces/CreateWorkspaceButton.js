"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useState } from "react";
import WorkspaceModal from "./WorkspaceModal";

export default function CreateWorkspaceButton() {
  const [toggleModal, setToggleModal] = useState(false);

  function handleWorkspaceCreation() {
    setToggleModal((prev) => !prev);
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <button onClick={handleWorkspaceCreation}>
            <span>Add Workspace</span>
            <Plus className="ml-auto" />
          </button>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {toggleModal && <WorkspaceModal onClose={() => setToggleModal(false)} />}
    </>
  );
}
