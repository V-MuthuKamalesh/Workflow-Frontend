"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { setFavoriteBoards, setFavoriteWorkspaces } from "@/redux/feautres/favoritesSlice";
import { FavoriteWorkspaces } from "./FavoriteWorkspaces";
import { FavoriteBoards } from "./FavoriteBoards";

export default function FavoriteWorkspacesAndBoards({ module }) {
  const dispatch = useDispatch();
  const { favoriteWorkspaces, favoriteBoards } = useSelector((state) => state.favorites);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (!userId) {
      console.error("User ID not found.");
      setIsLoading(false);
      return;
    }

    socket.emit("getFavourite", { userId, type: module }, (response) => {
      if (!response) {
        console.error("Error getting favorite data.");
      } else {
        dispatch(setFavoriteWorkspaces(response.workspaces || []));
        dispatch(setFavoriteBoards(response.boards || []));
      }
      setIsLoading(false);
    });
  }, [module, dispatch]);

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg shadow-md flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg shadow-md">
      <FavoriteWorkspaces module={module} workspaces={favoriteWorkspaces} />
      <FavoriteBoards module={module} boards={favoriteBoards} />
    </div>
  );
}
