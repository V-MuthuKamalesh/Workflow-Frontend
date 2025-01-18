"use client";

import { FavoriteWorkspaces } from "./FavoriteWorkspaces";
import { FavoriteBoards } from "./FavoriteBoards";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const favoriteData = {
  workspaces: [
    {
      id: 1,
      workspaceName: "Design Team",
      description: "A collaborative space for design projects.",
      memberCount: 8,
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      workspaceName: "Marketing Hub",
      description: "Marketing campaigns and strategies.",
      memberCount: 12,
      lastActive: "5 hours ago",
    },
    {
      id: 3,
      workspaceName: "Development Team",
      description: "Codebase discussions and feature planning.",
      memberCount: 15,
      lastActive: "1 day ago",
    },
    {
      id: 4,
      workspaceName: "Sales Team",
      description: "Leads and sales tracking.",
      memberCount: 10,
      lastActive: "3 hours ago",
    },
    {
      id: 5,
      workspaceName: "HR Department",
      description: "HR activities and employee engagement.",
      memberCount: 6,
      lastActive: "4 days ago",
    },
  ],
  boards: [
    {
      id: 1,
      boardName: "Project A",
      workspaceName: "HR Department",
    },
    {
      id: 4,
      boardName: "Campaign Strategy",
      workspaceName: "Sales Team",
    },
    {
      id: 5,
      boardName: "Campaign Strategy",
      workspaceName: "Development Team",
    },
  ],
};

export default function FavoriteWorkspacesAndBoards({ module }) {
  const [favorites, setFavorites] = useState({
    workspaces: [],
    boards: [],
  });

  useEffect(() => {
    const socket = io("http://localhost:4000/", { transports: ["websocket"] });

    socket.emit("getFavourite", { type: module }, (response) => {
      if (!response) {
        console.error("Error getting favorite data.");
        return;
      }

      console.log(response);

      setFavorites({
        workspaces: [],
        boards: response.boards,
      });
    });
  }, [module]);

  return (
    <div className="p-6 rounded-lg shadow-md">
      <FavoriteWorkspaces workspaces={favorites.workspaces} />
      <FavoriteBoards module={module} boards={favorites.boards} />
    </div>
  );
}
