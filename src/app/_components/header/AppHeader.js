"use client";

import { useState } from "react";
import { ChangeCircleRounded } from "@mui/icons-material";
import { Bell, User, UserPlus, Search } from "lucide-react";
import ModuleSwitcher from "./ModuleSwitcher";

const moduleColors = {
  "work-management": "bg-purple-100",
  dev: "bg-green-100",
  crm: "bg-yellow-100",
  service: "bg-teal-100",
};

export default function AppHeader({ module }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const bgColor = moduleColors[module] || "bg-gray-50";

  const moduleName = module
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  return (
    <header
      className={`${bgColor} text-gray-700 h-14 flex items-center justify-between px-4 sticky top-0 z-50 border-b border-gray-200`}
    >
      <nav className="flex items-center justify-between w-full">
        <h1 className="text-slate-800 text-2xl font-semibold">
          WorkFlow <span className="font-light">{moduleName}</span>
        </h1>

        <div className="flex items-center space-x-4 cursor-pointer">
          <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition duration-200">
            <UserPlus className="text-gray-600" size={20} />
          </div>

          <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition duration-200">
            <Bell className="text-gray-600" size={20} />
          </div>

          <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition duration-200">
            <Search className="text-gray-600" size={20} />
          </div>

          <div
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            <ChangeCircleRounded
              className="text-gray-600"
              fontSize="medium"
              titleAccess="Click to change the module"
            />
          </div>

          <div className="flex items-center justify-center p-2 rounded-full bg-gray-200 transition duration-200">
            <User className="text-gray-600" size={20} />
          </div>
        </div>
      </nav>

      <ModuleSwitcher
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </header>
  );
}
