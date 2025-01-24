"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Notifications,
  ChangeCircleRounded,
} from "@mui/icons-material";
import ModuleSwitcher from "./ModuleSwitcher";
import UserProfile from "./UserProfile";
import { moduleColors } from "@/app/_utils/constants/colors";
import { Avatar, Badge, InputBase } from "@mui/material";
import Cookies from "js-cookie";
import { workflowBackend } from "@/app/_utils/api/axiosConfig";

export default function AppHeader({ module, userDetails }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const bgColor = moduleColors[module] || "bg-gray-50";

  const moduleName = module
    .split("-")
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  return (
    <header
      className={`${bgColor} text-gray-700 h-16 flex items-center justify-between px-6 sticky top-0 z-50 border-b border-gray-200 shadow-sm`}
    >
      <nav className="flex items-center justify-between w-full">
        <h1 className="text-slate-800 text-2xl font-semibold">
          WorkFlow <span className="font-light">{moduleName}</span>
        </h1>

        <div className="hidden md:flex items-center bg-gray-100 px-4 py-1 rounded-full shadow-sm w-1/3">
          <Search className="text-gray-500" fontSize="small" />
          <InputBase
            placeholder="Search..."
            className="ml-2 flex-grow text-gray-700 outline-none"
          />
        </div>

        <div className="flex items-center space-x-6">
          <Badge badgeContent={3} color="error">
            <Notifications
              className="text-gray-600 cursor-pointer hover:text-gray-800 transition"
              fontSize="medium"
              titleAccess="Notifications"
            />
          </Badge>

          <div
            className="flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200 transition duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            <ChangeCircleRounded
              className="text-gray-600"
              fontSize="large"
              titleAccess="Switch Module"
            />
          </div>

          <div
            className="flex items-center justify-center rounded-full bg-gray-200 transition duration-200 cursor-pointer"
            onClick={() => setIsProfileOpen(true)}
          >
            <Avatar
              src={
                userDetails.picture.startsWith("http")
                  ? userDetails.picture
                  : userDetails.picture
                  ? `data:image/png;base64,${userDetails.picture}`
                  : ""
              }
              sx={{
                width: 42,
                height: 42,
                bgcolor: "#3f51b5",
                fontSize: "1rem",
              }}
            >
              {userDetails.fullname.charAt(0).toUpperCase()}
            </Avatar>
          </div>
        </div>
      </nav>

      <ModuleSwitcher
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <UserProfile
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        userDetails={userDetails}
      />
    </header>
  );
}
