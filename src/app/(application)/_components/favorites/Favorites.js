"use client";

import { FavoriteWorkspaces } from "./FavoriteWorkspaces";
import { FavoriteBoards } from "./FavoriteBoards";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";

export default function FavoriteWorkspacesAndBoards({ module }) {
  const [favorites, setFavorites] = useState({
    workspaces: [],
    boards: [],
  });

  useEffect(() => {
    socket.emit(
      "getFavourite",
      { userId: Cookies.get("userId"), type: module },
      (response) => {
        if (!response) {
          console.error("Error getting favorite data.");
          return;
        }

        console.log(response);

        setFavorites({
          workspaces: response.workspaces,
          boards: response.boards,
        });
      }
    );
  }, [module]);

  return (
    <div className="p-6 rounded-lg shadow-md">
      <FavoriteWorkspaces module={module} workspaces={favorites.workspaces} />
      <FavoriteBoards module={module} boards={favorites.boards} />
    </div>
  );
}
