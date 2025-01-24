"use client";

import { FavoriteWorkspaces } from "./FavoriteWorkspaces";
import { FavoriteBoards } from "./FavoriteBoards";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { socket } from "@/app/_utils/webSocket/webSocketConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoriteBoards,
  setFavoriteWorkspaces,
} from "@/redux/feautres/favoritesSlice";

export default function FavoriteWorkspacesAndBoards({ module }) {
  const { favoriteWorkspaces, favoriteBoards } = useSelector(
    (state) => state.favorites
  );
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit(
      "getFavourite",
      { userId: Cookies.get("userId"), type: module },
      (response) => {
        if (!response) {
          console.error("Error getting favorite data.");
          return;
        }

        dispatch(setFavoriteWorkspaces(response.workspaces));
        dispatch(setFavoriteBoards(response.boards));
      }
    );
  }, [module, dispatch]);

  return (
    <div className="p-6 rounded-lg shadow-md">
      <FavoriteWorkspaces module={module} workspaces={favoriteWorkspaces} />
      <FavoriteBoards module={module} boards={favoriteBoards} />
    </div>
  );
}
