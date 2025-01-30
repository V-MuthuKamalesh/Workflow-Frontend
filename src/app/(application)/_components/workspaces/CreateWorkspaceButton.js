"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import CreateWorkspace from "./CreateWorkspace";

export default function CreateWorkspaceButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prevState) => !prevState);

  return (
    <>
      <button className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200" onClick={toggleModal}>
        <span>Add Workspace</span>
        <Plus className="ml-auto" />
      </button>

      {isModalOpen && <CreateWorkspace onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
